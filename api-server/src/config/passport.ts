import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import prisma from '../lib/prisma';
import { NextFunction, Request, Response } from 'express';

export default passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: '/auth/github/callback',
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      let user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            email: profile._json.email || '',
            image: profile.photos[0]?.value,
          },
        });
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
