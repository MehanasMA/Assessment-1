const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            match: /^[a-zA-Z .]+$/,
            required: true
        },
        lastName: {
            type: String,
            match: /^[a-zA-Z .]+$/,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other']
        },
        dateofBirth: {
            type: Date,
            validate: {
                validator: function (value) {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return age > 14;
                },
                message: 'Age must be older than 14 years'
            }
        },
        age: {
            type: Number
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
