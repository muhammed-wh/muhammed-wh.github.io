!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).firebase=t()}(this,function(){"use strict";var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function v(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&(e[r]=v(e[r],t[r]));return e}var e,t,i,f=(i=Error,r(e=s,t=i),void(e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)),s);function o(){this.constructor=e}function s(e,t){var r=i.call(this,t)||this;return r.code=e,r.name="FirebaseError",Object.setPrototypeOf(r,s.prototype),Error.captureStackTrace&&Error.captureStackTrace(r,a.prototype.create),r}var a=(c.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=t[0]||{},i=this.service+"/"+e,o=this.errors[e],s=o?function(e,n){return e.replace(h,function(e,t){var r=n[t];return null!=r?r.toString():"<"+t+"?>"})}(o,n):"Error",a=this.serviceName+": "+s+" ("+i+").",c=new f(i,a),l=0,p=Object.keys(n);l<p.length;l++){var u=p[l];"_"!==u.slice(-1)&&(u in c&&console.warn('Overwriting FirebaseError base field "'+u+'" can cause unexpected behavior.'),c[u]=n[u])}return c},c);function c(e,t,r){this.service=e,this.serviceName=t,this.errors=r}var h=/\{\$([^}]+)}/g;function d(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function l(e,t){var r=new b(e,t);return r.subscribe.bind(r)}var p,u,b=(y.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},y.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},y.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},y.prototype.subscribe=function(e,t,r){var n,i=this;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");void 0===(n=function(e,t){if("object"!=typeof e||null===e)return!1;for(var r=0,n=t;r<n.length;r++){var i=n[r];if(i in e&&"function"==typeof e[i])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:r}).next&&(n.next=g),void 0===n.error&&(n.error=g),void 0===n.complete&&(n.complete=g);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{i.finalError?n.error(i.finalError):n.complete()}catch(e){}}),this.observers.push(n),o},y.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},y.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},y.prototype.sendOne=function(e,t){var r=this;this.task.then(function(){if(void 0!==r.observers&&void 0!==r.observers[e])try{t(r.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},y.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},y);function y(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(r)}).catch(function(e){r.error(e)})}function g(){}function m(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),i=0;for(t=0;t<r;t++)for(var o=arguments[t],s=0,a=o.length;s<a;s++,i++)n[i]=o[s];return n}(u=p=p||{})[u.DEBUG=0]="DEBUG",u[u.VERBOSE=1]="VERBOSE",u[u.INFO=2]="INFO",u[u.WARN=3]="WARN",u[u.ERROR=4]="ERROR",u[u.SILENT=5]="SILENT";function _(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(t<e.logLevel)){var i=(new Date).toISOString();switch(t){case p.DEBUG:case p.VERBOSE:console.log.apply(console,m(["["+i+"]  "+e.name+":"],r));break;case p.INFO:console.info.apply(console,m(["["+i+"]  "+e.name+":"],r));break;case p.WARN:console.warn.apply(console,m(["["+i+"]  "+e.name+":"],r));break;case p.ERROR:console.error.apply(console,m(["["+i+"]  "+e.name+":"],r));break;default:throw new Error("Attempted to log a message with an invalid logType (value: "+t+")")}}}var E,N=p.INFO,O=(Object.defineProperty(A.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in p))throw new TypeError("Invalid value assigned to `logLevel`");this._logLevel=e},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!0,configurable:!0}),A.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,m([this,p.DEBUG],e))},A.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,m([this,p.VERBOSE],e))},A.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,m([this,p.INFO],e))},A.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,m([this,p.WARN],e))},A.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,m([this,p.ERROR],e))},A);function A(e){this.name=e,this._logLevel=N,this._logHandler=_}var k=((E={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",E["bad-app-name"]="Illegal App name: '{$appName}",E["duplicate-app"]="Firebase App named '{$appName}' already exists",E["app-deleted"]="Firebase App named '{$appName}' already deleted",E["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",E),w=new a("app","Firebase",k),R="[DEFAULT]",L=(Object.defineProperty(T.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!0,configurable:!0}),Object.defineProperty(T.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(T.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),T.prototype.delete=function(){var a=this;return new Promise(function(e){a.checkDestroyed_(),e()}).then(function(){a.firebase_.INTERNAL.removeApp(a.name_);for(var e=[],t=0,r=Object.keys(a.services_);t<r.length;t++)for(var n=r[t],i=0,o=Object.keys(a.services_[n]);i<o.length;i++){var s=o[i];e.push(a.services_[n][s])}return Promise.all(e.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}))}).then(function(){a.isDeleted_=!0,a.services_={}})},T.prototype._getService=function(e,t){if(void 0===t&&(t=R),this.checkDestroyed_(),this.services_[e]||(this.services_[e]={}),!this.services_[e][t]){var r=t!==R?t:void 0,n=this.firebase_.INTERNAL.factories[e](this,this.extendApp.bind(this),r);this.services_[e][t]=n}return this.services_[e][t]},T.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=R),this.services_[e]&&this.services_[e][t]&&delete this.services_[e][t]},T.prototype.extendApp=function(e){if(v(this,e),e.INTERNAL){if(e.INTERNAL.addAuthTokenListener){for(var t=0,r=this.tokenListeners_;t<r.length;t++){var n=r[t];this.INTERNAL.addAuthTokenListener(n)}this.tokenListeners_=[]}if(e.INTERNAL.analytics){for(var i=0,o=this.analyticsEventRequests_;i<o.length;i++){var s=o[i];this.INTERNAL.analytics.logEvent.apply(void 0,s)}this.analyticsEventRequests_=[]}}},T.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw w.create("app-deleted",{appName:this.name_})},T);function T(e,t,r){var n=this;this.firebase_=r,this.isDeleted_=!1,this.services_={},this.tokenListeners_=[],this.analyticsEventRequests_=[],this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=function(e){return v(void 0,e)}(e);var i=this;this.INTERNAL={getUid:function(){return null},getToken:function(){return Promise.resolve(null)},addAuthTokenListener:function(e){n.tokenListeners_.push(e),setTimeout(function(){return e(null)},0)},removeAuthTokenListener:function(t){n.tokenListeners_=n.tokenListeners_.filter(function(e){return e!==t})},analytics:{logEvent:function(){i.analyticsEventRequests_.push(arguments)}}}}L.prototype.name&&L.prototype.options||L.prototype.delete||console.log("dc");var I="7.2.1",j=new O("@firebase/app");function D(s){var o={},a={},c={},l={__esModule:!0,initializeApp:function(e,t){void 0===t&&(t={});if("object"!=typeof t||null===t){t={name:t}}var r=t;void 0===r.name&&(r.name=R);var n=r.name;if("string"!=typeof n||!n)throw w.create("bad-app-name",{appName:String(n)});if(d(o,n))throw w.create("duplicate-app",{appName:n});var i=new s(e,r,l);return f(o[n]=i,"create"),i},app:p,apps:null,SDK_VERSION:I,INTERNAL:{registerService:function(r,e,t,n,i){void 0===i&&(i=!1);if(a[r])return j.debug("There were multiple attempts to register service "+r+"."),l[r];a[r]=e,n&&(c[r]=n,u().forEach(function(e){n("create",e)}));function o(e){if(void 0===e&&(e=p()),"function"!=typeof e[r])throw w.create("invalid-app-argument",{appName:r});return e[r]()}void 0!==t&&v(o,t);return l[r]=o,s.prototype[r]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._getService.bind(this,r).apply(this,i?e:[])},o},removeApp:function(e){f(o[e],"delete"),delete o[e]},factories:a,useAsService:h}};function p(e){if(!d(o,e=e||R))throw w.create("no-app",{appName:e});return o[e]}function u(){return Object.keys(o).map(function(e){return o[e]})}function f(e,t){for(var r=0,n=Object.keys(a);r<n.length;r++){var i=h(e,n[r]);if(null===i)return;c[i]&&c[i](t,e)}}function h(e,t){return"serverAuth"===t?null:t}return l.default=l,Object.defineProperty(l,"apps",{get:u}),p.App=s,l}if("object"==typeof self&&self.self===self&&void 0!==self.firebase){j.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var F=self.firebase.SDK_VERSION;F&&0<=F.indexOf("LITE")&&j.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var S=function e(){var t=D(L);return t.INTERNAL=n(n({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){v(t,e)},createSubscribe:l,ErrorFactory:a,deepExtend:v}),t}(),P=S.initializeApp;return S.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}()&&j.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),P.apply(void 0,e)},S});

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],t):t((e=e||self).firebase)}(this,function(Ze){"use strict";try{(function(){Ze=Ze&&Ze.hasOwnProperty("default")?Ze.default:Ze;var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function e(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function l(i,s,a,c){return new(a=a||Promise)(function(e,t){function n(e){try{o(c.next(e))}catch(e){t(e)}}function r(e){try{o(c.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new a(function(e){e(t.value)}).then(n,r)}o((c=c.apply(i,s||[])).next())})}function d(n,r){var o,i,s,e,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=2&t[0]?i.return:t[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[2&t[0],s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=r.call(n,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function n(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||0<t--)&&!(r=i.next()).done;)s.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}function o(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e}var i,h=(e(a,i=Error),a);function a(e,t){var n=i.call(this,t)||this;return n.code=e,n.name="FirebaseError",Object.setPrototypeOf(n,a.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,c.prototype.create),n}var c=(t.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=t[0]||{},o=this.service+"/"+e,i=this.errors[e],s=i?function(e,r){return e.replace(p,function(e,t){var n=r[t];return null!=n?n.toString():"<"+t+"?>"})}(i,r):"Error",a=this.serviceName+": "+s+" ("+o+").",c=new h(o,a),u=0,f=Object.keys(r);u<f.length;u++){var l=f[u];"_"!==l.slice(-1)&&(l in c&&console.warn('Overwriting FirebaseError base field "'+l+'" can cause unexpected behavior.'),c[l]=r[l])}return c},t);function t(e,t,n){this.service=e,this.serviceName=t,this.errors=n}var p=/\{\$([^}]+)}/g;function u(e,t){var n=new f(e,t);return n.subscribe.bind(n)}var f=(v.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},v.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},v.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},v.prototype.subscribe=function(e,t,n){var r,o=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var o=r[n];if(o in e&&"function"==typeof e[o])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=b),void 0===r.error&&(r.error=b),void 0===r.complete&&(r.complete=b);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?r.error(o.finalError):r.complete()}catch(e){}}),this.observers.push(r),i},v.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},v.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},v.prototype.sendOne=function(e,t){var n=this;this.task.then(function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},v.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},v);function v(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(n)}).catch(function(e){n.error(e)})}function b(){}function g(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function y(n,r,o){var i,e=new Promise(function(e,t){g(i=n[r].apply(n,o)).then(e,t)});return e.request=i,e}function w(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function m(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return y(this[n],e,arguments)})})}function k(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function T(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return function(e,t,n){var r=y(e,t,n);return r.then(function(e){if(e)return new _(e,r.request)})}(this[n],e,arguments)})})}function S(e){this._index=e}function _(e,t){this._cursor=e,this._request=t}function I(e){this._store=e}function P(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function D(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new P(n)}function M(e){this._db=e}w(S,"_index",["name","keyPath","multiEntry","unique"]),m(S,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),T(S,"_index",IDBIndex,["openCursor","openKeyCursor"]),w(_,"_cursor",["direction","key","primaryKey","value"]),m(_,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(_.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),g(t._request).then(function(e){if(e)return new _(e,t._request)})})})}),I.prototype.createIndex=function(){return new S(this._store.createIndex.apply(this._store,arguments))},I.prototype.index=function(){return new S(this._store.index.apply(this._store,arguments))},w(I,"_store",["name","keyPath","indexNames","autoIncrement"]),m(I,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),T(I,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),k(I,"_store",IDBObjectStore,["deleteIndex"]),P.prototype.objectStore=function(){return new I(this._tx.objectStore.apply(this._tx,arguments))},w(P,"_tx",["objectStoreNames","mode"]),k(P,"_tx",IDBTransaction,["abort"]),D.prototype.createObjectStore=function(){return new I(this._db.createObjectStore.apply(this._db,arguments))},w(D,"_db",["name","version","objectStoreNames"]),k(D,"_db",IDBDatabase,["deleteObjectStore","close"]),M.prototype.transaction=function(){return new P(this._db.transaction.apply(this._db,arguments))},w(M,"_db",["name","version","objectStoreNames"]),k(M,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(o){[I,S].forEach(function(e){o in e.prototype&&(e.prototype[o.replace("open","iterate")]=function(){var e=function(e){return Array.prototype.slice.call(e)}(arguments),t=e[e.length-1],n=this._store||this._index,r=n[o].apply(n,e.slice(0,-1));r.onsuccess=function(){t(r.result)}})})}),[S,I].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var r=this,o=[];return new Promise(function(t){r.iterateCursor(e,function(e){e?(o.push(e.value),void 0===n||o.length!=n?e.continue():t(o)):t(o)})})})});var C,E=1e4,N="w:0.3.1",x="FIS_v2",j="https://firebaseinstallations.googleapis.com/v1",O=36e5,K=((C={})["missing-app-config-values"]="Missing App configuration values.",C["create-installation-failed"]="Could not register Firebase Installation.",C["generate-token-failed"]="Could not generate Auth Token.",C["not-registered"]="Firebase Installation is not registered.",C["installation-not-found"]="Firebase Installation not found.",C["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',C["app-offline"]="Could not process request. Application offline.",C["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",C),A=new c("installations","Installations",K);function V(e){return e instanceof h&&e.code.includes("request-failed")}function q(e){if(!e||!e.options)throw A.create("missing-app-config-values");var t=e.name,n=e.options,r=n.projectId,o=n.apiKey,i=n.appId;if(!(t&&r&&o&&i))throw A.create("missing-app-config-values");return{appName:t,projectId:r,apiKey:o,appId:i}}function W(e){var t=e.projectId;return j+"/projects/"+t+"/installations"}function U(e){return{token:e.token,requestStatus:2,expiresIn:function(e){return Number(e.replace("s","000"))}(e.expiresIn),creationTime:Date.now()}}function F(r,o){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,o.json()];case 1:return t=e.sent(),n=t.error,[2,A.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})]}})})}function R(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function L(e,t){var n=t.refreshToken,r=R(e);return r.append("Authorization",function(e){return x+" "+e}(n)),r}function B(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,n()];case 1:return 500<=(t=e.sent()).status&&t.status<600?[2,n()]:[2,t]}})})}function H(t){return new Promise(function(e){setTimeout(e,t)})}var $=/^[cdef][\w-]{21}$/,G="";function z(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return function(e){return btoa(String.fromCharCode.apply(String,o(e))).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22)}(e);return $.test(t)?t:G}catch(e){return G}}var J,Y="firebase-installations-database",Q=1,X="firebase-installations-store",Z=null;function ee(){return Z=Z||function(e,t,n){var r=y(indexedDB,"open",[e,t]),o=r.request;return o&&(o.onupgradeneeded=function(e){n&&n(new D(o.result,e.oldVersion,o.transaction))}),r.then(function(e){return new M(e)})}(Y,Q,function(e){switch(e.oldVersion){case 0:e.createObjectStore(X)}})}function te(o,i){return l(this,void 0,void 0,function(){var t,n,r;return d(this,function(e){switch(e.label){case 0:return t=oe(o),[4,ee()];case 1:return n=e.sent(),[4,(r=n.transaction(X,"readwrite")).objectStore(X).put(i,t)];case 2:return e.sent(),[4,r.complete];case 3:return e.sent(),[2,i]}})})}function ne(o){return l(this,void 0,void 0,function(){var t,n,r;return d(this,function(e){switch(e.label){case 0:return t=oe(o),[4,ee()];case 1:return n=e.sent(),[4,(r=n.transaction(X,"readwrite")).objectStore(X).delete(t)];case 2:return e.sent(),[4,r.complete];case 3:return e.sent(),[2]}})})}function re(a,c){return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:return t=oe(a),[4,ee()];case 1:return n=e.sent(),r=n.transaction(X,"readwrite"),[4,(o=r.objectStore(X)).get(t)];case 2:return i=e.sent(),void 0!==(s=c(i))?[3,4]:[4,o.delete(t)];case 3:return e.sent(),[3,6];case 4:return[4,o.put(s,t)];case 5:e.sent(),e.label=6;case 6:return[4,r.complete];case 7:return e.sent(),[2,s]}})})}function oe(e){return e.appName+"!"+e.appId}function ie(o){return l(this,void 0,void 0,function(){var r,t,n;return d(this,function(e){switch(e.label){case 0:return[4,re(o,function(e){var t=function(e){return ae(e||{fid:z(),registrationStatus:0})}(e),n=function(e,t){{if(0!==t.registrationStatus)return 1===t.registrationStatus?{installationEntry:t,registrationPromise:function(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,se(n)];case 1:t=e.sent(),e.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,H(100)];case 3:return e.sent(),[4,se(n)];case 4:return t=e.sent(),[3,2];case 5:if(0===t.registrationStatus)throw A.create("create-installation-failed");return[2,t]}})})}(e)}:{installationEntry:t};if(!navigator.onLine){var n=Promise.reject(A.create("app-offline"));return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},o=function(r,o){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,7]),[4,function(a,e){var c=e.fid;return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:return t=W(a),n=R(a),r={fid:c,authVersion:x,appId:a.appId,sdkVersion:N},o={method:"POST",headers:n,body:JSON.stringify(r)},[4,B(function(){return fetch(t,o)})];case 1:return(i=e.sent()).ok?[4,i.json()]:[3,3];case 2:return s=e.sent(),[2,{fid:s.fid||c,registrationStatus:2,refreshToken:s.refreshToken,authToken:U(s.authToken)}];case 3:return[4,F("Create Installation",i)];case 4:throw e.sent()}})})}(r,o)];case 1:return t=e.sent(),[2,te(r,t)];case 2:return V(n=e.sent())&&409===n.serverCode?[4,ne(r)]:[3,4];case 3:return e.sent(),[3,6];case 4:return[4,te(r,{fid:o.fid,registrationStatus:0})];case 5:e.sent(),e.label=6;case 6:throw n;case 7:return[2]}})})}(e,r);return{installationEntry:r,registrationPromise:o}}}(o,t);return r=n.registrationPromise,n.installationEntry})];case 1:return(t=e.sent()).fid!==G?[3,3]:(n={},[4,r]);case 2:return[2,(n.installationEntry=e.sent(),n)];case 3:return[2,{installationEntry:t,registrationPromise:r}]}})})}function se(e){return re(e,function(e){if(!e)throw A.create("installation-not-found");return ae(e)})}function ae(e){return function(e){return 1===e.registrationStatus&&e.registrationTime+E<Date.now()}(e)?{fid:e.fid,registrationStatus:0}:e}function ce(a,c){return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:return t=function(e,t){var n=t.fid;return W(e)+"/"+n+"/authTokens:generate"}(a,c),n=L(a,c),r={installation:{sdkVersion:N}},o={method:"POST",headers:n,body:JSON.stringify(r)},[4,B(function(){return fetch(t,o)})];case 1:return(i=e.sent()).ok?[4,i.json()]:[3,3];case 2:return s=e.sent(),[2,U(s)];case 3:return[4,F("Generate Auth Token",i)];case 4:throw e.sent()}})})}function ue(o,i){return void 0===i&&(i=!1),l(this,void 0,void 0,function(){var r,t,n;return d(this,function(e){switch(e.label){case 0:return[4,re(o,function(e){if(!le(e))throw A.create("not-registered");var t=e.authToken;if(!i&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+O}(e)}(t))return e;if(1===t.requestStatus)return r=function(r){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,fe(r)];case 1:t=e.sent(),e.label=2;case 2:return 1!==t.authToken.requestStatus?[3,5]:[4,H(100)];case 3:return e.sent(),[4,fe(r)];case 4:return t=e.sent(),[3,2];case 5:if(0===(n=t.authToken).requestStatus)throw A.create("generate-token-failed");return[2,n]}})})}(o),e;if(!navigator.onLine)throw A.create("app-offline");var n=function(e){var t={requestStatus:1,requestTime:Date.now()};return s(s({},e),{authToken:t})}(e);return r=function(o,i){return l(this,void 0,void 0,function(){var t,n,r;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,3,,8]),[4,ce(o,i)];case 1:return t=e.sent(),r=s(s({},i),{authToken:t}),[4,te(o,r)];case 2:return e.sent(),[2,t];case 3:return!V(n=e.sent())||401!==n.serverCode&&404!==n.serverCode?[3,5]:[4,ne(o)];case 4:return e.sent(),[3,7];case 5:return r=s(s({},i),{authToken:{requestStatus:0}}),[4,te(o,r)];case 6:e.sent(),e.label=7;case 7:throw n;case 8:return[2]}})})}(o,n),n})];case 1:return t=e.sent(),r?[4,r]:[3,3];case 2:return n=e.sent(),[3,4];case 3:n=t.authToken,e.label=4;case 4:return[2,n.token]}})})}function fe(e){return re(e,function(e){if(!le(e))throw A.create("not-registered");return function(e){return 1===e.requestStatus&&e.requestTime+E<Date.now()}(e.authToken)?s(s({},e),{authToken:{requestStatus:0}}):e})}function le(e){return void 0!==e&&2===e.registrationStatus}function de(n,r){return void 0===r&&(r=!1),l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,function(o){return l(this,void 0,void 0,function(){var t,n,r;return d(this,function(e){switch(e.label){case 0:return[4,ie(o)];case 1:return t=e.sent(),n=t.installationEntry,(r=t.registrationPromise)?[4,r]:[3,3];case 2:return e.sent(),[3,4];case 3:if(2!==n.registrationStatus)throw A.create("create-installation-failed");e.label=4;case 4:return[2]}})})}(t=q(n))];case 1:return e.sent(),[2,ue(t,r)]}})})}function he(i,s){return l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:return t=function(e,t){var n=t.fid;return W(e)+"/"+n}(i,s),n=L(i,s),r={method:"DELETE",headers:n},[4,B(function(){return fetch(t,r)})];case 1:return(o=e.sent()).ok?[3,3]:[4,F("Delete Installation",o)];case 2:throw e.sent();case 3:return[2]}})})}Ze.INTERNAL.registerService("installations",function(t){return q(t),{app:t,getId:function(){return function(i){return l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:return[4,ie(t=q(i))];case 1:return n=e.sent(),r=n.installationEntry,(o=n.registrationPromise)&&o.catch(function(){}),2===r.registrationStatus&&ue(t).catch(function(){}),[2,r.fid]}})})}(t)},getToken:function(e){return de(t,e)},delete:function(){return function(r){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,re(t=q(r),function(e){if(!e||0!==e.registrationStatus)return e})];case 1:if(!(n=e.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw A.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw A.create("app-offline");case 3:return[4,he(t,n)];case 4:return e.sent(),[4,ne(t)];case 5:e.sent(),e.label=6;case 6:return[2]}})})}(t)}}});var pe,ve,be=((J={})["only-available-in-window"]="This method is available in a Window context.",J["only-available-in-sw"]="This method is available in a service worker context.",J["should-be-overriden"]="This method should be overriden by extended classes.",J["bad-sender-id"]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",J["permission-default"]="The required permissions were not granted and dismissed instead.",J["permission-blocked"]="The required permissions were not granted and blocked instead.",J["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",J["notifications-blocked"]="Notifications have been blocked.",J["failed-serviceworker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",J["sw-registration-expected"]="A service worker registration was the expected input.",J["get-subscription-failed"]="There was an error when trying to get any existing Push Subscriptions.",J["invalid-saved-token"]="Unable to access details of the saved token.",J["sw-reg-redundant"]="The service worker being used for push was made redundant.",J["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$errorInfo}",J["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",J["token-unsubscribe-failed"]="A problem occured while unsubscribing the user from FCM: {$errorInfo}",J["token-update-failed"]="A problem occured while updating the user from FCM: {$errorInfo}",J["token-update-no-token"]="FCM returned no token when updating the user to push.",J["use-sw-before-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",J["invalid-delete-token"]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",J["delete-token-not-found"]="The deletion attempt for token could not be performed as the token was not found.",J["delete-scope-not-found"]="The deletion attempt for service worker scope could not be performed as the scope was not found.",J["bg-handler-function-expected"]="The input to setBackgroundMessageHandler() must be a function.",J["no-window-client-to-msg"]="An attempt was made to message a non-existant window client.",J["unable-to-resubscribe"]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$errorInfo}",J["no-fcm-token-for-resubscribe"]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",J["failed-to-delete-token"]="Unable to delete the currently saved token.",J["no-sw-in-reg"]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",J["bad-scope"]="The service worker scope must be a string with at least one character.",J["bad-vapid-key"]="The public VAPID key is not a Uint8Array with 65 bytes.",J["bad-subscription"]="The subscription must be a valid PushSubscription.",J["bad-token"]="The FCM Token used for storage / lookup was not a valid token string.",J["failed-delete-vapid-key"]="The VAPID key could not be deleted.",J["invalid-public-vapid-key"]="The public VAPID key must be a string.",J["use-public-key-before-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",J["public-vapid-key-decryption-failed"]="The public VAPID key did not equal 65 bytes when decrypted.",J),ge=new c("messaging","Messaging",be),ye=new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110]),we="google.c.a.c_id";function me(e,t){if(null==e||null==t)return!1;if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;for(var n=new DataView(e),r=new DataView(t),o=0;o<e.byteLength;o++)if(n.getUint8(o)!==r.getUint8(o))return!1;return!0}function ke(e){return function(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,o(t)))}(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}(ve=pe=pe||{}).PUSH_MSG_RECEIVED="push-msg-received",ve.NOTIFICATION_CLICKED="notification-clicked";var Te=(Se.prototype.getToken=function(a,c,u){return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:return[4,Ie(a)];case 1:t=e.sent(),n=Pe(c,u),r={method:"POST",headers:t,body:JSON.stringify(n)},e.label=2;case 2:return e.trys.push([2,5,,6]),[4,fetch(_e(a),r)];case 3:return[4,e.sent().json()];case 4:return o=e.sent(),[3,6];case 5:throw i=e.sent(),ge.create("token-subscribe-failed",{errorInfo:i});case 6:if(o.error)throw s=o.error.message,ge.create("token-subscribe-failed",{errorInfo:s});if(!o.token)throw ge.create("token-subscribe-no-token");return[2,o.token]}})})},Se.prototype.updateToken=function(a,c,u,f){return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:return[4,Ie(c)];case 1:t=e.sent(),n=Pe(u,f),r={method:"PATCH",headers:t,body:JSON.stringify(n)},e.label=2;case 2:return e.trys.push([2,5,,6]),[4,fetch(_e(c)+"/"+a.fcmToken,r)];case 3:return[4,e.sent().json()];case 4:return o=e.sent(),[3,6];case 5:throw i=e.sent(),ge.create("token-update-failed",{errorInfo:i});case 6:if(o.error)throw s=o.error.message,ge.create("token-update-failed",{errorInfo:s});if(!o.token)throw ge.create("token-update-no-token");return[2,o.token]}})})},Se.prototype.deleteToken=function(s,a){return l(this,void 0,void 0,function(){var t,n,r,o,i;return d(this,function(e){switch(e.label){case 0:return[4,Ie(s)];case 1:t=e.sent(),n={method:"DELETE",headers:t},e.label=2;case 2:return e.trys.push([2,5,,6]),[4,fetch(_e(s)+"/"+a.fcmToken,n)];case 3:return[4,e.sent().json()];case 4:if((r=e.sent()).error)throw o=r.error.message,ge.create("token-unsubscribe-failed",{errorInfo:o});return[3,6];case 5:throw i=e.sent(),ge.create("token-unsubscribe-failed",{errorInfo:i});case 6:return[2]}})})},Se);function Se(){}function _e(e){return"https://fcmregistrations.googleapis.com/v1/projects/"+e.options.projectId+"/registrations"}function Ie(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,n.installations().getToken()];case 1:return t=e.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.options.apiKey,"x-goog-firebase-installations-auth":"FIS "+t})]}})})}function Pe(e,t){var n=ke(e.getKey("p256dh")),r=ke(e.getKey("auth")),o={web:{endpoint:e.endpoint,p256dh:n,auth:r}};return me(t.buffer,ye.buffer)||(o.web.applicationPubKey=ke(t)),o}function De(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),o=0;o<n.length;++o)r[o]=n.charCodeAt(o);return r}var Me="undefined",Ce="fcm_token_object_Store";function Ee(t){var n=indexedDB.open(Me);n.onerror=function(e){},n.onsuccess=function(e){!function(n,r){if(n.objectStoreNames.contains(Ce)){var e=n.transaction(Ce).objectStore(Ce),o=new Te,i=e.openCursor();i.onerror=function(e){console.warn("Unable to cleanup old IDB.",e)},i.onsuccess=function(){var e=i.result;if(e){var t=e.value;o.deleteToken(r,t),e.continue()}else n.close(),indexedDB.deleteDatabase(Me)}}}(n.result,t)}}var Ne=(xe.prototype.get=function(t){return this.createTransaction(function(e){return e.get(t)})},xe.prototype.getIndex=function(t,n){return this.createTransaction(function(e){return e.index(t).get(n)})},xe.prototype.put=function(t){return this.createTransaction(function(e){return e.put(t)},"readwrite")},xe.prototype.delete=function(t){return this.createTransaction(function(e){return e.delete(t)},"readwrite")},xe.prototype.closeDatabase=function(){return l(this,void 0,void 0,function(){return d(this,function(e){switch(e.label){case 0:return this.dbPromise?[4,this.dbPromise]:[3,2];case 1:e.sent().close(),this.dbPromise=null,e.label=2;case 2:return[2]}})})},xe.prototype.createTransaction=function(i,s){return void 0===s&&(s="readonly"),l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:return[4,this.getDb()];case 1:return t=e.sent(),n=t.transaction(this.objectStoreName,s),r=n.objectStore(this.objectStoreName),[4,function(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}(i(r))];case 2:return o=e.sent(),[2,new Promise(function(e,t){n.oncomplete=function(){e(o)},n.onerror=function(){t(n.error)}})]}})})},xe.prototype.getDb=function(){var r=this;return this.dbPromise||(this.dbPromise=new Promise(function(e,t){var n=indexedDB.open(r.dbName,r.dbVersion);n.onsuccess=function(){e(n.result)},n.onerror=function(){r.dbPromise=null,t(n.error)},n.onupgradeneeded=function(e){return r.onDbUpgrade(n,e)}})),this.dbPromise},xe);function xe(){this.dbPromise=null}var je,Oe=(e(Ke,je=Ne),Ke.prototype.onDbUpgrade=function(e,t){var n=e.result;switch(t.oldVersion){case 0:(o=n.createObjectStore(this.objectStoreName,{keyPath:"swScope"})).createIndex("fcmSenderId","fcmSenderId",{unique:!1}),o.createIndex("fcmToken","fcmToken",{unique:!0});case 1:Ee(this.app);case 2:var r=(o=e.transaction.objectStore(this.objectStoreName)).openCursor();r.onsuccess=function(){var e=r.result;if(e){var t=e.value,n=s({},t);t.createTime||(n.createTime=Date.now()),"string"==typeof t.vapidKey&&(n.vapidKey=De(t.vapidKey)),"string"==typeof t.auth&&(n.auth=De(t.auth).buffer),"string"==typeof t.auth&&(n.p256dh=De(t.p256dh).buffer),"string"==typeof t.fcmPushSet&&delete n.fcmPushSet,e.update(n),e.continue()}};break;case 3:var o,i=(o=e.transaction.objectStore(this.objectStoreName)).openCursor();i.onsuccess=function(){var e=i.result;if(e){var t=e.value,n=s({},t);"string"==typeof t.fcmPushSet&&delete n.fcmPushSet,e.update(n),e.continue()}}}},Ke.prototype.getTokenDetailsFromToken=function(t){return l(this,void 0,void 0,function(){return d(this,function(e){if(!t)throw ge.create("bad-token");return Ae({fcmToken:t}),[2,this.getIndex("fcmToken",t)]})})},Ke.prototype.getTokenDetailsFromSWScope=function(t){return l(this,void 0,void 0,function(){return d(this,function(e){if(!t)throw ge.create("bad-scope");return Ae({swScope:t}),[2,this.get(t)]})})},Ke.prototype.saveTokenDetails=function(t){return l(this,void 0,void 0,function(){return d(this,function(e){if(!t.swScope)throw ge.create("bad-scope");if(!t.vapidKey)throw ge.create("bad-vapid-key");if(!t.endpoint||!t.auth||!t.p256dh)throw ge.create("bad-subscription");if(!t.fcmSenderId)throw ge.create("bad-sender-id");if(!t.fcmToken)throw ge.create("bad-token");return Ae(t),[2,this.put(t)]})})},Ke.prototype.deleteToken=function(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return"string"!=typeof n||0===n.length?[2,Promise.reject(ge.create("invalid-delete-token"))]:[4,this.getTokenDetailsFromToken(n)];case 1:if(!(t=e.sent()))throw ge.create("delete-token-not-found");return[4,this.delete(t.swScope)];case 2:return e.sent(),[2,t]}})})},Ke);function Ke(e){var t=je.call(this)||this;return t.app=e,t.dbName="fcm_token_details_db",t.dbVersion=4,t.objectStoreName="fcm_token_object_Store",t}function Ae(e){if(e.fcmToken&&("string"!=typeof e.fcmToken||0===e.fcmToken.length))throw ge.create("bad-token");if(e.swScope&&("string"!=typeof e.swScope||0===e.swScope.length))throw ge.create("bad-scope");if(e.vapidKey&&(!(e.vapidKey instanceof Uint8Array)||65!==e.vapidKey.length))throw ge.create("bad-vapid-key");if(e.endpoint&&("string"!=typeof e.endpoint||0===e.endpoint.length))throw ge.create("bad-subscription");if(e.auth&&!(e.auth instanceof ArrayBuffer))throw ge.create("bad-subscription");if(e.p256dh&&!(e.p256dh instanceof ArrayBuffer))throw ge.create("bad-subscription");if(e.fcmSenderId&&("string"!=typeof e.fcmSenderId||0===e.fcmSenderId.length))throw ge.create("bad-sender-id")}var Ve,qe=(e(We,Ve=Ne),We.prototype.onDbUpgrade=function(e){e.result.createObjectStore(this.objectStoreName,{keyPath:"swScope"})},We.prototype.getVapidFromSWScope=function(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:if("string"!=typeof n||0===n.length)throw ge.create("bad-scope");return[4,this.get(n)];case 1:return[2,(t=e.sent())?t.vapidKey:void 0]}})})},We.prototype.saveVapidDetails=function(n,r){return l(this,void 0,void 0,function(){var t;return d(this,function(e){if("string"!=typeof n||0===n.length)throw ge.create("bad-scope");if(null===r||65!==r.length)throw ge.create("bad-vapid-key");return t={swScope:n,vapidKey:r},[2,this.put(t)]})})},We.prototype.deleteVapidDetails=function(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,this.getVapidFromSWScope(n)];case 1:if(!(t=e.sent()))throw ge.create("delete-scope-not-found");return[4,this.delete(n)];case 2:return e.sent(),[2,t]}})})},We);function We(){var e=null!==Ve&&Ve.apply(this,arguments)||this;return e.dbName="fcm_vapid_details_db",e.dbVersion=1,e.objectStoreName="fcm_vapid_object_Store",e}var Ue=(Fe.prototype.getToken=function(){return l(this,void 0,void 0,function(){var t,n,r,o,i;return d(this,function(e){switch(e.label){case 0:if("denied"===(t=this.getNotificationPermission_()))throw ge.create("notifications-blocked");return"granted"!==t?[2,null]:[4,this.getSWRegistration_()];case 1:return n=e.sent(),[4,this.getPublicVapidKey_()];case 2:return r=e.sent(),[4,this.getPushSubscription(n,r)];case 3:return o=e.sent(),[4,this.tokenDetailsModel.getTokenDetailsFromSWScope(n.scope)];case 4:return(i=e.sent())?[2,this.manageExistingToken(n,o,r,i)]:[2,this.getNewToken(n,o,r)]}})})},Fe.prototype.manageExistingToken=function(t,n,r,o){return l(this,void 0,void 0,function(){return d(this,function(e){switch(e.label){case 0:return function(e,t,n){if(!n.vapidKey||!me(t.buffer,n.vapidKey.buffer))return!1;var r=e.endpoint===n.endpoint,o=me(e.getKey("auth"),n.auth),i=me(e.getKey("p256dh"),n.p256dh);return r&&o&&i}(n,r,o)?Date.now()<o.createTime+6048e5?[2,o.fcmToken]:[2,this.updateToken(t,n,r,o)]:[3,1];case 1:return[4,this.deleteTokenFromDB(o.fcmToken)];case 2:return e.sent(),[2,this.getNewToken(t,n,r)];case 3:return[2]}})})},Fe.prototype.updateToken=function(o,i,s,a){return l(this,void 0,void 0,function(){var t,n,r;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,4,,6]),[4,this.subscriptionManager.updateToken(a,this.app,i,s)];case 1:return t=e.sent(),n={swScope:o.scope,vapidKey:s,fcmSenderId:this.app.options.messagingSenderId,fcmToken:t,createTime:Date.now(),endpoint:i.endpoint,auth:i.getKey("auth"),p256dh:i.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(n)];case 2:return e.sent(),[4,this.vapidDetailsModel.saveVapidDetails(o.scope,s)];case 3:return e.sent(),[2,t];case 4:return r=e.sent(),[4,this.deleteToken(a.fcmToken)];case 5:throw e.sent(),r;case 6:return[2]}})})},Fe.prototype.getNewToken=function(r,o,i){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,this.subscriptionManager.getToken(this.app,o,i)];case 1:return t=e.sent(),n={swScope:r.scope,vapidKey:i,fcmSenderId:this.app.options.messagingSenderId,fcmToken:t,createTime:Date.now(),endpoint:o.endpoint,auth:o.getKey("auth"),p256dh:o.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(n)];case 2:return e.sent(),[4,this.vapidDetailsModel.saveVapidDetails(r.scope,i)];case 3:return e.sent(),[2,t]}})})},Fe.prototype.deleteToken=function(r){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,this.deleteTokenFromDB(r)];case 1:return e.sent(),[4,this.getSWRegistration_()];case 2:return(t=e.sent())?[4,t.pushManager.getSubscription()]:[3,4];case 3:if(n=e.sent())return[2,n.unsubscribe()];e.label=4;case 4:return[2,!0]}})})},Fe.prototype.deleteTokenFromDB=function(n){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,this.tokenDetailsModel.deleteToken(n)];case 1:return t=e.sent(),[4,this.subscriptionManager.deleteToken(this.app,t)];case 2:return e.sent(),[2]}})})},Fe.prototype.getPushSubscription=function(n,r){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return[4,n.pushManager.getSubscription()];case 1:return(t=e.sent())?[2,t]:[2,n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:r})]}})})},Fe.prototype.requestPermission=function(){throw ge.create("only-available-in-window")},Fe.prototype.useServiceWorker=function(e){throw ge.create("only-available-in-window")},Fe.prototype.usePublicVapidKey=function(e){throw ge.create("only-available-in-window")},Fe.prototype.onMessage=function(e,t,n){throw ge.create("only-available-in-window")},Fe.prototype.onTokenRefresh=function(e,t,n){throw ge.create("only-available-in-window")},Fe.prototype.setBackgroundMessageHandler=function(e){throw ge.create("only-available-in-sw")},Fe.prototype.delete=function(){return l(this,void 0,void 0,function(){return d(this,function(e){switch(e.label){case 0:return[4,Promise.all([this.tokenDetailsModel.closeDatabase(),this.vapidDetailsModel.closeDatabase()])];case 1:return e.sent(),[2]}})})},Fe.prototype.getNotificationPermission_=function(){return Notification.permission},Fe.prototype.getTokenDetailsModel=function(){return this.tokenDetailsModel},Fe.prototype.getVapidDetailsModel=function(){return this.vapidDetailsModel},Fe.prototype.getSubscriptionManager=function(){return this.subscriptionManager},Fe);function Fe(e){var t=this;if(this.app=e,this.vapidDetailsModel=new qe,this.subscriptionManager=new Te,!e.options.messagingSenderId||"string"!=typeof e.options.messagingSenderId)throw ge.create("bad-sender-id");this.INTERNAL={delete:function(){return t.delete()}},this.tokenDetailsModel=new Oe(e)}var Re,Le="FCM_MSG",Be=(e(He,Re=Ue),He.prototype.onPush=function(e){e.waitUntil(this.onPush_(e))},He.prototype.onSubChange=function(e){e.waitUntil(this.onSubChange_(e))},He.prototype.onNotificationClick=function(e){e.waitUntil(this.onNotificationClick_(e))},He.prototype.onPush_=function(a){return l(this,void 0,void 0,function(){var t,n,r,o,i,s;return d(this,function(e){switch(e.label){case 0:if(!a.data)return[2];try{t=a.data.json()}catch(e){return[2]}return[4,this.hasVisibleClients_()];case 1:return e.sent()?[2,this.sendMessageToWindowClients_(t)]:(n=this.getNotificationData_(t))?(r=n.title||"",[4,this.getSWRegistration_()]):[3,3];case 2:return o=e.sent(),i=n.actions,s=Notification.maxActions,i&&s&&i.length>s&&console.warn("This browser only supports "+s+" actions.The remaining actions will not be displayed."),[2,o.showNotification(r,n)];case 3:return this.bgMessageHandler?[4,this.bgMessageHandler(t)]:[3,5];case 4:return e.sent(),[2];case 5:return[2]}})})},He.prototype.onSubChange_=function(e){return l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.getSWRegistration_()];case 1:return t=e.sent(),[3,3];case 2:throw n=e.sent(),ge.create("unable-to-resubscribe",{errorInfo:n});case 3:return e.trys.push([3,5,,8]),[4,t.pushManager.getSubscription()];case 4:return e.sent(),[3,8];case 5:return r=e.sent(),[4,this.getTokenDetailsModel().getTokenDetailsFromSWScope(t.scope)];case 6:if(!(o=e.sent()))throw r;return[4,this.deleteToken(o.fcmToken)];case 7:throw e.sent(),r;case 8:return[2]}})})},He.prototype.onNotificationClick_=function(i){return l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:if(!(i.notification&&i.notification.data&&i.notification.data[Le]))return[2];if(i.action)return[2];if(i.stopImmediatePropagation(),i.notification.close(),!(t=i.notification.data[Le]).notification)return[2];if(!(n=t.fcmOptions&&t.fcmOptions.link||t.notification.click_action)){if(!(t.data&&we in t.data))return[2];n=self.location.origin}return[4,this.getWindowClient_(n)];case 1:return(r=e.sent())?[3,4]:[4,self.clients.openWindow(n)];case 2:return r=e.sent(),[4,function(t){return new Promise(function(e){setTimeout(e,t)})}(3e3)];case 3:return e.sent(),[3,6];case 4:return[4,r.focus()];case 5:r=e.sent(),e.label=6;case 6:return r?(delete t.notification,delete t.fcmOptions,o=Ge(pe.NOTIFICATION_CLICKED,t),[2,this.attemptToMessageClient_(r,o)]):[2]}})})},He.prototype.getNotificationData_=function(e){var t;if(e&&"object"==typeof e.notification){var n=s({},e.notification);return n.data=s(s({},e.notification.data),((t={})[Le]=e,t)),n}},He.prototype.setBackgroundMessageHandler=function(e){if(!e||"function"!=typeof e)throw ge.create("bg-handler-function-expected");this.bgMessageHandler=e},He.prototype.getWindowClient_=function(i){return l(this,void 0,void 0,function(){var t,n,r,o;return d(this,function(e){switch(e.label){case 0:return t=new URL(i,self.location.href).href,[4,$e()];case 1:for(n=e.sent(),r=null,o=0;o<n.length;o++)if(new URL(n[o].url,self.location.href).href===t){r=n[o];break}return[2,r]}})})},He.prototype.attemptToMessageClient_=function(t,n){return l(this,void 0,void 0,function(){return d(this,function(e){if(!t)throw ge.create("no-window-client-to-msg");return t.postMessage(n),[2]})})},He.prototype.hasVisibleClients_=function(){return l(this,void 0,void 0,function(){return d(this,function(e){switch(e.label){case 0:return[4,$e()];case 1:return[2,e.sent().some(function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")})]}})})},He.prototype.sendMessageToWindowClients_=function(o){return l(this,void 0,void 0,function(){var t,n,r=this;return d(this,function(e){switch(e.label){case 0:return[4,$e()];case 1:return t=e.sent(),n=Ge(pe.PUSH_MSG_RECEIVED,o),[4,Promise.all(t.map(function(e){return r.attemptToMessageClient_(e,n)}))];case 2:return e.sent(),[2]}})})},He.prototype.getSWRegistration_=function(){return l(this,void 0,void 0,function(){return d(this,function(e){return[2,self.registration]})})},He.prototype.getPublicVapidKey_=function(){return l(this,void 0,void 0,function(){var t,n;return d(this,function(e){switch(e.label){case 0:return[4,this.getSWRegistration_()];case 1:if(!(t=e.sent()))throw ge.create("sw-registration-expected");return[4,this.getVapidDetailsModel().getVapidFromSWScope(t.scope)];case 2:return null==(n=e.sent())?[2,ye]:[2,n]}})})},He);function He(e){var t=Re.call(this,e)||this;return t.bgMessageHandler=null,self.addEventListener("push",function(e){t.onPush(e)}),self.addEventListener("pushsubscriptionchange",function(e){t.onSubChange(e)}),self.addEventListener("notificationclick",function(e){t.onNotificationClick(e)}),t}function $e(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function Ge(e,t){return{firebaseMessagingType:e,firebaseMessagingData:t}}var ze,Je,Ye=(e(Qe,ze=Ue),Qe.prototype.requestPermission=function(){return l(this,void 0,void 0,function(){var t;return d(this,function(e){switch(e.label){case 0:return"granted"===this.getNotificationPermission_()?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(t=e.sent()))return[2];throw"denied"===t?ge.create("permission-blocked"):ge.create("permission-default")}})})},Qe.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw ge.create("sw-registration-expected");if(null!=this.registrationToUse)throw ge.create("use-sw-before-get-token");this.registrationToUse=e},Qe.prototype.usePublicVapidKey=function(e){if("string"!=typeof e)throw ge.create("invalid-public-vapid-key");if(null!=this.publicVapidKeyToUse)throw ge.create("use-public-key-before-get-token");var t=De(e);if(65!==t.length)throw ge.create("public-vapid-key-decryption-failed");this.publicVapidKeyToUse=t},Qe.prototype.onMessage=function(e,t,n){return"function"==typeof e?this.onMessageInternal(e,t,n):this.onMessageInternal(e)},Qe.prototype.onTokenRefresh=function(e,t,n){return"function"==typeof e?this.onTokenRefreshInternal(e,t,n):this.onTokenRefreshInternal(e)},Qe.prototype.waitForRegistrationToActivate_=function(r){var o=r.installing||r.waiting||r.active;return new Promise(function(e,t){if(o)if("activated"!==o.state)if("redundant"!==o.state){var n=function(){if("activated"===o.state)e(r);else{if("redundant"!==o.state)return;t(ge.create("sw-reg-redundant"))}o.removeEventListener("statechange",n)};o.addEventListener("statechange",n)}else t(ge.create("sw-reg-redundant"));else e(r);else t(ge.create("no-sw-in-reg"))})},Qe.prototype.getSWRegistration_=function(){var t=this;return this.registrationToUse?this.waitForRegistrationToActivate_(this.registrationToUse):(this.registrationToUse=null,navigator.serviceWorker.register("/dengage-webpush-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(e){throw ge.create("failed-serviceworker-registration",{browserErrorMessage:e.message})}).then(function(e){return t.waitForRegistrationToActivate_(e).then(function(){return(t.registrationToUse=e).update(),e})}))},Qe.prototype.getPublicVapidKey_=function(){return l(this,void 0,void 0,function(){return d(this,function(e){return this.publicVapidKeyToUse?[2,this.publicVapidKeyToUse]:[2,ye]})})},Qe.prototype.setupSWMessageListener_=function(){var s=this;navigator.serviceWorker.addEventListener("message",function(e){if(e.data&&e.data.firebaseMessagingType&&e.data.firebaseMessagingData){var t=e.data,n=t.firebaseMessagingType,r=t.firebaseMessagingData;s.messageObserver&&s.messageObserver.next(r);var o=r.data;if(o&&we in o&&"1"===o["google.c.a.e"]){var i=function(e){switch(e){case pe.NOTIFICATION_CLICKED:return"notification_open";case pe.PUSH_MSG_RECEIVED:return"notification_foreground";default:throw new Error}}(n);s.app.INTERNAL.analytics.logEvent(i,{message_name:o["google.c.a.c_l"],message_id:o[we],message_time:o["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}}},!1)},Qe);function Qe(e){var t=ze.call(this,e)||this;return t.registrationToUse=null,t.publicVapidKeyToUse=null,t.messageObserver=null,t.tokenRefreshObserver=null,t.onMessageInternal=u(function(e){t.messageObserver=e}),t.onTokenRefreshInternal=u(function(e){t.tokenRefreshObserver=e}),t.setupSWMessageListener_(),t}function Xe(){return self&&"ServiceWorkerGlobalScope"in self?"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}Je={isSupported:Xe},Ze.INTERNAL.registerService("messaging",function(e){if(!Xe())throw ge.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new Be(e):new Ye(e)},Je)}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-messaging - be sure to load firebase-app.js first.")}});

(function (firebase) {
  'use strict';

  firebase = firebase && firebase.hasOwnProperty('default') ? firebase['default'] : firebase;

  function shadeHexColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }
  function getFontFamily(font) {
    switch (font) {
      case 'ARIAL':
        return 'Helvetica, Arial, sans-serif';

      case 'TAHOMA':
        return 'Tahoma, sans-serif';

      case 'VERDANA':
        return 'Verdana, sans-serif';

      case 'GEORGIA':
        return 'Georgia, Times, serif';

      case 'TIMES':
        return '"Times New Roman", Times, serif';

      case 'COURIER':
        return '"Courier New", Courier, monospace';
    }

    return 'inherit';
  }
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16).toLowerCase();
    });
  }
  function logError(errorText, error) {
    console.error(errorText);
  }
  function logInfo(errorText, error) {
    console.log(errorText);
  }
  function errorLoggerResolved(errorText, resolveValue) {
    return function (input) {
      if (input) {
        console.error(errorText, input);
      } else {
        console.error(errorText);
      }

      return resolveValue;
    };
  }
  function errorLoggerRejected(errorText, rejectValue) {
    return function (input) {
      if (input) {
        console.error(errorText, input);
      } else {
        console.error(errorText);
      }

      return Promise.reject(rejectValue);
    };
  }

  function generateSlideHtml(appSettings) {
    var s = appSettings.slideSettings;
    var mainColor = s.mainColor || "#1165f1";
    var theme = s.theme || "BOTTOM_BTNS";
    var slide = {
      location: s.location || "TOP_CENTER",
      showIcon: s.showIcon || false,
      title: s.showTitle ? s.title || '' : '',
      text: s.text || "We'd like to show you notifications for the latest news and updates.",
      acceptBtnText: s.acceptBtnText || "Allow",
      cancelBtnText: s.cancelBtnText || "No Thanks"
    };
    var details = {};

    if (s.advancedOptions) {
      details = fixMissingSlideDetails(s.details, mainColor);
    } else {
      details = getDefaultSlideDetails(mainColor);
    }

    return "\n<div class=\"dn-slide ".concat(slide.showIcon ? '' : 'dn-slide--noLogo', " ").concat(slide.title ? '' : 'dn-slide--noTitle', " ").concat(theme, "\">\n  <div class=\"dn-slide-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-slide-body\">\n      <h3 class=\"dn-slide-title\">").concat(slide.title, "</h3>\n      <p class=\"dn-slide-message\">").concat(slide.text, "</p>\n      <div class=\"dn-slide-buttons horizontal\">\n          <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n          <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      </div>\n  </div>\n  <div class=\"dn-slide-buttons vertical\">\n      <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n  </div>\n</div>\n<style>\n  .dn-slide {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      border-radius: ").concat(details.borderRadius, "px;\n      display: flex;\n      overflow:auto;\n      width:520px;\n      max-width: 520px;\n      height:auto;\n  }\n\n  .dn-slide-logo {\n      width: 30%;\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .RIGHT_BTNS .dn-slide-logo {\n      width: 18%;\n      padding: 8px;\n  }\n  .dn-slide-logo img {\n      width: 100%;\n  }\n  .dn-slide--noLogo .dn-slide-logo {\n      display: none;\n  }\n\n  .dn-slide-body {\n      width: 70%;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      vertical-align: middle;\n      display: flex;\n      flex-direction: column;\n  }\n  .RIGHT_BTNS .dn-slide-body {\n      width: 58%;\n      padding: 8px;\n  }\n  .dn-slide--noLogo .dn-slide-body {\n      width: 100%;\n  }\n\n  .dn-slide-title {\n      background: none;\n      color: ").concat(details.titleSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.titleSyle.fontSize, "px;\n      font-weight: ").concat(details.titleSyle.fontWeight, ";\n      margin: 0;\n      padding: 0;\n  }\n  .dn-slide--noTitle .dn-slide-title {\n      display: none;\n  }\n\n  .dn-slide-message {\n      background: none;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n      padding: 0;\n      margin: 12px 0;\n      flex: 1;\n  }\n  .dn-slide--noTitle .dn-slide-message {\n      margin: 5px 0 20px 10px;\n  }\n\n  .dn-slide-buttons {\n      display: flex;\n  }\n  .dn-slide-buttons.vertical {\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 24%;\n      padding: 8px;\n  }\n  .dn-slide-buttons.horizontal {\n      justify-content: flex-end;\n      align-items: center;\n  }\n  .BOTTOM_BTNS .vertical {\n      display: none;\n  }\n  .RIGHT_BTNS .horizontal {\n      display: none;\n  }\n  .dn-slide-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n  .dn-slide-buttons.horizontal button {\n      margin-left: 15px;\n  }\n  .dn-slide-buttons.vertical button {\n      width: 100%;\n  }\n  .dn-slide-buttons.vertical button:first-child {\n      margin-bottom: 5px;\n  }\n\n  .dn-slide-buttons .dn-slide-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-slide-buttons .dn-slide-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  @media only screen and (max-width: 767px) {\n      #dengage-push-perm-slide {\n          width: 94% !important;\n          margin-left: -47% !important;\n      }\n\n      .dn-slide {\n          width: 100% !important;\n          max-width: 100%;\n      }\n\n      /*.dn-slide-title {\n          font-size: 12px;\n      }\n\n      .dn-slide-message {\n          font-size: 11px;\n      }\n\n      .dn-slide-buttons button {\n          padding: 5px 10px;\n          margin-left: 15px;\n          font-size: 12px;\n      }*/\n  }\n</style>\n    ");
  }

  function getDefaultSlideDetails(mainColor) {
    return {
      backgroundColor: "#ffffff",
      fontFamily: 'ARIAL',
      border: 0,
      borderColor: mainColor,
      borderRadius: 3,
      shadow: true,
      textSyle: {
        textColor: "#555555",
        fontSize: "15",
        fontWeight: "normal"
      },
      titleSyle: {
        textColor: "#555555",
        fontSize: "16",
        fontWeight: "bold"
      },
      acceptBtnStyle: {
        backgroundColor: mainColor,
        hoverBackgroundColor: shadeHexColor(mainColor, -0.2),
        textColor: "#ffffff",
        hoverTextColor: "#ffffff",
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      },
      cancelBtnStyle: {
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#ffffff",
        textColor: mainColor,
        hoverTextColor: shadeHexColor(mainColor, -0.2),
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      }
    };
  }

  function fixMissingSlideDetails(details, mainColor) {
    var textSyle = details.textSyle || {};
    var titleSyle = details.titleSyle || {};
    var acceptBtnStyle = details.acceptBtnStyle || {};
    var cancelBtnStyle = details.cancelBtnStyle || {};
    return {
      backgroundColor: details.backgroundColor || "#ffffff",
      fontFamily: details.fontFamily || 'ARIAL',
      border: details.border || 0,
      borderColor: details.borderColor || mainColor,
      borderRadius: details.borderRadius || 3,
      shadow: details.shadow == null ? true : details.shadow,
      textSyle: {
        textColor: textSyle.textColor || "#555555",
        fontSize: textSyle.fontSize || "15",
        fontWeight: textSyle.fontWeight || "normal"
      },
      titleSyle: {
        textColor: titleSyle.textColor || "#555555",
        fontSize: titleSyle.fontSize || "16",
        fontWeight: titleSyle.fontWeight || "bold"
      },
      acceptBtnStyle: {
        backgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -0.2),
        textColor: acceptBtnStyle.textColor || "#ffffff",
        hoverTextColor: acceptBtnStyle.hoverTextColor || "#ffffff",
        fontSize: acceptBtnStyle.fontSize || "16",
        fontWeight: acceptBtnStyle.fontWeight || "normal",
        border: acceptBtnStyle.border || 0,
        borderColor: acceptBtnStyle.borderColor || mainColor,
        borderRadius: acceptBtnStyle.borderRadius || 3,
        shadow: acceptBtnStyle.shadow == null ? false : acceptBtnStyle.shadow
      },
      cancelBtnStyle: {
        backgroundColor: cancelBtnStyle.backgroundColor || "#ffffff",
        hoverBackgroundColor: cancelBtnStyle.hoverBackgroundColor || "#ffffff",
        textColor: cancelBtnStyle.textColor || mainColor,
        hoverTextColor: cancelBtnStyle.hoverTextColor || shadeHexColor(mainColor, -0.2),
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || mainColor,
        borderRadius: cancelBtnStyle.borderRadius || 3,
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

  function showSlidePromt(appSettings, isPreview) {
    var container = document.createElement("div");
    container.className = "dengage-push-perm-slide";
    container.id = "dengage-push-perm-slide";
    container.style.position = "absolute";
    container.style.height = "250px";
    container.style.width = "520px";
    container.style.top = "-260px";
    container.style.left = "50%";
    container.style.marginLeft = "-260px";
    container.style.zIndex = "100000";

    if (!isPreview) {
      container.style.transition = "top 1s linear";
    }

    container.innerHTML = generateSlideHtml(appSettings);
    document.body.appendChild(container);
    setTimeout(function () {
      container.style.top = "0px";
    }, 1);
    return {
      onAccept: function onAccept(callback) {
        var btns = container.querySelectorAll('.dn-slide-accept-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      },
      onDeny: function onDeny(callback) {
        var btns = container.querySelectorAll('.dn-slide-deny-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      }
    };
  }

  function generateBannerHtml(appSettings) {
    var s = appSettings.bannerSettings;
    var mainColor = s.mainColor || "#333333";
    var banner = {
      location: s.location || "TOP",
      showIcon: s.showIcon || false,
      text: s.text || "We'd like to show you notifications for the latest news and updates.",
      acceptBtnText: s.acceptBtnText || "Allow"
    };
    var details = {};

    if (s.advancedOptions) {
      details = fixMissingBannerDetails(s.details, mainColor);
    } else {
      details = getDefaultBannerDetails(mainColor);
    }

    return "\n<div class=\"dn-banner ".concat(banner.showIcon ? '' : 'dn-banner--noLogo', "\">\n  <div class=\"dn-banner-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-banner-text\">\n    ").concat(banner.text, "\n  </div>\n  <div class=\"dn-banner-buttons\">\n      <button class=\"dn-banner-accept-btn\">").concat(banner.acceptBtnText, "</button>\n      <button class=\"dn-banner-deny-btn\">x</button>\n  </div>\n</div>\n<style>\n  .dn-banner {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border-bottom: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      display: flex;\n      overflow:auto;\n      width: 100%;\n      height:auto;\n  }\n\n  .dn-banner-logo {\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .dn-banner-logo img {\n      width: 36px;\n  }\n  .dn-banner--noLogo .dn-banner-logo {\n      display: none;\n  }\n\n  .dn-banner-text {\n      flex: 1;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      display: flex;\n      align-items: center;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n  }\n  .dn-banner--noLogo .dn-banner-body {\n      width: 100%;\n  }\n\n  .dn-banner-buttons {\n      display: flex;\n      padding-right: 10px;\n      align-items: center;\n  }\n  .dn-banner-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n\n  .dn-banner-buttons .dn-banner-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-banner-buttons .dn-banner-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-banner-buttons .dn-banner-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-banner-buttons .dn-banner-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  @media only screen and (max-width: 767px) {\n\n  }\n</style>\n    ");
  }

  function getDefaultBannerDetails(mainColor) {
    return {
      //advanced options
      backgroundColor: '#ffffff',
      fontFamily: 'ARIAL',
      border: 2,
      borderColor: mainColor,
      shadow: true,
      textSyle: {
        textColor: mainColor,
        fontSize: '15',
        fontWeight: 'normal'
      },
      acceptBtnStyle: {
        backgroundColor: mainColor,
        hoverBackgroundColor: shadeHexColor(mainColor, -0.2),
        textColor: '#ffffff',
        hoverTextColor: '#ffffff',
        fontSize: '16',
        fontWeight: 'normal',
        border: 0,
        borderColor: '',
        borderRadius: 0,
        shadow: false
      },
      cancelBtnStyle: {
        backgroundColor: '#eeeeee',
        hoverBackgroundColor: '#cccccc',
        textColor: shadeHexColor(mainColor, 0.2),
        hoverTextColor: mainColor,
        fontSize: '16',
        fontWeight: 'bold',
        border: 0,
        borderColor: '',
        shadow: false
      }
    };
  }

  function fixMissingBannerDetails(details, mainColor) {
    var textSyle = details.textSyle || {};
    var acceptBtnStyle = details.acceptBtnStyle || {};
    var cancelBtnStyle = details.cancelBtnStyle || {};
    return {
      backgroundColor: details.backgroundColor || "#ffffff",
      fontFamily: details.fontFamily || 'ARIAL',
      border: details.border || 2,
      borderColor: details.borderColor || mainColor,
      borderRadius: details.borderRadius || 0,
      shadow: details.shadow == null ? true : details.shadow,
      textSyle: {
        textColor: textSyle.textColor || "#333333",
        fontSize: textSyle.fontSize || "15",
        fontWeight: textSyle.fontWeight || "normal"
      },
      acceptBtnStyle: {
        backgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -0.2),
        textColor: acceptBtnStyle.textColor || "#ffffff",
        hoverTextColor: acceptBtnStyle.hoverTextColor || "#ffffff",
        fontSize: acceptBtnStyle.fontSize || "16",
        fontWeight: acceptBtnStyle.fontWeight || "normal",
        border: acceptBtnStyle.border || 0,
        borderColor: acceptBtnStyle.borderColor || mainColor,
        borderRadius: acceptBtnStyle.borderRadius || 0,
        shadow: acceptBtnStyle.shadow == null ? false : acceptBtnStyle.shadow
      },
      cancelBtnStyle: {
        backgroundColor: cancelBtnStyle.backgroundColor || "#eeeeee",
        hoverBackgroundColor: cancelBtnStyle.hoverBackgroundColor || "#cccccc",
        textColor: cancelBtnStyle.textColor || shadeHexColor(mainColor, 0.2),
        hoverTextColor: cancelBtnStyle.hoverTextColor || mainColor,
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || "#eeeeee",
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

  function showBannerPromt(appSettings, isPreview) {
    var container = document.createElement("div");
    container.className = "dengage-push-perm-banner";
    container.id = "dengage-push-perm-banner";
    container.style.position = "absolute";
    container.style.height = "100px";
    container.style.width = "100%";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.zIndex = "100000";
    document.body.appendChild(container);

    if (!isPreview) {
      container.style.transition = "top 1s linear";
    }

    container.innerHTML = generateBannerHtml(appSettings);
    document.body.appendChild(container);
    setTimeout(function () {
      container.style.top = "0px";
    }, 1);
    return {
      onAccept: function onAccept(callback) {
        var btn = container.querySelector('.dn-banner-accept-btn');
        btn.addEventListener("click", function () {
          container.style.top = "-260px";
          callback();
          setTimeout(function () {
            document.body.removeChild(container);
          }, 1000);
        });
      },
      onDeny: function onDeny(callback) {
        var btn = container.querySelector('.dn-banner-deny-btn');
        btn.addEventListener("click", function () {
          container.style.top = "-260px";
          callback();
          setTimeout(function () {
            document.body.removeChild(container);
          }, 1000);
        });
      }
    };
  }

  var appSettings = JSON.parse('{"name":"muhammed-wh.github.io","siteUrl":"https://muhammed-wh.github.io","autoShow":true,"bellSettings":{"size":"MEDIUM","location":"RIGHT","mainColor":"#1165f1","leftOffset":0,"accentColor":"#333333","dialogTitle":"","rightOffset":0,"bottomOffset":0,"advancedOptions":false,"unsubscribeText":"","hideIfSubscribed":false,"subscribeBtnText":"","unblockGuideText":"","subscribedTooltip":"","unsubscribeBtnText":"","nonSubscriberTooltip":"","afterSubscriptionText":"","unblockNotificationText":"","blockedSubscriberTooltip":""},"slideSettings":{"text":"We\'d like to show you notifications for the latest news and updates.","fixed":false,"theme":"BOTTOM_BTNS","title":"","details":null,"location":"TOP_CENTER","showIcon":true,"mainColor":"#1165f1","showTitle":false,"acceptBtnText":"Allow","cancelBtnText":"No Thanks","advancedOptions":false},"bannerSettings":{"text":"","fixed":true,"theme":"DEFAULT","details":null,"location":"BOTTOM","showIcon":true,"mainColor":"#333333","acceptBtnText":"Enable","advancedOptions":false},"defaultIconUrl":"https://s3.eu-central-1.amazonaws.com/prod-d5a29e72-54b5-5137-a534-3fd991dbb8ad/201911/blutv-logo.png","selectedPrompt":"SLIDE","autoShowSettings":{"delay":5,"denyWaitTime":0,"promptAfterXVisits":0,"repromptAfterXMinutes":2},"welcomeNotification":{"link":"","title":"DVL hesabına Hoş geldiniz","enabled":true,"message":"Ne iyi ettiniz de geldiniz"}}');

  function sendOpen(messageId, messageDetails) {
    var data = {
      "integrationKey": "BkziFc7ghQKPjZ5x9TovmjY_p_l_JwPewW2_p_l_mn_p_l_xHL3eUnBmZ4HMW28r0lc3T9gT6ueB4WBsIKmRRrSj_p_l_kHNGCexHkReFgqJwy8D8jHmzo_p_l_ivpVzLE0UuNFGT2Bq9QdroCwY",
      "messageId": messageId,
      "messageDetails": messageDetails
    };
    return fetch('https://pushdev.dengage.com/api/web/open', {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      // no-cors, *cors, same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'text/plain'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrer: 'no-referrer',
      // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
  }

  /**
   * Direk basit bir notifikasyon gösterir
   * 
   * @param {object} data 
   * Gösterilecek notifikasyon ile ilgili bilgileri içerir
   * { title, iconUrl, message, mediaUrl, badgeUrl, targetUrl }
   */

  function showNotificationSimple(data) {
    var title = data.title;
    var iconUrl = data.iconUrl == 'default_icon' ? appSettings.defaultIconUrl : (data.iconUrl || '').trim();
    var options = {
      body: data.message,
      requireInteraction: true
    };

    if (data.mediaUrl) {
      options.image = data.mediaUrl;
    }

    if (iconUrl) {
      options.icon = iconUrl;
    }

    if (data.badgeUrl) {
      options.badge = data.badgeUrl;
    }

    var notif = new Notification(title, options);

    if (data.targetUrl) {
      notif.onclick = function (event) {
        event.notification.close();
        window.open(data.targetUrl);

        if (data.messageId && data.messageDetails) {
          sendOpen(data.messageId, data.messageDetails);
        }
      };
    }
  }

  var firebaseConfig = {
    apiKey: 'AIzaSyDbzYdx1P-_2QBUZbt8d9Zexb6Fk8fugZ8',
    projectId: 'webpush-deneme',
    messagingSenderId: '##FIREBASE_SENDER_ID##',
    appId: '1:992812112924:web:4cc16aaa4afdefb94c13d9'
  };
  var fb = firebase.initializeApp(firebaseConfig);
  var messaging = fb.messaging();
  var token = null;

  function refreshSubscription() {
    return messaging.getToken().then(function (currentToken) {
      if (currentToken) {
        token = currentToken;
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }, errorLoggerRejected('An error occurred while retrieving token from firebase'));
  }

  function onMessageHandler(payload) {
    console.log("[dengage-webpush-sw.js] Received message when client is opened: ", payload);
    var data = payload.data;
    /*navigator.serviceWorker.ready
    .then(registration => {
      showNotificationWithSw(data, registration);
    }, errorLoggerRejected('serviceWorker.ready failed on onMessageHandler. '));*/

    showNotificationSimple(data);
  }

  window.onMessageHandler = onMessageHandler;
  var webPushApiClient = {
    detected: function detected() {
      return 'serviceWorker' in navigator && 'PushManager' in window;
    },
    init: function init() {
      var currentPermission = Notification.permission;

      if (currentPermission === 'granted') {
        messaging.onMessage(onMessageHandler);
        return navigator.serviceWorker.register('/dengage-webpush-sw.js', {
          updateViaCache: 'none'
        }).then(function () {
          //TODO: on refresh token
          // chrome register yapınca hemen ready olmuyor
          return navigator.serviceWorker.ready.then(function (registration) {
            messaging.useServiceWorker(registration);
            return refreshSubscription();
          }, errorLoggerRejected('serviceWorker.ready failed. '));
        }, errorLoggerRejected('An error occurred while registering service worker'));
      } else {
        logError('init called when permission is not granted');
        return Promise.reject();
      }
    },
    getTokenInfo: function getTokenInfo() {
      var currentPermission = Notification.permission;

      if (currentPermission === 'granted') {
        if (token == null) {
          return navigator.serviceWorker.ready.then(function () {
            return refreshSubscription();
          }).then(function () {
            return {
              token: token,
              tokenType: 'F',
              webSubscription: null
            };
          }, errorLoggerResolved('serviceWorker.ready failed', null));
        }

        return Promise.resolve({
          token: token,
          tokenType: 'F',
          webSubscription: null
        });
      }

      return Promise.resolve(null);
    },
    requestPermission: function requestPermission() {
      return Notification.requestPermission();
    },
    getPermission: function getPermission() {
      return Notification.permission;
    }
  };

  var isSubscriptionSent = !!sessionStorage.getItem('dengage_subscription_sent');
  var aboutToSend = false;

  function triggerSend() {
    if (aboutToSend == false) {
      aboutToSend = true;
      setTimeout(function () {
        aboutToSend = false;
        sendSubscription();
      }, 1000);
    }
  }

  setTimeout(function () {
    if (isSubscriptionSent == false) {
      triggerSend();
    }
  }, 2000);
  function getDeviceId() {
    var deviceId = normalizeLong(localStorage.getItem('dengage_device_id'));

    if (!deviceId) {
      deviceId = deviceId || generateUUID();
      triggerSend();
    }

    localStorage.setItem('dengage_device_id', deviceId);
    return Promise.resolve(deviceId);
  }
  function getContactKey() {
    var val = localStorage.getItem('dengage_contact_key');
    return normalizeShort(val);
  }
  function setContactKey(value) {
    if (getContactKey() != normalizeShort(value)) {
      localStorage.setItem('dengage_contact_key', normalizeShort(value) || '');
      triggerSend();
    }
  }
  function getToken() {
    var val = localStorage.getItem('dengage_webpush_token');
    return normalizeLong(val);
  }
  function setToken(value) {
    if (getToken() != normalizeLong(value)) {
      localStorage.setItem('dengage_webpush_token', normalizeLong(value) || '');
      triggerSend();
    }
  }
  function getTokenType() {
    var val = localStorage.getItem('dengage_webpush_token_type');
    return normalizeShort(val);
  }
  function setTokenType(value) {
    if (getTokenType() != normalizeShort(value)) {
      localStorage.setItem('dengage_webpush_token_type', normalizeShort(value) || '');
      triggerSend();
    }
  }
  function getWebSubscription() {
    var val = localStorage.getItem('dengage_webpush_sub');
    return normalizeLong(val);
  }
  function setWebSubscription(value) {
    if (getWebSubscription() != normalizeLong(value)) {
      localStorage.setItem('dengage_webpush_sub', normalizeLong(value) || '');
      triggerSend();
    }
  }

  function sendSubscription() {
    isSubscriptionSent = true;
    sessionStorage.setItem('dengage_subscription_sent', 'true');
    getDeviceId().then(function (deviceId) {
      var data = {
        integrationKey: 'BkziFc7ghQKPjZ5x9TovmjY_p_l_JwPewW2_p_l_mn_p_l_xHL3eUnBmZ4HMW28r0lc3T9gT6ueB4WBsIKmRRrSj_p_l_kHNGCexHkReFgqJwy8D8jHmzo_p_l_ivpVzLE0UuNFGT2Bq9QdroCwY',
        token: getToken(),
        contactKey: getContactKey(),
        permission: true,
        udid: deviceId,
        advertisingId: '',
        //TODO: burası yapılacak
        carrierId: null,
        appVersion: null,
        sdkVersion: '1.0',
        trackingPermission: true,
        webSubscription: getWebSubscription(),
        tokenType: getTokenType() //TODO: buraya token status eklenebilir

      };
      var request = fetch('https://pushdev.dengage.com/api/web/subscription', {
        method: 'POST',
        // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // no-cors, *cors, same-origin
        cache: 'no-cache',
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit',
        // include, *same-origin, omit
        headers: {
          'Content-Type': 'text/plain'
        },
        redirect: 'follow',
        // manual, *follow, error
        referrer: 'no-referrer',
        // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header

      });
    });
  }

  function normalizeShort(val) {
    /*if (val === 'null') {
      try {
        throw new Error('null value for localStorage');
      } catch(e) {
        logError();
      }
    }*/
    if (!val || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeLong(val) {
    if (!val || typeof val == 'string' && val.length < 10) {
      return null;
    }

    return val;
  }

  var permissionData = null;

  function getWebsitePushID() {
    var hostname = window.location.hostname;
    return hostname.split('.').concat('web').reverse().join('.');
  }

  function refreshPermissionData() {
    permissionData = window.safari.pushNotification.permission(getWebsitePushID());
  }

  var safariClient = {
    detected: function detected() {
      //TODO: safari_enabled a bakılacak
      return 'safari' in window && 'pushNotification' in window.safari && 'true' == 'true';
    },
    init: function init() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      if (permissionData.permission == 'granted') {
        return Promise.resolve();
      } else {
        logError('init called when permission is not granted');
        return Promise.reject();
      }
    },
    getTokenInfo: function getTokenInfo() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      if (permissionData.permission === 'granted') {
        return Promise.resolve({
          token: permissionData.deviceToken,
          tokenType: 'S',
          webSubscription: null
        });
      }

      return Promise.resolve(null);
    },
    requestPermission: function requestPermission() {
      return new Promise(function (resolve, reject) {
        if (permissionData == null) {
          refreshPermissionData();
        }

        function safariPermissionCb(result) {
          permissionData = result;
          /*if (permissionData.permission === 'default') {
              console.log('user made default. it is impossible');
          }
          else if (permissionData.permission === 'denied') {
              console.log('user said no');
          }
          else if (permissionData.permission === 'granted') {
              console.log('user said yes');
              console.log('Token: ' + permissionData.deviceToken);
          }*/

          resolve(permissionData.permission);
        }

        if (permissionData.permission == 'default') {
          getDeviceId().then(function (deviceId) {
            var websitePushID = getWebsitePushID();
            var url = 'https://pushdev.dengage.com/api/safari/90db7e2a-5839-53cd-605f-9d3ffc328e21';
            var userInfo = {
              device_id: deviceId
            };
            window.safari.pushNotification.requestPermission(url, websitePushID, userInfo, safariPermissionCb);
          });
        } else {
          logError('requestPermission called when permission is not default');
          reject();
        }
      });
    },
    getPermission: function getPermission() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      return permissionData.permission;
    }
  };

  var pushClient = {
    detected: function detected() {
      return false;
    }
  };

  if (safariClient.detected()) {
    Object.assign(pushClient, safariClient);
  } else {
    Object.assign(pushClient, webPushApiClient);
  }

  function showNativePrompt(grantedCallback, deniedCallback) {
    pushClient.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        setLocalStoragePromptResult('granted');

        if (grantedCallback) {
          grantedCallback();
        }
      } else {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      }
    });
  }
  function showCustomPrompt(grantedCallback, deniedCallback) {
    if (appSettings.selectedPrompt == 'SLIDE') {
      var slidePrompt = showSlidePromt(appSettings);
      slidePrompt.onAccept(function () {
        showNativePrompt(grantedCallback, deniedCallback);
      });
      slidePrompt.onDeny(function () {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      });
    } else if (appSettings.selectedPrompt == 'BANNER') {
      var bannerPrompt = showBannerPromt(appSettings);
      bannerPrompt.onAccept(function () {
        showNativePrompt(grantedCallback, deniedCallback);
      });
      bannerPrompt.onDeny(function () {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      });
    } else {
      showNativePrompt(grantedCallback, deniedCallback);
    }

    localStorage.setItem('dengage_webpush_last_a', 'ask');
    localStorage.setItem('dengage_webpush_last_d', new Date().valueOf() + '');
  }
  /*autoShowSettings: {
      delay: 0, //second (session bazlı)
      promptAfterXVisits: 0,
      repromptAfterXMinutes: 0, //minutes
      denyWaitTime: 0, //minutes
  }*/

  function startAutoPrompt(grantedCallback, deniedCallback) {
    var autoShowSettings = appSettings.autoShowSettings;
    var sessionStartTime = toInt(sessionStorage.getItem('dengage_session_start'));

    if (sessionStartTime) {
      sessionStartTime = new Date(sessionStartTime);
    } else {
      sessionStartTime = new Date();
      sessionStorage.setItem('dengage_session_start', sessionStartTime.valueOf() + '');
    }

    var now = new Date();

    var setPrompt = function setPrompt() {
      var delay = toInt(autoShowSettings.delay) * 1000;
      var passedTime = now.valueOf() - sessionStartTime.valueOf();
      var waitTime = delay - passedTime;
      waitTime = waitTime > 0 ? waitTime : 0;
      setTimeout(function () {
        showCustomPrompt(grantedCallback, deniedCallback);
      }, waitTime);
    };

    var visitCount = toInt(localStorage.getItem('dengage_visit_count'));
    localStorage.setItem('dengage_visit_count', visitCount + 1);

    if (toInt(autoShowSettings.promptAfterXVisits) <= visitCount) {
      var lastPromptAction = localStorage.getItem('dengage_webpush_last_a') || '';
      var lastPromptDate = toInt(localStorage.getItem('dengage_webpush_last_d'));
      lastPromptDate = new Date(lastPromptDate);
      var denyWaitTime = toInt(autoShowSettings.denyWaitTime) * 60 * 1000;
      var denyWaitUntil = new Date(lastPromptDate.valueOf() + denyWaitTime);
      var repromptWaitTime = toInt(autoShowSettings.repromptAfterXMinutes);
      var repromptWaitUntil = new Date(lastPromptDate.valueOf() + repromptWaitTime);

      if (lastPromptAction == 'denied') {
        if (now >= denyWaitUntil) {
          setPrompt();
        }
      } else {
        if (now >= repromptWaitUntil) {
          setPrompt();
        }
      }
    }
  }

  function toInt(input) {
    if (typeof input == 'number') {
      return input;
    }

    if (typeof input == 'string') {
      return input === '' ? 0 : parseInt(input);
    }

    return 0;
  }

  function setLocalStoragePromptResult(result) {
    localStorage.setItem('dengage_webpush_last_a', result);
    localStorage.setItem('dengage_webpush_last_d', new Date().valueOf() + '');
  }

  function startPushClient(callback, isFirstTime) {
    pushClient.init().then(function () {
      pushClient.getTokenInfo().then(function (tokenInfo) {
        logInfo('Token: ' + tokenInfo.token);
        setToken(tokenInfo.token);
        setTokenType(tokenInfo.tokenType);
        setWebSubscription(tokenInfo.webSubscription || null);

        if (isFirstTime) {
          showWellcomeNotification();
        }

        callback();
      }).catch(function (err) {
        logError('pushClient.getTokenInfo() failed. ');
        callback();
      });
    }).catch(function (err) {
      logError('pushClient.init() failed. ');
      callback();
    });
  }

  function start(callback) {
    callback = callback || function () {};

    var currentPermission = pushClient.getPermission();

    if (currentPermission == 'granted') {
      logInfo('Notification permission already granted.');
      startPushClient(callback);
    } else if (currentPermission == 'default') {
      setToken(null);
      setTokenType(null);
      setWebSubscription(null);

      if (appSettings.autoShow) {
        var onPermissionGranted = function onPermissionGranted() {
          logInfo('Notification permission granted.');
          startPushClient(callback, true); //TODO: manual prompt yapılan yerlerde startPushClient çağrılmalı
        };

        var onPermissionDenied = function onPermissionDenied() {
          logInfo('Notification permission denied.');
        };

        startAutoPrompt(onPermissionGranted, onPermissionDenied);
      }

      callback();
    } else {
      logInfo('Notification permission denied');
      setToken(null);
      setTokenType(null);
      setWebSubscription(null);
      callback();
    } //TODO: pushClient.onTokenRefresh
    //TODO: onMessage

  }
  function showNativePrompt$1() {
    return new Promise(function (resolve, reject) {
      showNativePrompt(function () {
        startPushClient(callback, true);
        resolve('granted');
      }, function () {
        resolve('denied');
      });
    });
  }
  function showCustomPrompt$1() {
    return new Promise(function (resolve, reject) {
      showCustomPrompt(function () {
        startPushClient(callback, true);
        resolve('granted');
      }, function () {
        resolve('denied');
      });
    });
  }

  function showWellcomeNotification() {
    if (appSettings.welcomeNotification.enabled) {
      setTimeout(function () {
        var data = {
          title: appSettings.welcomeNotification.title,
          message: appSettings.welcomeNotification.message,
          targetUrl: appSettings.welcomeNotification.link
        };
        showNotificationSimple(data);
      }, 500);
    }
  }

  function sendEvent(table, key, data) {
    var params = {
      "accountId": "90db7e2a-5839-53cd-605f-9d3ffc328e21",
      "key": key,
      "eventTable": table,
      "eventDetails": data
    };
    logInfo(params);
    var request = fetch('https://eventdev.dengage.com/api/web/event', {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      // no-cors, *cors, same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'text/plain'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrer: 'no-referrer',
      // no-referrer, *client
      body: JSON.stringify(params) // body data type must match "Content-Type" header

    });
  }

  var list = [' Daum/', ' DeuSu/', ' MuckRack/', ' Sysomos/', ' um-LN/', '!Susie', '/www\\.answerbus\\.com', '/www\\.unchaos\\.com', '/www\\.wmtips\\.com', '008/', '192\\.comAgent', '8484 Boston Project', '<http://www\\.sygol\\.com/>', '\\(privoxy/', '^AHC/', '^Amazon CloudFront', '^axios/', '^Disqus/', '^Friendica', '^Hatena', '^http_get', '^Jetty/', '^MeltwaterNews', '^MixnodeCache/', '^newspaper/', '^NextCloud-News/', '^ng/', '^NING', '^Nuzzel', '^okhttp', '^sentry/', '^Thinklab', '^Tiny Tiny RSS/', '^Traackr.com', '^Upflow/', '^Zabbix', 'Abonti', 'Aboundex', 'aboutthedomain', 'ac{1,2}oon', 'Ad Muncher', 'adbeat\\.com', 'AddThis', 'ADmantX', 'agada.de', 'agadine/', 'aggregator', 'aiderss/', 'airmail\\.etn', 'airmail\\net', 'aladin/', 'alexa site audit', 'allrati/', 'AltaVista Intranet', 'alyze\\.info', 'amzn_assoc', 'analyza', 'analyzer', 'Anemone', 'Anturis Agent', 'AnyEvent-HTTP', 'Apache-HttpClient', 'APIs-Google', 'Aport', 'AppEngine-Google', 'appie', 'AppInsights', 'Arachmo', 'arachnode\\.net', 'Arachnoidea', 'Arachnophilia/', 'araneo/', 'archive', 'archiving', 'asafaweb\\.com', 'asahina-antenna/', 'ask[-\\s]?jeeves', 'ask\\.24x\\.info', 'aspseek/', 'AspTear', 'assort/', 'asterias/', 'atomic_email_hunter/', 'atomz/', 'augurfind', 'augurnfind', 'auto', 'Avirt Gateway Server', 'Azureus', 'B-l-i-t-z-B-O-T', 'B_l_i_t_z_B_O_T', 'BackStreet Browser', 'BCKLINKS 1\\.0', 'beammachine/', 'beebwaredirectory/v0\\.01', 'bibnum\\.bnf', 'Big Brother', 'Big Fish', 'BigBozz/', 'bigbrother/', 'biglotron', 'bilbo/', 'BilderSauger', 'BingPreview', 'binlar', 'Blackboard Safeassign', 'BlackWidow', 'blaiz-bee/', 'bloglines/', 'Blogpulse', 'blogzice/', 'BMLAUNCHER', 'bobby/', 'boitho\\.com-dc', 'bookdog/x\\.x', 'Bookmark Buddy', 'Bookmark Renewal', 'bookmarkbase\\(2/;http://bookmarkbase\\.com\\)', 'BorderManager', 'bot', 'BrandVerity/', 'BravoBrian', 'Browsershots', 'bsdseek/', 'btwebclient/', 'BUbiNG', 'BullsEye', 'bumblebee@relevare\\.com', 'BunnySlippers', 'Buscaplus', 'butterfly', 'BW-C-2', 'bwh3_user_agent', 'calif/', 'capture', 'carleson/', 'CC Metadata Scaper', 'ccubee/x\\.x', 'CE-Preload', 'Ceramic Tile Installation Guide', 'Cerberian Drtrs', 'CERN-HTTPD', 'cg-eye interactive', 'changedetection', 'Charlotte', 'charon/', 'Chat Catcher/', 'check', 'China Local Browse', 'Chitika ContentHit', 'Chrome-Lighthouse', 'CJB\\.NET Proxy', 'classify', 'Claymont\\.com', 'cloakdetect/', 'CloudFlare-AlwaysOnline', 'clown', 'cnet\\.com', 'COAST WebMaster Pro/', 'CoBITSProbe', 'coccoc', 'cocoal\\.icio\\.us/', 'ColdFusion', 'collage\\.cgi/', 'collect', 'combine/', 'Commons-HttpClient', 'ContentSmartz', 'contenttabreceiver', 'control', 'convera', 'copperegg/revealuptime/fremontca', 'coralwebprx/', 'cosmos', 'Covac UPPS Cathan', 'Covario-IDS', 'crawl', 'crowsnest/', 'csci_b659/', 'Custo x\\.x \\(www\\.netwu\\.com\\)', 'cuwhois/', 'CyberPatrol', 'DA \\d', 'DAP x', 'DareBoost', 'datacha0s/', 'datafountains/dmoz', 'Datanyze', 'dataprovider', 'DAUMOA-video', 'dbdig\\(http://www\\.prairielandconsulting\\.com\\)', 'DBrowse \\d', 'dc-sakura/x\\.xx', 'DDD', 'deep[-\\s]?link', 'deepak-usc/isi', 'delegate/', 'DepSpid', 'detector', 'developers\\.google\\.com\\/\\+\\/web\\/snippet\\/', 'diagem/', 'diamond/x\\.0', 'Digg', 'DigOut4U', 'DISCo Pump x\\.x', 'dlman', 'dlvr\\.it/', 'DnloadMage', 'docomo/', 'DomainAppender', 'Download Demon', 'Download Druid', 'Download Express', 'Download Master', 'Download Ninja', 'Download Wonder', 'download(?:s|er)', 'Download\\.exe', 'DownloadDirect', 'DreamPassport', 'drupact', 'Drupal', 'DSurf15', 'DTAAgent', 'DTS Agent', 'Dual Proxy', 'e-sense', 'EARTHCOM', 'easydl/', 'EBrowse \\d', 'ecairn\\.com/grabber', 'echo!/', 'efp@gmx\\.net', 'egothor/', 'ejupiter\\.com', 'EldoS TimelyWeb/', 'ElectricMonk', 'EmailWolf', 'Embedly', 'envolk', 'ESurf15', 'evaliant', 'eventax/', 'Evliya Celebi', 'exactseek\\.com', 'Exalead', 'Expired Domain Sleuth', 'Exploratodo/', 'extract', 'EyeCatcher', 'eyes', 'ezooms', 'facebookexternalhit', 'faedit/', 'FairAd Client', 'fantom', 'FastBug', 'Faveeo/', 'FavIconizer', 'FavOrg', 'FDM \\d', 'feed', 'feeltiptop\\.com', 'fetch', 'fileboost\\.net/', 'filtrbox/', 'FindAnISP\\.com', 'finder', 'findlink', 'findthatfile', 'firefly/', 'FlashGet', 'FLATARTS_FAVICO', 'flexum/', 'FlipboardProxy/', 'FlipboardRSS/', 'fluffy', 'flunky', 'focusedsampler/', 'FollowSite', 'forensiq\\.com', 'francis/', 'freshdownload/x\\.xx', 'FSurf', 'FuseBulb\\.Com', 'g00g1e\\.net', 'galaxy\\.com', 'gather', 'gazz/x\\.x', 'geek-tools\\.org', 'genieknows', 'Genieo', 'getright(pro)?/', 'getter', 'ghostroutehunter/', 'gigabaz/', 'GigablastOpenSource', 'go!zilla', 'go-ahead-got-it/', 'Go-http-client', 'GoBeez', 'goblin/', 'GoForIt\\.com', 'Goldfire Server', 'gonzo[1-2]', 'gooblog/', 'goofer/', 'Google Favicon', 'Google Page Speed Insights', 'Google Web Preview', 'Google Wireless Transcoder', 'Google-PhysicalWeb', 'Google-Site-Verification', 'Google-Structured-Data-Testing-Tool', 'google-xrawler', 'GoogleImageProxy', 'gopher', 'gossamer-threads\\.com', 'grapefx/', 'gromit/', 'GroupHigh/', 'grub-client', 'GTmetrix', 'gulliver/', 'H010818', 'hack', 'harvest', 'haste/', 'HeadlessChrome/', 'helix/', 'heritrix', 'HiDownload', 'hippias/', 'HitList', 'Holmes', 'hotmail.com', 'hound', 'htdig', 'html2', 'http-header-abfrage/', 'http://anonymouse\\.org/', 'http://ask\\.24x\\.info/', 'http://www\\.ip2location\\.com', 'http://www\\.monogol\\.de', 'http://www\\.sygol\\.com', 'http://www\\.timelyweb\\.com/', 'http::lite/', 'http_client', 'HTTPGet', 'HTTPResume', 'httpunit', 'httrack', 'HubSpot Marketing Grader', 'hyperestraier/', 'HyperixScoop', 'ichiro', 'ics \\d', 'IDA', 'ideare - SignSite', 'idwhois\\.info', 'IEFav172Free', 'iframely/', 'IlTrovatore-Setaccio', 'imageengine/', 'images', 'imagewalker/', 'InAGist', 'incywincy\\(http://www\\.look\\.com\\)', 'index', 'info@pubblisito\\.com', 'infofly/', 'infolink/', 'infomine/', 'InfoSeek Sidewinder/', 'InfoWizards Reciprocal Link System PRO', 'inkpeek\\.com', 'Insitornaut', 'inspectorwww/', 'InstallShield DigitalWizard', 'integrity/', 'integromedb', 'intelix/', 'intelliseek\\.com', 'Internet Ninja', 'internetlinkagent/', 'InterseekWeb', 'IODC', 'IOI', 'ips-agent', 'iqdb/', 'iria/', 'irvine/', 'isitup\\.org', 'isurf', 'ivia/', 'iwagent/', 'j-phone/', 'Jack', 'java/', 'JBH Agent 2\\.0', 'JemmaTheTourist', 'JetCar', 'jigsaw/', 'jorgee', 'Journster', 'kalooga/kalooga-4\\.0-dev-datahouse', 'Kapere', 'kasparek@naparek\\.cz', 'KDDI-SN22', 'ke_1\\.0/', 'Kevin', 'KimonoLabs', 'kit-fireball/', 'KnowItAll', 'knowledge\\.com/', 'Kontiki Client', 'kulturarw3/', 'kummhttp/', 'L\\.webis', 'labrador/', 'Lachesis', 'Larbin', 'leech', 'leia/', 'LibertyW', 'library', 'libweb/clshttp', 'lightningdownload/', 'Lincoln State Web Browser', 'Link Commander', 'Link Valet', 'linkalarm/', 'linkdex', 'LinkExaminer', 'Linkguard', 'linkman', 'LinkPimpin', 'LinkProver', 'Links2Go', 'linksonar/', 'LinkStash', 'LinkTiger', 'LinkWalker', 'Lipperhey Link Explorer', 'Lipperhey SEO Service', 'Lipperhey Site Explorer', 'Lipperhey-Kaus-Australis/', 'loader', 'loadimpactrload/', 'locate', 'locator', 'Look\\.com', 'Lovel', 'ltx71', 'lwp-', 'lwp::', 'mabontland', 'mack', 'magicwml/', 'mail\\.ru/', 'mammoth/', 'MantraAgent', 'MapoftheInternet\\.com', 'Marketwave Hit List', 'Martini', 'Marvin', 'masagool/', 'MasterSeek', 'Mastodon/', 'Mata Hari/', 'mediaget', 'Mediapartners-Google', 'MegaSheep', 'Megite', 'Mercator', 'metainspector/', 'metaspinner/', 'metatagsdir/', 'MetaURI', 'MicroBaz', 'Microsoft_Internet_Explorer_5', 'miixpc/', 'Mindjet MindManager', 'Miniflux/', 'miniflux\\.net', 'Missouri College Browse', 'Mister Pix', 'Mizzu Labs', 'Mo College', 'moget/x\\.x', 'mogimogi', 'moiNAG', 'monitor', 'monkeyagent', 'MonTools\\.com', 'Morning Paper', 'Mrcgiguy', 'MSIE or Firefox mutant', 'msnptc/', 'msproxy/', 'Mulder', 'multiBlocker browser', 'multitext/', 'MuscatFerret', 'MusicWalker2', 'MVAClient', 'naofavicon4ie/', 'naparek\\.cz', 'netants/', 'Netcraft Web Server Survey', 'NetcraftSurveyAgent/', 'netlookout/', 'netluchs/', 'NetMechanic', 'netpumper/x\\.xx', 'NetSprint', 'netwu\\.com', 'neutrinoapi/', 'NewsGator', 'newt', 'nico/', 'Nmap Scripting Engine', 'NORAD National Defence Network', 'Norton-Safeweb', 'Notifixious', 'noyona_0_1', 'nsauditor/', 'nutch', 'Nymesis', 'ocelli/', 'Octopus', 'Octora Beta', 'ODP links', 'oegp', 'OliverPerry', 'omgili', 'Onet\\.pl', 'Oracle Application', 'Orbiter', 'OSSProxy', 'outbrain', 'ow\\.ly', 'ownCloud News/', 'ozelot/', 'Page Valet/', 'page2rss', 'Pagebull', 'PagmIEDownload', 'Panopta v', 'panscient', 'parasite/', 'parse', 'pavuk/', 'PayPal IPN', 'PBrowse', 'Pcore-HTTP', 'pd02_1', 'Peew', 'perl', 'Perman Surfer', 'PEval', 'phantom', 'photon/', 'php/\\d', 'Pingdom', 'Pingoscope', 'pingspot/', 'pinterest\\.com', 'Pita', 'Pizilla', 'Ploetz \\+ Zeller', 'Plukkie', 'pockey-gethtml/', 'pockey/x\\.x\\.x', 'Pockey7', 'Pogodak', 'Poirot', 'Pompos', 'popdexter/', 'Port Huron Labs', 'PostFavorites', 'PostPost', 'postrank', 'Powermarks', 'PR-CY.RU', 'pricepi\\.com', 'prlog\\.ru', 'pro-sitemaps\\.com', 'program', 'Project XP5', 'protopage/', 'proximic', 'PSurf15a', 'psycheclone', 'puf/', 'PureSight', 'PuxaRapido', 'python', 'Qango\\.com Web Directory', 'QuepasaCreep', 'Qwantify', 'QXW03018', 'rabaz', 'Radian6', 'RankSonicSiteAuditor/', 'rating', 'readability/', 'reader', 'realdownload/', 'reaper', 'ReGet', 'responsecodetest/', 'retrieve', 'rico/', 'Riddler', 'Rival IQ', 'Rivva', 'RMA/1\\.0', 'RoboPal', 'Robosourcer', 'robozilla/', 'rotondo/', 'rpt-httpclient/', 'RSurf15a', 'samualt9', 'saucenao/', 'SBIder', 'scan', 'scooter', 'ScoutAbout', 'scoutant/', 'ScoutJet', 'scoutmaster', 'scrape', 'Scrapy', 'Scrubby', 'search', 'Seeker\\.lookseek\\.com', 'seer', 'semaforo\\.net', 'semager/', 'semanticdiscovery', 'seo-nastroj\\.cz', 'SEOCentro', 'SEOstats', 'Seznam screenshot-generator', 'Shagseeker', 'ShopWiki', 'Siigle Orumcex', 'SimplyFast\\.info', 'Simpy', 'siphon', 'Site Server', 'Site24x7', 'SiteBar', 'SiteCondor', 'siteexplorer\\.info', 'Siteimprove', 'SiteRecon', 'SiteSnagger', 'sitesucker/', 'SiteUptime\\.com', 'SiteXpert', 'sitexy\\.com', 'skampy/', 'skimpy/', 'SkypeUriPreview', 'skywalker/', 'slarp/', 'slider\\.com', 'slurp', 'smartdownload/', 'smartwit\\.com', 'Snacktory', 'Snappy', 'sniff', 'sogou', 'sohu agent', 'somewhere', 'speeddownload/', 'speedy', 'speng', 'Sphere Scout', 'Sphider', 'spider', 'spinne/', 'spy', 'squidclam', 'Squider', 'Sqworm', 'SSurf15a', 'StackRambler', 'stamina/', 'StatusCake', 'suchbaer\\.de', 'summify', 'SuperCleaner', 'SurferF3', 'SurfMaster', 'suzuran', 'sweep', 'synapse', 'syncit/x\\.x', 'szukacz/', 'T-H-U-N-D-E-R-S-T-O-N-E', 'tags2dir\\.com/', 'Tagword', 'Talkro Web-Shot', 'targetblaster\\.com/', 'TargetSeek', 'Teleport Pro', 'teoma', 'Teradex Mapper', 'Theophrastus', 'thumb', 'TinEye', 'tkensaku/x\\.x\\(http://www\\.tkensaku\\.com/q\\.html\\)', 'tracker', 'truwoGPS', 'TSurf15a', 'tuezilla', 'tumblr/', 'Twingly Recon', 'Twotrees Reactive Filter', 'TygoProwler', 'Ultraseek', 'Under the Rainbow', 'unknownght\\.com', 'UofTDB_experiment', 'updated', 'url', 'user-agent', 'utility', 'utorrent/', 'Vagabondo', 'vakes/', 'vb wininet', 'venus/fedoraplanet', 'verifier', 'verify', 'Version: xxxx Type:xx', 'versus', 'verzamelgids/', 'viking', 'vkshare', 'voltron', 'vonna', 'Vortex', 'voyager-hc/', 'VYU2', 'W3C-mobileOK/', 'w3c-webcon/', 'W3C_Unicorn/', 'w3dt\\.net', 'Wappalyzer', 'warez', 'Watchfire WebXM', 'wavefire/', 'Waypath Scout', 'wbsrch\\.com', 'Web Snooper', 'web-bekannt', 'webbandit/', 'webbug/', 'Webclipping\\.com', 'webcollage', 'WebCompass', 'webcookies', 'webcorp/', 'webcraft', 'WebDataStats/', 'Webglimpse', 'webgobbler/', 'webinator', 'weblight/', 'Weblog Attitude Diffusion', 'webmastercoffee/', 'webminer/x\\.x', 'webmon ', 'WebPix', 'Website Explorer', 'Websnapr/', 'Websquash\\.com', 'webstat/', 'Webster v0\\.', 'webstripper/', 'webtrafficexpress/x\\.0', 'webtrends/', 'WebVac', 'webval/', 'Webverzeichnis\\.de', 'wf84', 'WFARC', 'wget', 'whatsapp', 'whatsmyip\\.org', 'whatsup/x\\.x', 'whatuseek_winona/', 'Whizbang', 'whoami', 'whoiam', 'Wildsoft Surfer', 'WinGet', 'WinHTTP', 'wish-project', 'WomlpeFactory', 'WordPress\\.com mShots', 'WorldLight', 'worqmada/', 'worth', 'wotbox', 'WoW Lemmings Kathune', 'WSN Links', 'wusage/x\\.0@boutell\\.com', 'wwlib/linux', 'www-mechanize/', 'www\\.ackerm\\.com', 'www\\.alertra\\.com', 'www\\.arianna\\.it', 'www\\.ba\\.be', 'www\\.de\\.com', 'www\\.evri\\.com/evrinid', 'www\\.gozilla\\.com', 'www\\.idealobserver\\.com', 'www\\.iltrovatore\\.it', 'www\\.iskanie\\.com', 'www\\.kosmix\\.com', 'www\\.megaproxy\\.com', 'www\\.moreover\\.com', 'www\\.mowser\\.com', 'www\\.nearsoftware\\.com', 'www\\.ssllabs\\.com', 'wwwc/', 'wwwoffle/', 'wwwster/', 'wxDownload Fast', 'Xenu Link Sleuth', "Xenu's Link Sleuth", 'xirq/', 'XML Sitemaps Generator', 'xrl/', 'Xylix', 'Y!J-ASR', 'y!j-srd/', 'y!oasis/test', 'yacy', 'yahoo', 'YandeG', 'yandex', 'yanga', 'yarienavoir\\.net/', 'yeti', 'Yoleo', 'Yoono', 'youtube-dl', 'Zao', 'Zearchit', 'zedzo\\.digest/', 'zeus', 'zgrab', 'Zippy', 'ZnajdzFoto/Image', 'ZyBorg', 'googlebot', 'Googlebot-Mobile', 'Googlebot-Image', 'bingbot', 'java', 'curl', 'Python-urllib', 'libwww', 'phpcrawl', 'msnbot', 'jyxobot', 'FAST-WebCrawler', 'FAST Enterprise Crawler', 'seekbot', 'gigablast', 'exabot', 'ngbot', 'ia_archiver', 'GingerCrawler', 'webcrawler', 'grub.org', 'UsineNouvelleCrawler', 'antibot', 'netresearchserver', 'bibnum.bnf', 'msrbot', 'yacybot', 'AISearchBot', 'tagoobot', 'MJ12bot', 'dotbot', 'woriobot', 'buzzbot', 'mlbot', 'yandexbot', 'purebot', 'Linguee Bot', 'Voyager', 'voilabot', 'baiduspider', 'citeseerxbot', 'spbot', 'twengabot', 'turnitinbot', 'scribdbot', 'sitebot', 'Adidxbot', 'blekkobot', 'dotbot', 'Mail.RU_Bot', 'discobot', 'europarchive.org', 'NerdByNature.Bot', 'sistrix crawler', 'ahrefsbot', 'domaincrawler', 'wbsearchbot', 'ccbot', 'edisterbot', 'seznambot', 'ec2linkfinder', 'gslfbot', 'aihitbot', 'intelium_bot', 'RetrevoPageAnalyzer', 'lb-spider', 'lssbot', 'careerbot', 'wocbot', 'DuckDuckBot', 'lssrocketcrawler', 'webcompanycrawler', 'acoonbot', 'openindexspider', 'gnam gnam spider', 'web-archive-net.com.bot', 'backlinkcrawler', 'content crawler spider', 'toplistbot', 'seokicks-robot', 'it2media-domain-crawler', 'ip-web-crawler.com', 'siteexplorer.info', 'elisabot', 'blexbot', 'arabot', 'WeSEE:Search', 'niki-bot', 'CrystalSemanticsBot', 'rogerbot', '360Spider', 'psbot', 'InterfaxScanBot', 'g00g1e.net', 'GrapeshotCrawler', 'urlappendbot', 'brainobot', 'fr-crawler', 'SimpleCrawler', 'Livelapbot', 'Twitterbot', 'cXensebot', 'smtbot', 'bnf.fr_bot', 'A6-Indexer', 'Facebot', 'Twitterbot', 'OrangeBot', 'memorybot', 'AdvBot', 'MegaIndex', 'SemanticScholarBot', 'nerdybot', 'xovibot', 'archive.org_bot', 'Applebot', 'TweetmemeBot', 'crawler4j', 'findxbot', 'SemrushBot', 'yoozBot', 'lipperhey', 'Domain Re-Animator Bot'];

  try {
    // Address: Cubot browser
    // Risk: Uses lookbehind assertion
    new RegExp('(?<! cu)bot').test('dangerbot');
    list.splice(list.lastIndexOf('bot'), 1);
    list.push('(?<! cu)bot');
  } catch (error) {// ignore errors
  }

  var regex = new RegExp('(' + list.join('|') + ')', 'i');
  /**
   * Check if string matches known crawler patterns
   * @param  {string} userAgent
   * @return {boolean}
   */

  function isbot (userAgent) {
    return regex.test(userAgent);
  }

  /**
   * https://github.com/jLynx/PrivateWindowCheck
   */
  function chrome76Detection() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate().then(function (_ref) {
        var usage = _ref.usage,
            quota = _ref.quota;
        if (quota < 120000000) return true;else return false;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  function isNewChrome() {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);

    if (pieces == null || pieces.length != 5) {
      return undefined;
    }

    var major = pieces.map(function (piece) {
      return parseInt(piece, 10);
    })[1];
    if (major >= 76) return true;
    return false;
  }

  var PrivateWindow = new Promise(function (resolve, reject) {
    try {
      var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;

      if (isSafari) {
        //Safari
        var e = false;

        if (window.safariIncognito) {
          e = true;
        } else {
          try {
            window.openDatabase(null, null, null, null);
            window.localStorage.setItem('test', 1);
            resolve(false);
          } catch (t) {
            e = true;
            resolve(true);
          }

          void !e && (e = !1, window.localStorage.removeItem('test'));
        }
      } else if (navigator.userAgent.includes('Firefox')) {
        //Firefox
        var db = indexedDB.open('test');

        db.onerror = function () {
          resolve(true);
        };

        db.onsuccess = function () {
          resolve(false);
        };
      } else if (navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Trident') || navigator.userAgent.includes('msie')) {
        //Edge or IE
        if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) resolve(true);
        resolve(false);
      } else {
        //Normally ORP or Chrome
        //Other
        if (isNewChrome()) resolve(chrome76Detection());
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) resolve(null);else {
          fs(window.TEMPORARY, 100, function (fs) {
            resolve(false);
          }, function (err) {
            resolve(true);
          });
        }
      }
    } catch (err) {
      //TODO: error loglama yapılacak
      console.log(err);
      resolve(null);
    }
  });
  function isPrivateWindow () {
    return PrivateWindow;
  }

  var publicMethods = {
    initialize: function initialize(callback) {
      if (pushClient.detected() && 'true' == 'true') {
        window.addEventListener('load', function () {
          start(callback);
        });
      } else {
        if (callback) {
          callback();
        }
      }
    },

    /**************** Web Push ********************/
    showNativePrompt: function showNativePrompt(callback) {
      showNativePrompt$1().then(function (result) {
        if (callback) {
          callback(result);
        }
      });
    },
    showCustomPrompt: function showCustomPrompt(callback) {
      showCustomPrompt$1().then(function (result) {
        if (callback) {
          callback(result);
        }
      });
    },
    getNotificationPermission: function getNotificationPermission(callback) {

      if (callback) {
        callback(pushClient.getPermission());
      }
    },
    getToken: function getToken$1(callback) {

      if (callback) {
        callback(getToken());
      }
    },
    isPushNotificationsSupported: function isPushNotificationsSupported(callback) {

      if (callback) {
        callback(pushClient.detected());
      }
    },

    /**************** Event Collection ********************/
    getDeviceId: function getDeviceId$1(callback) {
      getDeviceId().then(function (deviceId) {
        if (callback) {
          callback(deviceId);
        }
      });
    },
    provideUserConsent: function provideUserConsent() {//TODO
    },
    sendDeviceEvent: function sendDeviceEvent(table, data, callback) {
      getDeviceId().then(function (deviceId) {
        sendEvent(table, deviceId, data);

        if (callback) {
          //TODO: burası request döndükten sonra yapılabilir
          callback();
        }
      });
    },
    sendCustomEvent: function sendCustomEvent(table, key, data, callback) {
      sendEvent(table, key, data);

      if (callback) {
        //TODO: burası request döndükten sonra yapılabilir
        callback();
      }
    },
    setContactKey: function setContactKey$1(val, callback) {
      setContactKey(val);

      if (callback) {
        callback();
      }
    },
    getContactKey: function getContactKey$1(callback) {
      if (callback) {
        callback(getContactKey());
      }
    }
  }; //TODO: event handler'lar yapılacak

  if ('Promise' in window && 'fetch' in window) {
    isBotOrPrivateWindow().then(function (botOrPrivate) {
      if (botOrPrivate !== true) {
        var q = window.dengage.q || [];

        window.dengage = function () {
          publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
        };

        q.forEach(function (command) {
          //TODO asenkron olarak bekleyerek çalışmalı
          window.dengage.apply(this, command);
        });
      }
    });
  }

  function isBotOrPrivateWindow() {
    if (isbot(navigator.userAgent)) {
      return Promise.resolve(true);
    } else {
      return isPrivateWindow();
    }
  }
  /*
  (function(p, u, s, h, x) {
    p.dengage =
      p.dengage ||
      function() {
        (p.dengage.q = p.dengage.q || []).push(arguments);
      };
    h = u.getElementsByTagName("head")[0];
    x = u.createElement("script");
    x.async = 1;
    x.src = s;
    h.appendChild(x);
  })(window, document, "");
  */

}(firebase));
