import React, { useState, useEffect } from 'react'
import { LatestMessages } from '../../../contexts/LatestMessages/LatestMessages'
import ContactPanel from '../../../components/ContactPanel'
import UserList from '../../../components/UserList'
import Messages from '../../../components/Messages'
import IconBackground from './IconBackground'
import '../styles/_core-layout.scss'
import axios from 'axios'
import config from '../../../config'

export default function CoreLayout() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function fetchUserInfo(userId) {
      const response = await axios.get(
        `${config.BOT_SERVER_ENDPOINT}/api/chats/${userId}`
      )
      setUserInfo(response.data)
    }

    if (selectedUser) {
      fetchUserInfo(selectedUser)
    } else {
      const defaultUserId = '1'
      setSelectedUser(defaultUserId)
      fetchUserInfo(defaultUserId)
    }
  }, [selectedUser])

  return (
    <div className='core'>
      <IconBackground />
      <LatestMessages>
        <UserList onSelectUser={setSelectedUser} />
        {selectedUser && <Messages selectedUser={userInfo} />}
        {userInfo && <ContactPanel user={userInfo} />}
      </LatestMessages>
    </div>
  )
}
