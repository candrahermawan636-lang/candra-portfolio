#!/usr/bin/env python3
"""Download the real portfolio media from Google Drive into /public.

Reads every `local:` + `drive:` pair from js/content.js, so content.js stays the
single source of truth. Works because the Drive folder is shared "anyone with the link".

Usage (from the project root):
    pip install gdown
    python scripts/download_media.py            # download anything missing
    python scripts/download_media.py --force    # re-download everything
"""
import re
import sys
from pathlib import Path

try:
    import gdown
except ImportError:
    sys.exit("Missing dependency. Run:  pip install gdown")

ROOT = Path(__file__).resolve().parent.parent
text = (ROOT / "js" / "content.js").read_text(encoding="utf-8")
pairs = re.findall(r'local:\s*"([^"]+)",\s*drive:\s*"([^"]+)"', text)
force = "--force" in sys.argv

ok, failed = 0, []
for local, drive_id in pairs:
    dest = ROOT / local
    if dest.exists() and dest.stat().st_size > 0 and not force:
        print(f"skip   {local}")
        ok += 1
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"get    {local}")
    try:
        out = gdown.download(id=drive_id, output=str(dest), quiet=False)
        if out and dest.exists() and dest.stat().st_size > 0:
            ok += 1
        else:
            failed.append(local)
    except Exception as exc:  # noqa: BLE001
        print(f"  ! {exc}")
        failed.append(local)

print(f"\n{ok}/{len(pairs)} files ready.")
if failed:
    print("Could not download:")
    for f in failed:
        print("  -", f)
    sys.exit(1)
