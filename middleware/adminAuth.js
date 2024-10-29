import jwt from "jsonwebtoken"


const adminAuth =async (req, res, next) => {
    try {

        const {token} = req.headers
        if (!token) {
            return res.status(401).json({ msg: "Access denied. No token provided." })
            
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ msg: "Access denied. Invalid token." })
            
        }
        next()



        
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })

        
    }



}

 export default adminAuth