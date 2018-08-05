/* global describe it expect */
import {run} from '@syncano/test'

describe('search', () => {
  it('existing post code', async () => {
    const result = await run('search', {args: {postCode: '0161'}})
    expect(result.is('success'))
    expect(result.data).toHaveProperty('city', 'Oslo')
    expect(result.data).toHaveProperty('municipality', 'Oslo')
    expect(result.data).toHaveProperty('county', 'Oslo')
    expect(result.data).toHaveProperty('category', 'G')
  })

  it('non-existing post code', async () => {
    const result = await run('search', {args: {postCode: '9999'}})
    expect(result.is('notFound'))
    expect(result.data).toHaveProperty('message', 'Post code not found!')
  })

  it('existing post code with a city name which has two parts', async () => {
    const result = await run('search', {args: {postCode: '8614'}})
    expect(result.is('success'))
    expect(result.data).toHaveProperty('city', 'Mo I Rana')
    expect(result.data).toHaveProperty('municipality', 'Rana')
    expect(result.data).toHaveProperty('county', 'Nordland')
    expect(result.data).toHaveProperty('category', 'G')
  })
})
