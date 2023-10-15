const express = require("express")
const EmployeeModel = require('../models/Employee')

const routes = express.Router()

//http://localhost:3002/api/v1/emp/employees
routes.get("/employees", async (req, res) => {
    try {
        const empList = await EmployeeModel.find({})
        res.status(200).send(empList)
    } catch(error) {
        res.status(500).send({error});
    }
})

//http://localhost:3002/api/v1/emp/employees
routes.post("/employees", async (req, res) => {
    try {
        const newEmp = new EmployeeModel({
            ...req.body
        })
        await newEmp.save()
        res.status(201).send(newEmp);
    } catch(error) {
        res.status(500).send(error);
    }
})

//http://localhost:3002/api/v1/emp/employees/{eid}
routes.get("/employees/:empid", async(req, res) =>{
    try {
        const emp = await EmployeeModel.findById(req.params.empid)
        if(!emp) {
            res.status(200).send({message: "Employee not found"})
        } else {
            res.status(200).send(emp);
        }
    } catch(error) {
        res.status(500).send(error);
    }
})

//http://localhost:3002/api/v1/emp/employees/{eid}
routes.put("/employees/:empid", async (req, res) => {
    try {
        const empid= req.params.empid;
        const updatedData = req.body;

        const currEmpData = await EmployeeModel.findById(empid);

        if (!currEmpData) {
            return res.status(404).send({ message: "Employee not found" });
        }

        currEmpData.set(updatedData);
        await currEmpData.save();

        res.status(200).send({ message: "Employee details updated successfully" });

    } catch(error) {
        res.status(500).send(error);
    }
})

//http://localhost:3002/api/v1/emp/employees/?empid=xxx
routes.delete("/employees", async (req, res) => {
    try {
        const empId = req.query.empid;

        if (!empId) {
            return res.status(400).send({ message: "Employee ID (empid) is required in the query parameters" });
        }
        
        const emp = await EmployeeModel.findByIdAndDelete(empId)
        if(!emp) {
            res.status(404).send({message: "Employee not found"})
        } else {
            res.status(204).send(emp);
        }
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = routes