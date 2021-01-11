import { NextApiRequest, NextApiResponse } from 'next'
import { addWishList } from '../../../domain/service/wishList'
import { getSession } from 'next-auth/client'
import * as z from 'zod'

const requestParamSchema = z.object({
  url: z.string().min(1),
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const session = await getSession({ req })
        const result = requestParamSchema.parse(req.body)
        await addWishList(session?.user?.email, result.url)
        res.json({
          status: 'ok',
        })
      } catch (error) {
        res.json({ status: 'error', error })
      }
      break
    default:
      res.json({ status: 'error', case: 'invalid method' })
  }
}
