const event = async (fast, opts, done) => {
  fast.get('/event', async (request, reply) => {
    reply.type('application/json');
    try {
      return { event: '1' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  done();
}

module.exports = event;