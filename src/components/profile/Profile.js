import React, { useRef ,useEffect,useState} from "react";
import axios from "axios";


export default function Profile() {
    const nameref=useRef('');
    const photourl=useRef('');
    const idToken=localStorage.getItem("idToken");
    const [first,setFirst]=useState([]);

    const Token={
        idToken:idToken
    }
    useEffect(() => {
        async function myfun(){
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDc33hL8Bm9dd4WtEHpLT-Ap9-_rCCjEO4',Token)
            
            setFirst(response);
        }
        myfun();

    },[])

    let preName='';
    let preUrl = "";
    if(first.lenght!==0){
        preName=first.data.users[0].displayName;
        preUrl=first.data.users[0].photoUrl
    }
    const updatedetails=async(event)=>{
        event.preventDefault();
        const name=nameref.current.value;
        const url=photourl.current.value;
        const idToken=localStorage.getItem('idToken');
        const details={
            idToken:idToken,	
            displayName:name,	
            photoUrl:url,	
            returnSecureToken:true
        }
        console.log('mydetails',details);
        try {
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDc33hL8Bm9dd4WtEHpLT-Ap9-_rCCjEO4',details);
            console.log('successful',response);
            nameref.current.value='';
            photourl.current.value='';
        } catch (error) {
            alert(error.response.data.error.message);
        }
       

    }
    const verify=async (event)=>{
        event.preventDefault();
        const idToken=localStorage.getItem('idToken');
        const details = {
            requestType:"VERIFY_EMAIL",
            idToken: idToken
           }
        try {
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDc33hL8Bm9dd4WtEHpLT-Ap9-_rCCjEO4',details);
            localStorage.setItem('email',response.data.email);
            console.log('email sent successfully');
        } catch (error) {
            console.log(error);
        }   
    }
  return (
    <div>
        <h3 className='text-center'>Contacts Details</h3>
        <hr />
        <div className='container text-center'>

        <form onSubmit={updatedetails}>
        <i class="fas fa-user-alt"></i> <label >Full Name : </label> &nbsp;
            <input type='text' ref={nameref} value={preName} /> &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-grin"></i> <label>Profile Photo Url : </label>  &nbsp;
            <input type='text' ref={photourl} value={preUrl} /> 
            <br />
            <br />
            <button type="submit" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Update</button>
            {!(localStorage.getItem('email')!==null) && <button
            onClick={verify}
            class="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
          >
            Verify Email
          </button> }
        </form>
        </div>
    </div>
  )
}
