"""
Génère les visuels du projet (icônes PWA + image de partage social).

Le logo provient de `public/logo.svg` et est rasterisé par un navigateur
Chromium quand il est disponible : le rendu est alors rigoureusement
identique au SVG (mêmes contours, même anti-aliasing). Une reproduction
Pillow de la même géométrie sert de repli.

Usage :
    python scripts/generate-assets.py

Produit dans public/ :
    icon-192.png, icon-512.png, apple-touch-icon.png, og-image.png
"""

from __future__ import annotations

import os
import shutil
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
LOGO_SVG = os.path.join(PUBLIC, "logo.svg")

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]

# ---------------------------------------------------------------------------
# Géométrie du logo — valeurs reprises telles quelles de public/logo.svg
# ---------------------------------------------------------------------------

VB = 512                 # viewBox 0 0 512 512
TILE_RADIUS = 110        # rx du carré arrondi
BORDER_INSET = 6         # rect intérieur 6,6,500,500
BORDER_RADIUS = 106
BORDER_WIDTH = 2
BORDER_COLOR = (30, 41, 59)      # #1e293b
TILE_BG = (2, 6, 23)             # #020617

BG_GLOW = [                       # r = 55 % de 512 ≈ 281.6
    (0.00, (30, 41, 59), 255),    # #1e293b
    (0.55, (15, 23, 42), 255),    # #0f172a
    (1.00, (2, 6, 23), 255),      # #020617
]
BG_GLOW_RADIUS = 0.55 * VB

CENTER_GLOW = [                   # r = 220
    (0.00, (71, 85, 105), 178),   # #475569 @ 0.7
    (1.00, (2, 6, 23), 0),        # #020617 @ 0
]
CENTER_GLOW_RADIUS = 220

RING_RADIUS = 170
RING_COLOR = (51, 65, 85, 102)   # #334155 @ 0.4

ORBIT_RX = 170
ORBIT_RY = 58
ORBIT_WIDTH = 9
ORBIT_ANGLES = (0, 60, 120)
ELECTRON_RADIUS = 10
NUCLEUS_RADIUS = 36

SCALE = 4  # sur-échantillonnage puis réduction : contours lisses

# ---------------------------------------------------------------------------
# Couleurs de la charte (image de partage)
# ---------------------------------------------------------------------------

BG_DEEP = (2, 8, 23)
BG_TOP = (7, 25, 44)
BORDER = (18, 48, 77)
CYAN = (34, 211, 238)
GREEN = (52, 211, 153)
TEXT = (236, 247, 255)
MUTED = (169, 199, 220)
DIM = (124, 156, 180)

FONT_BOLD = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\calibrib.ttf",
]
FONT_REGULAR = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]


def load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default(size)


def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))  # type: ignore[return-value]


# ---------------------------------------------------------------------------
# Dégradés radiaux
# ---------------------------------------------------------------------------

def _sample(stops: list[tuple[float, tuple[int, int, int], int]], t: float) -> tuple[int, int, int, int]:
    """Interpole une liste d'arrêts (offset, couleur, alpha) à la position t ∈ [0, 1]."""
    if t <= stops[0][0]:
        return (*stops[0][1], stops[0][2])
    if t >= stops[-1][0]:
        return (*stops[-1][1], stops[-1][2])
    for i in range(len(stops) - 1):
        o0, c0, a0 = stops[i]
        o1, c1, a1 = stops[i + 1]
        if o0 <= t <= o1:
            f = 0.0 if o1 == o0 else (t - o0) / (o1 - o0)
            return (*lerp(c0, c1, f), round(a0 + (a1 - a0) * f))
    return (*stops[-1][1], stops[-1][2])


def radial_layer(size: int, cx: float, cy: float, radius: float,
                 stops: list[tuple[float, tuple[int, int, int], int]]) -> Image.Image:
    """Dégradé radial rendu en résolution native puis agrandi (rapide et lisse)."""
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    steps = max(1, int(radius))
    for i in range(steps, -1, -1):
        t = i / radius
        draw.ellipse(
            [cx - i, cy - i, cx + i, cy + i],
            fill=_sample(stops, t),
        )
    return layer


# ---------------------------------------------------------------------------
# Le logo
# ---------------------------------------------------------------------------

def render_logo(size: int = 512) -> Image.Image:
    """
    Renvoie le logo à la taille demandée.

    La référence est `public/logo.svg`. Quand un navigateur Chromium est
    disponible, le SVG est rasterisé **par le moteur qui l'affichera** : le
    rendu est alors rigoureusement identique au SVG (même anti-aliasing).
    Sinon on retombe sur une reproduction Pillow fidèle de la même géométrie.
    """
    rendered = _render_logo_via_chrome(512)
    if rendered is not None:
        return rendered if rendered.size == (size, size) else rendered.resize((size, size), Image.LANCZOS)
    return render_logo_pil(size)


def _find_chrome() -> str | None:
    for path in CHROME_CANDIDATES:
        if os.path.exists(path):
            return path
    for name in ("google-chrome", "chromium", "chromium-browser", "chrome"):
        found = shutil.which(name)
        if found:
            return found
    return None


def _render_logo_via_chrome(size: int) -> Image.Image | None:
    chrome = _find_chrome()
    if not chrome or not os.path.exists(LOGO_SVG):
        return None
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "logo.png")
        url = "file:///" + LOGO_SVG.replace("\\", "/").lstrip("/")
        try:
            subprocess.run(
                [
                    chrome,
                    "--headless=new",
                    "--disable-gpu",
                    "--hide-scrollbars",
                    "--force-device-scale-factor=1",
                    "--default-background-color=00000000",  # fond transparent
                    f"--window-size={size},{size}",
                    "--virtual-time-budget=4000",
                    f"--screenshot={out}",
                    url,
                ],
                check=True,
                capture_output=True,
                timeout=90,
            )
            image = Image.open(out).convert("RGBA")
        except (subprocess.SubprocessError, OSError):
            return None
    # Le SVG occupe exactement la fenêtre ; on recadre par sécurité.
    if image.width >= size and image.height >= size:
        return image.crop((0, 0, size, size))
    return None


def render_logo_pil(size: int = 512) -> Image.Image:
    """Reproduction Pillow du logo (repli si aucun navigateur n'est installé)."""
    s = size * SCALE
    k = s / VB  # facteur d'échelle viewBox → pixels

    canvas = Image.new("RGBA", (s, s), (0, 0, 0, 0))

    # 1. Fond du carré arrondi : aplat + halo radial
    bg = Image.new("RGBA", (s, s), TILE_BG + (255,))
    glow = radial_layer(size, size / 2, size / 2, BG_GLOW_RADIUS, BG_GLOW).resize((s, s), Image.BICUBIC)
    bg = Image.alpha_composite(bg, glow)

    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, s - 1, s - 1], radius=TILE_RADIUS * k, fill=255
    )
    canvas.paste(bg, (0, 0), mask)

    # 2. Liseré intérieur
    inset = BORDER_INSET * k
    ImageDraw.Draw(canvas).rounded_rectangle(
        [inset, inset, s - inset, s - inset],
        radius=BORDER_RADIUS * k,
        outline=BORDER_COLOR + (255,),
        width=max(1, round(BORDER_WIDTH * k)),
    )

    # 3. Halo central
    halo = radial_layer(size, size / 2, size / 2, CENTER_GLOW_RADIUS, CENTER_GLOW).resize((s, s), Image.BICUBIC)
    canvas = Image.alpha_composite(canvas, halo)

    # 4. Cercle guide
    r = RING_RADIUS * k
    c = s / 2
    guide = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(guide).ellipse(
        [c - r, c - r, c + r, c + r],
        outline=RING_COLOR,
        width=max(1, round(k)),
    )
    canvas = Image.alpha_composite(canvas, guide)

    # 5. Orbites + électrons (une couche tournée par angle, comme dans le SVG)
    rx, ry = ORBIT_RX * k, ORBIT_RY * k
    sw = max(1, round(ORBIT_WIDTH * k))
    dot = ELECTRON_RADIUS * k
    box = int(2 * (rx + dot) + 2 * sw + 4)
    orbit = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(orbit)
    oc = box / 2
    odraw.ellipse([oc - rx, oc - ry, oc + rx, oc + ry], outline=(255, 255, 255, 255), width=sw)
    for sign in (1, -1):
        x = oc + sign * rx
        odraw.ellipse([x - dot, oc - dot, x + dot, oc + dot], fill=(255, 255, 255, 255))

    for angle in ORBIT_ANGLES:
        rotated = orbit.rotate(angle, resample=Image.BICUBIC, expand=True)
        canvas.alpha_composite(rotated, (int(c - rotated.width / 2), int(c - rotated.height / 2)))

    # 6. Noyau
    nr = NUCLEUS_RADIUS * k
    ImageDraw.Draw(canvas).ellipse([c - nr, c - nr, c + nr, c + nr], fill=(255, 255, 255, 255))

    return canvas.resize((size, size), Image.LANCZOS)


def make_icon(size: int, path: str) -> None:
    render_logo(size).save(path, "PNG")
    print(f"  ✔ {os.path.relpath(path, ROOT)}  ({size}x{size})")


# ---------------------------------------------------------------------------
# Image de partage social
# ---------------------------------------------------------------------------

def make_og_image(path: str, width: int = 1200, height: int = 630) -> None:
    img = Image.new("RGB", (width, height), BG_DEEP)
    draw = ImageDraw.Draw(img)

    for y in range(height):
        draw.line([(0, y), (width, y)], fill=lerp(BG_DEEP, BG_TOP, y / height))

    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for i in range(60, 0, -1):
        r = i * 9
        gdraw.ellipse(
            [width - 130 - r, -160 - r, width - 130 + r, -160 + r],
            fill=(*CYAN, min(int(2.4 * (60 - i)), 26)),
        )
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([24, 24, width - 24, height - 24], radius=28, outline=BORDER, width=3)

    f_eyebrow = load_font(FONT_BOLD, 22)
    f_title = load_font(FONT_BOLD, 62)
    f_sub = load_font(FONT_REGULAR, 27)
    f_chip = load_font(FONT_BOLD, 20)
    f_stat = load_font(FONT_BOLD, 40)
    f_stat_label = load_font(FONT_REGULAR, 19)

    # Marque : logo atomique exact (rasterisé depuis public/logo.svg)
    mark = render_logo(104)
    img.paste(mark, (72, 76), mark)

    draw.text((200, 92), "ZHÉTIKAL  ·  GHOSTINT-TOOLS", font=f_eyebrow, fill=CYAN)
    draw.text((200, 122), "OSINT Master-Toolkit v2", font=f_title, fill=TEXT)

    draw.text((72, 220), "Annuaire interactif de ressources OSINT classées par catégorie,", font=f_sub, fill=MUTED)
    draw.text((72, 258), "avec recherche instantanée, filtres par type et favoris exportables.", font=f_sub, fill=MUTED)

    chips = [
        "Téléphones", "Emails", "Usernames", "Domaines & DNS",
        "Fuites de données", "Géolocalisation", "Réseaux sociaux", "Outils IA",
    ]
    x, y = 72, 320
    for chip in chips:
        box_w = draw.textlength(chip, font=f_chip) + 34
        if x + box_w > width - 72:
            x = 72
            y += 52
        draw.rounded_rectangle([x, y, x + box_w, y + 38], radius=19, fill=(10, 25, 48), outline=BORDER, width=2)
        draw.text((x + 17, y + 9), chip, font=f_chip, fill=(199, 234, 255))
        x += box_w + 12

    stats = [("1 227", "outils référencés"), ("24", "catégories"), ("7", "types de sources")]
    sx = 72
    for value, label in stats:
        draw.text((sx, 490), value, font=f_stat, fill=GREEN)
        draw.text((sx, 542), label, font=f_stat_label, fill=DIM)
        sx += 250

    draw.text((width - 72, height - 74), "Usage légal et éthique uniquement", font=f_stat_label, fill=DIM, anchor="ra")

    img.save(path, "PNG")
    print(f"  ✔ {os.path.relpath(path, ROOT)}  ({width}x{height})")


def main() -> None:
    os.makedirs(PUBLIC, exist_ok=True)
    print("Génération des visuels…")
    make_icon(512, os.path.join(PUBLIC, "icon-512.png"))
    make_icon(192, os.path.join(PUBLIC, "icon-192.png"))
    make_icon(180, os.path.join(PUBLIC, "apple-touch-icon.png"))
    make_og_image(os.path.join(PUBLIC, "og-image.png"))
    print("Terminé.")


if __name__ == "__main__":
    main()
