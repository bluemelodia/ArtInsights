(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{109:function(n,e){function t(e){return Promise.resolve().then(function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n})}t.keys=function(){return[]},t.resolve=t,(n.exports=t).id=109},132:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1),t(172);var o=function(){function n(n){}return n.prototype.ngOnInit=function(){},n}();e.FollowComponent=o},133:function(n,e,t){"use strict";var o,l;Object.defineProperty(e,"__esModule",{value:!0}),(o=e.media||(e.media={})).DeviantArt="DeviantArt",o.Twitter="Twitter",o.Tumblr="Tumblr",(l=e.userAction||(e.userAction={})).Follow="follow",l.Posts="posts",l.Tags="tag",e.mediaData={DeviantArt:{iconName:"deviantart.png",alt:"deviantArt"},Twitter:{iconName:"twitter.png",alt:"twitter"},Tumblr:{iconName:"tumblr.png",alt:"tumblr"}},e.navActions={Tags:{iconName:"promotion.png",alt:"search by tag"},Follows:{iconName:"follow.png",alt:"view follower information",link:"/following"},Engagement:{iconName:"heart.png",alt:"post engagement"}}},171:function(n,e,t){"use strict";var o=this&&this.__awaiter||function(r,u,a,i){return new(a||(a=Promise))(function(n,e){function t(n){try{l(i.next(n))}catch(n){e(n)}}function o(n){try{l(i.throw(n))}catch(n){e(n)}}function l(e){e.done?n(e.value):new a(function(n){n(e.value)}).then(t,o)}l((i=i.apply(r,u||[])).next())})},l=this&&this.__generator||function(t,o){var l,r,u,n,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return n={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function e(e){return function(n){return function(e){if(l)throw new TypeError("Generator is already executing.");for(;a;)try{if(l=1,r&&(u=2&e[0]?r.return:e[0]?r.throw||((u=r.return)&&u.call(r),0):r.next)&&!(u=u.call(r,e[1])).done)return u;switch(r=0,u&&(e=[2&e[0],u.value]),e[0]){case 0:case 1:u=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,r=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(u=0<(u=a.trys).length&&u[u.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!u||e[1]>u[0]&&e[1]<u[3])){a.label=e[1];break}if(6===e[0]&&a.label<u[1]){a.label=u[1],u=e;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(e);break}u[2]&&a.ops.pop(),a.trys.pop();continue}e=o.call(t,a)}catch(n){e=[6,n],r=0}finally{l=u=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,n])}}};Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function n(){this.title="ArtInsights"}return n.prototype.sendRequest=function(){return o(this,void 0,void 0,function(){return l(this,function(n){switch(n.label){case 0:return console.log("SEND"),[4,fetch("https://www.deviantart.com/oauth2/authorize?response_type=code&client_id=12698&scope=browse%20user&redirect_uri=https://bluemelodia.github.io/ArtInsights&state=de3a2397-1464-4b11-a028-ec25cc2de2e5").then(function(n){console.log("DATA: ",n)}).catch(function(n){console.log("ERROR: ",n)})];case 1:return n.sent(),[2]}})})},n}();e.AppComponent=r},172:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(133),l=t(346),r=t(1),u=function(){function n(){this.tumblrURL=l.urlForSite(o.media.Tumblr,o.userAction.Follow),this.deviantArtURL=l.urlForSite(o.media.DeviantArt,o.userAction.Follow)}return n.ngInjectableDef=r.ɵɵdefineInjectable({factory:function(){return new n},token:n,providedIn:"root"}),n}();e.FollowService=u},173:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1);var o=function(){function n(){}return n.prototype.ngOnInit=function(){},n.prototype.getIconPath=function(){return"./images/"+this.iconName},n}();e.NavItemComponent=o},174:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1);var o=t(133),l=function(){function n(){this.mediaData=o.mediaData,this.navActions=o.navActions}return n.prototype.ngOnInit=function(){},n}();e.NavComponent=l},340:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(1),l=t(63),r=t(341);o.enableProdMode(),l.platformBrowser().bootstrapModuleFactory(r.AppModuleNgFactory)},341:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(1),l=t(342),r=t(171),u=t(343),a=t(344),i=t(347),c=t(5),p=t(63),s=t(72),d=t(132),_=t(353),m=t(354),f=o.ɵcmf(l.AppModule,[r.AppComponent],function(n){return o.ɵmod([o.ɵmpd(512,o.ComponentFactoryResolver,o.ɵCodegenComponentFactoryResolver,[[8,[u.ɵangular_packages_router_router_lNgFactory,a.FollowComponentNgFactory,i.AppComponentNgFactory]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o.ɵmpd(5120,o.LOCALE_ID,o.ɵangular_packages_core_core_p,[[3,o.LOCALE_ID]]),o.ɵmpd(4608,c.NgLocalization,c.NgLocaleLocalization,[o.LOCALE_ID,[2,c.ɵangular_packages_common_common_a]]),o.ɵmpd(5120,o.ɵangular_packages_core_core_ba,o.ɵangular_packages_core_core_r,[o.NgZone]),o.ɵmpd(5120,o.APP_ID,o.ɵangular_packages_core_core_f,[]),o.ɵmpd(5120,o.IterableDiffers,o.ɵangular_packages_core_core_n,[]),o.ɵmpd(5120,o.KeyValueDiffers,o.ɵangular_packages_core_core_o,[]),o.ɵmpd(4608,p.DomSanitizer,p.ɵDomSanitizerImpl,[c.DOCUMENT]),o.ɵmpd(6144,o.Sanitizer,null,[p.DomSanitizer]),o.ɵmpd(4608,p.HAMMER_GESTURE_CONFIG,p.HammerGestureConfig,[]),o.ɵmpd(5120,p.EVENT_MANAGER_PLUGINS,function(n,e,t,o,l,r,u,a){return[new p.ɵDomEventsPlugin(n,e,t),new p.ɵKeyEventsPlugin(o),new p.ɵHammerGesturesPlugin(l,r,u,a)]},[c.DOCUMENT,o.NgZone,o.PLATFORM_ID,c.DOCUMENT,c.DOCUMENT,p.HAMMER_GESTURE_CONFIG,o.ɵConsole,[2,p.HAMMER_LOADER]]),o.ɵmpd(4608,p.EventManager,p.EventManager,[p.EVENT_MANAGER_PLUGINS,o.NgZone]),o.ɵmpd(135680,p.ɵDomSharedStylesHost,p.ɵDomSharedStylesHost,[c.DOCUMENT]),o.ɵmpd(4608,p.ɵDomRendererFactory2,p.ɵDomRendererFactory2,[p.EventManager,p.ɵDomSharedStylesHost,o.APP_ID]),o.ɵmpd(6144,o.RendererFactory2,null,[p.ɵDomRendererFactory2]),o.ɵmpd(6144,p.ɵSharedStylesHost,null,[p.ɵDomSharedStylesHost]),o.ɵmpd(4608,o.Testability,o.Testability,[o.NgZone]),o.ɵmpd(5120,s.ActivatedRoute,s.ɵangular_packages_router_router_g,[s.Router]),o.ɵmpd(4608,s.NoPreloading,s.NoPreloading,[]),o.ɵmpd(6144,s.PreloadingStrategy,null,[s.NoPreloading]),o.ɵmpd(135680,s.RouterPreloader,s.RouterPreloader,[s.Router,o.NgModuleFactoryLoader,o.Compiler,o.Injector,s.PreloadingStrategy]),o.ɵmpd(4608,s.PreloadAllModules,s.PreloadAllModules,[]),o.ɵmpd(5120,s.ɵangular_packages_router_router_o,s.ɵangular_packages_router_router_c,[s.Router,c.ViewportScroller,s.ROUTER_CONFIGURATION]),o.ɵmpd(5120,s.ROUTER_INITIALIZER,s.ɵangular_packages_router_router_j,[s.ɵangular_packages_router_router_h]),o.ɵmpd(5120,o.APP_BOOTSTRAP_LISTENER,function(n){return[n]},[s.ROUTER_INITIALIZER]),o.ɵmpd(1073742336,c.CommonModule,c.CommonModule,[]),o.ɵmpd(1024,o.ErrorHandler,p.ɵangular_packages_platform_browser_platform_browser_a,[]),o.ɵmpd(1024,o.NgProbeToken,function(){return[s.ɵangular_packages_router_router_b()]},[]),o.ɵmpd(512,s.ɵangular_packages_router_router_h,s.ɵangular_packages_router_router_h,[o.Injector]),o.ɵmpd(1024,o.APP_INITIALIZER,function(n,e){return[p.ɵangular_packages_platform_browser_platform_browser_j(n),s.ɵangular_packages_router_router_i(e)]},[[2,o.NgProbeToken],s.ɵangular_packages_router_router_h]),o.ɵmpd(512,o.ApplicationInitStatus,o.ApplicationInitStatus,[[2,o.APP_INITIALIZER]]),o.ɵmpd(131584,o.ApplicationRef,o.ApplicationRef,[o.NgZone,o.ɵConsole,o.Injector,o.ErrorHandler,o.ComponentFactoryResolver,o.ApplicationInitStatus]),o.ɵmpd(1073742336,o.ApplicationModule,o.ApplicationModule,[o.ApplicationRef]),o.ɵmpd(1073742336,p.BrowserModule,p.BrowserModule,[[3,p.BrowserModule]]),o.ɵmpd(1024,s.ɵangular_packages_router_router_a,s.ɵangular_packages_router_router_e,[[3,s.Router]]),o.ɵmpd(512,s.UrlSerializer,s.DefaultUrlSerializer,[]),o.ɵmpd(512,s.ChildrenOutletContexts,s.ChildrenOutletContexts,[]),o.ɵmpd(256,s.ROUTER_CONFIGURATION,{},[]),o.ɵmpd(1024,c.LocationStrategy,s.ɵangular_packages_router_router_d,[c.PlatformLocation,[2,c.APP_BASE_HREF],s.ROUTER_CONFIGURATION]),o.ɵmpd(512,c.Location,c.Location,[c.LocationStrategy,c.PlatformLocation]),o.ɵmpd(512,o.Compiler,o.Compiler,[]),o.ɵmpd(512,o.NgModuleFactoryLoader,o.SystemJsNgModuleLoader,[o.Compiler,[2,o.SystemJsNgModuleLoaderConfig]]),o.ɵmpd(1024,s.ROUTES,function(){return[[{path:"following",component:d.FollowComponent}]]},[]),o.ɵmpd(1024,s.Router,s.ɵangular_packages_router_router_f,[o.ApplicationRef,s.UrlSerializer,s.ChildrenOutletContexts,c.Location,o.Injector,o.NgModuleFactoryLoader,o.Compiler,s.ROUTES,s.ROUTER_CONFIGURATION,[2,s.UrlHandlingStrategy],[2,s.RouteReuseStrategy]]),o.ɵmpd(1073742336,s.RouterModule,s.RouterModule,[[2,s.ɵangular_packages_router_router_a],[2,s.Router]]),o.ɵmpd(1073742336,_.AppRoutingModule,_.AppRoutingModule,[]),o.ɵmpd(1073742336,m.ManageFollowsModule,m.ManageFollowsModule,[]),o.ɵmpd(1073742336,l.AppModule,l.AppModule,[]),o.ɵmpd(256,o.ɵAPP_ROOT,!0,[])])});e.AppModuleNgFactory=f},342:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){};e.AppModule=o},343:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(1),l=t(72),r=o.ɵcmf(l.RouterModule,[],function(n){return o.ɵmod([o.ɵmpd(512,o.ComponentFactoryResolver,o.ɵCodegenComponentFactoryResolver,[[8,[c]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o.ɵmpd(1073742336,l.RouterModule,l.RouterModule,[[2,l.ɵangular_packages_router_router_a],[2,l.Router]])])});e.RouterModuleNgFactory=r;var u=o.ɵcrt({encapsulation:2,styles:[],data:{}});function a(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),o.ɵdid(1,212992,null,0,l.RouterOutlet,[l.ChildrenOutletContexts,o.ViewContainerRef,o.ComponentFactoryResolver,[8,null],o.ChangeDetectorRef],null,null)],function(n,e){n(e,1,0)},null)}function i(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"ng-component",[],null,null,null,a,u)),o.ɵdid(1,49152,null,0,l.ɵangular_packages_router_router_l,[],null,null)],null,null)}e.RenderType_ɵangular_packages_router_router_l=u,e.View_ɵangular_packages_router_router_l_0=a,e.View_ɵangular_packages_router_router_l_Host_0=i;var c=o.ɵccf("ng-component",l.ɵangular_packages_router_router_l,i,{},{},[]);e.ɵangular_packages_router_router_lNgFactory=c},344:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(345),l=t(1),r=t(132),u=t(172),a=[o.styles],i=l.ɵcrt({encapsulation:0,styles:a,data:{}});function c(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.ɵted(-1,null,["follow works!"])),(n()(),l.ɵeld(2,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.ɵted(-1,null,["follow works!"])),(n()(),l.ɵeld(4,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.ɵted(-1,null,["follow works!"])),(n()(),l.ɵeld(6,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.ɵted(-1,null,["follow works!"])),(n()(),l.ɵeld(8,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.ɵted(-1,null,["follow works!"]))],null,null)}function p(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"app-follow",[],null,null,null,c,i)),l.ɵdid(1,114688,null,0,r.FollowComponent,[u.FollowService],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_FollowComponent=i,e.View_FollowComponent_0=c,e.View_FollowComponent_Host_0=p;var s=l.ɵccf("app-follow",r.FollowComponent,p,{},{},[]);e.FollowComponentNgFactory=s},345:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},346:function(n,e,t){"use strict";var o,l,r,u;Object.defineProperty(e,"__esModule",{value:!0});var a=t(133),i=((o={})[a.media.DeviantArt]=((l={})[a.userAction.Follow]="",l[a.userAction.Posts]="",l[a.userAction.Tags]="",l),o[a.media.Tumblr]=((r={})[a.userAction.Follow]="followers",r[a.userAction.Posts]="blog",r[a.userAction.Tags]="tag",r),o[a.media.Twitter]=((u={})[a.userAction.Follow]="",u[a.userAction.Posts]="tweets",u[a.userAction.Tags]="search",u),o);e.urlForSite=function(n,e){return"https://artinsights.ue.r.appspot.com/"+function(n,e){var t,o;switch(n){case a.media.DeviantArt:t="art",o=i[a.media.DeviantArt][e];break;case a.media.Twitter:t="twitter",o=i[a.media.Twitter][e];break;case a.media.Tumblr:t="tumblr",o=i[a.media.Tumblr][e]}return t+"/"+o}(n,e)}},347:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(348),l=t(1),r=t(349),u=t(174),a=t(72),i=t(171),c=[o.styles],p=l.ɵcrt({encapsulation:0,styles:c,data:{}});function s(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"button",[],null,[[null,"click"]],function(n,e,t){var o=!0,l=n.component;"click"===e&&(o=!1!==l.sendRequest()&&o);return o},null,null)),(n()(),l.ɵted(-1,null,["Press me"])),(n()(),l.ɵeld(2,0,null,null,1,"app-nav",[],null,null,null,r.View_NavComponent_0,r.RenderType_NavComponent)),l.ɵdid(3,114688,null,0,u.NavComponent,[],null,null),(n()(),l.ɵeld(4,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),l.ɵdid(5,212992,null,0,a.RouterOutlet,[a.ChildrenOutletContexts,l.ViewContainerRef,l.ComponentFactoryResolver,[8,null],l.ChangeDetectorRef],null,null)],function(n,e){n(e,3,0),n(e,5,0)},null)}function d(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"app-root",[],null,null,null,s,p)),l.ɵdid(1,49152,null,0,i.AppComponent,[],null,null)],null,null)}e.RenderType_AppComponent=p,e.View_AppComponent_0=s,e.View_AppComponent_Host_0=d;var _=l.ɵccf("app-root",i.AppComponent,d,{},{},[]);e.AppComponentNgFactory=_},348:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},349:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(350),l=t(1),r=t(351),u=t(173),a=t(5),i=t(174),c=[o.styles],p=l.ɵcrt({encapsulation:0,styles:c,data:{}});function s(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(n()(),l.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),l.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"]},null)],function(n,e){n(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt)},null)}function d(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(n()(),l.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),l.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"],link:[2,"link"]},null)],function(n,e){n(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt,e.context.$implicit.value.link)},null)}function _(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,3,"nav",[],null,null,null,null,null)),(n()(),l.ɵand(16777216,null,null,2,null,s)),l.ɵdid(2,278528,null,0,a.NgForOf,[l.ViewContainerRef,l.TemplateRef,l.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),l.ɵpid(0,a.KeyValuePipe,[l.KeyValueDiffers]),(n()(),l.ɵeld(4,0,null,null,3,"nav",[],null,null,null,null,null)),(n()(),l.ɵand(16777216,null,null,2,null,d)),l.ɵdid(6,278528,null,0,a.NgForOf,[l.ViewContainerRef,l.TemplateRef,l.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),l.ɵpid(0,a.KeyValuePipe,[l.KeyValueDiffers])],function(n,e){var t=e.component;n(e,2,0,l.ɵunv(e,2,0,l.ɵnov(e,3).transform(t.mediaData))),n(e,6,0,l.ɵunv(e,6,0,l.ɵnov(e,7).transform(t.navActions)))},null)}function m(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"app-nav",[],null,null,null,_,p)),l.ɵdid(1,114688,null,0,i.NavComponent,[],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_NavComponent=p,e.View_NavComponent_0=_,e.View_NavComponent_Host_0=m;var f=l.ɵccf("app-nav",i.NavComponent,m,{},{},[]);e.NavComponentNgFactory=f},350:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  box-sizing: border-box; }\n\n[_nghost-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  max-width: 64px;\n  box-sizing: border-box;\n  background-color: #222f3e;\n  padding: 8px; }\n\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n  nav[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]:not(:last-child) {\n    border-bottom: 1px solid #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    background-color: transparent;\n    height: 48px; }\n    nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background-color: #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 16px; }"]},351:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(352),l=t(1),r=t(72),u=t(5),a=t(173),i=[o.styles],c=l.ɵcrt({encapsulation:0,styles:i,data:{}});function p(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,2,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,e,t){var o=!0;"click"===e&&(o=!1!==l.ɵnov(n,1).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&o);return o},null,null)),l.ɵdid(1,671744,null,0,r.RouterLinkWithHref,[r.Router,r.ActivatedRoute,u.LocationStrategy],{routerLink:[0,"routerLink"]},null),(n()(),l.ɵeld(2,0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0]],null,null,null,null))],function(n,e){n(e,1,0,e.component.link)},function(n,e){var t=e.component;n(e,0,0,l.ɵnov(e,1).target,l.ɵnov(e,1).href),n(e,2,0,t.getIconPath(),t.altText)})}function s(n){return l.ɵvid(0,[(n()(),l.ɵeld(0,0,null,null,1,"app-nav-item",[],null,null,null,p,c)),l.ɵdid(1,114688,null,0,a.NavItemComponent,[],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_NavItemComponent=c,e.View_NavItemComponent_0=p,e.View_NavItemComponent_Host_0=s;var d=l.ɵccf("app-nav-item",a.NavItemComponent,s,{iconName:"iconName",altText:"altText",link:"link"},{},[]);e.NavItemComponentNgFactory=d},352:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["*[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  box-sizing: border-box; }\n\nimg[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px; }"]},353:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(72),t(132).FollowComponent;var o=function(){};e.AppRoutingModule=o},354:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){};e.ManageFollowsModule=o}},[[340,0,1]]]);