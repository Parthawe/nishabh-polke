"""Download published project media. Original PDFs come from the Drive connector."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = ROOT / 'assets/originals'
IMAGES = ROOT / 'assets/images'
ORIGINALS.mkdir(parents=True, exist_ok=True)
IMAGES.mkdir(parents=True, exist_ok=True)
gsa = json.loads((ROOT / 'research/gsa-assets.json').read_text())
scarlet = json.loads((ROOT / 'research/scarlet-assets.json').read_text())
items = [dict(x, credit='Nishabh Polke / GSA Postgraduate Showcase 2024') for x in gsa]
items += [dict(id=f'scarlet-{i+1:02}', url=x['srcset'].split(', ')[-1].split(' ')[0] if x.get('srcset') else x['src'], credit='Nishabh Polke and Sravani Mummidi / Behance') for i,x in enumerate(scarlet)]
items.append(dict(id='portrait', url='https://ugc.production.linktr.ee/473f493e-6a7d-4898-8037-7cae08ce2356_IMG-2895.jpeg', credit='Nishabh Polke / Linktree'))

def collect(item):
    item = dict(item)
    suffix = Path(item['url'].split('?')[0]).suffix or '.jpg'
    target = ORIGINALS / (item['id'] + suffix)
    try:
        if not target.exists():
            req = Request(item['url'], headers={'User-Agent': 'Mozilla/5.0'})
            with urlopen(req, timeout=60) as response:
                target.write_bytes(response.read())
        with Image.open(target) as source:
            im = ImageOps.exif_transpose(source).convert('RGB')
            item['width'], item['height'] = im.size
            # Keep source bytes intact. Re-encode web assets without EXIF metadata.
            for width in [800, 1600, 2400]:
                copy = im.copy()
                copy.thumbnail((width, width * 8))
                copy.save(IMAGES / f"{item['id']}-{width}.webp", 'WEBP', quality=88, method=6)
            item['original'] = str(target.relative_to(ROOT))
            item['sha256'] = hashlib.sha256(target.read_bytes()).hexdigest()
            item['bytes'] = target.stat().st_size
            item['status'] = 'downloaded'
    except Exception as error:
        item['status'] = 'unavailable'
        item['error'] = str(error)
    return item

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    result = list(pool.map(collect, items))
(ROOT / 'research/asset-manifest.json').write_text(json.dumps(result, indent=2))
print(json.dumps({'downloaded': sum(x['status']=='downloaded' for x in result), 'unavailable': [x for x in result if x['status']!='downloaded']}, indent=2))
