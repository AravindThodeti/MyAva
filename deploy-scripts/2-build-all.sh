#GIT_ROOT=${PWD}
GIT_ROOT=$(git rev-parse --show-toplevel)

#pushd $(pwd)
pushd ${GIT_ROOT}

#update code
#save working directory changes
git add .
git stash
git fetch
git pull
git stash pop

# cd moves to GIT_ROOT
#popd

# install dependencies
lerna bootstrap -- --production --no-optional

# build and start the front-end
cd ${GIT_ROOT}/packages/common && yarn run build;
# cd ${GIT_ROOT}/packages/admin-app && yarn run build;
# cd ${GIT_ROOT}/packages/service-provider-app && yarn run build;
cd ${GIT_ROOT}/packages/customer-app && yarn run build

#kill all processes with command matching 'node'
pkill -f node

# deploy customer app (other client apps are static files)
cd ${GIT_ROOT}/packages/customer-app
yarn start &

# cd moves to initial pwd before script started
popd
