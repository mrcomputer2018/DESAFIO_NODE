import fastify from "fastify";
import { crypto } from "node:crypto";

const server = fastify();

const courses = [
    { id: "1", title: "Curso 1" },
    { id: "2", title: "Curso 2" },
    { id: "3", title: "Curso 3" },
];

server.get("/courses", () => {
    return { courses };
});

server.post("/courses", () => {
    const randomId = crypto.randomUUID();

    courses.push({ id: randomId, title: "Novo Curso" });

    return { id: randomId };
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor escutando a porta ${address}`);
});

export default server;
