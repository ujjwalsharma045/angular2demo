module.exports = function(app , func , mail, upload, storage, mailer, multer, validator, Product, paginate , cors , dateFormat , dateDiff, dobByAge, json2csv, excel , pdf, passport , LocalStrategy, bCrypt , fs, async, PasswordGenerate, randtoken, handlebars){ 
    var math = require('mathjs');  
		
	app.post("/product/add", function(req, res){
		   if(req.method=="POST"){
			   var currentdate = new Date();
               var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');
			   var data = {
				   title:req.body.title,
				   description:req.body.description,
				   meta_tag:req.body.meta_tag,
				   meta_description:req.body.meta_description,
				   price:req.body.price,
				   cost_price:req.body.cost_price,
				   discount_type:req.body.discount_type,
				   discount:req.body.discount,
				   created_at:formatteddate, 
				   status:req.body.status
			   };
			   
			   var productobj = new Product(data);
			   productobj.save(function(err){
				   if(err)
					  throw err;
				  
			       res.setHeader('Content-Type', 'application/json');
				   res.send(JSON.stringify({authen:1 , success:1})); 				   
			   });
		   }
           else {
	           res.setHeader('Content-Type', 'application/json');
			   res.send(JSON.stringify({authen:1 , success:0})); 				   
           }		   
	});

    app.post("/product/edit/:id", function(req, res){
		   if(req.method=="POST"){
				   var productid = req.params.id;
				   var currentdate = new Date();
				   var formatteddate = dateFormat(currentdate ,'yyyy-mm-dd HH:MM:ss');
				   var data = {
					   title:req.body.title,
					   description:req.body.description,
					   meta_tag:req.body.meta_tag,
					   meta_description:req.body.meta_description,
					   price:req.body.price,
					   cost_price:req.body.cost_price,
					   discount_type:req.body.discount_type,
					   discount:req.body.discount,
					   modified_at:formatteddate,
					   status:req.body.status
				   };
			   				   
				   Product.findOneAndUpdate({_id:productid} , data , function(err){
					   if(err)
						  throw err;
					  
					   res.setHeader('Content-Type', 'application/json');
					   res.send(JSON.stringify({authen:1 , success:1 , product_id:''})); 				   
				   });
		   }
           else {
                   res.setHeader('Content-Type', 'application/json');
			       res.send(JSON.stringify({authen:1 , success:0})); 				   
           }		   
	});	

    app.get("/product/view/:id", function(req , res){
	      var productid = req.params.id;
		  Product.find({_id:productid} , function(err, records){
			 if(err)
			   throw err;
					  
		     res.setHeader('Content-Type', 'application/json');
			 res.send(JSON.stringify({authen:1 , success:1, records:records})); 				   
		  });		   
	});

    app.get("/product/index",  function(req , res){	
	
          var condition = {};		  
		  var sortdata = {};		  
		  var perPage = 10;		  
		  var currentpage = 1;
		  
		  Product.find(condition).count().exec(function(err , count){
			  if(err)
				throw err;	
			
			  var totalPages = math.ceil(count/perPage);
			  var pages = {}
			  
			  for(var i=1; i<totalPages; i++){
				  pages[i] = i;
			  }
		  			  
			  Product.find(condition).limit(perPage).skip(perPage*(currentpage -1)).sort(sortdata).exec(function(err , docs){
				   if(err)
					  throw err;
				   
                   res.setHeader('Content-Type', 'application/json');
			       res.send(JSON.stringify({'authen':1 , 'success':1 , 'records':docs , 'totalrecords':count ,  'totalpages':totalPages , 'pages':pages}));
			  });							  
		  });		   
	});

    app.delete("/product/delete/:id", function(req , res){          
		  var productid = req.params.id;		  
		  Product.findOneAndRemove({_id:productid} , function(err){
			 if(err)
			   throw err;
             res.setHeader('Content-Type', 'application/json');	
			 res.send(JSON.stringify({'authen':1 , 'success':1}));			
		  });
    });
	
    app.get("/featuredproduct" , function(req , res){
          if(req.method=="POST"){
				var condition = {
					is_featured:1,
				};
				
                Product.find(condition).exec(function(err ,docs){
				    if(err)
                       throw err;
                    res.setHeader('Content-type' , 'application/json');
                    res.send(JSON.stringify({'authen':1 , 'success':1 , 'docs':docs})); 					
				});				
		  }
    }); 			

    app.get("/product/total", function(req , res){          
		  Product.find().count().exec(function(err , count){
			 if(err)
			   throw err;
             res.setHeader('Content-Type', 'application/json');	
			 res.send(JSON.stringify({'authen':1 , 'success':1 , 'products':count}));			
		  });
    });
}