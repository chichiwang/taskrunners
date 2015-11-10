/** Globals
 */
var gruntfile = document.querySelector('.codeblock01').querySelector('code');
var gulpfile = document.querySelector('.codeblock03').querySelector('code');
var currFile = undefined;
var offset = {
  curr: 0,
  max: 0,
  increment: 0
};

/** Keypress Handlers
 */
function nextPressed() {
  // console.log('nextPressed');
  if (offset.curr == offset.max) {
    unbindKeyPress();
    bindRevealSlide();
    Reveal.next();
  }
  else {
    var newPos = offset.curr + offset.increment;
    if (newPos > offset.max) newPos = offset.max;
    if (newPos != offset.curr) scrollCurrFile(newPos);
    offset.curr = newPos;
    // console.log(offset);
  }
}

function prevPressed() {
  // console.log('prevPressed');
  if (offset.curr == 0) {
    unbindKeyPress();
    bindRevealSlide();
    Reveal.prev();
  }
  else {
    var newPos = offset.curr - offset.increment;
    if (newPos < 0) newPos = 0;
    if (newPos != offset.curr) scrollCurrFile(newPos);
    offset.curr = newPos;
    // console.log(offset);
  }
}

function keyPressed(e) {
  if (e.keyCode == 39) nextPressed();
  if (e.keyCode == 37) prevPressed();
}

/** Slidechange Handler
 */
Reveal.addEventListener('slidechanged', function(e) {
  changeCurrFile(e.indexh);
  if (currFile) {
    bindKeyPress();
    bindRevealScroll();
  }
});

/** Scroll/Bind Functions
 */

function bindKeyPress() {
  setTimeout(function() {
    window.addEventListener('keyup', keyPressed);
  }, 200);
}

function unbindKeyPress() {
  window.removeEventListener('keyup', keyPressed);
}

function bindRevealScroll() {
  Reveal.configure({
    keyboard: {
      39: null,
      37: null
    }
  });
}

function bindRevealSlide() {
  Reveal.configure({
    keyboard: {
      39: 'right',
      37: 'prev'
    }
  });
}

function changeCurrFile(idx) {
  if (idx == 6) {
    currFile = gruntfile;
  }
  else if (idx == 14) {
    currFile = gulpfile;
  }
  else {
    currFile = undefined;
    offset.curr = offset.max = offset.increment = 0;
  }

  if (currFile) {
    currFile.offsetTop = offset.curr = 0;

    currFile.style.maxHeight = 'none';
    offset.max = currFile.getBoundingClientRect().height;

    currFile.style.maxHeight = '';
    offset.increment = currFile.getBoundingClientRect().height;

    // console.log(offset);
  }
}

function scrollCurrFile(offset) {
  scrollTo(currFile, offset, 300);
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}