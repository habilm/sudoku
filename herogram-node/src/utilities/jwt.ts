import jwt from "jsonwebtoken";

const jwtSecretKey = "lkjhg";

export const getToken = (id: string | number) => {
  return jwt.sign(
    {
      id,
    },
    jwtSecretKey,
    { expiresIn: process.env.JWT_EXPIRE || "240h" }
  );
};

export const verify = (token: string) => {
  return jwt.verify(token.substring(7), jwtSecretKey);
};
