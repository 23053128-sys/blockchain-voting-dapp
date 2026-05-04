import React, { useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORTS
import { VotingContext } from "../context/voter";
import Style from "../style/allowedvoter.module.css";

const AllowedVoters = () => {
  const router = useRouter();
  const { uploadToIPFS } = useContext(VotingContext);

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  // Handle image upload
  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        const url = await uploadToIPFS(acceptedFiles[0]);
        setFileUrl(url);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
    [uploadToIPFS]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5000000,
  });

  const voterArray = []; // later connect to blockchain

  return (
    <div className={Style.createVoter}>
      
      {/* Preview Section */}
      {fileUrl && (
        <div className={Style.voterInfo}>
          <Image
            src={fileUrl}
            alt="Voter"
            width={200}
            height={200}
            className={Style.voterImg}
          />

          <div className={Style.voterInfo_paragraph}>
            <p>Name: <span>&nbsp;{formInput.name}</span></p>
            <p>
              Address:{" "}
              <span>
                &nbsp;
                {formInput.address
                  ? formInput.address.slice(0, 20) + "..."
                  : "N/A"}
              </span>
            </p>
            <p>Position: <span>&nbsp;{formInput.position}</span></p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!fileUrl && (
        <div className={Style.sideInfo}>
          <div className={Style.sideInfo_box}>
            <h4>Create Candidate</h4>
            <p>Blockchain voting system on Ethereum</p>
            <p className={Style.sideInfo_para}>Contract Candidate</p>
          </div>

          <div className={Style.card}>
            {voterArray.length === 0 ? (
              <p>No voters yet</p>
            ) : (
              voterArray.map((el, i) => (
                <div key={i} className={Style.card_box}>
                  <div className={Style.image}>
                    <img
                      src="/assets/candidate-1.png"
                      alt="Profile"
                    />
                  </div>
                  <div className={Style.card_info}>
                    <p>{el.name}</p>
                    <p>{el.address}</p>
                    <p>{el.position}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Voter</h1>

          {/* Upload Area */}
          <div className={Style.voter_container_box}>
            <div {...getRootProps()} className={Style.uploadArea}>
              <input {...getInputProps()} />
              <p>Upload voter image</p>

              <Image
                src="/assets/candidate-1.png"
                alt="Upload"
                width={50}
                height={50}
              />

              <p>Drag & drop or click to upload</p>
            </div>
          </div>

          {/* Input Fields */}
          <div className={Style.input_container}>
            <input
              type="text"
              placeholder="Voter Name"
              onChange={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Wallet Address"
              onChange={(e) =>
                setFormInput({ ...formInput, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Position"
              onChange={(e) =>
                setFormInput({ ...formInput, position: e.target.value })
              }
            />

            <div className={Style.button}>
              <button
                onClick={() => {
                  console.log("Submitting:", formInput, fileUrl);
                  // TODO: connect smart contract here
                }}
              >
                Authorize Voter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>
          <Image
            src="/assets/candidate-1.png"
            alt="User"
            width={50}
            height={50}
          />
          <p>Notice for users</p>
          <p>
            Organizer <span>0x939939...</span>
          </p>
          <p>Only contract owner can create voters</p>
        </div>
      </div>
    </div>
  );
};

export default AllowedVoters;