import React from "react";

function Logout() {
  const handleLogout = () => {
    // Delete the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
