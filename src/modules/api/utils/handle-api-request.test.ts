import {handleApiRequest} from './handle-api-request'
import {UsersNotFoundError} from '../errors/users-not-found.error'

describe('handleApiRequest', () => {
  it('resolves successful callback', async () => {
    const res = await handleApiRequest(async () => ({foo: 'bar'}))
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({foo: 'bar'})
  })

  it('handles HttpError responses', async () => {
    const res = await handleApiRequest(() => {
      throw new UsersNotFoundError()
    })
    expect(res.status).toBe(404)
    await expect(res.json()).resolves.toEqual({error: 'Users not found'})
  })

  it('handles generic errors', async () => {
    const res = await handleApiRequest(() => {
      throw new Error('boom')
    })
    expect(res.status).toBe(500)
    await expect(res.json()).resolves.toEqual({error: 'Internal Server Error'})
  })
})
