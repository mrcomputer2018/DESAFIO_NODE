import fastify from "fastify";
import crypto from "node:crypto";

const server = fastify();

const courses = [
    { id: "1", title: "Curso 1" },
    { id: "2", title: "Curso 2" },
    { id: "3", title: "Curso 3" },
];

server.get("/courses", () => {
    return { courses};
});

server.get("/courses/:id", (request, reply) => {
    const courseId = (request.params as { id: string }).id;

    const course = courses.find((course) => course.id === courseId);

    if (!course) {
        return reply.status(404);
    }
    return { course };
});

server.post("/courses", (request, reply) => {
    const courseTitle = (request.body as { title: string }).title;
    const courseId = crypto.randomUUID();

    if (!courseTitle) {
        return reply.status(400).send({ error: "Título do curso é obrigatório" });
    }

    courses.push({ id: courseId, title: courseTitle });

    return reply.status(201).send({ id: courseId });
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor escutando a porta ${address}`);
});

export default server;
