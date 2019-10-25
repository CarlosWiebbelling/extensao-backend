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

const userLoginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    }
  }
}

const userUpdateSchema = {
  type: 'object',
  required: ['name', 'email', 'enrolment', 'password', 'confirmPassword', 'level'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    enrolment: { type: 'string' },
    password: { type: 'string' },
    confirmPassword: { type: 'string' },
    level: { type: 'number' }
  }
}

module.exports = { userRegisterSchema, userLoginSchema, userUpdateSchema };