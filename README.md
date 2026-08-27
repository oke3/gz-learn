# opencode-learn

Skill-building curriculum for OpenCode agents — learn, practice, and track progress.

[![CI](https://github.com/oke3/opencode-learn/actions/workflows/ci.yml/badge.svg)](https://github.com/oke3/opencode-learn/actions)
[![npm](https://img.shields.io/npm/v/@oke3/opencode-learn)](https://www.npmjs.com/package/@oke3/opencode-learn)
[![license](https://img.shields.io/npm/l/@oke3/opencode-learn)](https://github.com/oke3/opencode-learn/blob/main/LICENSE)

## Why

OpenCode is powerful, but its capabilities are spread across skills, agents, MCP servers, providers, and multi-agent workflows. Most users learn a fraction of what's possible. **opencode-learn** is a structured curriculum — 6 modules, 18 lessons — covering the full stack of OpenCode agent development, with practice projects you can scaffold and run.

## Install

```bash
npm install -g @oke3/opencode-learn
```

## Quick Start

```bash
# See the curriculum
opencode-learn list
# → OpenCode Learn — 6 modules, 18 lessons
# → core-prompts [beginner] — Core Prompt Engineering (0/3 lessons, 0%)
# → skills [intermediate] — Building OpenCode Skills (0/3 lessons, 0%)
# → ...

# Start a module — shows your next lesson
opencode-learn start skills
# → Next lesson in 'skills': skill-structure — SKILL.md Anatomy

# Scaffold a practice project for a lesson
opencode-learn practice skills skill-structure --dir ./practice-skills
# → Scaffolded practice project in ./practice-skills
# →   created AGENTS.md
# →   created TASK.md
# →   created opencode.jsonc

# Mark a lesson complete
opencode-learn complete skills skill-structure
# → Completed: skills/skill-structure — SKILL.md Anatomy

# Track your progress
opencode-learn progress
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
import { CURRICULUM, getModule, ProgressStore, scaffoldPractice } from '@oke3/opencode-learn'

const store = new ProgressStore('./data')
const module = getModule('skills')

// Mark a lesson complete
store.completeLesson('skills', 'skill-structure')

// Scaffold a practice project
const lesson = module!.lessons[0]!
scaffoldPractice(module!, lesson, './practice-skills')
```

## Data Directory

Default: `~/.opencode-learn/`

Override with `OPENCODE_LEARN_DATA_DIR` environment variable.

## Related Projects

- [opencode-sessions](https://github.com/oke3/opencode-sessions) — Persistent cross-session memory for OpenCode agents
- [opencode-codemap](https://github.com/oke3/opencode-codemap) — Codebase mapping for OpenCode
- [opencode-bench](https://github.com/oke3/opencode-bench) — Benchmarking suite for OpenCode
- [opencode-remote](https://github.com/oke3/opencode-remote) — Drive OpenCode over SSH
- [opencode-modelrouter](https://github.com/oke3/opencode-modelrouter) — Intelligent LLM cost router for OpenCode
- [opencode-sessionrecall](https://github.com/oke3/opencode-sessionrecall) — AI code archaeology for OpenCode sessions

## License

MIT © oke3