import ParkingLots from "../models/parkingLots.model.js";
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({message: "Api route is working"});
}

export const createParkingLots = async (req, res, next) => {
  const { id, capacity } = req.body;

  if (!(0 <= capacity && capacity <= 2000)) {
    return next(errorHandler(400, "Capacity must be between 0 and 2000."));
  }
  const newParkingLots = new ParkingLots({ id, capacity, isActive: 'true' });
  try {
    await newParkingLots.save();
    res.status(200).json({
      isSuccess: true,
      response: {
        id: newParkingLots.id,
        capacity: newParkingLots.capacity,
        isActive: newParkingLots.isActive
      }
    });
  } catch (error) {
    next(error);
  }
}
