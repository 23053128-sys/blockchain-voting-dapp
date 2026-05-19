import React, { useContext } from "react";
import Style from "./card.module.css";
import { VotingContext } from "../../../context/voter";

const Card = ({ el, i }) => {
  const { giveVote } = useContext(VotingContext);

  return (
    <div className={Style.card_box}>
      <img
        src="/assets/candidate-1.png"
        alt="Candidate"
      />

      <div className={Style.card_candidate_info}>
        <p><span>Name:</span> {el[1]}</p>
        <p><span>Age:</span> {el[0]?.toString?.()}</p>
        <p><span>ID:</span> {el[2]?.toString?.()}</p>
        <p><span>Votes:</span> {el[4]?.toString?.()}</p>
        <p className={Style.card_address}>{el[6]?.slice(0, 25)}...</p>
      </div>

      <button
        className={Style.card_button}
        onClick={() =>
          giveVote({
            _address: el[6],
            candidateId: el[2],
          })
        }
      >
        Vote
      </button>
    </div>
  );
};

export default Card;