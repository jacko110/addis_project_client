import { useState } from "react"
import Button from "./Button"
import { IEmployee } from "../types";
import { dateToString, DateString, Gender } from '../helpers'
import { useDispatch } from "react-redux";
import { delete_employee_requested, update_employee_requested } from '../slices/employeeSlice'
import Input from "./Input";
import SelectInput from "./SelectInput";

type TableRowProps = {
    employee: IEmployee
}

export default function TableRow({ employee }: TableRowProps) {

    let date_of_birth_string = employee.date_of_birth.includes('T') ? employee.date_of_birth.split('T')[0] : employee.date_of_birth

    let [isEditing, setEditing] = useState(false);
    let [name, setName] = useState(employee.name)
    let [gender, setGender] = useState(employee.gender || "male")
    let [date_of_birth, setDateOfBirth] = useState(date_of_birth_string)
    let [salary, setSalary] = useState(employee.salary)

    let dispatch = useDispatch();

    function toggleEdit() {
        setEditing(!isEditing)
    }

    function saveEmployee() {
        toggleEdit()
        dispatch(update_employee_requested({
            _id: employee._id,
            name,
            gender,
            date_of_birth,
            salary,
        }))
    }
    
    function deleteEmployee() {
        dispatch(delete_employee_requested(employee))
    }

    function updateDateOfBirth(event: React.ChangeEvent<HTMLInputElement> ) {
        let _date_of_birth: Date = new Date(event.target.valueAsNumber)
        setDateOfBirth(dateToString(_date_of_birth))
    }

    return (
        
    <tr>
        {
            isEditing
                ?
                <>
                    <td>{employee.id}</td>
                    <td>
                        <Input type="text" value={employee.name} onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                        <SelectInput 
                            value={employee.gender} 
                            onChange={e => setGender(e.target.value)} 
                            options={[{text:"Male", value:"male"}, {text:"Female", value:"female"}]}
                            />
                    </td>
                    <td>
                        <Input type="date" value={employee.date_of_birth} onChange={updateDateOfBirth} />
                    </td>
                    <td>
                        <Input type="number" value={employee.salary} onChange={e => setSalary(parseInt(e.target.value))} />
                    </td>
                </>
                :
                <>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{Gender(employee.gender)}</td>
                    <td>{DateString(employee.date_of_birth)}</td>
                    <td>{employee.salary}</td>
                </>
        }
        <td>
            {
                isEditing
                    ?
                    <>
                        <Button text="Save" onClick={saveEmployee} backgroundColor="#20B2AA"/>
                        <Button text="Cancel" onClick={toggleEdit} backgroundColor="#B22222"/>
                    </>
                    :
                    <>
                        <Button text="Edit" onClick={toggleEdit} backgroundColor="#4682B4"/>
                        <Button text="Delete" onClick={deleteEmployee} backgroundColor="#8B0000"/>
                    </>
            }
        </td>

    </tr>)
}