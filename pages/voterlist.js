import React, { useEffect, useContext } from "react";
import { VotingContext } from "../context/voter";

const VoterList = () => {
  const { voterArray, getAllVoterData, currentAccount, connectWallet } =
    useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white", background: "#1a1a2e", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#00d4aa" }}>Voter List</h1>
        {!currentAccount ? (
          <button
            onClick={connectWallet}
            style={{ padding: "10px 20px", background: "#00d4aa", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Connect Wallet
          </button>
        ) : (
          <p>Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
        )}
      </div>

      {/* Voter Cards */}
      {voterArray && voterArray.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {voterArray.map((el, i) => (
            <div
              key={i}
              style={{
                background: "#16213e",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #00d4aa",
              }}
            >
              <img
                src="/assets/candidate-1.png"
                alt="Voter"
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ marginTop: "12px" }}>
                <p><span style={{ color: "#00d4aa" }}>Voter ID:</span> {el[0]?.toString?.()}</p>
                <p><span style={{ color: "#00d4aa" }}>Name:</span> {el[1]}</p>
                <p><span style={{ color: "#00d4aa" }}>Address:</span> {el[3]?.slice(0, 20)}...</p>
                <p><span style={{ color: "#00d4aa" }}>Allowed:</span> {el[5]?.toString?.() === "1" ? "✅ Yes" : "❌ No"}</p>
                <p><span style={{ color: "#00d4aa" }}>Voted:</span> {el[6] ? "✅ Yes" : "❌ No"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <p style={{ fontSize: "20px", color: "#888" }}>No voters registered yet</p>
          <button
            onClick={getAllVoterData}
            style={{ marginTop: "20px", padding: "10px 20px", background: "#00d4aa", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Refresh
          </button>
        </div>
      )}

    </div>
  );
};

export default VoterList;