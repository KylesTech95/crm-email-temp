const fastify = require("fastify")({ logger: false });
const path = require("path");
const fs = require('fs')

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

fastify.get('/reference',async (req,rep)=>{
  // store reference html temp in memory with fs
  let reference = path.resolve(__dirname,'..','public/reference.html')
  const stream = fs.readFileSync(reference)
  rep.type('text/html').send(stream)
  })

fastify.listen(PORT, (err, address) => {
  return err ? console.log(err) : console.log("Listening on port " + address);
});
