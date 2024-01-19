const checkUser = (req,res,next)=>{
    if(req.session.admin|| req.session.volData){
        next()
    }else{
        res.redirect('/')
    }
}

module.exports =checkUser;