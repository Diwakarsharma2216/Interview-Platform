const authorise=(permitrole)=>{

    return (req,res,next)=>{
        const user_role=req.user.role
        if(permitrole.includes(user_role)){
            next()
        }else{
            return res.send("Unathorised")
        }
    }

}

module.exports=authorise