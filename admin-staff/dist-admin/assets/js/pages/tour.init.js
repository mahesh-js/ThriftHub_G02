/**
 * Theme: Robotech - Tailwind Admin Dashboard Template
 * Author: Mannatthemes
 * Tour Js
 */

(function(){

    var tour = {
      id: "welcome_tour",
      steps: [
        {
          title: "FAQ",
          content: "Have you any quetion?",
          target: "#tourFaq",
          placement: "top"
        },
        {
          title: "Exellent Master Plan",
          content: "This is the pricing cards.",
          target: document.querySelector("#Pricing_Card"),
          placement: "top"
        }
      ],
      showPrevButton: true,
      scrollTopMargin: 100
    };
  
    // Start the tour!
    hopscotch.startTour(tour);
  })();