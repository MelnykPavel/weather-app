import { useEffect, useState, useCallback } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Data } from "./Data";
import moment from "moment";

export function TimeSelector({ data, currentData, setCurrentData }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);

  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  const getCurrentData = useCallback(
    (cbFn) => {
      data?.list.forEach((item) => {
        const timestamp = item.dt;
        const momentDate = moment.unix(timestamp);

        const day = momentDate.format("DD");
        const hour = momentDate.format("HH:mm");

        cbFn(item, day, hour);
      });
    },
    [data]
  );

  useEffect(() => {
    const days = [];
    const hours = [];

    getCurrentData((item, day, hour) => {
      if (!days.includes(day)) {
        days.push(day);
      }
      if (!hours.includes(hour)) {
        hours.push(hour);
      }
    });

    setDays(days);
    setHours(hours.sort());
    setSelectedDay(days[0]);

    //При первом заходе на сайт и в таб Forecast то первое выбранное время может быть со статусом disabled. Нужно чтобы выбрана была первое активное время и информация актуальная.
    setSelectedHour(hours.find((hour) => !checkDatePast(days, hour)));

    if (data) {
      setCurrentData({
        ...data.list.find(
          (obj) =>
            obj.dt ===
            moment(
              `${days[0]} ${hours.find((hour) => !checkDatePast(days, hour))}`,
              "DD HH:mm"
            ).unix()
        ),
        coord: data.city.coord,
      });
    }
  }, [data, getCurrentData, setCurrentData]);

  const handleOnChangeDays = (event) => {
    setSelectedDay(event.currentTarget.value);

    getCurrentData((item, day, hour) => {
      if (event.currentTarget.value === days[0]) {
        const firstActiveHour = hours.find(
          (hour) => !checkDatePast(days, hour)
        );

        if (event.currentTarget.value === day && firstActiveHour === hour) {
          console.log(`firstActiveHour`, firstActiveHour);
          setSelectedHour(firstActiveHour);
          setCurrentData({ ...item, coord: data.city.coord });
        }
      } else {
        if (event.currentTarget.value === day && selectedHour === hour) {
          setCurrentData({ ...item, coord: data.city.coord });
        }
      }
    });
  };
  const handleOnChangeHours = (event) => {
    setSelectedHour(event.currentTarget.value);

    getCurrentData((item, day, hour) => {
      if (selectedDay === day && event.currentTarget.value === hour) {
        setCurrentData({ ...item, coord: data.city.coord });
      }
    });
  };

  const checkDatePast = (day, hour) =>
    moment().unix() > moment(`${day[0]} ${hour}`, "DD HH:mm").unix();

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
            checked={day === selectedDay}
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
            variant="outline-primary"
            name="hour"
            value={hour}
            checked={hour === selectedHour}
            onChange={handleOnChangeHours}
            disabled={
              (checkDatePast(days, hour) && selectedDay === days[0]) ||
              (!checkDatePast(days, hour) &&
                selectedDay === days[days.length - 1])
            }
          >
            {hour}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Data data={currentData} />
    </>
  );
}
