import React,{useState,useEffect} from 'react'
import Background from '../assets/landing.svg'

export default function Signup({status,formtype}) {
    const [error,setError] =  useState(false);
    const [passwordError,setPasswordError] =  useState(false);
    const [errorConfirmPassword,setErrorConfirmPassword] =  useState(false);

    //vars to store the values of input feild
    const [username,setUsername] =  useState('')
    const [password,setPassword] =  useState('')
    const [confirmPassword,setConfirmPassword] =  useState('')


    useEffect(() => {
        checkConfirmPassword()
    }, [confirmPassword,password])


    // checking if the password match with the confirm password
    const checkConfirmPassword = ()=>{

        if(password && confirmPassword){

            if(password !== confirmPassword)
            setErrorConfirmPassword(true)
            else
            setErrorConfirmPassword(false)

        }else
        setErrorConfirmPassword(false)


    }

    return (
        <div className="overlay" >
            <div className="sign-up">
            <button className="cross-btn" onClick={e=>status(false)}><i className="fas fa-times"></i></button>
            <div className="sign-up-background">
                <img src={Background} alt="background-signup"/>
            </div>
            <form >
                <header className="form-heading">
                    <h2>
                    {
                        formtype ? "SignUp for FoodExpress" : "LogIn FoodExpress"
                    }
                    </h2>
                </header>

                <div className="feilds-container">
                    <div className="feild">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required placeholder="Enter a username"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        />
                        {formtype && error && <span className="error">Username already exists</span>}
                    </div>
                    <div className="feild">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" required placeholder="Enter password"
                         value={password}
                         onChange={e=>setPassword(e.target.value)}
                        />
                        {!formtype && passwordError && <span className="error">Inncorrect password</span>}

                    </div>
                    {formtype &&
                        <div className="feild">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="text" name="confirm-password" required placeholder="Confirm your password"
                         value={confirmPassword}
                         onChange={e=>setConfirmPassword(e.target.value)}
                        />
                        {errorConfirmPassword && <span className="error">Password does not match</span>}
                    </div>}
                    <div className="feild">

                        {formtype ? 
                        <button type="submit" 
                        style={{
                            backgroundColor: error || errorConfirmPassword && 'grey',
                            pointerEvents: error || errorConfirmPassword && 'none',
                            }}>
                            Sign Up
                        </button> :
                        <button type="submit" 
                        style={{
                            backgroundColor: error || errorConfirmPassword && 'grey',
                            pointerEvents: error || errorConfirmPassword && 'none',
                            }}>
                            Log In
                        </button> 
                        
                    }

                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}
