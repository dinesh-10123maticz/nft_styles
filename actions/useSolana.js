import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair, generatedSignerIdentity } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint, mplTokenMetadata, createNft } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';



import { createProgrammableNft } from '@metaplex-foundation/mpl-token-metadata'
import {
    createGenericFile,
    publicKey,
    sol,
} from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'


import { actions } from '@metaplex/js';


import { keypairIdentity } from "@metaplex-foundation/js";

import { connect, useSelector } from 'react-redux';

// import {
//     actions,
//     programs,
//     utils,
// } from '@metaplex/js';



/* Quick node */
import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    clusterApiUrl,
    PublicKey,
} from '@solana/web3.js';
import {
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    createAssociatedTokenAccountIdempotent,
    createInitializeMetadataPointerInstruction,
    TYPE_SIZE,
    LENGTH_SIZE,
    getMintLen,
    ExtensionType,
    getMint,
    getMetadataPointerState,
    getTokenMetadata,
} from '@solana/spl-token';

import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    Account,
    createSetAuthorityInstruction,
    AuthorityType
} from '@solana/spl-token';
import {
    createInitializeInstruction,
    createUpdateFieldInstruction,
    createRemoveKeyInstruction,
    pack,
    TokenMetadata,
} from '@solana/spl-token-metadata';
import axios from 'axios';

// const { createMetadata } = actions;
// const { metadata } = programs;




export default function UseSolana() {
    const { payload } = useSelector((state) => state.LoginReducer.User);
    const { web3, accountAddress } = useSelector((state) => state.LoginReducer.AccountDetails);
    // const {sendTransaction} = web3

    const mintNFT = async ({ metaIpfs, nftName }) => {
        console.log("🚀 ~ mintNFT ~ metaIpfs,nftName:", metaIpfs, nftName)
        try {
            // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            // console.log("🚀 ~ mintNFT ~ connection:", connection)
            /* m1 */
            // console.log('accountAddress-->', accountAddress)
            // const umi = createUmi('https://soft-late-tent.solana-devnet.quiknode.pro/07a90297e0945453e902ac44beae4efbffb4bafb/'); //Replace with your QuickNode RPC Endpoint
            // console.log("🚀 ~ mintNFT ~ umi:", umi)

            // const userWallet = new Keypair()
            // console.log("🚀 ~ mintNFT ~ web3:", web3)
            // 
            // const userWalletSigner = createSignerFromKeypair(umi, userWallet);
            // console.log("🚀 ~ mintNFT ~ userWalletSigner:", userWalletSigner)


            // const mint = generateSigner(umi);
            // console.log("🚀 ~ mintNFT ~ mint:", mint)
            // umi.use(signerIdentity(userWalletSigner));
            // umi.use(mplTokenMetadata())
            // console.log('umi-->', umi)
            // let transaction = await  createAndMint(umi, {
            //     mint,
            //     authority: umi.identity,
            //     name: 'angel',
            //     uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
            //     sellerFeeBasisPoints: percentAmount(500),
            //     tokenOwner: new PublicKey(accountAddress),
            //     tokenStandard: TokenStandard.NonFungible,
            // })
            // console.log('transaction-->',transaction)

            // // const transaction = new Transaction().add(
            // //     createAndMint(umi, {
            // //         mint,
            // //         authority: umi.identity,
            // //         name: 'angel',
            // //         uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
            // //         sellerFeeBasisPoints: percentAmount(500),
            // //         tokenOwner: new PublicKey(accountAddress),
            // //         tokenStandard: TokenStandard.NonFungible,
            // //     })
            // // );
            // transaction.feePayer = new PublicKey(accountAddress);
            // const { blockhash } = await connection.getRecentBlockhash();
            // transaction.recentBlockhash = blockhash;
            // console.log('blockhash-->', blockhash)
            // const signed = await web3.signTransaction(transaction);``
            // console.log('signed-->', signed, signed.serialize())
            // const signature = await connection.sendRawTransaction(signed.serialize());
            // console.log('signature-->', signature)
            // let signhash = await connection.confirmTransaction(signature);
            // console.log('signhash-->', signhash)
            // let status = await getTransactionstatus(signature)



            // .sendAndConfirm(umi)
            //     .then((data) => {
            //         console.log("Successfully minted 1 million tokens (", mint.publicKey, ")", data);
            //     })
            //     .catch((err) => {
            //         console.error("Error minting tokens:", err);
            //     });


            /* m2 */
            // const umi = createUmi(connection, clusterApiUrl("devnet"));
            // console.log("🚀 ~ mintNFT ~ umi:", umi)
            // const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
            // const mint = generateSigner(umi);
            // console.log("🚀 ~ mintNFT ~ mint:", mint,accountAddress)
            // umi.use(generatedSignerIdentity(true));
            // umi.use(mplTokenMetadata());

            // console.log("🚀 ~ mintNFT ~ mint:", mint)
            // console.log("🚀 ~ mintNFT ~ umi:", umi,web3)
            // await createAndMint(umi, {
            //     mint,
            //     authority: web3,
            //     name: 'angel',
            //     uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
            //     sellerFeeBasisPoints: percentAmount(500),
            //     tokenOwner: new PublicKey(accountAddress),
            //     tokenStandard: TokenStandard.NonFungible,
            // }).sendAndConfirm(umi)
            // await createNft(umi, {
            //     mint,
            //     name: 'angel',
            //     uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
            //     sellerFeeBasisPoints: percentAmount(500),
            //     creators: [{ address: new PublicKey(accountAddress), verified: true, share: 100 }],
            // }).sendAndConfirm(umi)


            // const transaction = createAndMint(umi, {
            //         mint,
            //         authority: umi.identity,
            //         name: 'angel',
            //         uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
            //         sellerFeeBasisPoints: percentAmount(500),
            //         tokenOwner: new PublicKey(accountAddress),
            //         tokenStandard: TokenStandard.NonFungible,
            //     }).sendAndConfirm(umi)

            // transaction.feePayer = new PublicKey(accountAddress);
            // const { blockhash } = await connection.getRecentBlockhash();
            // transaction.recentBlockhash = blockhash;
            // console.log('blockhash-->', blockhash)
            // const signed = await web3.signTransaction(transaction); 
            // console.log('signed-->', signed, signed.serialize())
            // const signature = await connection.sendRawTransaction(signed.serialize());
            // console.log('signature-->', signature)
            // let signhash = await connection.confirmTransaction(signature);
            // console.log('signhash-->', signhash)
            // let status = await getTransactionstatus(signature)




            // console.log(`Created NFT: ${mint.publicKey.toString()}`)
            // console.log('Successfully minted NFT (', mint.publicKey.toBase58(), ')');


            /* M3 */
            console.log('web3-->',web3,web3.wallet)
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
// const metaplex = new Metaplex(connection);
//             const metadata = await actions.createMetadata({
//                 name,
//                 symbol: 'NFT',
//                 uri: 'https://example.com',
//                 sellerFeeBasisPoints: 1000,
//                 creators: [
//                   {
//                     address: wallet.publicKey.toString(),
//                     share: 100,
//                   },
//                 ],
//                 image: image,
//               });
            let data = await actions.mintNFT({connection,wallet : web3 , uri :'https://naifty.infura-ipfs.io/ipfs/QmRTHHKSfv7JkJmyNdjmzKkdjv6GXGM6C7sXCCgeWMbRRD',maxSupply:1 })

        } catch (err) {
            console.log("🚀 ~ mintNFT ~ err:", err)
        }

    }




    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const payer = new PublicKey('Dvi3sSGzjiHbTBh5vCDLH1dfLjgX199KwCsvBKfcHgD');
    const authority = { publicKey: payer };
    const owner = { publicKey: payer };
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    const tokenMetadata = {
        updateAuthority: authority.publicKey,
        mint: mint,
        name: 'angel',
        uri: 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg',
        symbol: 'QNPIX',
        additionalMetadata: [["Background", "Blue"], ["WrongData", "DeleteMe!"], ["Points", "0"]],
    };

    const decimals = 0;
    const mintAmount = 1;


    function generateExplorerUrl(identifier, isAddress) {
        if (!identifier) return '';
        const baseUrl = 'https://solana.fm';
        const localSuffix = '?cluster=localnet-solana';
        const slug = isAddress ? 'address' : 'tx';
        return `${baseUrl}/${slug}/${identifier}${localSuffix}`;
    }


    async function createTokenAndMint() {
        // Calculate the minimum balance for the mint account
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(tokenMetadata).length;
        const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
        console.log('payer-->', payer)

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: mint,
                space: mintLen,
                lamports: mintLamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            // createInitializeMetadataPointerInstruction(
            //     mint,
            //     authority.publicKey,
            //     mint,
            //     TOKEN_2022_PROGRAM_ID,
            // ),
            // createInitializeMintInstruction(
            //     mint,
            //     decimals,
            //     authority.publicKey,
            //     null,
            //     TOKEN_2022_PROGRAM_ID,
            // ),
            // createInitializeInstruction({
            //     programId: TOKEN_2022_PROGRAM_ID,
            //     metadata: mint,
            //     updateAuthority: authority.publicKey,
            //     mint: mint,
            //     mintAuthority: authority.publicKey,
            //     name: tokenMetadata.name,
            //     symbol: tokenMetadata.symbol,
            //     uri: tokenMetadata.uri,
            // }),
            // createUpdateFieldInstruction({
            //     programId: TOKEN_2022_PROGRAM_ID,
            //     metadata: mint,
            //     updateAuthority: authority.publicKey,
            //     field: tokenMetadata.additionalMetadata[0][0],
            //     value: tokenMetadata.additionalMetadata[0][1],
            // }),
            // createUpdateFieldInstruction({
            //     programId: TOKEN_2022_PROGRAM_ID,
            //     metadata: mint,
            //     updateAuthority: authority.publicKey,
            //     field: tokenMetadata.additionalMetadata[1][0],
            //     value: tokenMetadata.additionalMetadata[1][1],
            // }),
            // createUpdateFieldInstruction({
            //     programId: TOKEN_2022_PROGRAM_ID,
            //     metadata: mint,
            //     updateAuthority: authority.publicKey,
            //     field: tokenMetadata.additionalMetadata[2][0],
            //     value: tokenMetadata.additionalMetadata[2][1],
            // }),

        );

        transaction.feePayer = new PublicKey(accountAddress);
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        console.log('blockhash-->', blockhash)
        const signed = await web3.signTransaction(transaction);
        console.log('signed-->', signed, signed.serialize())
        const signature = await connection.sendRawTransaction(signed.serialize());
        console.log('signature-->', signature)
        let signhash = await connection.confirmTransaction(signature);
        console.log('signhash-->', signhash)
        let initSig = await getTransactionstatus(signature)





        // Initialize NFT with metadata
        // const initSig = await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair, authority]);
        // Create associated token account
        const sourceAccount = await createAssociatedTokenAccountIdempotent(connection, payer, mint, owner.publicKey, {}, TOKEN_2022_PROGRAM_ID);
        // Mint NFT to associated token account
        const mintSig = await mintTo(connection, payer, mint, sourceAccount, authority, mintAmount, [], undefined, TOKEN_2022_PROGRAM_ID);

        return [initSig, mintSig];
    }

    async function removeMetadataField() {
        const transaction = new Transaction().add(
            createRemoveKeyInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                metadata: mint,
                updateAuthority: authority.publicKey,
                key: 'WrongData',
                idempotent: true,
            })
        );
        const signature = await sendAndConfirmTransaction(connection, transaction, [payer, authority]);
        return signature;
    }

    async function removeTokenAuthority() {
        const transaction = new Transaction().add(
            createSetAuthorityInstruction(
                mint,
                authority.publicKey,
                AuthorityType.MintTokens,
                null,
                [],
                TOKEN_2022_PROGRAM_ID
            )
        );
        return await sendAndConfirmTransaction(connection, transaction, [payer, authority]);
    }

    async function main() {
        try {
            // await airdropLamports();

            // 1. Create Token and Mint
            const [initSig, mintSig] = await createTokenAndMint();
            console.log(`Token created and minted:`);
            console.log(`   ${generateExplorerUrl(initSig)}`);
            console.log(`   ${generateExplorerUrl(mintSig)}`);

            // // 2. Remove Metadata Field
            // const cleanMetaTxId = await removeMetadataField();
            // console.log(`Metadata field removed:`);
            // console.log(`   ${generateExplorerUrl(cleanMetaTxId)}`);

            // // 3. Remove Authority
            // const removeAuthTxId = await removeTokenAuthority();
            // console.log(`Authority removed:`);
            // console.log(`   ${generateExplorerUrl(removeAuthTxId)}`);

            // 4. Increment Points
            // const incrementPointsTxId = await incrementPoints(10);
            // console.log(`Points incremented:`);
            // console.log(`   ${generateExplorerUrl(incrementPointsTxId)}`);

            // Log New NFT
            console.log(`New NFT:`);
            console.log(`   ${generateExplorerUrl(mint.toBase58(), true)}`);

        } catch (err) {
            console.error(err);
        }
    }
    async function airdropLamports() {
        const airdropSignature = await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction({ signature: airdropSignature, ...(await connection.getLatestBlockhash()) });
    }



    // const mintaaguma = async () => {
    //     let publicKey = new PublicKey(accountAddress)
    //     const mint = Keypair.generate();
    //     const metadataUri = 'https://naifty.infura-ipfs.io/ipfs/QmYqwDtZSJHzsrxjqwvntBp7CfwsN6AZPswAFSRrRVy3Wg';
    //     const instructions = [];

    //     // Create the mint instruction
    //     instructions.push(
    //         programs.Token.createMintToInstruction({
    //             mint: mint.publicKey,
    //             destination: publicKey,
    //             amount: 1,
    //             mintAuthority: publicKey,
    //             freezeAuthority: publicKey,
    //         })
    //     );

    //     // Create the metadata instruction
    //     const metadataPDA = await metadata.Metadata.getPDA(mint.publicKey);
    //     instructions.push(
    //         createMetadata({
    //             metadata: metadataPDA,
    //             metadataData: {
    //                 name: 'Angel',
    //                 symbol: '',
    //                 uri: metadataUri,
    //                 sellerFeeBasisPoints: 500,
    //                 creators: [{ address: publicKey, share: 100 }],
    //             },
    //             mint: mint.publicKey,
    //             mintAuthority: publicKey,
    //             payer: publicKey,
    //         })
    //     );

    //     // Create the master edition instruction
    //     const masterEditionPDA = await masterEdition.MasterEdition.getPDA(mint.publicKey);
    //     instructions.push(
    //         masterEdition.MasterEdition.createMasterEdition({
    //             edition: masterEditionPDA,
    //             metadata: metadataPDA,
    //             mint: mint.publicKey,
    //             mintAuthority: publicKey,
    //             payer: publicKey,
    //             updateAuthority: publicKey,
    //         })
    //     );

    //     const transaction = new Transaction().add(...instructions);

    //     transaction.feePayer = new PublicKey(accountAddress);
    //     const { blockhash } = await connection.getRecentBlockhash();
    //     transaction.recentBlockhash = blockhash;
    //     console.log('blockhash-->', blockhash)
    //     const signed = await web3.signTransaction(transaction);
    //     console.log('signed-->', signed, signed.serialize())
    //     const signature = await connection.sendRawTransaction(signed.serialize());
    //     console.log('signature-->', signature)
    //     let signhash = await connection.confirmTransaction(signature);
    //     console.log('signhash-->', signhash)
    //     let initSig = await getTransactionstatus(signature)
    //     // const signature = await sendTransaction(transaction, connection, {
    //     //     signers: [mint],
    //     //     skipPreflight: false,
    //     // });
    //     // await connection.confirmTransaction(signature, 'processed');
    //     console.log('Successfully minted NFT:', mint.publicKey.toBase58());
    // }


    const metaplexmint = async () => {
        const umi = createUmi('https://api.devnet.solana.com')

        const signer = generateSigner(umi)

        umi.use(signerIdentity(signer))
        console.log('umi.identity.publicKey-->', umi.identity.publicKey)
        // await umi.rpc.airdrop(umi.identity.publicKey, sol(1))

        const metadata = {
            name: 'angel',
            description: 'This is an NFT on Solana',
            image: "https://naifty.infura-ipfs.io/ipfs/QmQ9oMqCQVmHgJJJnrd1VNks8UtcQs7kvoQA1Lw1GYF6Ag",
            external_url: 'https://example.com',
            attributes: [
                {
                    trait_type: 'trait1',
                    value: 'value1',
                },
                {
                    trait_type: 'trait2',
                    value: 'value2',
                },
            ],
            properties: {
                files: [
                    {
                        uri: "https://naifty.infura-ipfs.io/ipfs/QmQ9oMqCQVmHgJJJnrd1VNks8UtcQs7kvoQA1Lw1GYF6Ag",
                        type: 'image/jpeg',
                    },
                ],
                category: 'image',
            },
        }

        const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
            console.log("🚀 ~ metaplexmint ~ metadataUri err:", err)
            throw new Error(err)
        })

        // We generate a signer for the NFT
        const nftSigner = generateSigner(umi)
        console.log("🚀 ~ metaplexmint ~ nftSigner:", nftSigner)

        // Decide on a ruleset for the NFT.
        // Metaplex ruleset - publicKey("eBJLFYPxJmMGKuFwpDWkzxZeUrad92kZRC5BJLpzyT9")
        // Compatability ruleset - publicKey("AdH2Utn6Fus15ZhtenW4hZBQnvtLgM1YCW2MfVp7pYS5")
        const ruleset = null // or set a publicKey from above

        const tx = await createProgrammableNft(umi, {
            mint: nftSigner,
            sellerFeeBasisPoints: percentAmount(5.5),
            name: 'My NFT',
            uri: metadataUri,
            ruleSet: ruleset,
        }).sendAndConfirm(umi)

        // finally we can deserialize the signature that we can check on chain.
        const signature = base58.deserialize(tx.signature)
        console.log(signature)

    }


    const mudiyala = async () => {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        console.log('log-->', new TextEncoder().encode("2yaAPPeyaXageq8cQCkL9oWZ7WmFZKQDL8Rv5xuDYo5Uerdm6M67ARESQ9yFzT2SA2wetXwJSY6oNgxH9sYVUnKv"))
        const fromWallet = await Keypair.fromSecretKey(Buffer.from("2yaAPPeyaXageq8cQCkL9oWZ7WmFZKQDL8Rv5xuDYo5Uerdm6M67ARESQ9yFzT2SA2wetXwJSY6oNgxH9sYVUnKv"));
        console.log("🚀 ~ mudiyala ~ fromWallet:", fromWallet)
        let fromTokenAccount;
        let mint;


        // Create new NFT mint
        mint = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            0 // only allow whole tokens
        );

        // const transaction = new Transaction().add(
        //     createMint(
        //         connection,
        //         fromWallet,
        //         fromWallet.publicKey,
        //         null,
        //         0 // only allow whole tokens
        //     )
        // );

        console.log(`Create NFT: ${mint.toBase58()}`);

        // Get the NFT account of the fromWallet address, and if it does not exist, create it
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );

        console.log(`Create NFT Account: ${fromTokenAccount.address.toBase58()}`);

        const signature = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet.publicKey,
            1
        );
    }

    const crossMint = () => {
        const API_KEY = 'sk_staging_27giv68CQ2CqWzE7nTfycYS3eZYtmDFqogoqzKvYXScFYPUsvjJ7comPGMmXncJhmVRVG5gnFPMRDrjsdAYZEwkcqMDF8JF8aRsopRXMc9V6VnFDBUciq9aWX6qitPuCzdQ2RegBVP3sD2rSqK8UG6bJF7iSKRP7hZNe2mD65PrDPTPYKMauRDfmbUHdhd8LXDA5Ciu9pA16REFWRgexLN1';
        // Set up the request headers
        const headers = {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        };

        // Define the collection details
        const collectionData = {
            chain: "solana",
            metadata: {
                name: "Angel",
                imageUrl: "https://naifty.infura-ipfs.io/ipfs/QmQ9oMqCQVmHgJJJnrd1VNks8UtcQs7kvoQA1Lw1GYF6Ag",
                description: "This is my unique NFT collection on Solana.",
                symbol: "MYSOL"
            },
            fungibility: "non-fungible",
            supplyLimit: 10000 // Adjust the supply limit as needed
        };

        // API endpoint for creating a collection on Solana
        const apiUrl = 'https://www.crossmint.com/api/2022-06-09/collections/';

        // Make the request to create the collection
        axios.post(apiUrl, collectionData, { headers })
            .then(response => {
                console.log("🚀 ~ crossMint ~ response:", response)
                console.log('Collection created:', response.data);
                // Use the action ID from the response for the next step
                const actionId = response.data.actionId;
                console.log("🚀 ~ crossMint ~ actionId:", actionId)

                // Proceed to verify the collection deployment (Step 2)
            })
            .catch(error => console.error('Error creating collection:', error));
    }




    return {
        mintNFT,
        main,
        // mintaaguma,
        metaplexmint,
        mudiyala,
        crossMint
    }

}

