import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

//שימי לב שבשביל להשתמש בפורטל עושים שינוי בindex.html שנמצא בpublic
const BackDrop = (props) => {
  //רקע
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  //שכבה עליונה
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElements = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, portalElements)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElements
      )}
    </Fragment>
  );
};

export default Modal;
