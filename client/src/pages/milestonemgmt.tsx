import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './milestonemgmt.css';

declare let window: any;

interface Milestone {
  id: number;
  amount: number;
  dueDate: string;
  isCompleted: boolean;
  isDisputed: boolean;
}

const milestonemgmt: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const contractAddress = '0x1924B5c37b9fCB0325295d09A3Aab84d7C4c11f3';
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "DisputeRaised",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "DisputeResolved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "MilestoneCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        }
      ],
      "name": "MilestoneCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "skillName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "SkillAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "milestoneCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "milestones",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDisputed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "skills",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "skillName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "addSkill",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getSkills",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
            }
          ],
          "internalType": "struct SkillVerification.Skill[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "freelancer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        }
      ],
      "name": "createMilestone",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "completeMilestone",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "freelancer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "releasePayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        }
      ],
      "name": "raiseDispute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "freelancer",
          "type": "address"
        }
      ],
      "name": "resolveDispute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask to interact with the blockchain.");
      }
    };

    loadWeb3AndContract();
  }, []);

  const fetchMilestones = async () => {
    if (!contract || !account) return;

    try {
      const milestoneCount = await contract.methods.milestoneCount(account).call();
      const fetchedMilestones: Milestone[] = [];

      for (let i = 0; i < milestoneCount; i++) {
        const milestoneData = await contract.methods.milestones(account, i).call();
        fetchedMilestones.push({
          id: i,
          amount: parseFloat(web3!.utils.fromWei(milestoneData.amount, 'ether')),
          dueDate: new Date(milestoneData.dueDate * 1000).toLocaleDateString(),
          isCompleted: milestoneData.isCompleted,
          isDisputed: milestoneData.isDisputed,
        });
      }

      setMilestones(fetchedMilestones);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchMilestones();
    }
  }, [contract, account]);

  return (
    <div className="milestone-management">
      <h2>Milestone Management</h2>
      {milestones.length > 0 ? (
        <div className="milestone-list">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="milestone-item">
              <p><strong>Milestone ID:</strong> {milestone.id}</p>
              <p><strong>Amount:</strong> {milestone.amount} ETH</p>
              <p><strong>Due Date:</strong> {milestone.dueDate}</p>
              <p><strong>Completed:</strong> {milestone.isCompleted ? 'Yes' : 'No'}</p>
              <p><strong>Disputed:</strong> {milestone.isDisputed ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No milestones found.</p>
      )}
    </div>
  );
};

export default milestonemgmt;
