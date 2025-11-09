# The Elemental Brawl🔥

This repository contains the source code and assets for "The Elemental Brawl," a limited-edition collection of 10 unique dragon NFTs on the Solana devnet.
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/0e987c94-ed65-4d9c-b1a4-a51f2b064bd2" />

This project is built entirely on the new **Metaplex Core** protocol, leveraging its modern `collection` and `asset` standards for a more efficient and flexible on-chain structure.
visit https://core.metaplex.com/explorer/collection/GzRh7U2B5Cq48G4SNNvcXde1e2FZVBbYgNBCVWmbQphw?env=devnet
---

## The Collection: The 10 Brawlers

The collection consists of 10 unique, 1-of-1 elemental dragons.

1.  Lysera, The Golden Dawn
2.  Nyxara, The Eclipse Queen
3.  Pyraeth, The Crimson Reign
4.  Araxen, The Frost Serpent
5.  Rhaethon, The Azure Inferno
6.  Thalorix, The Emerald Crown
7.  Korthul, The Bone Drake
8.  Vaelora, The Silver Tempest
9.  Drakmor, The Ash Tyrant
10. Zynthera, The Void Wyrm

---
## 🏛️ Project Workflow

This project manually mints each asset and links it to a central collection. This is a common workflow for "1-of-1" or limited-run collections where each item is unique.

The process is in two parts:

1.  **Create the Collection:** The `collection-mint.ts` script is run *once* to create the main "The Elemental Brawl" collection NFT on-chain. This acts as the "parent" or "folder" for all the assets.
2.  **Mint the Assets:** The `asset-mint.ts` script is run *10 times* (once for each dragon). In this script, we create a new `asset` and, in the same instruction, **link it to the collection** by providing the collection's public key.

### Workflow Diagram
<img width="677" height="553" alt="image" src="https://github.com/user-attachments/assets/94787a13-0c38-462d-ab01-f9752928ccc8" />

## 🚀 How to Use

### Setup

1.  **Clone the repo:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd elemental-brawl-core
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your wallet:**
    * You will need a wallet file (e.g., `mywallet.json`).
    * **CRITICAL:** Add `mywallet.json` to your `.gitignore` file immediately. **NEVER COMMIT YOUR PRIVATE KEY.**
    * Airdrop some devnet SOL to your wallet to pay for fees.

