// Стиль режим работы и стили оформления
import "../../node_modules/codemirror/mode/markdown/markdown.js";
import "../../node_modules/codemirror/theme/moxer.css";
import "../../node_modules/codemirror/lib/codemirror.css";
import "../../node_modules/codemirror/lib/codemirror";

// Дополнительные стили прокрутки
import "../../node_modules/codemirror/addon/scroll/simplescrollbars.js";
import "../../node_modules/codemirror/addon/scroll/simplescrollbars.css";

// Добавление текста, который показывается, если поле пустое
import "../../node_modules/codemirror/addon/display/placeholder.js";

// Автоматическое закрытие скобок
import "../../node_modules/codemirror/addon/edit/closebrackets.js";

// Нахождение парной скобки
import "../../node_modules/codemirror/addon/edit/matchbrackets.js";

// Поиск
import "../../node_modules/codemirror/addon/search/search.js";
import "../../node_modules/codemirror/addon/search/searchcursor.js";

import "../../node_modules/codemirror/addon/dialog/dialog.js";
import "../../node_modules/codemirror/addon/dialog/dialog.css";

import "../../node_modules/codemirror/addon/edit/continuelist";
import "../../node_modules/codemirror/addon/edit/indentlist";

let cmOptions = {
  scrollbarStyle: "overlay",
  tabSize: 4,
  mode: "text/x-markdown",
  theme: "moxer",
  lineNumbers: true,
  line: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  indentUnit: 4,
  extraKeys: {
    Enter: "newlineAndIndentContinueMarkdownList",
    Tab: "autoIndentMarkdownList",
    "Shift-Tab": "autoUnindentMarkdownList"
  }
};

export { cmOptions };
