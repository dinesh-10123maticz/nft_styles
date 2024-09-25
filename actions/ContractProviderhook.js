import { useSelector } from 'react-redux';
import ERC721 from '../ABI/erc721.json'
import ERC1155 from '../ABI/erc1155.json'
import DETH from '../ABI/erc20.json'
import Market from '../ABI/market.json'
import config from '../config'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import Web3 from 'web3';
import marketAbi from '../ABI/market.json'
import { isEmpty } from './common';
import {NftbalanceUpdate} from '../actions/axios/nft.axios'
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import * as Wagmi from 'wagmi'

// import Web3Utils from 'web3-utils'
import { writeContract, prepareWriteContract } from '@wagmi/core'
import { createPublicClient, http, webSocket, createWalletClient } from 'viem'
import { mainnet, avalancheFuji , bscTestnet , polygon} from 'viem/chains'
var web3s = new Web3(config.RPC_URL)

const publicClientt = createPublicClient({
    chain:  config.CHAIN_ID == 137 ? polygon : bscTestnet,
    transport: http()
})

const walletClient = createWalletClient({
    chain: bscTestnet,
    transport: http()
})

var web3s = new Web3(config.RPC_URL)



export default function useContractProviderHook() {
    var Tokens = Wagmi.useToken({
        address: '0xEb4fFed6B324b5FdC4d72AD3dA75bf1Fb2bB004A',
    })
    const { accountAddress, web3, web3p, coinBalance,type } = useSelector(state => state.LoginReducer.AccountDetails);
    const { sellerFees, buyerFees, buyerFeesNative, sellerFeesNative } = useSelector(state => state.LoginReducer.ServiceFees);
    const publicClient = createPublicClient({
        chain: config.CHAIN_ID == 137 ? polygon : bscTestnet,
        transport: http()
    })


    const Contract_Base_Validation = () => {
        if (!web3) return 'Connect Your Wallet'
        if (!accountAddress) return 'Connect Your Wallet'
        if (!coinBalance) return "You Don't have Enough Balance"
        else return ''
    }
    
    const ReadContract_creation = async (...data) => {
        if (web3p) {
            var contract_value = await new web3p.eth.Contract(
                ...data
            );
            return contract_value;
        }
    }

    const contrat_connection = async (...data) => {
    
   
        if (web3) {
            var contract_value = await new web3.eth.Contract(
                ...data
            );
          
            return contract_value;
        }
    }

    // const GetApproveStatus = async (data, Addr) => {
    //     try {
    //         var ConnectContract = await contrat_connection(data == 'Single' ? ERC721 : ERC1155, Addr)
    //         var contract_Method_Hash = await
    //             ConnectContract
    //                 .methods
    //                 .isApprovedForAll(accountAddress, config.TradeContract)
    //                 .call()
    //         return contract_Method_Hash

    //     }
    //     catch (e) {
    //         return 'error'
    //     }
    // }


// code for coinbase 


const GetApproveStatus = async (data, Addr) => {
    try {
        var ConnectContract = await ReadContract_creation(data == 'Single' ? ERC721 : ERC1155, Addr)
        var contract_Method_Hash = await
            ConnectContract
                .methods
                .isApprovedForAll(accountAddress, config.TradeContract)
                .call()
        return contract_Method_Hash

    }
    catch (e) {
        return 'error'
    }
}


    const SetApproveStatus = async (data, Addr) => {
        try {
// added if for coinbase
            if (type == "CoinbaseMobile") {
                const { hash } = await writeContract({
                    address: Addr,
                    abi: data == 'Single' ? ERC721 : ERC1155,
                    functionName: 'setApprovalForAll',
                    args: [config.TradeContract, true],
                    account: accountAddress
                })
                let receipt = await get_receipt(hash);
                console.log("receipt", receipt);
                var need_data = {
                    status: receipt.status,
                    HashValue: receipt.transactionHash,
                }
                return need_data;

            }else
            {




            let ConnectContract = await contrat_connection(data == 'Single' ? ERC721 : ERC1155, Addr)
            let contractobj = await
                ConnectContract
                    .methods
                    .setApprovalForAll(config.TradeContract, true)

            // let encoded = await ConnectContract.methods.setApprovalForAll(config.TradeContract, true).encodeABI();
            // var gasfeecalculated = await GetGasFees(encoded,Addr);
            let gasprice = await web3.eth.getGasPrice();
            let gas_estimate = await contractobj.estimateGas({ from: accountAddress })
            if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
            let contract_Method_Hash = await
                ConnectContract
                    .methods
                    .setApprovalForAll(config.TradeContract, true)
                    .send({
                        from: accountAddress,
                        gasLimit: parseInt(gas_estimate),
                        gasPrice: gasprice,
                    })
                    .on('transactionHash', (transactionHash) => {
                        return transactionHash
                    })

            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);

            let need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            console.log("enna varra", need_data);
            return need_data;
        }
        }
        catch (e) {
            console.log("setapproveerr", e)
            return false
        }
    }

    const get_receipt = async (HashValue) => {
        let receipt;
        do {
            receipt = await web3s.eth.getTransactionReceipt(HashValue);
        } while (!receipt)
        if (receipt?.status) {
            return receipt
        }

    }
    const minting_721_1155 = async (...data) => {
        try {
// if blog for coin base 
            if (type == "CoinbaseMobile") {

                const { hash } = await writeContract({
                    address: config.TradeContract,
                    abi: Market,
                    functionName: 'minting',
                    args: [...data],
                    account: accountAddress
                })

                var receipt = await get_receipt(hash);
                var TokenCOunts = Web3Utils.hexToNumber(receipt.logs[2].topics[2])
                console.log("receipt", receipt);
                if (receipt) {
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                        tokenCounts: TokenCOunts
                    }
           
                    return need_data;
                }

            }

            const ConnectContract = await contrat_connection(Market, config.TradeContract)
            var contractobj = await
                ConnectContract
                    .methods
                    .minting(...data)
            var gasprice = await web3.eth.getGasPrice();
            var gas_estimate = await contractobj.estimateGas({ from: accountAddress })
            console.log("trustwallllleeeegasssfeebefore" ,gas_estimate  )  
            if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100

            console.log("trustwallllleeeegasssfeeafter" ,gas_estimate  )  
            var contract_Method_Hash = await
                ConnectContract
                    .methods
                    .minting(...data)
                    .send({
                        from: accountAddress,
                        gasLimit: parseInt(gas_estimate),
                        gasPrice: gasprice,
                    })
                    .on('transactionHash', (transactionHash) => {
                        return transactionHash
                    })
            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
           
            if (!isEmpty(receipt)) {
                let TokenCOunts = Web3?.utils?.hexToNumber(receipt.logs[2].topics[2])
                if (TokenCOunts) {
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                        tokenCounts: TokenCOunts
                    }
                    return need_data
                }
            }
        }
        catch (e) {
            console.log("minting_721_1155 err", e);
            return false
        }


    }

    //new getowneraddress
    const getAddress = async () => {
        try {
            const ConnectContract = await contrat_connection(Market, config.TradeContract)
            var contractobj = await
                ConnectContract.methods.owner().call()
            // var gasprice = await web3.eth.getGasPrice();
            // var gas_estimate = await contractobj.estimateGas({ from: accountAddress })
            // var contract_owner = await
            //     ConnectContract
            //         .methods
            //         .owner(...data)
            //         .send({ 
            //             from: accountAddress,
            //             gasLimit: parseInt(gas_estimate),
            //             gasPrice: gasprice,
            //         })
            return contractobj
        }
        catch (e) {
            console.log("getAddress_err", e);
            return 'error'
        }


    }


    const approve_721_1155 = async (token_address, ...data) => {
        const token = token_address


        try {

                  if (type == "CoinbaseMobile") {
                console.log("INSIDE", accountAddress);
                console.log("LLLCHIAN", [...data]);
                try {

                    console.log("simulate Contracy : ", token, token_address)
                    const { request } = await publicClientt.simulateContract({
                        abi: [{
                            "constant": false,
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "spender",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "name": "approve",
                            "outputs": [
                                // {
                                //     "internalType": "bool",
                                //     "name": "",
                                //     "type": "bool"
                                // }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        }],
                        address: token,
                        args: [...data],
                        chain: config.CHAIN_ID == 137 ? polygon : bscTestnet,
                        functionName: "approve",
                        account: accountAddress
                    })

                    // const { request } = await prepareWriteContract({
                    //         address: token_address,
                    //         abi: DETH,
                    //         functionName: "approve",
                    //         args: [...data],
                    //         account: accountAddress
                    // })

                    console.log("reqqq", request);

                    const { hash } = await writeContract(request)

                    // const { hash } = await writeContract({
                    //     address: token_address,
                    //     abi: DETH,
                    //     functionName: 'approve',
                    //     args: [...data]
                    // })

                    // console.log("HASHFOR", hash)

                    // const { hash } = useContractWrite({
                    //     address: token_address,
                    //     abi: DETH,
                    //     functionName: 'approve',
                    //     args: [...data],
                    //     account: accountAddress
                    //   })
                    // const hash = ContractCall.useContractProvider(token_address, accountAddress ,...data)

                    const receipt = await get_receipt(hash);
                    console.log("receipt", receipt);
                    if (receipt) {
                        var need_data = {
                            status: receipt.status,
                            HashValue: receipt.transactionHash,
                        }
                        console.log("enna varra", need_data);
                        return need_data;
                    }
                } catch (err) {
                    console.log("simulateContract", err);
                }

            }  else {
            const ConnectContract = await contrat_connection(DETH, token_address)
            var contractobj = await
                ConnectContract
                    .methods
                    .approve(...data)
            // console.log("sdgjhfsjkghfs",...data,token_address);
            // let encoded = await ConnectContract.methods
            // .approve(...data).encodeABI();

            // var gasfeecalculated = await GetGasFees(encoded,config.TradeContract);
            var gasprice = await web3.eth.getGasPrice();
            var gas_estimate = await contractobj.estimateGas({ from: accountAddress })
            
            if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
            var contract_Method_Hash = await
                ConnectContract
                    .methods
                    .approve(...data)
                    .send({
                        from: accountAddress,
                        gasLimit: parseInt(gas_estimate),
                        gasPrice: gasprice,
                    })
                    .on('transactionHash', (transactionHash) => {
                        return transactionHash
                    })
            console.log("hassssh", contract_Method_Hash);
            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
            var need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            return need_data
        }
    }
        catch (e) {
            console.error("ERRRRR", e)
            return false
        }
    }



    const Token_Balance_Calculation = async (token_Address, data) => {
//for coinbase
        // try {
        //     const ConnectContract = await contrat_connection(DETH, token_Address)
        //     var bidAMt = await ConnectContract.methods.balanceOf(data).call();
        //     var tokenbal = Number(web3?.utils?.fromWei(String(bidAMt)))

        //     if (Math.abs(tokenbal) < 1.0) {
        //         var e = parseInt(tokenbal.toString().split('e-')[1]);
        //         if (e) {
        //             tokenbal *= Math.pow(10, e - 1);
        //             tokenbal = '0.' + (new Array(e)).join('0') + tokenbal.toString().substring(2);
        //         }
        //     } else {
        //         var e = parseInt(tokenbal.toString().split('+')[1]);
        //         if (e > 20) {
        //             e -= 20;
        //             tokenbal /= Math.pow(10, e);
        //             tokenbal += (new Array(e + 1)).join('0');
        //         }
        //     }
        //     console.log("WEWEW", tokenbal, typeof (tokenbal))

        //     return Number(tokenbal).toFixed(10)
        // }


  try {
            console.log('adddrreeeessss', token_Address, data)
            const ConnectContract = await ReadContract_creation(DETH, token_Address)
            var bidAMt = await ConnectContract.methods.balanceOf(data).call();

            return Number(web3.utils.fromWei(String(bidAMt)))
        }

        catch (e) {

            return 0
        }
    }
    var buy_bid_price_calculation = (val, decimal, data) => {
        console.log("val, decimal, data", val, decimal, data);
        var toMid = Number(val) * 1000000
        var buyfee = data ? web3p?.utils?.fromWei(String(buyerFeesNative ? buyerFeesNative : 1)) : web3p?.utils?.fromWei(String(buyerFees ? buyerFees : 1))
        var serfee = (toMid / 100000000) * (buyfee * 1000000)
        var totfee = serfee + toMid
        var tot2cont = web3?.utils?.toWei(String(Number(totfee / 1000000)).length > 18 ? String(Number(totfee / 1000000).toFixed(18)) : String(Number(totfee / 1000000)))
        var dec = decimal == 18 ? 18 : 18 - (decimal);
        var aprrove = ((tot2cont) / 10 ** dec)
        console.log("aprrove", aprrove);
        return (aprrove)
    }


    const cancel_order_721_1155 = async (data) => {
        try {
                // if for coin base 
            if (type == "CoinbaseMobile") {
                const { hash } = await writeContract({
                    address: config.TradeContract,
                    abi: Market,
                    functionName: 'cancelOrder',
                    args: [data],
                    account: accountAddress
                })
                console.log("HASHFOR", hash)

                const receipt = await get_receipt(hash);
                console.log("receipt", receipt);
                if (receipt) {
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    console.log("enna varra", need_data);
                    return need_data;
                }

            }

            var ConnectContract = await contrat_connection(Market, config.TradeContract)
            var contractobj = await
                ConnectContract
                    .methods
                    .cancelOrder(data)
            var gasprice = await web3.eth.getGasPrice();

            var gas_estimate = await contractobj.estimateGas({ from: accountAddress })
            if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
            var contract_Method_Hash = await
                ConnectContract
                    .methods
                    .cancelOrder(data)
                    .send({
                        from: accountAddress,
                        gasLimit: parseInt(gas_estimate),
                        gasPrice: gasprice,


                    })
                    .on('transactionHash', (transactionHash) => {
                        return transactionHash
                    })
            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
            var need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            return need_data;
        }
        catch (e) {
            console.log("cancel_order_721_1155", e);
            return false
        }

    }

    var price_calculation = (data, roy, check) => {
        try {

            var price = web3?.utils?.toWei(data);
            var Sellfee = check ? sellerFeesNative : sellerFees
            var service_from_val = ((price * (Sellfee)) / 1e20)
            var royal_from_val = ((price * (roy * 1e18)) / 1e20)
            var my_val = 0, my_val_royal = 0, getVal = 0;
            if (String(service_from_val).includes('.') && String(service_from_val).split('.').pop().length > 18)
                my_val = service_from_val.toFixed(18)
            else
                my_val = service_from_val

            if (String(royal_from_val).includes('.') && String(royal_from_val).split('.').pop().length > 18)
                my_val_royal = royal_from_val.toFixed(18)
            else
                my_val_royal = royal_from_val
            var whole_val = (((price)) - my_val) / 1e18
            if (String(whole_val).includes('.') && String(whole_val).split('.').pop().length > 18)
                getVal = whole_val.toFixed(18)
            else
                getVal = whole_val
            //console(data, getVal, sellerFees, my_val, my_val_royal)




            if (Math.abs(getVal) < 1.0) {
                var e = parseInt(getVal.toString().split('e-')[1]);
                if (e) {
                    getVal *= Math.pow(10, e - 1);
                    getVal = '0.' + (new Array(e)).join('0') + getVal.toString().substring(2);
                }
            } else {
                var e = parseInt(getVal.toString().split('+')[1]);
                if (e > 20) {
                    e -= 20;
                    getVal /= Math.pow(10, e);
                    getVal += (new Array(e + 1)).join('0');
                }
            }




            console.log('kdjhkgjksdfg', getVal, typeof (getVal))

            return Number(getVal).toFixed(10)

        }
        catch (e) {
            return false
        }
    }


    const place_order_721_1155 = async (...data) => {
        try {

//if for coin base 
            if (type == "CoinbaseMobile") {
                const { hash } = await writeContract({
                    address: config.TradeContract,
                    abi: Market,
                    functionName: 'orderPlace',
                    args: [...data],
                    account: accountAddress
                })
                console.log("HASHFOR", hash)

                const receipt = await get_receipt(hash);
                console.log("receipt", receipt);
                if (receipt) {
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                    }
                    console.log("enna varra", need_data);
                    return need_data;
                }

            }

            let ConnectContract = await contrat_connection(Market, config.TradeContract)
            let encoded = await ConnectContract.methods
                .orderPlace(...data).encodeABI();
            let gasfeecalculated = await GetGasFees(encoded, config.TradeContract);

            let contract_Method_Hash = await
                ConnectContract.methods
                    .orderPlace(...data)
                    .send({
                        from: accountAddress,
                        gasLimit: parseInt(gasfeecalculated?.gasdata * 1.5, 10),
                        gasPrice: gasfeecalculated?.gasPrice,
                    })
                    .on('transactionHash', (transactionHash) => {
                        return transactionHash
                    })
            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
            let need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            return need_data
        }
        catch (e) {
            console.error("place_order_721_1155", e)
            return false
        }

    }


    const buy_721_1155 = async (Send, CoinName, ...data) => {
        try {
            console.log("Send, CoinName, ...data", Send, CoinName, ...data);
            const ConnectContract = await contrat_connection(Market, config.TradeContract)




            if (CoinName === config?.COIN_NAME) {

                if (type == "CoinbaseMobile") {




                    const { request } = await publicClient.simulateContract({
                        address: config.TradeContract,
                        abi: Market,
                        functionName: 'saleToken',
                        args: [...data],
                        account: accountAddress,
                        value: Send,
                    })
                    const { hash } = await writeContract(request)
                    console.log("HASHFOR", hash)

                    const receipt = await get_receipt(hash);
                    console.log("receipt", receipt);
                    if (receipt) {
                        var need_data = {
                            status: receipt.status,
                            HashValue: receipt.transactionHash,
                        }
                        console.log("enna varra", need_data);
                        return need_data;
                    }

                }else{

                console.log("comming on sale Token");
                var contractobj = await
                    ConnectContract
                        .methods
                        .saleToken(...data)

                var gasprice = await web3.eth.getGasPrice();
                var gas_estimate = await contractobj.estimateGas({ from: accountAddress, value: Send })
                if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
                var contract_Method_Hash = await
                    ConnectContract
                        .methods
                        .saleToken(...data)
                        .send({
                            from: accountAddress,
                            value: Send,
                            gasLimit: parseInt(gas_estimate),
                            gasPrice: gasprice,
                        })
                        .on('transactionHash', (transactionHash) => {
                            return transactionHash
                        })
            }}
            else {

                if (type == "CoinbaseMobile") {
                    console.log("COINNNNNNNNN")
                    const { request } = await publicClient.simulateContract({
                        address: config.TradeContract,
                        abi: Market,
                        functionName: 'saleWithToken',
                        args: [CoinName, ...data],
                        account: accountAddress
                    })
                    const { hash } = await writeContract(request)

                    console.log("HASHFOR", hash)

                    const receipt = await get_receipt(hash);
                    console.log("receipt", receipt);
                    if (receipt) {
                        var need_data = {
                            status: receipt.status,
                            HashValue: receipt.transactionHash,
                        }
                        console.log("enna varra", need_data);
                        return need_data;
                    }

                }
                else {


                // let encoded = await ConnectContract.methods
                // .saleWithToken(CoinName,...data).encodeABI();

                // var gasfeecalculated = await GetGasFees(encoded,config.TradeContract);
                var contractobj = await
                    ConnectContract
                        .methods
                        .saleWithToken(CoinName, ...data)

                var gasprice = await web3.eth.getGasPrice();
                var gas_estimate = await contractobj.estimateGas({ from: accountAddress })
                if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
                var contract_Method_Hash = await
                    ConnectContract
                        .methods
                        .saleWithToken(CoinName, ...data)
                        .send({
                            from: accountAddress,
                            gasLimit: parseInt(gas_estimate),
                            gasPrice: gasprice,
                        })
                        .on('transactionHash', (transactionHash) => {
                            return transactionHash
                        })
                    }
            }
            console.log("dsdfgfgdfg", contract_Method_Hash);
            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
            var need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            return need_data
        }
        catch (e) {
            console.error("ERREEER", e)
            return false
        }

    }
    const allowance_721_1155 = async (token_Address, data) => {

        try {
            // commented for coin base 
            // const ConnectContract = await contrat_connection(DETH, token_Address)
            const ConnectContract = await ReadContract_creation(DETH, token_Address)
            var contract_Method_Hash = await
                ConnectContract
                    .methods
                    .allowance(data, config.TradeContract)
                    .call()
            return contract_Method_Hash

        }

        catch (e) {
            return false
        }

    }
    const accept_721_1155 = async (...data) => {
        try {
            console.log("accept_721_1155", ...data);
            if (web3 != null) {
                if (type == "CoinbaseMobile") {
                    const { hash } = await writeContract({
                        address: config.TradeContract,
                        abi: Market,
                        functionName: 'acceptBId',
                        args: [...data],
                        account: accountAddress
                    })
                    console.log("HASHFOR", hash)

                    const receipt = await get_receipt(hash);
                    console.log("receipt", receipt);
                    if (receipt) {
                        var need_data = {
                            status: receipt.status,
                            HashValue: receipt.transactionHash,
                        }
                        console.log("enna varra", need_data);
                        return need_data;
                    }

                }else{
                const ConnectContract = await contrat_connection(Market, config.TradeContract)
                var contract_Method_Hash = await
                    ConnectContract
                        .methods
                        .acceptBId(...data)
                        .send({ from: accountAddress })
                        .on('transactionHash', (transactionHash) => {
                            return transactionHash
                        })
                const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                var need_data = {
                    status: receipt.status,
                    HashValue: receipt.transactionHash,
                }
                return need_data
            }}
        }
        catch (e) {

            return false
        }

    }

    const GetOwner = async (data, Addr, Tokenaddr) => {
        console.log('functioninputtt', data, Addr, Tokenaddr)
        try {
            var ConnectContract = await contrat_connection(data == 'Single' ? ERC721 : ERC1155, Addr)
            console.log('coooonnnnn', ConnectContract)
            var contract_Method_Hash = await
                ConnectContract
                    .methods
                    .ownerOf(Tokenaddr)
                    .call()
            return contract_Method_Hash

        }
        catch (e) {
            console.log('errrorrrr', e)
            return 'error'
        }
    }

    const GetContractOwner = async (data, Addr) => {
        console.log('functioninputtt', Addr)
        try {
            var ConnectContract = await contrat_connection(data == 'Single' ? ERC721 : ERC1155, Addr)
            console.log('coooonnnnn', ConnectContract)
            var contractowner = await
                ConnectContract
                    .methods
                    .owner()
                    .call()
            return contractowner

        }
        catch (e) {
            console.log('errrorrrr', e, String(e))
            return 'error'
        }
    }

    // const Current_NFT_Balance = async (ownerdet, data) => {

    //     try {
    //         var currbalance;
    //         if ((data.ContractType === "721" || data.ContractType === 721)) {
    //             const ConnectContract = await contrat_connection(ERC721, data.ContractAddress)
    //             currbalance = await ConnectContract.methods.ownerOf(ownerdet.NFTId).call();
    //             console.log('ballllaanneceeee1111', currbalance)
    //             if ((String(currbalance).toLowerCase()) === (String(ownerdet.NFTOwner).toLowerCase())) { return '1'; }
    //             else {
    //                 let payload = {
    //                     NFTId: ownerdet.NFTId,
    //                     NFTOwner: ownerdet.NFTOwner,
    //                     NFTBalance: "0",
    //                 }
    //                 // var balupd = await NftbalanceUpdate(payload);
    //             }
    //             console.log('ballllaanneceeee', currbalance)
    //         }
    //         else {
    //             const ConnectContract = await contrat_connection(ERC1155, data.ContractAddress)
    //             currbalance = await ConnectContract.methods.balanceOf(ownerdet.NFTOwner, ownerdet.NFTId).call();
    //             console.log('ballllaanneceeee', currbalance)
    //             if (currbalance !== null && currbalance !== undefined) {
    //                 let payload = {
    //                     NFTId: ownerdet.NFTId,
    //                     NFTOwner: ownerdet.NFTOwner,
    //                     NFTBalance: currbalance,
    //                 }
    //                 // var balupd = await NftbalanceUpdate(payload);
    //                 console.log("check other balan 3", payload)


    //             }
    //             console.log('ballllaanneceeee', currbalance)
    //         }
    //         return String(currbalance);
    //     }
    //     catch (e) {
    //         console.log('errorrrr,e', e)
    //         return 0
    //     }
    // }


    const Current_NFT_Balance = async (ownerdet, data) => {

        try {
            var currbalance;
            if (data?.ContractType === "721" || data?.ContractType === 721) {
                console.log("dataindsddas", ERC721, data?.ContractAddress)
                const ConnectContract = await contrat_connection(ERC721, data?.ContractAddress)
                currbalance = await ConnectContract.methods.ownerOf(ownerdet?.NFTId).call();


                if ((String(currbalance).toLowerCase()) == (String(ownerdet?.NFTOwner).toLowerCase())) {

                    return currbalance;
                }
                else {
                    let payload = {
                        NFTId: ownerdet?.NFTId,
                        NFTOwner: ownerdet?.NFTOwner,
                        NFTBalance: "0",
                        Currentowner: currbalance,
                        type: '721'
                    }

                    let response = await NftbalanceUpdate(payload);


                    return String(currbalance);


                }

            }
            else {
                const ConnectContract = await contrat_connection(ERC1155, data.ContractAddress)
                currbalance = await ConnectContract.methods.balanceOf(ownerdet.NFTOwner, ownerdet.NFTId).call();
                console.log('ballllaanneceeee', currbalance)
                if ((currbalance !== null && currbalance !== undefined) && ownerdet.NFTBalance != currbalance) {
                    console.log("dataincontrac1155", ownerdet.NFTBalance, currbalance)
                    let payload = {
                        NFTId: ownerdet.NFTId,
                        NFTOwner: ownerdet.NFTOwner,
                        NFTBalance: currbalance,
                        Currentowner: currbalance,
                        type: '1155'

                    }
                    console.log("datainbalancecheck1155", payload)
                    let result = await NftbalanceUpdate(payload);
                    console.log("checkotherbalan3ERC1155", result)
                    return String(currbalance);

                }
                console.log('ballllaanneceeee', currbalance)
                return String(currbalance);
            }

        }
        catch (e) {
            // toast.warning(e.message)
            console.error('balacecheckerroer', e)
            return ""
        }
    }

    const Transfer = async (data) => {

        try {
            const ConnectContract = await contrat_connection(data.ContractType == "1155" ? ERC1155 : ERC721, data.ContractType == "1155" ? config.ERC1155 : config.ERC721)
            var contract_Method_Hash
            if (data.ContractType == "1155" || data.ContractType == 1155) {
                contract_Method_Hash = await ConnectContract.methods
                    .safeTransferFrom(
                        data.nftOwner,
                        data.Address,
                        data.NFTId,
                        data.ContractType == "1155" ? data.amount : "0",
                        "0x0"
                    )
                    .send({ from: data.nftOwner })
                    .on("transactionHash", (transactionHash) => {
                        console.log("hasdh", transactionHash);
                        return transactionHash;
                    });
            } else if (data.ContractType == "721" || data.ContractType == 721) {
                contract_Method_Hash = await ConnectContract.methods
                    .safeTransferFrom(
                        data.nftOwner,
                        data.Address,
                        data.NFTId
                    )
                    .send({ from: data.nftOwner })
                    .on("transactionHash", (transactionHash) => {
                        console.log("hasdh", transactionHash);
                        return transactionHash;
                    });
            }



            const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
            var need_data = {
                status: receipt.status,
                HashValue: receipt.transactionHash,
            }
            return need_data

        } catch (err) {
            console.log("err in mintin", err);
        }
    };

    const GetGasFees = async (encoded, contractaddress, value) => {
        try {
            var gasPrice = await web3.eth.getGasPrice();
            // console.log('skjfffffffssssss@124',chain,TradeAddress);
            var gasdata;
            if (value) {
                gasdata = await web3.eth.estimateGas({
                    from: accountAddress,
                    to: contractaddress,
                    value: value,
                    data: encoded,
                });
            }
            else {
                gasdata = await web3.eth.estimateGas({
                    from: accountAddress,
                    to: contractaddress,
                    data: encoded,
                });
            }

            console.log('hdgdgkdggd', gasPrice, gasdata)
            return ({ gasdata: gasdata, gasPrice: gasPrice });
        }
        catch (err) {
            console.log('errorrr', err);
            return ({ gasdata: 282984, gasPrice: 5500000000 });
        }
    }
    const getServiceFees = async () => {
        var rpcObj = new Web3(config.RPC_URL)
        var fees = {}
        if (rpcObj) {
            try {
                var marketObj = new rpcObj.eth.Contract(
                    marketAbi,
                    config.TradeContract
                );
                var servicefees = await marketObj.methods.getServiceFee().call()
                console.log("servicefees", servicefees);
                fees.buyerFees = servicefees[0]
                fees.sellerFees = servicefees[1]

                return fees;
            }
            catch (e) {
                console("service fees catch blok running", e)
            }
        }
    }
    const lazyminting_721_1155 = async (value, Coin, Type, ...data) => {
        console.log("vxzjVXJvh", data, Type);
        console.log("vvalueh", value, Coin);
        if (Type == '721') {
            console.log("lksmkmgoikgikaikogsdoikg");
            try {

                const ConnectContract = await contrat_connection(Market, config.TradeContract)
                var contract_Method_Hash = await
                    ConnectContract
                        .methods
                        .lazyMinting(...data)
                        .send({ from: accountAddress, value })
                        .on('transactionHash', (transactionHash) => {
                            return transactionHash
                        })

                const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                console.log("asdds", receipt);
                var TokenCOunts = Coin == config?.COIN_NAME ? Web3?.utils?.hexToNumber(receipt?.logs[2]?.topics[2]) : Web3?.utils?.hexToNumber(receipt?.logs[6]?.topics[2])
                console.log("receipt.logs[1]", TokenCOunts);
                console.log('gettttttreccc', receipt, contract_Method_Hash, TokenCOunts)
                if (TokenCOunts) {
                    var need_data = {
                        status: receipt?.status,
                        HashValue: receipt?.transactionHash,
                        tokenCounts: TokenCOunts
                    }
                    return need_data
                }

            }

            catch (e) {
                console.log("Contract Error", e)
                return false
            }

        }
        else {
            try {
                
                console.log("dsvbadjhvbhddouble");
                const ConnectContract = await contrat_connection(Market, config.TradeContract)
                var contract_Method_Hash = await
                    ConnectContract
                        .methods
                        .lazyMinting(...data)
                        .send({ from: accountAddress, value })
                        .on('transactionHash', (transactionHash) => {
                            return transactionHash
                        })

                const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                console.log("asdds", receipt, contract_Method_Hash.transactionHash);

                // var TokenCOunts = Web3Utils.hexToNumber(receipt.logs[0].topics[3])
                //     console.log("receipt.logs[1]",TokenCOunts);
                //     console.log('gettttttreccc', receipt, contract_Method_Hash, TokenCOunts)
                if (receipt) {
                    console.log("data topics console", receipt?.logs[0]);
                    // amount =  web3.utils.toBN(data.logs[0].data).toString()
                    // var route = String(receipt.logs[0].data)
                    // console.log("route", route);
                    // var sliceee = route.slice(2)
                    // console.log("sliceee", sliceee.length, sliceee);
                    // var lengthuh = sliceee.length / 2
                    // console.log("lengthuh", lengthuh);
                    // console.log("sdfsf", web3.utils.hexToNumber("0x" + sliceee.slice(0, lengthuh)));
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                        //     tokenCounts: TokenCOunts
                        tokenCounts: Coin == config?.COIN_NAME ? Web3?.utils?.hexToNumber(receipt.logs[2].topics[2]) : Web3?.utils?.hexToNumber(receipt.logs[6].topics[2])
                        // web3.utils.hexToNumber(receipt.logs[2].topics[2]),

                    }
                    return need_data
                }


            }
            catch (err) {
                console.log("lazyminting_1155", err);
            }
        }
    }



    const burn_721_1155 = async (ContractAddress,ContractType,Quantity,Add,Id) => {
        console.log("fertaea",ContractAddress,ContractType,Quantity,Add,Id , accountAddress);
        debugger

        try {

                const ConnectContract = await contrat_connection((ContractType === "721" || ContractType === 721 )?  ERC721 : ERC1155,ContractAddress)

               if(ContractType == "721"|| ContractType == 721)
                {                
                    var contractobj = await
                    ConnectContract
                        .methods
                        .burnNFT(Id)
                        var gasprice = await web3.eth.getGasPrice()
                        var gas_estimate = await contractobj.estimateGas({ from: accountAddress }) 
                        if(type == "TrustWallet" ) {gas_estimate = gas_estimate * 100}
                      console.log("trustwallllleeeegasssfee" ,gas_estimate  )  
                    var contract_Method_Hash = await
                        ConnectContract
                            .methods
                            .burnNFT(Id)
                            .send({ 
                             from: accountAddress,
                             gasLimit: parseInt(gas_estimate), 
                             gasPrice: gasprice,
                             })
                            .on('transactionHash', (transactionHash) => {
                                return transactionHash
                            })
                        }
                        else{
                            var contractobj = await
                            ConnectContract
                                .methods
                                .burnNFT(Id,Quantity)
            
                                var gasprice = await web3?.eth?.getGasPrice();

                                var gas_estimate = await contractobj.estimateGas({ from: accountAddress }) 
                                if(type == "TrustWallet" ) gas_estimate = gas_estimate * 100
                               
                               
                                var contract_Method_Hash = await
                            ConnectContract
                                .methods
                                .burnNFT(Id,Quantity)
                                .send({ 
                                    from: accountAddress ,
                                    gasLimit: parseInt(gas_estimate), 
                                    gasPrice: gasprice,
                                })
                                .on('transactionHash', (transactionHash) => {
                                    return transactionHash
                                })}
                    const receipt = await get_receipt(contract_Method_Hash.transactionHash ? contract_Method_Hash.transactionHash : contract_Method_Hash);
                    var need_data = {
                        status: receipt.status,
                        HashValue: receipt.transactionHash,
                          }
                    return need_data
                }
                catch (e) {
console.log("catch",e);
                    return false
                }

            }



    return {
        Contract_Base_Validation,
        GetApproveStatus,
        SetApproveStatus,
        minting_721_1155,
        approve_721_1155,
        Token_Balance_Calculation,
        buy_bid_price_calculation,
        cancel_order_721_1155,
        price_calculation,
        place_order_721_1155,
        buy_721_1155,
        allowance_721_1155,
        accept_721_1155,
        GetOwner,
        GetContractOwner,
        Current_NFT_Balance,
        Transfer,
        getServiceFees,
        getAddress,
        lazyminting_721_1155,
        burn_721_1155
    };




}
