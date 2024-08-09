import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Mail, Phone } from 'react-feather'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div id='foot' className=' text-white mt-5 p-5'>
        <Row>
            <Col>
            <h3 className='mb-4'>Task Nest</h3>
            <p>Completely Free App To Manage All Task</p>
            <p>For Any Query <Mail className='ms-2 me-2'></Mail>contact@taskwing.com</p>
            </Col>

            <Col>
            <div className='ms-5'>
                <h3>Links</h3>
                <Link style={{ textDecoration: 'none', color: 'white'}}>Home</Link><br/>
                <Link style={{ textDecoration: 'none', color: 'white'}}>Login</Link><br/>
                <Link style={{ textDecoration: 'none', color: 'white'}}>Sign Up</Link>

                </div>
                </Col>
             
                <Col>
                <h3><Phone></Phone>Contact Us</h3>
                <input type='email' placeholder='Enter email' className='form-control'></input>
              <div className='mt-3'> 
               <i class="fa-brands fa-github fa-2x ms-5"></i>
               <i class="fa-brands fa-linkedin fa-2x ms-5"></i>
               <i class="fa-brands fa-twitter fa-2x ms-5"></i>
               <i class="fa-brands fa-facebook fa-2x ms-5"></i>
               

               </div>
                </Col>
           
        </Row>
    </div>
  )
}

export default Footer