#!/usr/bin/env python3
import os
import sys
import re

# Base URL for raw GitHub files
BASE_URL = "https://raw.githubusercontent.com/sdzkz/userscripts-git/main/"

def process_userscript(file_path):
    # Get relative path from current directory for URL
    rel_path = os.path.relpath(file_path)
    script_url = BASE_URL + rel_path.replace('\\', '/')  # Windows path fix
    
    # Read the file content
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Metadata block pattern
    metadata_pattern = r'(\/\/ ==UserScript==\n)(.*?)(\/\/ ==\/UserScript==\n)'
    match = re.search(metadata_pattern, content, re.DOTALL)
    
    if not match:
        print(f"Error: No UserScript metadata block found in {file_path}")
        return
    
    header_start, metadata, header_end = match.groups()
    new_metadata = metadata
    
    # Prepare new headers
    new_headers = [
        f"// @updateURL    {script_url}",
        f"// @downloadURL  {script_url}"
    ]
    
    # Add/update each header
    for header in new_headers:
        header_name = header.split()[1]  # e.g., '@updateURL'
        pattern = rf'^(\s*\/\/\s*{re.escape(header_name)}\s*).*$'
        
        if re.search(pattern, new_metadata, re.MULTILINE):
            # Update existing header
            new_metadata = re.sub(
                pattern,
                r'\1' + script_url,
                new_metadata,
                flags=re.MULTILINE
            )
        else:
            # Add new header at end of metadata block
            new_metadata += header + '\n'
    
    # Reconstruct content
    new_content = content.replace(
        match.group(0),
        header_start + new_metadata + header_end
    )
    
    # Write changes back to file
    with open(file_path, 'w') as f:
        f.write(new_content)
    
    print(f"Updated metadata in {file_path}")

def find_userscripts(start_dir='.'):
    """Recursively find all .user.js files, skipping hidden directories"""
    user_js_files = []
    for root, dirs, files in os.walk(start_dir):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.user.js'):
                user_js_files.append(os.path.join(root, file))
    return user_js_files

if __name__ == "__main__":
    # Handle --all flag
    if len(sys.argv) == 2 and sys.argv[1] == '--all':
        print("Processing all .user.js files...")
        scripts = find_userscripts()
        for file_path in scripts:
            process_userscript(file_path)
        print(f"Processed {len(scripts)} files")
        sys.exit(0)
    
    # Handle normal file arguments
    if len(sys.argv) < 2:
        print("Usage: python prepare.py <userscript-file>")
        print("       python prepare.py --all")
        sys.exit(1)
    
    for file_path in sys.argv[1:]:
        if os.path.isfile(file_path):
            process_userscript(file_path)
        else:
            print(f"File not found: {file_path}")

