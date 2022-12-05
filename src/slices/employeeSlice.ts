import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee, IForm, EmployeeState } from "../types";

let initialState: EmployeeState = {
    employees: [],
    isLoading: false
}

export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        create_employee_requested: (state, action: PayloadAction<IForm>) => state,
        delete_employee_requested: (state, action: PayloadAction<IEmployee>) => state,
        update_employee_requested: (state, action: PayloadAction<IEmployee>) => state,

        read_employee: (state) => {
            state.isLoading = true
        },
        create_employee: (state, action: PayloadAction<IEmployee>) => {
            state.employees.push({
                ...action.payload,
            })
        },
        update_employee: (state, action: PayloadAction<IEmployee>) => {
            state.employees = state.employees.map(employee => {
                return employee._id === action.payload._id 
                        ? {
                            ...employee,
                            ...action.payload
                        }
                        : employee
            })
        },
        delete_employee: (state, action: PayloadAction<IEmployee>) => {
            state.employees = state.employees.filter(employee => employee._id !== action.payload._id)
        },
        set_employees: (state, action: PayloadAction<IEmployee[]>) => {
            state.employees = action.payload
            state.isLoading = false
        },
    }
})

export const { 
    create_employee, 
    delete_employee, 
    update_employee, 
    set_employees,
    create_employee_requested,
    delete_employee_requested,
    update_employee_requested } = employeeSlice.actions
export type EmployeeAction = ReturnType<typeof create_employee>
export default employeeSlice.reducer