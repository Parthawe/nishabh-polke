"""Select details from existing research pages, preserving the source PDFs."""
from pathlib import Path
from PIL import Image
import json

root=Path(__file__).resolve().parent.parent
for source,name,box in [
    ('ux-05','smart-pairing',(.033,.133,.97,.39)),
    ('ux-03','smart-tasks',(.416,.628,.967,.949)),
    ('ux-08','cessation-findings',(.033,.455,.966,.936)),
    ('ux-14','clinical-needs',(.035,.35,.96,.92)),
]:
    im=Image.open(root/f'assets/originals/{source}.png').convert('RGB')
    crop=im.crop(tuple(round(v*(im.width if i%2==0 else im.height)) for i,v in enumerate(box)))
    for width in [800,1600,2400]:
        derivative=crop.copy();derivative.thumbnail((width,width*8))
        derivative.save(root/f'assets/images/{name}-{width}.webp','WEBP',quality=91,method=6)
out=root/'assets/images'
(root/'research/image-dimensions.json').write_text(json.dumps({f.name:list(Image.open(f).size) for f in out.glob('*.webp')},indent=2))
print('Prepared four research-detail crops.')
