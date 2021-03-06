import type { NextApiHandler } from 'next'
import * as z from 'zod'

import prisma from '../../functions/prisma'

const requestBodySchema = z.object({
  title: z.string().min(1),
  content: z.string()
})

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodySchema.parse(req.body)
    await prisma.post.create({
      data: {
        title: result.title,
        content: result.content,
        published: true
      }
    })
    res.json({
      ok: true
    })
    return
  } catch (error) {
    res.json({ ok: false, error })
  }
}
export default handler
