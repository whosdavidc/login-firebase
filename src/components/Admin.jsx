import React from 'react'
import {auth} from "../firebase"
import { withRouter } from "react-router"
import Firestore from './Firestore'



const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (auth.currentUser) {
            console.log("Existe un usuario")
            setUser(auth.currentUser)
        }else{
            console.log("No existe un usuario")
            props.history.push("/login")
        }
    }, [props.history])


    return (
        <div>
           <h2>Ruta protegida</h2>
           {
               user && (
                    <h3><Firestore user={user}/></h3>
               )
           }
        </div>
    )
}

export default withRouter(Admin)