# Glasto 2024
# by Riley Ramone at Ticketlab

# Changelog
### 2024-06-23: v2.1.1
- Adds "about this app" link to footer

### 2024-06-23: v2.1
- Highlight navigation link for current page
- Adds version number to footer

### 2024-06-23: v2
- Minor StageChip refactor to reduce DOM nodes
- Fetches data from separate json file (to allow for easier updates)
- Fixes for StageChip styles on larger screens

### 2024-06-22: v1.5
- Adds Stages search
 
### 2024-06-22: v1.4.3
- Style update for Act search
 
### 2024-06-21: v1.4.2
- Updates lineup as per Clashfinder General latest release
- Style update for better contrast division between acts
- Updated maps

### 2024-06-20: v1.4.2
- Tests for share line up functionality 

### 2024-06-20: v1.4.1
- Refactor Share Lineup feature
- Move and style Share Lineup button
- Some other minor style updates

### 2024-06-19: v1.4
- Share lineup functionality - shareable URL copied to clipboard from button on My Lineup page

### 2024-06-17: v1.3
- Updates day-filtered act list to be in time order
- Updates lineup as per Clashfinder General latest release

### 2024-06-16: v1.2
- Added .htaccess file: Ensures deep navigation works correctly on server - e.g. going to an act page directly from the url bar
- Add paging to acts list - lazy load/infinite scroll.
- Restricts day toggle to one day for more consistent behavior
- Adds dark mode icon to app
- Adds icon to header in place of "Glasto 2024" (for use less space and allow the nav to fit on mobile)

### 2024-06-11: v1.1 
- Changelog added to readme
- Adds 'My Lineup' page, with ability to add and remove acts from your personal lineup based on localStorage. 
- Adds 'My Lineup' link to navbar.
- Adds tests against Intro component (My Lineup) and act saving functionality.
- Ongoing typescript conversion.
- New app icons designed and added.

#### v1.1.1
- Meta description updated

### 2024-06-10: v1.0 
- Initial release of new React app based on last year's Remix version. 
- Adds tests for most components and functions.
- Adds latest lineup for 2024 added from Clashfinder General.
- Updates dates/times the festival is on for to 2024 times.
- Converts some files to typescript.
- Reinstates most features from last year's app:
  - Acts page with search and filter functionality.
  - Individual Act pages with all performances and stages for that act.
  - Stages page with colour-coded stages list.
  - Individual Stage page with all acts playing on that stage.
  - Map page with interactive map of the festival, including 'tube map' style map.

# To Do
- Add tests for all components and functions.
- Complete typescript conversion.
- Count down to festival start and now/next countdowns
- Add custom notes to acts
- Add custom notes to stages
- Add custom acts to stages with time and date
- Add custom stages
