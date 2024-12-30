import React, { useState } from "react";
import * as XLSX from "xlsx"; // To generate Excel file
import "./BinCard.css";

function BinCard({ materialName, closeForm }) {
  const [staticFields, setStaticFields] = useState({
    description: "",
    codeNo: "",
    sectionIndex: "",
    unitOfMeasure: "",
    binNo: "",
    maximum: "",
    minimum: "",
  });

  const [binCardData, setBinCardData] = useState([
    {
      date: "",
      authority: "",
      receiptQty: "",
      issueQty: "",
      balanceQty: "",
      storekeeperInitials: "",
    },
  ]);

  const handleStaticFieldChange = (event) => {
    const { name, value } = event.target;
    setStaticFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...binCardData];
    updatedData[index][field] = value;
    setBinCardData(updatedData);
  };

  const addRow = () => {
    setBinCardData([
      ...binCardData,
      {
        date: "",
        authority: "",
        receiptQty: "",
        issueQty: "",
        balanceQty: "",
        storekeeperInitials: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedData = [...binCardData];
    updatedData.splice(index, 1);
    setBinCardData(updatedData);
  };

  const handleSubmit = () => {
    // Here we log the data. You can replace this with your submission logic, such as sending it to a server via an API.
    console.log("Submitted Data:", { staticFields, binCardData });

    // Optionally reset the form after submission if desired
    setStaticFields({
      description: "",
      codeNo: "",
      sectionIndex: "",
      unitOfMeasure: "",
      binNo: "",
      maximum: "",
      minimum: "",
    });

    setBinCardData([
      {
        date: "",
        authority: "",
        receiptQty: "",
        issueQty: "",
        balanceQty: "",
        storekeeperInitials: "",
      },
    ]);

    // Optionally, show a success message or close the form
    alert("Data submitted successfully!");
    if (closeForm) closeForm();  // This will close the form if closeForm is passed as a prop
  };

  const handleSave = () => {
    const ws = XLSX.utils.json_to_sheet(binCardData); // Convert data to sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bin Card Data");
    XLSX.writeFile(wb, `${materialName}_BinCard.xlsx`);

  };

  return (
    <div className="bin-card-container">
      <header className="bin-card-header">
        <h2>Bin Card - {materialName}</h2>
      </header>

      {/* Static Fields as Form */}
      <div className="static-fields-form">
        {Object.keys(staticFields).map((key) => (
          <div key={key} className="static-field">
            <input
              type="text"
              name={key}
              value={staticFields[key]}
              onChange={handleStaticFieldChange}
              placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
            />
          </div>
        ))}
      </div>

      {/* Dynamic Data Table */}
      <div className="bin-card-section">
        <table className="bin-card-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Authority</th>
              <th>Receipt Qty</th>
              <th>Issue Qty</th>
              <th>Balance Qty</th>
              <th>Storekeeper Initials</th>
            </tr>
          </thead>
          <tbody>
            {binCardData.map((entry, index) => (
              <tr key={index}>
                {Object.keys(entry).map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      value={entry[field]}
                      onChange={(e) =>
                        handleInputChange(index, field, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="action-buttons">
          <button className="add-button" onClick={addRow}>
            Add Row
          </button>
          <button
            className="delete-row-button"
            onClick={() => deleteRow(binCardData.length - 1)}
          >
            Delete Row
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="save-button" onClick={handleSave}>
            Save as Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BinCard;