import { useState, useEffect } from 'react';

export const useFetchJwtToken = () => {
    var API_URL = "https://dev-jahid-rassel.pantheonsite.io/wp-json/jwt-auth/v1/token";


    var [isPending, setIsPending] = useState(true);         //  For Showing Loading Screen
    var [errorText, setErrorText] = useState(false);         //  For Showing Error Text
    
    //  Data From JSON feed [ Start ]    
    const [data, setData] = useState(null);

    //  AbortController INTERFACE REPRESENTS A CONTROLLER OBJECT THAT ALLOWS TO ABORAT ONE OF MORE WEB REQUESTS
    //  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    const abrotCont = new AbortController();

    //  '[]' is used as we want to use this just 1 time at the first time rendering
    //  To understand the reason for using 'AbortController' and 'single' see this video
    //  https://www.youtube.com/watch?v=aKOQtGLT-Yk&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=24
    useEffect(()=>{
        
        fetch( API_URL, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    username: 'jahid-rassel',
                    password: 'iVN4xByf0tXhFe*Xxb'  
                })
            })
            .then( (response) => {
                console.log(response);

                //  Check if there is a response
                if( response.ok === true ) {
                    //  Converting and returning the Response to a JS object to work with that later on
                    return response.json()
                }
                else {
                    //  WAY 2
                    throw Error('Something want wrong, Could Not Fetch DATA.');
                }    
            }).then( (data) => {
                console.log(data);
                
                localStorage.setItem("jwt_token", data.token);
                localStorage.setItem("user_display_name", data.user_display_name);
                localStorage.setItem("user_email", data.user_email);
                localStorage.setItem("user_nicename", data.user_nicename);

                //  Receiving the JS Object which is in JSON format now to work with it on this block
                setData(data.token);
                setErrorText(null);
                setIsPending(false);
            }).catch( (errorObj) => {
                if( errorObj.name === 'AbortError' ) {
                    console.log('AbortController Signal AbortError');
                }
                else {
                    setErrorText(errorObj.message);
                    setIsPending(false);
                }
            });
        
        return () => {
            //console.log("cleanup");
            abrotCont.abort();
        }
        
    }, []);
    //  New Version Getting Data From JSON feed [ End ]
    

    return { isPending, errorText, data }
}
 
export default useFetchJwtToken;