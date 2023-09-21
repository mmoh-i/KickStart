import { Request, Response } from 'express';
import Jwt from '../../utils/jwt';
import { asyncHandler } from '../../helpers';
import { AuthService } from '../../services';

const authController = {
  /**
   * @method  POST - register
   * @desc Feature: signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */

  register: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let user = await AuthService.register(req.body);
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
    let user = await AuthService.login(req.body);
    let { accessToken, refreshToken } = Jwt.generateAccesTokens(user?.id);
    res.status(201).json({ ...user, accessToken, refreshToken });
  }),
};

export default authController;
