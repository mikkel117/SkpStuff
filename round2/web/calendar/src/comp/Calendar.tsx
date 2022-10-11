import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/da";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { DaysOfWeek, WEEKDAYS } from "./model/Models";
import BuildAmonth from "./BuildAmonth";
import ClassNameChange from "./ClassNameChange";

const Calendar: React.FC = () => {
  const [days, setDays] = useState<DaysOfWeek[]>([]);
  const [month, setMonth] = useState<number>(moment().month());
  const [year, setYear] = useState<number>(moment().year());
  const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
  const [isChangeMonth, setIsChangeMonth] = useState<boolean>(false);
  useEffect(() => {
    setDays(BuildAmonth());
  }, []);
  /* useEffect(() => {
    let Test = document.querySelector(".Calendar");

    console.log(Test);
  }, []); */

  const PrevMonth = () => {
    let _month: number = month;
    let _year: number = year;

    if (month === 0) {
      _month = 11;
      _year = year - 1;
      setMonth(_month);
      setYear(_year);
      setDays(BuildAmonth(_month, _year));
    } else {
      _month = month - 1;
      setMonth(_month);
      setDays(BuildAmonth(_month, _year));
    }
  };

  const NextMonth = () => {
    let _month: number = month;
    let _year: number = year;
    if (month === 11) {
      _month = 0;
      _year = year + 1;
      setMonth(_month);
      setYear(_year);
      setDays(BuildAmonth(_month, _year));
    } else {
      _month = month + 1;
      setDays(BuildAmonth(_month, _year));
      setMonth(_month);
    }
  };

  const ChosenAMonth = () => {
    console.log("ChosenAMonth");
  };

  return (
    <>
      <section className='calendarWrapper'>
        <div className='calendarInfo'>
          <AiOutlineArrowLeft
            className='arrowLeft'
            onClick={() => PrevMonth()}
          />
          <span>
            <h1>{moment().year(year).format("YYYY")}</h1> <br />
            <h3
              onClick={() => {
                ChosenAMonth();
              }}>
              {" "}
              {moment().month(month).format("MMMM")}
            </h3>
          </span>
          <AiOutlineArrowRight
            className='arrowRight'
            onClick={() => NextMonth()}
          />
        </div>
        <div className='Calendar' id='calendarTest'>
          {WEEKDAYS.map((weekday, index) => {
            return (
              <div className={"weekday " + weekday.class} key={index}>
                <span>{weekday.day}</span>
              </div>
            );
          })}
          {days.map((day) => {
            let _className: string[] = ClassNameChange(day);

            return (
              <div
                className={
                  "day" +
                  " " +
                  _className[0] +
                  " " +
                  _className[1] +
                  " " +
                  moment(day.date).format("DD")
                }
                key={day.id}>
                <span>{day.date.date()}</span>
                {moment(day.date).format("DD") === "11" &&
                moment(day.date).format("MMMM") === "oktober" &&
                moment(day.date).format("YYYY") === "2022" ? (
                  <div className='event'>event</div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Calendar;
