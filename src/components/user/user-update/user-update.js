import React, {useCallback, useRef} from "react";
import { useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

import { UPDATE_USER_MUTATION, ALL_USERS_QUERY } from '../user.queries';
import './user-update.css'

const UserUpdate = () => {
    let { email, name, role } = useParams();

    const selectedUserInput = {
        email,
        name,
        role
    }
  
    return (
        <UserUpdateForm selectedUserInput={selectedUserInput} />
    )
  }

const UserUpdateForm = ({selectedUserInput}) => {
    const history = useHistory()

    const selectedUser = useRef(selectedUserInput)
    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        refetchQueries: [{query: ALL_USERS_QUERY}]
    });

    const handleSave = useCallback(async () => {
        await updateUser(
            {
                variables: {
                    email: selectedUser.current.email, 
                    newAttributes: {
                        name: selectedUser.current.name,
                        role: selectedUser.current.role
                    }
                }
            })
            history.push('/')
    },[history, updateUser]);

    const handleNameChanged = useCallback((e) => {
        const clone = {...selectedUser}.current
        const updated = {...clone, name: e.target.value}
        selectedUser.current = {...updated}
    },[]);

    const handleRoleChanged = useCallback((e) => {
        const clone = {...selectedUser.current}
        const updated = {...clone, role: e.target.value}
        selectedUser.current = {...updated}
    },[]);

    return (
        <>
            {/* <Link to="/">Back</Link> */}
            <div className="header">
                <h1>{selectedUser.current.email}</h1>
                <button type="button" className="save" onClick={handleSave}>Save</button>
            </div>
            <hr></hr>
            <div className="form">
                <div className="section">
                    <label>Name</label>
                    <input type="text" className="textbox" name="name" defaultValue={selectedUser.current.name} onChange={handleNameChanged}></input>
                </div>
                <div className="vertical-separator"></div>
                <div className="section">
                    <label>Role</label>
                    <div className="radioButtonText"><input type="radio" value="ADMIN" name="role" defaultChecked={selectedUser.current.role === 'ADMIN'} onChange={handleRoleChanged}/>Admin</div>
                    <div className="radioButtonText"><input type="radio" value="DEVELOPER" name="role" defaultChecked={selectedUser.current.role === 'DEVELOPER'} onChange={handleRoleChanged}/>Developer</div>
                    <div className="radioButtonText"><input type="radio" value="APP_MANAGER" name="role" defaultChecked={selectedUser.current.role === 'APP_MANAGER'} onChange={handleRoleChanged}/>App Manager</div>
                    <div className="radioButtonText"><input type="radio" value="MARKETING" name="role" defaultChecked={selectedUser.role === 'MARKETING'} onChange={handleRoleChanged}/>Marketing</div>
                    <div className="radioButtonText"><input type="radio" value="SALES" name="role" defaultChecked={selectedUser.current.role === 'SALES'} onChange={handleRoleChanged}/>Sales</div>
                </div>
            </div>
        </>
    )
}

export default UserUpdate