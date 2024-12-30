import React, { useState } from "react";

function DeadStockRegister() {
  const [rows, setRows] = useState([
    {
      serialNo: "",
      descriptionOfArticle: "",
      authorityForPurchaseAndDate: "",
      numberOrQuantity: "",
      value: "",
      finalDisposalNoQuantityAndNature: "",
      finalDisposalAuthorityOrVoucher: "",
      amountRealisedAndCreditDate: "",
      amountWritten: "",
      balanceStockNumber: "",
      balanceStockValue: "",
      initialsHeadOffice: "",
      remarks: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        serialNo: "",
        descriptionOfArticle: "",
        authorityForPurchaseAndDate: "",
        numberOrQuantity: "",
        value: "",
        finalDisposalNoQuantityAndNature: "",
        finalDisposalAuthorityOrVoucher: "",
        amountRealisedAndCreditDate: "",
        amountWritten: "",
        balanceStockNumber: "",
        balanceStockValue: "",
        initialsHeadOffice: "",
        remarks: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
      setRows(updatedRows);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", rows);
    alert("Form submitted successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    // Define CSV headers
    const csvHeaders = [
      [
        "Sr. No.",
        "Description of Article",
        "Authority for Purchase and Date",
        "Number or Quantity",
        "Value",
        "Final Disposal No./Quantity and Nature",
        "Final Disposal Authority or Voucher",
        "Amount Realised and Date of Credit",
        "Amount Written Off",
        "Balance Stock Number",
        "Balance Stock Value",
        "Initials of Head of Office",
        "Remarks",
      ],
    ];

    // Format table rows into CSV rows
    const csvRows = rows.map((row) =>
      [
        row.serialNo,
        row.descriptionOfArticle,
        row.authorityForPurchaseAndDate,
        row.numberOrQuantity,
        row.value,
        row.finalDisposalNoQuantityAndNature,
        row.finalDisposalAuthorityOrVoucher,
        row.amountRealisedAndCreditDate,
        row.amountWritten,
        row.balanceStockNumber,
        row.balanceStockValue,
        row.initialsHeadOffice,
        row.remarks,
      ]
        .map((value) => `"${value}"`) // Wrap each value in quotes to handle commas inside data
        .join(",")
    );

    // Combine headers and rows
    const csvContent = [
      csvHeaders.map((headerRow) => headerRow.join(",")).join("\n"),
      csvRows.join("\n"),
    ].join("\n");

    // Create a Blob object with CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a link element for download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DSR.csv"; // Set file name
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dead Stock Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Sr. No.</th>
                <th style={styles.th}>Description of Article</th>
                <th style={styles.th}>Authority for Purchase and Date</th>
                <th style={styles.th}>Number or Quantity</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>No. or Quantity and Nature</th>
                <th style={styles.th}>Authority or Voucher</th>
                <th style={styles.th}>Amount Realised and Date of Credit</th>
                <th style={styles.th}>Amount Written</th>
                <th style={styles.th}>Balance Stock Number</th>
                <th style={styles.th}>Balance Stock Value</th>
                <th style={styles.th}>Initials of Head of Office</th>
                <th style={styles.th}>Remarks</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key) => (
                    <td style={styles.td} key={key}>
                      <input
                        style={styles.input}
                        type={
                          key.includes("Date") || key.includes("date")
                            ? "date"
                            : key.includes("number") ||
                              key.includes("value") ||
                              key.includes("quantity") ||
                              key.includes("amount")
                            ? "number"
                            : "text"
                        }
                        name={key}
                        value={row[key]}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                    </td>
                  ))}
                  <td style={styles.td}>
                    <button
                      type="button"
                      style={styles.deleteButton}
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.buttonContainer}>
          <button type="button" style={styles.addButton} onClick={addRow}>
            Add Row
          </button>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
          <button
            type="button"
            style={styles.printButton}
            onClick={handlePrint}
          >
            Print Form
          </button>
          <button
            type="button"
            style={styles.saveButton}
            onClick={handleSave}
          >
            Save 
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "95%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#EEE2DC",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#3E362E",
    fontWeight: "bold",
    fontSize: "28px",
  },
  formContainer: {
    maxHeight: "500px",
    overflowY: "auto",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    backgroundColor: "white",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px 8px",
    backgroundColor: "#865D36", // Update to custom color
    color: "#fff",
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "600",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
  input: {
    width: "95%",
    padding: "8px",
    margin: "5px 0",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fafafa",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  addButton: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#AC3B61",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  submitButton: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#ff6347",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  printButton: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  deleteButton: {
    padding: "8px 15px",
    fontSize: "14px",
    backgroundColor: "#767575",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  saveButton: {
    padding: "8px 15px",
    fontSize: "14px",
    backgroundColor: "#767575",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default DeadStockRegister;
