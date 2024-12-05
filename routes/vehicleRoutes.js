const express = require('express');
const router = express.Router();
const { sql } = require('../dbconfig');

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const result = await sql.query('EXEC GetVehicles');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching vehicles', message: err.message });
    }
});

// Add a new vehicle
router.post('/', async (req, res) => {
    const { CarModel, CarMake, YearOfMfg, BasePrice } = req.body;
    try {
        await sql.query`
            EXEC InsertVehicle 
            @CarModel = ${CarModel}, 
            @CarMake = ${CarMake}, 
            @YearOfMfg = ${YearOfMfg}, 
            @BasePrice = ${BasePrice}
        `;
        res.status(201).json({ message: 'Vehicle added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error inserting vehicle', message: err.message });
    }
});

// Update a vehicle
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { CarModel, CarMake, YearOfMfg, BasePrice } = req.body;
    try {
        await sql.query`
            EXEC UpdateVehicle 
            @VehicleID = ${id}, 
            @CarModel = ${CarModel}, 
            @CarMake = ${CarMake}, 
            @YearOfMfg = ${YearOfMfg}, 
            @BasePrice = ${BasePrice}
        `;
        res.status(200).json({ message: 'Vehicle updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating vehicle', message: err.message });
    }
});

// Delete a vehicle
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`
            EXEC DeleteVehicle 
            @VehicleID = ${id}
        `;
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting vehicle', message: err.message });
    }
});

module.exports = router;
