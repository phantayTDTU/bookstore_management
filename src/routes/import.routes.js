// src/routes/importRoute.js
const express = require('express');
const router = express.Router();
const { createImportSlip } = require('../controllers/importController');

// Route lập phiếu nhập sách
router.post('/import-slips', createImportSlip);

module.exports = router;
