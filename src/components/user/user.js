import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import UserList from './user-list/user-list'
import { ALL_USERS_QUERY } from './user.queries';
import load from '../../img/loader.gif';
import './user.css'

const User = () => {
  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY, { fetchPolicy: "network-only" });

  if (loading) {
    return <img src={load} alt="Loading..." className="loader" />;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const usersMapped = data.allUsers.map(user => ({ ...user, isChecked: false }))

  return (
    <UserForm usersMapped={usersMapped} refetch={refetch} />
  )
}

const UserForm = ({ usersMapped, refetch }) => {
  const [currentUsers, setCurrentUsers] = useState(usersMapped)

  useEffect(() => {
    setCurrentUsers(usersMapped)
  }, [usersMapped])

  return (
    <UserList
      currentUsers={currentUsers}
      setCurrentUsers={setCurrentUsers}
      refetch={refetch} />
  )
}

export default User
