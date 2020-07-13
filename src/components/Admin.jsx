import React from 'react'
import {auth} from "../firebase"
import { withRouter } from "react-router"



const Admin = (props) => {

    const [user, setUser] = React.useState(null)
    const [email, setEmail] = React.useState("")

    React.useEffect(() => {
        if (auth.currentUser) {
            console.log("Existe un usuario")
            setUser(auth.currentUser)
            setEmail(auth.currentUser.email)
        }else{
            console.log("No existe un usuario")
            props.history.push("/login")
        }
    }, [])


    return (
        <div>
           <h2>Ruta protegida</h2>
           <h3>Bienvenido {email}!</h3>
        </div>
    )
}

export default withRouter(Admin)