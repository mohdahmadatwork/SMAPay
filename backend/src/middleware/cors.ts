import cors from "cors";


const corsOption = {
    origin:'http://localhost/',
    optionSuccessStatus:200
}


export function icors(){
    // cors(corsOption);
    cors();   
}