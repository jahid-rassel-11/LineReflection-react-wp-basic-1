import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
  const historyObj = useHistory();

  function logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_display_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_nicename");

    setTimeout(historyObj.push('/'), 500);
  }

    return (
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>

        {
          (!localStorage.getItem('jwt_token')) && 
          <Nav.Item>
            <Nav.Link href="/login" eventKey="link-1">Log In</Nav.Link>
          </Nav.Item>  
        }
        
        { 
          localStorage.getItem('jwt_token') && 
          <Nav.Item>
            <Nav.Link href="/addPost" eventKey="link-1">Add Post</Nav.Link>
          </Nav.Item> 
        }

        {
          (localStorage.getItem('jwt_token')) && 
          <Nav.Item>
            <Nav.Link href="/" eventKey="link-1" onClick={ () => logout() } >Log Out</Nav.Link>
          </Nav.Item>  
        }
        
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  export default Navigation;