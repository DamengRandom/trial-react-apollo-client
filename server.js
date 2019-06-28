const express = require("express");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schema");
const cors = require("cors");

const app = express();

// allow cors
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is up ..");
});
