import React from 'react'
import { useAuth } from '../utils/AuthContent'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="container">
      <h1>Welcome to my profile!</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.labels}</p>
        </div>
      )}
    </div>
  )
}

export default Profile