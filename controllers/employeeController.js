const Employee = require("../models/employeeModel");
const Account = require("../models/accountModel");

exports.createEmployee = async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        position,
        salary,
        dateOfBirth,
        accountId,
    } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            email,
            phone,
            address,
            position,
            salary,
            dateOfBirth,
            account: accountId,
        });

        await newEmployee.save();
        res.status(201).json({
            message: "Employee created successfully",
            employee: newEmployee,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate(
            "account",
            "name email"
        );
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id).populate(
            "account",
            "name email"
        );
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        phone,
        address,
        position,
        salary,
        dateOfBirth,
        accountId,
    } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                address,
                position,
                salary,
                dateOfBirth,
                account: accountId,
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({
            message: "Employee updated successfully",
            employee: updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter function
exports.filterEmployees = async (req, res) => {
    const { name, position, minSalary, maxSalary } = req.query;
    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (position) {
        filter.position = position;
    }

    if (minSalary || maxSalary) {
        filter.salary = {};
        if (minSalary) {
            filter.salary.$gte = minSalary; // Greater than or equal to minSalary
        }
        if (maxSalary) {
            filter.salary.$lte = maxSalary; // Less than or equal to maxSalary
        }
    }

    try {
        const employees = await Employee.find(filter).populate(
            "account",
            "name email"
        );
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
