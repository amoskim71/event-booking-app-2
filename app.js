const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const {
  buildSchema
} = require("graphql");
const mongoose = require('mongoose');

const events = [];

const app = express();

app.use(bodyParser.json());

app.use(
  "/api",
  graphqlHttp({
    schema: buildSchema(`
    type Event {
      id: ID!
      title: String!
      description: String!
      price: Float!
      date: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString()
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-w90yh.mongodb.net/test?retryWrites=true`)
  .then(() => {
    app.listen(3000);
  }).catch(err => {
    console.log(err);
  })