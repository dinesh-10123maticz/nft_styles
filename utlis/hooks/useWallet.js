
import Config from '../../Config/config'

import axios from 'axios';


/* for Get Program Instance NPM */
import * as anchor from '@project-serum/anchor';

/* Core Solana NPM funtions */
import {
    Connection,
    LAMPORTS_PER_SOL,
    Transaction,
    clusterApiUrl,
    PublicKey,
} from "@solana/web3.js";

/* Solana Wallet Adapters */
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  SolletExtensionWalletAdapter
} from '@solana/wallet-adapter-wallets';

/* Solana Mobile wallet adapter */
import {
  SolanaMobileWalletAdapter,
  createDefaultAuthorizationResultCache,
  createDefaultAddressSelector,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

/* Solana Math Wallet connect Adapter */
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect';




export const connectWallet = async (type) => {
  console.log('typetypetype-->',type)
    var accountDetails = {}
    var web3Obj = {}
  
    if (type == "phantom" || type == 'math' || type=='solana' ) {
      web3Obj = await solanaWallet(type)
      console.log("webobjadaws", web3Obj)
    }
  
    if ( web3Obj && Object.keys(web3Obj)?.length != 0) {
      console.log("get Web3", web3Obj)
      try {
        accountDetails.accountAddress = web3Obj.add
        accountDetails.web3p = web3Obj.provider;
        accountDetails.coinBalance = web3Obj.bal
        accountDetails.web3 = web3Obj.provider;
        accountDetails.tokenBalance = 0
        console.log("acocococococo", accountDetails);
       localStorage.setItem("walletConnectType",type)
        return accountDetails;
      }
      catch (e) {
        console.log("find ee", e)
      }
    }
    else{
      return {}
    }
  }
  
  export const solanaWallet = async (type) => {
    console.log("🚀 ~ solanaWallet ~ type:", type)
    const network = clusterApiUrl('devnet')
        try {
            let walletAdapter;
            if (type === "math") {
                if (isMobileOrTablet()) {

                    /* Mobile Walletconncet */
                    walletAdapter = new WalletConnectWalletAdapter({
                        network,
                        options: {
                            relayUrl: 'wss://relay.walletconnect.com',
                            projectId: 'b8a1daa2dd22335a2fe1d2e139980ae0',
                            metadata: {
                                name: 'Example App', // App Name
                                description: 'Example App', // App Description
                                url: 'https://200.140.70.236:3001/walcon', // App Frontend URL
                                icons: ['https://avatars.githubusercontent.com/u/35608259?s=200'], // App Logo
                            },
                        },
                    })
                } else {
                    /* Math wallet Extension */
                    walletAdapter = new MathWalletAdapter({ network })
                }
            }
            if (type === "mobile") {
                /* Solana Mobile wallet Adapter (panthom , solfare) */
                walletAdapter = new SolanaMobileWalletAdapter({
                    addressSelector: createDefaultAddressSelector(),
                    appIdentity: {
                        name: 'My app', //App Name
                        uri: 'https://200.140.70.236:3001/walcon', //App
                        icon: 'public/logo512.png',
                    },
                    authorizationResultCache: createDefaultAuthorizationResultCache(),
                    cluster: 'devnet',
                    onWalletNotFound: createDefaultWalletNotFoundHandler(),
                });
            }
            if (type === "phantom") {
                /* Panthom wallet adapter */
                walletAdapter = new PhantomWalletAdapter()
            }
            if(type == "solana"){
              walletAdapter = new SolletExtensionWalletAdapter({network : "devnet"})
            }
            if (type === "solfare") {
                /* Solfare wallet adapter */
                walletAdapter = new SolflareWalletAdapter()
            }

            /* Wallet connections */
            await walletAdapter.connect();
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            let bal = await connection.getBalance(walletAdapter.publicKey)
            let provider = walletAdapter
                
            const tokenBalance = await getTokenbalance(walletAdapter?.publicKey.toString())
            return { provider, add: walletAdapter?.publicKey.toString(), bal: (bal / LAMPORTS_PER_SOL) , tokenBalance :  tokenBalance.tokenBalance , decimal : tokenBalance.Decimal }
        } catch (error) {
            console.log("🚀 ~ solanaWal ~ error:", error)
            if (type === "math") {
                let walletAdapter = new MathWalletAdapter({ network })
                if (walletAdapter.readyState === 'NotDetected') {
                    window.alert("Math Wallet not Detected , make sure panthom is not exist")
                } else {
                    window.alert("Make Sure youre Wallet was unlocked")
                }
                return {}
            }
        }
  }



  const getTokenbalance = async (walletAddress, tokenAddress) => {
    try{
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
            mint: Config.erc20Address ,//tokenAddress, // token mint address
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
    return { tokenBalance, Decimal };
  }
  catch(err){
    return {tokenBalance : 0, Decimal : 0 }
  }
  };

  function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

export const getServiceFees = async (Address) => {
  // var rpcObj = new Web3(Config.RPC_URL)
  // var fees = {}
  // if (rpcObj) {
  //   try {
  //     var marketObj = new rpcObj.eth.Contract(
  //       marketAbi,
  //       Config.TradeContract
  //     );
  //     var alreadylist = await marketObj.methods.whitLisrUsers(Address).call();
  //     var servicefees = await marketObj.methods.getServiceFee().call()
  //     var contractobj = await marketObj.methods.NativeAddress().call()
  //     console.log("alreadylist", alreadylist, servicefees);
  //     if (alreadylist) {
  //       fees.buyerFees = '0'
  //       fees.sellerFees = '0'
  //       fees.buyerFeesNative = '0'
  //       fees.sellerFeesNative = '0'
  //       fees.NativeToken = ""
  //     } else {
  //       fees.buyerFees = servicefees[0]
  //       fees.sellerFees = servicefees[1]
  //       fees.buyerFeesNative = servicefees[2]
  //       fees.sellerFeesNative = servicefees[3]
  //       fees.NativeToken = contractobj
  //     }

  //     return fees;
  //   }
  //   catch (e) {
  //     console.log("service fees catch blok running", e)
  //   }
  // }
}


