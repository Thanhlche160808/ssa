"use strict";

import { server } from "./app.js";
import { connection } from "./configs/database.js";
import { HOST, PORT } from './constants/env.js';

(async () => {
  try {
    await connection();
    server.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}/`);
      console.log(`API document running on http://${HOST}:${PORT}/api-docs/`);

    });
  } catch (err) {
    console.log(err.message);
  }
})();
