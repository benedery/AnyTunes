const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    queries: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false }
});
// hash user password before saving into database
// userSchema.pre('save', function (next) {
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('User', userSchema)