
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

const User = require('../models/user');

exports.createUser= (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then( hashedPassword=>{
      const user = new User({
          email :req.body.email,
          password:hashedPassword
      });

      user.save()
        .then(result =>{
            res.status(201).json({
                message:'user created',
                result :result
            })
        }).catch(error =>{
            res.status(500).json({
                message : "Invalid authentication credentials! "
            })
        })
  })
}
exports.login= (req,res,next)=>{
    let fetchedUser;
    User.findOne({email:req.body.email})
    .then(user =>{
        if(!user) { // if user email doesn't exist in the database
           return res.status(401).json({message : 'Authinticatin failed'});
        } 
        fetchedUser = user;
         return bcrypt.compare(req.body.password , fetchedUser.password);

    }).then( result =>{

        if(!result){ // unsuccessful match
            return res.status(401).json({message : 'Authenticatin failed'});
        }
       //  we have a valid password

       const token = jwt.sign({email:fetchedUser.email,userId: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn:'1hr'});

        res.status(200).json({
            token:token,
            userId:fetchedUser._id,
            expiresIn:3600
        });

    })
    .catch(error=>{  // comparing faild
        return res.status(401).json({ message: "Authenticatin failed" });
    } ) 
}