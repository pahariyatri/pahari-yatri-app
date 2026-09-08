# Pahari Yatri: SEO Strategy 2026 (AI-Age Architecture)

This document outlines the advanced SEO practices implemented in the Pahari Yatri codebase to ensure dominance in an ecosystem driven by AI Overviews (SGE), RAG systems, and Agentic Search.

## 1. Answer Engine Optimization (AEO)
The primary goal is no longer just ranking for "blue links," but becoming the **Source of Truth** for AI-generated answers.

### The 40–60 Word Rule
- **Practice**: Start key semantic sections with a direct, fact-dense answer between 40 and 60 words.
- **Why**: AI models (Google SGE, Perplexity) prioritize these "citation blocks" for extraction into their summaries.
- **Implementation**: See hidden `data-rag-chunk` blocks in `app/chapters/[...slug]/page.tsx` and `app/stories/[...slug]/page.tsx`.

### Answer-First Architecture
- **Structure**: `Definition` → `Process` → `Example`.
- **Logic**:
    - **Definition**: Identifies the core fact.
    - **Process**: Explains the logic/how-to.
    - **Example**: Provides first-hand validation (E-E-A-T).

## 2. Entity-Based Knowledge Graph
Moving from keyword matching to **Relationship Mapping**.

### Deep Entity Linking
- **WikiData Integration**: We map locations and concepts to stable WikiData IDs. This anchors the site to the global Knowledge Graph.
- **Geo-Coordinates**: Providing exact Lat/Long for Himalayan "Places" allows AI agents to verify spatial facts.
- **Cross-Referencing**: All stories are linked to their respective "Chapter" (TouristTrip) and "Organization" (Brand) using `@id` references in JSON-LD.

## 3. Agentic Search Readiness
Optimizing for bots that consume JSON and feeds before HTML.

### AI Discovery Maps
- **[llms.txt](file:///d:/workspace/pahari-yatri-app/public/llms.txt)**: A high-level manifesto for LLMs.
- **[llms-full.txt](file:///d:/workspace/pahari-yatri-app/public/llms-full.txt)**: A complete technical index of site entities, intent, and navigation.

### Video & Media Entities
- **VideoObject Schema**: Every video (like the hero banner) is defined as a schema entity. This ensures visibility in Video Search and AI-generated multimedia answers.

## 4. Experience-First Signals (E-E-A-T 2.0)
In 2026, the only content AI cannot replicate is **proprietary experience**.

- **First-Hand Proof**: Our "Stories" are structured as `BlogPosting` entities that cite specific moments and insights.
- **Author Identity**: Transitive linking from stories to the central Organization entity proves the authority of the narrative.

## 5. Technical Performance for Citations
- **FCP Target**: < 0.4s. 
- **Impact**: Fast-loading content is exponentially more likely to be cited by real-time RAG systems as it reduces the latency of the AI's "thought" cycle.

---

*This architecture is designed to be self-healing as AI models evolve. By maintaining the Knowledge Graph in `lib/schema.ts`, new entity properties can be rolled out across the entire site instantly.*
