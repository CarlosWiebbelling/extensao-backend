const projects = async (fast, opts, done) => {
  fast.get('/project', async (request, reply) => {
    reply.type('application/json');
    try {
      return { project: '1' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  done();
}

module.exports = projects;