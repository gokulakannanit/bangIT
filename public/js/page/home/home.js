import { Slider } from "../../components/slider/slider.js";
import { HomeContent } from "../../data.js";
import { loadCss, util } from "../../util.js";

loadCss("/public/js/page/home/home.css");

let selectedTag = "all";

const bannerHTML = `
<section class="banner animation">
    <div class="banner_images">
      <img loading="lazy" alt="" src="/public/images/banner/2.png" class="scale_anim" />
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
      <img loading="lazy" alt="" src="/public/images/banner/man.png" class="man" />
    </div>
</section>
`;

const aboutHTML = (({ title, desc, block, list }) => {
  return `
  <section class="about flex_box container animation" id="about">
        <div class="about_right">
          <img loading="lazy" alt="" src="/public/images/ab2.png" />
          <img loading="lazy" alt="" src="/public/images/ab1.png" />
        </div>
        <div class="content">
          <h3 class="font_primary title_highlight">${title}</h3>
          <h1 class="font_xxl">${desc}</h1>
          <p>${block}</p>
          <ul class="list">
            ${list
              ?.map(({ title, desc }) => {
                return `
                <li class="flex_box">
                  <p class="font_primary">
                    <i class="fa fa-check"></i>
                  </p>
                  <div>
                    <h2>${title}</h2>
                    <p>${desc}</p>
                  </div>
                </li>`;
              })
              .join("")}
          </ul>
        </div>
      </section>
  `;
})(HomeContent.about);

const serviceHTML = (({ title, desc, block }) => {
  return `
    <section class="service">
      <div class="container">
        <h3 class="font_primary title_highlight dark">${title}</h3>
        <div class="content flex_box">
          <h1 class="font_xxl">${desc}</h1>
          <p>${block}</p>
        </div>
        <p class="service_list"></p>
      </div>
    </section>
  `;
})(HomeContent.service);

const testimonialHTML = (({ title, desc }) => {
  return `
    <section class="testimonial container">
      <h3 class="font_primary title_highlight">${title}</h3>
      <h1 class="font_xxl">${desc}</h1>
      <p class="testimonial_list"></p>
    </section>
  `;
})(HomeContent.testimonial);

const benefitsHTML = (({ title, desc, block, list }) => {
  return `
    <section class="benefits container">
      <h3 class="font_primary title_highlight">${title}</h3>
      <h1 class="font_xxl">${desc}</h1>
      <p class="block">${block}</p>
      <div class="content flex_box">
        ${list
          .map((item) => {
            return `<div>
            <h3 class="font_primary">${item.title}</h3>
            <p>${item.desc}</p>
            <p>${item.block}</p>
        </div>`;
          })
          .join("")}
        
      </div>
    </section>
  `;
})(HomeContent.benefits);

const checkArray = (arr, greateThan = 2) =>
  arr.length > greateThan ? arr : [];

const portfolioHTML = (({ title, desc, list }) => {
  return `
    <section class="portfolio">
      <div class="container">
        <h3 class="font_primary align_center">${title}</h3>
        <h1 class="font_xxl align_center">${desc}</h1>
        <div class="tags">
            ${checkArray(
              list.reduce(
                (arr, item) => {
                  !arr.includes(item.type) && arr.push(item.type);
                  return arr;
                },
                ["all"]
              )
            )
              .map((item) => {
                console.log(item.toLowerCase(), " = ", selectedTag);
                return selectedTag === item.toLowerCase()
                  ? `<div class="selected">${item}</div>`
                  : `<div>${item}</div>`;
              })
              .join("")}
        </div>
        <div class="list"></div>
      </div>
    </section>
  `;
})(HomeContent.portfolio);

const htmlString = `
 <section class="home">
    ${bannerHTML}
    ${aboutHTML}
    ${serviceHTML}
    ${benefitsHTML}
    ${portfolioHTML}
    ${testimonialHTML}
 </section>
`;

export default (main) => {
  const utils = util();
  let isFirstTime = true;

  const onScroll = () => {
    const element = [".about", ".service", ".benefits", ".testimonial"];

    element.map((className) => {
      const ele = utils.getEle(className);
      utils.isSeen(ele) || isFirstTime
        ? utils.addClass(ele, "animation")
        : utils.removeClass(ele, "animation");
    });

    isFirstTime = false;
  };

  const serviceListHTML = (item) => {
    return `<div class="list_item">
          <img alt="" src="${item.image}" />
          <h3 class="overlay">${item.title}</h3>
        </div>`;
  };

  const testimonialListHTML = (item) => {
    return `<div class="list_item flex_box">
          <div class="flex_box">
            <div class="left_content">
              <img alt="" src="${item.image}" width="150px" height="150px" />
              <div class="quote">
                <i class="fa fa-quote-left font_primary"></i>
              </div>
            </div>
            <div>
              <h3 class="font_primary">${item.name}</h3>
              <h3>${item.place}</h3>
              <p class="star">
                ${[1, 2, 3, 4, 5]
                  .map(
                    (index) =>
                      `<i class="fa fa-star ${
                        index <= item.rating ? "checked" : ""
                      }"></i>`
                  )
                  .join("")}
              </p>
            </div>
          </div>
          <p>${item.desc}</p>
        </div>`;
  };

  const portfolioListHTML = (item) => {
    return `<div class="list_item">
          <img alt="" src="${item.image}" />
          <div class="overlay">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </div>`;
  };

  const loadPortfolio = (list) => {
    Slider(utils.getEle(".portfolio .list"), list, portfolioListHTML, 360, 420);
  };

  const onInit = () => {
    Slider(
      utils.getEle(".service_list"),
      HomeContent.service.list,
      serviceListHTML,
      360,
      200
    );
    Slider(
      utils.getEle(".testimonial_list"),
      HomeContent.testimonial.list,
      testimonialListHTML,
      380
    );

    loadPortfolio(HomeContent.portfolio.list);

    utils.getEleAll(".tags > div").forEach((ele) =>
      ele.addEventListener(
        "click", ((e) => {
          selectedTag = e.target.innerHTML.toLowerCase();
          utils.getEleAll(".tags > div").forEach(e => {
            e.classList.remove("selected");
            if(e.innerHTML.toLowerCase() === selectedTag) e.classList.add("selected");
          })
          loadPortfolio(
            selectedTag === "all"
              ? HomeContent.portfolio.list
              : HomeContent.portfolio.list.filter(item => item.type.toLowerCase() === selectedTag)
          );
        })
      )
    );
    utils.onScroll(onScroll);
  };

  return {
    load: () => {
      utils.adddHtml(main, htmlString);
      setTimeout(onInit, 300);
    },
  };
};
