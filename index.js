// index.js -- a simple mongodb client test
const MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017/test';

const startTime = Date.now();
const handleDBConnect = (dbClient) => {
  console.log('[handleDBConnect]');
  console.log('  Successfully connected to db server');
  console.log(`  took ${Date.now() - startTime} ms`);
  return dbClient;
};

const addLogEntry = (dbClient) => {
  console.log('[addLogEntry]');
  const logEntry = { date: Date.now() };
  const logsCollection = dbClient.db().collection('logs');
  return logsCollection.insertOne(logEntry).then(response => {
    console.log(`  Successfully inserted ${response.result.n} log entry`);
    console.log(`  insert took ${Date.now() - logEntry.date} ms`);
    return dbClient;
  });
};

const showEntries = (dbClient) => {
  console.log('[showEntries]');
  const logsCollection = dbClient.db().collection('logs');
  return logsCollection.find({})
   .toArray()
   .then(logEntries => {
     logEntries
       .map(entry => entry.date)
       .sort()
       .reverse()
       .forEach(date => console.log(`  ${new Date(date)}`));
     return dbClient;
   });
};


const closeConnection = (dbClient) => {
  console.log('[closeConnection]');
  dbClient.close();
};

MongoClient.connect(DB_URL, { useNewUrlParser: true })
  .then(handleDBConnect)
  .then(addLogEntry)
  .then(showEntries)
  .then(closeConnection)
  .catch(console.error);

