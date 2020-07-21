require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 5001;
console.log(port);

server.listen(port, () => {
  console.log(`Now listening on PORT ${port}`)
});