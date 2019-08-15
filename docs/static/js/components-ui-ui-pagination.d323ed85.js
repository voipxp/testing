(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"./src/components/ui/ui-pagination.js":function(e,n,t){"use strict";(function(e){t.d(n,"a",function(){return p});var o,a=t("./node_modules/react/index.js"),i=t.n(a),s=t("./node_modules/rbx/index.js"),r=t("./node_modules/@fortawesome/react-fontawesome/index.es.js"),c=t("./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");(o="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var d,l,p=function(e){var n=e.align,t=void 0===n?"left":n,o=e.pages,a=void 0===o?1:o,d=e.page,l=void 0===d?1:d,p=e.onFirst,u=e.onPrevious,b=e.onNext,m=e.onLast;return a<2?null:i.a.createElement(s.b.Group,{hasAddons:!0,align:t,style:{marginTop:"1rem"}},i.a.createElement(s.b,{size:"small",onClick:p,disabled:1===l},i.a.createElement(s.i,{size:"small"},i.a.createElement(r.a,{icon:c.a}))),i.a.createElement(s.b,{size:"small",onClick:u,disabled:1===l},i.a.createElement(s.i,{size:"small"},i.a.createElement(r.a,{icon:c.c}))),i.a.createElement(s.b,{size:"small",static:!0},l,"/",a),i.a.createElement(s.b,{size:"small",onClick:b,disabled:l===a},i.a.createElement(s.i,{size:"small"},i.a.createElement(r.a,{icon:c.d}))),i.a.createElement(s.b,{size:"small",onClick:m,disabled:l===a},i.a.createElement(s.i,{size:"small"},i.a.createElement(r.a,{icon:c.b}))))};"undefined"!==typeof p&&p&&p===Object(p)&&Object.isExtensible(p)&&Object.defineProperty(p,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"UiPagination",filename:"src/components/ui/ui-pagination.js"}}),(d="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&d.register(p,"UiPagination","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.js"),(l="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&l(e)}).call(this,t("./node_modules/webpack/buildin/harmony-module.js")(e))},"./src/components/ui/ui-pagination.mdx":function(e,n,t){"use strict";t.r(n),function(e){t.d(n,"default",function(){return x});var o,a=t("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),i=t("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),s=t("./node_modules/react/index.js"),r=t.n(s),c=t("./node_modules/@mdx-js/react/dist/index.es.js"),d=t("./node_modules/docz/dist/index.esm.js"),l=t("./src/components/ui/ui-pagination.js");(o="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);var p,u,b="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},m=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(c.b)("div",n)}},g=m("UiPaginationExample"),f={},j="wrapper";function x(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(c.b)(j,Object.assign({},f,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"uipagination"},"UiPagination"),Object(c.b)("p",null,"Renders pagination buttons."),Object(c.b)("p",null,"Pass in the number of ",Object(c.b)("strong",{parentName:"p"},"pages")," and the current ",Object(c.b)("strong",{parentName:"p"},"page")," as props. Use the callback functions (",Object(c.b)("strong",{parentName:"p"},"onFirst"),", ",Object(c.b)("strong",{parentName:"p"},"onNext"),", ...) to change the state of the parent component when a pagination button is clicked."),Object(c.b)("p",null,"You may set the ",Object(c.b)("strong",{parentName:"p"},"align")," prop to control the positioning on the viewport."),Object(c.b)("h2",{id:"example"},"Example"),Object(c.b)(d.c,{__position:0,__code:'() => {\n  const UiPaginationExample = () => {\n    const pages = 8\n    const [page, setPage] = React.useState(1)\n    const onFirst = () => setPage(1)\n    const onNext = () => setPage(page === pages ? pages : page + 1)\n    const onPrevious = () => setPage(page === 1 ? 1 : page - 1)\n    const onLast = () => setPage(pages)\n    return (\n      <>\n        <UiPagination\n          align="left"\n          pages={pages}\n          page={page}\n          onFirst={onFirst}\n          onNext={onNext}\n          onPrevious={onPrevious}\n          onLast={onLast}\n        />\n        <UiPagination\n          align="centered"\n          pages={pages}\n          page={page}\n          onFirst={onFirst}\n          onNext={onNext}\n          onPrevious={onPrevious}\n          onLast={onLast}\n        />\n        <UiPagination\n          align="right"\n          pages={pages}\n          page={page}\n          onFirst={onFirst}\n          onNext={onNext}\n          onPrevious={onPrevious}\n          onLast={onLast}\n        />\n      </>\n    )\n  }\n  return <UiPaginationExample />\n}',__scope:{props:this?this.props:t,Playground:d.c,Props:d.d,UiPagination:l.a},mdxType:"Playground"},function(){var e=function(){var e=r.a.useState(1),n=Object(a.a)(e,2),t=n[0],o=n[1],i=function(){return o(1)},s=function(){return o(8===t?8:t+1)},d=function(){return o(1===t?1:t-1)},p=function(){return o(8)};return Object(c.b)(r.a.Fragment,null,Object(c.b)(l.a,{align:"left",pages:8,page:t,onFirst:i,onNext:s,onPrevious:d,onLast:p,mdxType:"UiPagination"}),Object(c.b)(l.a,{align:"centered",pages:8,page:t,onFirst:i,onNext:s,onPrevious:d,onLast:p,mdxType:"UiPagination"}),Object(c.b)(l.a,{align:"right",pages:8,page:t,onFirst:i,onNext:s,onPrevious:d,onLast:p,mdxType:"UiPagination"}))};return b(e,"useState{[page, setPage](1)}"),Object(c.b)(e,{mdxType:"UiPaginationExample"})}),Object(c.b)("h2",{id:"props"},"Props"),Object(c.b)(d.d,{of:l.a,mdxType:"Props"}))}x&&x===Object(x)&&Object.isExtensible(x)&&Object.defineProperty(x,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/components/ui/ui-pagination.mdx"}}),x.isMDXComponent=!0,(p="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(p.register(m,"makeShortcode","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),p.register(g,"UiPaginationExample","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),p.register(f,"layoutProps","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),p.register(j,"MDXLayout","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx"),p.register(x,"MDXContent","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-pagination.mdx")),(u="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&u(e)}.call(this,t("./node_modules/webpack/buildin/harmony-module.js")(e))}}]);
//# sourceMappingURL=components-ui-ui-pagination.ffb27b83851fc969734d.js.map