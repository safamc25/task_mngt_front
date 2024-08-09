import { BaseUrl } from "./baseUrl";
import { commonApi } from "./commonApi";

// register
export const registerApi=async(bodyData)=>{
   return await commonApi('POST',`${BaseUrl}/user/register`,bodyData)
}

// login
// register
export const loginApi=async(bodyData)=>{
    return await commonApi('POST',`${BaseUrl}/user/login`,bodyData)
 }


//  add task
export const addTaskApi=async(bodyData)=>{
    return await commonApi('POST',`${BaseUrl}/user/add-task`,bodyData)
 }

//  view task
 export const getTaskApi=async(userId)=>{
    return await commonApi('GET',`${BaseUrl}/user-task/${userId}`)
 }

 export const singleTaskApi = async (taskId) => {
    return await commonApi('GET', `${BaseUrl}/user-stask/${taskId}`);
}

//  delete
 
 export const deleteTask=async(taskId)=>{
    return await commonApi("DELETE",`${BaseUrl}/user/delete-task/${taskId}`,{})
}


// edit task

export const editTask=async(taskId,body)=>{
    return await commonApi("PUT",`${BaseUrl}/edit-task/${taskId}`,body)
}

