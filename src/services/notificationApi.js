import axios from "axios";

export const fetchNotifications = (userName) => {
  return axios.get(`/api/notifications/${userName}`);
};