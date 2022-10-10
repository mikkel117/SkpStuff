import moment from "moment";

export interface DaysOfWeek {
  id: number;
  date: moment.Moment;
  dayOfWeek: string;
}

export const WEEKDAYS = [
  { day: "Ma", class: "monday" },
  { day: "Ti", class: "tuesday" },
  { day: "On", class: "wednesday" },
  { day: "To", class: "thursday" },
  { day: "Fr", class: "friday" },
  { day: "Lø", class: "saturday" },
  { day: "Sø", class: "sunday" },
];
