# VK&S Website — HR Admin Panel Setup (one-time, ~20 minutes)

After this setup, HR opens **www.cavks.in/admin.html**, clicks
**Sign in with Google**, and edits Job Openings, Articles & Alerts and
The Team in simple forms. No code, no GitHub, no JSON.

Only the Google accounts you list in Step 5 can save anything.
Everyone else (even if they find the page) can only look at a login screen.

Until this setup is done, the website keeps working exactly as before,
loading content from the JSON files in this repo.

---

## Step 1 — Create the Firebase project

1. Go to https://console.firebase.google.com and sign in
   (e.g. with admin.cavks@gmail.com).
2. Click **Add project** → name it `vks-website` → Google Analytics
   is not needed (disable) → **Create project**.

## Step 2 — Enable Google sign-in

1. In the left menu: **Build → Authentication → Get started**.
2. Sign-in method tab → **Google** → Enable → set support email → Save.
3. Still in Authentication: **Settings → Authorized domains** →
   **Add domain** for each of:
   - `cavks.in`
   - `www.cavks.in`
   - your `*.github.io` domain if the site is also served there

## Step 3 — Create the database

1. Left menu: **Build → Firestore Database → Create database**.
2. Location: `asia-south1 (Mumbai)` → **Start in production mode** → Create.

## Step 4 — Paste the security rules

In Firestore → **Rules** tab, replace everything with the rules below.
**Edit the email list** — these are the only accounts that can edit content:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isEditor() {
      return request.auth != null
        && request.auth.token.email_verified
        && request.auth.token.email in [
          'admin.cavks@gmail.com',
          'hr.person@gmail.com'
        ];
    }

    match /jobs/{id} {
      allow read: if true;
      allow write: if isEditor();
    }
    match /publications/{id} {
      allow read: if true;
      allow write: if isEditor();
    }
    match /team/{id} {
      allow read: if true;
      allow write: if isEditor();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish**. To add or remove an editor later, edit this list and
publish again — that is the entire access control.

## Step 5 — Connect the website

1. Firebase console → Project overview → click the **</>** (Web) icon →
   register an app named `vks-site` (no hosting needed).
2. Firebase shows a config block. Copy the three values into
   **firebase-config.js** in this repo:

```js
window.VKS_FIREBASE = {
  apiKey: "AIza....",                 // from firebaseConfig.apiKey
  authDomain: "vks-website.firebaseapp.com",
  projectId: "vks-website"
};
```

3. Commit the file. (These values are public identifiers, not secrets —
   all protection comes from the rules in Step 4.)

## Step 6 — Import today's content (HR can do this part)

1. Open **www.cavks.in/admin.html** → Sign in with an allowed account.
2. On each tab (Job Openings / Articles & Alerts / The Team), click
   **Import current website data** once. This copies what is currently
   on the site into the editor.
3. Done. From now on, all edits happen in this panel and go live
   within seconds.

---

## How it works / good to know

- **Reads are public, writes are locked.** The website reads the same
  database anonymously; only listed editors can change it.
- **Fallback:** if Firebase is ever unreachable, the site silently falls
  back to the JSON files in this repo, so the pages never break.
- The JSON files (`job-openings.json`, `publications.json`, `team.json`)
  become the *fallback snapshot*. Occasionally updating them from the
  live data keeps the fallback fresh, but it is not required.
- The admin page is not linked anywhere on the site and is marked
  `noindex` — but its real protection is the rules, not obscurity.
- Free tier limits (50k reads/day) are far beyond this site's traffic.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| "No permission — account not on allowed list" when saving | The signed-in Gmail is not in the rules list (Step 4). Add it and Publish. |
| Sign-in popup closes with an error | The domain is missing under Authentication → Authorized domains (Step 2.3). |
| Admin page says "Not configured yet" | `firebase-config.js` still has empty values (Step 5). |
| Site shows old jobs | Hard-refresh (Ctrl+F5). The pages cache nothing, but the browser may. |
