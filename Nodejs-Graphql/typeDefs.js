const { gql } = require("apollo-server");


const typeDefs = gql`
  type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!

    user: User!
    participants: [Participant!]!
    locations: Location!
  }

  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
    users: [User!]!
  }

  type Query {
    events: [Event!]!
    event(id: Int!): Event!

    locations: [Location!]!
    location(id: Int!): Location!

    users: [User!]!
    user(id: Int!): User!

    participants: [Participant!]!
    participant(id: Int!): Participant!
  }
`;

module.exports ={
    typeDefs
  }
