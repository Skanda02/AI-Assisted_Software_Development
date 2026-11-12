# Session 3: Building a Real-World Application Using AI-Assisted Development Tools

**Duration:** 1.5 Hours  
**Topic:** From a Real Problem to a Working Application with AI  
**Project:** CampusConnect — Campus Event Management App

---

## 1. Introduction

In Session 1, we learned how to manage code with Git and GitHub, and how to write clear prompts for AI.

In Session 2, we learned what AI coding assistants and AI agents are, how they work, and why human review is still essential.

In this session, we put everything together. We take a real campus problem and build a working application with the help of AI.

The goal is not to memorise code. The goal is to learn the **process**:

1. Understand a problem.
2. Turn it into clear requirements.
3. Choose how much work to hand to AI.
4. Build in small, verifiable steps.
5. Test, fix and improve what AI produces.

By the end of this session, students will have practiced:

- Converting a real-world problem into an application.
- Understanding how anyone can build software using AI.
- Telling the difference between AI-assisted development and AI-agent development.
- Using prompts to generate frontend and backend behaviour.
- Understanding how frontend, data and storage interact.
- Implementing basic create, read, update and delete operations.
- Testing and debugging an AI-generated application.

---

## 2. Project Roadmap: From Wireframe to Actual App

Use this checklist throughout the session. Every item maps to a part of the build and a section of these notes.

- [ ] **Core logic** — What must the application actually do? Events are listed, a student registers once, registrations are stored, and the admin sees live counts. See Sections 5.3 and 6.
- [ ] **Technologies** — HTML, CSS and plain JavaScript in the browser, with `localStorage` for persistence. Flask + SQLite is the optional upgrade. See Sections 5.4 and 6.11.
- [ ] **UI** — The starter wireframe already provides the pages, forms, tables and styling. Keep that structure; add behaviour, not decoration. See Section 5.6.
- [ ] **System's Architecture Design** — Separate the interface from the data so storage can be replaced later. See Sections 5.4 and 5.5.
- [ ] **Core Algorithm** — Validate input, detect duplicate registrations, group registrations by event, and calculate admin statistics. See Sections 6.5 – 6.8.
- [ ] **Project Flow** — Build in phases: inspect, model data, render, validate, save, prevent duplicates, connect admin, test. See Section 6.
- [ ] **Revision** — Verify against the test checklist, review the code, and answer the revision questions. See Sections 8 and 13.

### 2.1 The 90-minute session flow

| Time | Segment | Outcome |
|---|---|---|
| 0:00 – 0:10 | Recap and the two ways AI can help | Understand the session flow |
| 0:10 – 0:25 | How anyone can build using AI | Learn the human + AI workflow |
| 0:25 – 0:35 | AI-assisted vs AI-agent development | Choose the right mode of working |
| 0:35 – 0:45 | Understand CampusConnect | Turn a problem into requirements |
| 0:45 – 1:20 | Build sprint | Build the working prototype |
| 1:20 – 1:30 | Test, demo and wrap-up | Verify the result and reflect |

**Rule for the build sprint:** every phase ends with something you can open in a browser and check. Do not move on until the current phase works.

---

## 3. How Anyone Can Build Using AI

### 3.1 The barrier has moved

Before AI tools, the hardest part of building an application was often writing the code correctly. You had to remember syntax, libraries and platform details.

With AI, the hardest part has moved. The hard part is now:

- Knowing **what** you want to build.
- Describing it **clearly**.
- Checking whether what came back is **correct**.

Anyone can type a prompt. That does not mean anyone can ship a good application. What makes the difference is clarity and verification, not typing speed.

### 3.2 You are the architect; AI is the fast typist

A useful way to think about it:

| Human | AI |
|---|---|
| Decides the problem and the users | Generates code and suggestions |
| Defines what "done" means | Produces a first draft quickly |
| Chooses what to keep or reject | Can repeat variations cheaply |
| Tests the result | Can help find and fix errors |
| Takes responsibility for the final product | Has no real understanding of the consequences |

AI can write code faster than any human. It cannot decide what is worth building, or whether the result is correct for your users.

### 3.3 The five-step loop anyone can follow

```text
Understand  →  Describe  →  Generate  →  Verify  →  Improve
     ↑                                                │
     └──────────────── repeat ────────────────────────┘
```

1. **Understand** — What problem is this solving? Who is it for?
2. **Describe** — What should it do? What data does it need? What is out of scope?
3. **Generate** — Ask AI for a small, specific piece.
4. **Verify** — Open it, use it, test edge cases, read the code.
5. **Improve** — Fix what is wrong, then repeat for the next small piece.

Most beginner failures come from skipping **Understand** and **Verify**: prompting a large vague request first, then accepting the result without testing it.

### 3.4 The four questions before any prompt

Before you ask AI to build something, answer these in plain language:

1. **What** should the user be able to do?
2. **Who** is the user?
3. **What data** must be stored or shown?
4. **How will I know it works?**

Example for CampusConnect:

1. A student should be able to see events and register for one.
2. The user is a college student; a second user is an administrator.
3. We need events and registrations.
4. It works if I can register, refresh the page, and still see my registration — and the admin page counts it.

If you cannot answer these, AI cannot either.

### 3.5 What "anyone can build" really means

- You **can** build a working prototype without memorising syntax.
- You **can** use AI to explain code you do not understand.
- You **can** start with a small, useful version instead of a complete product.
- You **cannot** skip understanding what you ship.
- You **cannot** skip testing.
- You **cannot** assume AI output is correct, secure or complete.

AI lowers the barrier to **starting**. It does not remove the need for **thinking**.

### 3.6 New skills for an AI-assisted developer

| Old emphasis | New emphasis |
|---|---|
| Memorising syntax | Reading and reviewing code |
| Writing every line manually | Writing clear specifications |
| Remembering APIs | Asking good questions and verifying answers |
| Debugging alone | Debugging with an AI partner |
| Building everything at once | Building in small, testable steps |

---

## 4. AI-Assisted Development vs AI-Agent Development

### 4.1 First, clear up the words

**AI-assisted development** is the broad idea: using AI to help build software. It covers everything from autocomplete to a fully autonomous agent.

Inside that broad idea, there are two common **modes** of working:

1. **AI-assisted mode** — the human drives, AI suggests.
2. **AI-agent mode** — the human sets a goal, AI plans and acts.

These are modes, not different models. The same AI model can power both.

### 4.2 AI-assisted development

In this mode you stay in control of every action:

- You open the file.
- You decide what to change.
- AI completes, suggests or explains.
- You copy, accept or reject each suggestion.
- You run the code and test it.

Examples: GitHub Copilot suggestions, an AI chat where you copy code into your editor, asking AI to explain an error.

**Typical prompt:** "Explain this function" or "Complete this validation check."

### 4.3 AI-agent development

In this mode you give a goal, and the agent works through the steps:

- The agent reads the project files.
- It plans the change.
- It creates or edits multiple files.
- It runs commands or a local server.
- It observes the result and tries to fix errors.

Examples: OpenCode, Claude Code, Cursor agent mode, Windsurf.

**Typical prompt:** "Inspect the project, add registration validation and storage, then test it and tell me what you changed."

### 4.4 Side-by-side comparison

| | AI-assisted development | AI-agent development |
|---|---|---|
| Who decides the next step? | The human | The agent, within the goal |
| Scope of one action | A line, block or file | Multiple files and commands |
| Tools used | Editor, chat, autocomplete | Files, terminal, tests, browser |
| Human role | Writer and reviewer | Director and reviewer |
| Speed | Fast for small tasks | Fast for multi-step tasks |
| Control | High | Lower — you supervise |
| Risk | Low to moderate | Higher: changes can spread |
| Best for | Learning, small edits, precise control | Scaffolding, repetitive changes, multi-file work |

### 4.5 The autonomy spectrum

```text
More human control                                 More AI autonomy
|---------------------------|---------------------------|------------------|
Manual coding        AI-assisted (suggest)      AI-agent (act)      Autonomous
```

Most real work sits between the middle two. A developer might use an agent to generate the first version of a feature, then switch to assisted mode to review and correct it.

### 4.6 When to use which

| Situation | Better mode |
|---|---|
| You are learning a new concept | AI-assisted (ask, read, try) |
| You need one small, careful edit | AI-assisted |
| You understand the code and want to move fast | Agent |
| The task touches many files | Agent |
| The task is risky or hard to reverse | AI-assisted, with Git commits |
| You need to understand an unfamiliar project | Agent can inspect, but you review |
| You want to build a quick prototype | Agent |

### 4.7 Both modes in this session

We will use both:

- **Agent mode** to inspect the project and generate features across files.
- **Assisted mode** to read each change, understand it, and fix details ourselves.

The most important skill is knowing when to switch.

---

## 5. The Application: CampusConnect

### 5.1 The problem

Colleges run many events: workshops, bootcamps, competitions, exhibitions and quizzes. Registration is often managed with paper forms, chat messages and spreadsheets.

This creates common problems:

- Students do not know what events are available.
- The same student registers more than once.
- Administrators cannot see accurate counts.
- Records are lost or hard to search.
- Updating an event means editing several places.

**CampusConnect** is a small web application that lets students discover events and register, and lets administrators see registrations and manage events.

### 5.2 Users and their jobs

**Student**

- See upcoming events with date, time and venue.
- Register with name, USN, email and department.
- Register only once per event.
- See that registration succeeded.

**Administrator**

- See total events and total registrations.
- See how many students registered for each event.
- See the list of registered participants.
- Add a new event.
- Delete an event.

### 5.3 Requirements

**Must have (MVP)**

1. Events are displayed from a single source of truth.
2. A student can submit a registration form.
3. Invalid input is rejected with a clear message.
4. Registrations are saved and survive a page refresh.
5. A student cannot register twice for the same event.
6. The admin page shows live counts and participant data.
7. An administrator can add and delete events.

**Should have**

- Empty states when there are no registrations.
- Confirmation message after a successful registration.

**Could have (extensions)**

- Search or filter events by category.
- Event capacity limits.
- Export registrations as CSV.
- Login for administrators.

**Not in scope (non-goals)**

- Real user authentication.
- Payment collection.
- Email notifications.
- A production database and deployment.

### 5.4 Architecture

The version we build in this session uses only the browser:

```text
┌─────────────────────────────────────────────┐
│ Browser                                     │
│                                             │
│  HTML pages  ──  CSS  ──  JavaScript        │
│                              │              │
│                              ▼              │
│                     localStorage            │
│              (events + registrations)       │
└─────────────────────────────────────────────┘
```

Later, the storage layer can be replaced with a backend:

```text
Browser (HTML/CSS/JS)  →  Flask API  →  SQLite database
```

The important idea: the **interface** and the **data** are separate. You can replace `localStorage` with a server without redesigning the pages.

### 5.5 Data model

**Event**

| Field | Example | Notes |
|---|---|---|
| `id` | `evt-1` | Unique identifier |
| `title` | `AI and Machine Learning Workshop` | Shown to students |
| `category` | `Workshop` | Used for filtering later |
| `description` | `Introduction to core ML concepts...` | Short summary |
| `date` | `2026-01-15` | ISO format is easiest to sort |
| `time` | `10:00 AM – 1:00 PM` | Display text |
| `venue` | `Main Seminar Hall` | Location |

**Registration**

| Field | Example | Notes |
|---|---|---|
| `id` | `reg-1` | Unique identifier |
| `eventId` | `evt-1` | Links to an Event |
| `name` | `Asha Rao` | Student name |
| `usn` | `4VC23AI001` | Student ID |
| `email` | `asha@example.com` | Contact |
| `department` | `CSE` | Department |
| `createdAt` | `2026-01-10T09:30:00Z` | When it was submitted |

The link between the two is `eventId`. This is the same idea as a **foreign key** in a database.

### 5.6 What the starter already gives you

The `starter-app/` folder contains a static wireframe. It looks like the application but has no behaviour.

| Page | Already there | Missing |
|---|---|---|
| `index.html` | Hero and three event cards | Real data, links to registration |
| `events.html` | Five event cards and a registration form | Validation, saving, duplicate prevention |
| `admin.html` | Stats, event table, add-event form, participant table | Live data, add/delete behaviour |
| `css/style.css` | Complete grayscale styling | Nothing required |

Open it and click around. You can navigate, but nothing is saved. That is the starting point.

---

## 6. Build Roadmap: From Wireframe to Working App

### 6.1 Overview

| Phase | Goal | Core or optional |
|---|---|---|
| 0 | Inspect and plan | Core |
| 1 | Move events into a data file | Core |
| 2 | Render events from data | Core |
| 3 | Validate the registration form | Core |
| 4 | Save registrations | Core |
| 5 | Prevent duplicate registrations | Core |
| 6 | Connect the admin dashboard | Core |
| 7 | Add and delete events | Optional |
| 8 | Test, debug and polish | Core |
| 9 | Upgrade to Flask + SQLite | Take-home |

**Minimum demo at 1:20:** a student can register, the registration survives refresh, duplicates are blocked, and the admin page shows the count and participant.

### 6.2 Phase 0 — Inspect and plan (no code changes)

**Goal:** understand the project before changing it.

**Agent prompt:**

> Inspect the `starter-app` folder. Do not modify any files. Explain the structure, which pages exist, how they link together, and list every place where data is currently hard-coded. Then propose the smallest sequence of changes needed to make registration work with browser storage.

**Check:**

- Can you explain the three pages in your own words?
- Do you know where event data currently lives?
- Do you understand what `localStorage` is?

**Why start here:** an agent that understands the project makes fewer mistakes. So do you.

### 6.3 Phase 1 — Events become data

**Goal:** one source of truth for events.

Create `starter-app/js/events.js` containing an array of event objects. The five events on `events.html` and the three cards on `index.html` should eventually come from this array.

**Agent prompt:**

> Create `js/events.js` with an exported array of five event objects. Each event must have `id`, `title`, `category`, `description`, `date`, `time` and `venue`. Use the five events already shown in `events.html`. Do not change the HTML yet. Keep the file beginner-readable with a short comment explaining the shape of an event.

**Check:** open the file and confirm the five events match the page. Refresh the page — nothing should have changed visually yet.

### 6.4 Phase 2 — Render events from data

**Goal:** the page builds its event cards from the array.

**Agent prompt:**

> Use `js/events.js` to render the event cards on `events.html` and the three upcoming event cards on `index.html`. Keep the existing CSS classes and structure. Do not hard-code event details in HTML anymore. Use plain JavaScript only — no frameworks or build tools. After implementing, open the pages and verify all events appear exactly once.

**Check:**

- All five events appear on the Events page.
- The home page shows three events.
- No event is duplicated.
- The browser console has no errors.

**Common mistake:** the agent may leave the old static cards in place, so events appear twice. Delete the hard-coded cards once the JavaScript works.

### 6.5 Phase 3 — Validate the registration form

**Goal:** reject incomplete or invalid input before saving.

Validation rules:

- Name is required and at least 2 characters.
- USN is required and follows a simple pattern such as `4VC23AI001`.
- Email is required and contains `@` and a dot after it.
- Department is required.
- An event must be selected.

**Agent prompt:**

> Add client-side validation to the registration form in `events.html`. Validate name, USN, email, department and selected event using the rules below. Show a clear inline error message under each invalid field and prevent submission until valid. Do not save anything yet. Keep the existing form layout and styling. Use plain JavaScript. Explain each validation rule in a short comment.

**Check:**

- Submitting an empty form shows errors and does not proceed.
- A bad email shows an error.
- A valid form proceeds (even if nothing is saved yet).
- Error messages are readable and appear next to the right field.

### 6.6 Phase 4 — Save registrations

**Goal:** store registrations in the browser.

Store one array under a single key, for example:

```js
// localStorage key: "campusconnect.registrations"
[
  {
    id: "reg-1",
    eventId: "evt-1",
    name: "Asha Rao",
    usn: "4VC23AI001",
    email: "asha@example.com",
    department: "CSE",
    createdAt: "2026-01-10T09:30:00Z"
  }
]
```

**Agent prompt:**

> On valid submission, save the registration to `localStorage` under the key `campusconnect.registrations`. Read the existing array first, add the new registration, and write it back. Generate a unique id and a `createdAt` timestamp. After saving, show a success message and reset the form. Do not connect the admin page yet. Explain how to inspect the saved data in the browser developer tools.

**Check:**

- Submit a valid registration.
- Open DevTools → Application → Local Storage and find the saved record.
- Refresh the page; the record is still there.
- Submit a second registration; both records exist.

**Note:** if `localStorage` behaves inconsistently when opening the file directly, run a local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/starter-app/`. No installation is required.

### 6.7 Phase 5 — Prevent duplicate registrations

**Goal:** the same USN cannot register twice for the same event.

**Agent prompt:**

> Before saving a registration, check whether a registration with the same `eventId` and the same `usn` already exists in `localStorage`. If it does, do not save; show a clear message such as "This student is already registered for this event." Keep the check case-insensitive for USN. Add one or two manual test cases as comments.

**Check:**

- Register once — it saves.
- Register again with the same USN and event — it is blocked with a message.
- Register the same USN for a different event — it saves.
- Refresh and try again — duplicate detection still works.

### 6.8 Phase 6 — Connect the admin dashboard

**Goal:** the admin page shows real data.

The admin page needs:

- Total events.
- Total registrations.
- Number of events that have at least one registration.
- Per-event participant counts.
- The list of registered participants.
- Empty state when there are no registrations.

**Agent prompt:**

> Update `admin.html` to read events from `js/events.js` and registrations from `localStorage`. Replace the hard-coded stats and tables with values calculated from the data. Show the participant name, USN, email, department and event title. If there are no registrations, show the existing empty-state row. Keep the current CSS classes. Use plain JavaScript and explain how the counts are calculated.

**Check:**

- Stats change after a new registration.
- Each event's participant count is correct.
- The participant table matches the saved records.
- With no registrations, the empty state appears.
- Refresh does not lose anything.

### 6.9 Phase 7 — Add and delete events (optional)

**Goal:** an administrator can manage events.

**Agent prompt:**

> Make the add-event form on `admin.html` work. Move the event list into `localStorage`, seeded from `js/events.js` on first load. On submit, validate the name, date and venue, add the new event to that stored list, and re-render the admin and events tables. Add a delete button next to each event. Before deleting an event, ask for confirmation and also delete or warn about its registrations. Keep the UI simple and explain the decision about registrations.

**Check:**

- A new event appears on the admin page and the Events page.
- Deleting an event removes it everywhere.
- Registrations for a deleted event are handled consistently.
- Refreshing keeps the changes.

### 6.10 Phase 8 — Test, debug and polish

Use the checklist in Section 8. Fix issues one at a time, with a prompt that includes the exact symptom.

**Good debugging prompt:**

> When I submit a valid registration, the success message appears but nothing is saved in `localStorage`. I am opening `events.html` from a local server. The console shows no errors. Inspect the submit handler, identify the likely cause, explain it, and fix only that issue.

A good debugging prompt has four parts: **what I did**, **what I expected**, **what happened**, and **the exact error**.

### 6.11 Phase 9 — Upgrade to Flask + SQLite (take-home)

This is the "real backend" path. It is optional because it needs more time.

Suggested steps:

1. Create `app.py` with Flask.
2. Create `requirements.txt` containing `Flask`.
3. Define SQLite tables for events and registrations.
4. Add routes: list events, create registration, list registrations, add event, delete event.
5. Replace `localStorage` calls with `fetch()` calls.
6. Test with `curl` or the browser before touching the UI.

**Agent prompt:**

> Convert the current browser-only CampusConnect app into a Flask + SQLite application. Keep the existing HTML/CSS and behaviour. Create `app.py`, a `requirements.txt` with Flask, and a SQLite schema for events and registrations. Provide API routes for the operations the frontend already performs, then update the frontend to call them with `fetch`. Add a unique constraint on (`event_id`, `usn`) to prevent duplicates. Run the app and test each route.

**Important:** commit your working browser-only version before starting. If the backend attempt fails, you still have a working demo.

---

## 7. Prompt Cookbook

Copy these patterns and fill in the brackets. Notice that every prompt includes context, a small goal, constraints and a way to verify.

| Task | Prompt pattern |
|---|---|
| Understand code | "Explain what `[file]` does, section by section, in beginner language. Do not modify anything." |
| One small change | "In `[file]`, change `[specific thing]`. Keep everything else the same. Show me the diff." |
| Multi-file feature | "Implement `[feature]` using `[tech]`. Inspect the project first. List the files you will change, then make the changes and verify in the browser." |
| Fix a bug | "I did `[action]`. I expected `[result]`. Instead `[actual result]`. The console says `[error]`. Find the cause and fix only that." |
| Test | "Write a manual test checklist for `[feature]`, including edge cases. Then run through it and report failures." |
| Review | "Review the changes you just made for bugs, duplicated code, accessibility problems and anything that could break existing behaviour." |

### Bad prompt vs better prompt for CampusConnect

**Bad:**

> Make the registration work.

**Better:**

> In `events.html`, make the registration form save to `localStorage` under `campusconnect.registrations` after validation passes. Read the existing array before adding, show a success message, reset the form, and do not change the CSS. Tell me how to verify the saved record in DevTools.

The better prompt is not longer for its own sake. It removes the decisions AI would otherwise have to guess.

---

## 8. Testing and Verifying AI-Generated Code

AI-generated code is a draft until you verify it. Use this checklist after each phase.

### 8.1 Functional checks

- [ ] The page loads without console errors.
- [ ] All events appear exactly once.
- [ ] A valid registration is saved.
- [ ] The registration survives a refresh.
- [ ] An invalid form is rejected with a useful message.
- [ ] A duplicate registration is blocked.
- [ ] The admin counts match the stored data.
- [ ] The participant table shows the right students.
- [ ] Empty states appear when there is no data.
- [ ] Adding and deleting events behaves consistently (if implemented).

### 8.2 Edge cases

- [ ] Name with one character.
- [ ] USN in lowercase.
- [ ] Email without a dot in the domain.
- [ ] Same student, different events.
- [ ] Event with zero registrations.
- [ ] All registrations removed.
- [ ] Very long event title or description.
- [ ] Refresh in the middle of a flow.

### 8.3 Manual test script

| Step | Action | Expected result |
|---|---|---|
| 1 | Open Events page | Five events render from data |
| 2 | Submit empty form | Inline errors, no save |
| 3 | Submit invalid email | Email error, no save |
| 4 | Submit valid registration | Success message, form reset |
| 5 | Refresh page | Registration still saved |
| 6 | Submit same USN and event | Duplicate blocked |
| 7 | Register same USN for another event | Allowed |
| 8 | Open Admin page | Counts and table match data |
| 9 | Delete all registrations | Empty state appears |

### 8.4 Reading the browser console

Open DevTools with `F12` or right-click → Inspect. The **Console** tab shows JavaScript errors. The **Application** tab shows `localStorage`.

If something does not work, check the console before asking AI. The exact error message makes the next prompt much better.

---

## 9. Common Problems and Fixes

| Symptom | Likely cause | What to do |
|---|---|---|
| Events appear twice | Old static cards still in HTML | Delete the hard-coded cards; keep the rendered output |
| Nothing saves | `localStorage` blocked or wrong key | Check DevTools → Application; confirm the key name |
| Data disappears on refresh | Saving to a variable, not storage | Read and write `localStorage` on every change |
| Duplicate check misses cases | Comparing only name or only event | Compare `eventId` and normalised `usn` |
| Admin counts are wrong | Counting all events instead of registrations | Count registrations grouped by `eventId` |
| "Cannot read properties of null" | JavaScript runs before the element exists | Add the script at the end of `body` or wait for `DOMContentLoaded` |
| CSS looks broken | Class names changed during rendering | Reuse the existing classes from the starter |
| Form submits and page reloads | Missing `event.preventDefault()` | Prevent the default submit behaviour |

When asking for a fix, include the exact symptom and error. "It doesn't work" gives AI nothing to work with.

---

## 10. Using Git While Working with AI

Git is your safety net. AI can make broad changes quickly, so commit often.

Before a phase:

```bash
git add .
git commit -m "Working baseline before registration feature"
```

After a phase works:

```bash
git status
git diff
git add .
git commit -m "Add registration validation and localStorage"
```

If a change goes wrong:

```bash
git diff
git restore <file>
```

Or return to the last good commit:

```bash
git log --oneline
git checkout <commit> -- <file>
```

**Rule:** commit before asking an agent to make a large change. A working version you can return to is worth more than a perfect prompt.

---

## 11. Practical Activity

### 11.1 Build sprint (35 minutes)

Work in pairs if possible: one person directs the prompts, the other verifies the result. Swap roles halfway.

1. Open the starter and inspect it (Phase 0).
2. Move events into `js/events.js` (Phase 1).
3. Render events from data (Phase 2).
4. Add validation (Phase 3).
5. Save registrations (Phase 4).
6. Block duplicates (Phase 5).
7. Connect the admin dashboard (Phase 6).
8. Test with the checklist (Phase 8).

**Minimum demo:** registration works, survives refresh, blocks duplicates, and appears on the admin page.

### 11.2 Challenge extensions

Choose one if you finish early:

- Add a search box that filters events by title or category.
- Add a capacity limit per event and show "Full" when reached.
- Export registrations as a CSV file.
- Add a confirmation dialog before deleting an event.
- Improve accessibility: labels, error announcements, keyboard navigation.
- Rebuild the same app with Flask + SQLite (Phase 9).

### 11.3 Reflection questions

1. Which parts did you ask AI to do, and which parts did you do yourself?
2. Where did AI make a mistake, and how did you notice?
3. Which prompt worked best, and why?
4. When did you switch between assisted mode and agent mode?
5. What would you not trust AI to do without review?

---

## 12. Responsible Use

1. **Review before accepting.** Read the code, even if you did not write it.
2. **Test the behaviour.** A page that loads is not a page that works.
3. **Never paste secrets.** No passwords, API keys or private data into prompts.
4. **Check commands before running them.** Especially delete or overwrite commands.
5. **Keep Git commits.** They let you undo AI mistakes.
6. **Understand what you submit.** You are responsible for the final product.
7. **Follow your institution's rules** on AI use and academic integrity.

AI is a tool, like a compiler or a search engine. It does not take responsibility for the result. You do.

---

## 13. Quick Revision

**1. What are the five steps of the AI build loop?**  
Understand, describe, generate, verify, improve.

**2. What is AI-assisted development?**  
A mode where the human drives each step and AI suggests, completes or explains.

**3. What is AI-agent development?**  
A mode where the human sets a goal and the agent plans and performs multi-step actions using tools.

**4. What is the main difference between the two modes?**  
Who decides and performs the next action — the human or the agent.

**5. Is an AI agent always better than an assistant?**  
No. Agents are faster for multi-step work but give up control and carry more risk. The right mode depends on the task.

**6. Why does CampusConnect store data separately from the interface?**  
So the storage layer can be replaced (for example, `localStorage` with Flask + SQLite) without redesigning the pages.

**7. How do you prevent duplicate registrations?**  
Check for an existing record with the same event and the same normalised student ID before saving.

**8. Why is testing important with AI-generated code?**  
AI output is a draft; it can be plausible but wrong. Only testing shows whether it behaves correctly.

**9. What should a good debugging prompt include?**  
What you did, what you expected, what happened, and the exact error.

**10. Why commit before a large AI change?**  
So you can review the diff and restore a working version if the change fails.

---

## Session 3 Summary

By the end of this session, students should be able to:

- Explain how someone with limited coding experience can build with AI by focusing on clarity and verification.
- Distinguish AI-assisted development from AI-agent development, and choose the right mode.
- Turn a real problem into users, requirements, data and a build roadmap.
- Build CampusConnect in small, testable phases using prompts.
- Verify AI-generated code with a manual test checklist.
- Use Git to protect their work while collaborating with AI.

**Next steps:**

- Finish the optional Flask + SQLite upgrade.
- Add one challenge extension.
- Write a short README for your version of CampusConnect explaining how to run and test it.

---

## Appendix: Roadmap Checklist

The original project roadmap, kept here so it can be ticked off during the session.

**Actual App**

- [ ] Core logic
- [ ] Technologies
- [ ] UI
- [ ] System's Architecture Design
- [ ] Core Algorithm
- [ ] Revision
- [ ] Project Flow
