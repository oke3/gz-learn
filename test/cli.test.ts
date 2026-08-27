import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { execSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const CLI = join(import.meta.dir, '..', 'src', 'cli.ts')

let dir: string
let dataDir: string

function run(args: string): string {
  return execSync(`bun run ${CLI} ${args}`, {
    env: { ...process.env, OPENCODE_LEARN_DATA_DIR: dataDir },
    encoding: 'utf-8',
    timeout: 10_000,
  }).trim()
}

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'opencode-learn-cli-'))
  dataDir = join(dir, 'data')
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('CLI', () => {
  it('shows usage with no args', () => {
    const output = run('')
    expect(output).toContain('opencode-learn')
    expect(output).toContain('Usage')
  })

  it('list shows all modules', () => {
    const output = run('list')
    expect(output).toContain('core-prompts')
    expect(output).toContain('skills')
    expect(output).toContain('agents')
    expect(output).toContain('mcp')
    expect(output).toContain('providers')
    expect(output).toContain('workflows')
  })

  it('show displays module lessons', () => {
    const output = run('show skills')
    expect(output).toContain('skill-structure')
    expect(output).toContain('skill-triggers')
    expect(output).toContain('skill-testing')
  })

  it('show errors on unknown module', () => {
    expect(() => run('show nope')).toThrow('Unknown module')
  })

  it('start shows first incomplete lesson', () => {
    const output = run('start skills')
    expect(output).toContain('skill-structure')
    expect(output).toContain('Next lesson')
  })

  it('complete marks a lesson done', () => {
    const output = run('complete skills skill-structure')
    expect(output).toContain('Completed: skills/skill-structure')
  })

  it('complete is idempotent', () => {
    run('complete skills skill-structure')
    const output = run('complete skills skill-structure')
    expect(output).toContain('Already completed')
  })

  it('complete errors on unknown lesson', () => {
    expect(() => run('complete skills nope')).toThrow('Unknown lesson')
  })

  it('practice scaffolds a project', () => {
    const target = join(dir, 'practice-skills-skill-structure')
    const output = run(`practice skills skill-structure --dir ${target}`)
    expect(output).toContain('Scaffolded')
    expect(output).toContain('AGENTS.md')
  })

  it('progress reflects completions', () => {
    run('complete skills skill-structure')
    run('complete skills skill-triggers')
    const output = run('progress')
    expect(output).toContain('Completed lessons: 2/18')
    expect(output).toContain('skills')
  })

  it('status is an alias for progress', () => {
    run('complete core-prompts context')
    const output = run('status')
    expect(output).toContain('Completed lessons: 1/18')
  })

  it('reset clears progress', () => {
    run('complete skills skill-structure')
    run('reset')
    const output = run('progress')
    expect(output).toContain('Completed lessons: 0/18')
  })

  it('health reports status', () => {
    const output = run('health')
    const body = JSON.parse(output) as { status: string; completed: number }
    expect(body.status).toBe('ok')
    expect(body.completed).toBe(0)
  })
})