import React, { useEffect, useState } from "react";
import { Box, Text } from "grommet";
import { Button } from "src/components/ui";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "src/Responive/breakpoints";
import { BaseContainer, BasePage } from "src/components/ui";
import { Metrics } from "src/components/metrics";
import { LatestBlocksTable } from "./LatestBlocksTable";
import { LatestTransactionsTable } from "./LatestTransactionsTable";
import { Block } from "src/types";
import { getBlocks } from "src/api/client";
import { calculateSecondPerBlocks } from "./helpers";

const filter = {
  offset: 0,
  limit: 10,
  orderBy: "number",
  orderDirection: "desc",
  value: 0,
  filters: [],
};

export function MainPage() {
  const history = useHistory();
  const isLessDesktop = useMediaQuery({ maxDeviceWidth: breakpoints.desktop });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockLatency, setBlockLatency] = useState<number>(2.01);
  const availableShards = (process.env
    .REACT_APP_AVAILABLE_SHARDS as string).split(",");

  useEffect(() => {
    let tId = 0 as any;
    const exec = async () => {
      try {
        let blocks = await Promise.all(
          availableShards.map((shardNumber) =>
            getBlocks([+shardNumber, filter])
          )
        );

        const blocksList = blocks.reduce((prev, cur, index) => {
          prev = [
            ...prev,
            ...cur.map((item) => ({
              ...item,
              shardNumber: +availableShards[index],
            })),
          ];
          return prev;
        }, []);

        setBlocks(
          blocksList
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .slice(0, 10)
        );

        setBlockLatency(calculateSecondPerBlocks(blocksList));
      } catch (err) {
        console.log(err);
      }
    };

    exec();
    tId = window.setInterval(exec, 3000);

    return () => {
      clearTimeout(tId);
    };
  }, []);

  return (
    <BaseContainer pad="0">
      <Metrics latency={blockLatency} />
      <Box direction={isLessDesktop ? "column" : "row"} gap="medium">
        <BasePage style={{ flex: "1 1 100%" }}>
          <Box
            border={{ size: "xsmall", side: "bottom" }}
            pad={{ bottom: "small" }}
            margin={{ bottom: "small" }}
          >
            <Text size="large" weight="bold">
              Latest Blocks
            </Text>
          </Box>

          <LatestBlocksTable blocks={blocks} />
          <Button
            margin={{ top: "medium" }}
            onClick={() => history.push("/blocks")}
          >
            VIEW ALL BLOCKS
          </Button>
        </BasePage>
        <BasePage style={{ flex: "1 1 100%" }}>
          <Box
            border={{ size: "xsmall", side: "bottom" }}
            pad={{ bottom: "small" }}
            margin={{ bottom: "small" }}
          >
            <Text size="large" weight="bold">
              Latest Transactions
            </Text>
          </Box>
          <LatestTransactionsTable />
          <Button
            margin={{ top: "medium" }}
            onClick={() => history.push("/transactions")}
          >
            VIEW ALL TRANSACTIONS
          </Button>
        </BasePage>
      </Box>
    </BaseContainer>
  );
}
