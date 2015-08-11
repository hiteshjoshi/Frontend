$('.special.cards .image').dimmer({
  on: 'hover'
})

var m = require("mithril");

function layout() {  
  return m("div", {class:"container"}, [
          m("div", {id:"header"}, "This is the header"), 
          m("main", {id:"content"}, "This is the content"), 
          m("footer", {id:"footer"}, "This is the footer")
         ]);
}

m.render(document.body, layout()); 