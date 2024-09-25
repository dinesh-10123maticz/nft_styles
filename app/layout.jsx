"use client";

import WalletModal from "@/components/modals/WalletModal";
import "../public/styles/style.css";
import "swiper/css";
// import "swiper/css/pagination";

import "tippy.js/dist/tippy.css";
import "react-modal-video/css/modal-video.css";
import PropertiesModal from "@/components/modals/PropertiesModal";
import LevelsModal from "@/components/modals/LevelsModal";
import ModeChanger from "@/components/common/ModeChanger";

import ConnectWalletModal from "@/components/modals/ConnectWalletModal";
import { ToastContainer } from 'react-toastify'
import ClockModal from "@/components/modals/CLockModal";
import 'react-toastify/dist/ReactToastify.css';

if (typeof window !== "undefined") {
  // Import the script only on the client side
  import("bootstrap/dist/js/bootstrap.esm").then((module) => {
    // Module is imported, you can access any exported functionality if
  });
}

//Redux-provider
import StoreProvider from "@/utlis/redux/storeprovider";
import OnsaleandChangeprice from "@/components/modals/PlaceOrder";
import Clockmodals from "@/components/modals/Clockmodals";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        itemScope
        itemType="http://schema.org/WebPage"
        className={
          "overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900"
        }
      >
        <StoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ModeChanger />
        {children}
        <WalletModal />
        <PropertiesModal />
        <LevelsModal />
        <ConnectWalletModal />
        {/* <Clockmodals /> */}
        <OnsaleandChangeprice />
        </StoreProvider>
      </body>
    </html>
  );
}
