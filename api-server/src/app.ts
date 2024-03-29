import express from 'express';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions';
import './config/passport';

const app = express();

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
// import userRoutes from './routes/user.routes';
import projectRouter from './routes/project.routes';

app.use('/auth', authRouter);
// app.use('/user', userRoutes);
app.use('/project', projectRouter);

export default app;
