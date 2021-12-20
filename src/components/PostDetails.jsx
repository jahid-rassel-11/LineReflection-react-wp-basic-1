
import { useParams, Link } from 'react-router-dom';
import { useFetchDataHook } from './CustomHooks/FetchDataHook';

import ReactHtmlParser from 'react-html-parser';


const PostDetails = () => {
    let { ...arrParms } = useParams();
    let { isPending, errorText, data: postObj } = useFetchDataHook('https://dev-jahid-rassel.pantheonsite.io/wp-json/wp/v2/posts/'+arrParms.postId); 

    return ( 
        <div className="home">
            { (isPending) ? ReactHtmlParser('LOADING......<br /><br />') : '' }
            
            { (errorText) ? ReactHtmlParser('<br />'+errorText+'<br /><br />') : '' }

            {
                (postObj) &&    
                <div className="jumbotron">
                    <div className="container">
                        <h3>{ ReactHtmlParser(postObj.title.rendered+"<br /><br />") }</h3>
                        <p>{ ReactHtmlParser(postObj.content.rendered) }</p>
                        <p><Link className="btn btn-primary btn-lg" to={`/`} role="button">Post List &raquo;</Link></p>
                    </div>
                </div> 
            }
            
        </div>     
     );
}
 

export default PostDetails;