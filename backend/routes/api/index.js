const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require('../../db/models');

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

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});




module.exports = router;
