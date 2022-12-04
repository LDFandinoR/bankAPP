const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const verifyToken = require('../verifyToken')


// 

// Create user Account
router.post('/user', async (req, res) => {  
    const {name, email} = req.body;
    console.log("name ", name, "email", email)
    const user = await User.find({email});
    if (!user.length > 0) {
        const user = new User({name, email, balance: 0 });
        await user.save(); 
        console.log('User has been created successfully')
      } else {
      console.log('User already exist')
    }  
  }
  );

// Edit user (balance) ACTUALIZAR formulario 
router.put('/user/:email', async (req, res) => {   
  const email = req.params.email; 
  const  { balance } = req.body;
  const newBalance = { balance };
  //console.log(newBalance)
  await User.findOneAndUpdate({email}, newBalance)
  //res.json({status: 0, message: 'User has been modified successfully'});
});

// show all users:
router.get('/users', verifyToken.verifyToken, async (req, res) => {
    const users = await User.find();
    //res.json(users)
    res.send(users)
});

// get one user
router.get('/user/:email', verifyToken.verifyToken, async (req, res) => {
  const email = req.params.email; 
  const user = await User.findOne({email});
  res.send(user)
  console.log('user got from db', user )
});

module.exports = router