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
  moderatorBoard,
  getUserInfo,
  updateUser,
  updateUserRole
} = require("../controllers/user.controller");

const BASE_PATH = "/user";

module.exports = ( router ) => {
  router.get(`${BASE_PATH}/all`, allAccess);

  router.get(
    `${BASE_PATH}/info`,
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

  router.get(
    `${BASE_PATH}/:user_id/info`,
    [verifyToken],
    getUserInfo
  );

  router.put(
    `${BASE_PATH}/:user_id/update`,
    [verifyToken],
    updateUser
  );

  router.put(
    `${BASE_PATH}/:user_id/update-role`,
    [verifyToken, isAdmin],
    updateUserRole
  );
};