// http://codepen.io/Merri/pen/Dsuim
/**
 * TextOverflowClamp.js
 *
 * Updated 2013-05-09 to remove jQuery dependancy.
 * But be careful with webfonts!
 */

// nieve document polyfill
var document = require('global/document');


// the actual meat is here
module.exports = (function (d) {
  var measure, text, lineWidth,
    lineStart, lineCount, wordStart,
    line, lineText, wasNewLine,
    ce = d.createElement.bind(d),
    ctn = d.createTextNode.bind(d);

  // measurement element is made a child of the clamped element to get it's style
  measure = ce('span');

  (function (s) {
    s.position = 'absolute'; // prevent page reflow
    s.whiteSpace = 'pre'; // cross-browser width results
    s.visibility = 'hidden'; // prevent drawing
  })(measure.style);

  return function clamp(el, lineClamp, options) {
    // make sure the element belongs to the document
    if (!el || !el.ownerDocument || !el.ownerDocument === d) {
      return;
    }

    options = options || {};
    var truncateText = options.truncateText || '';

    // reset to safe starting values
    lineStart = wordStart = 0;
    lineCount = 1;
    wasNewLine = false;
    lineWidth = el.clientWidth;

    // remove truncate span first
    if (el.lineContainer && el.truncSpan) {
      el.lineContainer.removeChild(el.truncSpan);
    }

    // get all the text, remove any line changes
    text = (el.textContent || el.innerText).replace(/\n/g, ' ');

    // remove all content
    while (el.firstChild !== null) {
      el.removeChild(el.firstChild);
    }

    // add measurement element within so it inherits styles
    el.appendChild(measure);

    // http://ejohn.org/blog/search-and-dont-replace/
    text.replace(/ /g, function (m, pos) {
      // ignore any further processing if we have total lines
      if (lineCount === lineClamp) {
        return;
      }

      // create a text node and place it in the measurement element
      measure.appendChild(ctn(text.substr(lineStart, pos - lineStart)));

      // have we exceeded allowed line width?
      if (lineWidth < measure.clientWidth) {
        if (wasNewLine) {
          // we have a long word so it gets a line of it's own
          lineText = text.substr(lineStart, pos + 1 - lineStart);
          // next line start position
          lineStart = pos + 1;
        } else {
          // grab the text until this word
          lineText = text.substr(lineStart, wordStart - lineStart);
          // next line start position
          lineStart = wordStart;
        }

        // create a line element
        line = ce('span');
        // add text to the line element
        line.appendChild(ctn(lineText));
        // add the line element to the container
        el.appendChild(line);
        // yes, we created a new line
        wasNewLine = true;
        lineCount++;
      } else {
        // did not create a new line
        wasNewLine = false;
      }

      // remember last word start position
      wordStart = pos + 1;

      // clear measurement element
      measure.removeChild(measure.firstChild);
    });

    // remove the measurement element from the container
    el.removeChild(measure);

    // create last line container
    var lineContainer = ce('span');

    (function (s) {
      s.display = 'flex';
      s.justifyContent = 'center';
      s.width = '100%';
    })(lineContainer.style);

    // create truncation span element
    var truncSpan = ce('span');
    truncSpan.appendChild(ctn(truncateText));

    (function (s) {
      s.flex = '0 0 auto';
      s.whiteSpace = 'pre';
    })(truncSpan.style);

    // save references
    el.lineContainer = lineContainer;
    el.truncSpan = truncSpan;

    // create the last line element
    line = ce('span');

    // give styles required for text-overflow to kick in
    (function (s) {
      s.display = 'block';
      s.overflow = 'hidden';
      s.textOverflow = 'ellipsis';
      s.whiteSpace = 'nowrap';
    })(line.style);

    // add all remaining text to the line element
    line.appendChild(ctn(text.substr(lineStart)));

    // add remaining text and truncation text to div
    lineContainer.appendChild(line);
    lineContainer.appendChild(truncSpan);

    // add the line element to the container
    el.appendChild(lineContainer);
  };
})(document);
