const hre = require("hardhat");

async function main() {
  const Create = await hre.ethers.getContractFactory("Create");

  const create = await Create.deploy();

  await create.deployed();

  console.log("Contract deployed to:", create.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });