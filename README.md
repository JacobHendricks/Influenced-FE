# Influenced

#### https://cosmic-kitsune-2a241b.netlify.app/

A website that allows users to find and enter ratings and reviews for influencers.
Users can browse influencers by category.  Users can search for influencers by name and filter by the number of followers.  Users can enter a rating and review for influencers.

### User Flow

* **Home Page** - Prompt to sign up/ Login or Welcome user back
* **Categories** - List of influencer categories.  Selecting one will redirect to the Influencers page filtered on that category.
* **Influencers** - Shows list of influencers. Each card shows basic info about an influencer along with average rating. Can search and filter influencers by name, category, and number of followers. Clicking on an influencer will redirect to the Influencer Detail page.
* **Influencer Detail** - Shows all info about an influencer.  Here Users can enter ratings and reviews on that influencer.  Users can also see a list of other users ratings/reviews.
* **Profile** - User Profile page. Can edit user info.  Can also view previous User ratings and delete them.

### Technology Stack Used

JavaScript, React, Bootstrap, Express, Node, PostgreSQL

### API

For this project the Instagram Statistics API is used to get influencer data:
https://rapidapi.com/artemlipko/api/instagram-statistics-api

User info along with ratings are stored in a PosgreSQL database.

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.