import React, { useState } from 'react'
import cx from 'classnames'
import './_contact-panel.scss'

export default function ContactPanel({ user }) {
  const [minimised, setMinimised] = useState(
    Boolean(localStorage.getItem('minimised'))
  )

  const onClick = () => {
    // Remember user preference
    localStorage.setItem('minimised', minimised ? '' : 'true')
    setMinimised(!minimised)
  }

  return (
    <div
      className={cx('contact-panel', { 'contact-panel--minimised': minimised })}
    >
      <div className='contact-panel__header'>
        <i
          className='mdi mdi-exit-to-app contact-panel__toggle'
          onClick={onClick}
        />
        <div className='contact-panel__header__profile'>
          <div className='contact-panel__header__profile__picture'>
            <i className={user.icon || 'fas fa-comment-dots'} />
          </div>
          <h1>{user.name}</h1>
        </div>
      </div>
      <div className='contact-panel__body'>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Email</p>
          <p className='contact-panel__body__value'>{user.email || 'N/A'}</p>
        </div>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Phone</p>
          <p className='contact-panel__body__value'>{user.phone || 'N/A'}</p>
        </div>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Labels</p>
          <div className='contact-panel__body__labels'>
            {user.labels
              ? user.labels.map((label) => (
                  <p key={label}>
                    {label}
                    <i className='fas fa-times' />
                  </p>
                ))
              : 'N/A'}
          </div>
        </div>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Attachments</p>
          <div className='contact-panel__body__attachments'>
            {user.attachments
              ? user.attachments.map((attachment) => (
                  <p key={attachment}>
                    <i className='fas fa-paperclip' />
                    {attachment}
                  </p>
                ))
              : 'N/A'}
          </div>
          <p className='contact-panel__body__link'>View All</p>
        </div>
        <button className='contact-panel__body__edit-btn'>Edit Contact</button>
      </div>
    </div>
  )
}
