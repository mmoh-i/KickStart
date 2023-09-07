import { error } from 'console';
import {Router} from 'express'
import { body, oneOf, validationResult } from 'express-validator';
import { handlingInputErrors } from './modules/middleware';
import { getUserProfile, updateUserProfile } from './handlers/profile';
import { create } from 'domain';
const router = Router()

/*
    * 1. product
*/
router.get('/profile')
router.get('/product/:id', () => {})//id is dynamic prm url
//router.put('/product/:id', body("name").isString(), handlingInputErrors, (req, res) => {
//})
router.post('/product/', () => {})
router.delete('/product/:id', () => {})

//router.post('/product', body("name").isString(), handlingInputErrors, createProduct)

/*
    * 2. profile
*/
router.get('/profile', getUserProfile)
router.post('/profile', body("name").isString(), handlingInputErrors, updateUserProfile) 
router.put('/Updateprofile', updateUserProfile)







export default router

