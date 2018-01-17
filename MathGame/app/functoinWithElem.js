export default class Elem {

    show(selector) {
      document.querySelector(selector).style.display = "block";   
    }

    hide(selector) {
      document.querySelector(selector).style.display = "none";   
    }
  }