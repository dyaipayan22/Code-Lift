import express from 'express';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions';
import './config/passport';

const app = express();

const subscriber = new Redis(process.env.REDIS_SECRET_KEY || '');

export const io = new Server({
  cors: {
    origin: process.env.CLIENT_URI || '*',
    credentials: true,
  },
});

io.listen(9002);

app.use(
  expressSession({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

import authRouter from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import projectRouter from './routes/project.routes';

app.use('/auth', authRouter);
app.use('/user', userRoutes);
app.use('/project', projectRouter);

io.on('connection', (socket) => {
  socket.on('subscribe', (channel) => {
    socket.join(channel);
    socket.emit('message', `Joined ${channel}`);
  });
});

async function initRedisSubscribe() {
  console.log('Subscribed to logs....');
  subscriber.psubscribe('logs:*');
  subscriber.on('pmessage', (pattern, channel, message) => {
    io.to(channel).emit('message', message);
  });
}
initRedisSubscribe();

export default app;
