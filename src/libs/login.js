import router from "../router";
import store from "../store";
import cookie from "@utils/shop/store/cookie";
import { isWeixin } from "@utils/shop";
import { oAuth } from "@libs/wechat";

export default function toLogin(push, backUrl) {
  store.commit("LOGOUT");
  const { fullPath, name } = router.currentRoute;
  cookie.set("login_back_url", backUrl || fullPath);
  if (isWeixin()) {
    oAuth();
  } else {
    if (name !== "Login") {
      push
        ? router.push({ path: "/login" })
        : router.replace({ path: "/login" });
    }
  }
}
