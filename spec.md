# The Shadow Brain

## Current State

The project has a working Motoko backend with:
- Projects (CRUD, admin-only create/update/delete)
- Decisions (create by users, delete by admin, search by keyword, high-impact retrieval)
- Context Fragments (CRUD for authenticated users)
- User Profiles and role-based access (admin/user/guest via authorization mixin)

The frontend has:
- DashboardPage with project cards, hover Context Burst previews, search, incognito mode
- ProjectPage with Logic History timeline, Keyword Pulse tag sidebar, decision filtering and search
- NewProjectModal, NewDecisionModal, DecisionCard, ContextBurstPanel, Header, Footer, ProfileModal components
- Dark glassmorphism visual style with `glass-panel`, `text-glow`, `pulse-glow` CSS classes

The app expired and needs to be redeployed as a fresh build.

## Requested Changes (Diff)

### Add
- Nothing structurally new; rebuild on top of existing code

### Modify
- Ensure all existing features render correctly and are visually polished
- UI Craft pass: improve overall quality, layout consistency, and visual appeal of dark glassmorphism design

### Remove
- Nothing

## Implementation Plan

1. Validate and rebuild the existing frontend (typecheck, lint, build)
2. Apply a UI Craft pass to lift visual quality
3. Deploy
