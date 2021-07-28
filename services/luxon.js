import { DateTime } from "luxon";

export const setTimeZone = (dateTime) => DateTime.fromMillis(dateTime).setZone("America/New_York");
export default DateTime;