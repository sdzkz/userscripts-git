#!/usr/bin/env python3
import os
import sys
import re

# Base URL for raw GitHub files
BASE_URL = "https://raw.githubusercontent.com/sdzkz/userscripts/main/"

def process_userscript(file_path):
    # Get just the filename for URL
    file_name = os.path.basename(file_path)
    script_url = BASE_URL + file_name
    
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

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python prepare.py <userscript-file>")
        sys.exit(1)
    
    for file_path in sys.argv[1:]:
        if os.path.isfile(file_path):
            process_userscript(file_path)
        else:
            print(f"File not found: {file_path}")
