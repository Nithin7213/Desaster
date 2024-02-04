const checkUser = (req,res,next)=>{
    if(req.session.admin|| req.session.volData || req.session.user){
        next()
    }else{
        res.redirect('/')
    }
}

module.exports =checkUser;