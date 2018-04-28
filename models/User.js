const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String,
	googleId: String,
	credits: { type: Number, default: 0 }
});

userSchema.pre('save', function(next) {
  //get access to the user model
  const user = this;

  //generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    //hash our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite inputted password with hash
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

mongoose.model('users', userSchema);