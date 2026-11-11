#!/usr/bin/env bash
# Create a dated file in _posts/ and print its path.
#   bash scripts/new_post.sh "Post title"          -> post (title, summary, cover)
#   bash scripts/new_post.sh --update "short-slug"  -> update (no title; text goes in the body)
set -euo pipefail

kind=post
if [[ "${1:-}" == "--update" ]]; then kind=update; shift; fi
name="${1:?usage: new_post.sh [--update] \"Title or slug\"}"

slug=$(printf '%s' "$name" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
[[ -n "$slug" ]] || { echo "error: title must contain latin letters or digits (used for the URL)" >&2; exit 1; }

day=$(date +%Y-%m-%d)
file="$(cd "$(dirname "$0")/.." && pwd)/_posts/$day-$slug.md"
[[ ! -e "$file" ]] || { echo "error: $file already exists" >&2; exit 1; }

if [[ "$kind" == "update" ]]; then
  cat > "$file" <<EOT
---
title: ""
date: $day
kind: update
---

Write the update here.
EOT
else
  cat > "$file" <<EOT
---
title: "$name"
date: $day
tags: []
featured: false
---

Summary paragraph (shown in the list and link previews).

<!--more-->

Body in Markdown.
EOT
fi
echo "$file"
