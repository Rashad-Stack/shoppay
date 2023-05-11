import jwt from "jsonwebtoken";
export const activationToken = (payload) =>
  jwt.sign(payload, process.env.ACTIVATION_JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
