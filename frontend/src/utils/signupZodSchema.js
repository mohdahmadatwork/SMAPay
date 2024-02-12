import {z} from 'zod';
const alphabetsOnly = /^[a-zA-Z]+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
export const SignupSchema = z.object({
  firstname: z.string().min(3,{message: 'First Name must be at least 3 characters'}).regex(alphabetsOnly,{message:"Name should contain alphabets only"}).max(50,{message: 'First Name must be between 3 to 50 characters'}),
  lastname: z.string().min(3,{message: 'Last Name must be at least 3 characters'}).regex(alphabetsOnly,{message:"Name should contain alphabets only"}).max(50,{message: 'Last Name must be between 3 to 50 characters'}),
  email: z.string().email(),
  username: z.string().min(3,{message: 'Username must be at least 3 characters'}).max(20,{message: 'Username must be between 3 to 20 characters'}),
  password: z.string().min(8,{message: 'Password must be at least 8 characters'}).regex(passReg,{message:"Password should contain atleast <br> 1 capital letter <br> 1 small letter <br> 1 Special character"}).max(50,{message: 'Password must be between 8 to 50 characters'})
});
export const signUpPassSchema = z.object({
  password: z.string().min(8).max(50),
  confirmpassword: z.string()
}).refine((data)=>data.password===data.confirmpassword,{
  message: "Passwords don't match",
  path: ["confirm"], // path of error
});
