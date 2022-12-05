import { put, takeEvery, all, fork, call, SagaReturnType } from 'redux-saga/effects'
import api from '../request'
import {
    EmployeeAction,
    set_employees,
    create_employee,
    update_employee,
    delete_employee
} from '../slices/employeeSlice'
import {
    addAlert,
    AlertAction
} from '../slices/alertSlice'

function* create_employee_worker(action: EmployeeAction) {
    try {
        const data: SagaReturnType<typeof api.create_employee> = yield call(
            api.create_employee,
            action.payload
        )
        yield put(create_employee(data))
    }
    catch (error: any) {
        yield put(addAlert({
            isError: true,
            message: `Could not create employee: ${error}`
        }))
    }
}

function* read_employee_worker() {
    try {
        const data: SagaReturnType<typeof api.read_employees> = yield call(
            api.read_employees
        )
        yield put(set_employees(data))
    } catch (error: any) {
        yield put(addAlert({
            isError: true,
            message: `Could not fetch employees: ${error}`
        }))
    }
}

function* update_employee_worker(action: EmployeeAction) {
    try {
        const data: SagaReturnType<typeof api.update_employee> = yield call(
            api.update_employee,
            action.payload
        )
        yield put(update_employee(data))
    } catch (error: any) {
        yield put(addAlert({
            isError: true,
            message: `Could not update employee: ${error}`
        }))
    }
}

function* delete_employee_worker(action: EmployeeAction) {
    try {
        const data: SagaReturnType<typeof api.delete_employee> = yield call(
            api.delete_employee,
            action.payload
        )
        yield put(delete_employee(action.payload))
    } catch (error: any) {
        yield put(addAlert({
            isError: true,
            message: `Could not delete employee: ${error}`
        }))
    }
}

function* watchEmployeeAdded() {
    yield takeEvery('employees/create_employee_requested', create_employee_worker)
}

function* watchEmployeeFinded() {
    yield takeEvery('employees/fetch_employee', read_employee_worker)
}

function* watchEmployeeUpdated() {
    yield takeEvery('employees/update_employee_requested', update_employee_worker)
}

function* watchEmployeeDeleted() {
    yield takeEvery('employees/delete_employee_requested', delete_employee_worker)
}

export default function* rootSaga() {
    yield all([
        fork(watchEmployeeAdded),
        fork(watchEmployeeFinded),
        fork(watchEmployeeUpdated),
        fork(watchEmployeeDeleted)
    ])
}
