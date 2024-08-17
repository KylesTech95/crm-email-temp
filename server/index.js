const fastify = require('fastify')({logger:true})
const PORT = {port:3223}// fastify - port = object 



fastify.get('/',(request,reply)=>{
    const template = '<h1>Hello Fastify</h1>'
    reply.type('text/html').code(200)
    return template;
})


fastify.listen(PORT,(err,address)=>{
    return err ? console.log(err) : console.log('Listening on port '+address)
})