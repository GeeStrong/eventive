# Eventive

Eventive is a lightweight React and Vite web application designed to help users organize, track, and manage their daily schedules. It provides an intuitive interface for planning both personal and professional commitments, such as meetings, appointments, and social events.

## What it does

Eventive lets each user:

- Create an account and log in
- Add events with a name, date, time, location, and description
- See all events on a single dashboard, sorted chronologically
- Tell at a glance which events are still upcoming and which have passed
- Edit or delete any event
- Find quick answers on a built-in Help page

Every user only sees their own events, and everything is saved automatically so it's still there the next time you open the app.

## Why it's useful

Most to-do apps are built for tasks, not for things with a specific date and time attached. Eventive is intentionally small and focused: no boards, no tags, no clutter — just "what's happening, and when." That makes it a good fit for:

- Anyone who wants a lightweight personal calendar without a full calendar app
- Learning or teaching how a real CRUD app is put together (auth, forms, validation, routing, persistent state)
- A starting point to fork and extend with your own features

### Installation

```bash
# Clone the repository
git clone https://github.com/GeeStrong/eventive.git
cd eventive

# Install dependencies
npm install
```

### Running the app

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

### Building for production

```bash
npm run build
```

### First-time use

1. Open the app and click **Sign up** to create an account.
2. Log in with your new username and password.
3. Click **+ Add event** to create your first event.
4. Manage everything from your **Dashboard**.

> Your data is stored locally in your browser (via `localStorage`), so it's tied to that browser and device.
