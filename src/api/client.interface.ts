export interface IUserERC721Assets {
  lastUpdateBlockNumber: null | number;
  meta: {
    attributes: { value: string; trait_type: string }[];
    collection_id: string;
    collection_url: string;
    core: any;
    description: string;
    external_url: string;
    id: string;
    image: string;
    license: string;
    name: string;
    youtube_url: string;
  };
  needUpdate: boolean;
  ownerAddress: string;
  tokenAddress: string;
  tokenID: string;
  tokenURI: string;
}
