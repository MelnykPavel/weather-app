import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export const HourSelector = ({ setCurrentData, hours }) => {
  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => {
    if (hours.length) {
      setCurrentData(hours[0].item);
      setSelectedHour(hours[0].hour);
    }
  }, [hours, setCurrentData, setSelectedHour]);

  const handleOnChangeHours = (hour, item) => {
    setSelectedHour(hour);
    setCurrentData(item);
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
