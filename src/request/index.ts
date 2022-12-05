import axios from "axios"

import { IEmployee, IForm } from '../types'

export const fetch = axios.create({
    baseURL: import.meta.env.API_BASE
})

fetch.interceptors.response.use(
    response => response,
    error => {
        let errors = error.response.data ? error.response.data.error : { "message": error.message}
        let errorMessage:string = ""
        for (let key in errors) {
            errorMessage += `\n${errors[key]}`
        }
        throw new Error(errorMessage)
    }
)

export async function create_employee(employee: IForm): Promise<IEmployee> {
    return fetch.post('/employees/create', employee).then(response => response.data)
}

export async function read_employees(): Promise<IEmployee[]> {
    return fetch.get('/employees/get/')
        .then(response => response.data.employee)
        .then((employees: IEmployee[]) => employees.map((employee: IEmployee, idx: number) =>({
            ...employee,
            id: idx + 1
        })))
}

export async function update_employee(employee: IEmployee): Promise<IEmployee> {    
    return fetch.put(`/employees/update/${employee._id}`, employee).then(response => response.data)
}

export async function delete_employee(employee: IEmployee): Promise<IEmployee> {
    return fetch.delete(`/employees/delete/${employee._id}`).then(response => response.data)
}


export default {
    create_employee,
    read_employees,
    delete_employee,
    update_employee
}