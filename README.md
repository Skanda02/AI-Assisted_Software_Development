# AI-Assisted Software Development

A hands-on workshop for 3rd semester students covering how modern software is built in practice — from version control fundamentals and AI-assisted development to a hands-on CampusConnect project.

## Workshop Format

The workshop is divided into 3 sessions, each 1.5 hours long:

| # | Session | Duration | Materials |
|---|---|---|---|
| 1 | Git, GitHub and Prompt Engineering | 1.5 Hours | [Session 1 Notes](sessions/session-1-git-github-prompt-engineering.md) |
| 2 | AI Agents & AI-Assisted Coding Tools | 1.5 Hours | [Session 2 Notes](sessions/session-2-ai-agents-ai-assisted-coding-tools.md) |
| 3 | Building a Real-World Application Using AI-Assisted Development Tools | 1.5 Hours | [Starter App](starter-app/README.md) |

## How to Use This Repository

- `sessions/` contains the Session 1 and Session 2 student notes.
- `starter-app/` contains the static CampusConnect baseline for Session 3.
- `ai-assistant/` contains an optional local Streamlit + FastAPI application
  using Ollama for campus-event chat and PDF assistance. See its
  [setup guide](ai-assistant/README.md).
- The Session 3 starter has no dependencies — open it directly in a browser or see [`starter-app/README.md`](starter-app/README.md).

## Learning Outcomes

### Session 1: Git, GitHub and Prompt Engineering

By the end of this session, students will understand:

- The importance of version control.
- The fundamentals of Git and GitHub.
- Basic Git commands and repository management.
- Branching and collaborative development.
- The concept of Generative AI.
- How to write clear and effective prompts.
- How AI can assist in software development.

### Session 2: AI Agents & AI-Assisted Coding Tools

By the end of this session, students will understand:

- The concept of AI coding assistants.
- What AI agents are and how they work.
- The difference between AI assistants and AI agents.
- Popular AI-assisted development tools.
- How agents interact with project files and terminals.
- How to give effective instructions to coding agents.
- Benefits, limitations and safety considerations.

### Session 3: Building a Real-World Application Using AI-Assisted Development Tools

Project: **Campus Event Management App — CampusConnect**

By the end of this session, students will have practiced:

- Converting a real-world problem into an application.
- Using AI agents for application development.
- Generating frontend and backend code using prompts.
- Understanding how frontend, backend and databases interact.
- Implementing basic create, read, update and delete operations.
- Testing and debugging an AI-generated application.
- Building a functional software prototype in a limited time.

The included starter is a static HTML/CSS wireframe with **no dependencies**; it has no `requirements.txt` because it does not use Python, Node or any package manager. If students later add Flask/SQLite persistence, Python dependencies should be recorded in `requirements.txt` at that stage. See [`starter-app/README.md`](starter-app/README.md) for the supported static baseline and suggested workflow.

## Session Materials

- [Session 1: Git, GitHub and Prompt Engineering](sessions/session-1-git-github-prompt-engineering.md)
- [Session 2: AI Agents and AI-Assisted Coding Tools](sessions/session-2-ai-agents-ai-assisted-coding-tools.md)
- [Session 3 Starter App: CampusConnect](starter-app/README.md)
- [Open the static CampusConnect wireframe](starter-app/index.html)
