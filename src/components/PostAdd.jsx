
import { useParams, Link } from 'react-router-dom';

import { useFetchJwtToken } from './CustomHooks/FetchJwtToken';

import ReactHtmlParser from 'react-html-parser';

import { useState, useRef } from 'react';





const PostAdd = () => {
    const titleRef = useRef();
    const contentRef = useRef();

    const [titleValue, setTitle] = useState('');
    const [contentValue, setContent] = useState('');

    var [isPending, setIsPending] = useState(false);            //  For Showing Loading Screen
    var [errorText, setErrorText] = useState(false);            //  For Showing Error Text
    var [successText, setSuccessText] = useState(false);        //  For Showing Success Text

    let { ...arrParms } = useParams();
    
    function addPost() {
        if( titleValue === '' ) {
            alert("Username must be provided");
            
            titleRef.current.focus();
            titleRef.current.style.border = "1px solid red";
        }
        else if( contentValue === '' ) {
            alert("Password must be provided");
            
            contentRef.current.focus();
            contentRef.current.style.border = "1px solid red";
        }
        else {
            fetch( "https://dev-jahid-rassel.pantheonsite.io/wp-json/wp/v2/posts", { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${ localStorage.getItem('jwt_token') }`
                },
                body: JSON.stringify({
                    title: titleValue,
                    content: contentValue,
                    status: 'publish',
        
                })
            })
            .then( (response) => {
                console.log(response);
        
                return response.json();
            }).then( (data) => {
                setSuccessText("Successfully Created.");

                setTitle("");
                setContent("");
            }).catch( (errorObj) => {
                if( errorObj.name === 'AbortError' ) {
                    console.log('AbortController Signal AbortError');
                }
                else {
                    
                }
            });
        }
    }
    
    return ( 
        <div className="d-flex justify-content-center bd-highlight mb-5">
            <form onSubmit={ (e) => e.preventDefault()  } className='col-md-8'>

                <div className="col-md-12 mb-2">
                    { (isPending) ? ReactHtmlParser('LOADING......<br /><br />') : '' }
                    
                    { (errorText) ? ReactHtmlParser('<br />'+errorText+'<br /><br />') : '' }

                    { (successText) ? ReactHtmlParser('<br />'+successText+'<br /><br />') : '' }
                </div>
                
                <div className="col-md-12 mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="username" className="form-control" name="titleValue" id="titleValue" aria-describedby="titleValueHelp" 
                        value={ titleValue } onChange={ (event) => { setTitle(event.target.value) }}
                        ref={ titleRef }
                        />
                    <div id="titleValueHelp" className="form-text">Give the post title.</div>
                </div>
                <div className="col-md-12 mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Content</label>
                    
                    <textarea className="form-control" value={contentValue}  name="contentValue" id="contentValue" ref={ contentRef } onChange={ (event) => { setContent(event.target.value) }} />
    
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary" onClick={ () => addPost() }>Submit</button>
                </div>
            </form>
        </div>     
     );
}
 

export default PostAdd;