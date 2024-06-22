# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Changelog
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
