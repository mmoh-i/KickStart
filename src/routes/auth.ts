import { Router } from 'express';
import AuthValidator from '../validators/user';
import authController from '../controllers/Auth';
import Validator from '../middlewares/validator';

const router = Router();

router
  .route('/register')
  .post(Validator.validate(AuthValidator.register()), authController.register);
router
  .route('/login')
  .post(Validator.validate(AuthValidator.login()), authController.login);

export default router;
