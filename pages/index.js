import React, { useEffect, useContext } from "react";
import { VotingContext } from "../context/voter";

const Index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    currentAccount,
    connectWallet,
    error,
  } = useContext(VotingContext);

  useEffect(() => {
    checkIfWalletIsConnected();
    getNewCandidate();
  }, []);

  return (
    <div style={{ padding: "40px", background: "#1a1a2e", minHeight: "100vh", color: "white" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#00d4aa", fontSize: "36px" }}>Blockchain Voting System</h1>
        <p style={{ color: "#888" }}>Decentralized and transparent voting on Ethereum</p>

        {!currentAccount ? (
          <button
            onClick={connectWallet}
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              background: "#00d4aa",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <p style={{ color: "#00d4aa" }}>
            Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
          </p>
        )}

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "40px" }}>
        <div style={{ background: "#16213e", padding: "20px 40px", borderRadius: "12px", border: "1px solid #00d4aa", textAlign: "center" }}>
          <h2 style={{ color: "#00d4aa" }}>{candidateLength || 0}</h2>
          <p>Total Candidates</p>
        </div>
        <div style={{ background: "#16213e", padding: "20px 40px", borderRadius: "12px", border: "1px solid #00d4aa", textAlign: "center" }}>
          <h2 style={{ color: "#00d4aa" }}>{candidateArray?.length || 0}</h2>
          <p>Registered</p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "40px" }}>
        <a href="/candidatereg" style={{ padding: "10px 20px", background: "#00d4aa", borderRadius: "8px", color: "black", textDecoration: "none", fontWeight: "bold" }}>
          Add Candidate
        </a>
        <a href="/allowedvoters" style={{ padding: "10px 20px", background: "#00d4aa", borderRadius: "8px", color: "black", textDecoration: "none", fontWeight: "bold" }}>
          Add Voter
        </a>
        <a href="/voterlist" style={{ padding: "10px 20px", background: "#00d4aa", borderRadius: "8px", color: "black", textDecoration: "none", fontWeight: "bold" }}>
          Voter List
        </a>
      </div>

      {/* Candidate Cards */}
      <h2 style={{ color: "#00d4aa", marginBottom: "20px", textAlign: "center" }}>Candidates</h2>

      {candidateArray && candidateArray.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {candidateArray.map((el, i) => (
            <div
              key={i}
              style={{
                background: "#16213e",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #00d4aa",
                textAlign: "center",
              }}
            >
              <img
                src="/assets/candidate-1.png"
                alt="Candidate"
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ marginTop: "12px" }}>
                <p><span style={{ color: "#00d4aa" }}>Name:</span> {el[1]}</p>
                <p><span style={{ color: "#00d4aa" }}>Age:</span> {el[0]?.toString?.()}</p>
                <p><span style={{ color: "#00d4aa" }}>ID:</span> {el[2]?.toString?.()}</p>
                <p><span style={{ color: "#00d4aa" }}>Votes:</span> {el[4]?.toString?.()}</p>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  {el[6]?.slice(0, 20)}...
                </p>
              </div>

              <button
                onClick={() => giveVote({
                  _address: el[6],
                  candidateId: el[2],
                })}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  background: "#00d4aa",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ color: "#888", fontSize: "18px" }}>No candidates registered yet</p>
          <button
            onClick={getNewCandidate}
            style={{ marginTop: "16px", padding: "10px 20px", background: "#00d4aa", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Refresh
          </button>
        </div>
      )}

    </div>
  );
};

export default Index;