const Joi = require("joi");
const {user} = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY;


const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const generateToken = (getId) => {
  return jwt.sign({ getId }, secret, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const registerUser = async (req, res) => {
    console.log(req.body);
  const { name, email, password } = await req.body;

  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isUserEmailAlreadyExists = await user.findOne({email});
    console.log("isuser",isUserEmailAlreadyExists);

    if (isUserEmailAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User email already",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = await user.create({
        name,
        email,
        password: hashPassword,
      });

      if (newUser) {
        const token = generateToken(newUser?._id);

        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });

        res.status(201).json({
          success: true,
          message: "User registration successful",
          userData: {
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id,
          },
        });

     
      }
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const loginUser = async (req, res) => {
  const { password, email } = await req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const getUser = await user.findOne({ email });

    if (!getUser) {
      return res.json({
        message: "Incorrect email",
        success: false,
      });
    }

    const checkAuth = await bcrypt.compare(password, getUser.password);

    if (!checkAuth) {
      return res.json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = generateToken(getUser?._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      success: true,
      message: "User logged in",
    });

   
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

module.exports = { registerUser, loginUser, logout };