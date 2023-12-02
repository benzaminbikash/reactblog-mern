export const baseUrl = "http://localhost:8000/api";
import moment from "moment";
export function formatTimeDifference(createdAt) {
  const timeDifferenceInHours = moment().diff(moment(createdAt), "hours");
  const timeDifferenceInMinutes = moment().diff(moment(createdAt), "minutes");

  if (timeDifferenceInHours >= 24) {
    const days = Math.floor(timeDifferenceInHours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInHours > 0) {
    return `${timeDifferenceInHours} hour${
      timeDifferenceInHours !== 1 ? "s" : ""
    } ago`;
  } else {
    return `${timeDifferenceInMinutes} minute${
      timeDifferenceInMinutes !== 1 ? "s" : ""
    } ago`;
  }
}
