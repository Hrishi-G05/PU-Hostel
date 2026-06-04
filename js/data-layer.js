/**
 * GTM Data Layer Tracking Solution for Parul University
 * WordPress Compatible - Optimized & Scalable
 * Version: 2.0
 *
 * Installation:
 * 1. Add to WordPress theme's functions.php or use "Insert Headers and Footers" plugin
 * 2. Ensure GTM container loads before this script
 * 3. Test in GTM Preview mode
 */

(function () {
  "use strict";
  window.trackerDebug = false;
  window.dataLayer = window.dataLayer || [];

  /**
   * Utility functions for DOM manipulation and data layer interactions
   */
  const Utils = {
    /**
     * Pushes event data to GTM data layer with console logging
     * @param {Object} eventData - Event data to push
     */
    push: function (eventData) {
      window.dataLayer.push(Utils.removeEmptyStrings(eventData));
      if (
        console &&
        console.log &&
        typeof wpEnv !== "undefined" &&
        wpEnv.type !== "production"
      ) {
        console.log("📊 GTM Event:", Utils.removeEmptyStrings(eventData));
      }
    },

    /**
     * Removes keys with empty or whitespace-only string values from an object.
     * @param {Object} obj - Source object to clean.
     * @returns {Object} New object without empty string values.
     */
    removeEmptyStrings: function (obj) {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([_, value]) => !(typeof value === "string" && value.trim() === ""),
        ),
      );
    },

    /**
     * Safely extracts text content from an element
     * @param {HTMLElement} el - Target element
     * @returns {string} Trimmed text content or empty string
     */
    getText: function (el) {
      return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
    },

    /**
     * Finds the closest ancestor element matching a selector
     * @param {HTMLElement} el - Starting element
     * @param {string} selector - CSS selector to match
     * @returns {HTMLElement|null} Matching ancestor or null
     */
    getClosest: function (el, selector) {
      while (el && el !== document) {
        if (el.matches && el.matches(selector)) return el;
        el = el.parentElement;
      }
      return null;
    },

    /**
     * Extracts contextual information from element's parent section
     * @param {HTMLElement} element - Target element
     * @param {Object} options - Configuration for context extraction
     * @param {string} [options.sectionSelector] - Selector for section container
     * @param {boolean} [options.getCategory] - Whether to extract category
     * @param {string} [options.categorySelector] - Selector for category element
     * @param {boolean} [options.getHeader] - Whether to extract header
     * @param {string} [options.headerSelector] - Selector for header element
     * @param {boolean} [options.getSubcategory] - Whether to extract subcategory
     * @param {string} [options.subcategorySelector] - Selector for subcategory element
     * @returns {Object} Context object with extracted information
     */
    getContext: function (element, options = {}) {
      const section = this.getClosest(
        element,
        options.sectionSelector || "section, .section, .content-block",
      );
      const context = {};

      if (section) {
        if (options.getCategory) {
          const category = section.querySelector(
            options.categorySelector || "h2, .category, .section-category",
          );
          context.category = category ? this.getText(category) : "";
        }

        if (options.getHeader) {
          const header = section.querySelector(
            options.headerSelector || "h3, h4, .title, .header, .section-title",
          );
          context.header = header ? this.getText(header) : "";
        }

        if (options.getSubcategory) {
          const subcategory = section.querySelector(
            options.subcategorySelector || ".subcategory, h4",
          );
          context.subcategory = subcategory ? this.getText(subcategory) : "";
        }
      }

      return context;
    },

    /**
     * Checks if text contains any of the specified keywords
     * @param {string} text - Text to search
     * @param {Array<string>} keywords - Keywords to match
     * @returns {boolean} True if any keyword matches
     */
    matchesKeyword: function (text, keywords) {
      const lowerText = text.toLowerCase();
      return keywords.some((keyword) =>
        lowerText.includes(keyword.toLowerCase()),
      );
    },

    /**
     * Gets the text of the currently active filter element
     * @param {string} filterSelector - CSS selector for filter element
     * @returns {string} Active filter text or empty string
     */
    getActiveFilter: function (filterSelector) {
      const filter = document.querySelector(filterSelector);
      return filter ? this.getText(filter) : "";
    },

    /**
     * Executes callback when DOM is ready
     * @param {Function} fn - Callback function to execute
     */
    ready: function (fn) {
      if (document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    },
  };

  window.trackerUtils = Utils;

  /**
   * Configuration object for all tracking events
   */
  const TrackingConfig = {
    /**
     * Click event configurations with context extraction
     */
    clicks: [
      {
        name: "top_navigation",
        selector: ".menu a, .submenu-link",
        condition: (el) =>
          Utils.getClosest(
            el,
            "header, nav, .top-navigation, .main-menu, .menu-dropdown",
          ),
        getData: (el) => {
          const parentLi = Utils.getClosest(el, "li.menu-item");
          const topLevelSpan = Utils.getClosest(el, "span.menu-link");
          const submenuItem = el.closest(".submenu-item");
          let click_category = topLevelSpan
            ? Utils.getText(topLevelSpan).trim()
            : "";
          if (!click_category && parentLi) {
            const liTitle = parentLi.querySelector("span.menu-link");
            click_category = liTitle
              ? Utils.getText(liTitle).trim()
              : "Main Navigation";
          }
          let click_header = "";
          if (submenuItem) {
            const closestHeader =
              submenuItem
                .closest(".submenu-inner")
                ?.querySelector("p.submenu-list-title") ||
              submenuItem
                .closest(".submenu")
                ?.querySelector("p.submenu-list-title");
            click_header = closestHeader
              ? Utils.getText(closestHeader).trim()
              : "Submenu";
          }

          return {
            click_category: click_category || "Main Navigation",
            click_header: click_header || "Main Menu",
            click_text: Utils.getText(el).trim() || "Link",
          };
        },
      },
      {
        name: "related_links_click",
        selector: ".realted-links-area a, .realted-links-area .box-areas",
        getData: (el) => {
          const ctx = Utils.getContext(el, {
            getHeader: true,
            headerSelector: ".realted-links-area .link-head",
          });
          return {
            click_header: ctx.header,
            click_text: Utils.getText(el),
          };
        },
      },
      {
        name: "know_more_button_click",
        selector:
          "#social-news-sec a.p-btn.p-btn-primary, .international-section a.p-btn.p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["know more"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const sectionHeader =
            btn.closest(".sub-title-wrapper")?.querySelector("h2") ||
            btn
              .closest(".international-section")
              ?.querySelector(".sub-title-wrapper h2");
          return {
            click_header:
              sectionHeader?.textContent
                ?.replace(/\r?\n|\r/g, " ")
                ?.replace(/\s+/g, " ")
                ?.trim() || "",
            click_text: Utils.getText(btn).trim(),
          };
        },
      },
      {
        name: "footer_interaction",
        selector: ".footer-left a, .footer-head a",
        getData: (el) => {
          const actionLink = el.closest(".footer-action a");
          if (actionLink) {
            const headTitle = el
              .closest(".footer-head")
              ?.querySelector(".footer-head-title");
            return {
              click_header:
                headTitle?.textContent?.replace(/[\r\n\s]+/g, " ").trim() ||
                "Footer Hero",
              click_text: el.textContent?.replace(/[\r\n\s]+/g, " ").trim(),
            };
          }

          const footerLink = el.closest(".footer-list .footer-link a");
          if (footerLink) {
            const listWrapper = el.closest(".footer-list-wrapper");
            const listHeader = listWrapper?.querySelector("h5");
            return {
              click_header:
                listHeader?.textContent?.replace(/[\r\n\s]+/g, " ").trim() ||
                "Footer Links",
              click_text: el.textContent?.replace(/[\r\n\s]+/g, " ").trim(),
            };
          }

          const ctx = Utils.getContext(el, { getHeader: true });
          return {
            click_header: ctx.header || "Footer",
            click_text: Utils.getText(el),
          };
        },
      },
      {
        name: "chatbot_click",
        selector: "button.bot-widget-bubble",
        getData: (btn) => {
          const isOpen = btn.classList.contains("bot--close")
            ? "closed"
            : "open";
          return {
            status: isOpen,
          };
        },
      },
      {
        name: "mail_click",
        selector: 'a[href^="mailto:"]',
        getData: (el) => {
          const campusTitle = el
            .closest(".queries-box")
            ?.querySelector(".queries-title");

          const mainCategory = el
            .closest(".contact-main-area")
            ?.querySelector(".banner-title");

          if (campusTitle) {
            return {
              click_category:
                mainCategory?.textContent?.replace(/[\r\n\s]+/g, " ").trim() ||
                "Contact",
              click_header:
                campusTitle.textContent?.replace(/[\r\n\s]+/g, " ").trim() ||
                "Campus Email",
              click_text: Utils.getText(el)
                .replace(/[\r\n\s]+/g, " ")
                .trim(),
            };
          }

          const ctx = Utils.getContext(el, {
            sectionSelector: "section, .contact-section, .campus-info",
            getCategory: true,
            getHeader: true,
          });

          return {
            click_category:
              mainCategory?.textContent?.replace(/[\r\n\s]+/g, " ").trim() ||
              ctx.category ||
              "Contact",
            click_header: ctx.header || "Email",
            click_text: Utils.getText(el),
          };
        },
      },
      {
        name: "program_detail_nav",
        selector: ".professors-tab-sec .program-detail-nav .nav-link",
        getData: (el) => ({
          click_text: Utils.getText(el),
        }),
      },
      {
        name: "pdf_click",
        selector: '.exam-schedules-tab-content a[href$=".pdf"]',
        getData: (el) => {
          const activeTabBtn = document.querySelector(
            ".program-detail-nav .nav-link.active",
          );
          const click_category = activeTabBtn
            ? Utils.getText(activeTabBtn)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "";
          const facultyTitle = el
            .closest(".accordion-item")
            ?.querySelector(".accordion-title-text, h4");
          const click_subcategory = facultyTitle
            ? Utils.getText(facultyTitle)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "";

          const tableContainer = el.closest(
            ".tablerounededCorner, .table-link",
          );
          const linksArea = tableContainer?.previousElementSibling;
          const click_header_el = linksArea?.querySelector?.(".link-head p");

          const click_header = click_header_el
            ? Utils.getText(click_header_el)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "";
          const click_text = Utils.getText(el)
            .replace(/[\r\n\s]+/g, " ")
            .trim();

          return {
            click_category,
            click_subcategory,
            click_header,
            click_text,
          };
        },
      },
      {
        name: "academic_calender_click",
        selector: '.tablerounededCorner.table-link a[href*="drive.google.com"]',
        getData: (el) => {
          const click_category = "ACADEMIC CALENDER";
          const tabContentTitle = el
            .closest(".exam-schedules-tab-content")
            ?.querySelector("h2.tab-content-title");
          const click_header = tabContentTitle
            ? Utils.getText(tabContentTitle)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "Academic Calendar";
          const paragraph = el.closest("p");
          const click_text = paragraph
            ? Utils.getText(paragraph)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : Utils.getText(el)
                .replace(/[\r\n\s]+/g, " ")
                .trim();

          return {
            click_category,
            click_header,
            click_text,
          };
        },
      },
      {
        name: "dropdown_click",
        selector: "#examTabContent .accordion-button",
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            sectionSelector: ".tab-pane",
            getHeader: true,
            headerSelector: "h2.tab-content-title",
          });

          const tabNavId = Utils.getClosest(btn, ".tab-pane")?.getAttribute(
            "aria-labelledby",
          );

          const click_category = Utils.getText(
            document.getElementById(tabNavId),
          );

          return {
            click_header: ctx.header || "",
            click_category,
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "dropdown_click",
        selector: "#accordionPossibilities .accordion-button",
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn)?.replace(" View details", ""),
          };
        },
      },
      {
        name: "dropdown_click",
        selector: ".tab-accordian",
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn.querySelector(".accordian-head")),
          };
        },
      },
      {
        name: "faculty_click",
        selector: ".explore-sec .explore-area .explore-box",
        getData: (el) => {
          const ctx = Utils.getContext(el, {
            getCategory: true,
            getHeader: true,
          });
          const cardTitle = el.querySelector(".explore-text h5");

          return {
            click_category: ctx.category || "Explore our faculties",
            click_header: ctx.header || "PU Faculties",
            click_text: cardTitle
              ? Utils.getText(cardTitle)
              : Utils.getText(el),
          };
        },
      },
      {
        name: "conference_click",
        selector: ".conferences-section .link-btn",
        getData: (el) => {
          const section = Utils.getClosest(el, ".conferences-section");
          const sectionHeader = section?.querySelector(".section-title");

          const card = Utils.getClosest(el, ".conference-card");
          const cardTitle = card?.querySelector("h3");

          const pathParts = window.location.pathname
            .split("/")
            .filter((p) => p);
          const slug =
            pathParts.length > 0 ? pathParts[pathParts.length - 1] : "home";

          return {
            click_category: slug,
            click_header: Utils.getText(sectionHeader),
            click_text: Utils.getText(cardTitle),
          };
        },
      },
      {
        name: "cta_click",
        selector:
          ".banner-sec .p-btn, #doctoral-program a, .facility-sec .p-btn",
        getData: (el) => {
          const activeBreadcrumb = document.querySelector(
            ".breadcrumb-links-item.active",
          );
          const dynamicCategory = activeBreadcrumb
            ? Utils.getText(activeBreadcrumb).toLowerCase().replace(/\s+/g, "-")
            : "";

          const facilitySection = el.closest(".facility-sec");
          if (facilitySection) {
            const title = facilitySection.querySelector("h2");
            return {
              click_category: dynamicCategory,
              click_header: title
                ? Utils.getText(title)
                    .replace(/[\r\n\s]+/g, " ")
                    .trim()
                : "",
              click_text: Utils.getText(el)
                .replace(/[\r\n\s]+/g, " ")
                .trim(),
            };
          }
          const bannerSection = el.closest(".banner-sec");
          if (bannerSection) {
            const title = bannerSection.querySelector(".banner-title");
            return {
              click_category: dynamicCategory,
              click_header: title ? Utils.getText(title) : "",
              click_text: Utils.getText(el),
            };
          }
          const firstMenuItem = document.querySelector(
            ".doctoral-tab-menu .doctoral-tab-item:first-child a",
          );
          const click_category = firstMenuItem
            ? Utils.getText(firstMenuItem)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "Doctoral Program";

          const tabContainer = el.closest(".doctoral-tab-content");
          const activeIconBox = tabContainer?.querySelector(
            ".child-icon-box.active h4",
          );
          const click_subcategory = activeIconBox
            ? Utils.getText(activeIconBox)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : "";
          const activeHeaderEl = tabContainer?.querySelector(
            ".child-tab-title.active h3",
          );
          const fallbackHeader = el
            .closest(".child-content-box")
            ?.querySelector("h3");

          const click_header =
            activeHeaderEl || fallbackHeader
              ? Utils.getText(activeHeaderEl || fallbackHeader)
                  .replace(/[\r\n\s]+/g, " ")
                  .trim()
              : "";

          return {
            click_category,
            click_subcategory,
            click_header,
            click_text: Utils.getText(el)
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
          };
        },
      },
      {
        name: "cta_click",
        selector: ".placement-events-page-event-card",
        getData: (el) => {
          const click_text = Utils.getText(el.querySelector("h2"));
          return {
            click_category: "our-placement-events",
            click_header: "Our Placement Events",
            click_text,
          };
        },
      },
      {
        name: "industry_know_more_click",
        selector: ".certifications-sec a.p-btn.p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["know more"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const sectionHeader =
            btn.closest(".sub-title-wrapper")?.querySelector("h2") ||
            btn
              .closest(".certifications-sec")
              ?.querySelector(".sub-title-wrapper h2");
          return {
            click_header:
              sectionHeader?.textContent
                ?.replace(/\r?\n|\r/g, " ")
                ?.replace(/\s+/g, " ")
                ?.trim() || "",
            click_text: Utils.getText(btn).trim(),
          };
        },
      },
      {
        name: "course_finder_click",
        selector: ".detail-program .p-btn-primary, .banner-sec .p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, [
            "go to course finder",
            "view couse finder",
            "view course finder",
          ]);
          return shouldTrack;
        },
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
            container: btn.closest(".detail-program"),
            getCategory: true,
            categorySelector: "h1.banner-title",
          });
          return {
            click_header: ctx.header || ctx.category,
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "placements_click",
        selector: ".program-studies .p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, [
            "placement & industries",
          ]);
          return shouldTrack;
        },
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
            container: btn.closest(".program-studies"),
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "view_recognitions_click",
        selector: ".overview-image-section .p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, [
            "view all recognitions",
          ]);
          return shouldTrack;
        },
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h5.image-card-head",
            container: btn.closest(".overview-image-section"),
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "know_more_card_click",
        selector:
          ".detail-program .explore-area a.more-content, .detail-program .explore-area a .explore-box",
        getData: (el) => {
          const section = el.closest(".detail-program");
          const sectionHeader = section?.querySelector(".sub-title-wrapper h2");
          const exploreBox = el.closest(".explore-box");
          const cardTitleEl = exploreBox?.querySelector("h5.text-title");
          return {
            event: "know_more_card_click",
            click_header: sectionHeader
              ? Utils.getText(sectionHeader)
                  .replace(/[\r\n\s]+/g, " ")
                  .trim()
              : "",
            click_text: cardTitleEl
              ? Utils.getText(cardTitleEl)
                  .replace(/[\r\n\s]+/g, " ")
                  .trim()
              : "",
          };
        },
      },
      {
        name: "news_click",
        selector: ".scroll-cards, .fresher-card, .facility-sec .more-content",
        getData: (el) => {
          const facilitySection = el.closest(".facility-sec");
          if (facilitySection) {
            const sectionTitle = facilitySection.querySelector("h2");
            const cardTitle = el
              .closest(".facility-card")
              ?.querySelector(".facility-card-title");

            return {
              click_category: Utils.getText(sectionTitle)
                .replace(/[\r\n\s]+/g, " ")
                .trim(),
              click_header: Utils.getText(cardTitle)
                .replace(/[\r\n\s]+/g, " ")
                .trim(),
              click_text: Utils.getText(el)
                .replace(/[\r\n\s]+/g, " ")
                .trim(),
            };
          }

          const hilightSection = el.closest(".hilight-sec");
          const sectionTitlePrimary = hilightSection?.querySelector(
            ".sub-title-wrapper h2",
          );
          const sectionTitleSecondary = hilightSection?.querySelector(
            ".sub-title-wrapper h4",
          );

          const newsTitle = el.querySelector(".scroll-card-content h3");

          return {
            click_header: (
              Utils.getText(sectionTitleSecondary) +
              " " +
              Utils.getText(sectionTitlePrimary)
            ).trim(),
            click_text: newsTitle
              ? Utils.getText(newsTitle)
              : Utils.getText(el),
          };
        },
      },
      {
        name: "view_more_click",
        selector: ".launch-sec.message-sec a.more-content",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["view more"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "apply_now_click",
        selector: ".mid-banner-sec a.p-btn.p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["apply now"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const midBannerTitle = Utils.getClosest(
            btn,
            ".mid-banner-sec",
          )?.querySelector(".mid-banner-title");
          const ctx = Utils.getContext(btn, {
            sectionSelector: ".mid-banner-sec",
            getHeader: true,
          });

          return {
            click_header: Utils.getText(midBannerTitle) || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "programs_click",
        selector: ".detail-program .explore-area a .explore-box",
        getData: (el) => {
          const section = el.closest(".detail-program");
          const sectionHeader = section?.querySelector(".sub-title-wrapper h2");
          const exploreBox = el.closest(".explore-box");
          const cardTitleEl = exploreBox?.querySelector("h5.text-title");
          return {
            event: "programs_click",
            click_header: sectionHeader
              ? Utils.getText(sectionHeader)
                  .replace(/[\r\n\s]+/g, " ")
                  .trim()
              : "",
            click_text: cardTitleEl
              ? Utils.getText(cardTitleEl)
                  .replace(/[\r\n\s]+/g, " ")
                  .trim()
              : "",
          };
        },
      },
      {
        name: "sports_click",
        selector: ".sports-scholarships .p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["sports at PU"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const ctx = Utils.getContext(btn, {
            getHeader: true,
            headerSelector: "h5",
          });
          return {
            click_header: ctx.header || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "state_click",
        selector: ".national-admission-offices .nav-pills .nav-link",
        getData: (el) => {
          const getZoneEl = Utils.getClosest(el, "body")?.querySelector(
            ".program-detail-nav .nav-link.active",
          );
          const getZoneText = Utils.getText(getZoneEl);
          return {
            click_header: getZoneText || "",
            click_text: Utils.getText(el),
          };
        },
      },
      {
        name: "state_click",
        selector: ".program-detail-nav .nav-link.active",
        condition: (el) => {
          return Utils.matchesKeyword(Utils.getText(el), ["zone"]);
        },
        getData: (el) => {
          const getZoneText = Utils.getText(el);
          const targetPaneId = el.getAttribute("data-bs-target");
          const targetPane = document.querySelector(targetPaneId);
          const stateName = Utils.getText(
            targetPane?.querySelector(".nav-link.active"),
          );

          return {
            click_header: getZoneText || "",
            click_text: stateName,
          };
        },
      },
      {
        name: "download_brochure",
        selector: `
    .detail-program.detail-program-center .view-details-btn .p-btn-outline, 
    .libraries-card-sec .p-btn-primary,
    .faculty-box .more-content,
    .detail-program .know-more-area .more-content,
    .tab-desc-area .p-btn-primary
  `,
        condition: (el) => {
          if (el.classList.contains("more-content")) return true;

          let buttonText = Utils.getText(el);
          return (
            Utils.matchesKeyword(buttonText, ["download student brochure"]) ||
            Utils.matchesKeyword(buttonText, ["download brochure"])
          );
        },
        getData: (el) => {
          const pathParts = window.location.pathname
            .split("/")
            .filter((p) => p);
          let slugCategory =
            pathParts.length > 0 ? pathParts[pathParts.length - 1] : "home";

          const accordionHeader = el
            .closest(".accordion-item")
            ?.querySelector(".accordion-header h4.point-text");
          const cardTitle = el.closest(".faculty-box")?.querySelector("h5");
          const ctx = Utils.getContext(el, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });

          const finalHeader =
            Utils.getText(accordionHeader) ||
            Utils.getText(cardTitle) ||
            ctx.header ||
            "";

          return {
            click_category: slugCategory,
            click_header: finalHeader,
            click_text: Utils.getText(el),
          };
        },
      },
      {
        name: "events_click",
        selector: ".news-awards .main-card-data a, .news-awards .sub-cards a",
        getData: (el) => {
          const newsAwardSection = Utils.getClosest(el, ".news-awards");
          const sectionTitle =
            newsAwardSection?.querySelector("h2.sub-title-lg");
          const cardTitle = Utils.getClosest(
            el,
            ".main-card-data, .card-content",
          )?.querySelector("h5");

          return {
            click_header: Utils.getText(sectionTitle)
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
            click_text: Utils.getText(cardTitle)
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
          };
        },
      },
      {
        name: "online_resources_click",
        selector: ".online-resources-sec .explore-box",
        getData: (el) => {
          const url = new URL(el.href);
          const hostname = url.hostname;

          const ctx = Utils.getContext(el, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });

          const resourceTitle = el.querySelector("h5");

          return {
            click_category: hostname,
            click_header: ctx.header || "",
            click_text: Utils.getText(resourceTitle),
          };
        },
      },
      {
        name: "social_link_click",
        selector:
          '.social-links a, .social-media a, [class*="social"] a, a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"], a[href*="instagram"], a[href*="youtube"]',
        getData: (el) => {
          const ctx = Utils.getContext(el, { getHeader: true });
          const socialMap = {
            facebook: "Facebook",
            twitter: "Twitter",
            linkedin: "LinkedIn",
            instagram: "Instagram",
            youtube: "YouTube",
          };

          let socialName = "";
          for (let key in socialMap) {
            if (el.href && el.href.includes(key)) {
              socialName = socialMap[key];
              break;
            }
          }

          return {
            click_header: ctx.header || "Join us",
            click_text: socialName || Utils.getText(el),
          };
        },
      },
      {
        name: "faculty_apply_now",
        selector: "main > .banner-sec .p-btn-primary",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["Apply Now"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const facultyHeroEl = Utils.getClosest(btn, ".banner-sec");
          const header = facultyHeroEl?.querySelector(".banner-title");
          return {
            click_header: Utils.getText(header) || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "faculty_view_brochure",
        selector: "main > .banner-sec .p-btn-outline",
        condition: (btn) => {
          let buttonText = Utils.getText(btn);
          let shouldTrack = Utils.matchesKeyword(buttonText, ["View Brochure"]);
          return shouldTrack;
        },
        getData: (btn) => {
          const facultyHeroEl = Utils.getClosest(btn, ".banner-sec");
          const header = facultyHeroEl?.querySelector(".banner-title");
          return {
            click_header: Utils.getText(header) || "",
            click_text: Utils.getText(btn),
          };
        },
      },
      {
        name: "blog_click",
        selector:
          ".bolg-main-content .blogs .blog-read-more-btn:not(.section-load-more), .content-trending a, .sidebar-box.popular-post a",
        getData: (el) => {
          const click_category =
            Utils.getText(document.querySelector(".blog-hero h1")) || "";

          let click_header = "";
          let click_text = "";

          const popularPostContainer = Utils.getClosest(
            el,
            ".sidebar-box.popular-post",
          );
          const isPopularPost = !!popularPostContainer;

          if (isPopularPost) {
            click_header =
              Utils.getText(popularPostContainer?.querySelector("h3")) ||
              "Latest Post";

            click_text = Utils.getText(el);

            return {
              click_category,
              click_header,
              click_text,
            };
          }

          const trendingContainer = Utils.getClosest(el, ".content-trending");
          const isTrending = !!trendingContainer;

          if (isTrending) {
            click_header = Utils.getText(
              Utils.getClosest(el, ".sidebar-box")?.querySelector("h3"),
            );
          } else {
            const groupContainer = Utils.getClosest(el, ".all-section");
            const isGrouped = !!groupContainer;

            click_header = isGrouped
              ? Utils.getText(
                  groupContainer?.querySelector("h2.section-title-blog"),
                )
              : Utils.getActiveFilter(
                  ".bolg-main-content .category-filter .active",
                );
          }

          const featuredContainer = Utils.getClosest(el, ".featured-section");
          const isFeatured = !!featuredContainer;

          if (isFeatured) {
            click_header =
              Utils.getText(featuredContainer?.querySelector(".badge")) ||
              "Featured Story";
          }

          if (isTrending) {
            click_text = Utils.getText(trendingContainer.querySelector("h4"));
          } else {
            const card = Utils.getClosest(el, ".card-blogs, .featured-card");
            click_text = Utils.getText(card?.querySelector("h2")) || "";
          }

          return {
            click_category,
            click_header,
            click_text,
          };
        },
      },
    ],

    /**
     * Button-specific tracking configurations
     */
    buttons: [],

    /**
     * Specialized interaction configurations
     */
    specialized: {
      faq: {
        selector: ".faq-accordion, [class*='faq-toggle'], .faq-question",
        containerSelector: ".faq-sec, [class*='faq-sec']",
      },
      video: {
        selector: ".fashion-card.has-youtube",
        containerSelector: "section",
      },
      programCard: {
        selector: '.program-card, [class*="program"] .card, .course-card',
      },
      roomCard: {
        selector:
          ".faculty-area .faculty-box[data-gender]:not(.blog-card-list-items)",
      },
    },
  };

  /**
   * Initializes all tracking functionality when DOM is ready
   */
  Utils.ready(function () {
    /**
     * Handles all click events through event delegation
     */
    document.addEventListener(
      "click",
      function (e) {
        if (window.trackerDebug) {
          e.preventDefault();
        }
        TrackingConfig.clicks.forEach((config) => {
          const element = Utils.getClosest(e.target, config.selector);
          if (element) {
            const shouldTrack = config.condition
              ? config.condition(element)
              : true;
            if (shouldTrack) {
              const data = config.getData(element);
              Utils.push({ event: config.name, ...data });
            }
          }
        });

        const button = e.target.closest("a, button");
        if (button) {
          const buttonText = Utils.getText(button);

          TrackingConfig.buttons.forEach((config) => {
            if (
              !config.keywords?.length ||
              Utils.matchesKeyword(buttonText, config.keywords)
            ) {
              const shouldTrack = config.condition
                ? config.condition(button)
                : true;
              if (shouldTrack) {
                const data = config.getData(button);
                if (data) {
                  Utils.push({ event: config.name, ...data });
                }
              }
            }
          });
        }

        const programTarget = e.target.closest(
          ".accordion-possibilities .explore-box",
        );
        if (programTarget) {
          const accordionItem = programTarget.closest(".accordion-item");
          const activeTabBtn = accordionItem?.querySelector(".nav-link.active");
          const block = programTarget.closest(".accordion-body-block");

          Utils.push({
            event: "program_details_click",
            click_category: Utils.getText(activeTabBtn)
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
            click_header: Utils.getText(
              block?.querySelector(".pathway-tab-subtitle"),
            )
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
            click_text: Utils.getText(
              programTarget.querySelector(".program-title"),
            )
              .replace(/[\r\n\s]+/g, " ")
              .trim(),
          });
        }

        const faqButton = e.target.closest(".accordion-button");
        const faqToggle = faqButton?.closest(".faq-accordion");

        if (faqToggle && Utils.getClosest(faqToggle, ".faq-sec")) {
          const ctx = Utils.getContext(faqToggle, {
            sectionSelector: ".faq-sec",
            headerSelector: ".faq-sec-title, h2",
            getHeader: true,
          });

          Utils.push({
            event: "faq_interaction",
            click_header: ctx.header || "Frequently asked questions",
            click_text: Utils.getText(button),
          });
        }

        const videoBtn = e.target.closest(
          TrackingConfig.specialized.video.selector,
        );
        if (videoBtn) {
          const videoContainer = Utils.getClosest(
            videoBtn,
            TrackingConfig.specialized.video.containerSelector,
          );
          if (!videoContainer) return;
          const videoTitle = videoBtn.dataset.videoTitle || "";
          const youtubeUrl = videoBtn.dataset.youtubeUrl || "";
          const activeSidebar =
            videoContainer.querySelector(
              ".tag.tag-set2.active, .slider-event-title.cmn-span-clr",
            ) ||
            Utils.getClosest(videoBtn, ".committee-sec")?.querySelector(
              ".committee-title",
            );
          const sidebarText = activeSidebar ? Utils.getText(activeSidebar) : "";
          const sectionTitle = videoContainer.querySelector(
            ".infrastructure-content-title",
          );
          const eventData = {
            event: "video_play",
            video_title: videoTitle || "",
            video_url: youtubeUrl,
          };
          if (sidebarText?.length) {
            eventData.click_header = sidebarText;
          }
          Utils.push(eventData);
        }

        const programCard = e.target.closest(
          ".detail-program #program-list.explore-area .explore-box, .detail-program .program-tabs .explore-area .explore-box",
        );

        if (programCard) {
          const getCheckedValues = (selector) => {
            const checkedLabels = Array.from(
              document.querySelectorAll(
                `.detail-program [id^="${selector}-"].checkbox-input:checked`,
              ),
            )
              .map((input) => {
                const label = document.querySelector(
                  `label[for="${input.id}"]`,
                );
                return label
                  ? Utils.getText(label)
                      .replace(/[\r\n\s]+/g, " ")
                      .trim()
                  : "";
              })
              .filter((val) => val !== "");

            return checkedLabels.length > 0 ? checkedLabels.join(", ") : "";
          };

          const select_level = getCheckedValues("select-level");
          const select_faculty = getCheckedValues("select-faculty");
          const select_special_tracks = getCheckedValues("select-tracks");

          const cardTitle = programCard.querySelector(".text-title, h5, h4");

          const click_text = cardTitle
            ? Utils.getText(cardTitle)
                .replace(/[\r\n\s]+/g, " ")
                .trim()
            : Utils.getText(programCard)
                .replace(/[\r\n\s]+/g, " ")
                .trim();

          const pill_level = Utils.getText(
            programCard
              ?.closest(".detail-program")
              ?.querySelector(".nav-pills .nav-link.active"),
          );

          const level = select_level
            ? select_level
            : pill_level
              ? pill_level
              : "";

          const banner_section = programCard
            ?.closest("main")
            ?.querySelector(".banner-sec");

          const banner_faculty = Utils.getText(
            banner_section?.querySelector("h1.banner-title"),
          );

          const faculty = select_faculty
            ? select_faculty
            : Utils.matchesKeyword(banner_faculty, ["faculty of"])
              ? banner_faculty
              : "";

          Utils.push({
            event: "card_click",
            select_level: level,
            select_faculty: faculty,
            select_special_tracks: select_special_tracks,
            click_text: click_text,
          });
        }

        const roomCard = Utils.getClosest(
          e.target,
          TrackingConfig.specialized.roomCard.selector,
        );
        if (roomCard) {
          const ctx = Utils.getContext(roomCard, {
            getHeader: true,
            headerSelector: "h2.sub-title-lg",
          });

          const roomName = Utils.getText(roomCard.querySelector("h5"));

          ctx.room_name = roomName;

          const facultyText = Utils.getText(
            roomCard.querySelector(".faculty-para"),
          );

          const hasOccupancy = Utils.matchesKeyword(facultyText, ["Occupancy"]);

          ctx.occupancy = hasOccupancy
            ? facultyText.replace("Occupancy ", "")
            : "";

          const additionalDetails = Utils.getText(
            roomCard.querySelector(".faculty-para:nth-child(2)"),
          );

          ctx.room_type = Utils.matchesKeyword(additionalDetails, ["Non"])
            ? "Non - AC"
            : "AC";

          ctx.gender = Utils.matchesKeyword(additionalDetails, ["M"])
            ? "M"
            : "F";

          Utils.push({
            event: "room_click",
            click_header: ctx.header,
            click_text: ctx.room_name,
            select_gender: ctx.gender,
            select_occupancy: ctx.occupancy,
            select_room_type: ctx.room_type,
          });
        }
      },
      true,
    );

    /**
     * Handles form submission tracking
     */
    document.addEventListener("wpcf7mailsent", function (e) {
      if (event.detail.contactFormId === 173) {
        const eventDetails = {
          event: "know_more_form_submit",
          click_header: "Want to know more?",
          click_text: "Request Callback",
        };
        Utils.push(eventDetails);
      }
      if (event.detail.contactFormId === 25536) {
        const form = event.target;
        const enquiryTypeSelect = form.querySelector(
          'select[name="enquiry_type"]',
        );
        const enquiryTypeValue = enquiryTypeSelect
          ? enquiryTypeSelect.value
          : "";

        const eventDetails = {
          event: "contact_form_success",
          click_header: "Contact Form",
          click_text: "Submit",
          click_category: enquiryTypeValue,
        };
        Utils.push(eventDetails);
      }
    });

    document.addEventListener("submit", function (e) {
      const form = e.target;

      const searchInput = form.querySelector(
        '.header-seacrh-area [type="search"], .header-seacrh-area input[name*="search"], .header-seacrh-area input[placeholder*="search" i]',
      );
      if (searchInput && searchInput.value.trim()) {
        e.preventDefault();

        Utils.push({
          event: "search",
          click_category: "top navigation",
          search_term: searchInput.value.trim(),
        });

        setTimeout(() => form.submit(), 100);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.target && e.target.id === "blog-search" && e.key === "Enter") {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
          e.preventDefault();
          Utils.push({
            event: "search",
            click_category: "blog",
            search_term: searchTerm,
          });
        }
      }
    });

    if (typeof wpEnv !== "undefined" && wpEnv.type !== "production") {
      console.log(
        "✅ GTM Data Layer Tracking initialized for Parul University",
      );
      console.log(
        "📋 Tracking:",
        TrackingConfig.clicks.length + TrackingConfig.buttons.length,
        "event types",
      );
    }
  });
})();
