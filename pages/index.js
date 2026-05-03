import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import Countdown from "react-countdown";

//internal import
import { VotingContext } from '../context/voter';
import Style from  '../style/index.module.css';
import card from '../components/NavBar/card/card.jsx';

const index = () => {
  const  {votingTitle} = useContext(VotingContext);
  return   <div>{votingTitle}
  <Image src="/assets/candidate-1.png" width={300} height={300} />
  </div>;
  
};

export default index