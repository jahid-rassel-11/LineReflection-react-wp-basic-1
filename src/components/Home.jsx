import { Link } from 'react-router-dom';

import { useFetchDataHook } from './CustomHooks/FetchDataHook';

import ReactHtmlParser from 'react-html-parser';

const Home = () => {
    var { isPending, errorText, data: AllPosts } = useFetchDataHook('https://dev-jahid-rassel.pantheonsite.io/wp-json/wp/v2/posts');

    //console.log(AllPosts);

    

    function CreatePostObj(postObj, index) {
        return (
            <div className="row col-md-12" key={index}>
                <h4>{ ReactHtmlParser(postObj.title.rendered) }</h4>
                <span>
                    { ReactHtmlParser(postObj.excerpt.rendered) }
                </span>
                <p><Link className="btn btn-secondary" to={`/postDetails/${ postObj.id}`} role="button">View details &raquo;</Link></p>
            </div>    
        );
    } 

    function CreatePostListByObj( allPostsObj ) {
        return (
            allPostsObj.map( (post, index) => CreatePostObj(post, index))
        );
    }

    return ( 

        <div className="home">
            <div className="container">
                <h1 className="display-3">All the posts from WP</h1>
            </div>
        
            <div className="container">
                { (isPending) ? ReactHtmlParser('LOADING......<br /><br />') : '' }
                
                { (AllPosts) && CreatePostListByObj(AllPosts)   }
            </div>
            
        </div>
        
        
     );
}
 
export default Home;