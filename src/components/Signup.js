import React,{useState,useEffect} from 'react'
import Background from '../assets/landing.svg'
import firebase from "firebase"

export default function Signup({status,formtype,formtypeStatus,dispatch,popup}) {
    const [error,setError] =  useState(false);
    const [loading,setLoading] = useState(false);
    const [errorConfirmPassword,setErrorConfirmPassword] =  useState(false);

    //vars to store the values of input feild
    const [email,setEmail] =  useState('')
    const [password,setPassword] =  useState('')
    const [confirmPassword,setConfirmPassword] =  useState('')


    useEffect(() => {
        checkConfirmPassword()
    },[confirmPassword,password])

    //on change function for the inputs
    const handleChangeEmail = value=>{
        setEmail(value)
        setError(false)
    } 
    const handleChangePassword = value=>{
        setPassword(value)
        setError(false)
    } 
    const handleChangeConfirmPassword = value=>{
        setConfirmPassword(value)
        setError(false)
    } 


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

    //login function
    function login ({email,password}){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((usercred) => {
          setLoading(false)
          //opening the success popup
          popup(true)
          //closing the popup
          status(false)
        })
        .catch((error) => {
          //setting the error to display the user
          setLoading(false)
          setError(error.message);
        }
          );
    }
    //handling new user sign up
    function signup ({email,password}){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(usercred=>{
         setLoading(false)
         //opening the success popup
         popup(true)
         //closing the popup
         status(false)
        })
        .catch(error=>{
          setLoading(false)
          setError(error.message);
        })
   }
 

    //handling new user sign up 
    function handleSignup (e){
        setLoading(true)
        e.preventDefault()

        if(formtype)
        signup({email,password})
        else
        login({email,password});

    }

    return (
        <div className="overlay" >
            <div className="sign-up">
            <button className="cross-btn" onClick={e=>status(false)}><i className="fas fa-times"></i></button>
            <div className="sign-up-background">
                <img src={Background} alt="background-signup"/>
            </div>
            <form onSubmit={handleSignup}>
                <header className="form-heading">
                    <h2>
                    {
                        formtype ? "SignUp for FoodExpress" : "LogIn FoodExpress"
                    }
                    </h2>
                    {error && <p className="error">{error}</p>}
                </header>

                <div className="feilds-container">
                    <div className="feild">
                        <label htmlFor="username">Email</label>
                        <input type="email" name="username" required placeholder="Enter a email"
                        value={email}
                        onChange={e=>handleChangeEmail(e.target.value)}
                        />
                    </div>
                    <div className="feild">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required placeholder="Enter password"
                         value={password}
                         onChange={e=>handleChangePassword(e.target.value)}
                        />

                    </div>
                    {formtype &&
                        <div className="feild">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm-password" required placeholder="Confirm your password"
                         value={confirmPassword}
                         onChange={e=>handleChangeConfirmPassword(e.target.value)}
                        />
                        {errorConfirmPassword && <span className="error">Password does not match</span>}
                    </div>}
                    <div className="feild">

                        {formtype ? 
                        <button type="submit" 
                        style={{
                            backgroundColor: (error || errorConfirmPassword ) && 'grey',
                            pointerEvents: (error || errorConfirmPassword || loading) && 'none',
                            }}>
                            {loading ? "registering..." : "Sign Up"}
                        </button> :
                        <button type="submit" 
                        style={{
                            backgroundColor: (error || errorConfirmPassword ) && 'grey',
                            pointerEvents: (error || errorConfirmPassword || loading ) && 'none',
                            }}>
                            {loading ? "verifying..." : "Log In"}
                        </button> 
                        
                    }

                    </div>
                <div className="feild form-heading">
                {
                    formtype ?
                    <p>Already have an account? <button className="link-btn" onClick={()=>formtypeStatus(false)}>Log In</button></p> :
                    <p>Don't have an account? <button className="link-btn" onClick={()=>formtypeStatus(true)}>Sign Up</button></p>
                }
                </div>
                </div>
            </form>
            </div>

        </div>
    )
}
