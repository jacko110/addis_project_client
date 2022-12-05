export interface IForm {
    name: string,
    date_of_birth: string,
    gender: string,
    salary: number,
    id?: number
}

export interface IEmployee extends IForm {
    _id: string,
}

export interface EmployeeState {
    employees: Array<IEmployee>,
    isLoading: boolean
}