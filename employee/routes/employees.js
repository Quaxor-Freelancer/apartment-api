const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeeController")

router.get('/', employeeController.getAllEmployees);
router.get('/:employeeId', employeeController.findEmployee)
router.post('/', employeeController.createEmployee);
router.put('/update/:employeeId', employeeController.updateEmployee);
router.delete('/:employeeId', employeeController.deleteEmployee);


module.exports = router;