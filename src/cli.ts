// Copyright (c) 2026 Ground Zero LLC. All rights reserved.

/**
 * gz-learn CLI — learn, practice, and track OpenCode agent skills.
 */

import { CURRICULUM, getModule, getLesson, totalLessons } from './curriculum.js'
import { ProgressStore } from './store.js'
import { scaffoldPractice } from './scaffold.js'
import { join } from 'node:path'
import { cwd } from 'node:process'

function usage(): string {
  return `gz-learn — skill-building curriculum for OpenCode agents

Usage:
  gz-learn list                       List curriculum modules
  gz-learn show <module>              Show a module's lessons
  gz-learn start <module>             Start a module (shows first incomplete lesson)
  gz-learn complete <module> <lesson> Mark a lesson complete
  gz-learn practice <module> <lesson> [--dir PATH]  Scaffold a practice project
  gz-learn progress                   Show progress across all modules
  gz-learn status                     Alias for progress
  gz-learn reset                      Reset all progress
  gz-learn health                     Check data directory status

Data directory: ~/.gz-learn (override with GZ_LEARN_DATA_DIR)
`
}

function getArg(args: string[], name: string): string | undefined {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name)
}

function printModule(m: (typeof CURRICULUM)[number], store: ProgressStore): void {
  const { done, total } = store.moduleProgress(m.id, m.lessons.length)
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  console.log(`${m.id} [${m.level}] — ${m.title} (${done}/${total} lessons, ${pct}%)`)
  console.log(`  ${m.description}`)
}

function printLesson(l: (typeof CURRICULUM)[number]['lessons'][number], store: ProgressStore, moduleId: string): void {
  const done = store.isCompleted(moduleId, l.id)
  console.log(`  ${done ? '[x]' : '[ ]'} ${l.id} — ${l.title}`)
  console.log(`      ${l.objective}`)
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const cmd = args[0] ?? ''

  if (cmd === '' || cmd === 'help' || cmd === '--help' || cmd === '-h') {
    console.log(usage())
    return
  }

  const store = new ProgressStore()

  switch (cmd) {
    case 'list': {
      console.log(`OpenCode Learn — ${CURRICULUM.length} modules, ${totalLessons()} lessons\n`)
      for (const m of CURRICULUM) printModule(m, store)
      return
    }

    case 'show': {
      const moduleId = args[1]
      if (!moduleId) {
        console.error('Usage: gz-learn show <module>')
        process.exitCode = 1
        return
      }
      const m = getModule(moduleId)
      if (!m) {
        console.error(`Unknown module: ${moduleId}. Run 'gz-learn list' to see modules.`)
        process.exitCode = 1
        return
      }
      printModule(m, store)
      console.log('')
      for (const l of m.lessons) printLesson(l, store, m.id)
      return
    }

    case 'start': {
      const moduleId = args[1]
      if (!moduleId) {
        console.error('Usage: gz-learn start <module>')
        process.exitCode = 1
        return
      }
      const m = getModule(moduleId)
      if (!m) {
        console.error(`Unknown module: ${moduleId}`)
        process.exitCode = 1
        return
      }
      const next = m.lessons.find(l => !store.isCompleted(m.id, l.id))
      if (!next) {
        console.log(`Module '${m.id}' complete! All ${m.lessons.length} lessons done.`)
        return
      }
      console.log(`Next lesson in '${m.id}': ${next.id} — ${next.title}`)
      console.log(`  ${next.objective}`)
      console.log(`\nPractice: gz-learn practice ${m.id} ${next.id}`)
      console.log(`Complete: gz-learn complete ${m.id} ${next.id}`)
      return
    }

    case 'complete': {
      const moduleId = args[1]
      const lessonId = args[2]
      if (!moduleId || !lessonId) {
        console.error('Usage: gz-learn complete <module> <lesson>')
        process.exitCode = 1
        return
      }
      const lesson = getLesson(moduleId, lessonId)
      if (!lesson) {
        console.error(`Unknown lesson: ${moduleId}/${lessonId}`)
        process.exitCode = 1
        return
      }
      const added = store.completeLesson(moduleId, lessonId)
      if (added) {
        console.log(`Completed: ${moduleId}/${lessonId} — ${lesson.title}`)
      } else {
        console.log(`Already completed: ${moduleId}/${lessonId}`)
      }
      return
    }

    case 'practice': {
      const moduleId = args[1]
      const lessonId = args[2]
      if (!moduleId || !lessonId) {
        console.error('Usage: gz-learn practice <module> <lesson> [--dir PATH]')
        process.exitCode = 1
        return
      }
      const m = getModule(moduleId)
      const lesson = getLesson(moduleId, lessonId)
      if (!m || !lesson) {
        console.error(`Unknown lesson: ${moduleId}/${lessonId}`)
        process.exitCode = 1
        return
      }
      const base = getArg(args, '--dir') ?? join(cwd(), `practice-${moduleId}-${lessonId}`)
      const result = scaffoldPractice(m, lesson, base)
      store.recordPractice(moduleId, lessonId, result.directory)
      console.log(`Scaffolded practice project in ${result.directory}`)
      for (const f of result.files) console.log(`  created ${f}`)
      console.log(`\nNext: open the project and run your agent on TASK.md`)
      return
    }

    case 'progress':
    case 'status': {
      const meta = store.getMeta()
      const completed = store.getCompleted()
      const runs = store.getPracticeRuns()
      console.log('OpenCode Learn Progress')
      console.log('───────────────────────')
      console.log(`Completed lessons: ${meta.totalCompleted}/${totalLessons()}`)
      console.log(`Practice runs:     ${meta.totalPracticeRuns}`)
      console.log('')
      for (const m of CURRICULUM) printModule(m, store)
      if (completed.length > 0) {
        console.log('\nRecently completed:')
        for (const c of [...completed].reverse().slice(0, 5)) {
          console.log(`  ${c.moduleId}/${c.lessonId} — ${new Date(c.completedAt).toISOString().slice(0, 10)}`)
        }
      }
      if (runs.length > 0) {
        console.log('\nRecent practice runs:')
        for (const r of [...runs].reverse().slice(0, 5)) {
          console.log(`  ${r.moduleId}/${r.lessonId} — ${r.directory}`)
        }
      }
      return
    }

    case 'reset': {
      store.reset()
      console.log('Progress reset.')
      return
    }

    case 'health': {
      const meta = store.getMeta()
      const dir = process.env['GZ_LEARN_DATA_DIR'] ?? join(process.env['HOME'] ?? '', '.gz-learn')
      console.log(JSON.stringify({ status: 'ok', dataDir: dir, completed: meta.totalCompleted, practiceRuns: meta.totalPracticeRuns }, null, 2))
      return
    }

    default: {
      console.error(`Unknown command: ${cmd}\n`)
      console.error(usage())
      process.exitCode = 1
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exitCode = 1
})