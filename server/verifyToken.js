const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // if we replaces "authorization" with "token", then we shall write "token" in the header
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer") {
        return res.status(401).json("Not a valid token!");
    }

    jwt.verify(token, process.env.PASS_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      console.log(JSON.stringify(user));
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = {  verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
