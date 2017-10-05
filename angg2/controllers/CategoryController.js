module.exports = function(app , func , mail, upload, storage, mailer, multer, validator, Category, paginate , cors , dateFormat , dateDiff, dobByAge, json2csv, excel , pdf, passport , LocalStrategy, bCrypt , fs, async, PasswordGenerate, randtoken, handlebars, UserProfile){ 
    
	var math = require('mathjs');  
	var filereader = require('xlsx-to-json-lc');
    var async = require('async');	
	
	app.post("/category/add" , function(req , res){
		 if(req.method=="POST"){
            var condition = {
				title:req.body.title,
				parent_id:req.body.parent_id
			};
			
			Category.find(condition).count().exec(function(err , response){
				if(err)
				  throw err;
                console.log(response);			  
			    if(response>0){
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({authen:1 , success:0 , error:'Category already exists.'}));				
				}
				else {
					var data = {
						title:req.body.title,
						parent_id:req.body.parent_id,
						description:req.body.description,
						meta_tag:req.body.meta_tag,
						meta_description:req.body.meta_description,
						status:req.body.status,
						order:req.body.order				
			        };
			
					var category = new Category(data);
					category.save(function(err , response){
						if(err)
						  throw err;
					  
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify({authen:1 , success:1}));				
					});
				}
			}); 								
		 }
		 else {
			 res.setHeader('Content-Type', 'application/json');
			 res.send(JSON.stringify({authen:1 , success:0}));
		 }
	});

    app.post("/category/edit/:id" , function(req , res){
		 if(req.method=="POST"){
            var condition = {
				title:req.body.title,
			};						
			var error = false;
			Category.find(condition).exec(function(err , response){
			    if(response.length>=2){
					error = true;
					errormessage = "Category already exists.";  					   
				}
				else if(response.length>0){
					if(response[0]['_id']!=req.params.id){
					   error = true;
                       errormessage = "Category already exists2.";  					   
					}
				}
				
				if(!error){
					
					var data = {
						title:req.body.title,
						parent_id:req.body.parent_id,
						description:req.body.description,
						meta_tag:req.body.meta_tag,
						meta_description:req.body.meta_description,
						status:req.body.status,
						order:req.body.order				
			        };
					
			        var findcondition = {
					   _id:req.params.id	
					};
					
					var category = new Category(data);
					Category.findOneAndUpdate(findcondition , data , function(err){
						if(err)
						  throw err;
					  
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify({authen:1 , success:1}));				
					});
				}
				else {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({authen:1 , success:0 , error:errormessage}));				
				}
			}); 								
		 }
		 else {
			 res.setHeader('Content-Type', 'application/json');
			 res.send(JSON.stringify({authen:1 , success:0}));
		 }
	});	
	
	app.get("/category/view/:id" , function(req , res){
		 var categoryid = req.params.id;
	     Category.findOne({_id:categoryid} , function(err , records){
		    res.setHeader('Content-Type' , 'application/json');
			console.log(records);
			res.send(JSON.stringify({authen:1 , success:1 , records:records}));
		 });
	});
	
	app.get("/category/index" , function(req , res){
         var condition = {};
         var perPage = 40;	
         var currentpage = 1;
		 
	     Category.find(condition).count().exec(function(err , totalrecords){
			 if(err)
			   throw err;				   
		     var pages = {};
			 for(i=1; i<=totalrecords; i++){
				pages[i] = i; 
			 } 
			 
             var totalPages = math.ceil(totalrecords/perPage);			 
			 Category.find(condition).limit(perPage).skip(perPage*(currentpage-1)).sort().exec(function(err , records){
				 if(err)
			      throw err;
		         res.setHeader('Content-Type', 'application/json');
			     res.send(JSON.stringify({authen:1 , success:1 , records:records , totalpages:totalPages, pages:'pages'}));
			 });
		 });
	});

	app.get("/category/list" , function(req , res){
	     Category.find().exec(function(err , records){
		   res.setHeader('Content-Type', 'application/json');
		   res.send(JSON.stringify({authen:1 , success:1 , records:records}));	
	     });
	});
	
	app.delete("/category/remove/:id" , function(req , res){
		 var categoryid = req.params.id
	     Category.findOneAndRemove({_id:categoryid}, function(err){
		      if(err)
				throw err;
			  res.setHeader('Content-Type', 'application/json');
		      res.send(JSON.stringify({authen:1 , success:1}));	
	     });
	});
	
	app.get("/category/parent" , function(req , res){
		var condition = {
		   parent_id:''	
		};
		
		Category.find(condition).exec(function(err , records){
			if(err)
			 throw err;
		 
		    res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({authen:1 , success:1 , records:records}));	
		});
	});
	
	app.get("/category/importxls" , function(req , res){
		var err_detail = Array();
		var success = Array();
		try{
			filereader({
				input:'files/category.xls',
				output:null,
				lowerCaseHeaders:true
			},
			function (err , xlsresult){
				if(err){
				  res.setHeader('Content-Type', 'application/json');
		          res.send(JSON.stringify({authen:1 , success:1 , error:1 ,error_detail:'corrupt file'}));	
				}
			    else if(xlsresult.length>0){
					var errcounter = 0;
					var successcounter = 0;
					async.forEachSeries(xlsresult , function(result , callback){
                        //console.log(result);						
						Category.find({title:result.name}).exec(function(err , records){
							
							if(records.length<=0){
								var data = {
								    title:result.name,
									description:result.description,
									parent_id:'',
									meta_tag:result.meta_tag,
									meta_description:result.meta_description,
									order:result.sequence,
									status:result.status
								};
								//console.log(data)
								var categoryobj = new Category(data);
								categoryobj.save(function(err){
									if(err){
										err_detail[errcounter] = "Category with name "+result.name+ " could not be added due to err "+err; 
										errcounter++;
									}
									else {
										success[successcounter] = "Category with name "+result.name+ " added successfully";
										successcounter++;
									}
									callback();
								});
							}
							else {								
								err_detail[errcounter] = "Category with name "+result.name+ " already exists";
								console.log(err_detail);
								errcounter++;
								callback();
							}
						});
					} , function(){
                        res.setHeader('Content-Type', 'application/json');
						if(xlsresult.length==success.length){
							res.send(JSON.stringify({authen:1 , success:1 , error:0 , records:success}));	
						}
						else if(xlsresult.length==err_detail.length){
							res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:err_detail , records:success}));	
						}
                        else {
							//if(success.length>0){								
								res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:err_detail , records:success}));	
							//}
						}														                
					});
				}
				else {
					res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:'no data found'}));	
				} 
			});			
		}
		catch(e){
			res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({authen:1 , success:1 , error:1 ,error_detail:'corrupt file'}));	
		}
	});
	
	app.get("/category/importcsv" , function(req, res){
		var csv = require('csv-parser');
        var records = Array();
        var err_detail = Array();
		var success = Array();
		fs.createReadStream("files/category.csv").pipe(csv()).on("data" , function(data){
		   records.push(data);
		}).on("end" , function(){
			console.log(records.length);
			var errcounter = 0;
			var successcounter = 0;
			if(records.length>0){				 
				 async.forEachSeries(records , function(recordsdetail , callback){
					  console.log(recordsdetail);
					  Category.find({title:recordsdetail.name}).exec(function(err , records){
						  if(err){
							 err_detail[errcounter] = err;
							 errcounter++; 
                             callback();							 
						  }
						  else if(records.length<=0){
							  
							  var data = {
								  title:recordsdetail.name,
								  description:recordsdetail.description,
								  parent_id:'',
								  meta_tag:recordsdetail.meta_tag,
								  meta_description:recordsdetail.meta_description,
								  order:recordsdetail.sequence,
								  status:recordsdetail.status
							  };
							  console.log(data);
							  var categoryobj = new Category(data);
							  categoryobj.save(function(err){								  
								  if(err){
									  err_detail[errcounter] = "Category with name "+recordsdetail.name+" could not be added successfully";
							          errcounter++; 
									  callback();
								  }
								  else {
									  success[successcounter] = "Category with name "+recordsdetail.name+" added successfully";
                                      successcounter++;	
                                      callback();									  
								  }
							  });
						  }
						  else {
							  err_detail[errcounter] = "Category with name "+recordsdetail.name+" already exists";
							  errcounter++; 
                              callback();							  
						  }
					  });
				   }, function(){
					  res.setHeader('Content-Type', 'application/json');  
				      if(success.length>0){
						  if(err_detail.length>0){
						      res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:err_detail , records:success}));	
						  }
						  else {
							  res.send(JSON.stringify({authen:1 , success:1 , error:0 , error_detail:err_detail , records:success}));	
						  }
					  }
					  else if(err_detail.length>0){
						  res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:err_detail}));	
					  }
			     });
			}
			else {
				 err_detail[errcounter] = "No data found";
				 errcounter++; 
				 res.setHeader('Content-Type', 'application/json'); 
				 res.send(JSON.stringify({authen:1 , success:1 , error:1 , error_detail:err_detail}));	
			}
		});
	});

    app.get("/category/total" , function(req , res){
	   Category.find().count().exec(function(err , count){
		   if(err)
			   throw err;
       	   res.setHeader('Content-Type', 'application/json');
		   res.send(JSON.stringify({authen:1 , success:1 , categories:count}));	   
	   });
	});
}