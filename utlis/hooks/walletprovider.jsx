// import { useMemo } from "react";
// import {
//     ConnectionProvider,
//     WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//     WalletModalProvider
// } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
// import { PhantomWalletAdapter,  
//     MathWalletAdapter,
//     SolflareWalletAdapter
// } from "@solana/wallet-adapter-wallets";
// // import { MathWalletAdapter } from '@solana/wallet-adapter-mathwallet'

// // Default styles that can be overridden by your app
// import "@solana/wallet-adapter-react-ui/styles.css";

// export default function Walletproviders({children}) {
//     // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//     const network = WalletAdapterNetwork.Devnet;
//     // You can also provide a custom RPC endpoint.
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);
// // console.log('Allwallets-->',Allwallets)
//     const wallets = useMemo(() => [
//             new PhantomWalletAdapter(),
//             // new SolflareWalletAdapter({ network }),
//             // new MathWalletAdapter(),
//         ],[network]);

//     return (
//         <ConnectionProvider endpoint={endpoint}>
//             <WalletProvider wallets={wallets} autoConnect>
//                 <WalletModalProvider>
//                     {children}
//                 </WalletModalProvider>
//             </WalletProvider>
//         </ConnectionProvider>

//     );
// }

