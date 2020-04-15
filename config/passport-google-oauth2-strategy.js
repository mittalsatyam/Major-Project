// const passport=require('passport');
// const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
// const crypto=require('crypto');
// const User=require('../models/user');
// //tell passport to use google strategy for google login
// passport.use(new googleStrategy({
// clientID:"264671854619-pi9qiiug03242bh2g2oi6e0751o94i2b.apps.googleusercontent.com",
// clientSecret:"f2hh42pZxhEmzoSnA3pYJr8A",
// callbackURL:"http://localhost:8000//users/auth/google/callback"
// },
// function(accessToken,refreshToken,profile,done){
//     //find a user
// User.findOne({email:profile.emails[0].value}).exec(function(err){
// if(err){
//     console.log("error occured",err);
//     return;
// }
// console.log(profile);//if user find
// if(user){
//     return done(null,user);
// }
// else{//if not found create the user and set it in req.user
//     User.create({
//        name:profile.displayName,
//        email:profile.emails[0].value,
//        password:crypto.randomBytes(20).toString('hex') 
//     },function(err,user){
//     if(err){
//         console.log("error",err);
//         return;
//        }
//        return done(null,user);
//      });
//     }
//  });
// }
// ));
// module.exports=passport;
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env=require('./environment');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url,        
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;