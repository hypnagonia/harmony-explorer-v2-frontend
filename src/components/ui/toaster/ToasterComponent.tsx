import React, { useEffect, useState } from "react";
import { Box } from "grommet";
import { Toaster } from "./Toaster";
import styled from "styled-components";

const Wrapper = styled(Box)` 
`;

const ToasterItem = styled(Box)`
  position: absolute;
  right: 0px;
  bottom: 0px;
  height: 60px;
  width: 300px;
`;

export function ToasterComponent(props: { toaster: Toaster }) {
  const [current, setCurrent] = useState<any>(null);
  useEffect(() => {
    setCurrent(props.toaster.currentSelected);
  }, [props.toaster.currentSelected]);

  console.log(current)
  return (
    <Wrapper>{current ? <ToasterItem>{typeof current === 'function' ? current() : current}</ToasterItem> : null}</Wrapper>
  );
}
