(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{114:function(t,e){function n(e){return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}n.keys=function(){return[]},n.resolve=n,(t.exports=n).id=114},137:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(1),o=function(){function t(){}return t.prototype.visitBlog=function(t){window.open(t,"_blank")},t.prototype.dateForTimestamp=function(t){return new Date(1e3*t)},t.ngInjectableDef=l.ɵɵdefineInjectable({factory:function(){return new t},token:t,providedIn:"root"}),t}();e.BlogUtilsService=o},138:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1),n(179);var o=n(49),l=(n(89),n(90),n(180),function(){function t(t,e,n,l){this.tumblrFollowService=t,this.daFollowService=e,this.authService=n,this.redirectService=l,this.tumblrFollowers=[],this.tumblrFollowerMap={},this.tumblrFollowerOffset=0,this.hasMoreTumblrFollowers=!0,this.tumblrFollowing=[],this.tumblrFollowingMap={},this.tumblrFollowingOffset=0,this.hasMoreTumblrFollowing=!0,this.deviantArtFriends=[],this.deviantArtFriendMap={},this.deviantArtFriendOffset=0,this.hasMoreDAFriends=!0,this.setupRedirectSubscription()}return t.prototype.ngOnInit=function(){},t.prototype.onBlogSearch=function(t){0<t.length&&t!==this.blog&&(this.blog=t,this.getDeviantArtFriendsAndFollowers())},t.prototype.getTumblrFollowersAndFollowing=function(){this.resetTumblrStats(),this.getTumblrFollowers(this.blog,this.tumblrFollowerOffset),this.getTumblrFollowing(this.blog,this.tumblrFollowingOffset)},t.prototype.setupRedirectSubscription=function(){var e=this;this.tumblrAuthRedirectSubject$=this.authService.redirectSubject$(o.media.Tumblr),this.tumblrAuthRedirectSubject$.subscribe(function(t){console.log("Prepare to redirect to auth link: ",t),e.redirectService.redirect(t)}),this.daAuthRedirectSubject$=this.authService.redirectSubject$(o.media.DeviantArt),this.daAuthRedirectSubject$.subscribe(function(t){console.log("Prepare to redirect to auth link: ",t),e.redirectService.redirect(t)})},t.prototype.follow=function(e,n){var l=this;switch(n){case o.media.Tumblr:this.tumblrFollowService.followBlog(e).subscribe(function(t){403===t.statusCode?l.authService.authenticateUser(n):0!==t.statusCode?console.log("Failed to follow: "+e+", "+t):(console.log("Successfully followed: "+e+", refresh"),l.getTumblrFollowersAndFollowing()),console.log("Try to follow: ",t)})}},t.prototype.unfollow=function(e,n){var l=this;switch(n){case o.media.Tumblr:this.tumblrFollowService.unfollowBlog(e).subscribe(function(t){403===t.statusCode?l.authService.authenticateUser(n):0!==t.statusCode?console.log("Failed to unfollow: "+e+", ",t):(console.log("Successfully unfollowed: "+e+", refresh"),l.getTumblrFollowersAndFollowing()),console.log("Try to unfollow: ",t)})}},t.prototype.resetDAStats=function(){this.deviantArtFriends=[],this.deviantArtFriendMap={},this.deviantArtFriendOffset=0,this.hasMoreDAFriends=!0},t.prototype.getDeviantArtFriendsAndFollowers=function(){this.resetDAStats(),this.getDeviantArtFriends(this.blog,this.deviantArtFriendOffset)},t.prototype.getDeviantArtFriends=function(t,e){var n=this;void 0===e&&(e=0),console.log("GET DA FRIENDS"),this.daFollowService.getDAFriends(t,e).subscribe(function(t){403===t.statusCode?n.authService.authenticateUser(o.media.DeviantArt):console.log("YO ",t)})},t.prototype.followTumblr=function(t){this.follow(t,o.media.Tumblr)},t.prototype.unfollowTumblr=function(t){this.unfollow(t,o.media.Tumblr)},t.prototype.resetTumblrStats=function(){this.tumblrFollowers=[],this.tumblrFollowerMap={},this.tumblrFollowerOffset=0,this.hasMoreTumblrFollowers=!0,this.tumblrFollowing=[],this.tumblrFollowingMap={},this.tumblrFollowingOffset=0,this.hasMoreTumblrFollowing=!0},t.prototype.getTumblrFollowers=function(n,t){var l=this;void 0===t&&(t=0),this.tumblrFollowService.getTumblrFollowers(n,t).subscribe(function(t){if(-1!==t.statusCode){var e=t.responseData;(!e.users||e.users.length<1)&&(l.hasMoreTumblrFollowers=!1),e.users.forEach(function(t){t.name in l.tumblrFollowerMap?l.hasMoreTumblrFollowers=!1:l.addTumblrFollower(t)}),l.getMoreTumblrFollowers(n),console.log("TumblrFollowers 🙌🏼: ",t,l.tumblrFollowers)}})},t.prototype.getMoreTumblrFollowers=function(t){this.hasMoreTumblrFollowers&&this.getTumblrFollowers(t,this.tumblrFollowerOffset)},t.prototype.addTumblrFollower=function(t){var e={name:t.name,url:t.url,updated:t.updated,following:t.following};this.tumblrFollowers.push(e.name),this.tumblrFollowerMap[e.name]=e,this.tumblrFollowerOffset++},t.prototype.getTumblrFollowing=function(n,t){var l=this;void 0===t&&(t=0),this.tumblrFollowService.getTumblrFollowing(n,t).subscribe(function(t){if(-1!==t.statusCode){var e=t.responseData;(!e.blogs||e.blogs.length<1)&&(l.hasMoreTumblrFollowing=!1),e.blogs.forEach(function(t){t.name in l.tumblrFollowingMap?l.hasMoreTumblrFollowing=!1:l.addTumblrFollowing(t)}),l.getMoreTumblrFollowing(n),console.log("TumblrFollowing 🎀: ",t,l.tumblrFollowing)}})},t.prototype.getMoreTumblrFollowing=function(t){this.hasMoreTumblrFollowing&&this.getTumblrFollowing(t,this.tumblrFollowingOffset)},t.prototype.addTumblrFollowing=function(t){var e={name:t.name,title:t.title,url:t.url,updated:t.updated};this.tumblrFollowing.push(e.name),this.tumblrFollowingMap[e.name]=e,this.tumblrFollowingOffset++},t}());e.FollowComponent=l},139:function(t,e,n){"use strict";var l,o,r,u;Object.defineProperty(e,"__esModule",{value:!0});var i=n(49),a=((l={})[i.media.DeviantArt]=((o={})[i.userAction.Auth]="auth",o[i.userAction.Followers]="friends",o[i.userAction.Following]="",o[i.userAction.Posts]="",o[i.userAction.Tags]="",o),l[i.media.Tumblr]=((r={})[i.userAction.Auth]="auth",r[i.userAction.Follow]="follow",r[i.userAction.Followers]="followers",r[i.userAction.Following]="following",r[i.userAction.Posts]="blog",r[i.userAction.Tags]="tag",r[i.userAction.Unfollow]="unfollow",r),l[i.media.Twitter]=((u={})[i.userAction.Followers]="",u[i.userAction.Following]="",u[i.userAction.Posts]="tweets",u[i.userAction.Tags]="search",u),l);e.urlForSite=function(t,e){return"https://artinsights.ue.r.appspot.com/"+function(t,e){var n,l;switch(t){case i.media.DeviantArt:n="art",l=a[i.media.DeviantArt][e];break;case i.media.Twitter:n="twitter",l=a[i.media.Twitter][e];break;case i.media.Tumblr:n="tumblr",l=a[i.media.Tumblr][e]}return n+"/"+l}(t,e)}},176:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function t(){this.title="ArtInsights"}return t.prototype.receivedPostedMessage=function(t){console.log("Received a message: ",t),"https://artinsights.ue.r.appspot.com"===t.origin&&console.log("Auth passed? ")},t}();e.AppComponent=l},177:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(1),o=n(49),r=function(){function t(){this.onUserAction=new l.EventEmitter}return Object.defineProperty(t.prototype,"themeClasses",{get:function(){switch(this.mediaType){case o.media.Tumblr:return"tumblr-theme";default:return""}},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){},t.prototype.updateBlogFollowStatus=function(){this.isFollowing?this.onUserAction.emit(o.userAction.Unfollow):this.onUserAction.emit(o.userAction.Follow)},t}();e.BlogComponent=r},178:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(1),o=(n(137),n(49)),r=function(){function t(t){this.blogUtils=t,this.tumblrFollowers=[],this.tumblrFollowerMap={},this.tumblrFollowing=[],this.tumblrFollowingMap={},this.followBlog=new l.EventEmitter,this.unfollowBlog=new l.EventEmitter,this.mediaType=o.media.Tumblr}return t.prototype.ngOnInit=function(){},t.prototype.showTumblrWidget=function(){return 0<this.tumblrFollowers.length||0<this.tumblrFollowing.length},t.prototype.onUserAction=function(t,e){switch(console.log("On user action: ",t,e),t){case o.userAction.Follow:this.followBlog.emit(e);break;case o.userAction.Unfollow:this.unfollowBlog.emit(e)}},t.prototype.followsYou=function(t){return t in this.tumblrFollowerMap},t}();e.TumblrFollowComponent=r},179:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(65);var l=n(49),o=n(139),r=n(1),u=n(65),i=function(){function t(t){this.http=t,this.tumblrFollowers=o.urlForSite(l.media.Tumblr,l.userAction.Followers),this.tumblrFollowing=o.urlForSite(l.media.Tumblr,l.userAction.Following),this.followTumblrBlog=o.urlForSite(l.media.Tumblr,l.userAction.Follow),this.unfollowTumblrBlog=o.urlForSite(l.media.Tumblr,l.userAction.Unfollow)}return t.prototype.getTumblrFollowers=function(t,e){void 0===e&&(e=0);var n=this.tumblrFollowers+"/"+t+"/offset/"+e;return console.log("📘 Get Tumblr followers for "+t+": ",n),this.http.get(n)},t.prototype.getTumblrFollowing=function(t,e){void 0===e&&(e=0);var n=this.tumblrFollowing+"/"+t+"/offset/"+e;return console.log("📘 Get Tumblr following for "+t+": ",n),this.http.get(n)},t.prototype.followBlog=function(t){var e=this.followTumblrBlog+"?blog="+this.removeTrailingSlash(t);return console.log("📘 Follow Tumblr blog "+t+": ",e),this.http.get(e)},t.prototype.unfollowBlog=function(t){var e=this.unfollowTumblrBlog+"?blog="+this.removeTrailingSlash(t);return console.log("📘 Unfollow Tumblr blog "+t+": ",e),this.http.get(e)},t.prototype.removeTrailingSlash=function(t){var e=t;return t.lastIndexOf("/")===t.length-1&&(e=t.slice(0,-1)),e},t.ngInjectableDef=r.ɵɵdefineInjectable({factory:function(){return new t(r.ɵɵinject(u.HttpClient))},token:t,providedIn:"root"}),t}();e.TumblrFollowService=i},180:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(65);var l=n(49),o=n(139),r=n(1),u=n(65),i=function(){function t(t){this.http=t,this.deviantArtFriends=o.urlForSite(l.media.DeviantArt,l.userAction.Followers),this.deviantArtFollowers=o.urlForSite(l.media.DeviantArt,l.userAction.Following),this.followDeviant=o.urlForSite(l.media.DeviantArt,l.userAction.Follow),this.unfollowDeviant=o.urlForSite(l.media.DeviantArt,l.userAction.Unfollow)}return t.prototype.getDAFriends=function(t,e){void 0===e&&(e=0);var n=this.deviantArtFriends+"/"+t+"/offset/"+e;return console.log("📗 Get DA friends for "+t+": ",n),this.http.get(n)},t.ngInjectableDef=r.ɵɵdefineInjectable({factory:function(){return new t(r.ɵɵinject(u.HttpClient))},token:t,providedIn:"root"}),t}();e.DeviantArtFollowService=i},181:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1);var l=function(){function t(){}return t.prototype.ngOnInit=function(){},t.prototype.getIconPath=function(){return"./images/"+this.iconName},t}();e.NavItemComponent=l},182:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1);var l=n(49),o=function(){function t(){this.mediaData=l.mediaData,this.navActions=l.navActions}return t.prototype.ngOnInit=function(){},t}();e.NavComponent=o},183:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1),n(89);var l=n(49),o=(n(90),function(){function t(t,e){this.authService=t,this.redirectService=e,this.setupRedirectSubscriptions()}return t.prototype.ngOnInit=function(){},t.prototype.auth=function(){console.log("AUTH"),this.authService.authenticateUser(l.media.DeviantArt)},t.prototype.setupRedirectSubscriptions=function(){var e=this;this.tumblrAuthRedirectSubject$=this.authService.redirectSubject$(l.media.Tumblr),this.tumblrAuthRedirectSubject$.subscribe(function(t){console.log("Prepare to redirect to auth link: ",t),e.redirectService.redirect(t)}),this.daAuthRedirectSubject$=this.authService.redirectSubject$(l.media.DeviantArt),this.daAuthRedirectSubject$.subscribe(function(t){console.log("Prepare to redirect to auth link: ",t),e.redirectService.redirect(t)})},t}());e.AuthComponent=o},349:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(1),o=n(67),r=n(350);l.enableProdMode(),o.platformBrowser().bootstrapModuleFactory(r.AppModuleNgFactory)},350:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(1),o=n(351),r=n(176),u=n(352),i=n(353),a=n(359),c=n(4),s=n(67),p=n(65),d=n(54),m=n(138),f=n(367),g=n(368),h=n(369),_=l.ɵcmf(o.AppModule,[r.AppComponent],function(t){return l.ɵmod([l.ɵmpd(512,l.ComponentFactoryResolver,l.ɵCodegenComponentFactoryResolver,[[8,[u.ɵangular_packages_router_router_lNgFactory,i.FollowComponentNgFactory,a.AppComponentNgFactory]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l.ɵmpd(5120,l.LOCALE_ID,l.ɵangular_packages_core_core_p,[[3,l.LOCALE_ID]]),l.ɵmpd(4608,c.NgLocalization,c.NgLocaleLocalization,[l.LOCALE_ID,[2,c.ɵangular_packages_common_common_a]]),l.ɵmpd(5120,l.ɵangular_packages_core_core_ba,l.ɵangular_packages_core_core_r,[l.NgZone]),l.ɵmpd(5120,l.APP_ID,l.ɵangular_packages_core_core_f,[]),l.ɵmpd(5120,l.IterableDiffers,l.ɵangular_packages_core_core_n,[]),l.ɵmpd(5120,l.KeyValueDiffers,l.ɵangular_packages_core_core_o,[]),l.ɵmpd(4608,s.DomSanitizer,s.ɵDomSanitizerImpl,[c.DOCUMENT]),l.ɵmpd(6144,l.Sanitizer,null,[s.DomSanitizer]),l.ɵmpd(4608,s.HAMMER_GESTURE_CONFIG,s.HammerGestureConfig,[]),l.ɵmpd(5120,s.EVENT_MANAGER_PLUGINS,function(t,e,n,l,o,r,u,i){return[new s.ɵDomEventsPlugin(t,e,n),new s.ɵKeyEventsPlugin(l),new s.ɵHammerGesturesPlugin(o,r,u,i)]},[c.DOCUMENT,l.NgZone,l.PLATFORM_ID,c.DOCUMENT,c.DOCUMENT,s.HAMMER_GESTURE_CONFIG,l.ɵConsole,[2,s.HAMMER_LOADER]]),l.ɵmpd(4608,s.EventManager,s.EventManager,[s.EVENT_MANAGER_PLUGINS,l.NgZone]),l.ɵmpd(135680,s.ɵDomSharedStylesHost,s.ɵDomSharedStylesHost,[c.DOCUMENT]),l.ɵmpd(4608,s.ɵDomRendererFactory2,s.ɵDomRendererFactory2,[s.EventManager,s.ɵDomSharedStylesHost,l.APP_ID]),l.ɵmpd(6144,l.RendererFactory2,null,[s.ɵDomRendererFactory2]),l.ɵmpd(6144,s.ɵSharedStylesHost,null,[s.ɵDomSharedStylesHost]),l.ɵmpd(4608,l.Testability,l.Testability,[l.NgZone]),l.ɵmpd(4608,p.HttpXsrfTokenExtractor,p.ɵangular_packages_common_http_http_g,[c.DOCUMENT,l.PLATFORM_ID,p.ɵangular_packages_common_http_http_e]),l.ɵmpd(4608,p.ɵangular_packages_common_http_http_h,p.ɵangular_packages_common_http_http_h,[p.HttpXsrfTokenExtractor,p.ɵangular_packages_common_http_http_f]),l.ɵmpd(5120,p.HTTP_INTERCEPTORS,function(t){return[t]},[p.ɵangular_packages_common_http_http_h]),l.ɵmpd(4608,p.ɵangular_packages_common_http_http_d,p.ɵangular_packages_common_http_http_d,[]),l.ɵmpd(6144,p.XhrFactory,null,[p.ɵangular_packages_common_http_http_d]),l.ɵmpd(4608,p.HttpXhrBackend,p.HttpXhrBackend,[p.XhrFactory]),l.ɵmpd(6144,p.HttpBackend,null,[p.HttpXhrBackend]),l.ɵmpd(4608,p.HttpHandler,p.ɵHttpInterceptingHandler,[p.HttpBackend,l.Injector]),l.ɵmpd(4608,p.HttpClient,p.HttpClient,[p.HttpHandler]),l.ɵmpd(5120,d.ActivatedRoute,d.ɵangular_packages_router_router_g,[d.Router]),l.ɵmpd(4608,d.NoPreloading,d.NoPreloading,[]),l.ɵmpd(6144,d.PreloadingStrategy,null,[d.NoPreloading]),l.ɵmpd(135680,d.RouterPreloader,d.RouterPreloader,[d.Router,l.NgModuleFactoryLoader,l.Compiler,l.Injector,d.PreloadingStrategy]),l.ɵmpd(4608,d.PreloadAllModules,d.PreloadAllModules,[]),l.ɵmpd(5120,d.ɵangular_packages_router_router_o,d.ɵangular_packages_router_router_c,[d.Router,c.ViewportScroller,d.ROUTER_CONFIGURATION]),l.ɵmpd(5120,d.ROUTER_INITIALIZER,d.ɵangular_packages_router_router_j,[d.ɵangular_packages_router_router_h]),l.ɵmpd(5120,l.APP_BOOTSTRAP_LISTENER,function(t){return[t]},[d.ROUTER_INITIALIZER]),l.ɵmpd(1073742336,c.CommonModule,c.CommonModule,[]),l.ɵmpd(1024,l.ErrorHandler,s.ɵangular_packages_platform_browser_platform_browser_a,[]),l.ɵmpd(1024,l.NgProbeToken,function(){return[d.ɵangular_packages_router_router_b()]},[]),l.ɵmpd(512,d.ɵangular_packages_router_router_h,d.ɵangular_packages_router_router_h,[l.Injector]),l.ɵmpd(1024,l.APP_INITIALIZER,function(t,e){return[s.ɵangular_packages_platform_browser_platform_browser_j(t),d.ɵangular_packages_router_router_i(e)]},[[2,l.NgProbeToken],d.ɵangular_packages_router_router_h]),l.ɵmpd(512,l.ApplicationInitStatus,l.ApplicationInitStatus,[[2,l.APP_INITIALIZER]]),l.ɵmpd(131584,l.ApplicationRef,l.ApplicationRef,[l.NgZone,l.ɵConsole,l.Injector,l.ErrorHandler,l.ComponentFactoryResolver,l.ApplicationInitStatus]),l.ɵmpd(1073742336,l.ApplicationModule,l.ApplicationModule,[l.ApplicationRef]),l.ɵmpd(1073742336,s.BrowserModule,s.BrowserModule,[[3,s.BrowserModule]]),l.ɵmpd(1073742336,p.HttpClientXsrfModule,p.HttpClientXsrfModule,[]),l.ɵmpd(1073742336,p.HttpClientModule,p.HttpClientModule,[]),l.ɵmpd(1024,d.ɵangular_packages_router_router_a,d.ɵangular_packages_router_router_e,[[3,d.Router]]),l.ɵmpd(512,d.UrlSerializer,d.DefaultUrlSerializer,[]),l.ɵmpd(512,d.ChildrenOutletContexts,d.ChildrenOutletContexts,[]),l.ɵmpd(256,d.ROUTER_CONFIGURATION,{},[]),l.ɵmpd(1024,c.LocationStrategy,d.ɵangular_packages_router_router_d,[c.PlatformLocation,[2,c.APP_BASE_HREF],d.ROUTER_CONFIGURATION]),l.ɵmpd(512,c.Location,c.Location,[c.LocationStrategy,c.PlatformLocation]),l.ɵmpd(512,l.Compiler,l.Compiler,[]),l.ɵmpd(512,l.NgModuleFactoryLoader,l.SystemJsNgModuleLoader,[l.Compiler,[2,l.SystemJsNgModuleLoaderConfig]]),l.ɵmpd(1024,d.ROUTES,function(){return[[{path:"following",component:m.FollowComponent}]]},[]),l.ɵmpd(1024,d.Router,d.ɵangular_packages_router_router_f,[l.ApplicationRef,d.UrlSerializer,d.ChildrenOutletContexts,c.Location,l.Injector,l.NgModuleFactoryLoader,l.Compiler,d.ROUTES,d.ROUTER_CONFIGURATION,[2,d.UrlHandlingStrategy],[2,d.RouteReuseStrategy]]),l.ɵmpd(1073742336,d.RouterModule,d.RouterModule,[[2,d.ɵangular_packages_router_router_a],[2,d.Router]]),l.ɵmpd(1073742336,f.AppRoutingModule,f.AppRoutingModule,[]),l.ɵmpd(1073742336,g.SearchModule,g.SearchModule,[]),l.ɵmpd(1073742336,h.FollowsModule,h.FollowsModule,[]),l.ɵmpd(1073742336,o.AppModule,o.AppModule,[]),l.ɵmpd(256,l.ɵAPP_ROOT,!0,[]),l.ɵmpd(256,p.ɵangular_packages_common_http_http_e,"XSRF-TOKEN",[]),l.ɵmpd(256,p.ɵangular_packages_common_http_http_f,"X-XSRF-TOKEN",[])])});e.AppModuleNgFactory=_},351:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.AppModule=l},353:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(354),o=n(1),r=n(355),u=n(178),i=n(137),a=n(138),c=n(179),s=n(180),p=n(89),d=n(90),m=[l.styles],f=o.ɵcrt({encapsulation:0,styles:m,data:{}});function g(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-tumblr-follow",[],null,[[null,"followBlog"],[null,"unfollowBlog"]],function(t,e,n){var l=!0,o=t.component;"followBlog"===e&&(l=!1!==o.followTumblr(n)&&l);"unfollowBlog"===e&&(l=!1!==o.unfollowTumblr(n)&&l);return l},r.View_TumblrFollowComponent_0,r.RenderType_TumblrFollowComponent)),o.ɵdid(1,114688,null,0,u.TumblrFollowComponent,[i.BlogUtilsService],{tumblrFollowers:[0,"tumblrFollowers"],tumblrFollowerMap:[1,"tumblrFollowerMap"],tumblrFollowing:[2,"tumblrFollowing"],tumblrFollowingMap:[3,"tumblrFollowingMap"]},{followBlog:"followBlog",unfollowBlog:"unfollowBlog"})],function(t,e){var n=e.component;t(e,1,0,n.tumblrFollowers,n.tumblrFollowerMap,n.tumblrFollowing,n.tumblrFollowingMap)},null)}function h(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-follow",[],null,null,null,g,f)),o.ɵdid(1,114688,null,0,a.FollowComponent,[c.TumblrFollowService,s.DeviantArtFollowService,p.AuthService,d.RedirectService],null,null)],function(t,e){t(e,1,0)},null)}e.RenderType_FollowComponent=f,e.View_FollowComponent_0=g,e.View_FollowComponent_Host_0=h;var _=o.ɵccf("app-follow",a.FollowComponent,h,{},{},[]);e.FollowComponentNgFactory=_},354:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},355:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(356),o=n(1),r=n(357),u=n(177),i=n(4),a=n(178),c=n(137),s=[l.styles],p=o.ɵcrt({encapsulation:0,styles:s,data:{}});function d(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,7,"app-blog",[],[[8,"className",0]],[[null,"onUserAction"]],function(t,e,n){var l=!0,o=t.component;"onUserAction"===e&&(l=!1!==o.onUserAction(n,t.context.$implicit.value.url)&&l);return l},r.View_BlogComponent_0,r.RenderType_BlogComponent)),o.ɵdid(1,114688,null,0,u.BlogComponent,[],{isFollowing:[0,"isFollowing"],mediaType:[1,"mediaType"]},{onUserAction:"onUserAction"}),(t()(),o.ɵeld(2,0,null,0,5,"div",[["media-type","tumblr"]],null,null,null,null,null)),(t()(),o.ɵeld(3,0,null,null,1,"h3",[],null,[[null,"click"]],function(t,e,n){var l=!0,o=t.component;"click"===e&&(l=!1!==o.blogUtils.visitBlog(t.context.$implicit.value.url)&&l);return l},null,null)),(t()(),o.ɵted(4,null,[" "," "])),(t()(),o.ɵeld(5,0,null,null,2,"p",[],null,null,null,null,null)),(t()(),o.ɵted(6,null,["Last Updated: ",""])),o.ɵppd(7,2)],function(t,e){var n=e.component;t(e,1,0,e.context.$implicit.value.following,n.mediaType)},function(t,e){var n=e.component;t(e,0,0,o.ɵnov(e,1).themeClasses),t(e,4,0,e.context.$implicit.key),t(e,6,0,o.ɵunv(e,6,0,t(e,7,0,o.ɵnov(e.parent.parent.parent,0),n.blogUtils.dateForTimestamp(e.context.$implicit.value.updated),"MM/dd/yyyy")))})}function m(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,3,"div",[["class","scrollable-list"]],null,null,null,null,null)),(t()(),o.ɵand(16777216,null,null,2,null,d)),o.ɵdid(2,278528,null,0,i.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,i.KeyValuePipe,[o.KeyValueDiffers])],function(t,e){var n=e.component;t(e,2,0,o.ɵunv(e,2,0,o.ɵnov(e,3).transform(n.tumblrFollowerMap)))},null)}function f(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"div",[["class","follows-back"]],null,null,null,null,null)),(t()(),o.ɵted(-1,null,["Follows you"]))],null,null)}function g(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,6,"app-blog",[],[[8,"className",0]],[[null,"onUserAction"]],function(t,e,n){var l=!0,o=t.component;"onUserAction"===e&&(l=!1!==o.onUserAction(n,t.context.$implicit.value.url)&&l);return l},r.View_BlogComponent_0,r.RenderType_BlogComponent)),o.ɵdid(1,114688,null,0,u.BlogComponent,[],{isFollowing:[0,"isFollowing"],mediaType:[1,"mediaType"]},{onUserAction:"onUserAction"}),(t()(),o.ɵeld(2,0,null,0,4,"div",[["media-type","tumblr"]],null,null,null,null,null)),(t()(),o.ɵeld(3,0,null,null,1,"h3",[],null,[[null,"click"]],function(t,e,n){var l=!0,o=t.component;"click"===e&&(l=!1!==o.blogUtils.visitBlog(t.context.$implicit.value.url)&&l);return l},null,null)),(t()(),o.ɵted(4,null,[" "," "])),(t()(),o.ɵand(16777216,null,null,1,null,f)),o.ɵdid(6,16384,null,0,i.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,e){var n=e.component;t(e,1,0,!0,n.mediaType),t(e,6,0,n.followsYou(e.context.$implicit.key))},function(t,e){t(e,0,0,o.ɵnov(e,1).themeClasses),t(e,4,0,e.context.$implicit.key)})}function h(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,3,"div",[["class","scrollable-list"]],null,null,null,null,null)),(t()(),o.ɵand(16777216,null,null,2,null,g)),o.ɵdid(2,278528,null,0,i.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,i.KeyValuePipe,[o.KeyValueDiffers])],function(t,e){var n=e.component;t(e,2,0,o.ɵunv(e,2,0,o.ɵnov(e,3).transform(n.tumblrFollowingMap)))},null)}function _(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,10,"section",[["class","tumblr-follows"]],null,null,null,null,null)),(t()(),o.ɵeld(1,0,null,null,4,"div",[["class","followers"]],null,null,null,null,null)),(t()(),o.ɵeld(2,0,null,null,1,"h2",[],null,null,null,null,null)),(t()(),o.ɵted(-1,null,["Followers"])),(t()(),o.ɵand(16777216,null,null,1,null,m)),o.ɵdid(5,16384,null,0,i.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),o.ɵeld(6,0,null,null,4,"div",[["class","following"]],null,null,null,null,null)),(t()(),o.ɵeld(7,0,null,null,1,"h2",[],null,null,null,null,null)),(t()(),o.ɵted(-1,null,["Following"])),(t()(),o.ɵand(16777216,null,null,1,null,h)),o.ɵdid(10,16384,null,0,i.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,e){var n=e.component;t(e,5,0,0<n.tumblrFollowers.length),t(e,10,0,0<n.tumblrFollowing.length)},null)}function w(t){return o.ɵvid(0,[o.ɵpid(0,i.DatePipe,[o.LOCALE_ID]),(t()(),o.ɵand(16777216,null,null,1,null,_)),o.ɵdid(2,16384,null,0,i.NgIf,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,e){t(e,2,0,e.component.showTumblrWidget())},null)}function b(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-tumblr-follow",[],null,null,null,w,p)),o.ɵdid(1,114688,null,0,a.TumblrFollowComponent,[c.BlogUtilsService],null,null)],function(t,e){t(e,1,0)},null)}e.RenderType_TumblrFollowComponent=p,e.View_TumblrFollowComponent_0=w,e.View_TumblrFollowComponent_Host_0=b;var v=o.ɵccf("app-tumblr-follow",a.TumblrFollowComponent,b,{tumblrFollowers:"tumblrFollowers",tumblrFollowerMap:"tumblrFollowerMap",tumblrFollowing:"tumblrFollowing",tumblrFollowingMap:"tumblrFollowingMap"},{followBlog:"followBlog",unfollowBlog:"unfollowBlog"},[]);e.TumblrFollowComponentNgFactory=v},356:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[".tumblr-follows[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  background-color: #2a4259;\n  margin: 16px;\n  padding: 16px;\n  border: 3px solid #222f3e; }\n  .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%], .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%] {\n    color: #fff;\n    width: 100%; }\n    .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      text-align: center;\n      padding-bottom: 16px; }\n    .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      letter-spacing: 0.5px; }\n      .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]:hover, .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]:hover {\n        color: #74b9ff;\n        cursor: pointer; }\n    .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%]   .scrollable-list[_ngcontent-%COMP%], .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%]   .scrollable-list[_ngcontent-%COMP%] {\n      max-height: 450px;\n      padding-right: 16px;\n      overflow-y: scroll; }\n  .tumblr-follows[_ngcontent-%COMP%]   .followers[_ngcontent-%COMP%] {\n    margin-right: 16px; }\n  .tumblr-follows[_ngcontent-%COMP%]   .following[_ngcontent-%COMP%]   .follows-back[_ngcontent-%COMP%] {\n    color: #55efc4; }"]},357:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(358),o=n(1),r=n(177),u=[l.styles],i=o.ɵcrt({encapsulation:0,styles:u,data:{}});function a(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"div",[["class","blog-info"]],null,null,null,null,null)),o.ɵncd(null,0),(t()(),o.ɵeld(2,0,null,null,1,"div",[["class","follow-button"]],null,[[null,"click"]],function(t,e,n){var l=!0,o=t.component;"click"===e&&(l=!1!==o.updateBlogFollowStatus()&&l);return l},null,null)),(t()(),o.ɵted(3,null,[" ","\n"]))],null,function(t,e){t(e,3,0,e.component.isFollowing?"Unfollow":"Follow")})}function c(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-blog",[],[[8,"className",0]],null,null,a,i)),o.ɵdid(1,114688,null,0,r.BlogComponent,[],null,null)],function(t,e){t(e,1,0)},function(t,e){t(e,0,0,o.ɵnov(e,1).themeClasses)})}e.RenderType_BlogComponent=i,e.View_BlogComponent_0=a,e.View_BlogComponent_Host_0=c;var s=o.ɵccf("app-blog",r.BlogComponent,c,{isFollowing:"isFollowing",mediaType:"mediaType"},{onUserAction:"onUserAction"},["[media-type=tumblr]"]);e.BlogComponentNgFactory=s},358:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["[_nghost-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  padding: 8px;\n  border: 2px solid #fff; }\n  [_nghost-%COMP%]   .follow-button[_ngcontent-%COMP%] {\n    color: #fff;\n    font-weight: bold; }\n  .tumblr-theme[_nghost-%COMP%] {\n    background-color: #41668b; }\n    .tumblr-theme[_nghost-%COMP%]:hover {\n      border: 2px solid #74b9ff; }\n    .tumblr-theme[_nghost-%COMP%]   .follow-button[_ngcontent-%COMP%]:hover {\n      color: #74b9ff; }"]},359:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(360),o=n(1),r=n(361),u=n(182),i=n(365),a=n(183),c=n(89),s=n(90),p=n(54),d=n(176),m=[l.styles],f=o.ɵcrt({encapsulation:0,styles:m,data:{}});function g(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-nav",[],null,null,null,r.View_NavComponent_0,r.RenderType_NavComponent)),o.ɵdid(1,114688,null,0,u.NavComponent,[],null,null),(t()(),o.ɵeld(2,0,null,null,1,"app-auth",[],null,null,null,i.View_AuthComponent_0,i.RenderType_AuthComponent)),o.ɵdid(3,114688,null,0,a.AuthComponent,[c.AuthService,s.RedirectService],null,null),(t()(),o.ɵeld(4,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),o.ɵdid(5,212992,null,0,p.RouterOutlet,[p.ChildrenOutletContexts,o.ViewContainerRef,o.ComponentFactoryResolver,[8,null],o.ChangeDetectorRef],null,null)],function(t,e){t(e,1,0),t(e,3,0),t(e,5,0)},null)}function h(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-root",[],null,[["window","message"]],function(t,e,n){var l=!0;"window:message"===e&&(l=!1!==o.ɵnov(t,1).receivedPostedMessage(n)&&l);return l},g,f)),o.ɵdid(1,49152,null,0,d.AppComponent,[],null,null)],null,null)}e.RenderType_AppComponent=f,e.View_AppComponent_0=g,e.View_AppComponent_Host_0=h;var _=o.ɵccf("app-root",d.AppComponent,h,{},{},[]);e.AppComponentNgFactory=_},360:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},361:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(362),o=n(1),r=n(363),u=n(181),i=n(4),a=n(182),c=[l.styles],s=o.ɵcrt({encapsulation:0,styles:c,data:{}});function p(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(t()(),o.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),o.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"]},null)],function(t,e){t(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt)},null)}function d(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,2,"button",[],null,null,null,null,null)),(t()(),o.ɵeld(1,0,null,null,1,"app-nav-item",[],null,null,null,r.View_NavItemComponent_0,r.RenderType_NavItemComponent)),o.ɵdid(2,114688,null,0,u.NavItemComponent,[],{iconName:[0,"iconName"],altText:[1,"altText"],link:[2,"link"]},null)],function(t,e){t(e,2,0,e.context.$implicit.value.iconName,e.context.$implicit.value.alt,e.context.$implicit.value.link)},null)}function m(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,3,"nav",[],null,null,null,null,null)),(t()(),o.ɵand(16777216,null,null,2,null,p)),o.ɵdid(2,278528,null,0,i.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,i.KeyValuePipe,[o.KeyValueDiffers]),(t()(),o.ɵeld(4,0,null,null,3,"nav",[],null,null,null,null,null)),(t()(),o.ɵand(16777216,null,null,2,null,d)),o.ɵdid(6,278528,null,0,i.NgForOf,[o.ViewContainerRef,o.TemplateRef,o.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),o.ɵpid(0,i.KeyValuePipe,[o.KeyValueDiffers])],function(t,e){var n=e.component;t(e,2,0,o.ɵunv(e,2,0,o.ɵnov(e,3).transform(n.mediaData))),t(e,6,0,o.ɵunv(e,6,0,o.ɵnov(e,7).transform(n.navActions)))},null)}function f(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-nav",[],null,null,null,m,s)),o.ɵdid(1,114688,null,0,a.NavComponent,[],null,null)],function(t,e){t(e,1,0)},null)}e.RenderType_NavComponent=s,e.View_NavComponent_0=m,e.View_NavComponent_Host_0=f;var g=o.ɵccf("app-nav",a.NavComponent,f,{},{},[]);e.NavComponentNgFactory=g},362:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["[_nghost-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  max-width: 64px;\n  box-sizing: border-box;\n  background-color: #222f3e;\n  padding: 8px; }\n\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n  nav[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]:not(:last-child) {\n    border-bottom: 1px solid #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    background-color: transparent;\n    height: 48px;\n    border: none; }\n    nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background-color: #c8d6e5; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child) {\n    margin-top: 16px; }\n  nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 16px; }"]},363:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(364),o=n(1),r=n(54),u=n(4),i=n(181),a=[l.styles],c=o.ɵcrt({encapsulation:0,styles:a,data:{}});function s(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,2,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(t,e,n){var l=!0;"click"===e&&(l=!1!==o.ɵnov(t,1).onClick(n.button,n.ctrlKey,n.metaKey,n.shiftKey)&&l);return l},null,null)),o.ɵdid(1,671744,null,0,r.RouterLinkWithHref,[r.Router,r.ActivatedRoute,u.LocationStrategy],{routerLink:[0,"routerLink"]},null),(t()(),o.ɵeld(2,0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0]],null,null,null,null))],function(t,e){t(e,1,0,e.component.link)},function(t,e){var n=e.component;t(e,0,0,o.ɵnov(e,1).target,o.ɵnov(e,1).href),t(e,2,0,n.getIconPath(),n.altText)})}function p(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-nav-item",[],null,null,null,s,c)),o.ɵdid(1,114688,null,0,i.NavItemComponent,[],null,null)],function(t,e){t(e,1,0)},null)}e.RenderType_NavItemComponent=c,e.View_NavItemComponent_0=s,e.View_NavItemComponent_Host_0=p;var d=o.ɵccf("app-nav-item",i.NavItemComponent,p,{iconName:"iconName",altText:"altText",link:"link"},{},[]);e.NavItemComponentNgFactory=d},364:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=["img[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 4px; }"]},365:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=n(366),o=n(1),r=n(183),u=n(89),i=n(90),a=[l.styles],c=o.ɵcrt({encapsulation:0,styles:a,data:{}});function s(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"button",[],null,[[null,"click"]],function(t,e,n){var l=!0,o=t.component;"click"===e&&(l=!1!==o.auth()&&l);return l},null,null)),(t()(),o.ɵted(-1,null,["Auth"]))],null,null)}function p(t){return o.ɵvid(0,[(t()(),o.ɵeld(0,0,null,null,1,"app-auth",[],null,null,null,s,c)),o.ɵdid(1,114688,null,0,r.AuthComponent,[u.AuthService,i.RedirectService],null,null)],function(t,e){t(e,1,0)},null)}e.RenderType_AuthComponent=c,e.View_AuthComponent_0=s,e.View_AuthComponent_Host_0=p;var d=o.ɵccf("app-auth",r.AuthComponent,p,{},{},[]);e.AuthComponentNgFactory=d},366:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.styles=[""]},367:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(54),n(138).FollowComponent;var l=function(){};e.AppRoutingModule=l},368:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.SearchModule=l},369:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(){};e.FollowsModule=l},49:function(t,e,n){"use strict";var l,o;Object.defineProperty(e,"__esModule",{value:!0}),(l=e.media||(e.media={})).DeviantArt="DeviantArt",l.Twitter="Twitter",l.Tumblr="Tumblr",(o=e.userAction||(e.userAction={})).Auth="auth",o.Follow="follow",o.Followers="followers",o.Following="following",o.Posts="posts",o.Tags="tag",o.Unfollow="unfollow",e.mediaData={DeviantArt:{iconName:"deviantart.png",alt:"deviantArt"},Twitter:{iconName:"twitter.png",alt:"twitter"},Tumblr:{iconName:"tumblr.png",alt:"tumblr"}},e.navActions={Tags:{iconName:"promotion.png",alt:"search by tag"},Follows:{iconName:"follow.png",alt:"view follower information",link:"/following"},Engagement:{iconName:"heart.png",alt:"post engagement"}}},89:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(65);var l=n(49),o=n(139),r=n(76),u=n(1),i=n(65),a=function(){function t(t){this.http=t,this.tumblrAuthURL=o.urlForSite(l.media.Tumblr,l.userAction.Auth),this.tumblrRedirectSubject$=new r.Subject,this.deviantArtAuthURL=o.urlForSite(l.media.DeviantArt,l.userAction.Auth),this.daRedirectSubject$=new r.Subject}return t.prototype.redirectSubject$=function(t){switch(t){case l.media.DeviantArt:return this.daRedirectSubject$;case l.media.Tumblr:return this.tumblrRedirectSubject$}},t.prototype.authenticateUser=function(e){var n=this;console.log("Authenticate the user: ",e),this.showAuthorizationPage(e).subscribe(function(t){if(!t)throw new Error("Unable to authenticate the user for "+e+".");console.log("Prepare to redirect: ",t),n.redirectSubject$(e).next(t)},function(t){n.redirectSubject$(e).next(null)})},t.prototype.showAuthorizationPage=function(t){switch(t){case l.media.DeviantArt:return console.log("📘 Initiate DeviantArt authentication: ",this.deviantArtAuthURL),this.http.get(this.deviantArtAuthURL,{responseType:"text"});case l.media.Tumblr:return console.log("📘 Initiate Tumblr authentication: ",this.tumblrAuthURL),this.http.get(this.tumblrAuthURL,{responseType:"text"})}},t.ngInjectableDef=u.ɵɵdefineInjectable({factory:function(){return new t(u.ɵɵinject(i.HttpClient))},token:t,providedIn:"root"}),t}();e.AuthService=a},90:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(54);var l=n(1),o=n(54),r=n(4),u=function(){function t(t,e){this.router=t,this.document=e}return Object.defineProperty(t.prototype,"window",{get:function(){return this.document.defaultView},enumerable:!0,configurable:!0}),t.prototype.redirect=function(t,e){void 0===e&&(e="_blank");try{this.window.open(t,e)}catch(t){return t}},t.ngInjectableDef=l.ɵɵdefineInjectable({factory:function(){return new t(l.ɵɵinject(o.Router),l.ɵɵinject(r.DOCUMENT))},token:t,providedIn:"root"}),t}();e.RedirectService=u}},[[349,0,1,6]]]);