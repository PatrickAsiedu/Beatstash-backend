import express from 'express';
import handleSIgnUp from '../controllers/signUpController';


const router = express.Router();



router.post('/', handleSIgnUp)

export { router }