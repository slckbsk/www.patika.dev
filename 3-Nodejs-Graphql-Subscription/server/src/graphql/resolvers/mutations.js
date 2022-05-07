import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 3);

export const Mutation = {
  //-- EVENT
  createEvent: (_, { data }, { pubSub, db }) => {
    const event = {
      id: nanoid(),
      ...data,
    };

    db.events.push(event);
    pubSub.publish("eventCreated", { eventCreated: event });
    return event;
  },

  updateEvent: (_, { id, data }, { db }) => {
    const event_index = db.events.findIndex((event) => event.id === id);

    const updated_event = (db.events[event_index] = {
      ...db.events[event_index],
      ...data,
    });

    return event_index === -1 ? new Error("EVENT ID NOT FOUND") : updated_event;
  },

  deleteEvent: (_, { id }, { db }) => {
    const event_index = db.events.findIndex((event) => event.id === id);

    const deleted_event = db.events[event_index];
    db.events.splice(event_index, 1);

    return event_index === -1 ? new Error("EVENT ID NOT FOUND") : deleted_event;
  },

  deleteAllEvents: (_, __, { db }) => {
    const length = db.events.length;
    db.events.splice(0, length);
    return { count: length };
  },

  //-- LOCATION
  createLocation: (_, { data }, { db }) => {
    const location = {
      id: nanoid(),
      ...data,
    };

    db.locations.push(location);
    return location;
  },

  updateLocation: (_, { id, data }, { db }) => {
    const location_index = db.locations.findIndex(
      (location) => location.id === id
    );

    const updated_location = (db.locations[location_index] = {
      ...db.locations[location_index],
      ...data,
    });

    return location_index === -1
      ? new Error("LOCATION ID NOT FOUND")
      : updated_location;
  },

  deleteLocation: (_, { id }, { db }) => {
    const location_index = db.locations.findIndex(
      (location) => location.id === id
    );

    const deleted_location = db.locations[location_index];
    db.locations.splice(location_index, 1);

    return location_index === -1
      ? new Error("LOCATION ID NOT FOUND")
      : deleted_location;
  },

  deleteAllLocations: (_, __, { db }) => {
    const length = db.locations.length;
    db.locations.splice(0, length);
    return { count: length };
  },

  //-- USER
  createUser: (_, { data }, { pubSub, db }) => {
    const user = {
      id: nanoid(),
      ...data,
    };

    db.users.push(user);
    pubSub.publish("userCreated", { userCreated: user });
    return user;
  },

  updateUser: (_, { id, data }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);

    const updated_user = (db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    });

    return user_index === -1 ? new Error("USER ID NOT FOUND") : updated_user;
  },

  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);

    const deleted_user = db.users[user_index];
    db.users.splice(user_index, 1);

    return user_index === -1 ? new Error("USER ID NOT FOUND") : deleted_user;
  },

  deleteAllUsers: (_, __, { db }) => {
    const length = db.users.length;
    db.users.splice(0, length);
    return { count: length };
  },

  //-- PARTICIPANT
  createParticipant: (_, { data }, { pubSub, db }) => {
    const participant = {
      id: nanoid(),
      ...data,
    };

    db.participants.push(participant);
    pubSub.publish("participantAdded", { participantAdded: participant });
    return participant;
  },

  updateParticipant: (_, { id, data }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id === id
    );

    const updated_participant = (db.participants[participant_index] = {
      ...db.participants[participant_index],
      ...data,
    });

    return participant_index === -1
      ? new Error("PARTICIPANT ID NOT FOUND")
      : updated_participant;
  },

  deleteParticipant: (_, { id }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id === id
    );

    const deleted_participant = db.participants[participant_index];
    db.participants.splice(participant_index, 1);

    return participant_index === -1
      ? new Error("PARTICIPANT ID NOT FOUND")
      : deleted_participant;
  },

  deleteAllParticipants: (_, __, { db }) => {
    const length = db.participants.length;
    db.participants.splice(0, length);
    return { count: length };
  },
};
