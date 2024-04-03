/* import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if user is not authenticated
      history.push("/login");
    }
  }, [history]);

  return (
    <div>
      <p>This is Dashboard Page!</p>
    </div>
  );
}
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (replace this with your authentication logic)
    const isAuthenticated = true;

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Render the dashboard content here
  return (
    <div>
      <p>This is Dashboard Page!</p>
    </div>
  );
}
