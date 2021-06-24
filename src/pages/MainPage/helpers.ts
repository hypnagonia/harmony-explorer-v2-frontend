import { Block } from "src/types";

export const calculateSecondPerBlocks = (blocks: Block[]): number => {
  const blocksTimestamp = blocks
    .map((b) => new Date(b.timestamp).getTime())
    .sort((a, b) => (a < b ? -1 : 1));

  console.log(blocksTimestamp, blocks);

  const diffs = [];

  for (let i = blocksTimestamp.length - 1; i > 0; i--) {
    diffs.push(blocksTimestamp[i] - blocksTimestamp[i - 1]);
  }

  return diffs.reduce((acc, t) => acc + t, 0) / diffs.length / 1000;
};
