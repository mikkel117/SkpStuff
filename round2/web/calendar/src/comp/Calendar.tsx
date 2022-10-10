import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/da";
import { DaysOfWeek } from "./model/Models";

function BuildAMonth() {
  let Month: number = moment().month();

  let Year: number = moment().year();
  let daysInWeek: DaysOfWeek[] = [];
  let daysInMonth: number = moment([Year, Month]).daysInMonth();
  console.log(daysInMonth);
}

const Calendar: React.FC = () => {
  /* const GetDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  }; */
  useEffect(() => {
    BuildAMonth();
  }, []);

  useEffect(() => {
    moment.locale("da");
    console.log(moment().format("M"));
    console.log(moment().format("D"));
    console.log(moment().format("Y"));
  }, []);

  return (
    <>
      <p></p>
    </>
  );
};
export default Calendar;
