import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Header from '../components/Header'
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useParams } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'react-datepicker/dist/react-datepicker.css';
import { addTaskApi, deleteTask, getTaskApi } from '../services/allApi'

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Dashboard() {
    const [value, setValue] = useState(new Date())
    const [dueDate, setDueDate] = useState(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

       // Function to format date to yyyy-MM-dd
       const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [allTask, setAllTask] = useState([])

    const [username, setUsername] = useState("")
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            setUsername(localStorage.getItem("currentUser"))
        }
    })

    const [taskInput, settaskInput] = useState({
        title: "", description: "", duedate: "", status: ""
    })



    const setInputs = (e) => {
        const { name, value } = e.target
        settaskInput({ ...taskInput, [name]: value })
    }
    console.log(taskInput);

    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, description, duedate, status } = taskInput
        const userId = localStorage.getItem("currentUserId");
        if (!title || !description || !duedate || !status) {
            alert("Please fill all data")
        }
        else {
            const result = await addTaskApi({ ...taskInput, userId })
            if (result.status == 201) {
                alert("Task added successfully")
                handleClose()



            }
            else {
                alert(result.response.data)
            }
        }
    }

    const getUserTask = async () => {
        const result = await getTaskApi()
        if (result.status == 200) {
            setAllTask(result.data)

        }
    }

    useEffect(() => {
        getUserTask()
    }, [])
    console.log(allTask);

    
    const [allTasks, setAllTasks] = useState([]);

    const getTasks = async () => {
        const userId = localStorage.getItem('currentUserId'); // Retrieve userId from localStorage
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        try {
            const result = await getTaskApi(userId); // Pass userId in the API call
            console.log(result);
            if (result.status === 200) {
                setAllTasks(result.data);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("An error occurred while fetching tasks:", error);
        }
    };

    // delete task

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await deleteTask(taskId);
            console.log(taskId);
            if (response.status === 200) {
                alert("Task deleted successfully...")
                getTasks();
            } else {
                alert('Operation failed! Please try again later.');
            }
        } catch (error) {
            console.error("An error occurred while deleting the task:", error);
        }
    };

    useEffect(() => {
        getTasks()

    }, [])
    console.log(allTasks);


    return (


        <div>
            <Header></Header>
            <Row>
                <Col lg={9}>
                    <h1 className='mt-3'>Welcome<span className='text-success'> {username}</span></h1>
                    <Link onClick={handleShow} className='btn btn-success m-5'>Add Task  <i class="fa-solid fa-user-plus"></i>
                    </Link>
                    <div className='p-5 text-center'>
                        <h1>List of Tasks</h1>
                        <div className='container text-left'>
                           
                               


                             
                           
                        </div>
                        <div>

                            <Row >
                            {allTasks.map(task => (
                               
                                        <Card style={{ width: '16rem' }} className='m-5' >
                                      
                                            <Card.Body>
                                                <Card.Title>{task.title}</Card.Title>
                                                <hr />
                                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                                <Card.Text className=''>
                                                <div className='text-dark fs-3 bw-1'>
                                                       Description:
                                                       </div>
                                                         <span>{task.description}</span>
                                             
                                                </Card.Text>
                                                <hr />
                                                <Card.Title>Due Date: {formatDate(task.duedate)}</Card.Title>
                                                <hr />
                                                <Card.Title>Status:{task.status}</Card.Title>
                                                <hr />
                                                
                                                <div className='text-end  '>
                                                <Link to={`/viewtask/${task._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <i className="fa-solid fa-eye fs-5 "></i>
                        </Link>
                                                   
                                                    <Link to={`/edit/${task._id}`}><i class="fa-solid fa-pen mx-2 fs-5"></i></Link>
                                                    <button onClick={() => handleDeleteTask(task._id)}
                            style={{ background: 'none', border: 'none', color: 'red' }}>
                            <i className="fa-solid fa-trash fs-5 "></i>
                        </button>
                                                </div>
                                            </Card.Body>

                                   

                                        </Card>
                                             ))}
                                 

                            </Row>

                        </div >
                    </div>
                </Col>




                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id='d' >Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>

                            <input onChange={(e) => setInputs(e)} name='title' type="textarea" className='form-control' style={{ border: 'none' }} placeholder='Task name' />
                            <hr />

                            <input onChange={(e) => setInputs(e)} name='description' type="text" className='form-control' style={{ border: 'none' }} placeholder='Description' />
                            <hr />



                            <input onChange={(e) => setInputs(e)} name='duedate' type="date" className='form-control' style={{ border: 'none' }} placeholder='duedate' />
                            <hr />



                            <div className='select mt-2'>
                                <select
                                    onChange={(e) => setInputs(e)}
                                    name='status'
                                    className='form-control'
                                    style={{ border: 'none' }}

                                >
                                    <option value="" disabled selected hidden>Status</option>
                                    <option value="complete">Complete</option>
                                    <option value="incomplete">Incomplete</option>
                                </select>
                            </div>

                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => handleAdd(e)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>




                <Col lg={3} className='clock border-start text-center mt-4   p-5 shadow-lg border rounded'>
                    <h3 id='c'>Live Clock and Calendar</h3>
                    <div className=' clock-container text center'>
                        <Clock value={value} />
                    </div>
                    <div id='cal' className='mt-4 mb-5 '>

                        <Calendar onChange={setValue} value={value} />
                    </div>

                </Col>

            </Row>

        </div >
    )
}

export default Dashboard

