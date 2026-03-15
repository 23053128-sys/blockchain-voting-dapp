// voting.js

// 1) Config
const CONTRACT_ADDRESS = "0xYourContractAddressHere";
const CONTRACT_ABI = [
  // ABI snippet for Voting contract (replace with full ABI)
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "candidates",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "voter", "type": "address" },
      { "indexed": true, "internalType": "uint256", "name": "candidateId", "type": "uint256" }
    ],
    "name": "Voted",
    "type": "event"
  }
];

let web3;
let votingContract;
let currentAccount;

// 2) Init
async function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      currentAccount = accounts[0];
      document.getElementById("account").innerText = currentAccount;
      votingContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      loadCandidates();
      listenForEvents();
    } catch (err) {
      console.error("Wallet connection denied", err);
      alert("Please connect MetaMask to continue.");
    }
  } else {
    alert("MetaMask not detected. Install MetaMask.");
  }
}

// 3) Load candidates
async function loadCandidates() {
  const countBN = await votingContract.methods.candidatesCount().call();
  const count = Number(countBN);
  const table = document.getElementById("candidatesTable");
  table.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    const candidate = await votingContract.methods.candidates(i).call();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${candidate.id}</td>
      <td>${candidate.name}</td>
      <td>${candidate.voteCount}</td>
      <td><button class="btn-vote" data-id="${candidate.id}">Vote</button></td>
    `;
    table.appendChild(row);
  }
  document.querySelectorAll(".btn-vote").forEach(btn => {
    btn.addEventListener("click", e => castVote(e.target.dataset.id));
  });
}

// 4) Cast vote
async function castVote(candidateId) {
  try {
    await votingContract.methods.vote(candidateId).send({ from: currentAccount });
    alert(`Successfully voted for candidate ${candidateId}`);
    loadCandidates();
  } catch (err) {
    console.error("Vote failed", err);
    alert("Vote transaction failed. Check console for details.");
  }
}

// 5) Event subscription
function listenForEvents() {
  votingContract.events.Voted({ fromBlock: "latest" })
    .on("data", evt => {
      const voter = evt.returnValues.voter;
      const candidateId = evt.returnValues.candidateId;
      const log = document.getElementById("eventLog");
      const entry = document.createElement("div");
      entry.innerText = `🎉 ${voter} voted for candidate ${candidateId}`;
      log.prepend(entry);
      loadCandidates();
    })
    .on("error", err => console.error("Event listener error", err));
}

// 6) Reconnect if account changed
if (window.ethereum) {
  window.ethereum.on("accountsChanged", accounts => {
    currentAccount = accounts[0] || null;
    document.getElementById("account").innerText = currentAccount || "Disconnected";
    if (currentAccount) loadCandidates();
  });
}

// 7) DOM ready
document.addEventListener("DOMContentLoaded", init);