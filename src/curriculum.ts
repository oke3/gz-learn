/**
 * Built-in curriculum for OpenCode agent skill-building.
 * Each module is a set of lessons; each lesson has an objective,
 * key concepts, and a practice prompt used to scaffold a practice project.
 */

export interface Lesson {
  id: string
  title: string
  objective: string
  concepts: string[]
  practice: string
}

export interface Module {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  lessons: Lesson[]
}

export const CURRICULUM: Module[] = [
  {
    id: 'core-prompts',
    title: 'Core Prompt Engineering',
    description: 'Write effective prompts for OpenCode agents — context, structure, and constraints.',
    level: 'beginner',
    lessons: [
      {
        id: 'context',
        title: 'Providing Context',
        objective: 'Write prompts that give agents the context they need without dumping the whole codebase.',
        concepts: ['AGENTS.md', 'relevant-file pointers', 'project conventions', 'on-demand context'],
        practice: 'Create a project with an AGENTS.md that describes a small CLI tool, then prompt an agent to add a feature using only the conventions file as context.',
      },
      {
        id: 'constraints',
        title: 'Explicit Constraints',
        objective: 'Use positive constraints (what to do) instead of negative ones (what not to do).',
        concepts: ['actionable positive constraints', 'BAD vs GOOD patterns', 'non-interactive flags'],
        practice: 'Write a prompt that instructs an agent to install packages with -y flags and avoid interactive prompts, then verify the agent never hangs.',
      },
      {
        id: 'structure',
        title: 'Structured Prompts',
        objective: 'Structure prompts with clear sections: goal, steps, verification, output format.',
        concepts: ['goal framing', 'step sequencing', 'verification gates', 'output contracts'],
        practice: 'Draft a structured prompt for a code review task and compare its output quality against an unstructured version.',
      },
    ],
  },
  {
    id: 'skills',
    title: 'Building OpenCode Skills',
    description: 'Create reusable skills with SKILL.md frontmatter, triggers, and structured instructions.',
    level: 'intermediate',
    lessons: [
      {
        id: 'skill-structure',
        title: 'SKILL.md Anatomy',
        objective: 'Understand the frontmatter, description, and body structure of an effective skill.',
        concepts: ['name', 'description', 'triggers', 'location', 'body instructions'],
        practice: 'Write a SKILL.md for a "commit-message" skill that produces conventional commits from a diff.',
      },
      {
        id: 'skill-triggers',
        title: 'Trigger Design',
        objective: 'Write descriptions that fire at the right time and stay silent otherwise.',
        concepts: ['when to use', 'when NOT to use', 'keyword triggers', 'false-positive avoidance'],
        practice: 'Write two trigger descriptions for the same skill — one over-broad and one precise — and explain the difference.',
      },
      {
        id: 'skill-testing',
        title: 'Verifying Skills',
        objective: 'Test a skill in a scratch project before relying on it.',
        concepts: ['scratch project', 'skill loading', 'iteration loop', 'regression'],
        practice: 'Create a scratch project, load a skill you wrote, run it twice, and fix any drift between runs.',
      },
    ],
  },
  {
    id: 'agents',
    title: 'Custom Agents & Subagents',
    description: 'Design agents with clear roles, permission matrices, and delegation contracts.',
    level: 'intermediate',
    lessons: [
      {
        id: 'agent-roles',
        title: 'Role Definition',
        objective: 'Define an agent with a sharp identity, scope, and non-goals.',
        concepts: ['identity', 'scope', 'non-goals', 'TO&E'],
        practice: 'Write an agent definition for a "docs-reviewer" that reviews only documentation PRs and never edits code.',
      },
      {
        id: 'permissions',
        title: 'Permission Matrices',
        objective: 'Grant agents the minimum permissions they need to do their job.',
        concepts: ['permission.task matrices', 'least privilege', 'allow/deny', 'read-only agents'],
        practice: 'Define a read-only research agent with no write or bash permissions, then verify it cannot modify files.',
      },
      {
        id: 'delegation',
        title: 'Delegation Contracts',
        objective: 'Write handoff prompts that give subagents everything they need in one shot.',
        concepts: ['task contracts', 'context transfer', 'deliverable format', 'verification instructions'],
        practice: 'Write a delegation prompt for a subagent that must return a structured report, and evaluate the returned format.',
      },
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Servers & Tools',
    description: 'Extend agents with Model Context Protocol servers and custom tools.',
    level: 'advanced',
    lessons: [
      {
        id: 'mcp-basics',
        title: 'MCP Fundamentals',
        objective: 'Understand how MCP servers expose tools, resources, and prompts to agents.',
        concepts: ['MCP', 'tools', 'resources', 'prompts', 'transport'],
        practice: 'Wire an existing MCP server (e.g. filesystem) into a scratch OpenCode project and call one of its tools.',
      },
      {
        id: 'custom-tools',
        title: 'Building a Custom Tool',
        objective: 'Expose a small utility as an MCP tool with a clear schema.',
        concepts: ['tool schema', 'input validation', 'error handling', 'documentation'],
        practice: 'Build a "slugify" MCP tool that converts titles to URL slugs, then use it from an agent prompt.',
      },
      {
        id: 'mcp-security',
        title: 'MCP Security',
        objective: 'Audit MCP servers for dangerous tool exposure and credential leakage.',
        concepts: ['least privilege', 'credential handling', 'tool allowlists', 'remote MCP risks'],
        practice: 'Review a sample MCP server config and identify three tools that should be disabled for a sandboxed agent.',
      },
    ],
  },
  {
    id: 'providers',
    title: 'Model Providers & Routing',
    description: 'Configure custom providers, cost-aware routing, and model selection.',
    level: 'advanced',
    lessons: [
      {
        id: 'provider-config',
        title: 'Provider Configuration',
        objective: 'Register a custom provider with models, API URLs, and authentication.',
        concepts: ['provider blocks', 'model definitions', 'api.url', 'auth'],
        practice: 'Configure a custom provider in opencode.jsonc pointing at a local proxy, then list its models.',
      },
      {
        id: 'cost-awareness',
        title: 'Cost-Aware Selection',
        objective: 'Pick models by task type and budget, not habit.',
        concepts: ['cost tables', 'task profiles', 'budget caps', 'peak-hour pricing'],
        practice: 'Write a routing rule that uses a cheap model for autocomplete and a premium model for architecture reviews.',
      },
      {
        id: 'fallbacks',
        title: 'Fallback Chains',
        objective: 'Design provider fallbacks so rate limits and outages never block work.',
        concepts: ['fallback order', 'retry policy', 'timeouts', 'degradation'],
        practice: 'Define a fallback chain across three providers and simulate a primary-provider outage.',
      },
    ],
  },
  {
    id: 'workflows',
    title: 'Multi-Agent Workflows',
    description: 'Orchestrate departments, handoffs, and review loops across multiple agents.',
    level: 'advanced',
    lessons: [
      {
        id: 'orchestration',
        title: 'Orchestrator Patterns',
        objective: 'Route work through a single orchestrator that classifies and dispatches.',
        concepts: ['classify', 'dispatch', 'department heads', 'executor agents'],
        practice: 'Sketch an orchestrator that routes a mixed request (docs + code + design) to three departments in sequence.',
      },
      {
        id: 'handoffs',
        title: 'Agent Handoffs',
        objective: 'Pass work between agents with validated handoff contracts.',
        concepts: ['handoff protocol', 'deliverables', 'evidence', 'versioning'],
        practice: 'Write a handoff JSON block for a completed feature and validate it against a handoff checklist.',
      },
      {
        id: 'review-loops',
        title: 'Review Loops',
        objective: 'Close the loop with review agents and quality gates before completion.',
        concepts: ['quality gates', 'review agents', 'verification-before-completion', 'learning loops'],
        practice: 'Define a two-stage review (code review then QA) and run a sample PR through both gates.',
      },
    ],
  },
]

export function getModule(id: string): Module | undefined {
  return CURRICULUM.find(m => m.id === id)
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  return getModule(moduleId)?.lessons.find(l => l.id === lessonId)
}

export function totalLessons(): number {
  return CURRICULUM.reduce((n, m) => n + m.lessons.length, 0)
}