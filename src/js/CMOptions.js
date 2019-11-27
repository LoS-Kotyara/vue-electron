// Стиль режим работы и стили оформления
import "../../node_modules/codemirror/mode/markdown/markdown.js";
import "../../node_modules/codemirror/theme/moxer.css";
import "../../node_modules/codemirror/lib/codemirror.css";

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

let cmOptions = {
  scrollbarStyle: "overlay",
  tabSize: 2,
  mode: "text/x-markdown",
  theme: "moxer",
  lineNumbers: true,
  line: true,
  lineWrapping: true,
  autoCloseBrackets: true,
  matchBrackets: true
};

export { cmOptions };
