import { describe, it, expect } from 'bun:test'
import { CURRICULUM, getModule, getLesson, totalLessons } from '../src/curriculum.js'

describe('CURRICULUM', () => {
  it('has six modules', () => {
    expect(CURRICULUM).toHaveLength(6)
  })

  it('has unique module ids', () => {
    const ids = CURRICULUM.map(m => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every module has lessons', () => {
    for (const m of CURRICULUM) {
      expect(m.lessons.length).toBeGreaterThan(0)
    }
  })

  it('every lesson has a unique id within its module', () => {
    for (const m of CURRICULUM) {
      const ids = m.lessons.map(l => l.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('every lesson has objective, concepts, and practice', () => {
    for (const m of CURRICULUM) {
      for (const l of m.lessons) {
        expect(l.objective.length).toBeGreaterThan(10)
        expect(l.concepts.length).toBeGreaterThan(0)
        expect(l.practice.length).toBeGreaterThan(20)
      }
    }
  })

  it('levels are valid', () => {
    for (const m of CURRICULUM) {
      expect(['beginner', 'intermediate', 'advanced']).toContain(m.level)
    }
  })

  it('totalLessons counts all lessons', () => {
    const expected = CURRICULUM.reduce((n, m) => n + m.lessons.length, 0)
    expect(totalLessons()).toBe(expected)
  })
})

describe('getModule / getLesson', () => {
  it('finds a module by id', () => {
    expect(getModule('skills')?.title).toContain('Skills')
  })

  it('returns undefined for unknown module', () => {
    expect(getModule('nope')).toBeUndefined()
  })

  it('finds a lesson', () => {
    const lesson = getLesson('skills', 'skill-structure')
    expect(lesson?.title).toContain('SKILL.md')
  })

  it('returns undefined for unknown lesson', () => {
    expect(getLesson('skills', 'nope')).toBeUndefined()
    expect(getLesson('nope', 'nope')).toBeUndefined()
  })
})