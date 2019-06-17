import Server from "./Server";
import { createRouter } from "./router";


const main = () => {
    const router = createRouter();
    const server = new Server(router);
    server.start(3000);
};


// Run only if executed directly (e.g: `node src/main.js`)
if (require.main === module) {
    main();
}
