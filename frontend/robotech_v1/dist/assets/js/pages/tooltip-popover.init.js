/**
 * Theme: Robotech - Tailwind Admin Dashboard Template
 * Author: Mannatthemes
 * Tooltip Popover Js
 */


tippy('.tippy-btn', {
    // content: 'Global content',
    // allowHTML: true,
    arrow: true,
    animation: 'fade',
    // interactive: true,
});

function openPopover(event,popoverID){
let element = event.target;
while(element.nodeName !== "BUTTON"){
    element = element.parentNode;
}
var popper = Popper.createPopper(element, document.getElementById(popoverID), {
    placement: 'top'
});
document.getElementById(popoverID).classList.toggle("hidden");
}