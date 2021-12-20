import { getJwtToken } from "./../helper/CommonFunctions";

import { useState, useRef } from 'react';

import ReactHtmlParser from 'react-html-parser';

import { useHistory } from 'react-router-dom';





const Login = () => {
    const historyObj = useHistory();

    const usernameRef = useRef();
    const passwordRef = useRef();

    function actionLoginButton() {
        if( username === '' ) {
            alert("Username must be provided");
            
            usernameRef.current.focus();
            usernameRef.current.style.border = "1px solid red";
        }
        else if( password === '' ) {
            alert("Password must be provided");
            
            passwordRef.current.focus();
            passwordRef.current.style.border = "1px solid red";
        }
        else {
            setIsPending(true);


            //  For Validating [ START ]
            var API_URL = "https://dev-jahid-rassel.pantheonsite.io/wp-json/jwt-auth/v1/token";
            
            
            //  Data From JSON feed [ Start ] 
            //username: 'jahid-rassel',
            //password: 'iVN4xByf0tXhFe*Xxb'  


            fetch( API_URL, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then( (response) => {
                console.log(response);

                return response.json();
            }).then( (data) => {
                if (typeof data.token !== 'undefined') {
                    localStorage.setItem("jwt_token", data.token);
                    localStorage.setItem("user_display_name", data.user_display_name);
                    localStorage.setItem("user_email", data.user_email);
                    localStorage.setItem("user_nicename", data.user_nicename);

                    //  Receiving the JS Object which is in JSON format now to work with it on this block
                    setSuccessText("Successfully Logged In.");
                    setErrorText(false);
                    setIsPending(false);
                    
                    setTimeout(historyObj.push('/addPost'), 5000);
                } else {
                    setErrorText(data.message);
                    setIsPending(false);
                }
            }).catch( (errorObj) => {
                if( errorObj.name === 'AbortError' ) {
                    console.log('AbortController Signal AbortError');
                }
                else {
                    setErrorText(errorObj.message);
                    setIsPending(false);
                }
            }); 
            //  For Validating [ END ]





            
            /*
            getJwtToken(username, password).then( (resultTmp) => {
                console.log("I am here");
                console.log(resultTmp)
            });
            */
            

            
        }
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var [isPending, setIsPending] = useState(false);            //  For Showing Loading Screen
    var [errorText, setErrorText] = useState(false);            //  For Showing Error Text
    var [successText, setSuccessText] = useState(false);        //  For Showing Success Text

    
    return ( 
        <div className="d-flex justify-content-center bd-highlight mb-5">

            <form onSubmit={ (e) => e.preventDefault()  }>
                <div className="col-md-12 mb-2">
                    { (isPending) ? ReactHtmlParser('LOADING......<br /><br />') : '' }
                
                    { (errorText) ? ReactHtmlParser('<br />'+errorText+'<br /><br />') : '' }

                    { (successText) ? ReactHtmlParser('<br />'+successText+'<br /><br />') : '' }
                </div>
                <div className="col-md-12 mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="username" className="form-control" name="username" id="username" aria-describedby="usernameHelp" 
                        value={ username } onChange={ (event) => { setUsername(event.target.value) }}
                        ref={ usernameRef }
                        />
                    <div id="usernameHelp" className="form-text">We'll never share your Username with anyone else.</div>
                </div>
                <div className="col-md-12 mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" 
                        value={ password } onChange={ (event) => { setPassword(event.target.value) }}
                        ref={ passwordRef }
                        />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary" onClick={ () => actionLoginButton() }>Submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default Login;