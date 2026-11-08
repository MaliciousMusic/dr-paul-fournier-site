# Generates public/favicon.svg from the mark in src/components/Logo.astro, on a white ground so it reads in dark tabs too.
# Run from site/: python tools/assets.py
import re
s = open('src/components/Logo.astro', encoding='utf8').read()
vb = re.search(r'viewBox="([^"]+)"', s).group(1)
x, y, w, h = vb.split()
dessin = re.search(r'(<g fill="#000".*</g>)', s, re.S).group(1)
open('public/favicon.svg', 'w', encoding='utf8').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="40" fill="#fff"/>{dessin}</svg>\n')
print('ok')
