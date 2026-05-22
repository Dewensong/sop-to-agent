# Adapter Roadmap

SOPilot V0 is adapter-ready, not adapter-complete. It generates stable workflow specs first, then maps those specs into downstream platforms in later phases.

## V0

- Canonical `SopSpec`
- Canonical `WorkflowSpec`
- Adapter readiness labels per node
- Markdown, JSON, Mermaid exports

## V0.2: LangGraph Draft Export

LangGraph is the first planned adapter because developer-reviewable code drafts fit SOPilot's open-source audience.

Target output:

- Node stubs
- State shape
- Human review interruption points
- Tool placeholders
- Comments pointing back to `workflow.json`

## V0.3: n8n Experimental Export

Start with a narrow subset:

- HTTP request
- LLM call placeholder
- Approval/manual review placeholder
- Notification
- Basic branching

The goal is a reviewable draft, not a guaranteed production import.

## V0.4: Dify Workflow Draft

Add after Dify workflow export shapes are validated against current platform behavior.

Target output:

- LLM nodes
- Knowledge/tool placeholders
- Human review notes
- Structured input/output schema hints

## Non-goals

- No production execution engine in SOPilot itself.
- No claim that generated downstream workflows can run without review.
- No hidden platform-specific logic inside the parser.
