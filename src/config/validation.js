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
  body: {
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
}

const projectSchema = {
  body: {
    type: 'object',
    required: ['name', 'description', 'projectAdmins', 'tags'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      projectAdmins: { 
        type: 'array',
        items: { type: 'object' } 
      },
      tags: { 
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
}
module.exports = { userRegisterSchema, userLoginSchema, userUpdateSchema, projectSchema };