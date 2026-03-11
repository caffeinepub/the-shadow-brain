# The Shadow Brain

## Current State
- 10 seed projects, each with team members, client info, requirements, keyword pulse, and decisions
- Keyword Pulse sidebar shows tags; hovering opens a Popover (side="right") showing truncated logic history
- App uses Internet Identity for auth; no custom login screen
- No feature images anywhere in the app
- No previous client projects or satisfaction ratings shown

## Requested Changes (Diff)

### Add
- Custom login screen: shown before the main app, credentials are username `TheShadowBrain2026` / password `Make.It.Happen`. Stored in localStorage. Glassmorphism dark style with The Shadow Brain branding and a hero feature image.
- Full-width Keyword Logic History: clicking a keyword tag opens a full Dialog/Sheet (not a small Popover) showing every decision for that tag with complete title, full reasoning text, full outcome text, tag badges, and importance stars. No truncation.
- Feature images on: Dashboard hero area, Project page header area, each of the sidebar panels (Keyword Pulse, Team, Client, Requirements)
- Previous client projects section on each ProjectPage: at the bottom, show all other seed projects that share the same clientName/clientIndustry, with a client satisfaction rating (1-5 stars) per project
- Client satisfaction ratings added to seedData for each project

### Modify
- Remove the Popover-based keyword logic history; replace with a Dialog that opens on click
- seedData: add `clientSatisfactionRating` and `previousClientProjects` reference data
- ProjectPage: add "Previous Work for Client" section below the decision timeline
- AppContext: add simple local login state (username/password check, persist to localStorage)
- App.tsx: gate entire app behind LoginPage if not authenticated

### Remove
- Keyword hover Popover (replaced by click-to-open Dialog)

## Implementation Plan
1. Add `clientSatisfactionRating: number` to SeedProject interface and all 10 seed entries in seedData.ts
2. Create LoginPage.tsx: full-screen glassmorphism login with username + password fields, validates TheShadowBrain2026 / Make.It.Happen, persists to localStorage
3. Update AppContext to include `isLocallyLoggedIn`, `localLogin`, `localLogout` functions
4. Update App.tsx to show LoginPage if not locally logged in
5. Create KeywordLogicDialog.tsx: a full Dialog component showing all decisions for a tag without truncation
6. Update ProjectPage.tsx: replace Popover keyword tags with buttons that open the KeywordLogicDialog
7. Add feature images to DashboardPage hero and ProjectPage panels
8. Add "Previous Work for Client" section to ProjectPage sidebar showing other projects by the same client with satisfaction star ratings
