#!/bin/zsh

if [[ -z "$1" ]]; then
  echo "Usage: bump-version.sh <userscript.user.js>"
  exit 1
fi

if [[ ! -f "$1" ]]; then
  echo "File not found: $1"
  exit 1
fi

current=$(grep -m1 '@version' "$1" | sed 's/.*@version[[:space:]]*//')

if [[ -z "$current" ]]; then
  echo "No @version found in $1"
  exit 1
fi

# Bump last number segment
new=$(echo "$current" | awk -F. '{$NF=$NF+1; print}' OFS=.)

sed -i '' "s/@version[[:space:]]*$current/@version      $new/" "$1"

echo "$1: $current -> $new"
