import React from 'react'
import {auth, db} from "../firebase"
import { withRouter } from "react-router-dom"


const Login = (props) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(null)
    const [esRegistro, setModo] = React.useState(true)



    const procesarDatos = e =>{
        e.preventDefault()
        if(!email.trim()){
            setError("Email requerido")
            return
        }
        
        if(!password.trim()){
            setError("Contraseña requerida")
            return
        } 

        if(password.length <6 ){
            setError("La contraseña debe tener al menos seis(6) caracteres.")
            return
        }
        setError(null)

        if(esRegistro){
            registrar()
        }else{
            login()
        }

        setEmail("")
        setPassword("")
        setError(null)
    }



    const login = React.useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password)
            console.log(res.user)
            setEmail("") 
            setPassword("")
            setError(null)

            props.history.push("/admin")

        } catch (error) {
            console.log(error)
            if (error.code === "auth/invalid-email") {
                setError("Email no valido.")
            }
            if (error.code === "auth/user-not-found") {
                setError("Email no registrado.")
            }
            if (error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta.")
            }
        }
    }, [email, password, props.history])

    const registrar = React.useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
            
            await db.collection("usuarios").doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })

            setEmail("")
            setPassword("")
            setError(null)

            props.history.push("/admin")

        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setError("El correo electrónico ya ha sido utilizado")
            }
            if(error.code === "auth/invalid-email"){
                setError("El correo electrónico no es válido")
            }
            console.log(error)
        }

    }, [email, password, props.history])  



    return (
        <div className="mt-5">
           <h3 className="text-center">{
               esRegistro ? "Registro de usuarios" : "Login de acceso"
           }</h3>

           <hr/>
           <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos}>

                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )
                    }

                    <input 
                        type="email" 
                        className="form-control"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />

                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                <button className="btn btn-dark btn-block btn-lg" type="submit">{
                    esRegistro ? "Registrar" : "Acceder "
                }</button>

                    <button
                        type="button"
                        onClick={() => setModo(!esRegistro)}
                        className="btn btn-info btn-sm btn-block">
                        {
                            esRegistro ? "Alredy registered?" : "Dont you have an account?"
                        }
                    </button>
                </form>
               </div>
           </div>
        </div>
    )
}

export default withRouter(Login)