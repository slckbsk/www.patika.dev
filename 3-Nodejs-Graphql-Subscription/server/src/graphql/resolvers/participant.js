export const Participant= {
    users: (parent, __, { db }) => db.users.filter((user) => user.id === parent.user_id),
  };


