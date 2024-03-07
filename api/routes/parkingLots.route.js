import express from 'express';
import { createParkingLots, test } from '../controllers/parkingLots.controller.js'

const router = express.Router();

router.get('/test', test);
router.post('/ParkingLots', createParkingLots);

export default router;