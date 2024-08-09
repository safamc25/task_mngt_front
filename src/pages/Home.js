import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div >
       <div id='b' className='p-'>
            <Row>
                <Col>
                <div id='t' className='p-5 my-5 text-center'>
                    <h1 className='text-danger  '>Task Nest</h1>
                    <p className='fs-4 mt-3' >Welcome to Task Nest, your ultimate task management solution. Streamline your workflow, boost productivity, and stay organized with our intuitive platform. Whether you're managing personal to-dos or coordinating team projects, our tools help you prioritize, track progress, and achieve your goals effortlessly. Start transforming the way you work today!

                    </p>
                    
                 <Link to={"/authentication"}>   <button id='btn'className='btn px-5 py-3 rounded-4 btn-light '><h6>Get Started</h6></button></Link>
                </div>
              </Col>
              <Col>
              <img src="https://i.postimg.cc/zB1Pkfm9/home.png" alt=''/> 
              </Col>
            </Row>
       </div>
    </div>
  )
}

export default Home