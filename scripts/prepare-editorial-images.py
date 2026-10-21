"""Select details from existing research pages, preserving the source PDFs."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root=Path(__file__).resolve().parent.parent
for source,name,box in [
    ('ux-05.png','smart-pairing',(.033,.133,.97,.39)),
    ('ux-03.png','smart-tasks',(.416,.628,.967,.949)),
    ('ux-08.png','cessation-findings',(.033,.455,.966,.936)),
    ('ux-14.png','clinical-needs',(.035,.35,.96,.92)),
    ('ux-08-native.jpg','cessation-preview',(.033,.478,.503,.94)),
    ('ux-05-native.jpg','smart-home-preview',(.337,.135,.638,.374)),
]:
    im=Image.open(root/f'assets/originals/{source}').convert('RGB')
    crop=im.crop(tuple(round(v*(im.width if i%2==0 else im.height)) for i,v in enumerate(box)))
    if name.endswith('-preview'):
        # Keep the entire selected artifact intact in a consistent 3:2 preview.
        target=(max(crop.width,round(crop.height*1.5)),max(crop.height,round(crop.width/1.5)))
        background='white' if name=='cessation-preview' else crop.getpixel((3,3))
        crop=ImageOps.pad(crop,target,color=background)
    for width in [800,1600,2400]:
        derivative=crop.copy();derivative.thumbnail((width,width*8))
        derivative.save(root/f'assets/images/{name}-{width}.webp','WEBP',quality=91,method=6)
# A thumbnail composition from the two original screen rectangles on PDF page 5.
# Keep screen pixels unchanged apart from proportional resizing; exclude annotation columns.
native=Image.open(root/'assets/originals/ux-05-native.jpg').convert('RGB')
canvas=Image.new('RGB',(1200,800),'#f5f5f7')
screens=[]
for box in [(.351,.185,.400,.330),(.504,.185,.553,.330)]:
    screen=native.crop(tuple(round(v*(native.width if i%2==0 else native.height)) for i,v in enumerate(box)))
    screen=screen.resize((round(screen.width*720/screen.height),720),Image.Resampling.LANCZOS)
    screens.append(screen)
gap=96
left=(canvas.width-sum(im.width for im in screens)-gap)//2
for screen in screens:
    canvas.paste(screen,(left,40))
    left+=screen.width+gap
for width in [800,1600,2400]:
    derivative=canvas.copy();derivative.thumbnail((width,width*8))
    derivative.save(root/f'assets/images/smart-home-screens-{width}.webp','WEBP',quality=94,method=6)

out=root/'assets/images'
dimensions_file=root/'research/image-dimensions.json'
dimensions=json.loads(dimensions_file.read_text()) if dimensions_file.exists() else {}
dimensions.update({f.name:list(Image.open(f).size) for f in sorted(out.glob('*.webp'))})
dimensions_file.write_text(json.dumps(dimensions,indent=2))
print('Prepared research-detail crops and focused project previews.')
