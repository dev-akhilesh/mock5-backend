const Doctor = require('../models/Doctor');

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
};

// Create a new doctor
const createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor' });
    }
};

// Update a doctor by ID
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor' });
    }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        await Doctor.findByIdAndRemove(id);
        res.json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor' });
    }
};

module.exports = { getAllDoctors, createDoctor, updateDoctor, deleteDoctor };
