const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeeController")

router.get('/', employeeController.getAllEmployees);
router.get('/:employeeId', employeeController.findEmployee)
router.post('/', employeeController.createEmployee);
router.put('/update/:employeeId', employeeController.updateEmployee);
router.delete('/:employeeId', employeeController.deleteEmployee);
router.put('/status/:employeeId', employeeController.updateEmployeeStatus);
router.put('/role/:employeeId', employeeController.updateEmployeeRole);
router.post('/user/reset', employeeController.updatePassword);
router.post('/user/status', employeeController.updateEmployeeAccountStatus);

router.post('/image/:employeeId', employeeController.createEmployeeImage);
router.put('/image/:employeeId/:key', employeeController.changeEmployeeImage);
router.delete('/image/:id/:key', employeeController.removeEmployeeImage);


module.exports = router;