import { prisma } from '../db';
import { Request, Response } from 'express';
import { createJWT, hashPassword, comparePassword } from '../modules/auth';


export const createNewUser = async (req, res) => {  
  // console.log(req.body);
    const hash = await hashPassword(req.body.password);
  
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
  
    const token = createJWT(user);
    res.json({ token });
};


export const signin = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });
  
    if (user !== null) {
      const validPassword = await comparePassword(req.body.password, user.password);
  
      if (validPassword) {
        const token = createJWT(user);
        res.json({ token }); // Send the token in the response
      } else {
        res.status(401).send('Invalid username or password'); // Send an error response
      }
    } else {
      res.status(404).send('User not found'); // Send an error response
    }
};
  