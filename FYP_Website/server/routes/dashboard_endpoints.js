const express = require('express');
const dashboardRouter = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'supply_chain',
});

dashboardRouter.get('/getEmployeeCount', (req, res) => {
    const query = `
        SELECT COUNT(*) as count
        FROM employee
    `;

    db.query(query, (err, result) => {
        if (err) {
        console.error("Error retrieving employee count", err);
        res.status(500).send('Error retrieving employee count');
        return;
        }

        if (result.length === 0) {
        res.status(404).send('Employee count not found');
        return;
        }

        const count = result[0].count;
        res.send({ employeeCount: count });
    });
});

dashboardRouter.get('/getproductionqueue', (req, res) => {
    const query = `
        SELECT COUNT(*) as count
        FROM produced_byproduct where isproduced=0
    `;

    db.query(query, (err, result) => {
        if (err) {
        console.error("Error retrieving employee count", err);
        res.status(500).send('Error retrieving employee count');
        return;
        }

        if (result.length === 0) {
        res.status(404).send('Employee count not found');
        return;
        }

        const count = result[0].count;
        res.send({ employeeCount: count });
    });
});

dashboardRouter.get('/getBestSellingProduct', (req, res) => {
    const query = `
        SELECT name, COUNT(byproduct_id) AS frequency
        FROM produced_byproduct NATURAL JOIN model
        WHERE sold = 1
        GROUP BY byproduct_id
        ORDER BY frequency DESC
        LIMIT 1;
    `;

    db.query(query, (err, result) => {
        if (err) {
        console.error("Error retrieving best selling product", err);
        res.status(500).send('Error retrieving best selling product');
        return;
        }

        if (result.length === 0) {
        res.status(404).send('best selling product not found');
        return;
        }

        const name = result[0].name;
        res.send({ bestSellingProduct: name });
    });
});
dashboardRouter.get('/getYearlySales', (req, res) => {
    const query = `
        SELECT SUM(quantity) AS total_quantity
        FROM customer_order
        WHERE YEAR(date) = 2024;
    `;

    db.query(query, (err, result) => {
        if (err) {
        console.error("Error retrieving yearly sales", err);
        res.status(500).send('Error retrieving yearly sales');
        return;
        }

        if (result.length === 0) {
        res.status(404).send('yearly sales product not found');
        return;
        }

        const count = result[0].total_quantity;
        res.send({ yearlySales: count });
    });
});

module.exports = dashboardRouter;