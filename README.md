# gz-learn

> Built by [Ground Zero LLC](https://github.com/oke3) — AI infrastructure for the agentic age.

Skill-building curriculum for OpenCode agents — learn, practice, and track progress.

[![CI](https://github.com/oke3/gz-learn/actions/workflows/ci.yml/badge.svg)](https://github.com/oke3/gz-learn/actions)
[![npm](https://img.shields.io/npm/v/@ground-zero-llc/gz-learn)](https://www.npmjs.com/package/@ground-zero-llc/gz-learn)
[![license](https://img.shields.io/npm/l/@ground-zero-llc/gz-learn)](https://github.com/oke3/gz-learn/blob/main/LICENSE)

## Why

OpenCode is powerful, but its capabilities are spread across skills, agents, MCP servers, providers, and multi-agent workflows. Most users learn a fraction of what's possible. **gz-learn** is a structured curriculum — 6 modules, 18 lessons — covering the full stack of OpenCode agent development, with practice projects you can scaffold and run.

## Install

```bash
npm install -g @ground-zero-llc/gz-learn
```

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

## Curriculum

| Module | Level | Lessons |
|--------|-------|---------|
| `core-prompts` | beginner | context, constraints, structure |
| `skills` | intermediate | SKILL.md anatomy, trigger design, verifying skills |
| `agents` | intermediate | role definition, permission matrices, delegation contracts |
| `mcp` | advanced | MCP fundamentals, custom tools, MCP security |
| `providers` | advanced | provider config, cost-aware selection, fallback chains |
| `workflows` | advanced | orchestration, handoffs, review loops |

## CLI Reference

| Command | Description |
|---------|-------------|
| `list` | List all curriculum modules with progress |
| `show <module>` | Show a module's lessons |
| `start <module>` | Show your next incomplete lesson |
| `complete <module> <lesson>` | Mark a lesson complete |
| `practice <module> <lesson> [--dir PATH]` | Scaffold a practice project |
| `progress` / `status` | Progress across all modules |
| `reset` | Reset all progress |
| `health` | Check data directory status |

## Practice Projects

Each practice project scaffolds three files:

- **AGENTS.md** — project conventions plus the lesson's key concepts
- **TASK.md** — the practice prompt and verification steps
- **opencode.jsonc** — minimal OpenCode config

Open the project and run your agent on `TASK.md` to practice the skill for real.

## Library API

```typescript
import { CURRICULUM, getModule, ProgressStore, scaffoldPractice } from '@ground-zero-llc/gz-learn'

const store = new ProgressStore('./data')
const module = getModule('skills')

// Mark a lesson complete
store.completeLesson('skills', 'skill-structure')

// Scaffold a practice project
const lesson = module!.lessons[0]!
scaffoldPractice(module!, lesson, './practice-skills')
```

## Data Directory

Default: `~/.gz-learn/`

Override with `GZ_LEARN_DATA_DIR` environment variable.

## Related Projects

- [gz-sessions](https://github.com/oke3/gz-sessions) — Persistent cross-session memory for OpenCode agents
- [gz-codemap](https://github.com/oke3/gz-codemap) — Codebase mapping for OpenCode
- [gz-bench](https://github.com/oke3/gz-bench) — Benchmarking suite for OpenCode
- [gz-remote](https://github.com/oke3/gz-remote) — Drive OpenCode over SSH
- [gz-modelrouter](https://github.com/oke3/gz-modelrouter) — Intelligent LLM cost router for OpenCode
- [gz-sessionrecall](https://github.com/oke3/gz-sessionrecall) — AI code archaeology for OpenCode sessions

## License

MIT © oke3