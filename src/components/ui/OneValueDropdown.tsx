import { useONEExchangeRate } from "../../hooks/useONEExchangeRate";
import { getNearestPriceForTimestamp } from "src/components/ONE_USDT_Rate";
import { Text, Box, Tip } from "grommet";
import { TipContent } from "./Tooltip";
import React from "react";
import dayjs from "dayjs";
import { formatNumber } from "./utils";
import { Dropdown } from "../dropdown/Dropdown";
import { useThemeMode } from "src/hooks/themeSwitcherHook";

interface ONEValueProps {
  value: (string | number)[];
  timestamp?: string;
  hideTip?: boolean;
}

// @ts-ignore
export const ONEValueDropdown = (props: ONEValueProps) => {
  const { value, timestamp = "", hideTip = false } = props;
  const { lastPrice } = useONEExchangeRate();
  const themeMode = useThemeMode();

  if (!value.length) {
    return null;
  }

  const isTodayTransaction =
    dayjs(timestamp).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  const price =
    timestamp && !isTodayTransaction
      ? getNearestPriceForTimestamp(timestamp)
      : lastPrice;

  const normilizedValue: {
    value: string | number;
    one: number;
    usd: string | number;
    index: number;
  }[] = value.map((hashValue, index) => {
    const bi = BigInt(hashValue) / BigInt(10 ** 14);
    const v = parseInt(bi.toString()) / 10000;
    let USDValue = 0;
    if (price && v > 0) {
      USDValue = v * +price;
    }

    return { value: hashValue, one: v, usd: USDValue || 0, index };
  });

  console.log(normilizedValue);

  return (
    <Dropdown
      items={normilizedValue}
      keyField={"value"}
      themeMode={themeMode}
      itemHeight={"30px"}
      renderValue={() => (
        <Box direction={"row"}>
          <Text size={"small"}>
            {normilizedValue.reduce((prev, cur) => {
              prev += cur.one;
              return prev;
            }, 0)}{" "}
            ONE
          </Text>
          <Text size={"small"} style={{ paddingLeft: "4px" }}>
            ($
            {normilizedValue
              .reduce((prev, cur) => {
                prev += +cur.usd;
                return prev;
              }, 0)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: "USD",
              })}{" "}
            )
          </Text>
        </Box>
      )}
      renderItem={(item) => (
        <Box direction={"row"}>
          <Text size={"small"}>Shard {item.index}: </Text>
          <Text size={"small"} style={{ paddingLeft: "4px" }}>
            {item.one} ONE{" "}
          </Text>
          {item.usd ? (
            <Text size={"small"} style={{ paddingLeft: "4px" }}>
              (${item.usd})
            </Text>
          ) : null}
        </Box>
      )}
    />
  );
};
