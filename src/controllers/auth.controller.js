import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';

const accessTokenGenerator = (payload) => {
  return jsonwebtoken.sign(payload, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '30m' });
};
const refreshTokenGenerator = (payload) => {
  return jsonwebtoken.sign(payload, process.env.REFRESH_SECRET_TOKEN, { expiresIn: '15d' });
};

const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hashed });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: 'This email is not registered!' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

      const accessToken = accessTokenGenerator({ id: user._id, admin: user.admin });
      const refreshToken = refreshTokenGenerator({ id: user._id, admin: user.admin });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
      });

      // Save token
      await new RefreshToken({ token: refreshToken, userId: user._id }).save();

      return res.status(200).json({ message: 'Login successfully', accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(404).json({ message: "You're not authenticated!" });

      const savedToken = await RefreshToken.findOne({ token: refreshToken });
      if (!savedToken) return res.status(404).json({ message: "You're not authenticated!" });

      const decodedToken = await new Promise((resolve, reject) => {
        jsonwebtoken.verify(savedToken.token, process.env.REFRESH_SECRET_TOKEN, (err, decodedToken) => {
          if (err) reject(err);
          else resolve(decodedToken);
        });
      });

      const newAccessToken = accessTokenGenerator({ id: decodedToken.userId, admin: savedToken.admin });
      const newRefreshToken = refreshTokenGenerator({ id: decodedToken.userId, admin: savedToken.admin });

      savedToken.token = newRefreshToken;
      await savedToken.save();

      res.cookie('refreshToken', newRefreshToken, { sameSite: 'Strict', httpOnly: true, secure: false });

      return res.status(200).json({ message: 'Successfully!', accessToken: newAccessToken });
      // })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // LOG OUT
  logout: async(req, res)=>{
    try {
      await RefreshToken.findOneAndDelete({token: req.cookies.refreshToken});
      res.clearCookie("refreshToken", {httpOnly: true, path: '/'});
      res.status(200).json({message: "Successfully!"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
};
export default authController;

// https://chatgpt.com/c/67b60aa1-6be8-8005-b5d8-4dea0ecedf9d
