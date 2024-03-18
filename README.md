# Getting Started with the Project

## Technology

### customer-app: Next.js

### admin-app: React.js

### service-provider-app: React.js

## Steps to follow to run the project:

Prerequisites

- Node (v14.17.1) To know more https://nodejs.org/en/
- Yarn (v1.22.17) To know more https://www.npmjs.com/

### `yarn`

Installs the dependencies for all the three projects.

- Update your environment variables depending on the environment
- Variables common across all projects are placed inside common project and project specific variables are stored in respective projects

### `yarn build`

Builds teh common package which is used inside all the projects.

### `yarn customer`

Starts the customer application.

### `yarn admin`

Starts the admin application.

### `yarn service-provider`

Starts the service provider application.

## Steps to perform the deployment:

- Connect to the server with SSH
- Checkout to the branch you want to deploy and pull your changes
- Update your environment variables depending on the environment
- Run ./deploy-scripts/2-build-all.sh
