const { events, locations, users, participants } = require("./data");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 3);

const resolvers = {
  Mutation: {
    //-- EVENT
    createEvent: (parent, { data }) => {
      const event = {
        id: nanoid(),
        ...data,
      };

      events.push(event);
      return event;
    },

    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex((event) => event.id === id);

      const updated_event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });

      return event_index === -1
        ? new Error("EVENT ID NOT FOUND")
        : updated_event;
    },

    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex((event) => event.id === id);

      const deleted_event = events[event_index];
      events.splice(event_index, 1);

      return event_index === -1
        ? new Error("EVENT ID NOT FOUND")
        : deleted_event;
    },

    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);
      return { count: length };
    },

    //-- LOCATION
    createLocation: (parent, { data }) => {
      const location = {
        id: nanoid(),
        ...data,
      };

      locations.push(location);
      return location;
    },

    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id === id
      );

      const updated_location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });

      return location_index === -1
        ? new Error("LOCATION ID NOT FOUND")
        : updated_location;
    },

    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id === id
      );

      const deleted_location = locations[location_index];
      locations.splice(location_index, 1);

      return location_index === -1
        ? new Error("LOCATION ID NOT FOUND")
        : deleted_location;
    },

    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);
      return { count: length };
    },

    //-- USER
    createUser: (parent, { data }) => {
      const user = {
        id: nanoid(),
        ...data,
      };

      users.push(user);
      return user;
    },

    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);

      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });

      return user_index === -1 ? new Error("USER ID NOT FOUND") : updated_user;
    },

    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);

      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return user_index === -1 ? new Error("USER ID NOT FOUND") : deleted_user;
    },

    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);
      return { count: length };
    },

    //-- PARTICIPANT
    createParticipant: (parent, { data }) => {
      const participant = {
        id: nanoid(),
        ...data,
      };

      participants.push(participant);
      return participant;
    },

    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === id
      );

      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });

      return participant_index === -1
        ? new Error("PARTICIPANT ID NOT FOUND")
        : updated_participant;
    },

    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === id
      );

      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);

      return participant_index === -1
        ? new Error("PARTICIPANT ID NOT FOUND")
        : deleted_participant;
    },

    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return { count: length };
    },
  },
  Query: {
    //-- EVENT
    events: () => events,
    event: (parent, args) => {
      const idExists = events.find((event) => event.id === args.id);
      return idExists ? idExists : new Error("EVENT ID NOT FOUND");
    },

    locations: () => locations,
    location: (parent, args) => {
      const idExists = locations.find((location) => location.id === args.id);
      return idExists ? idExists : new Error("LOCATION ID NOT FOUND");
    },

    users: () => users,
    user: (parent, args) => {
      const idExists = users.find((user) => user.id === args.id);
      return idExists ? idExists : new Error("USER ID NOT FOUND");
    },

    participants: () => participants,
    participant: (parent, args) => {
      const idExists = participants.find(
        (participant) => participant.id === args.id
      );
      return idExists ? idExists : new Error("PARTICIPANT ID NOT FOUND");
    },
  },

  Event: {
    // Bir Event, bir User ile ilişkili olmalıdır.
    user: (parent, args) => users.find((user) => user.id === parent.user_id),

    // Bir Event birden fazla Participant ile ilişkili olmalıdır.
    participants: (parent, args) =>
      participants.filter((participant) => participant.event_id === parent.id),

    // Bir Event, bir Location ile ilişkili olmalıdır.
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
