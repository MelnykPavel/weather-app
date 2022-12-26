import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export function TimeSelector(props) {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "00:00", value: "1" },
    { name: "03:00", value: "2" },
    { name: "06:00", value: "3" },
    { name: "09:00", value: "4" },
    { name: "12:00", value: "5" },
    { name: "15:00", value: "6" },
    { name: "18:00", value: "7" },
    { name: "21:00", value: "8" },
  ];

  return (
    <ButtonGroup className="w-100">
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`${props.id}-${idx}`}
          type="radio"
          variant={"outline-primary"}
          name={props.id}
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
