export const Query = {
  //-- event
  events: (_, __, { db }) => db.events,
  event: (_, args, { db }) => {
    const idExists = db.events.find((event) => event.id === args.id);
    return idExists ? idExists : new Error("EVENT ID NOT FOUND");
  },

  //-- location
  locations: (_, __, { db }) => db.locations,
  location: (_, args, { db }) => {
    const idExists = db.locations.find((location) => location.id === args.id);
    return idExists ? idExists : new Error("LOCATION ID NOT FOUND");
  },

  //-- user
  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) => {
    const idExists = db.users.find((user) => user.id === args.id);
    return idExists ? idExists : new Error("USER ID NOT FOUND");
  },

  //-- participant
  participants: (_, __, { db }) => db.participants,
  participant: (_, args, { db }) => {
    const idExists = db.participants.find(
      (participant) => participant.id === args.id
    );
    return idExists ? idExists : new Error("PARTICIPANT ID NOT FOUND");
  },
};
