import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  



function Auth({ register }) {

  const navigate=useNavigate()

  const [userInputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""

  })

  // state to check validation
  const [validUname, setValidUname] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPswd, setValidPswd] = useState(false)

  useEffect(() => {
    setInputs({
      username: "",
      email: "",
      password: ""
    });
  }, [register]);

  const setData = (e) => {
    const { name, value } = e.target
    if (name == "username") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setValidUname(false)
        setInputs({ ...userInputs, [name]: value })

      } else {
        setValidUname(true)
      }

    }

    // email
    if (name == "email") {
      if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {

        setValidEmail(false)
        setInputs({ ...userInputs, [name]: value })

      }
      else {
        setValidEmail(true)
      }

    }

    // psw
    if (name == "password") {
      if (value.match(/^[a-zA-Z0-9]+$/)) {
        setValidPswd(false)
        setInputs({ ...userInputs, [name]: value })

      }
      else {
        setValidPswd(true)
      }
    }

  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userInputs;
  
    if (!username || !email || !password) {
      toast.error('Please fill all data', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const result = await registerApi(userInputs);
      if (result.status == 201) {
        toast.success(result.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
  
        // Reset the form inputs
        setInputs({ username: "", email: "", password: "" });
        navigate('/authentication');
      } else {
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
  
        navigate('/authentication');
      }
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInputs;
  
    if (!email || !password) {
      toast.error('Please fill all data', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const result = await loginApi(userInputs);
      if (result.status == 200) {
        localStorage.setItem("currentUser", result.data.user.username);
        localStorage.setItem("currentUserId", result.data.user._id);
  
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
  
        // Reset the form inputs
        setInputs({ email: "", password: "" });
        navigate('/dashboard');
      } else {
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  





return (
  <div className='my-4'>
    <p className='container w-50 fs-5'>
    {  register?
      <Link to={'/authentication'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-arrow-left fa-beat-fade"></i> Back To Home</Link>
      :
      <Link to={'/'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-arrow-left fa-beat-fade"></i> Back To Home</Link>

}
    </p>
    <div className='container shadow w-50 border rounder my-5 p-5'>
      <Row>
        <Col >
          {
            register ?
              <img className='w-100 mt-5' src="https://i.postimg.cc/pVfBN4wq/login.webp" alt="" />

              :

              <img className='w-100 mt-5' src="https://i.postimg.cc/hvr89qSM/sign.gif" alt="" />

          }
        </Col>
        <Col className='border-start bg-light'>
          <div className='text-center p-5'>
            {
              register ?
                <h3 id='sign' className='my-4  '>Sign-Up Here</h3>
                :
                <h3 id='sign' className='my-4'>Sign-In Here</h3>
            }
            <>
              {
                register &&
                <>
                  <FloatingLabel controlId="floatingUserName" label="Username">
                    <Form.Control name="username" onChange={(e) => setData(e)} value={userInputs.username?.username}  type="text" placeholder="Username" />
                  </FloatingLabel>
                  {validUname &&
                    <p className='text-danger text-start my-3'>Please include alphabets and space only</p>
                  }
                </>
              }
              <>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="my-3"
                >
                  <Form.Control  name='email' onChange={(e) => setData(e)} value={userInputs.email?.email} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                {validEmail &&
                  <p className='text-danger text-start my-3'>Please enter a valid email</p>
                }
              </>


              <>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control name='password' onChange={(e) => setData(e)} value={userInputs.password?.password} type="password" placeholder="Password" />
                </FloatingLabel>
                {validPswd &&
                  <p className='text-danger text-start my-3'>Please include alphabets and numbers only</p>
                }
              </>

            </>
            {
              register ?
                <button id='bt' onClick={(e) => handleRegister(e)} className='btn btn-light py-2 px-5 my-3 rounded-5'>Register</button>
                :
                <button id='bt' onClick={(e) => handleLogin(e)} className='btn btn-light py-2 px-5 my-3 rounded-5'>Login</button>

            }
            {
              register ?
                <p className='fs-5'>Already have an account? <Link to={'/authentication'} style={{ textDecoration: 'none' }}>Sign-In</Link></p>
                :
                <p className='fs-5'>New User? <Link to={'/register'} style={{ textDecoration: 'none' }}>Sign-Up First!</Link></p>

            }
          </div>
        </Col>
      </Row>
    </div>
    <ToastContainer />
  </div>
)
}


export default Auth