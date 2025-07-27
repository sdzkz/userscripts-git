#!/usr/bin/env python3
import os
import sys
import subprocess

# GitHub raw URL base
BASE_URL = "https://raw.githubusercontent.com/sdzkz/userscripts-git/main/"

def get_raw_url(filename):
    """Generate raw GitHub URL for the userscript"""
    return BASE_URL + os.path.basename(filename)

def copy_to_clipboard(text):
    """Copy text to clipboard using pbcopy (macOS)"""
    try:
        subprocess.run("pbcopy", universal_newlines=True, input=text, check=True)
        print(f"Copied to clipboard: {text}")
    except subprocess.CalledProcessError as e:
        print(f"Error copying to clipboard: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} USERSCRIPT")
        sys.exit(1)
    
    script_file = sys.argv[1]
    if not os.path.isfile(script_file):
        print(f"Error: File not found - {script_file}")
        sys.exit(1)
    
    raw_url = get_raw_url(script_file)
    copy_to_clipboard(raw_url)
