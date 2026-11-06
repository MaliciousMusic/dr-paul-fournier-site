# Generates the favicon in public/.
# Run from site/: python tools/assets.py
OUT = 'public/'

# --- favicon: placeholder round with the initials, until a logo is validated
open(OUT + 'favicon.svg', 'w').write(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#000"/>'
    '<text x="32" y="42" font-family="Arial,sans-serif" font-size="28" text-anchor="middle" fill="#fff">PF</text></svg>')
print('ok')
