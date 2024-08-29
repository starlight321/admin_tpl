node -v

nvm install 18.19.0
nvm use 18.19.0
npm install --legacy-peer-deps

# npm i
npm run build
cp dist/admin/index.html dist/
