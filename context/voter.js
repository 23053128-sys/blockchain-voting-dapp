import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import { VotingAddress, VotingABI } from "./constants";

// IPFS client
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
});

// Fetch contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingABI, signerOrProvider);

// Context
export const VotingContext = React.createContext();

// Provider
export const VotingProvider = ({ children }) => {
  const votingTitle = "My first smart contract app";
  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");

  // ---------------- Wallet ----------------
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- IPFS ----------------
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add(file);
      return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (error) {
      setError("Error uploading file to IPFS");
    }
  };

  // ---------------- Create Voter ----------------
  const createVoter = async (formInput, fileUrl) => {
    try {
      const { name, address, position } = formInput;

      if (!name || !address || !position || !fileUrl) {
        return setError("Please fill all fields");
      }

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // 🔥 IMPORTANT: adjust function name based on your smart contract
      const tx = await contract.createVoter(
        address,
        name,
        fileUrl,
        position
      );

      await tx.wait();

      router.push("/voterlist");
    } catch (error) {
      console.error(error);
      setError("Error creating voter");
    }
  };

  // ---------------- Auto check wallet ----------------
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        currentAccount,
        connectWallet,
        checkIfWalletIsConnected,
        uploadToIPFS,
        createVoter,
        error,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};