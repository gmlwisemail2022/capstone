import React from "react";

function About() {
  return (
    <div>
      <h1>About eCIM Application</h1>
      <p>
        The eCIM (e-commerce Inventory Management) Application is a one-stop
        inventory system designed to handle multiple e-commerce platforms and
        consolidate them into a single inventory and product database.
      </p>
      <p>
        The current alpha version is undergoing updates and currently only
        handles integration with one e-commerce website. Integration with
        additional platforms will be available soon.
      </p>
      <p>
        The CSV Upload feature allows users to perform mass uploads of products,
        orders, and stocks CSV files. However, currently, only the mass upload
        of products is operational.
      </p>
      <p>&copy; 2024 Glen Lau. All rights reserved.</p>
    </div>
  );
}

export default About;
