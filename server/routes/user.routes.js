const express = require("express");
const router = express.Router();

const { authJwt: { 
  verifyToken, 
  isAdmin, 
  isModerator, 
  isModeratorOrAdmin 
} 
} = require("../middleware");

const { 
  userBoard, 
  adminBoard, 
  allAccess, 
  moderatorBoard 
} = require("../controllers/user.controller");

router.get("/all", allAccess);

router.get(
  "/user",
  [verifyToken],
  userBoard
);

router.get(
  "/mod",
  [verifyToken, isModerator],
  moderatorBoard
);

router.get(
  "/admin",
  [verifyToken, isAdmin],
  adminBoard
);

module.exports = router;