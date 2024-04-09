import React from "react";

function Whatsnew() {
  return (
    <div>
      <h1>What's New</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>New Calendar Feature</h2>
        <p>
          We're excited to announce the addition of our new Calendar feature!
          With the Calendar, you can easily manage your notes and tasks.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>
            Add Notes: Easily add new notes to specific dates on the calendar.
          </li>
          <li>Edit Notes: Edit existing notes directly from the Calendar.</li>
          <li>Delete Notes: Remove unwanted notes with just a click.</li>
        </ul>
        <p>
          Start organizing your life more efficiently with our new Calendar
          feature today!
        </p>
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <h2>New Mass Upload - Products</h2>
        <h3>Key Features:</h3>
        <ul>
          <li>
            <strong>CSV Upload:</strong> Easily mass upload products, orders,
            and stocks CSV files to streamline your inventory management.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Whatsnew;
