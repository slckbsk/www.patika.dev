const { events, locations, users, participants } = require("./data");

const resolvers = {
  Query: {
    events: () => events,
    event: (parent, args) => {
      const idExists = events.find((event) => event.id === args.id);
      return idExists ? idExists : new Error("Event ID Eşleşmedi");
    },

    locations: () => locations,
    location: (parent, args) => {
      const idExists = locations.find((location) => location.id === args.id);
      return idExists ? idExists : new Error("Location ID Eşleşmedi");
    },

    users: () => users,
    user: (parent, args) => {
      const idExists = users.find((user) => user.id === args.id);
      return idExists ? idExists : new Error("User ID Eşleşmedi");
    },

    participants: () => participants,
    participant: (parent, args) => {
      const idExists = participants.find(
        (participant) => participant.id === args.id
      );
      return idExists ? idExists : new Error("Participant ID Eşleşmedi");
    },
  },

  
  Event: {
    // Bir Event, bir User ile ilişkili olmalıdır.
    user: (parent, args) => users.find((user) => user.id === parent.user_id),

    //  Bir Event birden fazla Participant ile ilişkili olmalıdır.
    participants: (parent, args) =>
      participants.filter((participant) => participant.event_id === parent.id),

    //Bir Event, bir Location ile ilişkili olmalıdır.
    locations: (parent, args) =>
      locations.find((location) => location.id === parent.location_id),
  },

  User: {
    // Bir User'a ait bir veya birden fazla Event olabilir.
    events: (parent, args) =>
      events.filter((event) => event.user_id === parent.id),
  },

  Participant: {
    // ödevde istenilen sorguda participants altında username var ????!!!!!
    // bende participants dan user'ların isimleride alınabilsin diye ekledim
    users: (parent, args) => users.filter((user) => user.id === parent.user_id),
  },
};

module.exports = {
  resolvers,
};
