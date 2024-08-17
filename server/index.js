const fastify = require("fastify")({ logger: false });
const path = require("path");

const middleware = async (fast) => {
    fast.register(require("@fastify/express"));
    fast.register(require("@fastify/static"),{
        root:path.join(__dirname,'/../public'),
        constraints:{},
    });
};
const PORT = { port: 3223 }; // fastify - port = object
middleware(fastify);

fastify.get("/hello", (request, reply) => {
  const template = "<h1>Hello Fastify</h1>";
  reply.type("text/html").code(200);
  return template;
});

fastify.listen(PORT, (err, address) => {
  return err ? console.log(err) : console.log("Listening on port " + address);
});
