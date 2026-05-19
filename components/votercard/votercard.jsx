import React from "react";
import Style from "./VoterCard.module.css";

const VoterCard = ({ voter }) => {
  return (
    <div className={Style.card}>
      
      {/* IMAGE */}
      <img
        src={voter?.image || "/assets/candidate-1.png"}
        alt="Voter"
        onError={(e) => {
          e.currentTarget.src = "/assets/candidate-1.png";
        }}
        className={Style.cardImage}
      />

      {/* DETAILS */}
      <div className={Style.cardBody}>
        
        <p>
          <span className={Style.label}>
            Voter ID:
          </span>{" "}
          {voter?.id || "N/A"}
        </p>

        <p>
          <span className={Style.label}>
            Name:
          </span>{" "}
          {voter?.name || "N/A"}
        </p>

        <p>
          <span className={Style.label}>
            Address:
          </span>{" "}
          {voter?.address
            ? `${voter.address.slice(0, 20)}...`
            : "N/A"}
        </p>

        <p>
          <span className={Style.label}>
            Position:
          </span>{" "}
          {voter?.position || "N/A"}
        </p>

        <p>
          <span className={Style.label}>
            Allowed:
          </span>{" "}
          {voter?.allowed
            ? "✅ Yes"
            : "❌ No"}
        </p>

        <p>
          <span className={Style.label}>
            Voted:
          </span>{" "}
          {voter?.voted
            ? "✅ Yes"
            : "❌ No"}
        </p>
      </div>
    </div>
  );
};

export default VoterCard;