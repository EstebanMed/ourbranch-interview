import React, { useCallback } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import {
    // RESET_USERS, 
    DELETE_USERS,
    ALL_USERS_QUERY
} from '../user.queries';
import './user-list.css';

const UserList = ({ currentUsers, setCurrentUsers, refetch }) => {
    const history = useHistory()

    const deleteUsersSelected = currentUsers.filter(user => user.isChecked)
    const usersToDelete = deleteUsersSelected && deleteUsersSelected.map(item => item.email)
    const disableDelete = !usersToDelete.length > 0

    // const [resetUsers] = useMutation(RESET_USERS, {
    //     refetchQueries: [{query: ALL_USERS_QUERY}]
    // });
    const [deleteUsers] = useMutation(DELETE_USERS, {
        refetchQueries: [{ query: ALL_USERS_QUERY }]
    });

    const handleChange = useCallback((event) => {
        const index = event.target.getAttribute('index')
        const user = currentUsers[index]

        const userUpdated = { ...user, isChecked: !user.isChecked }
        const clone = [...currentUsers]
        clone[index] = userUpdated
        setCurrentUsers(clone)
    }, [currentUsers, setCurrentUsers]);

    const handleSelectedUser = useCallback((event) => {
        if (event.target.type === 'checkbox') {
            return;
        }
        const index = event.target.getAttribute('index')
        const user = currentUsers[index]

        history.push(`/edit/${user.email}/${user.name}/${user.role}`)
    }, [currentUsers, history]);

    // const handleResetUsers = useCallback(() => {
    //     resetUsers()
    // }, [resetUsers],);

    const handleDelete = useCallback(async () => {
        await deleteUsers({
            variables: {
                emails: usersToDelete
            }
        })
        await refetch()
    }, [deleteUsers, refetch, usersToDelete]);

    return (
        <>
            <div className="header">
                <h1>Users</h1>
                <div>
                    <button type="button" className="delete" disabled={disableDelete} onClick={handleDelete}>Delete</button>
                    {/* <button type="button" className="reset" onClick={handleResetUsers}>Reset Users</button> */}
                </div>
            </div>
            <hr className="separator"></hr>
            <div className="table">
                <div className="theader">
                    <div className="th"></div>
                    <div className="th">EMAIL</div>
                    <div className="th">NAME</div>
                    <div className="th">ROLE</div>
                </div>
                <div className="tbody">
                    {currentUsers.map((user, index) => (
                        <div key={user.email} onClick={handleSelectedUser} className="tr" >
                            <div index={index} className="td checkbox"><input type="checkbox" index={index} checked={user.isChecked} onChange={handleChange} /></div>
                            <div index={index} className="td selection">{user.email}</div>
                            <div index={index} className="td">{user.name}</div>
                            <div index={index} className="td">{user.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserList
