import { Request, Response } from 'express';
import userService from '../../services/auth';
import Jwt from '../../utils/jwt';
import { asyncHandler } from '../../helpers';

const authController = {
  /**
   * @method  POST - register
   * @desc Feature: signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */

  register: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let user = await userService.register(req.body);
    let { accessToken, refreshToken } = Jwt.generateAccesTokens(user.id);
    // send email verification
    res.status(201).json({ ...user, accessToken, refreshToken });
  }),

  /**
   * @method  POST - login
   * @desc Feature: log in the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */

  login: asyncHandler(async (req: Request, res: Response) => {
    let user = await userService.login(req.body);
    let { accessToken, refreshToken } = Jwt.generateAccesTokens(user?.id);
    res.status(201).json({ ...user, accessToken, refreshToken });
  }),
};

export default authController;
