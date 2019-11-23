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
      return { message: err.message };
    }
  });

  fast.get('/user/:id', async (request, reply) => {
    reply.type('application/json');
    try {
      const user = await UserModel.findById(request.params.id);
      reply.code(200);
      return user;

    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  fast.post('/user', userRegisterSchema, async (request, reply) => {
    reply.type('application/json');
    try {
      if (request.body.password !== request.body.confirmPassword) {
        throw new Error('Senha e confirmação não conferem.');
      }

      const user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      };

      const userCreated = await UserModel.create(user);

      reply.code(200);
      return {};
    } catch (err) {
      reply.code(400);
      console.log(err);
      return { message: 'Não foi possível concluir o cadastro de usuário!' };
    }
  });

  fast.put('/user/:id', userUpdateSchema, async (request, reply) => {
    reply.type('application/json');
    try {
      const payload = await verify(request.headers.token);
      if (payload.id !== request.params.id) {
        throw new Error('Não foi possível atualizar os dados!');
      }

      if (request.body.password !== request.body.confirmPassword) {
        throw new Error('Senhas não conferem!');
      }

      const user = UserModel.findById(payload.id);

      if (user.password !== request.body.currentPassword) {
        throw new Error('Senhas não conferem!');
      }

      const userUpdated = {
        name: request.body.name,
        email: request.body.email,
      }

      reply.code(200);
      return {};

    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  fast.delete('/user/:id', async (request, reply) => {
    reply.type('application/json');
    try {
      const payload = await verify(request.headers.token);
      if(payload.level < 3) {
        reply.code(403);
        return { };
      }
      const user = UserModel.findById(request.params.id);
      if(!user){
        reply.code(404);
        return { };
      }
      UserModel.deleteOne(user);
      reply.code(200);
      return { };

    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  done();
}

module.exports = user;
