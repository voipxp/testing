(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"./src/components/ui/ui-loading-modal.js":function(e,o,n){"use strict";(function(e){n.d(o,"a",function(){return u});var a,d=n("./node_modules/react/index.js"),t=n.n(d),i=n("./node_modules/rbx/index.js"),r=n("./src/components/ui/ui-loading.js");(a="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var l,s,u=function(e){var o=e.isOpen;return void 0!==o&&o?t.a.createElement("div",{className:"modal is-active"},t.a.createElement(i.m.Background,null),t.a.createElement(i.m.Content,null,t.a.createElement(r.a,null))):null};"undefined"!==typeof u&&u&&u===Object(u)&&Object.isExtensible(u)&&Object.defineProperty(u,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"UiLoadingModal",filename:"src/components/ui/ui-loading-modal.js"}}),(l="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&l.register(u,"UiLoadingModal","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading-modal.js"),(s="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&s(e)}).call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))},"./src/components/ui/ui-loading-modal.mdx":function(e,o,n){"use strict";n.r(o),function(e){n.d(o,"default",function(){return b});var a,d=n("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),t=(n("./node_modules/react/index.js"),n("./node_modules/@mdx-js/react/dist/index.es.js")),i=n("./node_modules/docz/dist/index.esm.js"),r=n("./node_modules/docz-iframe-playground/dist/IFramePlayground.min.js"),l=n("./src/components/ui/ui-loading-modal.js");(a="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var s,u,c=function(e){return function(o){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(t.b)("div",o)}},m={},p="wrapper";function b(e){var o=e.components,n=Object(d.a)(e,["components"]);return Object(t.b)(p,Object.assign({},m,n,{components:o,mdxType:"MDXLayout"}),Object(t.b)("h1",{id:"uiloadingmodal"},"UiLoadingModal"),Object(t.b)("p",null,"UiLoadingModal shows a full-screen modal overlay with a spinner. Pass in the ",Object(t.b)("strong",{parentName:"p"},"isOpen")," prop to control visibility on the screen."),Object(t.b)("h2",{id:"example"},"Example"),Object(t.b)(i.c,{__position:0,__code:"<IFramePlayground minHeight={400} maxHeight={800}>\n  <UiLoadingModal isOpen={true} />\n</IFramePlayground>",__scope:{props:this?this.props:n,Props:i.d,Playground:i.c,IFramePlayground:r.a,UiLoadingModal:l.a},mdxType:"Playground"},Object(t.b)(r.a,{minHeight:400,maxHeight:800,mdxType:"IFramePlayground"},Object(t.b)(l.a,{isOpen:!0,mdxType:"UiLoadingModal"}))),Object(t.b)("h2",{id:"props"},"Props"),Object(t.b)(i.d,{of:l.a,mdxType:"Props"}))}b&&b===Object(b)&&Object.isExtensible(b)&&Object.defineProperty(b,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/components/ui/ui-loading-modal.mdx"}}),b.isMDXComponent=!0,(s="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(s.register(c,"makeShortcode","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading-modal.mdx"),s.register(m,"layoutProps","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading-modal.mdx"),s.register(p,"MDXLayout","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading-modal.mdx"),s.register(b,"MDXContent","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading-modal.mdx")),(u="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&u(e)}.call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))},"./src/components/ui/ui-loading.js":function(e,o,n){"use strict";(function(e){n.d(o,"a",function(){return m});var a,d=n("./node_modules/react/index.js"),t=n.n(d),i=n("./node_modules/styled-components/dist/styled-components.browser.esm.js");(a="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e);"undefined"!==typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var r,l,s=Object(i.e)(["0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}"]),u=i.d.div.withConfig({displayName:"ui-loading__StyledLoading",componentId:"nqyv6o-0"})(["border:16px solid #f3f3f3;border-top:16px solid #3498db;border-radius:50%;width:120px;height:120px;animation:"," 1s linear infinite;margin:10px auto;"],s),c=i.d.div.withConfig({displayName:"ui-loading__Wrapper",componentId:"nqyv6o-1"})(["width:100%;text-align:center;overflow:hidden;"]),m=function(){return t.a.createElement(c,null,t.a.createElement(u,null))};"undefined"!==typeof m&&m&&m===Object(m)&&Object.isExtensible(m)&&Object.defineProperty(m,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"UiLoading",filename:"src/components/ui/ui-loading.js"}}),(r="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(r.register(s,"spin","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading.js"),r.register(u,"StyledLoading","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading.js"),r.register(c,"Wrapper","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading.js"),r.register(m,"UiLoading","/Users/dusty/Code/parkbench/odin-web/src/components/ui/ui-loading.js")),(l="undefined"!==typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&l(e)}).call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))}}]);
//# sourceMappingURL=components-ui-ui-loading-modal.3a6284ca8ac562f46d2e.js.map