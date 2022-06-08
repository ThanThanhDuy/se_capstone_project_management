import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null
});

export const userAuthState = atom({
  key: "userAuth",
  default: {}
});
