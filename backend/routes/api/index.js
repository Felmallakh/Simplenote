const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const notebookRouter = require("./notebooks");
const notesRouter = require("./notes");

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebookRouter)
router.use('/notes', notesRouter);


module.exports = router;

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// testing token cookie ... check cookie created in DevTools
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//         where: { username: 'Demo'}
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// }))

// // testing restoreUser middleware
// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// // testing requireAuth middleware
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });
