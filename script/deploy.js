const hre = require("hardhat");
async function main() {
  const Create = await ethers.getContractFactory("Create");

  const create = await Create.deploy();

  await create.waitForDeployment();

  console.log("Create contract deployed to:", await create.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});