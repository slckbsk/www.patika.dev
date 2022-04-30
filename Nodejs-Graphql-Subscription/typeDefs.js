const { gql } = require("apollo-server-express");

const typeDefs = gql`

#--EVENT
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

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: Int
    user_id: Int
  }


  #--LOCATION
  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  #--USER
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }


  #--PARTIPICANT
  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
    users: [User!]!
  }

  input CreateParticipantInput {
    user_id: Int!
    event_id: Int!
  }

  input UpdateParticipantInput {
    user_id: Int
    event_id: Int
  }

  #--ALL 
  type DeleteAllOutPut{
    count: Int!
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

  type Mutation {
    #--EVENT
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: Int!, data: UpdateEventInput!): Event!
    deleteEvent(id: Int!): Event!
    deleteAllEvents: DeleteAllOutPut!

    #--LOCATION
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: Int!, data: UpdateLocationInput!): Location!
    deleteLocation(id: Int!): Location!
    deleteAllLocations: DeleteAllOutPut!

    #--USER
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
    deleteAllUsers: DeleteAllOutPut!

    #--PARTICIPANT
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: Int!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: Int!): Participant!
    deleteAllParticipants: DeleteAllOutPut!
  }

  type Subscription {
    userCreated: User!
    eventCreated: Event!
    participantAdded(event_id: Int): Participant!
  }

`;

module.exports = {
  typeDefs,
};
