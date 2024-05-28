"use strict";

import { server } from "./app";
import { connection } from "./configs/database";

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

(async () => {
  try {
    await connection();
    server.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
})();
