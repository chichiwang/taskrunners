Reveal.initialize({
  controls: false,
  history: true,
  width: 1280,
  height: 720,
  transition: "convex"
});

Reveal.configure({
  keyboard: {
    39: 'next',
    37: 'prev'
  }
});

require('javascripts/code-scroll');
require('javascripts/line-numbers');
hljs.initHighlighting();