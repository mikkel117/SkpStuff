import { DaysOfWeek } from "./model/Models";
import moment from "moment";

export default function BuildAmonth(
  month?: number,
  year?: number
): DaysOfWeek[] {
  let Month: number;
  let Year: number;
  if (month === undefined) {
    Month = moment().month();
  } else {
    Month = month;
  }
  if (year === undefined) {
    Year = moment().year();
  } else {
    Year = year;
  }
  let daysInWeek: DaysOfWeek[] = [];
  let daysInMonth: number = moment([Year, Month]).daysInMonth();

  for (let i = 0; i < daysInMonth; i++) {
    let day: moment.Moment = moment([Year, Month, i + 1]);

    let days: DaysOfWeek = {
      id: i,
      date: day,
      dayOfWeek: day.format("dddd"),
    };
    daysInWeek.push(days);
  }

  return daysInWeek;
}
