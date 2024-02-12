import zod from "zod";
import { SignupSchema,signUpPassSchema } from "./signupZodSchema";
import { signInSchema } from "./signinZodSchema";
import { UpdateProfilePassSchema , UpdateProfileSchema} from "./updateProfileZodSchema";

export const validateField = (fieldName, value,data) => {
    let errors = {};
    try {
        if (fieldName=="confirmpassword" || (fieldName=="password" && data.confirmpassword.length > 0)) {
            signUpPassSchema.parse({[fieldName]:value,password:data.password});
            errors = { ...errors, [fieldName]:200 };
        }else{
            if(fieldName=="password" && data?.confirmpassword?.length > 0) {
                signUpPassSchema.parse({[fieldName]:value,password:data.password});
                errors = { ...errors, [fieldName]:200 };
                const fieldSchema = zod.object({ [fieldName]: SignupSchema.shape[fieldName] });
                fieldSchema.parse({ [fieldName]: value });
                errors={ ...errors, [fieldName]: 200 };
            }else if (value==="") {
                errors={ ...errors, [fieldName]: null };
            }else{
                const fieldSchema = zod.object({ [fieldName]: SignupSchema.shape[fieldName] });
                fieldSchema.parse({ [fieldName]: value });
                errors={ ...errors, [fieldName]: 200 };
            }
        }
    } catch (error) {
        errors = { ...errors, [fieldName]: error.errors[0] };
    }
    finally{
        return errors;
    }
};

export const validateSignUpDataAtOnce  = (data) => {
    try {
        signUpPassSchema.parse({password:data.password , confirmpassword:data.confirmpassword})
        delete data.confirmpassword;
        SignupSchema.parse(data);
        return true;
    } catch (error) {
        return error.errors[0];
    }
}
export const validateUpdateProfileField = (fieldName, value,data) => {
    let errors = {};
    try {
        if (fieldName=="confirmpassword" || (fieldName=="password" && data.confirmpassword.length > 0)) {
            UpdateProfilePassSchema.parse({[fieldName]:value,password:data.password});
            errors = { ...errors, [fieldName]:200 };
        }else{
            if(fieldName=="password" && data?.confirmpassword?.length > 0) {
                UpdateProfilePassSchema.parse({[fieldName]:value,password:data.password});
                errors = { ...errors, [fieldName]:200 };
                const fieldSchema = zod.object({ [fieldName]: UpdateProfileSchema.shape[fieldName] });
                fieldSchema.parse({ [fieldName]: value });
                errors={ ...errors, [fieldName]: 200 };
            }else if (value==="") {
                errors={ ...errors, [fieldName]: null };
            }else{
                const fieldSchema = zod.object({ [fieldName]: UpdateProfileSchema.shape[fieldName] });
                fieldSchema.parse({ [fieldName]: value });
                errors={ ...errors, [fieldName]: 200 };
            }
        }
    } catch (error) {
        errors = { ...errors, [fieldName]: error.errors[0] };
    }
    finally{
        return errors;
    }
};

export const validateUpdateProfileDataAtOnce  = (data) => {
    // try {
        delete data.balance;
        for (let key in data) {
            if (typeof data[key] === 'string' && data[key].length <1) {
                console.log("data[key]",data[key]);
                delete data[key];
            }
        }
        if (data.password?.length>1 || data.confirmpassword?.length>1) {
            UpdateProfilePassSchema.parse({password:data.password , confirmpassword:data.confirmpassword});
        }
        if (data?.confirmpassword) {
            delete data.confirmpassword;
        }
        UpdateProfileSchema.parse(data);
        return {
            data:data,
            isAnyError:false
        };
    // } catch (error) {
    //     return {
    //         isAnyError:true,
    //         error:error.errors
    //     } 
    // }
}

export const validateSignIn = (fieldName, value) => {
    let errors = {};
    try {
        const fieldSchema = zod.object({ [fieldName]: signInSchema.shape[fieldName] });
        fieldSchema.parse({ [fieldName]: value });
        errors={ ...errors, [fieldName]: 200 };
    } catch (error) {
        errors = { ...errors, [fieldName]: error.errors[0] };
    }
}

export const validateSignInDataAtOnce  = (data) => {
    try {
        console.log("data",data);   
        signInSchema.parse(data);
        return true;
    } catch (error) {
        return error.errors[0];
    }
}
