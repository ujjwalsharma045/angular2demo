module.exports = function(User ,passport, LocalStrategy){ 
    
	var FacebookStrategy = require('passport-facebook').Strategy;

	passport.use( 
	   new FacebookStrategy(
		   {
			 clientID:'1984509965158816',
			 clientSecret:'0dff9490ce61d830b15c6a951972bbe2',
			 callbackURL:'http://localhost:8081/auth/facebook/callback',
			 passReqToCallback: true
		   }, 
		   function(req , accessToken, refreshToken, profile, done){
			    console.log(req);
			    //console.log(accessToken);
//console.log(refreshToken);
//console.log(profile);
			    //console.log(done);
				
				var data = {
					email:'axva@gmail.com',
					username:'xgvcvbcvb',
					password:'111cvcv',
					first_name:'cvb',
					last_name:'dcvbcvbcvfg',
					address:'dfvcbvcbg',
					state:'sdfvcbvbsd',							
					city:'vbn',
					zipcode:'sdvbnfsf',
					dateofbirth:'sdvbnvfsd'							
				};
				
				var newUser = new User(data);
				newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
				        
			    
				
               // set all of the facebook information in our user model
               /*      newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    }); */
			    /* 
				var data = {
					email:'abcd@gmail.com',
					username:profile.displayName,
					password:'111',
					first_name:'displayName1',
					last_name:'displayName2',
					address:'displayName3',
					state:'displayName4',							
					city:'displayName5',
					zipcode:'displayName6',
					dateofbirth:'displayName7'							
			  };
			  
			  User.findOrCreate({username:profile.displayName} , {data} , function(err , user){
				 if(err){
					 console.log(err);
					 return done(err);
				 }
				 console.log(user);
				 return done(null , user);
			  });*/		
		  }
	   )
	);
	return passport;
}

