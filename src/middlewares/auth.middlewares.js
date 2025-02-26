import jsonwebtoken from 'jsonwebtoken';

const authMiddlewares = {
  verifyToken: (req, res, next) => {
    const accessToken = req.headers.token;
    if (accessToken) {
      const token = accessToken.split(' ')[1];
      jsonwebtoken.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decodedToken) => {
        if (err) return res.status(403).json({ message: 'Token is not valid!' });
        req.user = decodedToken;
        next();
      });
    } else {
      res.status(401).json({ message: "You're not authenticated!" });
    }
  },
  verifyAdminToken: (req, res, next) => {
    authMiddlewares.verifyToken(req, res, () => {
      if (!req.user.admin) return res.status(401).json({ message: "You're not allow do that!" });
      next();
    });
  }
};

export default authMiddlewares;
