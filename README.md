properly storefront service
============================

## Available sites
https://properly-finance.surge.sh/


### Install and run

In the project directory, you can run for install libs:

```bash
yarn install
yarn run server:bs
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


### Deploy


```bash
surge
```

...and enter your email, create password , point the folder with build and will enjoy :))

```
root@9305f13701b1:/usr/local/lib/properly_storefront# surge 

   Welcome to surge! (surge.sh)
   Login (or create surge account) by entering email & password.

          email: (node:218) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
          email: elstton@yahoo.com
       password: 

   Running as elstton@yahoo.com (Student)

        project: /usr/local/lib/properly_storefront/build
         domain: properly-finance.surge.sh
         upload: [====================] 100% eta: 0.0s (10 files, 4658769 bytes)
            CDN: [====================] 100%

     encryption: *.surge.sh, surge.sh (380 days)
             IP: 138.197.235.123

   Success! - Published to properly-finance.surge.sh
```


### Redeploy

```bash
rm -rf build/*
yarn run build:release
cp build/index.html build/200.html
surge
```