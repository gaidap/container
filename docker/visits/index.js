const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
client.set('visits', 0);

app.get('/', (_reqquest, response) => {
  client.get('visits', (_error, visits) => {
    response.send(`Number of visits is ${visits}`);
    client.set('visits', parseInt(visits) + 1);
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
