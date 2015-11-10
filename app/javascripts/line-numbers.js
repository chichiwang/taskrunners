Reveal.addEventListener('slidechanged', function(e) {
  var codeblocks = document.querySelectorAll('code.line-numbers');
  for (var i = 0; i < codeblocks.length; i++) {
    var codeblock = codeblocks[i];
    var content = codeblock.innerHTML;
    if (codeblock.className.indexOf('hljs') >= 0 && content.indexOf('class="line-number') < 1) {
      content = content.split("\n");
      content = content.join("\n<span class='line-number'> </span>");
      content = '<span class="line-number"> </span>' + content;
      codeblock.innerHTML = content;
    }
  }
});