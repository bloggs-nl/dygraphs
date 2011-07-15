// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview Regression test based on some strange customBars data.
 * @author danvk@google.com (Dan Vanderkam)
 */
var CssTestCase = TestCase("css");

CssTestCase.data = "X,Y,Z\n1,2,3\n4,5,6\n";

CssTestCase.prototype.setUp = function() {
  document.body.innerHTML = "<div id='graph'></div>";
  this.styleSheet = document.createElement("style");
  this.styleSheet.type = "text/css";
  document.getElementsByTagName("head")[0].appendChild(this.styleSheet);
};

CssTestCase.prototype.tearDown = function() {
};

// Verifies that an unstyled, unsized dygraph gets a default size.
CssTestCase.prototype.testDefaultSize = function() {
  var opts = {
  };
  var graph = document.getElementById("graph");
  var g = new Dygraph(graph, CssTestCase.data, opts);

  assertEquals(480, graph.offsetWidth);
  assertEquals(320, graph.offsetHeight);
  assertEquals({width: 480, height: 320}, g.size());
};

// Verifies that the width/height parameters work.
CssTestCase.prototype.testExplicitParamSize = function() {
  var opts = {
    width: 640,
    height: 480
  };
  var graph = document.getElementById("graph");
  var g = new Dygraph(graph, CssTestCase.data, opts);

  assertEquals(640, graph.offsetWidth);
  assertEquals(480, graph.offsetHeight);
  assertEquals({width: 640, height: 480}, g.size());
};

// Verifies that setting a style on the div works.
CssTestCase.prototype.testExplicitStyleSize = function() {
  var opts = {
  };
  var graph = document.getElementById("graph");
  graph.style.width = '600px';
  graph.style.height = '400px';

  var g = new Dygraph(graph, CssTestCase.data, opts);
  assertEquals(600, graph.offsetWidth);
  assertEquals(400, graph.offsetHeight);
  assertEquals({width: 600, height: 400}, g.size());
};

// Verifies that CSS pixel styles on the div trump explicit parameters.
CssTestCase.prototype.testPixelStyleWins = function() {
  var opts = {
    width: 987,
    height: 654
  };
  var graph = document.getElementById("graph");
  graph.style.width = '600px';
  graph.style.height = '400px';

  var g = new Dygraph(graph, CssTestCase.data, opts);
  assertEquals(600, graph.offsetWidth);
  assertEquals(400, graph.offsetHeight);
  assertEquals({width: 600, height: 400}, g.size());
};

// Verifies that a CSS percentage size works.
CssTestCase.prototype.testPercentageSize = function() {
  document.body.innerHTML =
      '<div style="width: 600px; height: 400px;">' +
      '<div id="graph"></div></div>';
  var opts = {
  };
  var graph = document.getElementById("graph");
  graph.style.width = '50%';
  graph.style.height = '50%';

  var g = new Dygraph(graph, CssTestCase.data, opts);
  assertEquals(300, graph.offsetWidth);
  assertEquals(200, graph.offsetHeight);
  assertEquals({width: 300, height: 200}, g.size());
};

// Verifies that a CSS class size works.
CssTestCase.prototype.testClassPixelSize = function() {
  this.styleSheet.innerHTML = '.chart { width: 456px; height: 345px; }';

  var opts = {
  };
  var graph = document.getElementById("graph");
  graph.className = "chart";
  var g = new Dygraph(graph, CssTestCase.data, opts);
  assertEquals(456, graph.offsetWidth);
  assertEquals(345, graph.offsetHeight);
  assertEquals({width: 456, height: 345}, g.size());
};

// Verifies that a div resize gets picked up.
CssTestCase.prototype.testDivResize = function() {
  var opts = {
  };
  var graph = document.getElementById("graph");
  graph.style.width = '640px';
  graph.style.height = '480px';
  var g = new Dygraph(graph, CssTestCase.data, opts);

  assertEquals(640, graph.offsetWidth);
  assertEquals(480, graph.offsetHeight);
  assertEquals({width: 640, height: 480}, g.size());

  graph.style.width = '650px';
  graph.style.height = '490px';
  assertEquals(650, graph.offsetWidth);
  assertEquals(490, graph.offsetHeight);
  assertEquals({width: 650, height: 490}, g.size());
};
