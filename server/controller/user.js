const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect Email and Password", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ msg: `Logged in successfully, ${user.name}`, success: true , user: {
        _id : user._id,
        name: user.name,
        email: user.email

      }});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


const logout = async (req,res)=>
{
  try
  {
    return res.status(200).clearCookie("token",null,{maxAge:0}).json({msg:"Logged out successfully",success:true})
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({msg:"Something went wrong",success:false})
  }
}

 module.exports = {
  register,
  login,
  logout
};
