# CampusConnect Static Wireframe

A minimal, browser-openable visual baseline for Session 3: **Building a Real-World Application Using AI-Assisted Development Tools**.

This folder intentionally contains a static wireframe, not a completed application. It gives students a starting point for understanding the CampusConnect page structure before they use AI coding tools to implement the real functionality.

An optional local AI companion is available in [`../ai-assistant/`](../ai-assistant/README.md). It is a separate Streamlit and FastAPI application and does not change this static starter.

## What this baseline includes

- Home page
- Events page
- Static registration form
- Static admin dashboard
- Student Hub with an SGPA calculator, grade book, placement-preparation checklist and daily aptitude practice
- VTU AIML resources with official 2025-scheme links and 22 original syllabus-based practice questions
- Shared grayscale stylesheet
- Session example events
- Empty registration and participant states

The pages use responsive CSS depth effects and remote Unsplash photography.
An internet connection is needed to load those images; the pages still work
without them.

The Student Hub works locally in the browser. Semester grades, placement
checklist progress, and completed daily questions are stored in that browser's
`localStorage` and are not uploaded. The calculator uses a common 10-point
grade scale; confirm your institution's official grade-point mapping before
relying on a result. Placement paths are general preparation guidance, not
live vacancies or official eligibility criteria. Daily practice rotates
through its built-in question bank and does not call an AI service.
The VTU AIML section links to the official 2025-scheme model paper and syllabus
for the cross-stream Emerging Technology Course Introduction to AI and
Applications (1BAIA103/203), available for semesters 1–2 in the published
index. It labels the model paper accurately; it is not an AIML-branch-specific
paper or a historical PYQ. The 22 practice prompts are original and based on
the course modules, not reproduced exam questions. Semesters 3–8 show an
availability note and VTU's official indexes rather than unverified or
older-scheme papers. No account, external API, or paid service is used.

## How to open

Open the home page directly in a browser:

```bash
# macOS
open starter-app/index.html

# Windows
start starter-app/index.html

# Linux
xdg-open starter-app/index.html
```

Or double-click `starter-app/index.html`.

No installation, build step, server, Python environment or dependencies are required.

## What is intentionally missing

- Form validation
- Saving registrations
- Duplicate registration prevention
- Updating admin statistics
- Adding and deleting events
- Saving event registrations, Flask, SQLite and authentication
- Live placement listings or institution-specific eligibility checks

## Requirements

None. There is no `requirements.txt` because this baseline is pure HTML/CSS and has no Python or Node dependencies.

If students later implement backend persistence with Flask and SQLite, any Python dependencies should be recorded in a `requirements.txt` at that stage (for example, `Flask`). The wireframe itself does not need one.

## Suggested student workflow

1. Open and inspect the wireframe.
2. Use an AI coding agent to explain the current structure.
3. Try the Student Hub's local grade tracker, placement checklist and daily practice.
4. Decide whether to keep the static baseline or build event-registration persistence.
5. Add validation and storage for registrations (localStorage or Flask + SQLite).
6. Connect the admin dashboard to stored event data.
7. Test registration and duplicate prevention.
8. Debug with the AI coding agent while reviewing every change.
