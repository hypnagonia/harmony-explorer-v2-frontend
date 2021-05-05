import React from "react";
import { Clock } from "grommet-icons";
import dayjs from "dayjs";

// @ts-ignore
export const Timestamp = ({ timestamp }) => {
  return (
    <span>
      <Clock size="small" />
      &nbsp;{dayjs(timestamp).format("YYYY-MM-DD, HH:mm:ss")}
    </span>
  );
};
