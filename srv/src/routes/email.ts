import { Router } from "express";
import { notify } from "../controllers/emailController";

const Email = Router();

Email.post("/notify", notify);

export default Email;