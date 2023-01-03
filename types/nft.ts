export type Trait = "year" | "extraction" | "country" | "region"

export type NftAttribute = {
    trait_type: Trait;
    value: string;
}

export type NftMeta = {
    name: string;
    description: string;
    image: string;
    attributes: NftAttribute[]
}

export type NftCore = {
    tokenURI: string;
    tokenId: number;
    price: number;
    creator: string;
    owner: string;
    isListed: boolean;
} 

export type TransactionHistory = {
    id: string;
    from: string;
    to: string;
    date: Date;
    tokenId: string;
    value: string;
}

export type Nft = {
    meta: NftMeta,
    transactions?: TransactionHistory[]
} & NftCore

export type FileReq = {
    bytes: Uint8Array;
    contentType: string;
    fileName: string;
}

export type PinataRes = {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
    isDuplicate: boolean;
  }