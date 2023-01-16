import { useEffect, useCallback } from "react";
import { Data } from "./Data";
import moment from "moment";
import { DaySelector } from "./DaySelector";

export function TimeSelector({ data, currentData, setCurrentData }) {
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
    if (data) {
      setCurrentData({
        ...data.list[0],
        coord: data.city.coord,
      });
    }
  }, [data, getCurrentData, setCurrentData]);

  return (
    <>
      <DaySelector
        setCurrentData={setCurrentData}
        data={data}
        getCurrentData={getCurrentData}
      />
      <Data data={currentData} />
    </>
  );
}
