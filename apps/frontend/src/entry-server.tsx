import { StartServer, createHandler, renderAsync } from "@solidjs/start/entry-server";

export default createHandler(renderAsync((event) => <StartServer event={event} />));
