properly storefront service
============================

## Available sites
https://properly-finance.surge.sh/


### Install and run

In the project directory, you can run for install libs:

```bash
yarn install
yarn server:bs
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Build

```bash
yarn run build:release
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Deply by `surge`


```bash
surge
```

...and enter your email, create password , point the folder with build and will enjoy :))


#### Redeploy

```bash
rm -rf build/*
yarn run build:release
cp build/index.html build/200.html
surge
```