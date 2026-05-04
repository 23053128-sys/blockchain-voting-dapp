<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers"; 
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";

// IPFS client
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
});

// Contract function
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

// Context
export const VotingContext = React.createContext();

// Provider
export const VotingProvider = ({ children }) => {
  const votingTitle = "My first smart contract app";
const router = useRouter();
const [currentAccount, setCurrentAccount] = useState("");
const [candidateLength, setCandidateLength] = useState('');
const pushCandidate = [];
const candidateIndex = [];
const [candidateArray, setCandidateArray] = useState(pushCandidate);
//---- ed of canidate data

const [error, setError] = useState('');
const highestVote = [];

//-------voter section
const pushVoter = [];
const [voterArray, setVoterArray] = useState(pushVoter);
const [voterLength, setVoterLength] = useState('');
const [voterAddress, setVoterAddress] = useState([]);

// onnecting wallet
const checkIfWAlletIsConnected = async () => {
  if (!window.ethereum) return setError("Please install MetaMask");

  const accounts = await window.ethereum.request({ method: "eth_accounts" });

  if (accounts.length) {
    setCurrentAccount(accounts[0]);
  } else{
    setError("Please connect your wallet");
  }
};

//----connect wallet
const connectWallet = async () => {
  if (!window.ethereum) return setError("Please install MetaMask");

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

  
    setCurrentAccount(accounts[0]);
  
};
//-----upload to ipfs
const uploadToIPFS = async (file) => {
  try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
  }
    catch (error) {
      setError("Error uploading file to IPFS");
    }};

return (
    <VotingContext.Provider value={{ votingTitle, checkIfWAlletIsConnected, connectWallet, uploadToIPFS , }}>
      {children}
    </VotingContext.Provider>
  );
};
=======
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
>>>>>>> 9f4aaac7ebdeb35c5768e895a8af2e0cd415073e
