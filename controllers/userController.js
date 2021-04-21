const User = require('../models/userModel');
const {request, response} = require('../server');
const bcrypt = require('bcryptjs');
const userController = {};

// getAllUsers- retrieve all users from the database and stores in res.locals
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );
    res.locals.users = users;
    return next();
  });
};

userController.createUser = async (req, res, next) => {
  const {username, password} = req.body;
  // if (!username || !password)
  //   return next('Missing username or password in userController.creatUser');
  try {
    // declare variable, await result of async req.body.username and req.body.password promise from mongodb and then createUser from UserSchema
    const newUser = await User.create({username, password});
    // store to local memory in res.local
    res.locals.user = newUser;
    console.log('USERCONTROLLER.CREATEUSER FIRED');
    // to next middleware
    return next();
    // catch for error
  } catch (err) {
    // console.log
    console.log(err);
    // return 400
    return res.status(400);
  }
};

userController.verifyUser = (req, res, next) => {
  const {username, password} = req.body;

  // if no input, return error message
  if (!username || !password)
    return next('Missing username or password in userController.verifyUser.');

  console.log('VERIFYUSER FIRED');

  // mongo findOne finds the first User Database of {req.body.username} as an object
  User.findOne({username}, (err, user) => {
    if (err) {
      return next(`Error in userController.verifyUser: ${JSON.stringify(err)}`);
    }

    // if no user, console.log (no user)
    if (!user) console.log('NO USER IN INPUT');

    // still in User.findOne, bcrypt compare password

    bcrypt
      .compare(password, user.password)
      .then((result) => {
        // password did not match
        if (!result) console.log('PASSWORD DID NOT MATCH');
        // password match, save user for following middleware
        res.locals.user = user;
        return next();
      })
      // catch error
      .catch((error) =>
        next(`Error in userController.verifyUser:${JSON.stringify(error)}`)
      );
  });
};

module.exports = userController;
