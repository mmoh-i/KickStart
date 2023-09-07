import jwt, { JwtPayload } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt' //hashing password 

export const JWT_SECRET = process.env.JWT_SECRET 

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}


export const createJWT = (user: { id: string; username: string }) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username},JWT_SECRET)
        return token
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 5);
}
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};
