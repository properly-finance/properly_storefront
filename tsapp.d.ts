/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  ethereum: any
  ethers: any
  depositContract: any
  tokenContract: any
  farmContract: any
}

