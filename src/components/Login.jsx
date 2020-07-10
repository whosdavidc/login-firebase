import React from 'react'
import {auth} from "../firebase"


const Login = () => {

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
    }

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

                    <button className="btn btn-dark btn-block btn-lg" type="submit">Registrarse</button>

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

export default Login