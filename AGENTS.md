# AGENTS.md
# Flight Passport Landing — Repository Agent Rules

This file defines how any AI coding agent must operate in this repository.

It applies to:
- Claude
- Codex
- Cursor agents
- any other repository-aware coding assistant

This document is the general execution contract for the project.

---

## PROJECT PURPOSE

This repository contains the public landing page for Flight Passport.

Flight Passport is a premium flight intelligence product.

This website must communicate:
- clarity
- trust
- calm
- product maturity
- real-world usefulness

It is not a generic startup landing page.
It is not a playful experiment.
It is not a marketing-heavy template site.

The site must feel structured, premium, minimal, and production-ready.

---

## PRIMARY OBJECTIVE

Build and maintain a high-quality landing page that is:

- visually clean
- technically safe
- easy to iterate
- responsive
- accessible
- fast to deploy

---

## REPOSITORY PRIORITIES

Priority order:

1. Working implementation
2. Clean structure
3. Design consistency
4. Accessibility
5. Performance
6. Micro-polish

Do not sacrifice clarity for creativity.

---

## STACK

Preferred stack:

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion (light use only)
- Vercel deployment

Do not introduce unnecessary tools or infrastructure.

---

## ARCHITECTURE RULES

Keep the repo simple and predictable.

Preferred structure:

- app/
- components/
- public/
- styles/
- lib/
- docs/

Use clear component extraction.

Do not:
- duplicate sections unnecessarily
- create random folders
- introduce premature abstraction
- add backend logic unless explicitly required

---

## DESIGN RULES

The design must feel:

- premium
- calm
- precise
- breathable
- modern

Do not introduce:
- noisy gradients
- loud visual hierarchy
- playful motion
- chaotic card systems
- unnecessary decoration

Use restrained motion only.

---

## LAYOUT RULES

Use these defaults unless the repo already defines something better:

- Desktop frame target: 1440px
- Max content width: 1200px
- Grid: 12 columns
- Base spacing system: 8px
- Section spacing: 96px

Maintain strong visual rhythm and clear spacing.

---

## TYPOGRAPHY RULES

Typography must prioritize readability and hierarchy.

Use a clear scale.
Do not use decorative typography.
Do not overcrowd sections with long text blocks.
Prefer short, structured content.

---

## CODE RULES

All code must be:

- readable
- maintainable
- minimal
- production-safe

Do not:
- leave broken code
- leave dead components
- create unused abstractions
- add speculative complexity

Prefer explicit components and predictable props.

---

## RESPONSIVE RULES

The landing page must work well at minimum on:

- 390px
- 768px
- 1280px
- 1440px

Never treat desktop-only implementation as acceptable.

---

## ACCESSIBILITY RULES

Always maintain:

- semantic HTML
- alt text for images
- keyboard reachable interactive elements
- reasonable contrast
- heading hierarchy

Accessibility is required, not optional.

---

## PERFORMANCE RULES

The site must remain lightweight.

Avoid:
- unnecessary large dependencies
- oversized images
- autoplay media
- excessive animation
- unnecessary client-side complexity

Optimize for fast initial load.

---

## CONTENT RULES

The landing page content must feel:

- direct
- clear
- premium
- factual
- restrained

Avoid:
- startup cliches
- hype language
- empty claims
- exaggerated marketing copy

---

## SAFETY RULES

Before major changes, the agent must:

1. understand the current structure
2. explain what will change
3. keep edits scoped
4. avoid destructive actions

Do not delete or rewrite large parts of the codebase without clear justification.

---

## WORKFLOW RULES

When performing implementation work, the agent should:

1. inspect current files
2. identify the smallest correct next step
3. make focused changes
4. explain what changed
5. explain how to verify it

Never make broad chaotic rewrites unless explicitly requested.

---

## DEFINITION OF GOOD OUTPUT

A good contribution in this repository is:

- clear
- minimal
- correct
- visually aligned
- easy to continue

A bad contribution is:

- over-engineered
- visually noisy
- poorly explained
- hard to maintain
- disconnected from the product tone

---

## FINAL RULE

Every change must reduce uncertainty.

The repository should become:
- easier to understand
- easier to run
- easier to maintain
- closer to production

If a change increases confusion, it is the wrong change.
