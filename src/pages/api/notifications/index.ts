import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import * as z from 'zod'

import { addIncomingWebhook } from '../../../domain/service/incomingWebhook'

const requestParamSchema = z.object({
  url: z.string().min(1),
  channel: z.string().min(1),
  service: z.enum(['DISCORD'])
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const session = await getSession({ req })
        const { url, channel, service } = requestParamSchema.parse(req.body)
        await addIncomingWebhook(session?.user?.email, url, channel, service)
        res.json({
          status: 'ok'
        })
      } catch (error) {
        res.json({ status: 'error', error })
      }
      break
    default:
      res.json({ status: 'error', case: 'invalid method' })
  }
}
