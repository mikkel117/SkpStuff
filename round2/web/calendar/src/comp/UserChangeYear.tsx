import React, { Dispatch, SetStateAction, useState } from "react";
import BuildAmonth from "./BuildAmonth";
import { DaysOfWeek } from "./model/Models";

type UserChangeMonthYearProps = {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setDays: Dispatch<SetStateAction<DaysOfWeek[]>>;
  isChangeYear: boolean;
  setIsChangeYear: Dispatch<SetStateAction<boolean>>;
};

export default function UserChangeYear({
  month,
  year,
  setYear,
  setDays,
  isChangeYear,
  setIsChangeYear,
}: UserChangeMonthYearProps) {
  const [_year, _setYear] = useState<string>(year.toString());
  const [formError, setFormError] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (_year.length === 0) {
      setFormError(true);
    } else if (_year.length > 5) {
      setFormError(true);
    } else {
      setYear(parseInt(_year));
      setDays(BuildAmonth(month, parseInt(_year)));
      setIsChangeYear(!isChangeYear);
    }
  };
  return (
    <>
      <div className='UserChangeMonthYear'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='changeYear'>year: </label>
          <input
            type='number'
            className='changeYear'
            value={_year}
            onChange={(e) => _setYear(e.target.value)}
          />
          <input type='submit' />
        </form>
        {formError ? (
          <div className='fromErrorMsg'>Please write a validt year</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
