import "../styles/navbar.css"
import { useNavigate } from "react-router-dom"
import Button from "./button";

function Navbar({text, onClick} : {text : string, onClick? : () => void}){

    const navigate = useNavigate();

    function NavBarClick(){
        if(onClick){
            onClick();
        }
        else{
            navigate('/myProducts')
        }
    }

    return(
        <nav className="navbar">
            <h2 onClick={() => navigate('/products')}>Rekewka store</h2> 
            <Button text={text || "My Products"} onClick = {NavBarClick}/>
        </nav>
    )
}

export default Navbar
//думал добавить navbar для навигации и т.д, но потом удалил (поэтому мало кода)