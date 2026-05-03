
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    constructor() {
        votingOrganizer = msg.sender;
    }

    // ================= CANDIDATE =================
    struct Candidate {
        uint256 candidateId;
        string name;
        string age;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    mapping(address => Candidate) public candidates;
    address[] public candidateAddress;

    event CandidateCreate(
        uint256 indexed candidateId,
        string name,
        string age,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    function setCandidate(
        address _address,
        string memory _name,
        string memory _age,
        string memory _image,
        string memory _ipfs
    ) public {
        require(msg.sender == votingOrganizer, "Only organizer");

        _candidateId.increment();
        uint256 id = _candidateId.current();

        Candidate storage c = candidates[_address];

        c.candidateId = id;
        c.name = _name;
        c.age = _age;
        c.image = _image;
        c.voteCount = 0;
        c._address = _address;
        c.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CandidateCreate(id, _name, _age, _image, 0, _address, _ipfs);
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            address
        )
    {
        Candidate memory c = candidates[_address];

        return (
            c.age,
            c.name,
            c.candidateId,
            c.image,
            c.voteCount,
            c.ipfs,
            c._address
        );
    }

    // ================= VOTER =================
    struct Voter {
        uint256 voterId;
        string name;
        string image;
        address voterAddress;
        uint256 allowed;
        uint256 votedTo;
        bool voted;
        string ipfs;
    }

    mapping(address => Voter) public voters;
    address[] public votersAddress;
    address[] public votedVoters;

    event VoterCreated(
        uint256 voterId,
        string name,
        string image,
        address voterAddress,
        uint256 allowed,
        uint256 votedTo,
        bool voted,
        string ipfs
    );

    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(msg.sender == votingOrganizer, "Only organizer");

        _voterId.increment();
        uint256 id = _voterId.current();

        Voter storage v = voters[_address];
        require(v.allowed == 0, "Already registered");

        v.voterId = id;
        v.name = _name;
        v.image = _image;
        v.voterAddress = _address;
        v.allowed = 1;
        v.votedTo = 0;
        v.voted = false;
        v.ipfs = _ipfs;

        votersAddress.push(_address);

        emit VoterCreated(id, _name, _image, _address, 1, 0, false, _ipfs);
    }

    function vote(address _candidateAddress, uint256 _candidatevoteId) external {
        Voter storage v = voters[msg.sender];

        require(v.allowed != 0, "No right to vote");
        require(!v.voted, "Already voted");

        v.voted = true;
        v.votedTo = _candidatevoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voteCount += 1;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterdata(address _address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            string memory,
            uint256,
            bool
        )
    {
        Voter memory v = voters[_address];

        return (
            v.voterId,
            v.name,
            v.image,
            v.voterAddress,
            v.ipfs,
            v.allowed,
            v.voted
        );
    }

    function getVotedVoterlist() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVotersList() public view returns (address[] memory) {
        return votersAddress;
    }
}
