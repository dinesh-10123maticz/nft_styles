/* ABI */
import idl from '../../Abi/abi.json'


/* for Get Program Instance NPM */
import * as anchor from "@project-serum/anchor";

/* Core Solana NPM funtions */
import {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  clusterApiUrl,
  PublicKey,
  Keypair,
} from "@solana/web3.js";

/* Core Solana SPL token function NPM */
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createApproveInstruction,
  getAssociatedTokenAddressSync,
  createRevokeInstruction
} from "@solana/spl-token";

/* Solana Wallet Adapters */
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";

/* Solana Mobile wallet adapter */
import {
  SolanaMobileWalletAdapter,
  createDefaultAuthorizationResultCache,
  createDefaultAddressSelector,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

/* Solana Math Wallet connect Adapter */
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";

/* Neccassary NPM */
import axios from "axios";

const { SystemProgram } = anchor.web3;
var provider;
var programInstance;

import { useSelector } from 'react-redux';
import Config from '@/Config/config';

export default function Usewallet() {

  const settimeout = (ms) => {
    return new Promise(resolve => setTimeout(() => {
      resolve()
    }, ms))
  }

  const { web3, accountAddress, coinBalance } = useSelector((state) => state.LoginReducer.AccountDetails)
  // const { owneraddress } = useSelector((state) => state.LoginReducer.ServiceFees)
  const { sellerFees, buyerFees, owneraddress } = useSelector((state) => state.LoginReducer.ServiceFees);


  const Contract_Base_Validation = () => {
    if (!web3) return 'Connect Your Wallet'
    if (!accountAddress) return 'Connect Your Wallet'
    if (!coinBalance) return "You Don't have Enough Balance"
    else return ''
  }

  const stringToArrayBuffer = (string) => {
    /* Way 1 */
    // let byteArray = new Uint8Array(string.length);
    // for(var i=0; i < string.length; i++) {
    //   byteArray[i] = string.codePointAt(i);
    // }
    // return byteArray;

    /* way 2  */
    const binaryString = atob(string);
    return new Uint8Array([...binaryString].map((char) => char.charCodeAt(0)));
  };

  const arrayBufferToString = (buf) => {
    let uint8Array = new Uint8Array(buf);
    return btoa(String.fromCharCode(...uint8Array));
  };

  function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  }

  const getTransactionstatus = async (tx) => {
    const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
    const result = await connection.getSignatureStatus(tx, {
      searchTransactionHistory: true,
    });
    console.log("🚀 ~ getTransactionstatus ~ result:", result);
    return result?.value?.confirmationStatus === "confirmed";
  };

  /**
   * @function Walletconncet
   * @param {data}
   * @returns {walletAdapter,Address,Sol}
   */

  const Walletconnect = async (data) => {
    const network = clusterApiUrl(Config.network);
    console.log("🚀 ~ Walletconnect ~ network:", network);
    try {
      let walletAdapter;
      if (data === "math") {
        if (isMobileOrTablet()) {
          /* Mobile Walletconncet */
          walletAdapter = new WalletConnectWalletAdapter({
            network,
            options: {
              relayUrl: "wss://relay.walletconnect.com",
              projectId: "b8a1daa2dd22335a2fe1d2e139980ae0",
              metadata: {
                name: "Example App", // App Name
                description: "Example App", // App Description
                url: "https://200.140.70.236:3001/walcon", // App Frontend URL
                icons: [
                  "https://avatars.githubusercontent.com/u/35608259?s=200",
                ], // App Logo
              },
            },
          });
        } else {
          /* Math wallet Extension */
          walletAdapter = new MathWalletAdapter({ network });
        }
      }
      if (data === "mobile") {
        /* Solana Mobile wallet Adapter (panthom , solfare) */
        walletAdapter = new SolanaMobileWalletAdapter({
          addressSelector: createDefaultAddressSelector(),
          appIdentity: {
            name: "My app", //App Name
            uri: "https://200.140.70.236:3001/walcon", //App
            icon: "public/logo512.png",
          },
          authorizationResultCache: createDefaultAuthorizationResultCache(),
          cluster: Config.network,
          onWalletNotFound: createDefaultWalletNotFoundHandler(),
        });
      }
      if (data === "panthom") {
        /* Panthom wallet adapter */
        walletAdapter = new PhantomWalletAdapter();
      }
      if (data === "solfare") {
        /* Solfare wallet adapter */
        walletAdapter = new SolflareWalletAdapter({ network: Config.network });
      }

      /* Wallet connections */
      await walletAdapter.connect();
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      let bal = await connection.getBalance(walletAdapter.publicKey);
      provider = walletAdapter;
      return {
        walletAdapter,
        Address: walletAdapter?.publicKey.toString(),
        Sol: bal / LAMPORTS_PER_SOL,
      };
    } catch (error) {
      if (data === "math") {
        let walletAdapter = new MathWalletAdapter({ network });
        if (walletAdapter.readyState === "NotDetected") {
          window.alert(
            "Math Wallet not Detected , make sure panthom is not exist"
          );
        } else {
          window.alert("Make Sure youre Wallet was unlocked");
        }
        return {};
      }
    }
  };

  /**
   * @function getTokenbalance
   * @param {walletAddress , tokenAddress}
   * @returns {tokenBalance,Decimal}
   */

  const getTokenbalance = async (walletAddress, tokenAddress) => {
    try {

      // return new Promise(async (resolve) => {
      // try{
      console.log("🚀 ~ getTokenbalance ~ walletAddress, tokenAddress:", walletAddress, tokenAddress)
      let tokenBalance = 0;
      let Decimal = 0;
      const response = await axios({
        url: `https://api.devnet.solana.com/`, // devnet URL or mainnet URL
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress, // account addrss
            {
              mint: tokenAddress, // token mint address
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });
      console.log("🚀 ~ getTokenbalance ~ response:", response);
      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount
          ?.amount > 0
      ) {
        tokenBalance = Number(
          response?.data?.result?.value?.length > 0 &&
          response?.data?.result?.value[0]?.account?.data?.parsed?.info
            ?.tokenAmount?.uiAmount
        );
        Decimal =
          response?.data?.result?.value[0]?.account?.data?.parsed?.info
            ?.tokenAmount?.decimals;
      }
      return { tokenBalance, Decimal }
    } catch (err) {
      console.log("🚀 ~ //returnnewPromise ~ err:", err)
      return { tokenBalance: 0, Decimal: 0 }
    }
  };

  /**
   * @function createProgramInstance
   * @param {}
   * @returns {programInstance}
   */

  const getProgramInstance = async (jsonfile) => {
    const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
    const anchorProvider = new anchor.AnchorProvider(connection, web3, {
      preflightCommitment: "confirmed",
    });
    anchor.setProvider(anchorProvider);
    console.log("🚀 ~ getProgramInstance ~ provider:", web3);
    const programID = new PublicKey(
      jsonfile ? jsonfile.metadata.address : idl.metadata.address
    );
    const anchorProgram = new anchor.Program(
      jsonfile ?? idl,
      programID,
      anchorProvider
    );
    programInstance = anchorProgram;
    return anchorProgram;
  };


  /**
   * @function CreateAssociatedTokenAccount
   * @param {ADD ,tokenadd, signer}
   * @returns {AssociatedTokenAccount}
   */

  const createATA = async (ADD, tokenadd, signer) => {
    console.log(
      "🚀 ~ createATA ~ ADD, tokenadd, signer:",
      ADD,
      tokenadd,
      signer
    );
    return new Promise(async (resolve, reject) => {
      try {
        const connection = new Connection(
          clusterApiUrl(Config.network),
          "confirmed"
        );
        const publicKey = new PublicKey(ADD);
        const mintAddress = new PublicKey(tokenadd); // TOKEN ADDRESS

        // Calculate the associated token account address
        const ata = await getAssociatedTokenAddress(
          mintAddress,
          publicKey,
          false, // Allow owner off curve
          TOKEN_PROGRAM_ID, //new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log("ata-->", ata.toBase58());
        // Check if the associated token account already exists
        const ataInfo = await connection.getAccountInfo(ata);
        console.log("ataInfo-->", ataInfo);
        if (ataInfo) {
          console.log(
            `Associated token account already exists: ${ata.toBase58()}`
          );
          // return ata.toBase58();
          return resolve(ata.toBase58());
        }

        // Create the associated token account
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            new PublicKey(signer), // payer (connected walllet address)
            ata, // associated token account
            publicKey, // token account owner
            mintAddress // token mint
            // TOKEN_PROGRAM_ID,//new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
            // ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
        console.log("transaction-->", transaction);
        // Sign and send the transaction (assuming you have the public key's private key)
        // Here, replace `YOUR_PRIVATE_KEY` with the actual private key of the public key
        transaction.feePayer = new PublicKey(signer);
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        console.log("blockhash-->", blockhash);
        const signed = await web3.signTransaction(transaction);
        console.log("signed-->", signed);
        const signature = await connection.sendRawTransaction(
          signed.serialize()
        );
        console.log("signature-->", signature);
        let signhash = await connection.confirmTransaction(signature);
        console.log("signhash-->", signhash);
        // return ataInfo
        resolve(ata.toBase58());
      } catch (error) {
        console.error("Error creating associated token account:", error);
        reject(error);
        return null;
      }
    });
  };

  /**
   * @function TokenApproval
   * @param {*} address
   * @param {*} approvalAddress
   * @param {*} tokenAdd
   * @param {*} amount
   * @param {*} decimal
   * @returns { status : true or false}
   */

  const tokenApprove = async (
    address,
    approvalAddress,
    tokenAdd,
    amount,
    decimal
  ) => {
    try {
      const value = decimal ? new anchor.BN(amount * 10 ** Number(decimal)) : Number(amount); //new anchor.BN(amount * 10 ** Number(decimal)); // assuming token has 9 decimal places
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      const walletPublicKey = new PublicKey(address); // from account or Owner of token
      const delegatePublicKey = new PublicKey(approvalAddress); // to account or recipiant of token
      const associatedMintTokenAddress = await createATA(address, tokenAdd, accountAddress)
      // await getAssociatedTokenAddress(
      //   new PublicKey(tokenAdd),
      //   new PublicKey(address)
      // );
      // ); // associated token acoount from owner
      console.log("associatedMintTokenAddress-->", associatedMintTokenAddress);
      const transaction = new Transaction().add(
        createApproveInstruction(
          new PublicKey(associatedMintTokenAddress),
          delegatePublicKey,
          walletPublicKey,
          value,
          [],
          TOKEN_PROGRAM_ID
        )
      );
      transaction.feePayer = new PublicKey(walletPublicKey.toString());
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      console.log("blockhash-->", blockhash);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed);
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      if (signature) {
        console.log(
          "TransactionHash",
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
      }
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);
      return { status: true, hash: signature };
    } catch (error) {
      console.log("🚀 ~ tokenApprove ~ error:", error);
      return { status: false };
    }
  }

  const Bid = async (accountAddress, tokenAddress, tokenDecimal, Amount, secKey, nftAdd) => {
    console.log("🚀 ~ Bid ~ accountAddress,tokenAddress,tokenDecimal,Amount,secKey,nftAdd:", accountAddress, tokenAddress, tokenDecimal, Amount, secKey, nftAdd)

    var delegateAddress;

    if (secKey) {
      let arrayBuffer = stringToArrayBuffer(secKey)
      delegateAddress = Keypair.fromSecretKey(Buffer.from(arrayBuffer))
    }
    else {
      delegateAddress = Keypair.generate();
    }

    let string = arrayBufferToString(delegateAddress.secretKey.buffer);
    console.log("string", string);
    const bidder = new PublicKey(accountAddress);
    const token = new PublicKey(tokenAddress);

    const nftaddress = new PublicKey(nftAdd)

    let accountInitialize = await createATA(
      bidder.toString(),
      nftaddress.toString(),
      bidder.toString()
    )

    /* Token Approve */
    const tokenapprove = await tokenApprove(
      bidder.toString(),
      delegateAddress.publicKey.toString(),
      token.toString(), // mint Token Address
      Number(Amount), // amount of Token
      Number(tokenDecimal) //token decimal
    );
    return { ...tokenapprove, delegate: string };
  }

  const buyNFT = async (delegate, nftId, nftOwner, totalPrice, NFTQuantity, nftPrice, nftMetaDataAddress) => {
    try {
      const delegateSecretKey = stringToArrayBuffer(delegate);
      const delegateKeypair = Keypair.fromSecretKey(Buffer.from(delegateSecretKey));
      const delegateAddress = delegateKeypair;
      const nftMint = new PublicKey(nftId);
      const price = new anchor.BN(Number(totalPrice) * LAMPORTS_PER_SOL);
      const single_price = new anchor.BN(Number(nftPrice) * LAMPORTS_PER_SOL);
      const nftQuantity = new anchor.BN(Number(NFTQuantity))
      const seller = new PublicKey(nftOwner);
      const buyer = new PublicKey(accountAddress);
      let program = await getProgramInstance(idl);
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const sellerATA = await getAssociatedTokenAddress(nftMint, seller);
      const buyerATA =
        await createATA(
          buyer.toString(),
          nftMint.toString(),
          buyer.toString()
        )
      const ownerPubkey = new PublicKey(owneraddress);
      const metaData = await program.account.nftMetadata.fetch(nftMetaDataAddress)
      const creator = metaData.creator;
      let transaction = await program.methods
        .buyNft(single_price, price, nftQuantity)
        .accounts({
          buyer: buyer,
          seller: seller,
          sellerNftAccount: sellerATA, 
          buyerNftAccount: buyerATA, 
          delegate: delegateAddress.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          metaAccount: new PublicKey(nftMetaDataAddress),
          ownerAccount: new PublicKey(idl.owner.address),
          owner: ownerPubkey,
          creator: creator
        })
        .transaction();

      console.log("transaction1111-,->", transaction);
      transaction.feePayer = buyer;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.sign(delegateAddress);
      console.log("blockhash-->", blockhash, transaction);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed, connection);
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      if (signature) {
        console.log(
          "TransactionHash",
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
      }
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);
      let retData = {
        HashValue: signature,
        status: true
      }
      return retData;
    } catch (err) {
      console.log("🚀 ~ buyNFT ~ err:", err);
      return { status: false }
    }
  };

  const mintNFT = async (walletAddress, metaipfs, nftName, royalty, count) => {
    try {
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      let program = await getProgramInstance(idl);
      const payer = new PublicKey(walletAddress);
      const nftCount = new anchor.BN(count ?? 1)
      const nftRoyalty = new anchor.BN(royalty * 100)
      console.log("🚀 ~ constsol_git_mintfuct= ~ payer:", payer);
      const mintAccount = Keypair.generate();
      console.log("🚀 ~ constsol_git_mintfuct= ~ mintAccount:", mintAccount);
      const tokenMetadataProgram = new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
      );
      console.log(
        "🚀 ~ constsol_git_mintfuct= ~ tokenMetadataProgram:",
        tokenMetadataProgram
      );
      const metadata = {
        name: nftName,
        symbol: "",
        uri: `${Config.IPFS}${metaipfs}`,//"https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg",
      };
      const associatedTokenAccount = getAssociatedTokenAddressSync(
        mintAccount.publicKey,
        payer
      );
      console.log(
        "🚀 ~ constsol_git_mintfuct= ~ associatedTokenAccount:",
        associatedTokenAccount
      );
      const metadataAccount = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          tokenMetadataProgram.toBuffer(),
          mintAccount.publicKey.toBuffer(),
        ],
        tokenMetadataProgram
      )[0];
      const editionAccount = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          tokenMetadataProgram.toBuffer(),
          mintAccount.publicKey.toBuffer(),
          Buffer.from("edition"),
        ],
        tokenMetadataProgram
      )[0];
      const tokenProgram = TOKEN_PROGRAM_ID;
      const associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
      const systemProgram = SystemProgram.programId;
      console.log("🚀 ~ constsol_git_mintfuct= ~ systemProgram:", systemProgram);
      const rent = new PublicKey("SysvarRent111111111111111111111111111111111");

      const nftMetadata = Keypair.generate()

      let accounts = {
        nftMetadata: nftMetadata.publicKey,
        payer: payer.toString(),
        metadataAccount,
        editionAccount,
        mintAccount: mintAccount.publicKey.toString(),
        associatedTokenAccount,
        tokenProgram,
        tokenMetadataProgram,
        associatedTokenProgram,
        systemProgram,
        rent,
      };

      let transaction = await program.methods
        .mintNft(
          metadata.name,
          metadata.symbol,
          metadata.uri,
          nftCount,
          nftRoyalty,
        )
        .accounts(accounts)
        .signers([mintAccount, nftMetadata])
        .transaction();
      console.log("transaction-->", transaction);

      transaction.feePayer = payer;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.sign(mintAccount, nftMetadata);
      console.log("blockhash-->", blockhash, transaction);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed, connection);
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      if (signature) {
        console.log(
          "TransactionHash",
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
      }
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);

      let retData = {
        status: true,
        HashValue: signature,
        nftId: mintAccount.publicKey.toString(),
        nftMetadata: nftMetadata.publicKey.toString(),
        metadata_account: metadataAccount.toString()
      }
      return retData;
    } catch (err) {
      console.log("🚀 ~ mintNFT ~ err:", err)
      return { status: false }
    }
  };

  const AcceptBid = async (tokenAmt, decimal, nftQuantity, delegateSecKey, NftId, bidder, tokenAdd, nftmetatdataaddress,nftTotal) => {
    try {
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      console.log("🚀 ~ AcceptBid ~ connection:", connection)
      let program = await getProgramInstance(idl);
      const amount = new anchor.BN(Number(tokenAmt) * 10 ** Number(decimal))
      const count = new anchor.BN(Number(nftQuantity) * 10 ** 0)
      const totalprice = new anchor.BN(Number(nftTotal) * 10 ** Number(decimal))
      const delegateSecretKey = stringToArrayBuffer(delegateSecKey);
      const delegateAddress = Keypair.fromSecretKey(Buffer.from(delegateSecretKey));;
      const nftaddress = new PublicKey(NftId);
      const seller = new PublicKey(accountAddress) // sellerAddress;
      const tokenaddress = new PublicKey(tokenAdd);
      const buyer = new PublicKey(bidder);
      const sellerNftAccount = await getAssociatedTokenAddress(nftaddress, seller)
      const buyerNftAccount = await getAssociatedTokenAddress(nftaddress, buyer)
      const sellerTokenAccount = await getAssociatedTokenAddress(tokenaddress, seller)
      const buyerTokenAccount = await getAssociatedTokenAddress(tokenaddress, buyer)
      const tokenProgram = TOKEN_PROGRAM_ID
      const systemProgram = SystemProgram.programId

      const ownerPubkey = new PublicKey(owneraddress);
      const ownerTokenAccount = await createATA(
        ownerPubkey.toString(),
        tokenaddress.toString(),
        accountAddress.toString()
      );


      const metaData = await program.account.nftMetadata.fetch(nftmetatdataaddress)
      const creator = metaData.creator;
      const creatorTokenAccount = await createATA(
        creator.toString(),
        tokenaddress.toString(),
        accountAddress.toString()
      );


      const transaction = await program.methods.acceptBid(amount,totalprice, count)
        .accounts({
          buyer,
          seller,
          sellerNftAccount,
          buyerNftAccount,
          sellerTokenAccount,
          buyerTokenAccount,
          delegate: delegateAddress.publicKey,
          tokenProgram,
          systemProgram,
          mint: tokenaddress,
          ownerAccount: new PublicKey(idl.owner.address),
          ownerTokenAccount: ownerTokenAccount,
          metaAccount: nftmetatdataaddress,
          creatorTokenAccount: creatorTokenAccount
        })
        .transaction()

      transaction.feePayer = new PublicKey(accountAddress);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.sign(delegateAddress);
      console.log("blockhash-->", blockhash, transaction);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed, connection);
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      if (signature) {
        console.log(
          "TransactionHash",
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
      }
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);
      return { status: true, HashValue: signature };
    } catch (err) {
      console.log("🚀 ~ AcceptBid ~ err:", err)
      return { status: false }
    }
  }

  const buyNftWithToken = async (tokenAmt, decimal, nftQuantity, delegate, NftId, owner, tokenAdd, nftTotal, nftmetatdataaddress) => {
    try {
      console.log('buyNftWithToken-->',)
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      let program = await getProgramInstance(idl);
      const amount = new anchor.BN(Number(tokenAmt) * 10 ** Number(decimal))
      const count = new anchor.BN(Number(nftQuantity) * 10 ** 0)
      const totalprice = new anchor.BN(Number(nftTotal) * 10 ** Number(decimal))
      const delegateSecretKey = stringToArrayBuffer(delegate);
      const delegateKeypair = Keypair.fromSecretKey(Buffer.from(delegateSecretKey));
      const delegateAddress = delegateKeypair;
      const nftaddress = new PublicKey(NftId);
      const seller = new PublicKey(owner);
      const tokenaddress = new PublicKey(tokenAdd);
      const buyer = new PublicKey(accountAddress);
      const sellerNftAccount = await getAssociatedTokenAddress(nftaddress, seller)
      const buyerNftAccount = await createATA(
        buyer.toString(),
        nftaddress.toString(),
        buyer.toString()
      );
      const sellerTokenAccount = await getAssociatedTokenAddress(tokenaddress, seller)
      const buyerTokenAccount = await createATA(
        buyer.toString(),
        tokenaddress.toString(),
        buyer.toString()
      )
      const tokenProgram = TOKEN_PROGRAM_ID
      const systemProgram = SystemProgram.programId
      const ownerPubkey = new PublicKey(owneraddress)
      console.log("🚀 ~ buyNftWithToken ~ owneraddress:", owneraddress)
      const ownerTokenAccount = await createATA(
        ownerPubkey.toString(),
        tokenaddress.toString(),
        buyer.toString()
      );
      const metaData = await program.account.nftMetadata.fetch(nftmetatdataaddress)
      console.log("🚀 ~ buyNFT ~ metaData:", metaData)
      const creator = metaData.creator;
      const creatorTokenAccount = await createATA(
        creator.toString(),
        tokenaddress.toString(),
        buyer.toString()
      );
      const transaction = await program.methods.buyNftWithToken(amount, totalprice, count)
        .accounts({
          buyer,
          seller,
          sellerNftAccount,
          buyerNftAccount,
          sellerTokenAccount,
          buyerTokenAccount,
          delegate: delegateAddress.publicKey,
          tokenProgram,
          systemProgram,
          mint: tokenaddress,
          ownerAccount: new PublicKey(idl.owner.address),
          ownerTokenAccount: ownerTokenAccount,
          metaAccount: nftmetatdataaddress,
          creatorTokenAccount: creatorTokenAccount
        })
        .transaction()

      transaction.feePayer = new PublicKey(accountAddress);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.sign(delegateAddress);
      console.log("blockhash-->", blockhash, transaction);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed, connection);
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      if (signature) {
        console.log(
          "TransactionHash",
          `https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
      }
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);
      return { status: true, HashValue: signature };
    } catch (err) {
      console.log("🚀 ~ buyNftWithToken ~ err:", err)
      return { status: false }
    }
  }


  const nftDelegateApprove = async (
    walletAddress,
    nftAddress
  ) => {
    try {
      const delegateAddress = Keypair.generate();
      console.log(
        "🚀 ~ nftDelegateApprove ~ delegateAddress:",
        delegateAddress.publicKey.toString()
      );

      let string = arrayBufferToString(delegateAddress.secretKey.buffer);
      console.log("string", string);

      // let arraybuffer = stringToArrayBuffer(string);
      // console.log("arraybuffer:", arraybuffer);

      const seller = new PublicKey(walletAddress);
      // const nftMint = mintAddress;
      // console.log("🚀 ~ nftDelegateApprove ~ nftMint:", nftMint);
      /* Token Approve */
      const tokenapprove = await tokenApprove(
        seller.toString(),
        delegateAddress.publicKey.toString(),
        nftAddress.toString(), // mint Token Address
        1 // amount of Token
      );

      let retData = {
        status: tokenapprove.status,
        hash: tokenapprove.hash,
        delegateSecKey: string
      }
      return retData;
    } catch (err) {
      return {
        status: false
      }
    }
  };



  const cancel_approveOrBid = async (tokenAdd, owner) => {
    try {
      const connection = new Connection(clusterApiUrl(Config.network), "confirmed");
      const payer = new PublicKey(owner);
      const token_mint_address = new PublicKey(tokenAdd)
      const ATA = await getAssociatedTokenAddress(token_mint_address, payer)
      const transaction = new Transaction().add(
        createRevokeInstruction(
          ATA,
          payer,
        )
      );
      transaction.feePayer = payer;
      console.log("🚀 ~ constcancel_approveOrBid= ~ transaction:", transaction)
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      console.log("blockhash-->", blockhash);
      const signed = await web3.signTransaction(transaction);
      console.log("signed-->", signed, signed.serialize());
      const signature = await connection.sendRawTransaction(signed.serialize());
      console.log("signature-->", signature);
      let signhash = await connection.confirmTransaction(signature);
      console.log("signhash-->", signhash);
      let status = await getTransactionstatus(signature);
      return { status: true };
    } catch (err) {
      console.log("🚀 ~ constcancel_approve= ~ err:", err)
      return { status: false }
    }

  }

  const getServiceFees = async () => {
    try {
      const program = await getProgramInstance(idl)
      console.log("🚀 ~ getServiceFees ~ program:", program)
      const accountData = await program.account.accountData.fetch(idl.owner.address);
      console.log("🚀 ~ getFeeDetails ~ accountData:", accountData)
      return accountData
    } catch (err) {
      console.log("🚀 ~ getFeeDetails ~ err:", err)
      return {}
    }
  }


  return {
    Walletconnect,
    getTokenbalance,
    getProgramInstance,
    tokenApprove,
    buyNFT,
    mintNFT,
    Contract_Base_Validation,
    Bid,
    AcceptBid,
    buyNftWithToken,
    nftDelegateApprove,
    cancel_approveOrBid,
    getServiceFees
  };
}
