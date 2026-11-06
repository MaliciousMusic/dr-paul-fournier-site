# Generates public/topo.svg: contour lines of an invented terrain, not a map. Run from site/: python tools/topo.py
# A steady slope plus broad relief: lines stay evenly spaced, so the pattern has no empty patches, and summits get their rings.
# Going across the tile the slope climbs a whole number of levels, so the tile joins with itself on every side.
import numpy as np
rng = np.random.default_rng(1465)
W, H = 1200, 675
NX, NY = 400, 225
PENTE_X, PENTE_Y = 72, 54  # levels climbed across the tile: about one line every 10px
x, y = np.meshgrid(np.linspace(0, W, NX + 1), np.linspace(0, H, NY + 1))
relief = np.zeros_like(x)
for kx in range(-4, 5):
    for ky in range(-3, 4):
        if kx == 0 and ky == 0: continue
        a = rng.normal() / (kx * kx + ky * ky) ** 0.75
        relief += a * np.cos(2 * np.pi * (kx * x / W + ky * y / H) + rng.uniform(0, 2 * np.pi))
gy, gx = np.gradient(relief, H / NY, W / NX)
pente = np.hypot(PENTE_X / W, PENTE_Y / H)
relief *= 1.05 * pente / np.sqrt((gx ** 2 + gy ** 2).mean())
z = PENTE_X * x / W + PENTE_Y * y / H + relief

mini = np.minimum.reduce([z[:-1, :-1], z[:-1, 1:], z[1:, :-1], z[1:, 1:]])
maxi = np.maximum.reduce([z[:-1, :-1], z[:-1, 1:], z[1:, :-1], z[1:, 1:]])

def lignes(niveau):
    """Marching squares, then chain the segments into polylines. Returns (points, closed)."""
    def pos(k):
        j, i, s = k
        a = z[j, i]; b = z[j, i + 1] if s == 0 else z[j + 1, i]
        t = (niveau - a) / (b - a)
        return (x[j, i] + t * (x[j, i + 1] - x[j, i]), y[j, i]) if s == 0 else (x[j, i], y[j, i] + t * (y[j + 1, i] - y[j, i]))
    haut = z > niveau
    au = {}
    for j, i in zip(*np.nonzero((mini <= niveau) & (maxi > niveau))):
        c = int(haut[j, i]) | int(haut[j, i + 1]) << 1 | int(haut[j + 1, i + 1]) << 2 | int(haut[j + 1, i]) << 3
        if c in (0, 15): continue
        N, E, S, O = (j, i, 0), (j, i + 1, 1), (j + 1, i, 0), (j, i, 1)
        table = {1: [(O, N)], 2: [(N, E)], 3: [(O, E)], 4: [(E, S)], 5: [(O, N), (E, S)], 6: [(N, S)], 7: [(O, S)], 8: [(S, O)], 9: [(S, N)], 10: [(N, E), (S, O)], 11: [(S, E)], 12: [(E, O)], 13: [(E, N)], 14: [(N, O)]}
        for a, b in table[c]:
            au.setdefault(a, []).append(b); au.setdefault(b, []).append(a)
    vus, res = set(), []
    def chemin(dep):
        ch = [dep]; vus.add(dep); cour = dep
        while True:
            suite = [v for v in au[cour] if v not in vus]
            if not suite: return ch
            cour = suite[0]; vus.add(cour); ch.append(cour)
    for k in [k for k in au if len(au[k]) == 1] + list(au):
        if k not in vus:
            ch = chemin(k)
            ferme = len(ch) > 2 and ch[0] in au[ch[-1]]
            res.append(([pos(q) for q in ch], ferme))
    return res

tracés = []
for niveau in range(int(np.floor(z.min())) + 1, int(np.ceil(z.max()))):
    tracés += lignes(niveau + 0.5)

def dedans(p, poly):
    px, py = p; c = False; n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]; x2, y2 = poly[(i + 1) % n]
        if (y1 > py) != (y2 > py) and px < x1 + (py - y1) * (x2 - x1) / (y2 - y1): c = not c
    return c
boucles = [t[0] for t in tracés if t[1]]
anneaux = []
for b in boucles:
    if any(a is not b and dedans(a[0], b) for a in boucles): continue
    arr = np.array(b)
    aire = abs(np.dot(arr[:, 0], np.roll(arr[:, 1], 1)) - np.dot(arr[:, 1], np.roll(arr[:, 0], 1))) / 2
    r = (aire / np.pi) ** 0.5
    k = 1
    while r - k * 10 > 5:  # the summit fills up with rings, one every 10px
        anneaux.append(((arr.mean(axis=0) + (arr - arr.mean(axis=0)) * (1 - k * 10 / r)).tolist(), True))
        k += 1

d = []
for pts, ferme in tracés + anneaux:
    if ferme and len(pts) < 6: continue
    pris = [tuple(p) for p in pts[::4]]
    if not ferme and tuple(pts[-1]) != pris[-1]: pris.append(tuple(pts[-1]))
    d.append('M' + 'L'.join(f'{a:.1f} {b:.1f}' for a, b in pris) + ('Z' if ferme else ''))
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><path fill="none" stroke="#fff" stroke-opacity=".36" stroke-width="1" d="{"".join(d)}"/></svg>'
open('public/topo.svg', 'w', encoding='utf8').write(svg)

# Check: the largest empty disc in the tile
tous = [np.array(p) for p, _ in tracés + anneaux]
C = 4
vu = np.zeros((H // C + 2, W // C + 2), bool)
for p in tous:
    vu[(p[:, 1] / C).astype(int), (p[:, 0] / C).astype(int)] = True
rayon = 0
while not vu.all():
    v = vu.copy()
    v[1:] |= vu[:-1]; v[:-1] |= vu[1:]; v[:, 1:] |= vu[:, :-1]; v[:, :-1] |= vu[:, 1:]
    vu = v; rayon += 1
print(len(svg) // 1024, 'KB', len(d), 'lines,', len(anneaux), 'rings, largest gap about', rayon * C * 2, 'px')
