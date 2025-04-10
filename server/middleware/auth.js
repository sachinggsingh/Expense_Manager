const jwt = require("jsonwebtoken");

const isAuth = async (req,res,next)=>
{
    try
    {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json({msg:"You are not authorized person",success:false})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
        {
            return res.status(401).json({msg:"You are not authorized to do this",success:false})
        }
        req.user = decoded.userId;
        next();
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({msg:"Something went wrong",success:false})
    }
}

module.exports = isAuth