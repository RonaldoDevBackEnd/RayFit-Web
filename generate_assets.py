import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs('assets/images/marmitas', exist_ok=True)

# Load transparent RayFit logo to stamp on label
logo_orig = Image.open('assets/images/logo-rayfit.png').convert('RGBA')

items = [
    {
        'id': 1,
        'name': 'FRANGO FIT GOURMET',
        'sub': 'Ervas Finas & Batata Doce',
        'cal': '380 kcal',
        'price': 'R$ 24,90',
        'tag': 'BEST SELLER',
        'main_color': (245, 124, 0),
        'bg_glow': (245, 124, 0),
        'layers': [
            ((65, 135, 55), 0.85),
            ((225, 160, 60), 0.90),
            ((200, 135, 75), 0.98)
        ]
    },
    {
        'id': 2,
        'name': 'SALMÃO REAL NORUEGUÊS',
        'sub': 'Quinoa Real & Aspargos',
        'cal': '420 kcal',
        'price': 'R$ 34,90',
        'tag': 'PREMIUM',
        'main_color': (235, 90, 65),
        'bg_glow': (230, 80, 50),
        'layers': [
            ((55, 125, 65), 0.85),
            ((215, 195, 160), 0.90),
            ((245, 110, 85), 0.98)
        ]
    },
    {
        'id': 3,
        'name': 'PATINHO EM CUBOS FIT',
        'sub': 'Arroz Negro & Cenoura Glacê',
        'cal': '450 kcal',
        'price': 'R$ 28,90',
        'tag': 'ALTA PROTEÍNA',
        'main_color': (180, 60, 45),
        'bg_glow': (170, 50, 40),
        'layers': [
            ((225, 115, 30), 0.85),
            ((48, 44, 52), 0.90),
            ((140, 55, 45), 0.98)
        ]
    },
    {
        'id': 4,
        'name': 'BOWL VEGANO POWER',
        'sub': 'Grão de Bico, Tahine & Avocado',
        'cal': '340 kcal',
        'price': 'R$ 23,90',
        'tag': '100% VEGANO',
        'main_color': (45, 138, 62),
        'bg_glow': (35, 120, 50),
        'layers': [
            ((45, 120, 45), 0.85),
            ((215, 175, 110), 0.90),
            ((175, 50, 85), 0.98)
        ]
    },
    {
        'id': 5,
        'name': 'FRANGO AO CURRY DOURADO',
        'sub': 'Arroz Jasmim & Castanhas',
        'cal': '410 kcal',
        'price': 'R$ 27,90',
        'tag': 'CHEF SPECIAL',
        'main_color': (225, 155, 20),
        'bg_glow': (230, 150, 20),
        'layers': [
            ((220, 215, 200), 0.85),
            ((235, 175, 45), 0.90),
            ((215, 140, 60), 0.98)
        ]
    }
]

W, H = 500, 720

for item in items:
    img = Image.new('RGBA', (W, H), (0,0,0,0))
    
    # Floor soft shadow
    shadow = Image.new('RGBA', (W, H), (0,0,0,0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([70, H - 90, W - 70, H - 20], fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    img = Image.alpha_composite(img, shadow)
    
    # Jar bounds
    jx1, jy1, jx2, jy2 = 85, 150, W - 85, H - 70
    jar_w = jx2 - jx1
    jar_h = jy2 - jy1
    radius = 38
    
    # Food inside
    food_img = Image.new('RGBA', (W, H), (0,0,0,0))
    f_draw = ImageDraw.Draw(food_img)
    
    # Food layers
    layer_h = jar_h / len(item['layers'])
    for idx, (l_col, opacity) in enumerate(item['layers']):
        top_y = jy2 - (idx + 1) * layer_h
        bot_y = jy2 - idx * layer_h
        for y in range(int(top_y), int(bot_y) + 1):
            factor = (y - top_y) / (layer_h + 1)
            r = int(l_col[0] * (0.85 + 0.3 * factor))
            g = int(l_col[1] * (0.85 + 0.3 * factor))
            b = int(l_col[2] * (0.85 + 0.3 * factor))
            r, g, b = min(255, r), min(255, g), min(255, b)
            f_draw.line([(jx1, y), (jx2, y)], fill=(r, g, b, int(255 * opacity)))
            
    # Seeds and ingredients particles
    random.seed(item['id'] * 73)
    for _ in range(160):
        rx = random.randint(jx1 + 15, jx2 - 15)
        ry = random.randint(jy1 + 15, jy2 - 15)
        rr = random.randint(2, 6)
        alpha_p = random.randint(40, 120)
        f_draw.ellipse([rx - rr, ry - rr, rx + rr, ry + rr], fill=(255, 255, 255, alpha_p))

    mask = Image.new('L', (W, H), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([jx1, jy1, jx2, jy2], radius=radius, fill=255)
    
    jar_food = Image.new('RGBA', (W, H), (0,0,0,0))
    jar_food.paste(food_img, (0,0), mask=mask)
    img = Image.alpha_composite(img, jar_food)
    
    # Label
    label_w = jar_w - 36
    label_h = 220
    lx1 = jx1 + 18
    ly1 = jy1 + int(jar_h * 0.34)
    lx2 = lx1 + label_w
    ly2 = ly1 + label_h
    
    lbl = Image.new('RGBA', (W, H), (0,0,0,0))
    l_draw = ImageDraw.Draw(lbl)
    
    # Label cream paper body
    l_draw.rounded_rectangle([lx1, ly1, lx2, ly2], radius=18, fill=(253, 249, 242, 245), outline=(225, 215, 200, 255), width=2)
    # Accent top banner on label
    mc = item['main_color']
    l_draw.rounded_rectangle([lx1 + 6, ly1 + 6, lx2 - 6, ly1 + 28], radius=8, fill=(mc[0], mc[1], mc[2], 230))
    l_draw.text((W / 2, ly1 + 17), item['tag'], fill=(255, 255, 255, 255), anchor='mm')
    
    # Inner subtle frame
    l_draw.rounded_rectangle([lx1 + 8, ly1 + 34, lx2 - 8, ly2 - 8], radius=12, fill=None, outline=(mc[0], mc[1], mc[2], 90), width=1)
    
    # Logo on label
    lw = 120
    lh = int(lw * (logo_orig.height / logo_orig.width))
    mini_logo = logo_orig.resize((lw, lh), Image.Resampling.LANCZOS)
    lbl.paste(mini_logo, (int((W - lw)/2), ly1 + 42), mask=mini_logo)
    
    # Text
    l_draw.text((W / 2, ly1 + 42 + lh + 18), item['name'], fill=(28, 25, 22, 255), anchor='mm')
    l_draw.text((W / 2, ly1 + 42 + lh + 38), item['sub'], fill=(100, 95, 88, 255), anchor='mm')
    l_draw.text((W / 2, ly2 - 20), f"{item['cal']}  •  {item['price']}", fill=(mc[0], mc[1], mc[2], 255), anchor='mm')
    
    img = Image.alpha_composite(img, lbl)
    
    # Glass Jar Reflections and 3D Cylindrical Light
    glass = Image.new('RGBA', (W, H), (0,0,0,0))
    g_draw = ImageDraw.Draw(glass)
    
    # Left highlight
    g_draw.line([(jx1 + 15, jy1 + 30), (jx1 + 15, jy2 - 30)], fill=(255, 255, 255, 130), width=8)
    g_draw.line([(jx1 + 28, jy1 + 45), (jx1 + 28, jy2 - 45)], fill=(255, 255, 255, 70), width=3)
    
    # Right rim highlight
    g_draw.line([(jx2 - 16, jy1 + 30), (jx2 - 16, jy2 - 30)], fill=(255, 255, 255, 80), width=4)
    
    # Container outline
    g_draw.rounded_rectangle([jx1, jy1, jx2, jy2], radius=radius, fill=None, outline=(255, 255, 255, 120), width=3)
    img = Image.alpha_composite(img, glass)
    
    # Metallic Lid on Top
    lid_w = jar_w + 16
    lid_h = 60
    lidx1 = (W - lid_w) // 2
    lidy1 = jy1 - 36
    lidx2 = lidx1 + lid_w
    lidy2 = lidy1 + lid_h
    
    lid_img = Image.new('RGBA', (W, H), (0,0,0,0))
    lid_draw = ImageDraw.Draw(lid_img)
    
    for y in range(lidy1, lidy2):
        f = (y - lidy1) / lid_h
        val = int(225 + 30 * math.sin(f * math.pi))
        lid_draw.line([(lidx1, y), (lidx2, y)], fill=(val, val - 8, val - 15, 255))
        
    for x in range(lidx1 + 10, lidx2 - 10, 8):
        lid_draw.line([(x, lidy1 + 8), (x, lidy2 - 6)], fill=(180, 175, 170, 170), width=2)
        lid_draw.line([(x + 2, lidy1 + 8), (x + 2, lidy2 - 6)], fill=(255, 255, 255, 190), width=1)
        
    lid_mask = Image.new('L', (W, H), 0)
    lm_draw = ImageDraw.Draw(lid_mask)
    lm_draw.rounded_rectangle([lidx1, lidy1, lidx2, lidy2], radius=14, fill=255)
    
    clean_lid = Image.new('RGBA', (W, H), (0,0,0,0))
    clean_lid.paste(lid_img, (0,0), mask=lid_mask)
    
    lid_shadow = Image.new('RGBA', (W, H), (0,0,0,0))
    ls_draw = ImageDraw.Draw(lid_shadow)
    ls_draw.rounded_rectangle([lidx1, lidy2 - 6, lidx2, lidy2 + 14], radius=10, fill=(0, 0, 0, 130))
    lid_shadow = lid_shadow.filter(ImageFilter.GaussianBlur(6))
    
    img = Image.alpha_composite(img, lid_shadow)
    img = Image.alpha_composite(img, clean_lid)
    
    out_path = f"assets/images/marmitas/marmita-{item['id']}.png"
    img.save(out_path, 'PNG')
    print(f"Generated {out_path}")

print("All marmitas generated successfully!")

