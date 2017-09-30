var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
app.use(session({
  secret: 'fhtfrfghyh',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use('facebook' ,  
	   new FacebookStrategy(
		   {
			 clientID:'1984509965158816',
			 clientSecret:'0dff9490ce61d830b15c6a951972bbe2',
			 callbackURL:'http://localhost:8081/auth/facebook/callback'			 
		   }, 
		   function(accessToken, refreshToken, profile, done){
			    //console.log(req);
			    console.log(accessToken);
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
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
/*passport.use(new GoogleStrategy({
    clientID: "779323195256-in4s0t2pclq59nd1cvc954hnack3k7fg.apps.googleusercontent.com",
    clientSecret: "R1lj1wa4Bv_ompvBczCIKg5R",
    callbackURL: "http://localhost:8081/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       console.log(accessToken);
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
					if(err)
						throw err;
					// if successful, return the new user
					return done(null, newUser);
                });
				       			    
    }
));*/


/*passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if(err)
          return done(err);
	  
        //Username does not exist, log error & redirect back
        if(!user){
          console.log('User Not Found with username '+username);
          return done(null, false , { success: '0' });                 
        }
		
        //User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false ,  { success: '0' });
        }
		
		req.login(user, function(error){
             if(error) return next(error);
			 console.log(req.user);
			 console.log(req.isAuthenticated());
             console.log("Request Login supossedly successful.");              
        });
		 
        // User and password both match, return user from 
        // done method which will be treated like success        
		return done(null, user);     		
     }
   );
}));*/

/*var isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated())
    return next();
  else {
	  console.log(req.isAuthenticated());
  }
  //res.redirect('/');
}*/


var paginate = require('express-paginate');

var cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.set('adminemail' , 'watermark0913@gmail.com');
app.set('view engine' , 'ejs');
app.set('captcha_secretkey' , '6LdqGSIUAAAAACWfT13RKusonYoknI1ge9-_k9qu');
app.use(cookieParser()); 
app.engine('html', require('ejs').renderFile);
app.set('trust proxy', 1)

/* app.use(session({
   secret:"dffhfdfxg",
    key: 'fxg',  
   //resave:true,
   //saveUninitialized:true
    cookie: {
        path: '/',
        domain: 'http://127.0.0.1:8081',
		httpOnly : true,  
        maxAge: 1000 * 60 * 24 // 24 hours
    }
})); */

/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});*/

app.get("/" , function(req, res){
    res.render('index' , {
		
	});
});

app.use(paginate.middleware(10, 50));

//var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

var UserProfile = require('./models/UserProfileModel')(mongoose);
var User = require('./models/UserModel')(mongoose);
var Services = require('./models/ServiceModel')(mongoose);
var Setting = require('./models/SettingModel')(mongoose);
var Category = require('./models/CategoryModel')(mongoose);
var Product = require('./models/ProductModel')(mongoose); 
var PasswordGenerate = require('./models/PasswordGenerateModel')(mongoose);

var Page = require('./models/PageModel')(mongoose);
var flash = require('connect-flash');
var bCrypt = require('bcrypt-nodejs');
var randtoken = require('rand-token');
var handlebars = require('handlebars');
app.use(flash());

/*passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    
  }
));*/

/* passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */

var isValidPassword = function(user, password){
  //console.log(bCrypt.hashSync(password, bCrypt.genSaltSync(10), null));
  //return bCrypt.compareSync(password, user.password);
  return true;
}

function isAuthenticated(){
	console.log("tera");
	return function (req, res, next) {
		console.log(req.user);		
		if(req.isAuthenticated()){	
            console.log("teraagain");		
			return next();
		}
		else {
            console.log("terafailed");	 		
			res.setHeader('Content-Type', 'application/json');  
			res.send(JSON.stringify({authen:0, success:0}));
		}
	}
}

function isAdminAuthenticated(){
	console.log("mera");
	return function (req, res, next) {
        //console.log(req.user.is_admin);		
		if (req.isAuthenticated() && req.user.is_admin=='1'){			
			return next();
		}
		else {			
			res.setHeader('Content-Type', 'application/json');  
			res.send(JSON.stringify({authen:0, success:0}));
		}
	}
}


		
app.get('/facebook' , passport.authenticate('facebook'));

app.get('/auth/facebook/callback' , passport.authenticate('facebook' , { successRedirect : '/showusers', failureRedirect: '/showusers' }));

app.get('/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/showusers' }), function(req, res) {
	//res.send(req);
		res.redirect('/showusers');
});

/* app.get('/auth/google/callback', function(req, res) {
	
	console.log(req);
	//res.redirect('/showusers');
}); */

passport.isAuthenticated = isAuthenticated();

passport.isAdminAuthenticated = isAdminAuthenticated();
// passport/login.js

var validator = require('validator');

var multer = require('multer');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
var mailer = require('nodemailer');  
  
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		var fileexploded = file.originalname.split(".");
		var extension = fileexploded[fileexploded.length-1];
		cb(null, file.fieldname + '-' + Date.now()+"."+extension)
	}
});

var upload = multer({storage:storage}).single('file');
var func = require("./helpers/CommonHelper.js");
var mail = require("./helpers/MailHelper.js");
var dateFormat = require('dateformat'); 
var dateDiff = require('date-diff');
var dobByAge = require('birth-by-age-at-date');
var json2csv = require('json2csv');
var excelexport = require('node-excel-export');
var pdf = require('html-pdf');
var schedule = require("node-schedule");
var slugify = require('slugify');
var fs = require('fs');
var async = require('async');	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//var passportFacebook = require('./controllers/ThirdPartyAuth')(User , passport , LocalStrategy);
require('./controllers/UserController')(app , func , mail, upload, storage, mailer, multer, validator, User , paginate , cors , dateFormat, dateDiff , dobByAge , json2csv , excelexport , pdf , passport , LocalStrategy, bCrypt, fs, async, PasswordGenerate, randtoken, handlebars, UserProfile);

require('./controllers/ServiceController')(app , func , mail, upload, storage, mailer, multer, validator, Services , paginate , cors);

require('./controllers/SettingController')(app, func, mail, upload, storage, mailer, multer, validator, Setting, paginate, cors, dateFormat, dateDiff, dobByAge, json2csv, excelexport, pdf, passport, LocalStrategy);

require('./controllers/HomeController')(app, func, mail, mailer, multer, validator, cors, dateFormat, dateDiff, LocalStrategy, Category, Page, passport, fs, async, User, handlebars);
 
require('./controllers/PageController')(app , func , mail, upload, storage, mailer, multer, validator, Page , paginate , cors , dateFormat, dateDiff , dobByAge , json2csv , excelexport , pdf , passport , LocalStrategy, bCrypt, slugify);
require('./controllers/ProductController')(app , func , mail, upload, storage, mailer, multer, validator, Product, paginate , cors , dateFormat, dateDiff , dobByAge , json2csv , excelexport , pdf , passport , LocalStrategy, bCrypt, fs, async, PasswordGenerate, randtoken, handlebars);

require('./controllers/CategoryController')(app , func , mail, upload, storage, mailer, multer, validator, Category, paginate , cors , dateFormat, dateDiff , dobByAge , json2csv , excelexport , pdf , passport , LocalStrategy, bCrypt, fs, async, PasswordGenerate, randtoken, handlebars);
//require('./crons/crons')(schedule, mail, mailer, User);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});	
});
  
// Handle 500
app.use(function(error, req, res, next) {
   //res.status(500).send('500: Internal Server Error', 500);
});

var server = app.listen(8081 , function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listing at http', host, port);
});