import React, { useState } from 'react';
import './ReportModal.css';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ReportModal = ({ onClose, onGenerateReport }) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === "modal-overlay" && onClose()}>
      <div className="modal-con">
        <h2>Generate Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="dateGroup">
            <label htmlFor="from">From:</label>
            <input type="date" id="from" value={from} onChange={(e) => setFrom(e.target.value)} required />
          </div>
          <div className="dateGroup">
            <label htmlFor="to">To:</label>
            <input type="date" id="to" value={to} onChange={(e) => setTo(e.target.value)} required />
          </div>
          <div className="btnCon">
            <button type="submit">Generate</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
