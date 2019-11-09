const verify = require('../config/auth');
const ProjectModel = require('../models/project');
const UserModel = require('../models/user');

const project = async (fast, opts, done) => {
  fast.get('/project', async (request, reply) => {
    reply.type('application/json');
    try {
      const projects = await ProjectModels.find();
      const output = projects.map((value, index, arr) => {
        return { 
          id: value.id, 
          name: value.name, 
          description: value.description,
          projectAdmin: value.projectAdmins[0].name
        };
      });
      reply.code(200);
      return { output };
    } catch (err) {
      console.error(err);
      return { };
    }
  });

  fast.get('/project/:id', async (request, reply) =>{
    reply.type('application/json');
    try{
      const project = await ProjectModel.findById(request.params.id);
      if(!project){
        reply.code(404);
        return { };
      }
      reply.code(200);
      return { project };
    } catch (err) {
      reply.code(400);
      return { message: 'deu ruim'};
    }
  });

  fast.post('/project', async (request, reply) =>{
    reply.type('application/json');
    try{
      const payload = await verify(request.headers.token);
      if(payload.level < 3) {
        reply.code(403);
        return { };
      }
      const project = {
        name: request.body.name,
        description: request.body.description,
        tags: request.body.tags
      };
      project.projectAdmins = request.body.projectAdmins.map(async (value, index, arr) => {
        user = await userModel.findById(value.id);
        if(!user) {
          throw message = "Não existe usuário com o id " + velue.id;
        }
        return { id: user.id, name: user.name };
      });
      const projectCreated = await ProjectModel.create(project);
      reply.code(200);
      return { };
    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  fast.put('/project/:id', async (request, reply) =>{
    reply.type('application/json');
    try{
      const payload = await verify(request.headers.token);
      if(payload.level < 3) {
        reply.code(403);
        return { };
      }
      const project = ProjectModel.findById(request.params.id);
      if(!project){
        reply.code(404);
        return { };
      }
      projectUpdated = {
        name: request.body.name,
        description: request.body.description,
        tags: request.body.tags
      };
      projectUpdated.projectAdmins = request.body.projectAdmins.map(async (value, index, arr) => {
        user = await userModel.findById(value.id);
        if(!user) {
          throw message = "Não existe usuário com o id " + velue.id;
        }
        return { id: user.id, name: user.name };
      });
      reply.code(200);
      return { };
    } catch (err) {
      reply.code(400);
      return { message: err};
    }
  });

  fast.delete('/project:id', async (request, reply) =>{
    reply.type('application/json');
    try{
      const payload = await verify(request.headers.token);
      if(payload.level < 3) {
        reply.code(403);
        return { };
      }
      const project = ProjectModel.findById(request.params.id);
      if(!project){
        reply.code(404);
        return { };
      }
      reply.code(200);
      return { };
    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  done();
}

module.exports = project;