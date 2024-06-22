// guestData.js
import axios from "axios";

let guestData = [];

export const fetchGuestData = async () => {
  try {
    const response = await axios.get("/api/guests");
    guestData = response.data;
    return guestData;
  } catch (error) {
    console.error("There was an error fetching the guests!", error);
    return [];
  }
};

export const getGuestData = () => {
  return guestData;
};
