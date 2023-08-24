import mongoose from 'mongoose';
const {
    Schema,
    model,
    ObjectId
} = mongoose;

const userProfileSchema = new Schema({
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    hausArtz: {
        type: ObjectId,
        ref: 'Doctor',
        default: null
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required']
    },
    mobilePhone: String,
    address: {
        city: String,
        postalCode: String,
    },
    insuranceNumber: String,
    profilePhoto: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

});

export default model('UserProfile', userProfileSchema);