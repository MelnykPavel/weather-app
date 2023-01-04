import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Data } from "./Data";
import moment from "moment";

export function TimeSelector({ data }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);

  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  const [currentData, setCurrentData] = useState(null);

  const convertDateFormat = (callback) => {
    data?.list.forEach((item) => {
      const timestamp = item.dt;
      const momentDate = moment.unix(timestamp);

      const day = momentDate.format("DD");
      const hour = momentDate.format("HH:MM");

      callback(day, hour, item);
    });
  };

  const getCurrentData = (day, hour, item) => {
    if (selectedDay === day && selectedHour === hour) {
      setCurrentData(item);
    }
  };

  useEffect(() => {
    const days = [];
    const hours = [];

    const fillDaysAndHours = (day, hour) => {
      if (!days.includes(day)) {
        days.push(day);
      }
      if (!hours.includes(hour)) {
        hours.push(hour);
      }
    };
    convertDateFormat(fillDaysAndHours);
    setDays(days);
    setHours(hours);
    setSelectedDay(days);
    setSelectedHour(hours);

    if (data) {
      setCurrentData(data.list[0]);
    }
  }, [data]);

  const handleOnChangeDays = (event) => {
    setSelectedDay(event.currentTarget.value);
    convertDateFormat(getCurrentData);
  };
  const handleOnChangeHours = (event) => {
    setSelectedHour(event.currentTarget.value);
    convertDateFormat(getCurrentData);
  };
  return (
    <>
      <ButtonGroup className="w-100">
        {days.map((day, idx) => (
          <ToggleButton
            key={idx}
            id={`day-${idx}`}
            type="radio"
            variant="outline-primary"
            name="day"
            value={day}
            checked={selectedDay === day}
            onChange={handleOnChangeDays}
          >
            {day}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ButtonGroup className="w-100">
        {hours.map((hour, idx) => (
          <ToggleButton
            key={idx}
            id={`hour-${idx}`}
            type="radio"
            variant={"outline-primary"}
            name="hour"
            value={hour}
            checked={selectedHour === hour}
            onChange={handleOnChangeHours}
          >
            {hour}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Data data={currentData} />
    </>
  );
}
