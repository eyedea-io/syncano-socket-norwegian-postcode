/* global describe it */
import {assert} from 'chai'
import {run} from 'syncano-test'

describe('search', function () {
  it('existing post code', function (done) {
    run('search', {args: {post_code: '0161'}})
      .then(response => response.is('success'))
      .then(response => {
        assert.propertyVal(response.data, 'city', 'Oslo')
        assert.propertyVal(response.data, 'municipality', 'Oslo')
        assert.propertyVal(response.data, 'county', 'Oslo')
        assert.propertyVal(response.data, 'category', 'G')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('non-existing post code', function (done) {
    run('search', {args: {post_code: '9999'}})
      .then(response => response.is('notFound'))
      .then(response => {
        assert.propertyVal(response.data, 'message', 'Post code not found!')
        done()
      })
  })

  it('existing post code with a city name which has two parts', function (done) {
    run('search', {args: {post_code: '8614'}})
      .then(response => response.is('success'))
      .then(response => {
        assert.propertyVal(response.data, 'city', 'Mo I Rana')
        assert.propertyVal(response.data, 'municipality', 'Rana')
        assert.propertyVal(response.data, 'county', 'Nordland')
        assert.propertyVal(response.data, 'category', 'G')
        done()
      })
  })
})
