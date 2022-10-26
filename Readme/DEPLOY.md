# Deploy

> First of all you have to prepare the database and put the correct environment variables in the `.env.production` file

To deploy the app in production you have to make a docker image, for that you have to execute the command `make buildImage/prod`.

This command generates the js files (from the typescript source code) in the dist folder and generates a docker image with the production environment variables.

With this docker image you can deploy to any service that supports docker.

You can also deploy to a node server. For that you need to generate the js files with the `make buildApp/prod` command, move the dist folder to the server and run the `dist/src/index.js` file with node
