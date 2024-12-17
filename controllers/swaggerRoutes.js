const express = require("express");
const router = express.Router();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");


// Load the YAML documentation files
const userDocumentation = YAML.load(path.join(__dirname, "../user.yaml"));
const adminDocumentation = YAML.load(path.join(__dirname, "../admin.yaml"));

// Define routes for Swagger documentation

router.use('/docs/:role', swaggerUi.serve, (req, res, next) => {
    const role = req.params.role;
  
    // Serve the appropriate Swagger documentation based on the role
    if (role === 'user') {
      return swaggerUi.setup(userDocumentation)(req, res);
    } 
  
    if (role === 'admin') {
      return swaggerUi.setup(adminDocumentation)(req, res);
    }
  
    // If the role is not recognized, move to the next middleware
    res.status(404).send('Documentation not found for the specified role');
  });


// Export the router to be used in server.js
module.exports = router;
