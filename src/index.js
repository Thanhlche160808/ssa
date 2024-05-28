"use strict";

import { server } from "./app";
import { connection } from "./configs/database";
import { HOST, PORT } from './constants/env';

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
