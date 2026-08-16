const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next){

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "token not provided"
    })
  }

  let decoded = null

  
  try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  
} catch (err) {
  console.log(err.name);
  console.log(err.message);

  return res.status(401).json({
    message: "token is invalid",
  });
}
  
  req.user = decoded
  next()
}

module.exports = identifyUser