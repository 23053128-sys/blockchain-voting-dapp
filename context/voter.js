import React, { useState, useEffect } from "react";
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

export const VotingProvider = ({ children }) => {
  const votingTitle = "My first smart contract app";
  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");

  // VOTER STATES
  const [voterArray, setVoterArray] = useState([]);
  const [voterAddress, setVoterAddress] = useState([]);
  const [voterLength, setVoterLength] = useState(0);

  // CANDIDATE STATES
  const [candidateArray, setCandidateArray] = useState([]);
  const [candidateLength, setCandidateLength] = useState(0);

  // ---------------- Wallet ----------------
  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window === "undefined") return;
      if (!window.ethereum) {
        setError("Please install MetaMask");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      console.error("Check wallet error:", err);
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window === "undefined") return;
      if (!window.ethereum) {
        alert("MetaMask is not installed");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setError("");
      console.log("Connected account:", accounts[0]);
    } catch (err) {
      console.error("MetaMask connection error:", err);
      if (err.code === 4001) {
        setError("You rejected the MetaMask connection request.");
      } else if (err.code === -32002) {
        setError("MetaMask request already pending. Open MetaMask and approve it.");
      } else {
        setError("Failed to connect to MetaMask");
      }
    }
  };

  const getProviderAndSigner = async () => {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { provider, signer };
  };

  // ---------------- IPFS ----------------
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add(file);
      return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (err) {
      console.error(err);
      setError("Error uploading file to IPFS");
    }
  };

  const uploadToIPFSCandidate = async (file) => {
    try {
      const added = await client.add(file);
      return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (err) {
      console.error(err);
      setError("Error uploading file to IPFS");
    }
  };

  // ---------------- Create Voter ----------------
  const createVoter = async (formInput, fileUrl) => {
    try {
      const { name, address } = formInput;

      if (!name || !address || !fileUrl) {
        return setError("Please fill all fields");
      }

      if (!ethers.utils.isAddress(address)) {
        return setError("Invalid wallet address");
      }

      const { signer } = await getProviderAndSigner();
      const contract = fetchContract(signer);

      // ✅ correct function name from smart contract
      const tx = await contract.voterRight(
        address,
        name,
        fileUrl,
        fileUrl,
        { gasLimit: 3000000 }
      );
      await tx.wait();

      alert("Voter registered successfully!");
      router.push("/voterlist");
    } catch (err) {
      console.error("Create voter error:", err);
      setError(err?.reason || err?.message || "Error creating voter");
    }
  };

  // ---------------- Get All Voters ----------------
  const getAllVoterData = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);

      const voterListData = await contract.getVotersList();
      setVoterAddress(voterListData);

      const voterData = [];
      for (let i = 0; i < voterListData.length; i++) {
        const singleVoter = await contract.getVoterdata(voterListData[i]);
        voterData.push(singleVoter);
      }

      setVoterArray(voterData);
      setVoterLength(voterListData.length);
    } catch (err) {
      console.error("Get voter error:", err);
    }
  };

  // ---------------- Give Vote ----------------
  const giveVote = async (candidate) => {
    try {
      const { signer } = await getProviderAndSigner();
      const contract = fetchContract(signer);

      // ✅ correct function from smart contract
      const tx = await contract.vote(
        candidate._address,
        candidate.candidateId,
        { gasLimit: 3000000 }
      );
      await tx.wait();

      alert("Vote cast successfully!");
      router.push("/");
    } catch (err) {
      console.error("Vote error:", err);
      setError(err?.reason || err?.message || "Error casting vote");
    }
  };

  // ---------------- Create Candidate ----------------
  const setCandidate = async (candidateForm, fileUrl) => {
    try {
      const { name, address, age } = candidateForm;

      if (!name || !address || !age || !fileUrl) {
        return setError("Please fill all fields");
      }

      if (!ethers.utils.isAddress(address)) {
        return setError("Invalid wallet address");
      }

      if (!window.ethereum) return setError("Please install MetaMask");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // ✅ correct function from smart contract
      const tx = await contract.setCandidate(
        address,
        name,
        age.toString(),
        fileUrl,
        fileUrl,
        { gasLimit: 3000000 }
      );

      await tx.wait();

      alert("Candidate stored successfully on blockchain!");
      await getNewCandidate();
      router.push("/candidatereg");
    } catch (error) {
      console.error("Create candidate error:", error);
      setError(error?.reason || error?.message || "Error creating candidate");
    }
  };

  // ---------------- Get Candidates ----------------
  const getNewCandidate = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);

      const allCandidate = await contract.getCandidate();
      const candidateData = [];

      for (let i = 0; i < allCandidate.length; i++) {
        const singleCandidateData = await contract.getCandidatedata(allCandidate[i]);
        candidateData.push(singleCandidateData);
      }

      setCandidateArray(candidateData);

      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());

      console.log("Candidate Data:", candidateData);
    } catch (error) {
      console.error("Get Candidate Error:", error);
    }
  };

  // ---------------- Auto Load ----------------
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
        uploadToIPFSCandidate,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterAddress,
        voterLength,
        candidateArray,
        candidateLength,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};