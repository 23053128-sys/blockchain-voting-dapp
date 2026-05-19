import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

// INTERNAL IMPORTS
import { VotingContext } from "../context/voter";
import Style from "../style/allowedvoter.module.css";

const AllowedVoters = () => {
  const router = useRouter();

  const {
    createVoter,
    voterArray,
    getAllVoterData,
    currentAccount,
    connectWallet,
    error,
  } = useContext(VotingContext);

  const [fileUrl, setFileUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
    setFileUrl(imageUrl);

    console.log("Uploaded Image:", imageUrl);
  };

  // CREATE VOTER
  const handleSubmit = async () => {
    if (!currentAccount) {
      alert("Please connect MetaMask first");
      return;
    }

    if (
      !formInput.name ||
      !formInput.address ||
      !formInput.position
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!fileUrl) {
      alert("Please upload voter image");
      return;
    }

    try {
      setLoading(true);

      console.log("Creating voter...");

      await createVoter(formInput, fileUrl);

      console.log("Voter created successfully");

      // REFRESH DATA
      await getAllVoterData();

      // CLEAR FORM
      setFormInput({
        name: "",
        address: "",
        position: "",
      });

      setFileUrl("");
      setPreviewImage("");

      // REDIRECT
      router.push("/voterlist");

    } catch (err) {
      console.error("Error creating voter:", err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.createVoter}>

      {/* WALLET */}
      <div style={{ marginBottom: "20px" }}>
        {!currentAccount ? (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <p>
            Connected: {currentAccount.slice(0, 6)}...
            {currentAccount.slice(-4)}
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>

      {/* PREVIEW */}
      <div className={Style.voterInfo}>
        <img
          src={previewImage || "/assets/candidate-1.png"}
          alt="Preview"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div className={Style.voterInfo_paragraph}>
          <p>
            Name:{" "}
            <span>{formInput.name || "N/A"}</span>
          </p>

          <p>
            Address:{" "}
            <span>
              {formInput.address
                ? formInput.address.slice(0, 20) + "..."
                : "N/A"}
            </span>
          </p>

          <p>
            Position:{" "}
            <span>{formInput.position || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className={Style.voter}>
        <div className={Style.voter_container}>

          <h1>Create New Voter</h1>

          {/* IMAGE UPLOAD */}
          <div className={Style.voter_container_box}>

            <label className={Style.uploadArea}>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              <img
                src={
                  previewImage ||
                  "/assets/candidate-1.png"
                }
                alt="Upload"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <p>Click to upload voter image</p>

            </label>
          </div>

          {/* INPUTS */}
          <div className={Style.input_container}>

            <input
              type="text"
              placeholder="Voter Name"
              value={formInput.name}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Wallet Address"
              value={formInput.address}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  address: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Position"
              value={formInput.position}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  position: e.target.value,
                })
              }
            />

            {/* BUTTON */}
            <div className={Style.button}>
              <button
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Creating Voter..."
                  : "Authorize Voter"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* REGISTERED VOTERS */}
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>

          <h3>Registered Voters</h3>

          <button onClick={getAllVoterData}>
            Refresh Voters
          </button>

          {voterArray && voterArray.length > 0 ? (
            voterArray.map((el, i) => (
              <div
                key={i}
                className={Style.card_box}
              >

                <img
                  src="/assets/candidate-1.png"
                  alt="Voter"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <p>Name: {el[1]}</p>
                <p>Address: {el[3]}</p>
                <p>Position: {el[2]}</p>

                <p>
                  Voter ID:{" "}
                  {el[0]?.toString?.()}
                </p>

                <p>
                  Allowed:{" "}
                  {el[5]?.toString?.() === "1"
                    ? "✅ Yes"
                    : "❌ No"}
                </p>

                <p>
                  Voted:{" "}
                  {el[6]
                    ? "✅ Yes"
                    : "❌ No"}
                </p>

              </div>
            ))
          ) : (
            <p>No voters yet</p>
          )}

        </div>
      </div>

    </div>
  );
};

export default AllowedVoters;