import React, { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import BuildAmonth from "./BuildAmonth";
import { DaysOfWeek } from "./model/Models";

type UserChangeMonthProps = {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  isChangeMonth: boolean;
  setIsChangeMonth: Dispatch<SetStateAction<boolean>>;
  year: number;
  setDays: Dispatch<SetStateAction<DaysOfWeek[]>>;
};

export default function UserChangeMonth({
  month,
  setMonth,
  isChangeMonth,
  setIsChangeMonth,
  year,
  setDays,
}: UserChangeMonthProps) {
  const [months] = useState(moment.months());

  const ChangeMonth = (month: string) => {
    let monthToInt: number = parseInt(moment().month(month).format("M"));
    setMonth(monthToInt - 1);
    setDays(BuildAmonth(monthToInt - 1, year));
    setIsChangeMonth(!isChangeMonth);
  };

  return (
    <div className='UserChangeMonthYear'>
      {months.map((month) => {
        return (
          <p key={month} onClick={() => ChangeMonth(month)}>
            {month}
          </p>
        );
      })}
      <button
        onClick={() => {
          setIsChangeMonth(!isChangeMonth);
        }}>
        x
      </button>
    </div>
  );
}
