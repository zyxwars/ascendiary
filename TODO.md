# Primary

- Add Crag remembers the go back value even if navigated to using the stack and not Add Route
  - 1. move route to both stacks and don't even use interstack navigation
  - 2. reset state on route load
- Add scrolling to autocomplete, routeslist, etc.

# Quick fixes:

- Crag autocomplete not showing the add button if no crags exist
- Fix routenav typing when switching between stacks
- Change fab sizes

# Long-term:

- Optimize select columns when getting data for menu where not all columns are required
- Abstract global dialog into an object
- Refresh page after getting permissions
- Error handling, error toast/alert
- Check for too long stack history and add resets, don't allow return from specific routes
