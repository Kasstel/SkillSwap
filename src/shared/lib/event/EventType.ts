export const EventType = {
  updateUser: "updateUser",
  updateLikedUser: "updateLikedUser",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];
