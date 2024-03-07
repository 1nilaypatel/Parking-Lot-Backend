import express from 'express';
import { parkCar, unParkCar } from '../controllers/parkings.controller.js'

const router = express.Router();

router.post('/Parkings', parkCar);
router.delete('/Parkings', unParkCar);

export default router;