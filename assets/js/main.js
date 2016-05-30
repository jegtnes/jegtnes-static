import FontFaceObserver from 'fontfaceobserver';

const rootElement = document.documentElement;

const headline       = new FontFaceObserver('Alegreya');
const bodyCopySans   = new FontFaceObserver('Alegreya Sans');
const bodySansBold   = new FontFaceObserver('Alegreya Sans Bold');
const bodySansItalic = new FontFaceObserver('Alegreya Sans Italic');

// This slightly weird , () => {}); at the end just swallows timeout errors on slow networks
bodyCopySans.load().then(()   => rootElement.classList.add('body-copy-loaded'), () => {});
headline.load().then(()       => rootElement.classList.add('headline-loaded'), () => {});
bodySansBold.load().then(()   => rootElement.classList.add('body-bold-loaded'), () => {});
bodySansItalic.load().then(() => rootElement.classList.add('body-italic-loaded'), () => {});

document.addEventListener('DOMContentLoaded', () => {
  const syntaxHighlightBlocks = document.querySelectorAll('[data-syntaxhighlight]');

  // lazy load syntax highlighting if required
  // this approach saves both bytes and DOM traversal, as Prism doesn't
  // need to re-scan the entire DOM.
  if (syntaxHighlightBlocks) {
    loadjs('/assets/js/syntax.js', () => {
      for (var block of syntaxHighlightBlocks) Prism.highlightElement(block);
    });
  }
});
