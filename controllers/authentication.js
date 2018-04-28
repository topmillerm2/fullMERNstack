const mongoose = require('mongoose')

const User = mongoose.model('users');
const jwt = require('jwt-simple')

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, 'jsadfkjaslfkj3oi')
}

exports.login = function(req, res, next) {
	console.log('hit authentication.js')
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
	console.log('hit signup')
	const email = req.body.email
	const password = req.body.password

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide an email and password' })
	}

	User.findOne({ email: email }, function(err, existingUser) {
		console.log('hit findOne')
		if(err){
			console.log(err)
			return next(err);
		}

		if (existingUser) {
			console.log(existingUser)
			return res.status(422).send({ error: 'Email is taken' })
		}
		const user = new User({
			email: email,
			password: password,
			googleId: ''
		})
		console.log('started a new User', user)

		user.save(err => {
			console.log('saving user')
			if (err) {
				console.log(err)
				return next(err)
			}
			console.log(user)
			res.json({ token: tokenForUser(user)})
		})
	})
}