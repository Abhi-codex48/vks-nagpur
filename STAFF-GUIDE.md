# VKS Website — Staff Content Guide
## How to update the website without touching any code

---

## 1. ADD A NEW PUBLICATION (Article / Tax Alert)

Open the file: `publications.json`

It looks like this:
```json
[
  {
    "title": "Key Changes in GSTR-9 & GSTR-9C for FY 2019-20",
    "tag": "GST & Indirect Tax",
    "excerpt": "Short description of the article in 1-2 sentences.",
    "date": "December 2020",
    "read": "8 min read"
  }
]
```

To add a new article, copy one block and paste it at the TOP (before the first `{`), like this:

```json
[
  {
    "title": "Your New Article Title Here",
    "tag": "GST & Indirect Tax",
    "excerpt": "One or two sentence description of what the article covers.",
    "date": "March 2026",
    "read": "5 min read"
  },
  {
    "title": "Key Changes in GSTR-9 ..."
```

**Available tags** (use exactly as written):
- `GST & Indirect Tax`
- `Direct Tax`
- `IBC & Insolvency`
- `Corporate Law`
- `Audit & Assurance`
- `FEMA & RBI`
- `Budget Updates`

Save the file and push/upload to GitHub. The website updates automatically.

---

## 2. ADD A MONTHLY BULLETIN (PDF)

1. Name your PDF exactly like this: `March-2026.pdf` (Month-Year.pdf)
2. Drop it into the `bulletins/` folder in the GitHub repo
3. Push/upload to GitHub
4. GitHub Actions runs automatically and updates the website within 1-2 minutes

**Naming examples:**
- `January-2026.pdf` ✅
- `February-2026.pdf` ✅
- `March 2026.pdf` ❌ (no spaces)
- `bulletin.pdf` ❌ (won't show a proper name)

---

## 3. ADD GALLERY PHOTOS

Drop your photos (.jpg or .png) into the correct folder:

| What type of photo?            | Which folder?                          |
|-------------------------------|----------------------------------------|
| Seminar / client event / talk  | `images/seminar-knowledge/`            |
| Team outing / internal event   | `images/team-movements/`              |
| Weekend Charcha / articleship  | `images/weekend-charcha/`             |

**The photo name becomes the caption** on the website, so name it clearly:
- `GST-Seminar-March-2026.jpg` → shows as "GST Seminar March 2026"
- `Budget-Briefing-February-2026.jpg` → shows as "Budget Briefing February 2026"
- `IMG_1234.jpg` ❌ (will show as "IMG 1234" — not helpful)

After uploading, GitHub Actions runs and the photo appears in the matching gallery section within 1-2 minutes.

---

## 4. HOW TO UPLOAD FILES TO GITHUB

If you have GitHub Desktop installed:
1. Copy your file into the correct folder on your computer
2. Open GitHub Desktop → you'll see the new file listed
3. Write a short message (e.g. "Added March 2026 bulletin")
4. Click **Commit to main**
5. Click **Push origin**
6. Done — website updates in ~2 minutes

If uploading via GitHub.com:
1. Go to the repo on github.com
2. Navigate to the correct folder
3. Click **Add file → Upload files**
4. Drag and drop your file
5. Click **Commit changes**
6. Done

---

## Need Help?
Contact the website developer or call the office.
