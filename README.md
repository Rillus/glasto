# Glasto 2024
## by Riley Ramone, Ticketlab

# Changelog
### 2025-06-23: v2.3 - Offline PWA Enhancement
- **Major PWA Improvements**: Enhanced offline functionality with smart caching strategies
- **Service Worker Overhaul**: Implemented cache-first strategies for festival data and network-first for navigation
- **Offline Experience**: App now works seamlessly offline without showing offline page when cached data is available
- **Smart Offline Indicator**: Only shows when no cached content is available, providing non-intrusive user feedback
- **Timezone Fix**: Fixed lineup times appearing an hour earlier than stated in festival data
- **Debugging Tools**: Added comprehensive debugging utilities for service worker and cache management
- **Enhanced Offline Page**: Improved offline fallback page with better information about available features
- **Cache Management**: Implemented separate caches for different content types (festival data, static resources, images)
- **Service Worker Updates**: Added automatic update detection and manual update utilities
- **Documentation**: Added detailed debugging section to README with troubleshooting commands

### 2025-06-24: v2.6
- Show/hide past acts

### 2025-06-24: v2.5
- Allow act view and search by "all" days

### 2025-06-23: v2.4
- New API source for data for easy remote lineup updates

### 2025-06-23: v2.3
- PWA enhancemets
- Footer update

### 2025-05-11: v2.2
- Updates app logos and references to 2025

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

# Glasto 2025

Line-up, stages and maps for Glastonbury Festival 2025

## Features

- **📱 Progressive Web App**: Install on your phone for native app experience
- **🔄 Offline Support**: Works without internet connection using smart caching
- **🎭 Browse Acts**: View all festival acts with search and filtering
  - **🆕 "All" Button**: View acts from all days at once for comprehensive searching
  - **📅 Day Filtering**: Filter by specific festival days (Wed-Mon)
  - **🔍 Smart Search**: Find acts with 3+ character search
- **🎪 Stage Information**: Explore different festival stages and their lineups
- **⭐ Personal Lineup**: Create and manage your custom festival schedule
- **🗺️ Festival Maps**: Navigate the festival grounds
- **📤 Share Lineups**: Share your personal lineup with friends
- **🌐 Live Data**: Always get the latest lineup updates from our festival API

## Offline Functionality

This app is a Progressive Web App (PWA) that works offline:

### What Works Offline
- ✅ Your saved lineup and favourite acts
- ✅ Festival data (stages, acts, times) - cached for 24 hours
- ✅ App interface and navigation
- ✅ Basic functionality for browsing acts and stages

### Offline Features
- **Smart Caching**: Festival data is cached when you first visit and updated when online
- **Offline Indicator**: Shows when you're offline with a helpful message
- **Fallback Page**: Custom offline page when completely disconnected
- **Persistent Storage**: Your saved acts are stored locally and available offline

### How to Use Offline
1. Visit the app once while online to cache the festival data
2. Your saved lineup will be available offline
3. Browse acts and stages even without internet connection
4. Changes to your lineup will sync when you're back online

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the App
```bash
# Development
npm start

# Production build
npm run build

# Run tests
npm test
```

### PWA Features
The app includes:
- Service Worker for offline caching
- Web App Manifest for installation
- Offline fallback pages
- Responsive design for mobile devices

## Testing Offline Functionality

1. Build the app: `npm run build`
2. Serve the build folder: `npx serve -s build`
3. Open in browser and visit the app
4. Open DevTools → Application → Service Workers to see the service worker
5. Go offline in DevTools → Network → Offline
6. Refresh the page - the app should still work!

## Debugging Commands

The app includes several debugging utilities that can be run from the browser console to help troubleshoot offline functionality and service worker issues.

### Service Worker Management
```javascript
// Force update the service worker (useful when testing changes)
window.forceServiceWorkerUpdate()

// Check for service worker updates
window.checkForServiceWorkerUpdates()

// Inspect all caches and their contents
window.inspectCaches()

// Clear all caches (useful for testing from scratch)
window.clearAllCaches()
```

### Common Debugging Scenarios

#### **Service Worker Not Updating**
If you've made changes to the service worker but they're not taking effect:
```javascript
// 1. Force update the service worker
window.forceServiceWorkerUpdate()

// 2. Or manually unregister in DevTools:
// Application → Service Workers → Unregister
```

#### **Offline Page Appearing When It Shouldn't**
If the app is showing the offline page when you have cached data:
```javascript
// 1. Check what's in your caches
window.inspectCaches()

// 2. Clear all caches and start fresh
window.clearAllCaches()

// 3. Reload the page to rebuild cache
location.reload()
```

#### **Testing Offline Functionality**
To test the offline experience:
1. Visit the app while online to cache data
2. Open DevTools → Network → Offline
3. Refresh the page
4. The app should work normally with cached content

#### **Checking Cache Contents**
To see exactly what's stored in your caches:
```javascript
// This will log all cache names and their contents
window.inspectCaches()
```

### Manual Service Worker Management
If the debugging commands don't work, you can manually manage the service worker:

1. **Open DevTools** (F12)
2. **Go to Application tab**
3. **Click "Service Workers" in the left sidebar**
4. **Click "Unregister" to remove the old service worker**
5. **Refresh the page** to register the new one

### Cache Storage Management
To manually inspect or clear caches:
1. **Open DevTools** (F12)
2. **Go to Application tab**
3. **Click "Storage" in the left sidebar**
4. **Expand "Cache Storage"**
5. **Right-click on cache names to delete them**

## Contributing

This is a personal project for Glastonbury Festival 2025. Feel free to fork and modify for your own festival needs.

## License

MIT License - see LICENSE file for details.

## 🔄 Data Strategy

The app uses a **network-first** approach for lineup data to ensure you always get the latest information:

1. **Online**: Always fetches the latest data from `https://glasto-lineup.vercel.app/api/lineup-data`
2. **Network fails**: Falls back to cached API data from previous visits
3. **No cached API data**: Falls back to local `/g2025.json` file
4. **Completely offline**: Serves cached app with last known data

This ensures you get real-time lineup updates, schedule changes, and artist additions right up until the festival starts, while still working perfectly offline.

## 🏠 Offline PWA Features
