// Local
export const baseURL = "http://localhost:8000/api";
export const imageURL = "http://localhost:8000";
// Server
// export const baseURL = "https://api.shweyokelayexpress.com/api";
// export const imageURL = "https://api.shweyokelayexpress.com";

export const endpoints = {
  dashboard: "dashboard",
  login: "auth/loginn",
  register: "auth/register",
  counter: "counters",
  user: "user",
  vehiclesType: "vehiclesTypes",
  member: "member",
  agent: "member",
  paymentHistory: "paymentHistory",
  routes: "route",
  role: "role",
  permission: "permission",
  changepassword: "change-password",
  profile: "profile",
  image: `${imageURL}`,
};
