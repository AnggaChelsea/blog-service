import express from "express";

const app = express();
const port = 8080;

app.get("/", (req: any, res: any) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
