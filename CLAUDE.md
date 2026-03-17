# CLAUDE.md — Outrick N8N Workflow Builder

## Project Purpose

This project is configured to **build advanced n8n workflows and AI agents directly on a live n8n instance** using natural language prompts only.

Two tools power this setup:
- **7 n8n Skills** — specialized Claude Code skills that teach n8n syntax, patterns, and best practices
- **n8n MCP Server** — Model Context Protocol server giving Claude direct access to 1,239+ n8n nodes and live workflow management

---

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Animations:** Framer Motion + GSAP
- **Deployment:** Vercel

---

## Installed Tools

### n8n Skills (`~/.claude/skills/`)

Seven skills installed from [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills). They **activate automatically** based on the query — no manual invocation needed:

| Skill | Purpose |
|-------|---------|
| `n8n-expression-syntax` | Correct `{{}}` syntax, `$json`, `$node[]`, webhook structures |
| `n8n-mcp-tools-expert` | Tool selection, nodeType formats, validation profiles |
| `n8n-workflow-patterns` | 5 proven patterns: webhook, HTTP API, database, AI agent, scheduled |
| `n8n-validation-expert` | Interpret and fix validation errors |
| `n8n-node-configuration` | Operation-aware node configuration |
| `n8n-code-javascript` | JavaScript in Code nodes |
| `n8n-code-python` | Python in Code nodes |

### n8n MCP Server

Installed globally: `npm install -g n8n-mcp`
Binary: `/Users/kuepaedutech/.nvm/versions/node/v22.21.1/bin/n8n-mcp`
Configured in: `~/.claude/settings.json`

**Documentation tools (always available — no credentials needed):**
- `search_nodes` — find nodes by keyword across 1,239 nodes
- `get_node_info` — get full node documentation and properties
- `get_node_examples` — real-world examples from 2,737 templates
- `search_templates` — search workflow templates by use case
- `validate_workflow` — validate a workflow JSON before deploying
- `validate_node_config` — validate a single node configuration
- `get_workflow_templates` — browse templates by category

**n8n management tools (require N8N_URL + N8N_API_KEY configured):**
- Create, read, update, delete workflows
- Activate/deactivate workflows
- Execute workflows manually
- List and inspect executions
- Check instance health

---

## Setup: Connecting to Your n8n Instance

To enable live workflow management, update `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "n8n": {
      "command": "n8n-mcp",
      "env": {
        "MCP_MODE": "stdio",
        "N8N_URL": "https://your-n8n-instance.com",
        "N8N_API_KEY": "your-api-key-here",
        "LOG_LEVEL": "error"
      }
    }
  }
}
```

**To get your n8n API key:**
1. In n8n, go to **Settings → API**
2. Create a new API key
3. Copy it into `N8N_API_KEY` above

After updating, restart Claude Code.

---

## How to Build Workflows

### The Ideal Prompt Structure

```
Build an n8n workflow that:
- Trigger: [how it starts — webhook, cron schedule, manual, event]
- Steps: [ordered list of operations]
- Integrations: [services used — Slack, Gmail, Sheets, HTTP APIs, DB]
- Data mapping: [what data flows between nodes]
- Output: [what the workflow produces or where it ends]
- Error handling: [what should happen on failure]
```

### Example Prompts

**Simple automation:**
```
Build an n8n workflow that:
- Trigger: webhook POST with a lead's name and email
- Steps: Save to Google Sheets, send welcome email via Gmail, notify in Slack
- Data mapping: use $json.body.name and $json.body.email from webhook
```

**AI Agent:**
```
Build an n8n AI Agent workflow that:
- Trigger: webhook receiving a customer support message
- Agent: uses GPT-4o to classify the issue and draft a response
- Tools available to the agent: search knowledge base via HTTP, create ticket in Linear
- Output: send drafted response to Slack for human approval
```

**Scheduled report:**
```
Build an n8n workflow that:
- Trigger: every Monday at 9am
- Fetches last 7 days of sales from PostgreSQL
- Calculates totals and generates a summary with a Code node
- Sends the report as a formatted Slack message with charts
```

---

## Quality Rules for All Workflows

Claude must follow these rules when building workflows:

1. **Always validate** — use `validate_workflow` before deploying any workflow
2. **Error handling** — every workflow must have an Error Trigger or try/catch paths
3. **Expression syntax** — use `{{ $json.fieldName }}` format; reference nodes as `{{ $node["NodeName"].json.field }}`
4. **Idempotency** — workflows must be safe to re-run without duplicating side effects
5. **Credentials by reference** — never hardcode API keys or secrets in node config
6. **No direct production edits** — always create a copy and test before activating on production
7. **Meaningful node names** — name nodes descriptively (e.g., "Get Leads from Sheets" not "Spreadsheet")
8. **Sub-workflows for reuse** — extract repeated logic into separate workflows called via Execute Workflow node

---

## Verification

To confirm everything is working, ask Claude:
- "Search for the Slack node in n8n" → uses `search_nodes`
- "Show me a webhook workflow example" → uses `get_workflow_templates` + `n8n-workflow-patterns` skill
- "Validate this workflow: [paste JSON]" → uses `validate_workflow`
- "List my n8n workflows" → uses management tools (requires credentials configured)

---

## Dev Commands

```bash
npm run dev      # Start Next.js dev server
npm run build    # Production build
npm run lint     # ESLint
```
