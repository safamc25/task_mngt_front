import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { deleteTask, getTaskApi, singleTaskApi } from '../services/allApi';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';




function ViewTask() {

    // Function to format date to yyyy-MM-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [singleTask, setSingleTask] = useState({});

    const { taskId } = useParams();

    const getsingleTask = async () => {
        try {
            const result = await singleTaskApi(taskId);
            console.log(result);
            if (result.status === 200) {
                setSingleTask(result.data);
            } else {
                console.error("Failed to fetch corresponding task");
            }
        } catch (error) {
            console.error("An error occurred while fetching the task:", error);
        }
    };

    useEffect(() => {
        if (taskId) {
            getsingleTask(); // Fetch the task only if taskId is available
        }
    }, [taskId]); // Dependency on taskId

    console.log(singleTask);

      
    


    return (
        <div>
            <Header></Header>
            <div>
            <div className='m-5 ' style={{  marginBottom: '1rem' }}>
                        <Link to={'/dashboard'}> <i class="fa-solid fa-arrow-left fa-beat-fade"></i></Link>
                    </div>
                <div className='stask d-flex flex-column align-items-center' style={{ height: '90vh' }}>
                   
                    <Row className='w-50'>
                        <Col className='d-flex justify-content-center'>
                            <Card className='shadow w-100 p-3'>
                                <div className='text-center'>
                                    <h3 className='text-danger'>Task:&nbsp;<span className='text-dark'>{singleTask.title}</span></h3>
                                    <p className='text-danger fs-5'>Description:&nbsp; <span className='text-dark'>{singleTask.description}</span></p>
                                    <h5 className='text-danger'>Due Date:&nbsp;<span className='text-dark'>{formatDate(singleTask.duedate)}</span></h5>
                                    <h5 className='text-danger'>Status:&nbsp; <span className='text-dark'>{singleTask.status}</span></h5>
                                    
    
                                </div>
                              
                                               
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            </div>
    );
}

export default ViewTask;
