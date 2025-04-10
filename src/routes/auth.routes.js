import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddlewares from '../middlewares/auth.middlewares.js';
const authRouter = Router();

const SE06202_EMAIL = [
  "tienndbd00286@fpt.edu.vn",
  "phuocnvbd00303@fpt.edu.vn",
  "lamtnbd00305@fpt.edu.vn",
  "nhatnmbd00309@fpt.edu.vn",
  "khanhnvbd00314@fpt.edu.vn",
  "quanvhbd00318@fpt.edu.vn",
  "khuongndbd00321@fpt.edu.vn",
  "tinnvbd00325@fpt.edu.vn",
  "tunmbd00341@fpt.edu.vn",
  "linhnnnbd00345@fpt.edu.vn",
  "trihvbd00350@fpt.edu.vn",
  "luonghtbd00357@fpt.edu.vn",
  "vyltmbd00359@fpt.edu.vn",
  "longnhbd00361@fpt.edu.vn",
  "luatntvbd00362@fpt.edu.vn",
  "yentnbd00405@fpt.edu.vn",
  "quitspbd00419@fpt.edu.vn",
  "phapdvbd00420@fpt.edu.vn",
  "quangvabd00422@fpt.edu.vn",
  "sonhhbd00426@fpt.edu.vn",
  "donghvbd00430@fpt.edu.vn",
  "hailqbd00435@fpt.edu.vn",
  "quanvmbd00436@fpt.edu.vn",
  "hynmbd00438@fpt.edu.vn",
  "duypvnbd00443@fpt.edu.vn",
  "thongnvbd00449@fpt.edu.vn",
  "nhatdsbd00450@fpt.edu.vn",
  "thangppbd00451@fpt.edu.vn",
  "nguyenhvtbd00471@fpt.edu.vn",
  "trucltbd00507@fpt.edu.vn"
];

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.post('/refresh', authController.requestRefreshToken);

authRouter.post('/logout', authMiddlewares.verifyToken, authController.logout);

authRouter.get('/google', authMiddlewares.getGoogleData, authController.googleLogin);

authRouter.post('/get-otp', authController.getOTP);

export default authRouter;
