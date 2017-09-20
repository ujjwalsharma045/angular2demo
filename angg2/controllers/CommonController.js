module.exports = function(app , func , mail, upload, storage, mailer, multer, validator, Product, Category, paginate , cors , dateFormat , dateDiff, dobByAge, json2csv, excel , pdf, passport , LocalStrategy, bCrypt , fs, async, PasswordGenerate, randtoken, handlebars){ 
    var math = require('mathjs');  
		
	app.get("/common/totalproducts", function(req, res){		 
		   Product.find().count().exec(function(err , count){
			   if(err)
				  throw err;			  
			   res.setHeader('Content-Type', 'application/json');
			   res.send(JSON.stringify({authen:1 , success:1 , totalproducts:count})); 				   
		   });		   	   
	});

    app.get("/common/totalcategories", function(req, res){		 
		   Category.find().count().exec(function(err , count){
			   if(err)
				  throw err;			  
			   res.setHeader('Content-Type', 'application/json');
			   res.send(JSON.stringify({authen:1 , success:1 , totalcategory:count})); 				   
		   });		   	   
	});	
}