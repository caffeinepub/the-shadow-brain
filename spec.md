# The Shadow Brain

## Current State
- Dashboard shows 3 seed projects (static fallback when no real data exists)
- Each seed project has a name, description, and 2-3 tags
- Project page shows 3 seed decisions per project
- Keyword Pulse sidebar shows tags from decisions
- Context Burst panel shows high-impact decisions on hover
- No project team members, client info, or client requirements data

## Requested Changes (Diff)

### Add
- 10 richly detailed seed projects on the DashboardPage (replacing current 3)
- Each project includes: name, description, tags (keyword impulses), team members list, client name, client industry, and client requirements summary
- Extended seed decisions per project (3 decisions each) with matching tags
- A ProjectDetailOverlay or expanded ProjectPage sidebar showing: Team Members section, Client Info section, Client Requirements section
- Seed data file (`seedData.ts`) to centralize all mock content

### Modify
- DashboardPage: use 10 new seed projects
- ProjectPage: render team members, client info, and client requirements in the sidebar alongside Keyword Pulse
- ProjectCard: show team member count and client name as metadata

### Remove
- Old 3-project seed arrays inline in DashboardPage and ProjectPage

## Implementation Plan
1. Create `src/frontend/src/data/seedData.ts` with 10 projects, each containing: id, name, description, tags, teamMembers[], clientName, clientIndustry, clientRequirements, and 3 decisions with tags
2. Update `DashboardPage.tsx` to import and use the new seed projects; show client name and team size on ProjectCard
3. Update `ProjectPage.tsx` to:
   - Import seed decisions from seedData for the active project
   - Add Team Members, Client Info, and Client Requirements panels in the sidebar below Keyword Pulse
4. Ensure all new UI surfaces have deterministic `data-ocid` markers
