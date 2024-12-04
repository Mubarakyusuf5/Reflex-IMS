import React, { useState } from "react";
import "./deleteModal.css";
import { BeatLoader } from "react-spinners";

export const DeleteModal = ({onClose, onDelete}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="modal-backdrop">
    <div className="modal-delCon">
      <h2>Confirm Deletion</h2>
      <hr />
      <p>Are you sure you want to delete this data?</p>
      <div className="delMBtn">
      <button onClick={onClose}>Cancel</button>
      <button onClick={onDelete} >Delete</button>
      </div>
    </div>
  </div>
  );
};
