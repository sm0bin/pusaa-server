const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    profile: {
        type: {
            basic: {
                name: {
                    type: String,
                    required: false
                },
                picture: {
                    type: String,
                    default: ""
                },
                role: {
                    type: String,
                    default: "user"
                },
            },
            education: {
                university: {
                    type: String,
                    default: ""
                },
                department: {
                    type: String,
                    default: ""
                },
                session: {
                    type: String,
                    default: ""
                },
            },
            contact: {
                phone: {
                    type: String,
                    default: ""
                },
                email: {
                    type: String,
                    default: ""
                },
                whatsapp: {
                    type: String,
                    default: ""
                },
                address: {
                    type: String,
                    default: ""
                }
            },
            social: {
                facebook: {
                    type: String,
                    default: ""
                },
                linkedin: {
                    type: String,
                    default: ""
                }
            }
        },
        default: null // Set default value to null for optional profile
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
