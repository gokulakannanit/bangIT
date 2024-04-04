import { util, loadCss } from "../../util.js";

loadCss("/public/js/components/slider/slider.css");

const htmlString = (list, htmlFn) => `
        <section class="list">
            <ul class="slider">
                ${list
                  .map((item, index) => {
                    return `
                        <li key=${index}>
                            ${htmlFn(item)}
                        </li>
                        `;
                  })
                  .join("")}
            </ul>
            <div class="nav_control">
                <a class="nav"><i class="fa fa-angle-left"></i></a>
                <a class="nav"><i class="fa fa-angle-right"></i></a>
            </div>
        </section>
    `;

export const Slider = (ele, list, htmlFn, minWidth = 360, Height = 'auto') => {
  const utils = util();

  const resetAllWidth = (width) =>
    utils.getEleAll(".list .slider li", ele).forEach((item) => {
      item.style.minWidth = width + "px";
      item.style.maxWidth = width + "px";
    });

  const enableNavBtns = (sliderEle, fullWidth, moveWidth) => {
    const navBtns = utils.getEleAll(".nav_control .nav", ele);

    const _showNavBtns = () => {
      navBtns.forEach((e) => utils.addClass(e, "hide"));
      parseInt(sliderEle.style.left) < 0 &&
        utils.removeClass(navBtns[0], "hide");
      sliderEle.scrollWidth - fullWidth + parseInt(sliderEle.style.left) >= 0 &&
        sliderEle.scrollWidth - fullWidth > 0 &&
        utils.removeClass(navBtns[1], "hide");
    };

    const setLeft = (left) => (sliderEle.style.left = left + "px");

    navBtns[0]?.addEventListener("click", () => {
      setLeft(sliderEle.offsetLeft + moveWidth);
      _showNavBtns();
    });

    navBtns[1]?.addEventListener("click", () => {
      setLeft(sliderEle.offsetLeft - moveWidth);
      _showNavBtns();
    });

    _showNavBtns();
  };

  const onResize = () => {
    
    const listEle = utils.getEle(".list", ele);
    const sliderEle = utils.getEle(".list .slider", ele);
    const listItemEle = utils.getEle(".list .slider li", ele);

    resetAllWidth((minWidth >= listEle.clientWidth) ? listEle.clientWidth : minWidth);

    if(Height !== 'auto') sliderEle.style.height = Height + "px";

    const fullWidth = listEle.clientWidth;
    const eleWidth = listItemEle.clientWidth + 9;
    const reminder = fullWidth % eleWidth;
    const showCount = Math.floor(fullWidth / eleWidth);
    sliderEle.style.left = "0px";

    let newWidth = (minWidth >= listEle.clientWidth) ? listEle.clientWidth : minWidth,
      gap = Math.max((reminder / showCount), 20);
    if (showCount === 1) {
      gap = 20;
      newWidth = fullWidth - 20;
      resetAllWidth(newWidth);
    } 
    utils
      .getEleAll(".list .slider li", ele)
      .forEach((e) => (e.style.margin = "0 " + gap / 2 + "px"));

    enableNavBtns(sliderEle, listEle.clientWidth, newWidth + gap);
  };
  utils.adddHtml(ele, htmlString(list, htmlFn));
  window.addEventListener("resize", onResize);
  setTimeout(() => onResize(), 200);
};
