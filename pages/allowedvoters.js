import React, { useState, useEffect, useCallback, useContext} from 'react';
import{useRouter} from "next/router";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

// INTERNAL IMPORT
import { VotingContext } from '../context/voter';
import Style from '../style/allowedvoters.module.css';
import images from '../assets';
import button from '../components/button/button';
import input from '../components/input/input';

const alowedvoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ name: '', description: '',position:'' });

  const router = useRouter();
  const {uploadToIPFS} = useContext(VotingContext);

  //---voters image drop
  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  }, [uploadToIPFS]);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*', maxSize: 5000000});

//--jsx part

  return (
    <div className={Style.createVoter}>
      <div>
        {
          fileUrl && (
          <div className={Style.voterInfo}>
            <Image src={fileUrl} alt="voter image" width={200} height={200} className={Style.voterImg}/>

<div className={Style.voterInfo_paragraph}>
  <p>
    Name: <span>&nbps; {formInput.name} </span>
  </p>
  <p>
    Add: &nbps; <span>{formInput.address.slice(0, 20)}... </span>
  </p>
  <p>
    Pos: &nbps; <span>{formInput.position} </span>
  </p>
          </div>
        
      </div>
   
  ) }
  {
    !fileUrl && (
      <div className={Style.sideInfo}>
        <div className={Style.sideInfo_box}>
          <h4>create candidate</h4>
          <p>
            blockchain voting organization, provide etherum ecosystem 
          </p>
          <p className={Style.sideInfo_para}>Contract Candidate

          </p>
          </div>
          <div className={Style.car}>
            {voterArray.map((el, i) => (
              <div key={i + 1} className={Style.card_box}>
                <div className={Style.image}>
                  <img sec="" alt="Profile photo"/> </div>
                  <div className={Style.card_info}>
                    <p> Name</p>
                    <p> Address</p>
                    <p> Details</p>

                  </div>
              </div>
            ))}
          </div> 
         </div>
)}
</div>
<div className={Style.voter}>
  <div className={Style.voter_container}>
    <h1>Create new voter</h1>
    <div className={Style.voter_container_box}>
      <div className={Style.voter_container_box_div}>
        <div {... getRootProps()}>
          <input {... getInputProps()}/>
          <div className={Style.voter_container_box_div_info}>
            <p>Upload Voter Image</p>
            <div className={Style.voter_container_box_div_info_upload}>
              <Image src={images.creator} alt="upload" width={50} height={50} className={Style.uploadIcon}/>

            </div>
            <p>drag and drop your image here</p>
            <p>or browse media</p>
        </div>
        </div>
        </div>
    </div>
</div>
<div className={Style.input_container}>
<input 
inputType="text" 
title="Name" 
placeholder="Voter Name" 
handleClick={(e) => 
setFormInput({...formInput, name: e.target.value})}/>

<input 
inputType="text" 
title="address" 
placeholder="Voter address" 
handleClick={(e) => 
setFormInput({...formInput, address: e.target.value})}/>
<input 
inputType="text" 
title="position" 
placeholder="Voter position" 
handleClick={(e) => 
setFormInput({...formInput, position: e.target.value})}/>

<div className={Style.button}>
  <button btnName="Authorized Voter" handleClick={()=> {}} />
</div>
</div>
</div>
<div className={Style.createdVoter}>
<div className={Style.createdVoter__info}>
  <image src={images.creator} alt="user profile" />
  <p>notice for users</p>
  <p> organizer <span>0x939939..</span></p>
  <p> only organizer of voting contract can create</p>
</div>
</div>
    </div>
  );
};

export default allowedvoters;