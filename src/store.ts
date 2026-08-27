/**
 * JSONL-based progress storage for opencode-learn.
 * Tracks completed lessons, practice sessions, and module status.
 */

import { mkdirSync, existsSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

export interface CompletedLesson {
  moduleId: string
  lessonId: string
  completedAt: number
}

export interface PracticeRun {
  moduleId: string
  lessonId: string
  directory: string
  startedAt: number
}

export interface ProgressMeta {
  updatedAt: number
  totalCompleted: number
  totalPracticeRuns: number
}

export class ProgressStore {
  private dir: string
  private completedPath: string
  private practicePath: string
  private metaPath: string

  constructor(dataDir?: string) {
    this.dir = dataDir ?? process.env['OPENCODE_LEARN_DATA_DIR'] ?? join(homedir(), '.opencode-learn')
    this.completedPath = join(this.dir, 'completed.jsonl')
    this.practicePath = join(this.dir, 'practice.jsonl')
    this.metaPath = join(this.dir, 'meta.json')
  }

  private ensureDir(): void {
    mkdirSync(this.dir, { recursive: true })
  }

  private readLines(path: string): string[] {
    if (!existsSync(path)) return []
    return readFileSync(path, 'utf-8').split('\n').filter(l => l.trim().length > 0)
  }

  private writeMeta(): void {
    const meta: ProgressMeta = {
      updatedAt: Date.now(),
      totalCompleted: this.getCompleted().length,
      totalPracticeRuns: this.getPracticeRuns().length,
    }
    writeFileSync(this.metaPath, JSON.stringify(meta) + '\n')
  }

  /** Mark a lesson complete (idempotent) */
  completeLesson(moduleId: string, lessonId: string): boolean {
    const existing = this.getCompleted()
    if (existing.some(c => c.moduleId === moduleId && c.lessonId === lessonId)) {
      return false
    }
    this.ensureDir()
    const entry: CompletedLesson = { moduleId, lessonId, completedAt: Date.now() }
    appendFileSync(this.completedPath, JSON.stringify(entry) + '\n')
    this.writeMeta()
    return true
  }

  /** Record a practice run */
  recordPractice(moduleId: string, lessonId: string, directory: string): void {
    this.ensureDir()
    const entry: PracticeRun = { moduleId, lessonId, directory, startedAt: Date.now() }
    appendFileSync(this.practicePath, JSON.stringify(entry) + '\n')
    this.writeMeta()
  }

  getCompleted(): CompletedLesson[] {
    return this.readLines(this.completedPath).map(l => JSON.parse(l) as CompletedLesson)
  }

  getPracticeRuns(): PracticeRun[] {
    return this.readLines(this.practicePath).map(l => JSON.parse(l) as PracticeRun)
  }

  getMeta(): ProgressMeta {
    if (existsSync(this.metaPath)) {
      try {
        return JSON.parse(readFileSync(this.metaPath, 'utf-8')) as ProgressMeta
      } catch {
        // fall through to computed meta
      }
    }
    return {
      updatedAt: 0,
      totalCompleted: this.getCompleted().length,
      totalPracticeRuns: this.getPracticeRuns().length,
    }
  }

  /** Is a lesson completed? */
  isCompleted(moduleId: string, lessonId: string): boolean {
    return this.getCompleted().some(c => c.moduleId === moduleId && c.lessonId === lessonId)
  }

  /** Module completion count */
  moduleProgress(moduleId: string, totalLessonsInModule: number): { done: number; total: number } {
    const done = this.getCompleted().filter(c => c.moduleId === moduleId).length
    return { done, total: totalLessonsInModule }
  }

  /** Reset all progress */
  reset(): void {
    this.ensureDir()
    writeFileSync(this.completedPath, '')
    writeFileSync(this.practicePath, '')
    this.writeMeta()
  }
}