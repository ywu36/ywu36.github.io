# ywu36.github.io

Personal site of Rein (Yuhang) Wu. Static Jekyll site built by GitHub Pages; no server code, no third-party scripts by default.

## Layout

```
_config.yml           site settings (address, date formats, comments, MathJax pin)
_data/
  profile.yml         headline, focus areas, location, education, links
  experience.yml      experience entries (key links pubs/patents to an entry)
  publications.yml    papers (exp = experience key)
  patents.yml         patents (status: granted | pending; exp = experience key)
  press.yml           press, talks, awards
_posts/               posts and updates (one Markdown file each)
_drafts/TEMPLATE.md   front-matter reference (not published)
_layouts/             default (shell) · page (About) · post
_includes/            one component per file; header comment says what it does
assets/css/site.css   all styles
assets/js/site.js     all behaviour (tabs, copy link, external links)
assets/fonts/         self-hosted fonts (SIL OFL, see OFL.txt)
assets/img/<slug>/    post images
index.html            home · about.html · feed.xml (Atom)
scripts/new_post.sh   create a dated post/update file
```

## Publish

```
bash scripts/new_post.sh "Post title"           # post
bash scripts/new_post.sh --update "short-slug"  # update (no title, no image)
git add . && git commit -m "New post" && git push   # live in ~1 min
```

Front matter (see `_drafts/TEMPLATE.md`): `title`, `date` (= file-name date), `kind: update`, `tags`, `featured` (Top post), `math`, `comments`, `original`, `image`, `image_fit`, `image_bg`. Text before `<!--more-->` is the summary.

## Edit profile / CV

Change the files in `_data/` — the home tabs, sidebar and About page all read from them.

## Comments (giscus)

Off until `repo_id` and `category_id` are set in `_config.yml`:
1. Repo → Settings → Features → enable **Discussions**; add category `Comments` (type: Announcement).
2. Install https://github.com/apps/giscus for this repo only.
3. https://giscus.app → repo `ywu36/ywu36.github.io`, mapping *pathname*, category `Comments` → copy `data-repo-id`, `data-category-id` into `_config.yml`.

Moderation (repo → Discussions): **Delete** a comment (content gone; an anonymous "comment deleted" entry remains on GitHub), **Lock conversation** to close a thread, `comments: false` to remove the box from a post, `giscus.repo: ""` to turn comments off site-wide, block users in GitHub Settings → Moderation. Hidden comments can be expanded by anyone; edits keep a public history — delete instead.

## Security

- `Content-Security-Policy` (in `_includes/csp.html`): same-origin only; adds giscus only on posts with comments on, jsDelivr only on pages with `math: true`. No inline scripts.
- Fonts are self-hosted. MathJax is pinned (3.2.2) with a Subresource Integrity hash; to upgrade, change `mathjax.src` and recompute: `curl -sL <src> | openssl dgst -sha384 -binary | openssl base64 -A`.
- Repo is public: no secrets, no private drafts. Commits use the GitHub noreply email.

## Local preview (optional)

`bundle install && bundle exec jekyll serve` → http://localhost:4000
