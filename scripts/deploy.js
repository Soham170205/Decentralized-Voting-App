const hre = require("hardhat");

async function main() {
  const candidates = ["Alice", "Bob", "Charlie"]; // change as needed
  const voting = await hre.ethers.deployContract("Voting", [candidates]);
  await voting.waitForDeployment();
  console.log("Voting deployed to:", await voting.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});