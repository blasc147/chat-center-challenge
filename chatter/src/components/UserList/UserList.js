import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'
import LatestMessagesContext from '../../contexts/LatestMessages/LatestMessages'
import UserProfile from '../../common/components/UserProfile/UserProfile'
import './_user-list.scss'
import config from '../../config'

function User({ icon, name, lastActive, isOnline, id, color, onSelectUser }) {
  const { messages } = useContext(LatestMessagesContext)

  return (
    <div className='user-list__users__user' onClick={() => onSelectUser(id)}>
      <UserProfile icon={icon} name={name} color={color} />
      <div className='user-list__users__user__right-content'>
        <div className='user-list__users__user__title'>
          <p>{name}</p>
          <p className={cx({ 'user-list__users__user__online': isOnline })}>
            {isOnline ? 'Online' : lastActive}
          </p>
        </div>
        <p>{messages[id]}</p>
      </div>
    </div>
  )
}

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(
        `${config.BOT_SERVER_ENDPOINT}/api/chats`
      )
      setUsers(response.data)
    }

    fetchUsers()
  }, [])

  return (
    <div className='user-list'>
      <div className='user-list__header'>
        <div className='user-list__header__left'>
          <p>All Messages</p>
          <i className='fas fa-chevron-down' />
        </div>
        <i className='fas fa-cog' />
      </div>
      <div className='user-list__users'>
        {users.map((user) => (
          <User key={user.name} {...user} onSelectUser={onSelectUser} />
        ))}
      </div>
    </div>
  )
}
