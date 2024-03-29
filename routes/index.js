var express = require('express');
var router = express.Router();
var con=require('../config/config');
let nodemailer = require('nodemailer');
const checkadmin = require('../middleware/checkAdmin')
/* GET home page. */
router.get('/',(req,res)=>{
res.render('admin/homeIndex')
})
router.get('/delteD/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = `Delete from disaster where id = ${id}`
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/home')
    }
  })

})
router.get('/logout',(req,res)=>{
      req.session.destroy()
      res.redirect('/')
})
router.get('/login',(req,res)=>{
  res.render('admin/adminlogin')
})
router.post('/sentAlert',checkadmin,(req,res)=>{
  try {
      let place  = req.body.place
      console.log(place,req.body.message,"--")
      let q = "select * from user where place = ?"

      let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'ecommercetest246@gmail.com',
          pass:'iftgqrcgrduigxuk'
        },
        tls:{
          rejectUnauthorized:false,
        },
      })
        con.query(q,[place],(err,row)=>{
                  if(err){
                       console.log(err)  
                  }else{
                        console.log(row,"userList")
                        row.map(async(user)=>{
                            let {email} =user;
                            let mailOption  = {
                              from:"Desaster  Team",
                              to:email,
                              subject:"Alerts",
                              text:`be alert of flood @ ${place},${req.body.message}`,
                            };
                            await  transporter.sendMail(mailOption,function(err,info){
                              if(err){
                                console.log(err)
                              }else{
                                console.log("emailsent Succecfully")
                                res.redirect('/home')
                              }
                            })
                        })
                       
                       

                  }
        })
      console.log(place)
  } catch (error) {
    console.log(error)
  }
})
router.get('/alerts',checkadmin,(req,res)=>{
    try {
          let q  ="select * from disaster"
          con.query(q,(err,result)=>{
              if(err){
                  console.log(err)
              }else{
                res.render("admin/alerts",{result})
              }
          })
    } catch (error) {
      
    }
})

router.get('/home', checkadmin,function(req, res, next) {
  var sql="select * from dadmin"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      let query = "select * from skills"
      con.query(query,(err,row)=>{
            if(err){
              console.log(err)
            }else{
              console.log(result)
              res.render('admin/index',{result,row});
            }
      })
    
    }
  })

  
});
router.get('/about', function(req, res, next) {
  const product = 
  [{
    name:"iphone",
    img:"https://d28i4xct2kl5lp.cloudfront.net/product_images/134107_cf06013b-7953-4cba-940e-3b0e1c0542f9.jpg",
    dis:" a product by apple"
  },
  {
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  },{
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  },
  {
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  }
  ]
  res.render('about',{product});
});
router.get('/addProduct',checkadmin,function(req,res){
  res.render('admin/addProduct')
})

router.post('/collector',checkadmin,function(req,res){
var image_name;
if(!req.files) return res.status(400).send("no files were uploaded.");

var file=req.files.uploaded_image;
var image_name = file.name;
let sql="INSERT INTO dadmin SET ?";

console.log(file)
console.log(image_name);
if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
){
  file.mv("public/images/product/"+file.name,function(err){
    if(err) return res.status(500).send(err);
    console.log(image_name);
    console.log(req.body)
    var cata = req.body.catagory;

let data={
 
  name:req.body.name,
  place:req.body.description,
  password:req.body.price,
  Image:image_name,
}; 
console.log(data)
con.query(sql,data,(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.redirect('/home')
  }
})
}) 
} 
})
router.get('/sellers',checkadmin,(req,res)=>{
  sql = "select * from dadmin"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
  }else{
    console.log(result)
    res.render('admin/sellers',{seller:result,homepage:true})
  }
  })
})


router.get('/userlist',checkadmin,(req,res)=>{
  sql = "select * from user"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
  }else{
    console.log(result)
    res.render('admin/user',{user:result,homepage:true})
  }
  })
})

router.get('/Blocke_sellers',checkadmin,(req,res)=>{
  sql = "select * from user where status = 'blocked'"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
  }else{
    console.log(result)
    res.render('admin/blocked',{seller:result,homepage:true})
  }
  })
})
router.get('/block/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = "update seller set status = 'blocked' where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.render('admin/blocked')
    }
  })
})
router.get('/approve/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = "update seller set status = 'approved' where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
     res.redirect('/home')
    }
  })
})

router.get('/unblock/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = "update seller set status = '1' where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/home')
    }
  })
})



router.post('/adminlog',(req,res)=>{
 var username  = req.body.name;
 var pass  = req.body.pass;
 let admin = {
    admin :"admin",
    role:"admin"
 }
  if(pass=="admin" & username == "admin"){
    req.session.admin= admin;
    res.redirect('/home')
  }else{
    res.redirect('/login')
  }
})



router.get('/delete/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = "Delete from product where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/home')
    }
  })
})
router.get('/Userdelete/:id',checkadmin,(req,res)=>{
  var id = req.params.id;
  sql = "Delete from user where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/userlist')
    }
  })
})



router.post('/roots',checkadmin,function(req,res){
  var image_name;
  if(!req.files) return res.status(400).send("no files were uploaded.");
  
  var file=req.files.image;
  var image_name = file.name;
  let sql="INSERT INTO roots SET ?";
  
  console.log(file)
  console.log(image_name);
  if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
  ){
    file.mv("public/images/roots/"+file.name,function(err){
      if(err) return res.status(500).send(err);
      console.log(image_name);
      console.log(req.body)
      var cata = req.body.catagory;
  
  let data={
   
    place:req.body.place,
    Image:image_name,
  }; 
  console.log(data)
  con.query(sql,data,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/home')
    }
  })
  }) 
  } 
  })
module.exports = router;

