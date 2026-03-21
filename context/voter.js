import React, {useState,useEffect} from 'react';
import Web3Modal from "web3modal";
import { ethersrs } from "ethers"; 
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import {useRouter} from "next/router";
//INTRNAL IMPORT

import {VotingAddress, VotingAddressABI} from "./constants";
const client = ipfshttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerorProvider) => 
  
  new ethers. Contract(VotingAddress, VotingAddressABI, signerorProvider);
  export const VotingContext = React.createContext();
export const VotingProvider = ({children}) => {
cont votingTitle = 'My first smart contact app'
return<VotingContext.Provider value={{}}>{children}</VotingContext.Provider>;
};

export default Voter;
