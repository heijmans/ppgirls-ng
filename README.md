# Powerpuff Girls

This is a SPA that shows episode lists for the different Powerpuff Girls cartoons.

## Getting started

Requirements:

- [node 8+](https://nodejs.org/)
- [yarn 1.x](https://yarnpkg.com/)

Install dependencies:

    yarn

Run the development server:

    yarn start

Open in your browser: [http://localhost:4200](http://localhost:4200)

Make a production build:

    yarn build --prod

Run the unit tests:

    yarn test

You can also use the `wallaby.js` config file to run the tests in Wallaby.

Run the protractor e2e tests (do NOT start the development server):

    yarn e2e

Run the cypress e2e tests in your terminal (start the development server first with `yarn start`):

    yarn cypress

Run the cypress e2e tests in a browser (start the development server first with `yarn start`):

    yarn cypress:open

Run prettier and tslint on the source code:

    yarn ok

## Problems?

I am not sure that cypress works flawlessly on all platforms. I have mainly tested this on MacOS. If you cannot continue because you cannot install cypress, just remove cypress from the devDependencies in package.json. e2e tests will not work, but all the rest should be fine.

## Todo

This is a very limited demo app. Important todo's are:

- Beter cross browser testing (I only tested Firefox and Chrome).
- Error handling.
- Better/more documentation and comments.
