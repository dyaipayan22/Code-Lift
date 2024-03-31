import { Router } from 'express';
import passport from '../config/passport';

const router = Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: req.user,
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed',
  });
});

router.post('/logout', (req, res, next) => {
  res.clearCookie('connect.sid');
  req.logout(function (err) {
    req.session.destroy(function (err) {
      res.send();
    });
  });
});

router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: (process.env.CLIENT_URI as string) + '/dashboard',
    failureRedirect: '/login/failed',
  })
);

export default router;
