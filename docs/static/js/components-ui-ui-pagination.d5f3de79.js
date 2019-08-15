(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"./src/components/ui/ui-pagination.js":function(e,o,n){"use strict";(function(e){n.d(o,"a",function(){return u});var t,i=n("./node_modules/react/index.js"),a=n.n(i),s=n("./node_modules/rbx/index.js"),l=n("./node_modules/@fortawesome/react-fontawesome/index.es.js"),c=n("./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");(t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&t(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var r,d,u=function(e){var o=e.align,n=void 0===o?"left":o,t=e.pages,i=void 0===t?1:t,r=e.page,d=void 0===r?1:r,u=e.onFirst,p=e.onPrevious,b=e.onNext,g=e.onLast;return i<2?null:a.a.createElement(s.b.Group,{hasAddons:!0,align:n,style:{marginTop:"1rem"}},a.a.createElement(s.b,{size:"small",onClick:u,disabled:1===d},a.a.createElement(s.i,{size:"small"},a.a.createElement(l.a,{icon:c.a}))),a.a.createElement(s.b,{size:"small",onClick:p,disabled:1===d},a.a.createElement(s.i,{size:"small"},a.a.createElement(l.a,{icon:c.c}))),a.a.createElement(s.b,{size:"small",static:!0},d,"/",i),a.a.createElement(s.b,{size:"small",onClick:b,disabled:d===i},a.a.createElement(s.i,{size:"small"},a.a.createElement(l.a,{icon:c.d}))),a.a.createElement(s.b,{size:"small",onClick:g,disabled:d===i},a.a.createElement(s.i,{size:"small"},a.a.createElement(l.a,{icon:c.b}))))};"undefined"!==typeof u&&u&&u===Object(u)&&Object.isExtensible(u)&&Object.defineProperty(u,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"UiPagination",filename:"src/components/ui/ui-pagination.js"}}),(r="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&r.register(u,"UiPagination","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.js"),(d="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&d(e)}).call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))},"./src/components/ui/ui-pagination.mdx":function(e,o,n){"use strict";n.r(o),function(e){n.d(o,"default",function(){return b});var t,i=n("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),a=(n("./node_modules/react/index.js"),n("./node_modules/@mdx-js/react/dist/index.es.js")),s=n("./node_modules/docz/dist/index.esm.js"),l=n("./src/components/ui/ui-pagination.js");(t="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&t(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var c,r,d=function(e){return function(o){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(a.b)("div",o)}},u={},p="wrapper";function b(e){var o=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)(p,Object.assign({},u,n,{components:o,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"uipagination"},"UiPagination"),Object(a.b)("p",null,"Renders pagination buttons."),Object(a.b)("p",null,"Pass in the number of ",Object(a.b)("strong",{parentName:"p"},"pages")," and the current ",Object(a.b)("strong",{parentName:"p"},"page")," as props. Use the callback functions (",Object(a.b)("strong",{parentName:"p"},"onFirst"),", ",Object(a.b)("strong",{parentName:"p"},"onNext"),", ...) to change the state of the parent component when a pagination button is clicked."),Object(a.b)("p",null,"You may set the ",Object(a.b)("strong",{parentName:"p"},"align")," prop to control the positioning on the viewport."),Object(a.b)("h2",{id:"example"},"Example"),Object(a.b)(s.c,{__position:0,__code:"<UiPagination\n  align=\"left\"\n  pages={8}\n  page={1}\n  onFirst={() => console.log('first clicked')}\n  onNext={() => console.log('next clicked')}\n  onPrevious={() => console.log('previous clicked')}\n  onLast={() => console.log('last clicked')}\n/>\n<UiPagination\n  align=\"centered\"\n  pages={8}\n  page={4}\n  onFirst={() => console.log('first clicked')}\n  onNext={() => console.log('next clicked')}\n  onPrevious={() => console.log('previous clicked')}\n  onLast={() => console.log('last clicked')}\n/>\n<UiPagination\n  align=\"right\"\n  pages={8}\n  page={8}\n  onFirst={() => console.log('first clicked')}\n  onNext={() => console.log('next clicked')}\n  onPrevious={() => console.log('previous clicked')}\n  onLast={() => console.log('last clicked')}\n/>",__scope:{props:this?this.props:n,Playground:s.c,Props:s.d,UiPagination:l.a},mdxType:"Playground"},Object(a.b)(l.a,{align:"left",pages:8,page:1,onFirst:function(){return console.log("first clicked")},onNext:function(){return console.log("next clicked")},onPrevious:function(){return console.log("previous clicked")},onLast:function(){return console.log("last clicked")},mdxType:"UiPagination"}),Object(a.b)(l.a,{align:"centered",pages:8,page:4,onFirst:function(){return console.log("first clicked")},onNext:function(){return console.log("next clicked")},onPrevious:function(){return console.log("previous clicked")},onLast:function(){return console.log("last clicked")},mdxType:"UiPagination"}),Object(a.b)(l.a,{align:"right",pages:8,page:8,onFirst:function(){return console.log("first clicked")},onNext:function(){return console.log("next clicked")},onPrevious:function(){return console.log("previous clicked")},onLast:function(){return console.log("last clicked")},mdxType:"UiPagination"})),Object(a.b)("h2",{id:"props"},"Props"),Object(a.b)(s.d,{of:l.a,mdxType:"Props"}))}b&&b===Object(b)&&Object.isExtensible(b)&&Object.defineProperty(b,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/components/ui/ui-pagination.mdx"}}),b.isMDXComponent=!0,(c="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(c.register(d,"makeShortcode","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),c.register(u,"layoutProps","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),c.register(p,"MDXLayout","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),c.register(b,"MDXContent","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx")),(r="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)}.call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))}}]);
//# sourceMappingURL=components-ui-ui-pagination.750305dd2fd59098a0de.js.map