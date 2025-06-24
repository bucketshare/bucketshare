import { Router } from 'express';
import { saveFCMtoken } from '../controllers/token';

const handler = Router();

handler.post('save-fcm-token', saveFCMtoken);

export default handler;