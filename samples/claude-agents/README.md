# AI-assisted engineering (Claude Code) samples

Original, generic examples modeled on agents and skills I wrote for an Android team's Claude Code toolkit.
No employer code, prompts or internal names. Drop the `.claude/` folder into any Android project to try them.

| File | Type | What it does |
|---|---|---|
| `.claude/agents/crash-correlator.md` | Agent | Merges Play Console and Embrace crashes by signature and files one Jira ticket per unique crash, updating instead of duplicating |
| `.claude/skills/migrate-presenter/SKILL.md` | Skill | Migrates a legacy presenter + coordinator to a base presenter with typed effects (worked example in `samples/mvi-core/.../migration/`) |
| `.claude/agents/figma-to-compose.md` | Agent | Turns a Figma frame into a Compose screen using design-system tokens |
| `.claude/skills/mvi-feature/SKILL.md` | Skill | Scaffolds a new MVI feature with state, intents, reducer and tests |
