export const USER_ROLE = ["USER", "ADMIN"] as const;

export type TUSER_ROLE = (typeof USER_ROLE)[number];
