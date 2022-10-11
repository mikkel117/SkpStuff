import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import moment from "moment";

type UserChangeMonthProps = {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  isChangeMonth: boolean;
  setIsChangeMonth: Dispatch<SetStateAction<boolean>>;
};

export default function UserChangeMonth({
  month,
  setMonth,
  isChangeMonth,
  setIsChangeMonth,
}: UserChangeMonthProps) {
  const [months, setMonths] = useState(moment.monthsShort());
  useEffect(() => {
    console.log(months);
  }, []);

  return (
    <div className='test'>
      {months.map((month) => {
        return <p key={month}>{month}</p>;
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
