---
name: career-ops
description: AI job search command center -- evaluate offers, generate CVs, scan portals, track applications
user_invocable: true
args: mode
argument-hint: "[eval | compare | outreach | research | cv | apply | batch | tracker | pipeline | training | project | patterns | followup | negotiate | prospect | visibility | offboard | scan | gmail]"
---

# career-ops -- Router

## Mode Routing

Determine the mode from `{{mode}}`:

| Input | Mode |
|-------|------|
| (empty / no args) | `discovery` -- Show command menu |
| JD text or URL (no sub-command) | **`auto-pipeline`** |
| `eval` | `eval` |
| `compare` | `compare` |
| `outreach` | `outreach` |
| `research` | `research` |
| `cv` | `cv` |
| `training` | `training` |
| `project` | `project` |
| `tracker` | `tracker` |
| `pipeline` | `pipeline` |
| `apply` | `apply` |
| `scan` | `scan` |
| `batch` | `batch` |
| `patterns` | `patterns` |
| `followup` | `followup` |
| `negotiate` | `negotiate` |
| `prospect` | `prospect` |
| `visibility` | `visibility` |
| `offboard` | `offboard` |
| `gmail` | `gmail` |

**Auto-pipeline detection:** If `{{mode}}` is not a known sub-command AND contains JD text (keywords: "responsibilities", "requirements", "qualifications", "about the role", "we're looking for", company name + role) or a URL to a JD, execute `auto-pipeline`.

If `{{mode}}` is not a sub-command AND doesn't look like a JD, show discovery.

---

## Discovery Mode (no arguments)

Show this menu:

```
career-ops -- Command Center

  /career-ops {JD}        → AUTO-PIPELINE: evaluate + report + CV + tracker (paste text or URL)
  /career-ops gmail       → Analyse mission emails from dedicated Gmail inbox
  /career-ops pipeline    → Process pending URLs from inbox (data/pipeline.md)
  /career-ops scan        → Scan portals and discover new missions

  /career-ops eval        → Evaluate a mission A-F (no auto CV)
  /career-ops compare     → Compare and rank multiple missions
  /career-ops batch       → Batch processing with parallel workers

  /career-ops outreach    → LinkedIn power move: find contacts + draft message
  /career-ops apply       → Live application assistant (reads form + generates answers)
  /career-ops prospect    → Direct prospecting messages (former clients, new targets)

  /career-ops negotiate   → Prepare TJM negotiation + contract checklist
  /career-ops tracker     → Application pipeline overview
  /career-ops followup    → Follow-up cadence tracker: flag overdue, generate drafts

  /career-ops cv          → CV only, ATS-optimized
  /career-ops research    → Deep research on a company
  /career-ops visibility  → Audit and optimize freelance profile (Malt, Comet, LinkedIn)
  /career-ops offboard    → Manage end-of-mission proactively
  /career-ops training    → Evaluate course/cert against profile
  /career-ops project     → Evaluate portfolio project idea
  /career-ops patterns    → Analyze rejection patterns and improve targeting

Inbox: add URLs to data/pipeline.md → /career-ops pipeline
Or paste a JD directly to run the full pipeline.
```

---

## Context Loading by Mode

After determining the mode, load the necessary files before executing:

### Modes that require `_shared.md` + their mode file:
Read `modes/_shared.md` + `modes/{mode}.md`

Applies to: `auto-pipeline`, `eval`, `compare`, `cv`, `outreach`, `apply`, `pipeline`, `scan`, `batch`, `gmail`, `negotiate`, `prospect`, `followup`

### Standalone modes (only their mode file):
Read `modes/{mode}.md`

Applies to: `tracker`, `research`, `training`, `project`, `patterns`, `visibility`, `offboard`

### Modes delegated to subagent:
For `scan`, `apply` (with Playwright), `pipeline` (3+ URLs), and `gmail` (> 5 emails): launch as Agent with the content of `_shared.md` + `modes/{mode}.md` injected into the subagent prompt. For `gmail` specifically, launch individual email evaluations as background Agents in parallel, then aggregate.

```
Agent(
  subagent_type="general-purpose",
  prompt="[content of modes/_shared.md]\n\n[content of modes/{mode}.md]\n\n[invocation-specific data]",
  description="career-ops {mode}"
)
```

Execute the instructions from the loaded mode file.
