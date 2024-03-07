import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
  registrationNumber:{
    type: String,
    required: true,
  },
  slotNumber:{
    type: Number,
  },
  status:{
    type: String,
    enum: ['PARKED', 'LEFT'],
  },
  color:{
    type: String,
    enum: ['RED', 'GREEN', 'BLUE', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE'],
  },
  parkingLotId:{
    type: String,
    required: true,
  },
}, {timestamps: true});

const Parkings = mongoose.model('Parkings', parkingSchema);

export default Parkings; 