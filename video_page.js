// P5 Code Runner
function P5codeRunner(e) {
  this.editor = e;
}
P5codeRunner.prototype.stop = function() {
  this.shutDown();
  $("#p5display").hide();
  $("#but_run").show();
  $("#but_stop").hide();
}
P5codeRunner.prototype.run = function() {
  this.shutDown();
  $("#p5container").append("<canvas id=\"p5canvas\"></canvas>");
  $("#p5display").show();
  $("#but_run").hide();
  $("#but_stop").show();
  this.engine = new Processing($("#p5canvas")[0], this.editor.getValue());
  this.center();
}
P5codeRunner.prototype.shutDown = function() {
  if (this.engine) {
    this.engine.noLoop();
    this.engine.exit();
    delete this.engine;
  }
  $("#p5container").empty();
}
P5codeRunner.prototype.center = function() {
  var disp = $("#p5display");
  var W = $(window);
  disp.css("left",
    W.width() / 2 - disp.width() / 2).css("top",
    W.scrollTop() + W.height() / 2 - disp.height() / 2);
}

// Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/crimson_editor");
editor.getSession().setMode("ace/mode/java");
editor.setShowPrintMargin(false);
editor.getSession().setTabSize(2);
editor.commands.addCommand({
    name: 'runProgram',
    bindKey: {win: 'Ctrl-R',  mac: 'Command-R'},
    exec: function(editor) {
        P5.run();
    },
    readOnly: true
});

// Create instance
var P5 = new P5codeRunner(editor);

// Initial events setup
$(function() {
  $(window).resize(function() { P5.center(); });
  $("#but_run").click(function() { P5.run(); });
  $("#but_stop").click(function() { P5.stop(); }).hide();
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { P5.stop(); }
  });
  $(document).keydown(function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 82) { P5.run(); e.preventDefault();}
  });

  $('#videosummary').linkify({
    target: "_blank"
  });

  // --- Find previous and next episodes from index.html ---

  // current filename
  var currentHtml = document.location.href.match(/[^\/]+$/)[0];
  // load index
  $.get('index.html', function(data) {
    var indexLinks = $("#links a", data);
    var prevLink, currLink, nextLink, linkFound = false;
    for(var indexLink in indexLinks) {
      if(indexLinks[indexLink]) {
        currLink = indexLinks[indexLink];
        if(currLink.href) {
          if(linkFound) {
            nextLink = currLink;
            break;
          }
          if(currLink.href.indexOf(currentHtml) != -1) {
            linkFound = true;
          }
          if(!linkFound) {
            prevLink = currLink;
          }
        }
      }
    }
    var prevNextLinks = [];
    if(prevLink) {
      prevNextLinks.push('<a href="' + prevLink.href +
        '" title="' + prevLink.text + '">previous</a>');
    }
    if(nextLink) {
      prevNextLinks.push('<a href="' + nextLink.href +
        '" title="' + nextLink.text + '">next episode</a>');
    }
    $("#prev_next_links").html(prevNextLinks.join(" | "));

  }, "html");
});
