import { z } from "zod";


export const signInSchema = z.object({
    username_email:z.string(),
    password:z.string()
});