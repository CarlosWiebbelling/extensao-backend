const fastify = require('fastify');
const path = require('path');

const mode = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'default';

const fast = fastify();

fast.register(require('fastify-cors'));
fast.register(require('fastify-helmet'));

fast.addHook('preHandler', async (request, reply) => {
  try {
    console.log(request);

  } catch (err) {
    throw new Error('Some errors occurred.');
  } finally {
    return;
  }
});

fast.register(require(path.resolve('./src/controllers/user')));
fast.register(require(path.resolve('./src/controllers/project')));
fast.register(require(path.resolve('./src/controllers/event')));

const listen = async (port, ip) => {
  try {
    const address = await fast.listen(port, ip);
    console.log(`[${mode.toUpperCase()}] Running on: ${address}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { fast, listen };