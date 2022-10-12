import { DaysOfWeek } from "./model/Models";
import moment from "moment";

export default function ClassNameChange(day: DaysOfWeek): string[] {
  let _className: string = "";
  let _today: string = "";

  switch (day.dayOfWeek) {
    case "søndag":
      _className = "sunday";
      break;
    case "mandag":
      _className = "monday";
      break;
    case "tirsdag":
      _className = "tuesday";
      break;
    case "onsdag":
      _className = "wednesday";
      break;
    case "torsdag":
      _className = "thursday";
      break;
    case "fredag":
      _className = "friday";
      break;
    case "lørdag":
      _className = "saturday";
      break;
    default:
      break;
  }
  if (day.date.format("DD-MMMM-YYYY") === moment().format("DD-MMMM-YYYY")) {
    _today = "today";
  }
  return [_className, _today];
}
