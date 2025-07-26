#!/usr/bin/env python3
"""
copy_stub.py  –  Copy the contents of a userscript stub to the clipboard.

Usage:
    ./copy_stub.py big_scrollbar.user.js
"""

import sys
import pathlib
import subprocess

def main(argv):
    if len(argv) != 2:
        print("Usage: copy_stub.py <userscript.user.js>", file=sys.stderr)
        sys.exit(1)

    userscript = pathlib.Path(argv[1])
    stub_path = userscript.with_suffix(".stub.user.js")
    stub_path = stub_path.parent / "stub" / stub_path.name

    if not stub_path.exists():
        print(f"Stub file not found: {stub_path}", file=sys.stderr)
        sys.exit(1)

    # Pipe the stub contents to pbcopy
    subprocess.run(["pbcopy"], input=stub_path.read_bytes(), check=True)

if __name__ == "__main__":
    main(sys.argv)

