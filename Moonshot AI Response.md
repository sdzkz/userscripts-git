You can still have **full Git history + one-click browser install** without Node or npm.  
The trick is to let Tampermonkey fetch the raw file straight from your Git host (GitHub, GitLab, Gitea, etc.) every time the browser starts.

---

### 1. One-time setup (no npm, no build tools)

| Step | Action |
|------|--------|
| 1.1 | Push your repo to GitHub (public or private). |
| 1.2 | In Tampermonkey create a **new userscript** that contains only the `@require` directive pointing to the raw file: |

```javascript
// ==UserScript==
// @name         My GitHub-hosted script
// @match        https://stackoverflow.com/*
// @require      https://raw.githubusercontent.com/YOU/REPO/BRANCH/src/stackoverflow-tweaks.user.js
// @grant        none
// ==/UserScript==
```

- Replace `YOU/REPO/BRANCH/src/stackoverflow-tweaks.user.js` with the actual path.  
- If the repo is **private**, use a **personal access token** in the URL:  
  `https://TOKEN@raw.githubusercontent.com/...`

1.3 Save the stub script once. Tampermonkey will download the real code on every browser start or when you hit **“Check for userscript updates”**.

---

### 2. Daily workflow

| Git side | Browser side |
|----------|--------------|
| `git commit -am "fix: typo"` | `git push` |
| Nothing else | Tampermonkey auto-updates the next time you open the browser or press **“Check for updates”**. |

---

### 3. Multiple scripts

Create one stub per script:

```
tampermonkey-stubs/
├── github-dark.stub.user.js
├── stack-overflow-tweaks.stub.user.js
└── README.md
```

Keep the stubs in the same repo if you like; they are only a few lines each.

---

### 4. Offline development

If you need to test changes before pushing, temporarily install the local file via Tampermonkey’s **“Install from file”** (drag-and-drop).  
Once you’re happy, commit, push, and switch back to the stub that uses the GitHub URL.

---

### 5. Alternative hosts

- **Gitea / Forgejo / GitLab** work the same way; just use their raw-file URL.  
- **Gist** is also fine; each file in a gist has its own raw URL.

---

### TL;DR without npm

1. Host the `.user.js` file in GitHub.  
2. Create a 5-line stub in Tampermonkey that `@require`s the raw URL.  
3. Push → browser updates automatically.