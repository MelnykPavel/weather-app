import moment from "moment";
import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { HourSelector } from "./HourSelector";

export const DaySelector = ({ setCurrentData, data, getCurrentData }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const firstDay = moment.unix(data?.list[0].dt).format("DD");
    setSelectedDay(firstDay);

    const hours = [];
    const days = [];

    getCurrentData((item, day, hour) => {
      if (!days.includes(day)) {
        days.push(day);
      }
      if (!hours.includes(hour) && day === firstDay) {
        hours.push({ hour, item: { ...item, coord: data.city.coord } });
      }
    });
    setDays(days);
    setHours(hours);
  }, [data, setSelectedDay, getCurrentData]);

  const handleOnChangeDays = (event) => {
    setSelectedDay(event.currentTarget.value);
    const hours = [];

    getCurrentData((item, day, hour) => {
      if (!hours.includes(hour) && day === event.currentTarget.value) {
        hours.push({ hour, item: { ...item, coord: data.city.coord } });
      }
    });

    setHours(hours);
  };
  return (
    <>
      <ButtonGroup className="w-100 mb-3">
        {days.map((day, idx) => (
          <ToggleButton
            key={idx}
            id={`day-${idx}`}
            type="radio"
            variant="outline-primary"
            name="day"
            value={day}
            checked={day === selectedDay}
            onChange={handleOnChangeDays}
          >
            {day}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <HourSelector setCurrentData={setCurrentData} hours={hours} />
    </>
  );
};
