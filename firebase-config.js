/* ============================================================
   VK&S — Firebase configuration (one-time setup)
   ============================================================
   Fill these three values from the Firebase console after
   following HR-ADMIN-SETUP.md. Until then they stay empty and
   the website automatically keeps loading content from the
   JSON files in this repo (job-openings.json / publications.json).

   These values are PUBLIC identifiers, not secrets — write
   access is enforced by Firestore security rules, which only
   allow the Google accounts you list there.
============================================================ */
window.VKS_FIREBASE = {
  apiKey: "",
  authDomain: "",
  projectId: ""
};
