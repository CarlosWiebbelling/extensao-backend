const { sign, verify } = require('../config/auth');
const UserModel = require('../models/user');
const { userRegisterSchema, userLoginSchema, userUpdateSchema } = require('../config/validation');

const user = async (fast, opts, done) => {
  fast.post('/login', userLoginSchema, async (request, reply) => {
    reply.type('application/json');
    try {
      const user = await UserModel.findOne({ email: request.body.email }).select('+password');
      if (!user) {
        throw new Error('Usuário ou senha inválidos');
      } else {
        if (!await user.comparePassword(request.body.password)) {
          throw new Error('Usuário ou senha inválidos');
        } else {
          const token = await sign({
            id: user.id,
            email: user.email,
            level: user.level
          });
          reply.code(200);
          return { token };
        }
      }
    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  fast.get('/user/:id', async (request, reply) => {
    reply.type('application/json');
    try {
      const response = {
        message: 'deu bom'
      };
      reply.code(200);
      return response;

    } catch (err) {
      const response = {
        message: 'deu ruim'
      };
      reply.code(400);
      return response;
    }
  });

  fast.post('/user', userRegisterSchema, async (request, reply) => {
    reply.type('application/json');
    try {
      const user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword
      };

      const userCreated = await UserModel.create(user);

      reply.code(200);
      return {};
    } catch (err) {
      const response = {
        message: 'Falha ao criar usuário!'
      };
      reply.code(400);
      return response;
    }
  });

  fast.put('/user/:id', userUpdateSchema, async (request, reply) => {
    reply.type('application/json');
    try {
      
      
      reply.code(200);
      return response;

    } catch (err) {
      const response = {
        message: 'deu ruim'
      };
      reply.code(400);
      return response;
    }
  });

  fast.delete('/user/:id', async (request, reply) => {
    reply.type('application/json');
    try {
      const response = {
        message: 'deu bom'
      };
      reply.code(200);
      return response;

    } catch (err) {
      const response = {
        message: 'deu ruim'
      };
      reply.code(400);
      return response;
    }
  });

  done();
}

module.exports = user;
