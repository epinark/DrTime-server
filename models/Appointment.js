import mongoose from 'mongoose';
const {
    Schema,
    model,
    ObjectId
} = mongoose;

const appointmentSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    doctor: {
        type: ObjectId,
        ref: 'Doctor',
    },
    appointmentdate: {
        type: Date,
        required: [true, 'Date is required'],
    },
    description: String,
}, {
    timestamps: true,
});

export default model('Appointment', appointmentSchema);