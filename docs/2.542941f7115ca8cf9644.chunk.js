(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{109:function(n,e){function t(e){return Promise.resolve().then(function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n})}t.keys=function(){return[]},t.resolve=t,(n.exports=t).id=109},132:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1),t(173);var l=function(){function n(n){}return n.prototype.ngOnInit=function(){},n}();e.FollowComponent=l},133:function(n,e,t){"use strict";var l,o;Object.defineProperty(e,"__esModule",{value:!0}),(l=e.media||(e.media={})).DeviantArt="DeviantArt",l.Twitter="Twitter",l.Tumblr="Tumblr",(o=e.userAction||(e.userAction={})).Followers="followers",o.Following="following",o.Posts="posts",o.Tags="tag",e.mediaData={DeviantArt:{iconName:"deviantart.png",alt:"deviantArt"},Twitter:{iconName:"twitter.png",alt:"twitter"},Tumblr:{iconName:"tumblr.png",alt:"tumblr"}},e.navActions={Tags:{iconName:"promotion.png",alt:"search by tag"},Follows:{iconName:"follow.png",alt:"view follower information",link:"/following"},Engagement:{iconName:"heart.png",alt:"post engagement"}}},171:function(n,e,t){"use strict";var l=this&&this.__awaiter||function(r,u,a,i){return new(a||(a=Promise))(function(n,e){function t(n){try{o(i.next(n))}catch(n){e(n)}}function l(n){try{o(i.throw(n))}catch(n){e(n)}}function o(e){e.done?n(e.value):new a(function(n){n(e.value)}).then(t,l)}o((i=i.apply(r,u||[])).next())})},o=this&&this.__generator||function(t,l){var o,r,u,n,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return n={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function e(e){return function(n){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,r&&(u=2&e[0]?r.return:e[0]?r.throw||((u=r.return)&&u.call(r),0):r.next)&&!(u=u.call(r,e[1])).done)return u;switch(r=0,u&&(e=[2&e[0],u.value]),e[0]){case 0:case 1:u=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,r=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(u=0<(u=a.trys).length&&u[u.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!u||e[1]>u[0]&&e[1]<u[3])){a.label=e[1];break}if(6===e[0]&&a.label<u[1]){a.label=u[1],u=e;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(e);break}u[2]&&a.ops.pop(),a.trys.pop();continue}e=l.call(t,a)}catch(n){e=[6,n],r=0}finally{o=u=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,n])}}};Object.defineProperty(e,"__esModule",{value:!0});var r=t(344),u=function(){function n(){this.title="ArtInsights",this.faCoffee=r.faCoffee}return n.prototype.sendRequest=function(){return l(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return console.log("SEND"),[4,fetch("https://www.deviantart.com/oauth2/authorize?response_type=code&client_id=12698&scope=browse%20user&redirect_uri=https://bluemelodia.github.io/ArtInsights&state=de3a2397-1464-4b11-a028-ec25cc2de2e5").then(function(n){console.log("DATA: ",n)}).catch(function(n){console.log("ERROR: ",n)})];case 1:return n.sent(),[2]}})})},n}();e.AppComponent=u},172:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1);var l=function(){function n(){this.searchIconPath="./images/search.png"}return n.prototype.ngOnInit=function(){},n}();e.SearchComponent=l},173:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(133),o=t(350),r=t(1),u=function(){function n(){this.tumblrFollowers=o.urlForSite(l.media.Tumblr,l.userAction.Followers),this.tumblrFollowing=o.urlForSite(l.media.Tumblr,l.userAction.Followers)}return n.prototype.getTumblrFollowers=function(){},n.prototype.getTumblrFollowing=function(){},n.ngInjectableDef=r.ɵɵdefineInjectable({factory:function(){return new n},token:n,providedIn:"root"}),n}();e.FollowService=u},174:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1);var l=function(){function n(){}return n.prototype.ngOnInit=function(){},n.prototype.getIconPath=function(){return"./images/"+this.iconName},n}();e.NavItemComponent=l},175:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(1);var l=t(133),o=function(){function n(){this.mediaData=l.mediaData,this.navActions=l.navActions}return n.prototype.ngOnInit=function(){},n}();e.NavComponent=o},341:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(1),o=t(63),r=t(342);l.enableProdMode(),o.platformBrowser().bootstrapModuleFactory(r.AppModuleNgFactory)},342:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(1),o=t(343),r=t(171),u=t(345),a=t(346),i=t(351),c=t(5),p=t(63),s=t(72),d=t(132),m=t(357),_=t(358),f=t(359),g=l.ɵcmf(o.AppModule,[r.AppComponent],function(n){return l.ɵmod([l.ɵmpd(512,l.ComponentFactoryResolver,l.ɵCodegenComponentFactoryResolver,[[8,[u.ɵangular_packages_router_router_lNgFactory,a.FollowComponentNgFactory,i.AppComponentNgFactory]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l.ɵmpd(5120,l.LOCALE_ID,l.ɵangular_packages_core_core_p,[[3,l.LOCALE_ID]]),l.ɵmpd(4608,c.NgLocalization,c.NgLocaleLocalization,[l.LOCALE_ID,[2,c.ɵangular_packages_common_common_a]]),l.ɵmpd(5120,l.ɵangular_packages_core_core_ba,l.ɵangular_packages_core_core_r,[l.NgZone]),l.ɵmpd(5120,l.APP_ID,l.ɵangular_packages_core_core_f,[]),l.ɵmpd(5120,l.IterableDiffers,l.ɵangular_packages_core_core_n,[]),l.ɵmpd(5120,l.KeyValueDiffers,l.ɵangular_packages_core_core_o,[]),l.ɵmpd(4608,p.DomSanitizer,p.ɵDomSanitizerImpl,[c.DOCUMENT]),l.ɵmpd(6144,l.Sanitizer,null,[p.DomSanitizer]),l.ɵmpd(4608,p.HAMMER_GESTURE_CONFIG,p.HammerGestureConfig,[]),l.ɵmpd(5120,p.EVENT_MANAGER_PLUGINS,function(n,e,t,l,o,r,u,a){return[new p.ɵDomEventsPlugin(n,e,t),new p.ɵKeyEventsPlugin(l),new p.ɵHammerGesturesPlugin(o,r,u,a)]},[c.DOCUMENT,l.NgZone,l.PLATFORM_ID,c.DOCUMENT,c.DOCUMENT,p.HAMMER_GESTURE_CONFIG,l.ɵConsole,[2,p.HAMMER_LOADER]]),l.ɵmpd(4608,p.EventManager,p.EventManager,[p.EVENT_MANAGER_PLUGINS,l.NgZone]),l.ɵmpd(135680,p.ɵDomSharedStylesHost,p.ɵDomSharedStylesHost,[c.DOCUMENT]),l.ɵmpd(4608,p.ɵDomRendererFactory2,p.ɵDomRendererFactory2,[p.EventManager,p.ɵDomSharedStylesHost,l.APP_ID]),l.ɵmpd(6144,l.RendererFactory2,null,[p.ɵDomRendererFactory2]),l.ɵmpd(6144,p.ɵSharedStylesHost,null,[p.ɵDomSharedStylesHost]),l.ɵmpd(4608,l.Testability,l.Testability,[l.NgZone]),l.ɵmpd(5120,s.ActivatedRoute,s.ɵangular_packages_router_router_g,[s.Router]),l.ɵmpd(4608,s.NoPreloading,s.NoPreloading,[]),l.ɵmpd(6144,s.PreloadingStrategy,null,[s.NoPreloading]),l.ɵmpd(135680,s.RouterPreloader,s.RouterPreloader,[s.Router,l.NgModuleFactoryLoader,l.Compiler,l.Injector,s.PreloadingStrategy]),l.ɵmpd(4608,s.PreloadAllModules,s.PreloadAllModules,[]),l.ɵmpd(5120,s.ɵangular_packages_router_router_o,s.ɵangular_packages_router_router_c,[s.Router,c.ViewportScroller,s.ROUTER_CONFIGURATION]),l.ɵmpd(5120,s.ROUTER_INITIALIZER,s.ɵangular_packages_router_router_j,[s.ɵangular_packages_router_router_h]),l.ɵmpd(5120,l.APP_BOOTSTRAP_LISTENER,function(n){return[n]},[s.ROUTER_INITIALIZER]),l.ɵmpd(1073742336,c.CommonModule,c.CommonModule,[]),l.ɵmpd(1024,l.ErrorHandler,p.ɵangular_packages_platform_browser_platform_browser_a,[]),l.ɵmpd(1024,l.NgProbeToken,function(){return[s.ɵangular_packages_router_router_b()]},[]),l.ɵmpd(512,s.ɵangular_packages_router_router_h,s.ɵangular_packages_router_router_h,[l.Injector]),l.ɵmpd(1024,l.APP_INITIALIZER,function(n,e){return[p.ɵangular_packages_platform_browser_platform_browser_j(n),s.ɵangular_packages_router_router_i(e)]},[[2,l.NgProbeToken],s.ɵangular_packages_router_router_h]),l.ɵmpd(512,l.ApplicationInitStatus,l.ApplicationInitStatus,[[2,l.APP_INITIALIZER]]),l.ɵmpd(131584,l.ApplicationRef,l.ApplicationRef,[l.NgZone,l.ɵConsole,l.Injector,l.ErrorHandler,l.ComponentFactoryResolver,l.ApplicationInitStatus]),l.ɵmpd(1073742336,l.ApplicationModule,l.ApplicationModule,[l.ApplicationRef]),l.ɵmpd(1073742336,p.BrowserModule,p.BrowserModule,[[3,p.BrowserModule]]),l.ɵmpd(1024,s.ɵangular_packages_router_router_a,s.ɵangular_packages_router_router_e,[[3,s.Router]]),l.ɵmpd(512,s.UrlSerializer,s.DefaultUrlSerializer,[]),l.ɵmpd(512,s.ChildrenOutletContexts,s.ChildrenOutletContexts,[]),l.ɵmpd(256,s.ROUTER_CONFIGURATION,{},[]),l.ɵmpd(1024,c.LocationStrategy,s.ɵangular_packages_router_router_d,[c.PlatformLocation,[2,c.APP_BASE_HREF],s.ROUTER_CONFIGURATION]),l.ɵmpd(512,c.Location,c.Location,[c.LocationStrategy,c.PlatformLocation]),l.ɵmpd(512,l.Compiler,l.Compiler,[]),l.ɵmpd(512,l.NgModuleFactoryLoader,l.SystemJsNgModuleLoader,[l.Compiler,[2,l.SystemJsNgModuleLoaderConfig]]),l.ɵmpd(1024,s.ROUTES,function(){return[[{path:"following",component:d.FollowComponent}]]},[]),l.ɵmpd(1024,s.Router,s.ɵangular_packages_router_router_f,[l.ApplicationRef,s.UrlSerializer,s.ChildrenOutletContexts,c.Location,l.Injector,l.NgModuleFactoryLoader,l.Compiler,s.ROUTES,s.ROUTER_CONFIGURATION,[2,s.UrlHandlingStrategy],[2,s.RouteReuseStrategy]]),l.ɵmpd(1073742336,s.RouterModule,s.RouterModule,[[2,s.ɵangular_packages_router_router_a],[2,s.Router]]),l.ɵmpd(1073742336,m.AppRoutingModule,m.AppRoutingModule,[]),l.ɵmpd(1073742336,_.SearchModule,_.SearchModule,[]),l.ɵmpd(1073742336,f.ManageFollowsModule,f.ManageFollowsModule,[]),l.ɵmpd(1073742336,o.AppModule,o.AppModule,[]),l.ɵmpd(256,l.ɵAPP_ROOT,!0,[])])});e.AppModuleNgFactory=g},343:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.AppModule=l},346:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(347),o=t(1),r=t(348),u=t(172),a=t(132),i=t(173),c=[l.styles],p=o.ɵcrt({encapsulation:0,styles:c,data:{}});function s(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-search",[],null,null,null,r.View_SearchComponent_0,r.RenderType_SearchComponent)),o.ɵdid(1,114688,null,0,u.SearchComponent,[],null,null),(n()(),o.ɵeld(2,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),o.ɵted(-1,null,["follow works!"])),(n()(),o.ɵeld(4,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),o.ɵted(-1,null,["follow works!"])),(n()(),o.ɵeld(6,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),o.ɵted(-1,null,["follow works!"])),(n()(),o.ɵeld(8,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),o.ɵted(-1,null,["follow works!"])),(n()(),o.ɵeld(10,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),o.ɵted(-1,null,["follow works!"]))],function(n,e){n(e,1,0)},null)}function d(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-follow",[],null,null,null,s,p)),o.ɵdid(1,114688,null,0,a.FollowComponent,[i.FollowService],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_FollowComponent=p,e.View_FollowComponent_0=s,e.View_FollowComponent_Host_0=d;var m=o.ɵccf("app-follow",a.FollowComponent,d,{},{},[]);e.FollowComponentNgFactory=m},347:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},348:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(349),o=t(1),r=t(172),u=[l.styles],a=o.ɵcrt({encapsulation:0,styles:u,data:{}});function i(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,3,"div",[["class","search-bar"]],null,null,null,null,null)),(n()(),o.ɵeld(1,0,null,null,0,"input",[["aria-label","Search"],["class","search-input"],["placeholder","Search"],["type","text"]],null,null,null,null,null)),(n()(),o.ɵeld(2,0,null,null,1,"div",[["class","search-button"],["type","submit"]],null,null,null,null,null)),(n()(),o.ɵeld(3,0,null,null,0,"img",[["alt","search"]],[[8,"src",4]],null,null,null,null))],null,function(n,e){n(e,3,0,e.component.searchIconPath)})}function c(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-search",[],null,null,null,i,a)),o.ɵdid(1,114688,null,0,r.SearchComponent,[],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_SearchComponent=a,e.View_SearchComponent_0=i,e.View_SearchComponent_Host_0=c;var p=o.ɵccf("app-search",r.SearchComponent,c,{},{},[]);e.SearchComponentNgFactory=p},349:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["[_nghost-%COMP%] {\n  display: flex;\n  justify-content: center; }\n\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  max-width: 700px;\n  height: 48px;\n  background-color: #dfe6e9;\n  border: 2px solid #2d3436; }\n  .search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 8px;\n    background-color: transparent;\n    font-size: 18px; }\n    .search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, .search-bar[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:hover {\n      outline: none;\n      border: 2px solid #a29bfe; }\n  .search-bar[_ngcontent-%COMP%]   .search-button[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    max-width: 30px;\n    margin: 8px; }\n    .search-bar[_ngcontent-%COMP%]   .search-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n      width: 100%; }"]},350:function(n,e,t){"use strict";var l,o,r,u;Object.defineProperty(e,"__esModule",{value:!0});var a=t(133),i=((l={})[a.media.DeviantArt]=((o={})[a.userAction.Followers]="",o[a.userAction.Following]="",o[a.userAction.Posts]="",o[a.userAction.Tags]="",o),l[a.media.Tumblr]=((r={})[a.userAction.Followers]="followers",r[a.userAction.Following]="following",r[a.userAction.Posts]="blog",r[a.userAction.Tags]="tag",r),l[a.media.Twitter]=((u={})[a.userAction.Followers]="",u[a.userAction.Following]="",u[a.userAction.Posts]="tweets",u[a.userAction.Tags]="search",u),l);e.urlForSite=function(n,e){return"https://artinsights.ue.r.appspot.com/"+function(n,e){var t,l;switch(n){case a.media.DeviantArt:t="art",l=i[a.media.DeviantArt][e];break;case a.media.Twitter:t="twitter",l=i[a.media.Twitter][e];break;case a.media.Tumblr:t="tumblr",l=i[a.media.Tumblr][e]}return t+"/"+l}(n,e)}},351:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(352),o=t(1),r=t(353),u=t(175),a=t(72),i=t(171),c=[l.styles],p=o.ɵcrt({encapsulation:0,styles:c,data:{}});function s(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"button",[],null,[[null,"click"]],function(n,e,t){var l=!0,o=n.component;"click"===e&&(l=!1!==o.sendRequest()&&l);return l},null,null)),(n()(),o.ɵted(-1,null,["Press me"])),(n()(),o.ɵeld(2,0,null,null,1,"app-nav",[],null,null,null,r.View_NavComponent_0,r.RenderType_NavComponent)),o.ɵdid(3,114688,null,0,u.NavComponent,[],null,null),(n()(),o.ɵeld(4,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),o.ɵdid(5,212992,null,0,a.RouterOutlet,[a.ChildrenOutletContexts,o.ViewContainerRef,o.ComponentFactoryResolver,[8,null],o.ChangeDetectorRef],null,null)],function(n,e){n(e,3,0),n(e,5,0)},null)}function d(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-root",[],null,null,null,s,p)),o.ɵdid(1,49152,null,0,i.AppComponent,[],null,null)],null,null)}e.RenderType_AppComponent=p,e.View_AppComponent_0=s,e.View_AppComponent_Host_0=d;var m=o.ɵccf("app-root",i.AppComponent,d,{},{},[]);e.AppComponentNgFactory=m},352:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},353:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(354),o=t(1),r=t(355),u=t(174),a=t(5),i=t(175),c=[l.styles],p=o.ɵcrt({encapsulation:0,styles:c,data:{}});function s(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(n()(),o.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),o.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"]},null)],function(n,e){n(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt)},null)}function d(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(n()(),o.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),o.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"],link:[2,"link"]},null)],function(n,e){n(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt,e.context.$implicit.value.link)},null)}function m(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,3,"nav",[],null,null,null,null,null)),(n()(),o.ɵand(16777216,null,null,2,null,s)),o.ɵdid(2,278528,null,0,a.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,a.KeyValuePipe,[o.KeyValueDiffers]),(n()(),o.ɵeld(4,0,null,null,3,"nav",[],null,null,null,null,null)),(n()(),o.ɵand(16777216,null,null,2,null,d)),o.ɵdid(6,278528,null,0,a.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,a.KeyValuePipe,[o.KeyValueDiffers])],function(n,e){var t=e.component;n(e,2,0,o.ɵunv(e,2,0,o.ɵnov(e,3).transform(t.mediaData))),n(e,6,0,o.ɵunv(e,6,0,o.ɵnov(e,7).transform(t.navActions)))},null)}function _(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-nav",[],null,null,null,m,p)),o.ɵdid(1,114688,null,0,i.NavComponent,[],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_NavComponent=p,e.View_NavComponent_0=m,e.View_NavComponent_Host_0=_;var f=o.ɵccf("app-nav",i.NavComponent,_,{},{},[]);e.NavComponentNgFactory=f},354:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["[_nghost-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  max-width: 64px;\n  box-sizing: border-box;\n  background-color: #222f3e;\n  padding: 8px; }\n\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n  nav[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]:not(:last-child) {\n    border-bottom: 1px solid #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    background-color: transparent;\n    height: 48px; }\n    nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background-color: #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 16px; }"]},355:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(356),o=t(1),r=t(72),u=t(5),a=t(174),i=[l.styles],c=o.ɵcrt({encapsulation:0,styles:i,data:{}});function p(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,2,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,e,t){var l=!0;"click"===e&&(l=!1!==o.ɵnov(n,1).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&l);return l},null,null)),o.ɵdid(1,671744,null,0,r.RouterLinkWithHref,[r.Router,r.ActivatedRoute,u.LocationStrategy],{routerLink:[0,"routerLink"]},null),(n()(),o.ɵeld(2,0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0]],null,null,null,null))],function(n,e){n(e,1,0,e.component.link)},function(n,e){var t=e.component;n(e,0,0,o.ɵnov(e,1).target,o.ɵnov(e,1).href),n(e,2,0,t.getIconPath(),t.altText)})}function s(n){return o.ɵvid(0,[(n()(),o.ɵeld(0,0,null,null,1,"app-nav-item",[],null,null,null,p,c)),o.ɵdid(1,114688,null,0,a.NavItemComponent,[],null,null)],function(n,e){n(e,1,0)},null)}e.RenderType_NavItemComponent=c,e.View_NavItemComponent_0=p,e.View_NavItemComponent_Host_0=s;var d=o.ɵccf("app-nav-item",a.NavItemComponent,s,{iconName:"iconName",altText:"altText",link:"link"},{},[]);e.NavItemComponentNgFactory=d},356:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["img[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px; }"]},357:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t(72),t(132).FollowComponent;var l=function(){};e.AppRoutingModule=l},358:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.SearchModule=l},359:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.ManageFollowsModule=l}},[[341,0,1,5]]]);