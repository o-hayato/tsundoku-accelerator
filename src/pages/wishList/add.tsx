import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

import Add from '../../components/templates/wishList/Add'
import { getIncomingWebhooksByEmail } from '../../domain/service/incomingWebhook'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const incomingWebhooks = !session
    ? []
    : await getIncomingWebhooksByEmail(session.user.email)
  return { props: { incomingWebhooks } }
}

export default Add
