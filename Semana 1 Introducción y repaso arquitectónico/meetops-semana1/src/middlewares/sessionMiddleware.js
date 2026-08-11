sessionMiddleware = (request, response, next) => {
  console.log("sessionMiddleware");
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  request.user = decoded;
  next();
};