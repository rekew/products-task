import {Routes, Route, Navigate} from "react-router-dom"
import Products from "./pages/Products"
import Detail from "./pages/ProductDetail"
import UserList from "./pages/userList"

function Routing(){
    return(
        <Routes>
            <Route path = "/products" element = {<Products/>}/>
            <Route path = '/products/:id' element = {<Detail/>}/>
            <Route path = '/myProducts' element = {<UserList/>}/>
            <Route path = '*' element = {<Navigate to = "/products" replace/>} />
        </Routes>
    )
}

export default Routing