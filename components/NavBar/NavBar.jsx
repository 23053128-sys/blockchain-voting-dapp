import React, { useContext } from "react";
import Link from "next/link";
import { VotingContext } from "../../context/voter";

const NavBar = () => {
  const { currentAccount, connectWallet } =
    useContext(VotingContext);

  return (
    <nav
      style={{
        width: "100%",
        background: "#16213e",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #00d4aa",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      {/* LOGO */}
      <div>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#00d4aa",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Voting App
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Home
        </Link>

        <Link
          href="/candidatereg"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Add Candidate
        </Link>

        <Link
          href="/allowedvoters"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Add Voter
        </Link>

        <Link
          href="/voterlist"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Voter List
        </Link>

        {/* CONNECT WALLET */}
        {!currentAccount ? (
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 18px",
              background: "#00d4aa",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <div
            style={{
              background: "#0f3460",
              padding: "10px 16px",
              borderRadius: "8px",
              color: "#00d4aa",
              fontWeight: "bold",
            }}
          >
            {currentAccount.slice(0, 6)}...
            {currentAccount.slice(-4)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;