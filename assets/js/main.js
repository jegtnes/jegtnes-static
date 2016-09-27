import FontFaceObserver from 'fontfaceobserver';

const rootElement = document.documentElement;
const headline    = new FontFaceObserver('TitilliumWeb');

// This slightly weird , () => {}); at the end just swallows timeout errors on slow networks
headline.load().then(() => rootElement.classList.add('js-headline-loaded'), () => {});

document.addEventListener('DOMContentLoaded', () => {

  // lazy load syntax highlighting if code is in the DOM
  // this approach saves a download if there's no code
  // and saves Prism having to do a DOM traversal, as we've already done it

  const syntaxHighlightBlocks = document.querySelectorAll('[data-syntaxhighlight]');

  if (syntaxHighlightBlocks) {
    loadjs('/assets/js/syntax.js', () => {
      for (var block of syntaxHighlightBlocks) Prism.highlightElement(block);
    });
  }

  const disqusThread = document.getElementById('disqus_thread');

  if (disqusThread) {
    const loadCommentsButton = document.createElement('button');
    loadCommentsButton.classList.add(...['ba','br4','bw1','link','dib','jegtnes-black','ph3','pv2']);
    loadCommentsButton.textContent = 'Load comments';
    disqusThread.insertBefore(loadCommentsButton, null);
  }
});
