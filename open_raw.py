#!/usr/bin/env python3
"""
open_raw.py – open a userscript’s raw GitHub URL in the default browser or Chrome.

Usage
-----
open_raw.py [--chrome] foo.user.js     # Open single file (in Chrome if flagged)
open_raw.py [--chrome] --all           # Open all *.user.js files
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

def open_in_browser(url: str, use_chrome: bool = False) -> None:
    """Open URL in Chrome if requested, otherwise default browser."""
    if use_chrome:
        # Register Chrome browser controller
        chrome_paths = [
            '/usr/bin/google-chrome',                # Linux common
            '/usr/bin/chromium',                     # Alternative Linux
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',  # macOS
            'C:/Program Files/Google/Chrome/Application/chrome.exe'  # Windows
        ]
        
        for path in chrome_paths:
            if os.path.exists(path):
                try:
                    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(path))
                    break
                except webbrowser.Error:
                    continue
        
        try:
            # Attempt to open with registered Chrome controller
            webbrowser.get('chrome').open(url)
        except webbrowser.Error:
            print("Chrome not found; falling back to default browser", file=sys.stderr)
            webbrowser.open(url)
    else:
        # Use default browser
        webbrowser.open(url)

def main(argv):
    # Parse --chrome flag
    use_chrome = False
    if '--chrome' in argv:
        use_chrome = True
        argv.remove('--chrome')  # Remove flag to avoid disrupting other args

    if len(argv) == 1:
        print(__doc__)
        sys.exit(1)

    if argv[1] == "--all":
        # Collect every *.user.js in current directory
        scripts = glob.glob("*.user.js")
        if not scripts:
            print("No *.user.js files found.", file=sys.stderr)
            sys.exit(1)
        for script in scripts:
            open_in_browser(raw_url(script), use_chrome)
    else:
        # Single file mode
        script = argv[1]
        if not os.path.isfile(script):
            print(f"File not found: {script}", file=sys.stderr)
            sys.exit(1)
        open_in_browser(raw_url(script), use_chrome)

if __name__ == "__main__":
    main(sys.argv)

