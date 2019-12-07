const { verify } = require("../config/auth");
const ProjectModel = require("../models/project");
const UserModel = require("../models/user");
const { projectSchema } = require("../config/validation");

const project = async (fast, opts, done) => {
  fast.get("/project", async (request, reply) => {
    reply.type("application/json");
    try {
      const projects = await ProjectModel.find();
      reply.code(200);
      return { projects };
    } catch (err) {
      console.error(err);
      return {};
    }
  });

  fast.get("/project/:id", async (request, reply) => {
    reply.type("application/json");
    try {
      const project = await ProjectModel.findById(request.params.id);
      if (!project) {
        reply.code(404);
        return {};
      }
      reply.code(200);
      return { project };
    } catch (err) {
      reply.code(400);
      console.error(err);
      return { message: err };
    }
  });

  fast.post("/project", projectSchema, async (request, reply) => {
    reply.type("application/json");

    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }

      const payload = await verify(request.headers.token);
      if (payload.level < 3) {
        reply.code(403);
        return {};
      }
      const project = {
        name: request.body.name,
        description: request.body.description,
        tags: request.body.tags
      };
      const candidatesToAdmin = request.body.projectAdmins.map(
        async (value, index, arr) => {
          const user = await UserModel.findOne({ email: value });
          if (!user) {
            throw (message = "Não existe usuário com o email " + value);
          }
          console.log({ _id: user.id, name: user.name, email: user.email });
          return { _id: user.id, name: user.name, email: user.email };
        }
      );
      project.projectAdmins = await Promise.all(candidatesToAdmin);
      console.log(project.projectAdmins);

      const projectCreated = await ProjectModel.create(project);
      reply.code(200);
      return { id: projectCreated.id };
    } catch (err) {
      reply.code(400);
      console.error(err);
      return { message: err };
    }
  });

  fast.put("/project/:id", projectSchema, async (request, reply) => {
    reply.type("application/json");
    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }
      const payload = await verify(request.headers.token);
      if (payload.level < 3) {
        reply.code(403);
        return {};
      }
      const project = await ProjectModel.findById(request.params.id);
      if (!project) {
        reply.code(404);
        return {};
      }

      project.name = request.body.name;
      project.description = request.body.description;
      project.tags = request.body.tags;

      const candidatesToAdmin = request.body.projectAdmins.map(
        async (value, index, arr) => {
          const user = await UserModel.findOne({ email: value });
          if (!user) {
            throw (message = "Não existe usuário com o email " + value);
          }
          console.log({ _id: user.id, name: user.name, email: user.email });
          return { _id: user.id, name: user.name, email: user.email };
        }
      );

      project.projectAdmins = await Promise.all(candidatesToAdmin);
      console.log(project.projectAdmins);
      await project.save();

      reply.code(200);
      return project;
    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  fast.delete("/project:id", async (request, reply) => {
    reply.type("application/json");
    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }
      const payload = await verify(request.headers.token);
      if (payload.level < 3) {
        reply.code(403);
        return {};
      }
      const project = await ProjectModel.findById(request.params.id);
      if (!project) {
        reply.code(404);
        return {};
      }
      await ProjectModel.deleteOne(project);
      reply.code(200);
      return {};
    } catch (err) {
      reply.code(400);
      return { message: err };
    }
  });

  done();
};

module.exports = project;
