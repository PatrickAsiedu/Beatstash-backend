import express from 'express';
const router = express.Router();
import handleSIgnUp from '../controllers/signUpController';


router.post('/', handleSIgnUp)

export { router }