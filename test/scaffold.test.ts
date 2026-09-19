// Copyright (c) 2026 Ground Zero LLC. All rights reserved.

import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { scaffoldPractice } from '../src/scaffold.js'
import { getModule } from '../src/curriculum.js'
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'gz-learn-scaffold-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('scaffoldPractice', () => {
  it('creates AGENTS.md, TASK.md, and opencode.jsonc', () => {
    const module = getModule('skills')!
    const result = scaffoldPractice(module, module.lessons[0]!, dir)
    expect(result.files).toEqual(['AGENTS.md', 'TASK.md', 'opencode.jsonc'])
    expect(existsSync(join(dir, 'AGENTS.md'))).toBe(true)
    expect(existsSync(join(dir, 'TASK.md'))).toBe(true)
    expect(existsSync(join(dir, 'opencode.jsonc'))).toBe(true)
  })

  it('embeds the practice prompt in TASK.md', () => {
    const module = getModule('skills')!
    const lesson = module.lessons[0]!
    scaffoldPractice(module, lesson, dir)
    const task = readFileSync(join(dir, 'TASK.md'), 'utf-8')
    expect(task).toContain(lesson.title)
    expect(task).toContain(lesson.practice)
  })

  it('embeds concepts in AGENTS.md', () => {
    const module = getModule('core-prompts')!
    const lesson = module.lessons[0]!
    scaffoldPractice(module, lesson, dir)
    const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf-8')
    for (const c of lesson.concepts) {
      expect(agents).toContain(c)
    }
  })

  it('creates nested target directories', () => {
    const module = getModule('agents')!
    const nested = join(dir, 'a', 'b', 'c')
    const result = scaffoldPractice(module, module.lessons[0]!, nested)
    expect(existsSync(join(nested, 'TASK.md'))).toBe(true)
    expect(result.directory).toBe(nested)
  })
})