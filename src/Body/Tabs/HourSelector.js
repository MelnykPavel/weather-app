import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { setForecastSelectedData } from "../../Services/stateService";

export const HourSelector = ({ setCurrentData, hours }) => {
  const [selectedHour, setSelectedHour] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    if (hours.length) {
      dispatch(setForecastSelectedData(hours[0].item));
      setSelectedHour(hours[0].hour);
    }
  }, [hours, dispatch, setSelectedHour]);

  const handleOnChangeHours = (hour, item) => {
    setSelectedHour(hour);
    dispatch(setForecastSelectedData(item));
  };

  return (
    <ButtonGroup className="w-100 mb-3">
      {hours.map(({ hour, item }, idx) => (
        <ToggleButton
          key={idx}
          id={`hour-${idx}`}
          type="radio"
          variant="outline-primary"
          name="hour"
          value={hour}
          checked={hour === selectedHour}
          onChange={() => handleOnChangeHours(hour, item)}
        >
          {hour}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};
