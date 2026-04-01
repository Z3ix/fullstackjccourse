import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { LOGIN } from "../queries/login"
import { useNavigate } from "react-router"

const LoginForm = ({setToken , timedError}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] =useState('')
    const [loginMutation] = useMutation(LOGIN)

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        loginMutation({
            variables:{username, password},
            onCompleted: (data) => {
                navigate('/')
                setToken(data.login.value)
                localStorage.setItem('userToken', data.login.value)
                
            },
            onError: (error) => {
                timedError(error.message,10)
            } 
        })
    }

    return(
        <form onSubmit={login}>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor='username'>username</label></td>
                        <td><input id='username' value ={username} onChange={(e)=>setUsername(e.target.value)}></input></td>
                    </tr>                    
                    <tr>
                        <td><label htmlFor='password'>password</label></td>
                        <td><input id='password' type='password' value ={password} onChange={(e)=>setPassword(e.target.value)}></input></td>
                    </tr>
                </tbody>
            </table>
            <button type='submit'>login</button>
        </form>
    )
}



export default LoginForm