import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

import ListPage from '../../components/organisms/Flame/ListPage'
import { getIncomingWebhooksByEmail } from '../../domain/service/incomingWebhook'
import { IncomingWebhook } from '../../functions/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const incomingWebhooks = !session
    ? []
    : await getIncomingWebhooksByEmail(session.user.email)
  return { props: { incomingWebhooks } }
}

type Props = {
  incomingWebhooks: IncomingWebhook[]
}

const Notification: React.FC<Props> = props => {
  return (
    <ListPage title="IncomingWebhook" basePath="notification">
      {props.incomingWebhooks.map(hook => (
        <div>
          <p>id: {hook.id}</p>
          <p>
            service: <a href={hook.incomingWebhookUrl}>{hook.service}</a>
          </p>
          <p>channel: {hook.channel}</p>
        </div>
      ))}
    </ListPage>
  )
}

export default Notification
