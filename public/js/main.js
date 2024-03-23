import { loadCss, util } from "./util.js";
import { Header } from "./components/header/header.js";
import { Footer } from "./components/footer/footer.js";

loadCss("/public/css/style.css");

export const main = () => {
  const utils = util();
  const { pathname } = window.location;

  const mainEle = utils.getEle("main");
  const headerEle = utils.getEle("header");
  const footerEle = utils.getEle("footer");

  let pageObj = [];

  const header = Header(headerEle);
  const footer = Footer(footerEle);

  const activateState = () => {
    utils.getEleAll("a").forEach((ele) =>
      ele.addEventListener("click", (e) => {
        const path = e.target.getAttribute("href");
        if (path?.substring(0, 1) === "/") {
          e.preventDefault();
          window.history.pushState({}, null, path);
          loadPage(path);
        }
      })
    );
  };

  const initialLoad = (page) => {
    console.log("NEW LOADING");
    utils.addClass(mainEle, "loading");
    import("./page/" + page + "/" + page + ".js").then((module) => {
      pageObj[page] = module.default(mainEle);
      pageObj[page].load();
      setTimeout(() => utils.removeClass(mainEle, "loading"), 1000);
    });
  };

  const loadPage = (path) => {
    header.pathChange(path);
    let page = path.split("/")[1];
    page = page === "" ? "home" : page;
    console.log(pageObj[page], 'page', page);
    mainEle.innerHTML = "";
    (pageObj[page]) ? pageObj[page].load() : initialLoad(page);
    activateState();
  };

  loadPage(pathname);
};
