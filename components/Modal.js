import classes from "@/styles/Modal.module.css";
import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose=e=>{
      e.preventDefault();
      onClose()
  }

  const modalContent = show ? (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={classes.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.querySelector("#modal-root")
    );
  } else {
    return null;
  }
}
