# Locked-In

Locked-In is a local-first calendar, goals, money, and habit tracker. The core app is a single `index.html` file built with vanilla HTML, CSS, and JavaScript. It uses one IndexedDB state for scheduled tasks, unscheduled goals, finances, accounts, savings, and habit history. Space Grotesk and Lucide icons are embedded locally, so the app has no external runtime dependencies.

## Run locally

Open `index.html` in a current browser to use the app. For service-worker caching and installed-app behavior, serve the folder from `localhost` instead (for example, `python -m http.server 8080` in the folder) and open `http://localhost:8080`. Browser security rules block service workers from `file://` pages. The first visit to the localhost or deployed HTTPS address needs to load online once to cache the app shell. After that, the app shell can open offline; data is stored separately in that browser's IndexedDB.

If IndexedDB is unavailable, the app warns that changes will only last for the current session. Local data does not automatically sync to another browser or device. Use JSON export and import in Settings to make or restore a backup.

## Deploy to Vercel

1. Use the `outputs` folder as the static project root, or place its contents at your repository root. Keep all files together, including the two license notices.
2. Import the repository in Vercel (or run `vercel --prod` from this folder).
3. Choose the static/Other preset. No build command, database, environment variables, or API keys are needed.
4. Deploy over HTTPS and open the site once while online so the service worker can cache the app shell.

`manifest.webmanifest` points to `icon-192.png` and `icon-512.png`; `icon.svg` is the favicon. The calendar-check and lock line art uses the app's mint accent (`#a5d7c1`) on its matte dark palette. The manifest and service worker must remain beside `index.html` for PWA install and offline support.

## Included features

- Month, week, day, dashboard, and general-goals views. Goals do not get a scheduled time; each can optionally have a deadline.
- Tasks support all-day or timed schedules, priority, notes, category and color, visibility label, reminders, recurrence, per-occurrence edits, overlap warnings, duplicate, undo, and drag-to-reschedule.
- Money tracker includes daily and monthly spending limits, expense and income records, multiple accounts (with a default Cash account), account transfers, savings targets, and a manual option to move unspent daily-limit money into a savings goal. By default, unspent money stays in the account balance; nothing is moved automatically. Values use Indian rupees (INR).
- Weekly habit board with custom scheduled days, check-ins, weekly completion, and current streaks.
- Search and filters, JSON backup and restore, clear-all-data confirmation, configurable week start and time format, print view, browser notifications, and responsive mobile navigation.
- The overview statistics are calculated from the app's saved tasks and completion history.

## Sharing and notifications

Two-user calendar sharing is unavailable in this static, local-only app. Real sharing requires authenticated backend storage and access controls; no backend or credentials are configured here. The app does not make fake share links. Private task details are never sent anywhere. Public/private is a local task label only and does not publish tasks.

Browser reminders require notification permission. They are checked while the app is open; reminders cannot be delivered after the browser closes without a push-notification service.

## Licenses

The embedded Space Grotesk font is distributed under the SIL Open Font License; see `SpaceGrotesk-OFL.txt`. Embedded Lucide icons are distributed under their respective licenses; see `Lucide-LICENSE.txt`.
