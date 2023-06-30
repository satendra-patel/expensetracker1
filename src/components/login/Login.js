import React, { useRef } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Login() {
    const  navigate=useNavigate();
 
  const emailref = useRef("");
  const passref = useRef("");

  const submithandler = async (event) => {
    event.preventDefault();
    
      const Userdetails = {
        email: emailref.current.value,
        password: passref.current.value,
        returnSecureToken: true,
      };
      emailref.current.value="";
      passref.current.value = "";
     try {
        const respose = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW55X8yrfY3DYfPEVnvQZamzWMl7FuhzE",
            Userdetails
          );
          console.log(respose);
          console.log("User has successfully logged in",respose.data.idToken);
          localStorage.setItem('idToken',respose.data.idToken);
          navigate("/expenses")
        
        
     } catch (error) {
        console.log(error.response.data.error.message)
        alert(error.response.data.error.message);
     }
      
      
      
      
       

      
     
    //   alert("Password Doesn't Match");
    
  };

  return (
    <form onSubmit={submithandler}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>
                
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    ref={emailref}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    ref={passref}
                    required
                  />
                </div>
               
                <MDBBtn className="mb-4" size="lg" type="submit">
                  Login
                </MDBBtn>
                Don't Have An Account
                <MDBBtn className="mx-2" color="tertiary" rippleColor="light" >
                <Link to='/'>
                  Sign Up Now
                </Link> 
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default Login;
