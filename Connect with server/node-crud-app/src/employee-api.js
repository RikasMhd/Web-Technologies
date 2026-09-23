const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const EmployeeModel = require('./EmployeeModel');

//connect database
const uri = "mongodb://localhost:27017/EmployeeDB"
mongoose.connect(uri)
    .then(() => console.log("Successfully connected to Employee database."))
    .catch((error) => console.error("Database connection error:", error));

// Create employee
router.post('/save', async (req, res) => {
    try {
        const newEmployee = new EmployeeModel({
            EMPLOYEE_ID: 209,
            FIRST_NAME: "Mark1",
            LAST_NAME: "Antony1",
            EMAIL: "mark@gmail.com",
            PHONE_NUMBER: "755.079.834",     
            HIRE_DATE: "01-JUN-18",       
            JOB_ID: "MR_CLERK",
            SALARY: 2600,
            COMMISSION_PCT: '-',
            MANAGER_ID: 124,
            DEPARTMENT_ID: 50              
        });

        const data = await newEmployee.save();
        res.status(201).send(`Employee ${data} inserted successfully`);
        
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).send("Internal Server Error");
    }

    router.post('/delete',async (req, res) => {
        try{
            const targetId = req.body._id;
            if (!targetId){
                return res.status(400).json({ message: "Missing required field: _id"});

            }
            const deleteEmployee= await EmployeeModel.findByIdAndDelete(targetId);

            if (!deleteEmployee){
                return res.status(404).json({ message: "Employee not found with that hex _id"});

            }

            res.status(200).json({
                messsage: "Employee succesfullly deleted",
                deletedData: deletedEmployee
            });
        } catch(error){
            console.error("Error executing findByIdAndDelete:",error);
            if(error.name ==='CastError'){
                return res.status(400).json({message : "InvalidMongoDB hex _id format"});
            }
        }
    })


    router.post('./delete-by-id',async(req,res) => {
        try{
            const targetId = req.body. _id;
            if(!targetId) {
                return res.status(400).json({ message: "Missing required field: _id"});
            }
            const deleteEmployee= await EmployeeModel.findByIdAndDelete(targetId);

            if (!deleteEmployee){
                return res.status(404).json({ message: "Employee not found with that hex _id"});

            }

            res.status(200).json({
                messsage: "Employee succesfullly deleted",
                deletedData: deletedEmployee
            });

        }catch (error){
            console.error("Error executing findByIdAndDelete:",error);
            if(error.name === 'CastError'){
                return res.status(400).json({message : "InvalidMongoDB hex _id format"});
            }
            res.status(500).send("Internal Server Error");
        }
    })
})
module.exports = router;    