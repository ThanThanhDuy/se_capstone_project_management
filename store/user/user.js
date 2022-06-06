import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null
});

export const userAuthState = atom({
  key: "userAuthState",
  default: {
    roles: [2],
    user: {
      name: "thanh duy"
    }
  }
});
