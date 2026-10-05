const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting, voter1, voter2;

  beforeEach(async () => {
    [, voter1, voter2] = await ethers.getSigners();
    voting = await ethers.deployContract("Voting", [["Alice", "Bob"]]);
  });

  it("counts a vote", async () => {
    await voting.connect(voter1).vote("Alice");
    expect(await voting.getVotes("Alice")).to.equal(1n);
  });

  it("blocks double voting", async () => {
    await voting.connect(voter1).vote("Alice");
    await expect(voting.connect(voter1).vote("Bob")).to.be.revertedWith("Already voted");
  });

  it("rejects invalid candidates", async () => {
    await expect(voting.connect(voter1).vote("Eve")).to.be.revertedWith("Invalid candidate");
  });

  it("allows different wallets to vote", async () => {
    await voting.connect(voter1).vote("Alice");
    await voting.connect(voter2).vote("Alice");
    expect(await voting.getVotes("Alice")).to.equal(2n);
  });
});