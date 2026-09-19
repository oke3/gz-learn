// Copyright (c) 2026 Ground Zero LLC. All rights reserved.

/**
 * Practice project scaffolding — generates a scratch OpenCode project
 * for a lesson, with an AGENTS.md and a task prompt to work on.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Lesson, Module } from './curriculum.js'

export interface ScaffoldResult {
  directory: string
  files: string[]
}

export function scaffoldPractice(module: Module, lesson: Lesson, targetDir: string): ScaffoldResult {
  mkdirSync(targetDir, { recursive: true })

  const files: string[] = []

  // AGENTS.md — project conventions the agent should follow
  const agentsMd = `# Practice Project — ${module.title}

## Task
${lesson.practice}

## Objectives
${lesson.concepts.map(c => `- ${c}`).join('\n')}

## Conventions
- Work in small, verifiable steps
- Verify before declaring completion
- Keep changes minimal and focused on the task
`
  writeFileSync(join(targetDir, 'AGENTS.md'), agentsMd)
  files.push('AGENTS.md')

  // TASK.md — the practice prompt
  const taskMd = `# ${lesson.title}

## Objective
${lesson.objective}

## Practice Prompt
${lesson.practice}

## How to verify
1. Read AGENTS.md for conventions
2. Complete the task in this project
3. Explain what you did and why
`
  writeFileSync(join(targetDir, 'TASK.md'), taskMd)
  files.push('TASK.md')

  // opencode.jsonc — minimal config
  const config = `{
  // Practice project for: ${module.id}/${lesson.id}
  "$schema": "https://opencode.ai/config.json"
}
`
  writeFileSync(join(targetDir, 'opencode.jsonc'), config)
  files.push('opencode.jsonc')

  return { directory: targetDir, files }
}