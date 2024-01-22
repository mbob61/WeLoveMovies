const { PORT = 5001 } = process.env;

const knex = require("./db/connection");
const app = require("./app");
const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
