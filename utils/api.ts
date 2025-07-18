// utils/api.ts
import axios from "axios";
import { apiPath } from "./apipath";

export const fetchCollegeList = async () => {
  try {
    const response = await axios.get(`${apiPath}/api/colleges`, {
      headers: { "Cache-Control": "no-store" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch college data:", error);
    throw error; // re-throw so caller can handle it
  }
};
