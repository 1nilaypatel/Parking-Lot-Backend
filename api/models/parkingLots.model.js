import mongoose from 'mongoose';

const parkingLotSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique: true,
  },
  capacity:{
    type: Number,
    required: true,
  },
  isActive:{
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const ParkingLots = mongoose.model('ParkingLots', parkingLotSchema);

export default ParkingLots;