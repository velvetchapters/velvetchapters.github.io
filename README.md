# Lightweight Webnovel Library Site Template

A modern, ultra-fast single-page application (SPA) architecture built for webnovel authors with **thousands of chapters** hosted for free on **GitHub Pages**.

## 🚀 Key Features

- **Handles 1,000+ Chapters with Ease:** Chapters are loaded dynamically as lightweight JSON files. Zero slow build timeouts!
- **Multi-Novel Support:** Unlimited novels, complete with Catalog page, Novel Details page, and individual Table of Contents.
- **Built-in Reader Tooling:** Dark / Light / Sepia modes, customizable font size, chapter word counters, and LocalStorage progress tracking (remembers last read chapter per novel).
- **Monetization Included:** Prominent Patreon & Ko-fi Call to Action (CTA) buttons on the Homepage, Novel Details page, and at the end of every chapter.
- **Zero Dependencies:** Built in pure HTML, CSS, and Vanilla JavaScript. No framework installation or npm builds required!

---

## 📁 Folder Structure

```text
├── index.html             # Homepage (Featured novels & latest releases)
├── novels.html            # Novel catalog with live search & filtering
├── novel.html             # Novel details page (?id=novel-slug)
├── reader.html            # Chapter reader page (?novel=novel-slug&ch=1)
├── assets/                # Cover images (SVG/PNG/JPG)
├── data/
│   ├── novels.json        # Global registry of all your novels
│   ├── void-walker/       # Subfolder for Novel 1
│   │   ├── meta.json      # Novel info & chapter list
│   │   ├── 1.json         # Chapter 1 content
│   │   ├── 2.json
│   │   └── ...
│   └── dragon-emperor/    # Subfolder for Novel 2
│       ├── meta.json
│       ├── 1.json
│       └── ...
└── tools/
    └── split_chapters.py  # Python script to convert raw text files into JSON
```

---

## ⚡ How to Add New Chapters & Novels

### Method A: Using the Python Auto-Splitter Tool (Recommended for Thousands of Chapters)
1. Place your story in a `.txt` file formatted like:
   ```text
   Chapter 1: The Beginning
   First paragraph of your story...

   Chapter 2: The Next Step
   Second chapter text...
   ```
2. Run `python tools/split_chapters.py` in your terminal or edit the script to auto-generate all `1.json`, `2.json`, and `meta.json` files in seconds!

### Method B: Manual Creation
1. Create a new folder inside `data/` (e.g. `data/my-novel/`).
2. Add a `meta.json` file inside with novel details and chapter listings.
3. Add chapter files like `1.json`, `2.json`, etc.:
   ```json
   {
     "title": "Chapter 1: The Beginning",
     "paragraphs": [
       "First paragraph...",
       "Second paragraph..."
     ]
   }
   ```
4. Register the new novel in `data/novels.json`.

---

## 🌐 Deploying to GitHub Pages

1. **Create a GitHub Repository:**
   - Go to [GitHub](https://github.com) -> New Repository -> Name it (e.g. `my-webnovels`).
2. **Push Your Files:**
   - Upload all files from this folder to the repository.
3. **Enable GitHub Pages:**
   - Go to **Settings** -> **Pages** in your GitHub repository.
   - Under **Source**, select `Deploy from a branch`.
   - Choose `main` (or `master`) branch and `/ (root)` folder.
   - Click **Save**.
4. **Done!** Your site will be live at `https://yourusername.github.io/my-webnovels/`.

---

## 💰 Updating Your Patreon & Ko-fi Links

Open `index.html`, `novel.html`, and `reader.html`, then search for `https://patreon.com/yourname` and `https://ko-fi.com/yourname` to replace them with your actual support URLs.
