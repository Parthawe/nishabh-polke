"""Prepare web derivatives from intact portfolio page renders."""
from pathlib import Path
import json
from PIL import Image, ImageOps, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
out = root / 'assets/images'

def variants(im, name):
    im = ImageOps.exif_transpose(im).convert('RGB')
    for width in [800, 1600, 2400]:
        copy = im.copy()
        copy.thumbnail((width, width * 8))
        copy.save(out / f'{name}-{width}.webp', 'WEBP', quality=91, method=6)

for f in sorted((root / 'assets/originals').glob('ux-*.png')):
    variants(Image.open(f), f.stem)
for f in sorted((root / 'assets/originals').glob('architecture-*.png')):
    variants(Image.open(f), f.stem)

# Crops select existing work; no generated project imagery or redrawn research data.
crops = [
    ('ux-12', 'endoscopy-cover', (.607, .359, .967, .691)),
    ('ux-13', 'endoscopy-workflow', (.04, .20, .96, .58)),
    ('ux-10', 'cessation-cover', (.038, .53, .965, .93)),
    ('ux-05', 'smart-home-cover', (.03, .14, .97, .64)),
]
for source, name, box in crops:
    im = Image.open(root / f'assets/originals/{source}.png')
    variants(im.crop(tuple(round(v * (im.width if i%2==0 else im.height)) for i,v in enumerate(box))), name)

# Social preview is an original typographic composition using the sourced portrait.
im = Image.new('RGB', (1200, 630), '#f5f5f7')
portrait = Image.open(out/'portrait-800.webp').convert('RGB')
portrait = ImageOps.fit(portrait, (420, 630))
im.paste(portrait, (780,0))
draw=ImageDraw.Draw(im)
face='/System/Library/Fonts/Helvetica.ttc'
draw.text((65,65),'Nishabh Polke',font=ImageFont.truetype(face,28),fill='#1d1d1f')
draw.text((65,200),'Hi, I’m\nNishabh.',font=ImageFont.truetype(face,58),fill='#1d1d1f',spacing=4)
draw.text((65,525),'UX researcher & interaction designer',font=ImageFont.truetype(face,21),fill='#555559')
im.save(root/'assets/social.jpg',quality=91)
(root/'research/image-dimensions.json').write_text(json.dumps({f.name:list(Image.open(f).size) for f in out.glob('*.webp')},indent=2))
print('Prepared portfolio pages, cover crops, and social preview.')
