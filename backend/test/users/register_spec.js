/* global describe, beforeEach, afterEach, it, expect, api */
const User = require('../../models/User')

const testUserCorrect = {
  username: 'mongods',
  email: 'mongods@mongods',
  password: 'test',
  passwordConfirmation: 'test'
}

const testUserIncorrect = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'another'
}

describe('POST /register', () => {

  beforeEach(done => {
    User.create({
      username: 'mongods',
      email: 'mongods@email',
      password: 'mongods',
      passwordConfirmation: 'mongods'
    }).then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

    it('should return a 200 response if request is valid', done => {
      api.post('/api/register')
        .send(testUserCorrect)
        .end((err, res) => {
          expect(res.status).to.eq(200)
          done()
        })
    })

    it('should return a 422 response if password !== passwordConfirmation', done => {
      api.post('/api/register')
        .send(testUserIncorrect)
        .end((err, res) => {
          expect(res.status).to.eq(422)
          done()
        })
    })
})
