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
