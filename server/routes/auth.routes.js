const { verifySignUp } = require("../middleware");
const { signin, signup } = require("../controllers/auth.controller");

const BASE_PATH = "/auth";

module.exports = ( router ) => {
    router.post(
        `${BASE_PATH}/signup`,
        [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
        signup
    );

    router.post(`${BASE_PATH}/signin`, signin);
};