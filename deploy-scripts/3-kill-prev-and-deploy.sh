#kill all processes with command matching 'node'
pkill -f node

# deploy customer app (other client apps are static files)
cd packages/customer-app
yarn start &
