import React, { useEffect, useState } from "react";
import { Text } from "grommet";
import { reintervate } from "src/components/ui/utils";
import RelativeTime from "dayjs/plugin/relativeTime";
import UpdateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";

dayjs.extend(UpdateLocale);
const config = {
  thresholds: [
    { l: "s", r: 3, d: 'second' },
    { l: "ss", r: 59, d: 'second' },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y" },
    { l: "yy", d: "year" },
  ],
};

dayjs.extend(RelativeTime, config);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});



interface IRelativeTimer {
  date: number | string | Date;
  updateInterval?: number;
  render?: (value: string) => React.ReactNode;
}

export function RelativeTimer(props: IRelativeTimer) {
  const { date, render, updateInterval = 1000 } = props;
  useEffect(() => {
    const getTimeOffset = () => {
      setFormattedValue(dayjs().to(dayjs(date)));
    };
    reintervate(getTimeOffset, updateInterval);
  }, []);

  const [formattedValue, setFormattedValue] = useState("");

  if (render) {
    return <div>{render(formattedValue)}</div>;
  }

  return (
    <Text size="small" style={{ minWidth: '125px' }} color="majorText">
      {formattedValue}
    </Text>
  );
}
