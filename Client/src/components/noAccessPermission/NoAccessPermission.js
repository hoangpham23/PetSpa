import React, { useState } from "react";

const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)", // Adjusted for a lighter overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupContent: {
    background: "white",
    padding: "40px", // Increased padding for larger popup
    borderRadius: "10px", // Slightly increased border-radius for better appearance
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "400px", // Set width for larger popup
    maxWidth: "80%", // Ensure it fits on smaller screens
    fontSize: "20px", // Increased font size for better readability
  },
  button: {
    marginTop: "20px", // Increased margin for better spacing
    padding: "10px 20px", // Increased padding for larger button
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px", // Slightly increased border-radius for better appearance
    cursor: "pointer",
    fontSize: "16px", // Increased font size for better readability
  },
  buttonHover: {
    background: "#0056b3",
  },
};

function NoAccessPermission() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <p>You are not allowed to access this page</p>
            <button
              style={styles.button}
              onClick={handleClosePopup}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  styles.buttonHover.background)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = styles.button.background)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoAccessPermission;
