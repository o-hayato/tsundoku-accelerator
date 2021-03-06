import { Avatar, Loader, Popover } from '@mantine/core'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import React, { useEffect, useState } from 'react'

import Login from '@/components/molecules/Button/Login'
import { SessionProps } from '@/interfaces/Session'

import LinkMenu, { LinkProps } from '../../molecules/LinkMenu/LinkMenu'

const links: LinkProps[] = [
  {
    text: 'Profile',
    href: '/user/profile'
  },
  {
    text: 'Notification',
    href: '/notification'
  },
  {
    text: 'Logout',
    onClick: () => signOut()
  }
]

type Props = SessionProps

export const User: React.FC<Props> = ({ session, loading }) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const handleRouteChange = (_url, { _shallow }) => {
      setOpened(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  if (loading) {
    return (
      <div className={'relative'}>
        <Loader style={{ fill: '#FFFFFF' }} />
      </div>
    )
  }

  if (!session) {
    return (
      <div className={'relative'}>
        <Login />
      </div>
    )
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <button
          className={'rounded-full flex items-center justify-center'}
          onClick={() => setOpened(o => !o)}
        >
          <Avatar
            src={session.user.image}
            alt={session.user.name}
            radius="xl"
          />
        </button>
      }
      bodyStyle={{ border: 0 }}
      position="bottom"
      placement="end"
      spacing={5}
      withArrow
    >
      <LinkMenu links={links} />
    </Popover>
  )
}

export default User
