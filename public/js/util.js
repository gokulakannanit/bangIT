import { commonMessage, navMenu } from "./data.js";

export const logoHTML = `
<a href="/" class="logo">
    <img alt="" src="/public/images/logo_bangIT.png" />
</a>
`;

export const navHTML = (path = "") => `
    <ul class="flex_box">
        ${navMenu
          .map(
            (item) =>
              `<li><a href="${item.link}" class="address ${
                path === item.link && "selected"
              }">${item.title}</a></li>`
          )
          .join("")}
    </ul>
`;

export const noMessageHTML = (msg = commonMessage.NO_MESSAGE) =>
  `<p class="no_message"><span>${msg}</span></p>`;

export const loadCss = (url) => {
  let head = document.getElementsByTagName("HEAD")[0];
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  head.appendChild(link);
};

const backdrop = document.querySelector(".backdrop");

export const alertManager = () => {
  const ele = document.getElementById("alert");
  return {
    start: (msg) => {
      ele.getElementsByTagName("P")[0].innerHTML = msg;
      ele.classList.add("show");
    },
    update: () => {},
    end: () => {
      ele.classList.add("hide");
    },
  };
};

const _alertManager = alertManager();


export const util = () => {
  const scrollFunctions = [];
  const emailjs = window.emailJs;
  
  emailjs && emailjs.init({publicKey: "KC2egSF304Dy7ISij"});

  const addScrollFn = (scrollFn) => scrollFunctions.push(scrollFn);

  window.addEventListener("scroll", () => scrollFunctions.map((fn) => fn()));

  return {
    sendEmail: ({
      email = "",
      message = "",
    }) => {
      const validRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
      if (email && email.match(validRegex)) {
        _alertManager.start(
          "Successfully sent quote request, please check your email for confirmation"
        );

        emailjs &
          emailjs
            .send("service_ostbefl", "template_c7150vr", {email: email, message: message})
            .then(setTimeout(() => _alertManager.end(), 4000));
      }
    },
    showBackdrop: (callback) => {
      util().addClass(backdrop, "show");
      backdrop.addEventListener("click", () => {
        callback();
        util().removeClass(backdrop, "show");
      });
    },
    removeBackdrop: () => util().removeClass(backdrop, "show"),
    adddHtml: (ele, htmlString) => (ele.innerHTML = htmlString),
    getEle: (selector, ele = document) => ele.querySelector(selector),
    getEleAll: (selector, ele = document) => ele.querySelectorAll(selector),
    removeClass: (ele, className) => ele?.classList.remove(className),
    addClass: (ele, className) => ele?.classList.add(className),
    addClassIf: (ele, className, condition) =>
      condition
        ? ele?.classList.add(className)
        : ele?.classList.remove(className),
    tooggleClass: (ele, className) =>
      ele?.classList.contains(className)
        ? ele?.classList.remove(className)
        : ele?.classList.add(className),
    isSeen: (el) =>
      (el?.getBoundingClientRect().top + (el?.getBoundingClientRect().bottom - el?.getBoundingClientRect().top)/2) <= window.innerHeight,
    onScroll: addScrollFn,
  };
};
