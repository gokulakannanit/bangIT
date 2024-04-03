import { util, logoHTML, navHTML, loadCss } from "../../util.js";

loadCss("/public/js/components/footer/footer.css");

const minimize = ((e) => {
    e.currentTarget.parentElement.parentElement.classList.toggle('minimize');
});

const htmlString = `
    <div class="footer">
        <div class="container flex_box">
            <div class="footer_info">
                <div class="footer_logo">${logoHTML}</div>
                <div>
                    <h3 class="font_primary">About Us</h3>
                    <p>
                        We offer you all types of modern solutions that are related to it. Software and Graphic design in qucikest easy way and maintaining quality.
                    </p>
                    <p class="follow">
                        Follow US :
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-google-plus"></i></a>
                    </p>
                </div>
            </div>
            <div class="footer_info minimize">
                <h3 class="font_primary">Navigation <button class="icon_button"><i class="fa fa-angle-down"></i></button></h3>
                <div class="nav"></div>
            </div>
            <div class="footer_info minimize">
                <h3 class="font_primary">Contact Info<button class="icon_button"><i class="fa fa-angle-down"></i></button></h3>
                <ul>
                    <li>
                        <a href="tel:" class="address"> <i class="fa fa-phone"></i><span>(123) 45678910</span></a>
                    </li>
                    <li>
                        <a href="mailto:hr@actonitservices.com" class="address"> <i class="fa fa-envelope"></i><span>&nbsphr@actonitservices.com</span></a>
                    </li>
                    <li>
                        <a href="" class="address flex_box">
                            <i class="fa fa-map-marker"></i>
                            <span>267 Park Avenue <br /> New York, NY 90210</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="copyright">
        <p class="small font_primary">Copyright © ACTON all rights reserved.</p>
    </div>
    <div class="scroll_button hide" id="scroll_button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
        <i class="fa fa-angle-up"></i>
    </div>
`;

export const Footer = (ele) => {
  const utils = util();
  utils.adddHtml(ele, htmlString);
  utils.adddHtml(utils.getEle(".footer_info .nav"), `${navHTML()}`);
  utils.getEleAll(".icon_button", ele).forEach(ele=>ele.addEventListener("click", minimize));
  window.addEventListener("scroll", ()=>{
    const scrollButton = utils.getEle("#scroll_button");
    utils.addClass(scrollButton, "hide");
    (document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50) && utils.removeClass(scrollButton, "hide");
  });
};
