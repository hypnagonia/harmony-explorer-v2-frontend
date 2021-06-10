import { Box, Spinner } from "grommet";
import { Image } from "grommet-icons";
import React, { useState } from "react";
import styled from "styled-components";

export interface IERC1155IconProps {
  imageUrl?: string;
}

const Loader = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  background: ${(props) => props.theme.backgroundBack};
`;

const InventImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const ErrorPreview = styled(Box)`
  width: 45px;
  height: 45px;

  border-radius: 8px;
`;

const EmptyImage = styled(Box)`
  width: 45px;
  height: 45px;

  border-radius: 8px;
`;

export function ERC1155Icon(props: IERC1155IconProps) {
  const [isLoading, setIsLoading] = useState(!!props.imageUrl);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  const url = props.imageUrl
    ? `${process.env.REACT_APP_INDEXER_IPFS_GATEWAY}${props.imageUrl}`
    : "";

  return (
    <>
      {isLoading ? (
        <Loader>
          <Box align={"center"} justify={"center"} flex height={"100%"}>
            <Spinner />
          </Box>
        </Loader>
      ) : null}
      {isErrorLoading ? (
        <ErrorPreview direction={"column"} justify={"center"} align={"center"}>
          <Image size={"large"} style={{ marginBottom: "10px" }} />
        </ErrorPreview>
      ) : url ? (
        <InventImg
          src={url}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsErrorLoading(true);
          }}
        />
      ) : (
        <EmptyImage direction={"column"} justify={"center"} align={"center"}>
          <Image size={"large"} style={{ marginBottom: "10px" }} />
        </EmptyImage>
      )}
    </>
  );
}
