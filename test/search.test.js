/* global describe it */
import {assert} from 'chai'
import {run} from 'syncano-test'

describe('search', function () {
  it('existing post code', function (done) {
    run('search', {args: {post_code: '0161'}})
      .then(res => {
        assert.propertyVal(res, 'code', 200)
        assert.propertyVal(res, 'mimetype', 'application/json')
        assert.propertyVal(res.data, 'city', 'OSLO')
        assert.propertyVal(res.data, 'municipality_id', '0301')
        assert.propertyVal(res.data, 'category', 'G')
        done()
      })
  })

  it('non-existing post code', function (done) {
    run('search', {args: {post_code: '9999'}})
      .then(res => {
        assert.propertyVal(res, 'code', 404)
        assert.propertyVal(res.data, 'message', 'Post code not found!')
        done()
      })
  })
})
