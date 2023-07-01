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

const BASE_PATH = "/user";

module.exports = ( router ) => {
  router.get(`${BASE_PATH}/all`, allAccess);

  router.get(
    `${BASE_PATH}/board`,
    [verifyToken],
    userBoard
  );
  
  router.get(
    `${BASE_PATH}/mod`,
    [verifyToken, isModerator],
    moderatorBoard
  );
  
  router.get(
    `${BASE_PATH}/admin`,
    [verifyToken, isAdmin],
    adminBoard
  );
};