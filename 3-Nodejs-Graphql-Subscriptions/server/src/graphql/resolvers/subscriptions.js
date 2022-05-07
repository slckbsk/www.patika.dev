import pubSub from "../../pubsub";
import { withFilter } from "graphql-subscriptions";

export const Subscription = {
    userCreated: {
      subscribe: () => pubSub.asyncIterator("userCreated"),
    },
    eventCreated: {
      subscribe: () => pubSub.asyncIterator("eventCreated"),
    },

    participantAdded: {
      subscribe: withFilter(
        () => pubSub.asyncIterator("participantAdded"),
        (payload, variables) => {
          console.log("payload", payload);
          console.log("variables", variables);
          return variables.event_id
            ? payload.participantAdded.event_id === variables.event_id
            : true;
        }
      ),
    },
 


  };