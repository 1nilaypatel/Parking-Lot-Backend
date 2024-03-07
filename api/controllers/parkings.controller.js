import ParkingLots from "../models/parkingLots.model.js";
import Parkings from "../models/parkings.model.js";
import { errorHandler } from '../utils/error.js';

export const parkCar = async (req, res, next) => {
  const { parkingLotId, registrationNumber, color } = req.body;

  try {
    const parkingLot = await ParkingLots.findOne({ id: parkingLotId, isActive: true });
    if (!parkingLot) {
      return next(errorHandler(400, "Parking lot is inactive"));
    }

    const allowedColors = ['RED', 'GREEN', 'BLUE', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE'];
    if (!allowedColors.includes(color)) {
      return next(errorHandler(400, "Invalid color"));
    }

    const parkedCarsCount = await Parkings.countDocuments({ parkingLotId });

    const slotNumber = parkedCarsCount + 1;

    const newParkingSlot = new Parkings({ parkingLotId, registrationNumber, color, status: 'PARKED', slotNumber });
    await newParkingSlot.save();

    res.status(200).json({
      isSuccess: true,
      response: {
        slotNumber: newParkingSlot.slotNumber,
        status: newParkingSlot.status,
      }
    });
  } catch (error) {
    next(error);
  }
}


export const unParkCar = async (req, res, next) => {
  const { parkingLotId, registrationNumber } = req.body;

  try {
    const parkingLot = await ParkingLots.findOne({ id: parkingLotId, isActive: true });
    if (!parkingLot) {
      return next(errorHandler(400, "Parking lot is inactive"));
    }

    const parkedCar = await Parkings.findOneAndUpdate(
      { parkingLotId, registrationNumber, status: 'PARKED' },
      { status: 'LEFT' },
      { new: true }
    );

    if (!parkedCar) {
      return next(errorHandler(404, "No parked car found with the provided registration number"));
    }

    res.status(200).json({
      isSuccess: true,
      response: {
        slotNumber: parkedCar.slotNumber,
        registrationNumber: parkedCar.registrationNumber,
        status: parkedCar.status,
      }
    });
  } catch (error) {
    next(error);
  }
}

router.delete('/Parkings', unParkCar);
