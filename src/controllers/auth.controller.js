import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { sendOTP } from '../libs/mailer.js';
import RefreshToken from '../models/RefreshToken.js';
import User from '../models/User.js';
import redis from '../libs/redis.js';

const accessTokenGenerator = (payload) => {
  return jsonwebtoken.sign(payload, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '30d' });
};
const refreshTokenGenerator = (payload) => {
  return jsonwebtoken.sign(payload, process.env.REFRESH_SECRET_TOKEN, { expiresIn: '31d' });
};

const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      const { password, email, otp, name } = req.body;
      const savedOTP = await redis.get(email);
      if(parseInt(otp) !== savedOTP) return res.status(401).json({message: 'This OTP is incorrect!'});
      await redis.del(email);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hashed });
      const user = await newUser.save();
      const accessToken = accessTokenGenerator({ id: user._id, admin: user.admin });
      const refreshToken = refreshTokenGenerator({ id: user._id, admin: user.admin });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'None'
      });

      // Save token
      await new RefreshToken({ token: refreshToken, userId: user._id }).save();

      res.status(201).json({ user, accessToken });
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
        sameSite: 'None' //// *****
      });

      // Save token
      await new RefreshToken({ token: refreshToken, userId: user._id }).save();
      return res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { email, name, picture } = req.data;
      let user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({ name, email, avatar: picture });
        user = await newUser.save();
      }
      user.avatar = picture;
      await user.save();

      const accessToken = accessTokenGenerator({ id: user._id, admin: user.admin });
      const refreshToken = refreshTokenGenerator({ id: user._id, admin: user.admin });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Save token
      await new RefreshToken({ token: refreshToken, userId: user._id }).save();

      return res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log(req.cookies);
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
  logout: async (req, res) => {
    try {
      await RefreshToken.findOneAndDelete({ token: req.cookies.refreshToken });
      res.clearCookie('refreshToken', { httpOnly: true, path: '/' });
      res.status(200).json({ message: 'Successfully!' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOTP: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({email});
      if (user) return res.status(409).json({ message: 'This email has already been used.' });
      const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      const response = await sendOTP(email, otp);
      redis.set(email, otp, {ex: 60 * 5});
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
export default authController;

// https://chatgpt.com/c/67b60aa1-6be8-8005-b5d8-4dea0ecedf9d
