# Userscripts Repository - How It Works

## Overview

This repo manages browser userscripts (Tampermonkey/Greasemonkey) with version control. Scripts are edited locally, committed to GitHub, and deployed via raw GitHub URLs for auto-updates.

## Directory Structure

```
Userscripts/
├── src/                 # Userscripts (migrated by deploy.py)
├── *.user.js            # Userscripts not yet migrated
├── sandbox/             # Experimental scripts
├── prepare.py           # Updates metadata with GitHub URLs
├── open_raw.py          # Opens raw GitHub URL in browser
├── get_raw.py           # Copies raw GitHub URL to clipboard
├── deploy.py            # Single-file deploy (prepare + commit + push + open)
├── release.sh           # Bump @version in a script
├── command              # Quick deploy script
├── default.user.js.txt  # Template for new scripts
├── LICENSE
└── .env                 # GitHub token (if needed)
```

## Utility Scripts

### prepare.py
Updates `@updateURL` and `@downloadURL` metadata to point to raw GitHub URLs.

```bash
./prepare.py --all              # Process all scripts
./prepare.py script.user.js     # Process single script
```

### open_raw.py
Opens the raw GitHub URL in your browser (for installation/testing).

```bash
./open_raw.py script.user.js          # Open in default browser
./open_raw.py --chrome script.user.js # Open in Chrome
./open_raw.py --all                   # Open all scripts
```

### get_raw.py
Copies the raw GitHub URL to clipboard (macOS).

```bash
./get_raw.py script.user.js
```

### deploy.py
Single-file deploy: checks only one file changed, bumps version, runs prepare, commits, pushes, and opens in browser (Brave/Chrome). Also migrates the script to `src/` if not already there.

```bash
./deploy.py script.user.js
```

### release.sh
Bumps the `@version` number in a script (increments last segment).

```bash
./release.sh script.user.js
```

### command
Chains the full deploy workflow (uses shell aliases `gc` and `gpush`):
```bash
./prepare.py -all && git add . && gc -m "new" && gpush && ./open_raw.py youtube_remove_shorts.user.js
```

## Workflow

### Standard Edit → Deploy Cycle

1. **Edit** - Modify the `.user.js` file locally
2. **Prepare** - Run `./prepare.py --all` to update metadata URLs
3. **Commit** - `git add . && git commit -m "message"`
4. **Push** - `git push`
5. **Install/Update** - Run `./open_raw.py script.user.js` to open in browser

### Quick Deploy

Run the `command` file to do all steps at once:
```bash
./command
```

## How Auto-Updates Work

Each script contains metadata pointing to its raw GitHub URL:

```javascript
// ==UserScript==
// @name         Script Name
// @updateURL    https://raw.githubusercontent.com/sdzkz/userscripts-git/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/sdzkz/userscripts-git/main/script.user.js
// ==/UserScript==
```

When you push changes, Tampermonkey checks these URLs and auto-updates the script.

## Creating a New Script

1. Copy `default.user.js.txt` as a template
2. Rename to `yourscript.user.js`
3. Edit the metadata and add your code
4. Run `./prepare.py yourscript.user.js` to set URLs
5. Commit, push, and open in browser to install

## GitHub Remote

- Repo: `https://github.com/sdzkz/userscripts-git.git`
- Raw URL base: `https://raw.githubusercontent.com/sdzkz/userscripts-git/main/`
