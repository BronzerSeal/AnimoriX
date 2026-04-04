import axios from "axios";

export const anilistClient = axios.create({
  baseURL: "https://graphql.anilist.co",
  headers: {
    "Content-Type": "application/json",
  },
});
