import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Send from "./pages/Send";
import Dashboard from "./pages/Dashboard";
import { LoginProvider } from "./contextApi/login-context.jsx";
import { FetchUserProvider } from "./contextApi/fetchusers-context.jsx";
import { UpdateProfile } from "./pages/UpdateProfile.jsx";
function App() {

  return (
        <LoginProvider>
          <FetchUserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/signin" element={<Signin/>}></Route>
                <Route path="/send" element={ <Send/> }></Route>
                <Route path="/Dashboard" element={<Dashboard/>}></Route>
                <Route path="/updateprofile" element={<UpdateProfile/>}></Route>
              </Routes>
            </BrowserRouter>
          </FetchUserProvider>
        </LoginProvider>
  )
}

export default App
