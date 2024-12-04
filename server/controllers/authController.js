const Users = require("../models/userModel.js");
const {
  comparePassword,
  hashPassword,
} = require("../middlewares/hash.js");
const { createToken } = require("../middlewares/jwt.js");



const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;
    const exist = await Users.findOne({ email });
    const uname = await Users.findOne({ username });
    let errors = [];

    if (exist) errors.push("Email already exists");
    if (uname) errors.push("Username already exists");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await Users.create({
      fullname,
      username,
      email,
      role,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  username, password } = req.body;

    const user = await Users.findOne({ username })
    if (!user) {
      return res.status(400).json({ error: 'User not found'})
    }

    const match = await comparePassword(password, user.password)
    if (!match) { 
      return res.json({error: "Incorrect password"})
    }
    const token = createToken(user)
    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 3600000

    })
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
    console.log(error);
  }
};

const getUser = (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message: "User logged out successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  logout,
};
