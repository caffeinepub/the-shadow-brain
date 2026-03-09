# The Shadow Brain

## Current State
Full-stack app with glassmorphism UI. Has 10 detailed projects with keyword pulse, logic history, decisions, context fragments, and team/client data. Profile saving is broken because `saveCallerUserProfile` and `getCallerUserProfile` require the caller to have the `#user` role, but newly registered or guest principals fail the permission check before they can save a profile.

## Requested Changes (Diff)

### Add
- Nothing new to add.

### Modify
- `saveCallerUserProfile`: Change authorization check from `AccessControl.hasPermission(accessControlState, caller, #user)` to simply `not caller.isAnonymous()` -- any authenticated (non-anonymous) principal should be able to save their own profile.
- `getCallerUserProfile`: Same change -- only reject anonymous callers, not unregistered/guest principals.
- `getUserProfile`: Same -- reject anonymous callers instead of requiring user role.

### Remove
- Nothing to remove.

## Implementation Plan
1. Regenerate Motoko backend with the corrected profile authorization logic (allow any non-anonymous caller to read/write their own profile).
2. No frontend changes needed -- the existing ProfileModal and useQueries hooks are correct.
