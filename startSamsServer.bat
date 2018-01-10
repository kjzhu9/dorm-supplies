cd "C:\Program Files\MongoDB\Server\3.6\bin"
START mongod --dbpath "C:\Users\kjzhu\Documents\mongodb\data\db" --port 5000
TIMEOUT 1
cd "C:\Users\kjzhu\Documents\Harvard\dev-bootcamp\dorm-supplies"
nodemon app.js