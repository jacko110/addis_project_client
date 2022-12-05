import Button from './Button'
import Loading from './Loading'
import TableRow from './TableRow'
import './Table.css'
import { useEffect, useState } from 'react'
import { IEmployee } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import { RootState } from '../store';
import Input from './Input'

export default function Table () {
    let [search,setSearch] = useState("");

    const employees: IEmployee[] = useSelector((state: RootState) => state.employeeReducer.employees)
    const isLoading: boolean = useSelector((state: RootState) => state.employeeReducer.isLoading)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type: "employees/fetch_employee"
        })
    }, [])

    return (
        <>
            <Wrapper>
                <form className='search-form'>
                <Input value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button type='submit' className='submit-btn'>
                <FaSearch />
                </button>
                </form>
            </Wrapper>
            <table className='filled-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading
                        ? <tr><td colSpan={6}><Loading dots={3}></Loading></td></tr>
                        : employees.filter((item,index)=>
                            search ? item.name.toLowerCase().includes(search.toLowerCase()): item)
                        .map(
                            (employee, idx) => <TableRow employee={employee} key={idx}></TableRow>
                        )
                    }
                </tbody>
            </table>
    </>)
}

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-item:center;
    padding: 5rem 0 0 0;
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
`
