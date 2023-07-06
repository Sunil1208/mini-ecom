export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("mini_ecom_user"));
  
    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }
  