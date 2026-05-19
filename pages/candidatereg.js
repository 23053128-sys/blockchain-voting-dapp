import React, { useState, useContext } from "react";

// INTERNAL IMPORTS
import { VotingContext } from "../context/voter";
import Style from "../style/allowedvoter.module.css";

const CandidateRegistration = () => {
  const {
    setCandidate,
    uploadToIPFSCandidate,
    candidateArray,
    getNewCandidate,
    currentAccount,
    connectWallet,
    error,
  } = useContext(VotingContext);

  const [fileUrl, setFileUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const localImageUrl = URL.createObjectURL(file);
  setPreviewImage(localImageUrl);
  setFileUrl("https://placeholder.com/image.png"); // ← skip IPFS, use dummy
};
  const handleSubmit = async () => {
    if (!currentAccount) {
      alert("Please connect MetaMask first");
      return;
    }

    if (
      !candidateForm.name ||
      !candidateForm.address ||
      !candidateForm.age ||
      !fileUrl
    ) {
      alert("Please fill all fields and upload image");
      return;
    }

    try {
      console.log("Submitting candidate:", candidateForm, fileUrl);

      await setCandidate(candidateForm, fileUrl);

      alert("Candidate saved successfully!");

      setCandidateForm({
        name: "",
        address: "",
        age: "",
      });

      setFileUrl("");
      setPreviewImage("");
    } catch (error) {
      console.error("Candidate save failed:", error);
      alert("Candidate save failed. Check console.");
    }
  };

  return (
    <div className={Style.createVoter}>
      <div style={{ marginBottom: "20px" }}>
        {!currentAccount ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>
            Connected: {currentAccount.slice(0, 6)}...
            {currentAccount.slice(-4)}
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className={Style.voterInfo}>
        <img
          src={previewImage || "/assets/candidate-1.png"}
          alt="Candidate"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div className={Style.voterInfo_paragraph}>
          <p>
            Name: <span>{candidateForm.name || "N/A"}</span>
          </p>

          <p>
            Address:{" "}
            <span>
              {candidateForm.address
                ? candidateForm.address.slice(0, 20) + "..."
                : "N/A"}
            </span>
          </p>

          <p>
            Age: <span>{candidateForm.age || "N/A"}</span>
          </p>
        </div>
      </div>

      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Candidate</h1>

          <div className={Style.voter_container_box}>
            <p>Upload Candidate Image</p>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            <p>Choose any image from your gallery</p>
          </div>

          <div className={Style.input_container}>
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateForm.name}
              onChange={(e) =>
                setCandidateForm({
                  ...candidateForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Wallet Address"
              value={candidateForm.address}
              onChange={(e) =>
                setCandidateForm({
                  ...candidateForm,
                  address: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Candidate Age"
              value={candidateForm.age}
              onChange={(e) =>
                setCandidateForm({
                  ...candidateForm,
                  age: e.target.value,
                })
              }
            />

            <div className={Style.button}>
              <button onClick={handleSubmit}>Authorize Candidate</button>
            </div>
          </div>
        </div>
      </div>

      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>
          <h3>Candidate List</h3>

          <button onClick={getNewCandidate}>Refresh Candidates</button>

          {candidateArray && candidateArray.length > 0 ? (
            candidateArray.map((el, i) => (
              <div key={i} className={Style.card_box}>
                <img
                  src={el[3] || "/assets/candidate-1.png"}
                  alt="Candidate"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <p>Name: {el[1]}</p>
                <p>Age: {el[0]?.toString?.()}</p>
                <p>ID: {el[2]?.toString?.()}</p>
                <p>Votes: {el[4]?.toString?.()}</p>
                <p>Address: {el[6]}</p>
              </div>
            ))
          ) : (
            <p>No candidates yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;