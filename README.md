# react-redux-filter-products

This is a react app which gathers products from Gousto API, filtered by category. It also allows you to search for a product and see its description.

This app was created using [`create-react-app`](https://github.com/facebook/create-react-app), and uses redux for state management.

Tests were implemented using Jest and Enzyme.

## How to run the app

1. Clone repository

`git clone https://github.com/anaisamp/react-redux-filter-products.git`

2. Install its dependencies

`npm install`

3. Development server

`npm run start`

4. Run tests

`npm run test`

## Features

- Shows all the available category names in one row (can wrap into multiple lines if screen is not wide enough)
- Shows a list of product titles under each other
- Once a category is clicked only products belonging to the clicked category will be shown and clicked category will be bold to indicate it is active
- An input field should be placed above the list of products and below the categories.
- The input field should be used as a free text search filter for products. Once input is entered only products which feature the given text in their title or description should be shown . (eg: input is "win", products with title "Red Wine" should be shown)
- When a product name is clicked it becomes bold and toggles the visibility of the description, ie. when clicked it shows the product description below the product name. When clicked again the description should not be shown. Multiple descriptions can be shown in the same time.

## Next steps

- Take advantage of react-router to go back and forward when user navigates.
- More tests should be added to test the application.