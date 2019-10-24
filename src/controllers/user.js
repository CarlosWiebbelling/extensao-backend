const UserModel = require('../models/user');

const user = async (fast, opts, done) => {
  fast.post('/login', async (request, reply) => {
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

  fast.post('/user', async (request, reply) => {
    reply.type('application/json');
    try {
      const user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        confirmaPassword: request.body.confirmPassword
      };

      const userCreated = await UserModel.create(user);

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

  fast.put('/user/:id', async (request, reply) => {
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
