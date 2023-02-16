import createServer from "./server.js";

const server = await createServer();

server.listen(8080, () => {
    console.log("app is listening at http://localhost:8080");
})