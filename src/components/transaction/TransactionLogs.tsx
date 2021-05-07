import React from "react";
import { Box, Text } from "grommet";

import { Address } from "src/components/ui";

interface TransactionLogsProps {
  logs: any[];
  hash: string;
}

export function TransactionLogs(props: TransactionLogsProps) {
  const { logs, hash } = props;

  if (!logs.length) {
    return (
      <Box style={{ height: "120px" }} justify="center" align="center">
        <Text size="small">
          No Logs for <b>{hash}</b>
        </Text>
      </Box>
    );
  }

  return (
    <Box margin={{ top: "medium" }}>
      {logs
        .sort((a, b) => a.logIndex - b.logIndex)
        .map((log, i) => (
          <LogItem key={i} log={log} />
        ))}
    </Box>
  );
}

interface LogItemProps {
  log: {
    address: string;
    topics: string[];
    data: string;
  };
}

const LogItem = (props: LogItemProps) => {
  const { address, topics, data } = props.log;

  return (
    <Box
      gap="small"
      border={{ size: "xsmall", side: "bottom", color: "border" }}
      pad={{ bottom: "small", top: "medium" }}
    >
      <Box>
        <Text color="minorText" size="small">
          Address
        </Text>
        <Text size="small" color="brand">
          <Address address={address} />
        </Text>
      </Box>
      <Box>
        <Text color="minorText" size="small">
          Topics
        </Text>
        <Text size="small" color="brand">
          {topics.join(", ")}
        </Text>
      </Box>
      <Box>
        <Text color="minorText" size="small">
          Data
        </Text>
        <Text size="small" color="brand">
          {data}
        </Text>
      </Box>
    </Box>
  );
};
