import React, { useState } from "react";

import styled from "styled-components";

import { IUserERC721Assets } from "src/api/client.interface";
import { Box, Spinner, Text } from "grommet";
import { Address } from "src/components/ui";
import { Alert, Image } from "grommet-icons";

export interface IInventoryItemProps {
  item: IUserERC721Assets;
}

const InventItem = styled.div`
  width: 215px;
  position: relative;
  margin: 10px;
`;

const Loader = styled.div`
  position: absolute;
  width: 215px;
  height: 270px;
  background: ${(props) => props.theme.backgroundBack};
`;

const InventImg = styled.img`
  width: 215px;
  height: 270px;
`;

const ErrorPreview = styled(Box)`
  width: 215px;
  height: 270px;

  border-radius: 8px;
`;

const EmptyImage = styled(Box)`
  width: 215px;
  height: 270px;

  border-radius: 8px;
`;

export function InventoryItem(props: IInventoryItemProps) {
  const [isLoading, setIsLoading] = useState(!!props.item?.meta?.image);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  const url = props.item?.meta?.image || "";
  const description = props.item?.meta?.description || "";
  const { tokenID, ownerAddress } = props.item;

  return (
    <InventItem>
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
          <Text style={{ opacity: 0.7 }}>No Image</Text>
        </ErrorPreview>
      ) : url ? (
        <InventImg
          title={description}
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
          <Text style={{ opacity: 0.7 }}>No image</Text>
        </EmptyImage>
      )}
      <Box direction={"column"} flex align={"center"}>
        <Text title={tokenID} size="small">
          #
          {tokenID.length > 8
            ? `${tokenID.slice(0, 5)}...${tokenID.slice(-5)}`
            : tokenID}
        </Text>
        <Text>
          <Text color="minorText" size="small"> 
            Owner
          </Text>{" "}
          <Address address={ownerAddress} isShort={true} />
        </Text>
      </Box>
    </InventItem>
  );
}
