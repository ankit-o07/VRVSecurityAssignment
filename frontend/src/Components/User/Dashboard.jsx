import React from 'react'
import PostList from '../Posts/PostList'

function UserDashboard() {
    const userName = localStorage.getItem('loggedInUser')
    return (
        <div>
            <h1>Welcome {userName}</h1>
            <PostList  />
        </div>
    )
}

export default UserDashboard
