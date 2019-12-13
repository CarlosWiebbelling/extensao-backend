const { verify } = require("../config/auth");
const EventModel = require("../models/event");
const ProjectModel = require("../models/project");

const event = async (fast, opts, done) => {
  fast.get("/event", async (request, reply) => {
    reply.type("application/json");
    try {
      if (request.query.projectId) {
        const events = await EventModel.find({
          projectId: request.query.projectId
        });
        return { events };
      } else {
        const events = await EventModel.find();
        return { events };
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.get("/event/:id", async (request, reply) => {
    reply.type("application/json");
    try {
      const event = await EventModel.findById(request.params.id);
      return { event };
    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.post("/event", async (request, reply) => {
    reply.type("application/json");
    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }

      const payload = await verify(request.headers.token);
      const project = await ProjectModel.findById(request.body.projectId);
      const [userRegistered] = project.projectAdmins.filter(
        user => user._id.toString() === payload.id
      );

      if (payload.level < 3 && !userRegistered) {
        reply.code(403);
        return {};
      }

      const event = {
        projectId: request.body.projectId,
        name: request.body.name,
        speaker: request.body.speaker,
        schedule: request.body.schedule,
        attachments: request.body.attachments,
        usersSubscribed: request.body.usersSubscribed,
        usersAttended: request.body.usersAttended
      };

      const eventCreated = await EventModel.create(event);
      return { id: eventCreated.id };
    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.put("/event/:id", async (request, reply) => {
    reply.type("application/json");
    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }

      const event = await EventModel.findById(request.params.id);
      if (!event) {
        reply.code(404);
        return {};
      }

      const payload = await verify(request.headers.token);

      const project = await ProjectModel.findById(event.projectId);
      if (!project) {
        reply.code(400);
        return {};
      }
      const [userRegistered] = project.projectAdmins.filter(
        user => user._id.toString() === payload.id
      );

      if (payload.level < 3 && !userRegistered) {
        reply.code(403);
        return {};
      }

      event.projectId = request.body.projectId;
      event.name = request.body.name;
      event.speaker = request.body.speaker;
      event.schedule = request.body.schedule;
      event.attachments = request.body.attachments;
      event.usersSubscribed = request.body.usersSubscribed;
      event.usersAttended = request.body.usersAttended;
      console.log("chegou aqui!");
      const eventUpdated = await event.save();

      return { event: eventUpdated };
    } catch (err) {
      reply.code(500);
      console.error(err);
      return err;
    }
  });

  fast.delete("/event/:id", async (request, reply) => {
    reply.type("application/json");
    try {
      if (!request.headers.token) {
        reply.code(401);
        return {};
      }

      const payload = await verify(request.headers.token);
      const project = await ProjectModel.findById(request.body.projectId);
      const [userRegistered] = project.projectAdmins.filter(
        user => user._id.toString() === payload.id
      );

      if (payload.level < 3 && !userRegistered) {
        reply.code(403);
        return {};
      }

      return { event: "1" };
    } catch (err) {
      console.error(err);
      return err;
    }
  });

  done();
};

module.exports = event;
