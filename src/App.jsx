import { Route, Routes } from "react-router-dom"
import { PostList } from "./components/allPosts/PostList"
import { ApplicationViews } from "./views/ApplicationViews"
import {Authorized} from './views/Authorized'
import { Register } from "./components/auth/Register"
import { Login } from './components/auth/Login'


export const App = () => {
  return (
    <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route 
              path="*"
              element=
              {
                <Authorized>
                  <ApplicationViews/>
                </Authorized>
              }
            />
    </Routes>
    
  )
}
