import mongoose from 'mongoose';
const {
    Schema,
    model
} = mongoose;

const doctorSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    specialization: String,
    address: {
        city: String,
        postalCode: String,
    },
    timings: [{
        startTime: String,
        endTime: String,
        interval: Number
    }],
    profilePhoto: String,
}, {
    timestamps: true,
});

export default model('Doctor', doctorSchema);