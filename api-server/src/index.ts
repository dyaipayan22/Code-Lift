import express from 'express';

const app = express();

app.use(express.json());

app.post('/project', async (req, res) => {
  const { githubUrl } = req.body;
});
