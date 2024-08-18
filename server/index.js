// declare variables
const fastify = require("fastify")({ logger: false });
const path = require("path");
const fs = require("fs");
// port
const PORT = { port: 3223 }; // fastify - port = object

// middleware helper function
const middleware = async (fast) => {
  fast.register(require("@fastify/express"));
  fast.register(require("@fastify/static"), {
    root: path.join(__dirname, "/../public"),
    constraints: {},
  });
};

// middleware
middleware(fastify);

// get html
fastify.get("/hello", (request, reply) => {
  const template = "<h1>Hello Fastify</h1>";
  reply.type("text/html").code(200);
  return template;
});

// get html via fs - readFileSync
fastify.get("/reference", async (req, rep) => {
  // store reference html temp in memory with fs
  let reference = path.resolve(__dirname, "..", "public/reference.html");
  const stream = fs.readFileSync(reference);
  rep.type("text/html").send(stream);
});

// get html via Buffer.from
fastify.get("/html-file", (req, rep) => {
  let readFile = fs.readFileSync(
    path.resolve(__dirname, "../public/index.html"),
    "utf-8"
  );
  let file = path.resolve(__dirname, "../public/index.html");
  let data = Buffer.from(readFile, "utf-8");
  rep.type("text/html").send(data);
});

// json params
fastify.get('/api/json/:subject',(req,rep)=>{
  const {subject} = req.params;
  const subjects = ['history','band','PE','science','math','Computer Science']
  let subjectConfirmed = (subjects.includes(subject)||(subjects.indexOf(subject)!=-1))
  try{
    if(!subjectConfirmed){
      rep.type('text/html').send('Subject is not found. Try again<br><a href="/">Main</a>')
    }
    else{
      rep.code(200).header('Content-Type','application/json','charset=utf-8').send({sub:subject});
    }
  }
  catch(err){
    throw err
  }
})
// listen on server
fastify.listen(PORT, (err, address) => {
  return err ? console.log(err) : console.log("Listening on port " + address);
});
