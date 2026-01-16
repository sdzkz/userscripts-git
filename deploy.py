#!/usr/bin/env python3
"""
deploy.py – Quick deploy a single userscript if it's the only changed file.

Usage
-----
deploy.py foo.user.js

What it does:
1. Checks if the given file is the only modified/new file in the repo
2. Runs prepare.py to update metadata
3. Commits and pushes
4. Asks which browser to use (Brave or Chrome)
5. Opens the raw GitHub URL
"""

import os
import sys
import subprocess
import webbrowser

BASE_URL = "https://raw.githubusercontent.com/sdzkz/userscripts-git/main/"


def get_changed_files():
    """Get list of modified, new, or staged files from git."""
    result = subprocess.run(
        ["git", "status", "--porcelain"],
        capture_output=True,
        text=True
    )
    files = []
    for line in result.stdout.strip().split('\n'):
        if line:
            # Format: "XY filename" - split on whitespace to be safe
            parts = line.split(maxsplit=1)
            if len(parts) < 2:
                continue
            filename = parts[1]
            # Handle renamed files (old -> new)
            if ' -> ' in filename:
                filename = filename.split(' -> ')[1]
            files.append(filename)
    return files


def run_prepare(script):
    """Run prepare.py on the script."""
    result = subprocess.run(
        [sys.executable, "prepare.py", script],
        capture_output=True,
        text=True
    )
    print(result.stdout, end='')
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        return False
    return True


def git_commit_and_push(script):
    """Stage, commit, and push the script."""
    basename = os.path.basename(script).replace('.user.js', '')

    # Stage the file
    subprocess.run(["git", "add", script], check=True)

    # Commit
    result = subprocess.run(
        ["git", "commit", "-m", basename],
        capture_output=True,
        text=True
    )
    print(result.stdout, end='')

    # Push
    print("Pushing...")
    result = subprocess.run(
        ["git", "push"],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        return False
    print("Pushed successfully.")
    return True


def ask_browser():
    """Ask user which browser to use."""
    print("\nOpen in which browser?")
    print("  [b] Brave")
    print("  [c] Chrome")
    print("  [n] None (skip)")

    while True:
        choice = input("> ").strip().lower()
        if choice in ('b', 'brave'):
            return 'brave'
        elif choice in ('c', 'chrome'):
            return 'chrome'
        elif choice in ('n', 'none', ''):
            return None
        else:
            print("Enter b, c, or n")


def open_in_browser(url, browser):
    """Open URL in specified browser."""
    if browser == 'brave':
        paths = [
            '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',  # macOS
            '/usr/bin/brave-browser',  # Linux
            'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'  # Windows
        ]
    else:  # chrome
        paths = [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',  # macOS
            '/usr/bin/google-chrome',  # Linux
            'C:/Program Files/Google/Chrome/Application/chrome.exe'  # Windows
        ]

    for path in paths:
        if os.path.exists(path):
            try:
                webbrowser.register(browser, None, webbrowser.BackgroundBrowser(path))
                webbrowser.get(browser).open(url)
                return True
            except webbrowser.Error:
                continue

    print(f"{browser.title()} not found, using default browser", file=sys.stderr)
    webbrowser.open(url)
    return True


def main():
    if len(sys.argv) != 2:
        print("Usage: deploy.py <script.user.js>")
        sys.exit(1)

    script = sys.argv[1]

    if not os.path.isfile(script):
        print(f"File not found: {script}", file=sys.stderr)
        sys.exit(1)

    # Check what files have changed
    changed = get_changed_files()

    if not changed:
        print("No changes in repo.")
        sys.exit(0)

    # Normalize paths for comparison
    script_normalized = os.path.normpath(script)
    changed_normalized = [os.path.normpath(f) for f in changed]

    if script_normalized not in changed_normalized:
        print(f"'{script}' has no changes.")
        print(f"Changed files: {', '.join(changed)}")
        sys.exit(1)

    if len(changed) > 1:
        print(f"Multiple files changed ({len(changed)}):")
        for f in changed:
            marker = " <--" if os.path.normpath(f) == script_normalized else ""
            print(f"  {f}{marker}")
        print("\nOnly single-file changes supported. Commit other files first or use git directly.")
        sys.exit(1)

    # Single file changed and it matches our script
    print(f"Deploying: {script}")

    # Prepare metadata
    if not run_prepare(script):
        sys.exit(1)

    # Commit and push
    if not git_commit_and_push(script):
        sys.exit(1)

    # Ask for browser
    browser = ask_browser()
    if browser:
        url = BASE_URL + os.path.basename(script)
        print(f"Opening {url}")
        open_in_browser(url, browser)


if __name__ == "__main__":
    main()
