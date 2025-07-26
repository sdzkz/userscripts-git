Below are **ready-to-copy** templates plus a **10-line Python generator** that turns any `.user.js` file into a stub.

---

### 1. Real file (repo side)

`src/big_scrollbar.user.js`

```javascript
// ==UserScript==
// @name         Big Scrollbar
// @namespace    https://github.com/sdzkz/userscripts-git
// @version      0.1
// @description  Increase the width of scrollbars on all pages
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar {
            width: 30px !important;
            height: 30px !important;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
        }
        ::-webkit-scrollbar-thumb {
            background: #888 !important;
            border-radius: 5px !important;
        }
    `;
    document.head.appendChild(style);
})();
```

---

### 2. Stub file (Tampermonkey side)

`big_scrollbar.stub.user.js`  
(Install this once; never commit it.)

```javascript
// ==UserScript==
// @name         Big Scrollbar (loader)
// @namespace    tamperloader
// @version      1
// @description  Loader stub for Big Scrollbar
// @match        *://*/*
// @grant        GM_getValue
// @require      https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/big_scrollbar.user.js#pat=
// ==/UserScript==

(() => {
    const pat = GM_getValue('github_pat', '');
    if (pat) {
        // Dummy query param to bust cache when token changes
        const url = new URL('https://raw.githubusercontent.com/sdzkz/userscripts-git/main/src/big_scrollbar.user.js');
        url.searchParams.set('pat', pat);
        // Tampermonkey already fetched via @require; nothing else to do
    }
})();
```

---

### 3. One-command stub generator (`make_stub.py`)

Save as `make_stub.py` in the repo root.

```python
#!/usr/bin/env python3
"""
Usage:
    python make_stub.py src/some_script.user.js
Creates: stub/some_script.stub.user.js
"""
import re, sys, pathlib, textwrap

if len(sys.argv) != 2:
    sys.exit("Usage: python make_stub.py path/to/script.user.js")

src = pathlib.Path(sys.argv[1])
stub_dir = pathlib.Path("stub")
stub_dir.mkdir(exist_ok=True)

name = re.search(r'@name\s+(.+)', src.read_text()).group(1).strip()
stub_name = f"{name} (loader)"

stub = textwrap.dedent(f'''\
    // ==UserScript==
    // @name         {stub_name}
    // @namespace    tamperloader
    // @version      1
    // @description  Loader stub for {name}
    // @match        *://*/*
    // @grant        GM_getValue
    // @require      https://raw.githubusercontent.com/sdzkz/userscripts-git/main/{src}#pat=
    // ==/UserScript==

    (() => {{
        const pat = GM_getValue('github_pat', '');
        if (pat) {{
            const url = new URL('https://raw.githubusercontent.com/sdzkz/userscripts-git/main/{src}');
            url.searchParams.set('pat', pat);
        }}
    }})();
''')

out = stub_dir / f"{src.stem}.stub.user.js"
out.write_text(stub)
print(f"Stub written → {out}")
```

Run:

```bash
python make_stub.py src/big_scrollbar.user.js
# stub/big_scrollbar.stub.user.js created
```

Drag-and-drop the generated stub into Tampermonkey once; updates come automatically from the repo.