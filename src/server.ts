import { Server } from "http";
import app from "./app";
import { seed } from "./app/utils/seedingAdmin";

const port = 5000;

async function main() {
  try {
    const server: Server = app.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });

    // Seed an admin
    seed();
  } catch (err) {
    console.log(err);
  }
}

main();
