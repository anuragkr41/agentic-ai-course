// Syllabus data. Loaded as a script (not JSON) so file:// works without a local server.
// `file` is the filename inside /modules/ — paths are computed at render time.

window.SYLLABUS = [
  {
    id: 'module-00',
    num: '0',
    title: 'Primer',
    subtitle: 'Foundations for non-coders',
    file: '00-primer.html',
    est: '15 min',
    optional: true,
    description: 'Quick foundations: LLMs, APIs, JSON, databases, and how to read a Python snippet. Skip if comfortable.'
  },
  {
    id: 'module-01',
    num: '1',
    title: 'Agentic AI Essentials',
    file: '01-essentials.html',
    est: '60 min',
    description: 'Agent vs. generative AI, building blocks, single vs multi-agent, HITL, frameworks overview, responsible AI, real case studies.'
  },
  {
    id: 'module-02',
    num: '2',
    title: 'Architectures & Design Patterns',
    file: '02-architectures.html',
    est: '70 min',
    description: 'Router, planner-executor, supervisor-worker. ReAct, reflection, tool-use, planning. Design tradeoffs.'
  },
  {
    id: 'module-03',
    num: '3',
    title: 'LangChain & LCEL',
    file: '03-langchain-lcel.html',
    est: '75 min',
    description: 'Document loaders, splitters, embeddings, vector stores. LCEL composition, structured outputs, reliability.'
  },
  {
    id: 'module-04',
    num: '4',
    title: 'LangGraph (State + Memory)',
    file: '04-langgraph.html',
    est: '75 min',
    description: 'State schema, reducers, checkpoints, HITL gates, short/long-term memory, graph deployment.'
  },
  {
    id: 'module-05',
    num: '5',
    title: 'Agentic RAG',
    file: '05-agentic-rag.html',
    est: '65 min',
    description: 'Adaptive retrieval, query rewriting, reranking, citations, groundedness evaluation.'
  },
  {
    id: 'module-06',
    num: '6',
    title: 'Knowledge Graphs (Neo4j)',
    file: '06-knowledge-graphs.html',
    est: '65 min',
    description: 'Entity-relation modeling, ontologies, provenance, constraints, structured reasoning.'
  },
  {
    id: 'module-07',
    num: '7',
    title: 'GraphRAG',
    file: '07-graphrag.html',
    est: '60 min',
    description: 'Multi-hop traversal, hybrid vector + text + graph retrieval, evidence + path explainability.'
  },
  {
    id: 'module-08',
    num: '8',
    title: 'MCP & Tool Standardization',
    file: '08-mcp.html',
    est: '55 min',
    description: 'MCP architecture, tool contracts, secure read-only access, auditable execution.'
  },
  {
    id: 'module-09',
    num: '9',
    title: 'Tooling & Safety (Guardrails)',
    file: '09-guardrails.html',
    est: '70 min',
    description: 'Prompt injection threats, input/output validation, allowlists, approve / edit / reject flows.'
  },
  {
    id: 'module-10',
    num: '10',
    title: 'Evaluation & Observability (Langfuse)',
    file: '10-evaluation-langfuse.html',
    est: '70 min',
    description: 'Groundedness, citation coverage, schema validity. Traces, spans, runs. Cost & latency monitoring.'
  },
  {
    id: 'module-11',
    num: '11',
    title: 'No-Code Agents (n8n)',
    file: '11-no-code-n8n.html',
    est: '50 min',
    description: 'Workflows with triggers and approvals. Integrations: webhooks, Slack, DB. Audit logs.'
  },
  {
    id: 'module-12',
    num: '12',
    title: 'Databricks Text-to-SQL Agent',
    file: '12-databricks-text-to-sql.html',
    est: '70 min',
    description: 'Unity Catalog, views-only pattern, schema-aware SQL generation, approval gates, Delta logging.'
  }
];

window.PROJECTS = [
  {
    id: 'project-01',
    num: '1',
    title: 'Enterprise Knowledge Intelligence Agent',
    file: '01-graphrag-knowledge-agent.html',
    unlock: 'module-07',
    tags: ['GraphRAG', 'Neo4j', 'RAG'],
    description: 'Ingest documents → entities → Neo4j provenance graph. Hybrid retrieval. Evidence + graph-path explainability.'
  },
  {
    id: 'project-02',
    num: '2',
    title: 'Multi-Agent Operations Workflow',
    file: '02-multi-agent-ops.html',
    unlock: 'module-04',
    tags: ['LangGraph', 'HITL', 'Multi-agent'],
    description: 'Supervisor → worker orchestration with retries, human approvals, audit logs, allowlisted tools.'
  },
  {
    id: 'project-03',
    num: '3',
    title: 'MCP Tool-Augmented Agent',
    file: '03-mcp-tool-agent.html',
    unlock: 'module-08',
    tags: ['MCP', 'Tools', 'Security'],
    description: 'MCP server exposing safe (read-only, allowlisted) tools with structured outputs and audit logging.'
  },
  {
    id: 'project-04',
    num: '4',
    title: 'Databricks Ask-to-Query Agent',
    file: '04-databricks-ask-to-query.html',
    unlock: 'module-12',
    tags: ['Databricks', 'Text-to-SQL', 'Governance'],
    description: 'Schema-aware Text-to-SQL with SELECT-only validation, approval gate, Delta result + run registry.'
  },
  {
    id: 'project-05',
    num: '5',
    title: 'LLM Evaluation & Observability',
    file: '05-eval-observability.html',
    unlock: 'module-10',
    tags: ['Langfuse', 'Evals', 'Reliability'],
    description: 'Langfuse traces / spans / runs. Prompt versioning. Eval checks for groundedness, citations, schema validity.'
  }
];
