var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    // username: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    firstName: {
        type: String,
        //required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    title: {
        type: String,
    },
    role: {
        type: Number,
        //required: true,
    },
    emailAddress: {
        type: String,
        //required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        //required: true,
    },
    password: {
        type: Number,
        minimum: 8
    },
    status: {
        type: String,
        default: "Pending",
        //required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);