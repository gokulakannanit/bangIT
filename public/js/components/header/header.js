import { contactInfo } from "../../data.js";
import { util, logoHTML, navHTML, loadCss } from "../../util.js";

loadCss("/public/js/components/header/header.css");

const htmlString = `
<div class="header container flex_box">
    ${logoHTML}
    <div class="header_right">
        <div class="contact flex_box">
          <a href="tel:"><i class="fa fa-phone"></i> ${contactInfo.phone}</a>
          <a href="mailto:hr@actonitservices.com">
              <i class="fa fa-envelope"></i>${contactInfo.email}
          </a>
        </div>
        <div class="menu"></div>
        <a href="javascript:void(0);" class="menu_icon">
          <i class="fa fa-bars"></i>
        </a>
    </div>
</div>`;

export const Header = (ele) => {
  const utils = util();
  utils.adddHtml(ele, htmlString);
  const menu = utils.getEle(".header_right .menu");
  const hamMenu = utils.getEle(".header_right .menu_icon");

  hamMenu.addEventListener("click", () => {
    utils.addClass(menu, "slide");
    utils.showBackdrop(() => utils.removeClass(menu, "slide"));
  });

  return {
    pathChange: (path) => {
      utils.removeClass(menu, "slide");
      utils.removeBackdrop();
      utils.adddHtml(menu, `${navHTML(path)}`);
    },
  };
};
