export interface IVerifyContractData {
  contractAddress: string;
  compiler: string;
  optimizer: string;
  optimizerTimes: string;
  sourceCode: string;
  libraries: { value: string; id: string }[];
  constructorArguments: string;
  chainType: string;
  contractName: string;
  statusText: string;
  isLoading: boolean;
}

export interface IVerifyContractDataSendData {
  contractAddress: string;
  compiler: string;
  optimizer: string;
  optimizerTimes: string;
  sourceCode: string;
  libraries: string[];
  constructorArguments: string;
  chainType: string;
  contractName: string;
}

export const verifyContractCode = async (data: IVerifyContractDataSendData) => {
  const response = await fetch(
    `${process.env.REACT_APP_EXPLORER_V1_API_URL}/codeVerification`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

export const loadSourceCode = async (address: string) => {
  const response = await fetch(
    `${process.env.VUE_APP_EXPLORER_BACKEND_URL}/fetchContractCode?contractCode=${address}`,
    {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );

  return await response.json();
};
