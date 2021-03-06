module.exports = function(app , func , mail, upload, storage, mailer, multer, validator, User, paginate , cors , dateFormat , dateDiff, dobByAge, json2csv, excel , pdf, passport , LocalStrategy, bCrypt , fs, async, PasswordGenerate, randtoken, handlebars, UserProfile){ 
    
    var sess;
    //var session = require('express-session');  
    var math = require('mathjs'); 
  	var filereader = require('xlsx-to-json-lc');
    var async = require('async');	
	

    var readHTMLFile = function(path, callback) {
		fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
			if(err){
				console.log(err);
				//throw err;
				callback(err);
			}
			else {
				callback(null, html); 
			}
		}); 
    };	

	app.get("/showusers", function(req, res){
		
			var data = {
				
			};
				
			if(req.query.email){			
				//var regex = new RegExp(req.query.email, "i")				
				data.email = { "$regex": req.query.email, "$options": "i" } ;
			}
			
			if(req.query.username){			
				data.username = { "$regex": req.query.username, "$options": "i" };
			}
			
			if(req.query.first_name){ 					    
				data.first_name = { "$regex": req.query.first_name, "$options": "i" };
			}
			
			if(req.query.last_name){					    
				data.last_name = { "$regex": req.query.last_name, "$options": "i" };
			}
			
			if(req.query.age){					    
			    var dob = dobByAge(req.query.age , new Date());
				
				//console.log("ss"+dob.upperYear);
				
				var dt = new Date();
				
				//console.log(new Date().getMonth());
				//console.log(new Date().getDate());
				//console.log(new Date().getFullYear());
				
				var newdate = new Date(dob.upperYear, dt.getMonth(), dt.getDate());
				//console.log(newdate);
				
				var formateddob = dateFormat(newdate ,'yyyy-mm-dd');
				//var formateddob = dateFormat(dob ,'yyyy-mm-dd');
				
				//console.log(formateddob);
				
				//data.dateofbirth = formateddob;
				data.dateofbirth = { "$lte": formateddob };
			};
						
			var sortsection = {
				
			};
			
			//console.log(req.query);
			
			if(req.query.sortfield){				
                if(!req.query.sorttype){
                   req.query.sorttype = 'asc';
				}
				
				if(req.query.sortfield=="first_name")					
			       sortsection.first_name = req.query.sorttype; 
				else if(req.query.sortfield=="last_name")					
			       sortsection.last_name = req.query.sorttype; 
				else if(req.query.sortfield=="email")					
			       sortsection.email = req.query.sorttype; 
				else if(req.query.sortfield=="username")					
			       sortsection.username = req.query.sorttype; 
			    else if(req.query.sortfield=="dateofbirth")					
			       sortsection.dateofbirth = req.query.sorttype; 
			    else if(req.query.sortfield=="created_at")					
			       sortsection.created_at = req.query.sorttype; 
			}
			else { 
				sortsection.email = 'asc'; 	
			}
			
			//console.log(sortsection);	
            page = (req.query.page && req.query.page>0)? req.query.page:1;			
            perPage = (req.query.limit && req.query.limit>0)? req.query.limit:1; 	
			perPage =2;
			User.find(data).count().exec(function(err, count){
				  var totalPages = math.ceil(count/perPage);
				  //console.log(totalPages);
				  
				  var pages = {};
				  for(var i=1; i<=totalPages; i++){
					  pages[i] = i;
				  }
				  
				  console.log(pages);
			      User.find(data).limit(perPage).skip(perPage * (page-1)).sort(sortsection).exec(function(err, docs){
				      //console.log(docs);			   
				      res.setHeader('Content-Type', 'application/json');
				      res.send(JSON.stringify({'records':docs , 'totalrecords':count , 'totalpages':totalPages , 'pages':pages, 'success':1, 'authen':1}));
				  });	
			});						
	    
	});

	app.delete("/delete/:id",  function(req, res){
		var userid = req.params.id; 
		User.findOneAndRemove({_id: userid}, function(err) {
			if (err) throw err;     
			res.setHeader('Content-Type', 'application/json');	
			res.send(JSON.stringify({'authen':1 , 'success':1}));			
			console.log('User successfully deleted!');						
		});		
	});

	app.get("/view/:id", function(req, res){
		var userid = req.params.id;
		User.find({_id:userid}, function(err, records) {
			  if (err) throw err;
			  console.log(records); 
			  res.setHeader('Content-Type', 'application/json');
			  res.send(JSON.stringify({'records':records, 'success':1, 'authen':1}));
		}); 		
	});

    app.post("/edit/:id",  function(req, res){			    	
			var userid = req.params.id; 
			var error = [];	
			var data = {};
			var recor = [];				
			var condition = {};	
			if(req.method=="POST"){
				User.find(condition).exec(function(err , records){
				     if(records.length>0){
						 
					 }
					 else {
						 var anothercondition = {};
						 User.find(anothercondition).exec(function(err , records){
						     if(records.length>0){
								 
							 }
							 else {
								if(error.length <=0){		 
									//console.log(req.files);
									console.log("xf");									                          
									var currentdate = new Date();
									var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');
						  
									data = {
										first_name: req.body.first_name,
										last_name:req.body.last_name,
										address:req.body.address,
										city:req.body.city,
										state:req.body.state,
										//profile_pic:req.files[0].filename,
										zipcode:req.body.zipcode,
										dateofbirth:req.body.dateofbirth,	
										modified_at:formatteddate
									}; 
									
									console.log(data);
									User.findOneAndUpdate({_id: userid}, data, function(err, records) {
									  if (err) throw err;				 
												 
									  res.setHeader('Content-Type', 'application/json');
									  res.send(JSON.stringify({authen:1 ,success:1 , message:'User updated successfully'}));
									});
								}
								else {
								   res.setHeader('Content-Type', 'application/json');
								   res.send(JSON.stringify({authen:1 ,success:0}));
								}								 								 								 
							 }
						 });
					 }
				});											
		    }		
	});
	
	app.get("/checklogin", passport.isAdminAuthenticated, function(req, res){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({authen:1 ,success:1}));						
	});

    app.post("/adduser",  function(req , res){			
	        //console.log(req.files); 
			var error = [];
			var data = {};
			if(req.method=="POST"){
				 var condition = {
				   	 username:req.body.username
				 };
				 
				 User.find(condition).exec(function(err , records){
				     if(records.length>0){
						 
					 }
					 else {
						 var anothercondition = {
						     email:req.body.email	 
						 };
						 
						 User.find(anothercondition).exec(function(err , records){
							  if(records.length>0){
								  
							  }
							  else {								  
								  if(error.length<=0){                   
										//console.log(req.body); 
										//console.log(req.file); 
									   
										//console.log(req.file); 
											 
										//console.log(req.files); 
								 
										var currentdate = new Date();
										var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');				   
										data = {
											 first_name:req.body.first_name,
											 last_name:req.body.last_name,
											 email:req.body.email,
											 username:req.body.username,
											 password:bCrypt.hashSync(req.body.password),
											 //profile_pic:req.files[0].filename,
											 dateofbirth:req.body.dateofbirth,
											 created_at :formatteddate 						
										};
																	
										console.log(data);			   
										var detail = new User(data);
										detail.save(function(err){
											if(err) throw err;
												console.log('User saved successfully!');
												  
											  var profile_data = {
												  description:'ss',
												  user_id:detail._id
											  };
												  
												  var profile_detail = new UserProfile(profile_data);
												  
												  profile_detail.save(function(err){
													  if(err) console.log(err);
													  detail.userprofiles.push(profile_detail);
													  detail.save(function(err){});
												  });
											   
												  mailoptions = {
													  to:data.email,
													  subject: "User Registration",
													  text:"User Registered successfully"
												  };
											   
												  var mailObj = mail.configMail(mailer);
												  
												  mailObj.sendMail(mailoptions, function(error , response){
													  if(error){
														  console.log(error);
													  }
													  else {
														  console.log(response.message); 
													  }
												  });
												  
												  res.setHeader('Content-Type', 'application/json');
												  res.send(JSON.stringify({authen:1 , success:1 , message:'User added successfully'})); 				   
											});			   			    
				                   }								  								 
							   }
						 });
					 }
				 });
				
				  
			}
			else {
				res.setHeader('Content-Type', 'application/json');
			    res.send(JSON.stringify({authen:1 , success:0}));			
			}				
	});
		
	app.post("/user/adduser", multer({dest: "./uploads/"}).array("uploads", 12) , function(req , res){			
	        console.log(req.files); 
			var error = [];
			var data = {};
			//console.log(req.method);
			if(req.method=="POST"){
				if(error.length<=0){                   
				     //console.log(req.body); 
					//console.log(req.file); 
				    
					var currentdate = new Date();
					var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');	
					data = {
						first_name:req.body.first_name,
						last_name:req.body.last_name,
						email:req.body.email,
						profile_pic:req.files.filename,
						dateofbirth:req.body.dateofbirth,
						created_at :formatteddate 						
					};
                        
					console.log(data);			   						
					var detail = new User(data);
					detail.save(function(err){
						if(err) throw(err);
						console.log('User saved successfully!');
					  
						var profile_data = {
							description:'ss',
							user_id:detail._id
						};
						  
						var profile_detail = new UserProfile(profile_data);
					  
						profile_detail.save(function(err){
							if(err) console.log(err);
							detail.userprofiles.push(profile_detail);
							detail.save(function(err){});
						});
					   
						mailoptions = {
							to:data.email,
							subject: "User Registration",
							text:"User Registered successfully"
						};
				   
						var mailObj = mail.configMail(mailer);
					  
						mailObj.sendMail(mailoptions, function(error , response){
							if(error){
							  console.log(error);
							}
							else {
							  console.log(response.message); 
							}
						});
					  
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify({authen:1 , success:1 , message:'User added successfully'}));
					});			   			    
				} 
			}
			else {
				res.setHeader('Content-Type', 'application/json');
			    res.send(JSON.stringify({authen:1 , success:0}));			
			}				
	});
	
	app.post('/login',  function(req, res, next){
		 //console.log(req);	
		 
		 passport.authenticate('login', function(err, user, info) {
              if(err){ 
			     return next(err); 
			  }
			  
              if(!user){ 
			      res.setHeader('Content-Type', 'application/json');
		          res.send(JSON.stringify({authen:0, success:0})); 
			  }
			  else {
				  req.login(user, function(err) {
					   if(err){ return next(err); }
					   res.setHeader('Content-Type', 'application/json');
					   
					   if(req.user.profile_pic!=""){
							if(!fs.existsSync("uploads/"+req.user.profile_pic)){	
							    req.user.profile_pic = "default.jpg";
							}
					   }
					   else {
							 req.user.profile_pic = "default.jpg";
					   }
					   
                       console.log(req.user);					 					 
					   if(req.user.is_admin==1){					   
					      res.send(JSON.stringify({
						     authen:1, 
                             success:1, 
					         usertype:'admin',
						     records:req.user
					      }));
					   }
					   else {
					      res.send(JSON.stringify({
						    authen:1, 
						    success:1, 
						    usertype:'user', 
						    records:req.user
					      }));	 
					   }
				  });
			  }
         })(req, res, next);
        //res.setHeader('Content-Type', 'application/json');
		//res.send(JSON.stringify({authen:1, success:1}));
    });
		
	/* app.post("/login", function(req , res){
        sess = req.session;       
        var resp = func.isGuestSession(sess);
		if(!resp){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({authen:1 , success:0}));			
		}
	    else { 		 
			var error = [];		
			if(req.method=="POST"){
				console.log(req.body.username);
				var data = {
					username:req.body.username,
					password:req.body.password
				}
				
				if(error.length<=0){									
					User.find(data, function(err, user) {
						  if (err) throw err;
						  console.log(user);    
						  if(user.length>0){	
				               sess.isLoggedIn = 1;
							   sess.userid=user[0]._id;
							   sess.save();
							   var detail = {
								   maxAge:900000,
								   httpOnly:true
							   };
							   console.log(sess); 
							   res.cookie('user' , user._id , detail);
							   //console.log(res); 
							   res.setHeader('Content-Type', 'application/json');
							   res.send(JSON.stringify({success:1 , authen:1})); 				   
						  }
						  else {						  
							   res.setHeader('Content-Type', 'application/json');
							   res.send(JSON.stringify({success:0 , error:'Either username or password is incorrect.' , authen:0}));
						  }					      		  
					});  				
				}
				else  {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({success:4 , error:'Invalid Request' , authen:0 }));
				} 
			}
			else {
				 res.setHeader('Content-Type', 'application/json');
				 res.send(JSON.stringify({success:2 , error:'Invalid Request' , authen:0 }));
			}		
		}
	}); */

    /*app.post("/login",  function(req , res, next){
        sess = req.session;       
		passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
               if(!user) {
                 res.setHeader('Content-Type', 'application/json');
		         res.send(JSON.stringify({success:1 , authen:0 }));				   			     
			   }
			   req.logIn(user, function(err) {
			    if (err) { return next(err); }
			     res.setHeader('Content-Type', 'application/json');
		         res.send(JSON.stringify({success:1 , authen:0 }));
			   });
           })(req, res, next);
           
	});*/	

    app.get('/exportusers', passport.isAdminAuthenticated, function(req , res){
         User.find({} , function(err, records){
	         if(err) 
				throw err;
             
			 var fields = ['first_name', 'last_name', 'email', 'username', 'address', 'city' , 'state', 'zipcode', 'dateofbirth'];
			 
             var fieldNames = ['FirstName', 'LastName', 'Email', 'Username', 'Address', 'City', 'State', 'Zipcode', 'DateofBirth'];
			 
             var data = json2csv({data:records, fields: fields, fieldNames: fieldNames });
			 
			 res.attachment('users.csv');
             res.status(200).send(data);			 
		 });	
	});

    app.get('/exportxlsusers', passport.isAdminAuthenticated, function(req , res){
         User.find({} , '_id first_name last_name username email address city state zipcode dateofbirth',  function(err, records){
	         if(err) 
				throw err;
             console.log(records);	
			 
			 var styles = {
			   headerDark: {
					fill: {
					  fgColor: {
						rgb: 'FF000000'
					  }
					},
					font: {
					  color: {
						rgb: 'FFFFFFFF'
					  },
					  sz: 14,
					  bold: true,
					  underline: true
					}
			   },
			   cellPink: {
					fill: {
					  fgColor: {
						rgb: 'FFFFFF'
					  }
					}
			   },
			   cellGreen: {
					fill: {
					  fgColor: {
						rgb: 'FF00FF00'
					  }
					}
			   }
			};

             let heading = [
               [
			      {value: 'ID', style: styles.headerDark}, 
			      {value: 'FirstName', style: styles.headerDark}, 
			      {value: 'LastName', style: styles.headerDark},
				  {value: 'UserName', style: styles.headerDark},
                  {value: 'Email', style: styles.headerDark},				  
				  {value: 'Address',  style: styles.headerDark},
				  {value: 'City', style: styles.headerDark},
				  {value: 'State', style: styles.headerDark},
				  {value: 'Zipcode', style: styles.headerDark},
				  {value: 'DateofBirth', style: styles.headerDark}
			   ]
               
             ];
			 
			 var specification = {
				  _id: { 
					   displayName: 'ID', 
					   headerStyle: styles.headerDark, 
					   cellStyle: styles.cellPink,
					   width: 120 
				  },
				  first_name: { 
					   displayName: 'FirstName',  
					   headerStyle: styles.headerDark, 
					   cellStyle: styles.cellPink,
					   width: 120 
				  },			  
				  last_name: {
					   displayName: 'LastName',
					   headerStyle: styles.headerDark,
					   cellFormat: styles.cellPink,
					   width: 140 
				  },
				  username: {
					   displayName: 'UserName',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  email: {
					   displayName: 'Email',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  address: {
					   displayName: 'Address',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  city: {
					   displayName: 'City',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  state: {
					   displayName: 'State',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  zipcode: {
					   displayName: 'Zipcode',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  },
				  dateofbirth: {
					   displayName: 'Dateofbirth',
					   headerStyle: styles.headerDark,
					   cellStyle: styles.cellPink, 
					   width: 220 
				  }
             };

             var data = excel.buildExport([{
				  name:'users',
				  //heading:heading,
				  specification:specification,
				  data:records				 
			 }]);
			 
			 res.attachment('users.xlsx');
             return res.status(200).send(data);			 
		 });	
	});	
	
	app.get('/exportpdfusers', function(req , res){
		var options = {format: 'Letter'};
		
		var info = {
			 "Company": "ABC",
			 "Team": "JsonNode",
			 "Number of members": 4,
			"Time to finish": "1 day"
		}
		
		res.render('views/users/users', {
			info: info,
		}, function (err, HTML){
			pdf.create(HTML, options).toFile('./downloads/employee.pdf', function (err, result){
				if(err){
					console.log(err);
					return res.status(400).send({
						//message: errorHandler.getErrorMessage(err)
					});
				}
			})
		 });	     							
    });
	
	app.delete("/removemultiple", passport.isAdminAuthenticated, function(req, res){
		var ids = req.query.ids; 
		var myarr = ids.split(",");  
		
		for(var i=0; i<myarr.length; i++){
			if(myarr[i]!=""){
				console.log(myarr[i]);
				User.findOneAndRemove({_id: myarr[i]}, function(err) {
					if (err) throw err;     					
					console.log('User successfully deleted!');						
				});	
			}
		}
		res.setHeader('Content-Type', 'application/json');	
		res.send(JSON.stringify({authen:1 , success:1}));							    
	});

    app.get('/totalusers', function(req, res){
		User.find().count().exec(function(err, count){
			if(err)
			  throw err;
		    res.setHeader('Content-Type', 'application/json');	
			res.send(JSON.stringify({users:count , success:1 , authen:1}));						
		});
	}); 

    app.get("/viewhtml/:id",  passport.isAdminAuthenticated, function(req, res){            		     	
		var userid = req.params.id;
		User.findOne({_id:userid})
		    .populate('userprofiles')
			.exec(function(err, records) {
				  //console.log(records);
				  if (err) throw err;
				  console.log(records); 				  
				  res.render('users/views', {
					  records:records,
					  success:1,
					  authen:1				  
				  });
		    }); 				
	});	
	
	app.post("/logout", function(req, res){
        req.logout();
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({authen:0 ,success:1}));						
	});
	
	app.post('/user/editpassword',  function(req, res){		   
		if(req.method=="POST"){  	
            console.log("user");
            //req.user._id = '590319eb86de9e0e380bfab6';			
			console.log(req.user._id);
		    User.find({_id:req.user._id} , function(err, records){
				if(err) throw err;
				var errors = [];
				console.log(records[0].password);
				//console.log(JSON.parse(records).keys.length);				
				
				if(bCrypt.hashSync(req.body.newpassword)==records[0].password){					
				    errors.push('New password is same as current password');
				}
				
				if(!bCrypt.compareSync(req.body.oldpassword, records[0].password)){					
					errors.push('Enter correct old password');									
				}
												
				if(req.body.newpassword!=req.body.confirmpassword){					
					errors.push('New password does not match with confirm password');
			    }
				
				if(errors.length>0){									
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({'success':0, 'authen':1 , 'errors':errors}));	
				}
                else {
					var data = {
						   password:bCrypt.hashSync(req.body.newpassword)
					};
				 
					User.findOneAndUpdate({_id:req.user._id}, data, function(err, records){
						if(err) throw err;
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify({'records':records, 'success':1, 'authen':1}));
					}); 				
				}
			});			
		}         	
	});
	
	app.all('/user/editprofile', passport.isAuthenticated, function(req, res){		   
		if(req.method=="POST"){  	
            //console.log("user");
            //console.log(req.body);			
		    User.find({_id:req.user._id} , function(err, records){
				if(err) throw err;
				if(records.length>0){
					var errors = [];
					//console.log(records[0].password);
					//console.log(JSON.parse(records).keys.length);	
					var data = {					
						email:req.body.email,
						username:req.body.username,
						userid:req.user._id
					};	
				
					/*				
						if(func.isUserExists(User, data, "email")){
							errors.push("Email already exists.");
						}
					
						if(func.isUserExists(User, data, "username")){
							errors.push("Username already exists."); 	
						}				
					*/
				
					async.parallel([
					   function(cb){
						   User.find({email:data.email}, cb);
					   },
					   function(cb){
						   User.find({username:data.username}, cb);
					   }
					 ], function(err, results){
							 
						 //console.log("results1"); 
						 //console.log(results[1][0].email);
						 //console.log("results2"); 
						 
						 if(results[0].length>0){
							 if(results[0].length>1){
								 errors.push("Email already exists.");
							 }
							 else if(!results[0][0]._id.equals(req.user._id)){
								 errors.push("Email already exists.");
							 } 
						 }
						 
						 if(results[1].length>0){
							 if(results[1].length>1){
								 errors.push("Username already exists."); 	
							 }
							 else if(!results[1][0]._id.equals(req.user._id)){							 
								 errors.push("Username already exists."); 	
							 }
						 }

						 if(errors.length>0){
							res.setHeader('Content-Type', 'application/json');
							res.send(JSON.stringify({'success':0, 'authen':1, 'errors':errors}));
						 }
						 else {					
							var data = {
							  first_name:req.body.first_name,
							  last_name:req.body.last_name,
							  email:req.body.email,
							  username:req.body.username
							};
							
							User.findOneAndUpdate({_id:req.user._id}, data, function(err, records){
								if(err) throw err;
								res.setHeader('Content-Type', 'application/json');
								res.send(JSON.stringify({'success':1, 'authen':1}));
							});					
						 }  
					});	
				 }
                 else {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({'success':0, 'authen':0}));
				 }				 
		     });			
		}
		else {
			 User.find({_id:req.user._id} , function(err, records){
				if(err) throw err;
                res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify({'success':1, 'authen':1, 'records':records}));				
		     });
	    }		
	});

    app.get('/user/recoverpassword', function(req, res){
         User.find({email:req.query.email} , function(err, records){
			     console.log(records);
                 if(records.length>0){									
					var currentdate = new Date();
                    var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');
					var expirationdate = new Date(currentdate.getTime() + 2*24*60*60*1000);
					var formattedexpirationdate = dateFormat(expirationdate ,'yyyy-mm-dd HH:MM:ss');
					var data = {
					    user_id:records[0]._id,
                        token:randtoken.generate(16),
                        expiration_time:formattedexpirationdate,
                        created_at:formatteddate 						
					};										
					
					var detail = new PasswordGenerate(data);
					detail.save(function(err){
						if(err)
						  throw err;
					  
					    var mailoptions = {
							to:records[0].email,
							subject:"Password Reset",
							text:'password reset'
						};
												
						readHTMLFile(__dirname + '/../views/emails/passwordrecovery.html', function(err, html){
								var template = handlebars.compile(html);
								
								var replacements = {
									 name: records[0].firstname+records[0].lastname,
									 reseturl:'http://127.0.0.1:8081/#/user/resetpassword/'+data.token									 
								};
								
								var htmlToSend = template(replacements);
								var mailOptions = {
									//from: 'my@email.com',
									to : req.query.email,
									subject : 'Password Reset',
									html : htmlToSend
								};
								 
								var mailObj = mail.configMail(mailer);
								mailObj.sendMail(mailOptions , function(error , response){
									if(error){
										console.log(error);
									}
									else {
										console.log(response);
									}        				
								});
								
                                res.setHeader('Content-Type', 'application/json');
				                res.send(JSON.stringify({'success':1, 'authen':0}));  														
						});						   					                            
					 });
				 }
                 else {
				    res.setHeader('Content-Type', 'application/json');
				    res.send(JSON.stringify({'success':0, 'authen':0 , 'error':'Email does not exists in system'}));
			     }			 
		 });       		
	});

    app.get('/user/resetpassword/:token', function(req, res){
         PasswordGenerate.find({token:req.params.token} , function(err, records){
			 console.log(records);
             if(records.length>0){                 				 
			     var data = {
					 token:records[0].token,					 
				 };
				 res.setHeader('Content-Type', 'application/json');
				 res.send(JSON.stringify({'success':1, 'authen':0 , 'records':data}));				 
			 }
             else {
			     res.setHeader('Content-Type', 'application/json');
				 res.send(JSON.stringify({'success':0, 'authen':0 , 'error':'Your link is not available'}));		 
			 }				 
		 });       		
	});

    app.post('/user/changepassword', function(req, res){
         PasswordGenerate.find({token:req.body.token} , function(err, records){
			 // console.log(records);			 			 
             if(records.length>0){                 				 			    
			     var data = {
				    password:bCrypt.hashSync(req.body.password) 
			     };
				 
				 User.findOneAndUpdate({_id:records[0].user_id} , data , function(err , records){
					 if(err) throw err;
					 res.setHeader('Content-Type', 'application/json');
				     res.send(JSON.stringify({'success':1, 'authen':0}));				 
				 });			                  				 				 
			 }
             else {
			     res.setHeader('Content-Type', 'application/json');
				 res.send(JSON.stringify({'success':0, 'authen':0 , 'error':'Unauthorized Access'}));		 
			 }				 
		 });       		
	});	

    app.post("/user/register", function(req , res){			
	    console.log(req.files); 
	    var error = [];
		var data = {};
		if(req.method=="POST"){
			if(error.length<=0){                   
				console.log(req.body); 
				console.log(req.file); 				
				console.log(req.file); 
				var currentdate = new Date();
				var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');				   
				data = {
						 first_name:req.body.first_name,
						 last_name:req.body.last_name,
						 email:req.body.email,
						 username:req.body.username,
						 password:bCrypt.hashSync(req.body.password),
						 profile_pic:'',
						 dateofbirth:req.body.dateofbirth,
						 created_at :formatteddate 						
				};
										
				console.log(data);			   
				var detail = new User(data);
				detail.save(function(err){
					  if(err) throw err;
					  console.log('User saved successfully!');
					  
					  var profile_data = {
						  description:'ss',
						  user_id:detail._id
					  };
					  
					  var profile_detail = new UserProfile(profile_data);
					  
					  profile_detail.save(function(err){
						  if(err) console.log(err);
						  detail.userprofiles.push(profile_detail);
						  detail.save(function(err){});
					  });
				   
					  mailoptions = {
						  to:data.email,
						  subject: "User Registration",
						  text:"User Registered successfully"
					  };
				   
					  var mailObj = mail.configMail(mailer);
					  
					  mailObj.sendMail(mailoptions, function(error , response){
						  if(error){
							  console.log(error);
						  }
						  else {
							  console.log(response.message); 
						  }
					  });
					  
					  res.setHeader('Content-Type', 'application/json');
					  res.send(JSON.stringify({authen:1 , success:1})); 				   
				});			   			    				
			} 
		}
        else {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({authen:1 , success:0}));			
		}				
	});
	
	app.get("/user/import" , function(req , res){
		 
		 var errors = [];
		 var success = [];
		 var error_detail = [];
		 
		 try{
			filereader({
				input:'files/users.xls',
				output:null,
				lowerCaseHeaders:true
			} , 
			function(err , result){				
				if(err)
				  res.send({error_code:1 ,  err_desc:err , data:null});
				var counter = 0;
				if(result.length>0){
					var i = 0;
					async.forEachSeries(result , function(result , callback){
					    //for(i=0; i<result.length; i++){
						i++;
					    var data = {
						    email:result.email,
							username:result.username,
							password:'111',
							first_name:result.first_name,
							last_name:result.last_name,
							address:result.address,
							state:result.state,							
							city:result.city,
							zipcode:result.zipcode,
							dateofbirth:result.dob							
						};
						
						console.log(data.email);
						User.find({email:data.email}).exec(function(err , records){
							//console.log(records.length);
							console.log(records);							
							if(records.length>0){								
								error_detail[i] = "User with email "+data.email+ " already exists.";
								callback();
							}
                            else {
								User.find({username:data.username}).exec(function(err , records){
									if(records.length<=0){
									   	var useob = new User(data);						
										useob.save(function(err){
											console.log(err);
											if(err){
											  error_detail[i] = err;
											}
											else {
											  counter++; 	
											  success[i] = counter;	 
											}						  
										});
									}
									else {
                                        callback();  										
										error_detail[i] = "User with username "+data.username+ " already exists.";
									}
								});
							}							
                            //console.log(error_detail);  							
						 });						
																													
					}, function(){
					   console.log(i);
					   if(i==result.length){
					      if(error_detail.length>0){
						      errors = error_detail;
					      }
					
                          res.send({error_code:1 ,  err_desc:errors , data:success});							   
					   }
				   });					
				   //console.log(error_detail);					
				}
				else {
				    res.send({error_code:1 ,  err_desc:'' , data:result});	
				}				
			}); 
		 }
		 catch(e){			 
			 res.send({error_code:1 ,  err_desc:e});
		 }
	});
	
	app.get("/user/importcsv" , function(req , res){
		var csv = require('csv-parser');		
		var results = Array();
		fs.createReadStream('files/users.csv').pipe(csv()).on('data' , function(data){			
			//res.send({error_code:1 ,  err_desc:'' , data:data});
			results.push(data);
            //console.log(data);            
		}).on('end', function (records) {
           //console.log("done");
		   var error = Array();
		   var success = 0;		   
		   var i =0;
		   async.forEachSeries(results , function(result , callback){
			       console.log(result.Email);
				   i++;				   				   
				   User.find({email:result.Email}).exec(function(err , recordsfirst){
					   if(recordsfirst.length>0){
						   error[i] = "User with email "+result.Email+" already exists";
						   callback();
					   }
					   else {
						   User.find({username:result.UserName}).exec(function(err , recordssecond){
							   if(recordssecond.length>0){
								  error[i] = "User with username "+result.UserName+" already exists";
                                  callback();								  
							   }
							   else {
								   success++;								   
								   console.log(result);
								   var data = {
									    email:result.Email,
										username:result.UserName,
										password:'111',
										first_name:result.First_Name,
										last_name:result.Last_Name,
										address:result.Address,
										state:result.State,							
										city:result.City,
										zipcode:result.ZipCode,
										dateofbirth:result.DOB							  
								   };
								   
								   var obj = new User(data);
								   obj.save(function(err){
									   callback();
								   });								   
							   }
						   })
					   }
				   });
		        } , function(){
					   if(i==results.length){
						   var error_code = 0;
						   if(error.length>0){
							  error_code =1; 
						   }
						   res.send({error_code:error_code ,  err_desc:error , data:success});		   
					   }
		    });		   		   
	    });			
	});
}