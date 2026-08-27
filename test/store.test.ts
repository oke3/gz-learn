import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { ProgressStore } from '../src/store.js'
import { mkdtempSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

let dir: string
let store: ProgressStore

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'opencode-learn-store-'))
  store = new ProgressStore(dir)
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('ProgressStore', () => {
  it('starts empty', () => {
    expect(store.getCompleted()).toHaveLength(0)
    expect(store.getMeta().totalCompleted).toBe(0)
  })

  it('completes a lesson', () => {
    const added = store.completeLesson('skills', 'skill-structure')
    expect(added).toBe(true)
    expect(store.isCompleted('skills', 'skill-structure')).toBe(true)
    expect(store.getMeta().totalCompleted).toBe(1)
  })

  it('is idempotent', () => {
    store.completeLesson('skills', 'skill-structure')
    const added = store.completeLesson('skills', 'skill-structure')
    expect(added).toBe(false)
    expect(store.getCompleted()).toHaveLength(1)
  })

  it('tracks distinct lessons', () => {
    store.completeLesson('skills', 'skill-structure')
    store.completeLesson('skills', 'skill-triggers')
    expect(store.getCompleted()).toHaveLength(2)
  })

  it('moduleProgress counts per module', () => {
    store.completeLesson('skills', 'skill-structure')
    const p = store.moduleProgress('skills', 3)
    expect(p).toEqual({ done: 1, total: 3 })
    const other = store.moduleProgress('agents', 3)
    expect(other).toEqual({ done: 0, total: 3 })
  })

  it('records practice runs', () => {
    store.recordPractice('skills', 'skill-structure', '/tmp/practice')
    expect(store.getPracticeRuns()).toHaveLength(1)
    expect(store.getPracticeRuns()[0]!.directory).toBe('/tmp/practice')
    expect(store.getMeta().totalPracticeRuns).toBe(1)
  })

  it('persists across instances', () => {
    store.completeLesson('core-prompts', 'context')
    const store2 = new ProgressStore(dir)
    expect(store2.isCompleted('core-prompts', 'context')).toBe(true)
  })

  it('reset clears everything', () => {
    store.completeLesson('skills', 'skill-structure')
    store.recordPractice('skills', 'skill-structure', '/tmp/x')
    store.reset()
    expect(store.getCompleted()).toHaveLength(0)
    expect(store.getPracticeRuns()).toHaveLength(0)
    expect(store.getMeta().totalCompleted).toBe(0)
  })

  it('creates the data directory lazily', () => {
    expect(existsSync(dir)).toBe(true)
  })
})