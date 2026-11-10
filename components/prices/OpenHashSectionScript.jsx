// Runs while the page is parsed, right after the accordions, so a link such as
// /preturi#implantologie lands on a category that is already open. Opening it
// after React hydrates would push everything below it down (layout shift).
const SCRIPT = `(function(){try{var id=decodeURIComponent(location.hash.slice(1));var el=id&&document.getElementById(id);if(el&&el.tagName==='DETAILS'){el.open=true;}}catch(e){}})();`;

const OpenHashSectionScript = () => <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;

export default OpenHashSectionScript;
