//wallet adapter
import { useWallet } from "@solana/wallet-adapter-react";

//solana
import { clusterApiUrl,LAMPORTS_PER_SOL} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor'

export default function UseSolana ()  {
  
    const {  select , wallets, publicKey, disconnect } = useWallet();

     const connectWallet = async (type) => {
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

         const solanaWallet = async (type) => {
          var web3
          try {
        
             const {solana}=window
             console.log('log-->',solana.isPhantom)
            if(solana && solana.isPhantom && type === 'phantom'){
              // let resp = await solana.connect()
              localStorage.setItem("accountInfo", publicKey.toString())
                  localStorage.setItem('walletConnectType', type)
                  const SOLANA_HOST = clusterApiUrl(Config.network,true)
                  console.log('SOLANA_HOST-->',SOLANA_HOST,Config.network)
                  const connection = new anchor.web3.Connection(SOLANA_HOST)
                  const balance = await connection.getBalance(publicKey)
                  let lamportBalance=(balance / LAMPORTS_PER_SOL)
                   web3 = {provider : solana , add : publicKey.toString() , bal : lamportBalance }
            }
            if(solana && solana.isMathWallet && type === 'math'){
              // let resp = await solana.connect()
              localStorage.setItem("accountInfo", publicKey.toString())
                  localStorage.setItem('walletConnectType', type)
                  const SOLANA_HOST = clusterApiUrl(Config.network)
                  const connection = new anchor.web3.Connection(SOLANA_HOST)
                  const balance = await connection.getBalance(resp.publicKey)
                  let lamportBalance=(balance / LAMPORTS_PER_SOL)
                   web3 = {provider : solana , add : publicKey.toString() , bal : lamportBalance }
            }
          } catch (e) {
            console.log("accountDetails type id1 last", e)
          }
          return web3;
        }

}