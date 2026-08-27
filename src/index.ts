/**
 * @oke3/opencode-learn — skill-building curriculum for OpenCode agents.
 *
 * @example
 * ```typescript
 * import { CURRICULUM, getModule, ProgressStore, scaffoldPractice } from '@oke3/opencode-learn'
 *
 * const store = new ProgressStore('./data')
 * const module = getModule('skills')
 *
 * // Mark a lesson complete
 * store.completeLesson('skills', 'skill-structure')
 *
 * // Scaffold a practice project
 * const lesson = module!.lessons[0]!
 * scaffoldPractice(module!, lesson, './practice-skills')
 * ```
 */

export { CURRICULUM, getModule, getLesson, totalLessons, type Module, type Lesson } from './curriculum.js'
export { ProgressStore, type CompletedLesson, type PracticeRun, type ProgressMeta } from './store.js'
export { scaffoldPractice, type ScaffoldResult } from './scaffold.js'