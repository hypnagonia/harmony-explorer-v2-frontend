import React from "react";
import { Configure } from "grommet-icons";
import { Box, Text, DropButton } from "grommet";
import styled from "styled-components";
import {
  useThemeMode,
  setThemeMode,
  themeType,
} from "src/hooks/themeSwitcherHook";

export function ConfigureButton() {
  const theme = useThemeMode();

  return (
    <DropButton
      label={<Configure size="medium" />}
      dropAlign={{ top: "bottom", right: "right" }}
      dropContent={
        <Box
          pad="medium"
          background="background"
          border={{ size: "xsmall", color: "border" }}
          style={{ borderRadius: "0px" }}
        >
          <Text size="small" weight="bold" margin={{ bottom: 'xsmall' }}>Theme</Text>
          <ToggleButton
            value={theme}
            options={[
              { text: "Light", value: "light" },
              { text: "Dark", value: "dark" },
            ]}
            onChange={setThemeMode}
          />
        </Box>
      }
      style={{ border: "none", boxShadow: "none", paddingRight: '6px' }}
    />
  );
}

interface ToggleProps {
  value: string;
  options: Array<{
    text: string;
    value: themeType;
  }>;
  onChange: (value: themeType) => void;
}

//@ts-ignore
const ToggleButton = (props: ToggleProps) => {
  const { options, value, onChange } = props;

  return (
    <Box
      direction="row"
      background="transparent"
      border={{ size: "xsmall", color: "border" }}
      style={{ overflow: "hidden", borderRadius: "8px" }}
    >
      {options.map((i) => (
        <SwitchButton
          selected={i.value === value}
          onClick={() => onChange(i.value)}
          key={i.value}
        >
          {i.text}
        </SwitchButton>
      ))}
    </Box>
  );
};

const SwitchButton = styled.div<{ selected: boolean }>`
  padding: 8px 20px;
  background-color: ${(props) =>
    props.selected ? props.theme.global.colors.brand : "transparent"};
  color: ${(props) =>
    props.selected
      ? props.theme.global.colors.background
      : props.theme.global.colors.brand};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  user-select: none;
  outline: none;
  cursor: ${(props) => (props.selected ? "auto" : "pointer" )}
`;
