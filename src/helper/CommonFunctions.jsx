export async function getJwtToken( username, password ) {
    var API_URL = "https://dev-jahid-rassel.pantheonsite.io/wp-json/jwt-auth/v1/token";

    var isPending = true;         //  For Showing Loading Screen
    var errorText = false;         //  For Showing Error Text
    
    //  Data From JSON feed [ Start ]    
    var data = null;
    
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

        return response.json()

        //  Check if there is a response
        /*
        if( response.ok === true ) {
            //  Converting and returning the Response to a JS object to work with that later on
            return response.json()
        }
        else {
            //  WAY 2
            throw Error('Something want wrong, Could Not Fetch DATA.');
        }    
        */
    }).then( (data) => {
        if (typeof data.token !== 'undefined') {
            localStorage.setItem("jwt_token", data.token);
            localStorage.setItem("user_display_name", data.user_display_name);
            localStorage.setItem("user_email", data.user_email);
            localStorage.setItem("user_nicename", data.user_nicename);

            //  Receiving the JS Object which is in JSON format now to work with it on this block
            errorText = false;
            isPending = false;
        } else {
            errorText = data.message;
            isPending = false;
        }

        console.log("Returning Data");
        
        return { isPending, errorText, data }
    }).catch( (errorObj) => {
        if( errorObj.name === 'AbortError' ) {
            console.log('AbortController Signal AbortError');
        }
        else {
            errorText = errorObj.message;
            isPending = false;
        }
    });
}






export function plus(a, b) {
    return a + b;
}

export function minus(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    return a / b;
}