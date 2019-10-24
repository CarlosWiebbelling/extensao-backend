const userRegisterSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password', 'confirmPassword'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      confirmPassword: { type: 'string' }
    }
  }
}

module.exports = { userRegisterSchema };