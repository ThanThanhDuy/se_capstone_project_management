import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null
});

export const userAuthState = atom({
  key: "userAuth",
  default: {
    roles: [1],
    user: {
      name: "thanh duy"
    }
  }
});
