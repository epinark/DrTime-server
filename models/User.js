import mongoose from 'mongoose';
const {
    Schema,
    model,
    ObjectId

} = mongoose;

const userSchema = new Schema({
    gender: {
        type: String,

    },
    firstName: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    email: {
        type: String,
        required: [true, 'Email image is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    birthDate: {
        type: Date,
    },
    contactInfo: {
        telefon: {
            type: Number
        },
        PLZ: {
            type: Number,
        },
        City: {
            type: String,
        },
    },
    insuranceNumber: String,
    primaryDoctor: {
        type: ObjectId,
        ref: 'Doctor',
        default: null
    },

    profilePhoto: String,
});

export default model('User', userSchema);