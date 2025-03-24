import "../styles/button.css"

function Button({text, onClick} : {text : string, onClick : () => void}){

    return(
        <button onClick = {onClick} className="myProducts">{text}</button>
    )
}

export default Button