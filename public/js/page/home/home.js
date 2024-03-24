import { HomeContent } from "../../data.js";
import { loadCss, util } from "../../util.js";

loadCss("/public/js/page/home/home.css");

const bannerHTML = `
<section class="banner animation">
    <div class="banner_images">
      <img alt="" src="/public/images/banner/2.png" class="scale_anim" />
    </div>
    <div class="container">
      <div class="banner_message">
          <h1 class="font_primary">We transform ideas into technology</h1>
          <p class="message">
            IT consulting company helps to solve different problems which you face when starts up new project or when improve an existing one.
            <br/><br/>
            We’re forging tomorrow’s memorable customer experiences through today’s digital architecture.
          </p>
          <a href="#about" class="simple">Learn More</a>
      </div>
      <img alt="" src="/public/images/banner/man.png" class="man" />
    </div>
</section>
`;

const aboutHTML = (({title, desc, block, list}){
  return `
  <section class="about flex_box container" id="about">
        <div class="about_right flex_box">
          <img alt="" src="/public/images/ab2.png" class="anim" />
          <img alt="" src="/public/images/ab1.png" class="anim" />
        </div>
        <div class="content">
          <h3 class="font_primary title_highlight">${title}</h3>
          <h1 class="font_xxl">${desc}</h1>
          <p>${block}</p>
          <ul>
            ${list.map(({title, desc})=>`<li><h2>${title}</h2><p>${desc}</p></li>`).join("")}
          </ul>
        </div>
      </section>
  `
})(HomeContent.about);


const htmlString = `
 <section class="home">
    ${bannerHTML}
    ${aboutHTML}
 </section>
`;

export default (main) => {
  const utils = util();
  let isFirstTime = true;

  const onScroll = () => {
    const element = [".about", ".service_section"];

    element.map((className) => {
      const ele = utils.getEle(className);
      utils.isSeen(ele) || isFirstTime
        ? utils.addClass(ele, "animation")
        : utils.removeClass(ele, "animation");
    });

    isFirstTime = false;
  };

  const startBannerAnimation = () => {
    utils.onScroll(onScroll);
  };

  return {
    load: () => {
      utils.adddHtml(main, htmlString);
      startBannerAnimation();
    },
  };
};
