export interface Block {
  attributes: AttributesBlocks;
  id: string;
  type: string;
  status: string;
}

export interface AttributesBlocks {
  data: string;
  hash: string;
  index: number;
  previousHash: string;
}
