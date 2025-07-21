import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.admin = decoded; // store admin info
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}
