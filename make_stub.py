#!/usr/bin/env python3
"""
Usage:
    python make_stub.py some_script.user.js

Creates:
    stub/some_script.stub.user.js

This script generates a loader (stub) for a userscript located in a private
GitHub repository. The loader uses GM_xmlhttpRequest to fetch the main script,
authenticating with a Personal Access Token (PAT) stored by a separate
"Authenticator" userscript.
"""
import re
import sys
import pathlib
import textwrap

# --- Configuration ---
# Your GitHub repository details.
GITHUB_USER = "sdzkz"
GITHUB_REPO = "userscripts-git"
GITHUB_BRANCH = "main"

# The key used to store the PAT in Tampermonkey's storage via GM_setValue.
# This MUST match the key used in your separate "GitHub PAT Authenticator" script.
PAT_STORAGE_KEY = "github_read_pat"
# --- End Configuration ---

# Template for the generated loader script.
LOADER_TEMPLATE = """\
// ==UserScript==
// @name         {name} (loader)
// @namespace    {namespace}
// @version      {version}
// @description  Loader for {name}. Requires the GitHub PAT Authenticator script.
// @author       {author}
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// ==/UserScript==

/*
 * This is an auto-generated loader script. It is designed to fetch the main
 * script from a private GitHub repository.
 *
 * It requires the "GitHub PAT Authenticator" userscript to be installed and
 * configured with a read-only token.
 */

(function() {{
    'use strict';

    const SCRIPT_URL = '{script_url}';
    const PAT_KEY = '{pat_key}';

    const pat = GM_getValue(PAT_KEY, null);

    if (!pat) {{
        console.error(`'{name} (loader)': GitHub PAT not found. ` +
                      `Please install and run the "GitHub PAT Authenticator" script from the Tampermonkey menu to set it.`);
        return;
    }}

    GM_xmlhttpRequest({{
        method: 'GET',
        url: SCRIPT_URL,
        headers: {{
            'Authorization': `Bearer ${{pat}}`,
            'Accept': 'application/vnd.github.v3.raw',
            'Cache-Control': 'no-cache' // Ensures the latest version is always fetched
        }},
        onload: function(response) {{
            if (response.status === 200) {{
                // Execute the fetched script in the global scope.
                // This is safer than eval() as it doesn't leak local variables.
                new Function(response.responseText)();
            }} else if (response.status === 401 || response.status === 404) {{
                console.error(`'{name} (loader)': Failed to fetch script (Status: ${{response.status}}). ` +
                              `Your PAT may be invalid, expired, or lack SSO authorization for the repo. ` +
                              `Please update it using the Authenticator script.`);
            }} else {{
                console.error(`'{name} (loader)': Failed to fetch script. Status: ${{response.status}}`, response);
            }}
        }},
        onerror: function(response) {{
            console.error(`'{name} (loader)': A network error occurred while fetching the script.`, response);
        }}
    }});
}})();
"""

def parse_metadata(script_content):
    """Parses the userscript metadata block and returns it as a dictionary."""
    metadata = {}
    metadata_block_regex = re.compile(r"// ==UserScript==(.*?)// ==/UserScript==", re.DOTALL)
    metadata_line_regex = re.compile(r"//\s*@(\S+)\s+(.*)")

    match = metadata_block_regex.search(script_content)
    if not match:
        raise ValueError("Could not find a valid UserScript metadata block.")

    for line in match.group(1).splitlines():
        line_match = metadata_line_regex.match(line)
        if line_match:
            key, value = line_match.groups()
            metadata[key.strip()] = value.strip()
    return metadata


def main():
    if len(sys.argv) != 2:
        sys.exit(f"Usage: python {sys.argv[0]} path/to/script.user.js")

    src_path = pathlib.Path(sys.argv[1])
    if not src_path.is_file():
        sys.exit(f"Error: Source file not found at '{src_path}'")

    # The script now creates the 'stub' directory relative to its own location.
    # This is more robust than assuming the CWD.
    script_dir = pathlib.Path(__file__).parent
    stub_dir = script_dir / "stub"
    stub_dir.mkdir(exist_ok=True)

    try:
        content = src_path.read_text(encoding="utf-8")
        metadata = parse_metadata(content)

        required_keys = ['name', 'namespace', 'version', 'author']
        if not all(key in metadata for key in required_keys):
            missing = [key for key in required_keys if key not in metadata]
            sys.exit(f"Error: Source script '{src_path.name}' is missing required metadata: {', '.join(missing)}")

        # Construct the raw content URL. Assumes the source path is relative to the repo root.
        script_url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{GITHUB_REPO}/{GITHUB_BRANCH}/{src_path.as_posix()}"

        # Populate the template with the parsed metadata
        stub_content = LOADER_TEMPLATE.format(
            name=metadata.get('name'),
            namespace=metadata.get('namespace'),
            version=metadata.get('version'),
            author=metadata.get('author'),
            script_url=script_url,
            pat_key=PAT_STORAGE_KEY
        )

        # Use textwrap.dedent to clean up the final string, similar to your original script
        final_stub = textwrap.dedent(stub_content)

        # Create the output file path
        out_path = stub_dir / f"{src_path.stem}.stub.user.js"
        out_path.write_text(final_stub, encoding="utf-8")
        
        print(f"Success! Loader script written to → {out_path.relative_to(script_dir)}")

    except Exception as e:
        sys.exit(f"An error occurred: {e}")


if __name__ == "__main__":
    main()

