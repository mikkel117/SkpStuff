import React from "react";
import { DaysOfWeek } from "./model/Models";
import moment from "moment";

export default function BuildAmonth(
  month?: number,
  year?: number
): DaysOfWeek[] {
  let Month: number = month || moment().month();

  let Year: number = year || moment().year();
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
