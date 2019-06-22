const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('./secrets.js'); //added

// for endpoints beginning with /api/auth

router.post('/register', async (req, res) => {
    try {
        const userInfo = await req.body
        console.log(userInfo)
        userInfo.password = await bcrypt.hashSync(userInfo.password, 10)
        const user = await Users.addUser(userInfo)
        res.status(201).json(user);
    }

    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new user suckas',
        });
  
    }
  });

  router.post('/login', async (req, res) => {

    let {username, password} = req.body;
    try {
        const user = await Users.findBy( { username })
        if (user && bcrypt.compareSync(password, user[0].password)){
          const token = generateToken(user);
          res.status(200).json({message:`Welcome user!`,
        token, 
        });

        }
        else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    }
    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new login suckas',
        });

    }
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
    //... other data like what websites someone has visited
  }
  const secret = secrets.jwtSecret
  const options = {
  expiresIn: '8h',
}
  return jwt.sign(payload, secret, options)
}


  
module.exports = router;
