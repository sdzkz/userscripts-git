#!/usr/bin/env python3
"""
open_raw.py – open a userscript’s raw GitHub URL in the default browser.

Usage
-----
open_raw.py foo.user.js           # open that single file
open_raw.py --all                 # open every *.user.js in the repo
"""

import os
import sys
import subprocess
import glob
import webbrowser

# GitHub raw URL base
BASE_URL = "https://raw.githubusercontent.com/sdzkz/userscripts-git/main/"

def raw_url(filename: str) -> str:
    """Return the raw GitHub URL for a given file name."""
    return BASE_URL + os.path.basename(filename)

def open_in_browser(url: str) -> None:
    """Open the URL in the system’s default web browser."""
    try:
        webbrowser.open(url)
    except Exception as exc:
        print(f"Failed to open {url}: {exc}", file=sys.stderr)

def main(argv):
    if len(argv) == 1:
        print(__doc__)
        sys.exit(1)

    if argv[1] == "--all":
        # Collect every *.user.js in the current directory
        scripts = glob.glob("*.user.js")
        if not scripts:
            print("No *.user.js files found.", file=sys.stderr)
            sys.exit(1)
        for script in scripts:
            open_in_browser(raw_url(script))
    else:
        # Single file supplied
        script = argv[1]
        if not os.path.isfile(script):
            print(f"File not found: {script}", file=sys.stderr)
            sys.exit(1)
        open_in_browser(raw_url(script))

if __name__ == "__main__":
    main(sys.argv)