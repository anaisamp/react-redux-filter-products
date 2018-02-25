# react-redux-filter-products

This is a react app which gathers products from Gousto API, filtered by category. It also allows you to search for a product and see its description.

This app was created using [`create-react-app`](https://github.com/facebook/create-react-app), and uses redux for state management.

Tests were implemented using Jest and Enzyme.

A screenshot of the application is available at "visuals" folder.

## How to run the app

1. Clone repository

`git clone https://github.com/anaisamp/react-redux-filter-products.git`

2. Install its dependencies

`npm install`

3. Development server

`npm run start`

Note: Disable cross-origin restrictions in the browser before running the app.

4. Run tests

`npm run test`

## Features

- Shows all the available category titles from categories endpoint.
- Shows a list of product titles under each category, gathered from products endpoint. Once a category is clicked only products belonging to the clicked category are displayed.
- A search field is placed above the list of products. It can be used as free text and it allows you to search for products which belongs to the selected category.
- When a product title is clicked it toggles the visibility of the description. Multiple descriptions can be shown at the same time.

## Next steps

- Take advantage of react-router to go back and forward when user navigates.
- More tests should be added to test the application.