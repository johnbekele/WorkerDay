import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
// import Image from "../Components/Image";
import { motion } from "framer-motion";
function Funbtn(props) {
  return (
    <div>
      <ModalTrigger onClick={props.onClick} className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Regiter Now
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          🤖
        </div>
      </ModalTrigger>
    </div>
  );
}

export default Funbtn;
