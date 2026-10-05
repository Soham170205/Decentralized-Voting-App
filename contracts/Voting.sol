// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    address public owner;
    string[] public candidates;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, string candidate);

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    function vote(string memory _candidate) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(isValidCandidate(_candidate), "Invalid candidate");

        votes[_candidate]++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, _candidate);
    }

    function isValidCandidate(string memory _candidate) public view returns (bool) {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(_candidate))) return true;
        }
        return false;
    }

    function getCandidates() external view returns (string[] memory) {
        return candidates;
    }

    function getVotes(string memory _candidate) external view returns (uint256) {
        return votes[_candidate];
    }
}