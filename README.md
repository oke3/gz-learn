# gz-learn

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ground Zero LLC](https://img.shields.io/badge/Built%20by-Ground%20Zero%20LLC-purple)](https://github.com/oke3)
[![npm](https://img.shields.io/npm/v/@ground-zero-llc/gz-learn)](https://www.npmjs.com/package/@ground-zero-llc/gz-learn)
[![CI](https://github.com/oke3/gz-learn/actions/workflows/ci.yml/badge.svg)](https://github.com/oke3/gz-learn/actions)

**Train your agents like you train yourself.**

A structured skill-building curriculum for OpenCode agents — learn, practice, and track progress. Six modules, eighteen lessons, covering the full stack of OpenCode agent development with hands-on practice projects you can scaffold and run.

---

## Table of Contents

- [Why](#why)
- [Quick Start](#quick-start)
- [Install](#install)
- [Architecture](#architecture)
- [Curriculum](#curriculum)
  - [Module 1: Core Prompt Engineering](#module-1-core-prompt-engineering)
  - [Module 2: Building OpenCode Skills](#module-2-building-opencode-skills)
  - [Module 3: Custom Agents & Subagents](#module-3-custom-agents--subagents)
  - [Module 4: MCP Servers & Tools](#module-4-mcp-servers--tools)
  - [Module 5: Model Providers & Routing](#module-5-model-providers--routing)
  - [Module 6: Multi-Agent Workflows](#module-6-multi-agent-workflows)
- [Practice Projects](#practice-projects)
- [CLI Reference](#cli-reference)
- [Library API](#library-api)
- [Feature Highlights](#feature-highlights)
- [Data Directory](#data-directory)
- [Related Projects](#related-projects)
- [Development](#development)
- [License](#license)

## Why

OpenCode is powerful, but its capabilities are spread across skills, agents, MCP servers, providers, and multi-agent workflows. Most users learn a fraction of what's possible.

**gz-learn** solves this with a structured, self-paced curriculum:

- **6 modules** progressing from beginner to advanced
- **18 lessons** with clear objectives, key concepts, and practice prompts
- **Scaffolded practice projects** — generate a working OpenCode project for any lesson
- **Progress tracking** — JSONL-backed, local-first, no account required

Think of it as a training belt for your agents. Each lesson teaches one skill, each practice project proves you can apply it.

## Quick Start

```bash
# See the curriculum
gz-learn list
# → OpenCode Learn — 6 modules, 18 lessons
# → core-prompts [beginner] — Core Prompt Engineering (0/3 lessons, 0%)
# → skills [intermediate] — Building OpenCode Skills (0/3 lessons, 0%)
# → ...

# Start a module — shows your next lesson
gz-learn start skills
# → Next lesson in 'skills': skill-structure — SKILL.md Anatomy

# Scaffold a practice project for a lesson
gz-learn practice skills skill-structure --dir ./practice-skills
# → Scaffolded practice project in ./practice-skills
# →   created AGENTS.md
# →   created TASK.md
# →   created opencode.jsonc

# Mark a lesson complete
gz-learn complete skills skill-structure
# → Completed: skills/skill-structure — SKILL.md Anatomy

# Track your progress
gz-learn progress
```

## Install

```bash
npm install -g @ground-zero-llc/gz-learn
```

Requires Node ≥ 18. No other prerequisites.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     gz-learn CLI                        │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  list    │  │  start   │  │complete  │  │practice│  │
│  │  show    │  │          │  │          │  │        │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │              │             │             │       │
└───────┼──────────────┼─────────────┼─────────────┼───────┘
        │              │             │             │
        ▼              ▼             ▼             ▼
┌──────────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│ curriculum.ts│ │ store.ts  │ │ store.ts  │ │scaffold.ts│
│ CURRICULUM   │ │ completed │ │ practice  │ │AGENTS.md  │
│ getModule()  │ │ .jsonl    │ │ .jsonl    │ │TASK.md    │
│ getLesson()  │ │ meta.json │ │           │ │config     │
└──────────────┘ └───────────┘ └───────────┘ └───────────┘
        │              │             │             │
        │         ┌────▼─────────────▼────┐        │
        │         │   ~/.gz-learn/        │        │
        │         │   ├── completed.jsonl │        │
        │         │   ├── practice.jsonl  │        │
        │         │   └── meta.json       │        │
        │         └───────────────────────┘        │
        │                                          │
┌───────▼──────────────────────────────────────────▼───┐
│              Practice Projects                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │AGENTS.md │  │TASK.md   │  │opencode.jsonc    │   │
│  │conventions│  │practice  │  │minimal config    │   │
│  │+ concepts│  │prompt +  │  │                  │   │
│  │          │  │verify    │  │                  │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└──────────────────────────────────────────────────────┘
```

**Curriculum** (`curriculum.ts`): the built-in 6-module, 18-lesson curriculum. Each lesson has an id, title, objective, concepts list, and practice prompt.

**Progress Store** (`store.ts`): JSONL-backed tracking for completed lessons and practice runs. Append-only, local-first, idempotent writes.

**Scaffolder** (`scaffold.ts`): generates a practice project with `AGENTS.md` (conventions + concepts), `TASK.md` (practice prompt + verification steps), and `opencode.jsonc` (minimal config).

## Curriculum

### Module 1: Core Prompt Engineering
*Level: Beginner — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `context` | Providing Context | Write prompts that give agents the context they need without dumping the whole codebase |
| `constraints` | Explicit Constraints | Use positive constraints (what to do) instead of negative ones (what not to do) |
| `structure` | Structured Prompts | Structure prompts with clear sections: goal, steps, verification, output format |

### Module 2: Building OpenCode Skills
*Level: Intermediate — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `skill-structure` | SKILL.md Anatomy | Understand the frontmatter, description, and body structure of an effective skill |
| `skill-triggers` | Trigger Design | Write descriptions that fire at the right time and stay silent otherwise |
| `skill-testing` | Verifying Skills | Test a skill in a scratch project before relying on it |

### Module 3: Custom Agents & Subagents
*Level: Intermediate — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `agent-roles` | Role Definition | Define an agent with a sharp identity, scope, and non-goals |
| `permissions` | Permission Matrices | Grant agents the minimum permissions they need to do their job |
| `delegation` | Delegation Contracts | Write handoff prompts that give subagents everything they need in one shot |

### Module 4: MCP Servers & Tools
*Level: Advanced — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `mcp-basics` | MCP Fundamentals | Understand how MCP servers expose tools, resources, and prompts to agents |
| `custom-tools` | Building a Custom Tool | Expose a small utility as an MCP tool with a clear schema |
| `mcp-security` | MCP Security | Audit MCP servers for dangerous tool exposure and credential leakage |

### Module 5: Model Providers & Routing
*Level: Advanced — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `provider-config` | Provider Configuration | Register a custom provider with models, API URLs, and authentication |
| `cost-awareness` | Cost-Aware Selection | Pick models by task type and budget, not habit |
| `fallbacks` | Fallback Chains | Design provider fallbacks so rate limits and outages never block work |

### Module 6: Multi-Agent Workflows
*Level: Advanced — 3 lessons*

| Lesson | Title | Objective |
|--------|-------|-----------|
| `orchestration` | Orchestrator Patterns | Route work through a single orchestrator that classifies and dispatches |
| `handoffs` | Agent Handoffs | Pass work between agents with validated handoff contracts |
| `review-loops` | Review Loops | Close the loop with review agents and quality gates before completion |

## Practice Projects

Each practice project scaffolds three files into a self-contained scratch directory:

### AGENTS.md

Project conventions plus the lesson's key concepts. Defines what the agent should know before starting:

```markdown
# Practice Project — Building OpenCode Skills

## Task
Write a SKILL.md for a "commit-message" skill that produces conventional commits from a diff.

## Objectives
- name
- description
- triggers
- location
- body instructions

## Conventions
- Work in small, verifiable steps
- Verify before declaring completion
- Keep changes minimal and focused on the task
```

### TASK.md

The practice prompt and verification steps. This is what your agent works on:

```markdown
# SKILL.md Anatomy

## Objective
Understand the frontmatter, description, and body structure of an effective skill.

## Practice Prompt
Write a SKILL.md for a "commit-message" skill that produces conventional commits from a diff.

## How to verify
1. Read AGENTS.md for conventions
2. Complete the task in this project
3. Explain what you did and why
```

### opencode.jsonc

Minimal OpenCode config for the practice project:

```jsonc
{
  // Practice project for: skills/skill-structure
  "$schema": "https://opencode.ai/config.json"
}
```

**Workflow:** scaffold → open the project → run your agent on `TASK.md` → verify → mark complete.

## CLI Reference

| Command | Description |
|---------|-------------|
| `gz-learn list` | List all curriculum modules with progress percentages |
| `gz-learn show <module>` | Show a module's lessons with completion status |
| `gz-learn start <module>` | Show your next incomplete lesson in a module |
| `gz-learn complete <module> <lesson>` | Mark a lesson as complete (idempotent) |
| `gz-learn practice <module> <lesson> [--dir PATH]` | Scaffold a practice project for a lesson |
| `gz-learn progress` / `status` | Show progress across all modules |
| `gz-learn reset` | Reset all progress (clears completed + practice logs) |
| `gz-learn health` | Check data directory status and stats |

### Examples

```bash
# List everything
gz-learn list

# Show details for one module
gz-learn show core-prompts

# Start learning — picks up where you left off
gz-learn start skills

# Scaffold a practice project
gz-learn practice skills skill-structure --dir ./my-practice

# After completing the task, mark it done
gz-learn complete skills skill-structure

# Check your overall progress
gz-learn progress

# Health check
gz-learn health
# → {"status":"ok","dataDir":"~/.gz-learn","completed":5,"practiceRuns":3}
```

## Library API

```typescript
import {
  CURRICULUM,
  getModule,
  getLesson,
  totalLessons,
  ProgressStore,
  scaffoldPractice,
  type Module,
  type Lesson,
  type CompletedLesson,
  type PracticeRun,
  type ProgressMeta,
  type ScaffoldResult,
} from '@ground-zero-llc/gz-learn'

// Access the full curriculum
const total = totalLessons()          // 18
const mod = getModule('skills')       // Module | undefined
const lesson = getLesson('skills', 'skill-structure')  // Lesson | undefined

// Track progress
const store = new ProgressStore('./data')
store.completeLesson('skills', 'skill-structure')  // boolean (idempotent)
store.isCompleted('skills', 'skill-structure')     // boolean
store.moduleProgress('skills', 3)                   // { done: 1, total: 3 }

// Scaffold a practice project
if (mod && lesson) {
  const result = scaffoldPractice(mod, lesson, './practice-skills')
  // result: { directory: './practice-skills', files: ['AGENTS.md', 'TASK.md', 'opencode.jsonc'] }
}

// Practice run tracking
store.recordPractice('skills', 'skill-structure', './practice-skills')
const runs = store.getPracticeRuns()  // PracticeRun[]

// Metadata
const meta = store.getMeta()
// { updatedAt: 1724500000000, totalCompleted: 5, totalPracticeRuns: 3 }

// Reset all progress
store.reset()
```

### Types

```typescript
interface Module {
  id: string           // e.g. "skills"
  title: string        // e.g. "Building OpenCode Skills"
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  lessons: Lesson[]
}

interface Lesson {
  id: string           // e.g. "skill-structure"
  title: string        // e.g. "SKILL.md Anatomy"
  objective: string
  concepts: string[]
  practice: string     // the practice prompt
}

interface CompletedLesson {
  moduleId: string
  lessonId: string
  completedAt: number  // epoch ms
}

interface PracticeRun {
  moduleId: string
  lessonId: string
  directory: string
  startedAt: number    // epoch ms
}

interface ProgressMeta {
  updatedAt: number
  totalCompleted: number
  totalPracticeRuns: number
}

interface ScaffoldResult {
  directory: string
  files: string[]
}
```

## Feature Highlights

- **Structured curriculum** — 6 modules, 18 lessons, beginner → advanced progression.
- **Scaffolded practice** — one command generates a working OpenCode project for any lesson.
- **Local-first progress** — JSONL files, no server, no account, no telemetry.
- **Idempotent tracking** — marking a lesson complete twice is safe (no duplicates).
- **Zero runtime dependencies** — Node built-ins only.
- **Works with any agent** — scaffold with `gz-learn`, run the practice with OpenCode, Claude Code, or any harness.

## Data Directory

Default: `~/.gz-learn/`

Override with the `GZ_LEARN_DATA_DIR` environment variable:

```bash
export GZ_LEARN_DATA_DIR=/path/to/custom/dir
gz-learn progress
```

Files stored:

| File | Purpose |
|------|---------|
| `completed.jsonl` | Append-only log of completed lessons |
| `practice.jsonl` | Append-only log of practice project scaffolds |
| `meta.json` | Cached progress summary (auto-updated) |

## Related Projects

| Project | What It Does |
|---------|-------------|
| [gz-sessions](https://github.com/oke3/gz-sessions) | Persistent cross-session memory for AI agents |
| [gz-sessionrecall](https://github.com/oke3/gz-sessionrecall) | AI code archaeology — search your session history |
| [gz-codemap](https://github.com/oke3/gz-codemap) | Scan codebases → auto-generate project config |
| [gz-modelrouter](https://github.com/oke3/gz-modelrouter) | Intelligent LLM cost router — save 40-70% on bills |
| [gz-bench](https://github.com/oke3/gz-bench) | Standardized benchmark harness for AI coding agents |
| [gz-authmesh](https://github.com/oke3/gz-authmesh) | Unified credential mesh for AI providers |
| [gz-remote](https://github.com/oke3/gz-remote) | Drive AI coding agents on remote machines over SSH |
| [gz-context-engine](https://github.com/oke3/gz-context-engine) | Production-grade RAG context engine |

## Development

```sh
npm install
npm run typecheck   # strict tsc
npm test            # node:test runner
npm run build       # emit dist/
```

Tests run against temp data directories — never touches `~/.gz-learn/`.

---

## Enterprise Support

Need this customized for your infrastructure? We offer:

- **Integration consulting** — Wire gz-learn into your training program
- **Custom configuration** — Task-specific rules, models, and workflows for your team
- **Managed deployment** — We host and maintain your instance
- **Training workshops** — Hands-on sessions for your engineering team

[Book a 30-min call](https://www.grndxero.com/brief) · [See pricing](https://www.grndxero.com/pricing)

---

## License

MIT — Ground Zero LLC

---

Built by [Ground Zero LLC](https://github.com/oke3) — AI infrastructure for the agentic age.
