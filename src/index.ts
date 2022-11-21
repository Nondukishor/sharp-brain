import express, { Request, Response } from 'express';
import db from './server';
import router from './router';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running',
  });
});

app.use(router);
async function bootsrap() {
  await db.$connect();
  app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
}

bootsrap()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async () => {
    await db.$disconnect();
    process.exit(1);
  });
