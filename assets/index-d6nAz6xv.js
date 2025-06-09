(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();function Al(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var c0={exports:{}},Ol={},f0={exports:{}},V={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga=Symbol.for("react.element"),i_=Symbol.for("react.portal"),o_=Symbol.for("react.fragment"),a_=Symbol.for("react.strict_mode"),s_=Symbol.for("react.profiler"),l_=Symbol.for("react.provider"),u_=Symbol.for("react.context"),c_=Symbol.for("react.forward_ref"),f_=Symbol.for("react.suspense"),h_=Symbol.for("react.memo"),d_=Symbol.for("react.lazy"),Yd=Symbol.iterator;function p_(e){return e===null||typeof e!="object"?null:(e=Yd&&e[Yd]||e["@@iterator"],typeof e=="function"?e:null)}var h0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},d0=Object.assign,p0={};function Ji(e,t,r){this.props=e,this.context=t,this.refs=p0,this.updater=r||h0}Ji.prototype.isReactComponent={};Ji.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ji.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function m0(){}m0.prototype=Ji.prototype;function rh(e,t,r){this.props=e,this.context=t,this.refs=p0,this.updater=r||h0}var nh=rh.prototype=new m0;nh.constructor=rh;d0(nh,Ji.prototype);nh.isPureReactComponent=!0;var qd=Array.isArray,v0=Object.prototype.hasOwnProperty,ih={current:null},g0={key:!0,ref:!0,__self:!0,__source:!0};function y0(e,t,r){var n,i={},o=null,a=null;if(t!=null)for(n in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(o=""+t.key),t)v0.call(t,n)&&!g0.hasOwnProperty(n)&&(i[n]=t[n]);var s=arguments.length-2;if(s===1)i.children=r;else if(1<s){for(var l=Array(s),u=0;u<s;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(n in s=e.defaultProps,s)i[n]===void 0&&(i[n]=s[n]);return{$$typeof:ga,type:e,key:o,ref:a,props:i,_owner:ih.current}}function m_(e,t){return{$$typeof:ga,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function oh(e){return typeof e=="object"&&e!==null&&e.$$typeof===ga}function v_(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Xd=/\/+/g;function gu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?v_(""+e.key):t.toString(36)}function Rs(e,t,r,n,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case ga:case i_:a=!0}}if(a)return a=e,i=i(a),e=n===""?"."+gu(a,0):n,qd(i)?(r="",e!=null&&(r=e.replace(Xd,"$&/")+"/"),Rs(i,t,r,"",function(u){return u})):i!=null&&(oh(i)&&(i=m_(i,r+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Xd,"$&/")+"/")+e)),t.push(i)),1;if(a=0,n=n===""?".":n+":",qd(e))for(var s=0;s<e.length;s++){o=e[s];var l=n+gu(o,s);a+=Rs(o,t,r,l,i)}else if(l=p_(e),typeof l=="function")for(e=l.call(e),s=0;!(o=e.next()).done;)o=o.value,l=n+gu(o,s++),a+=Rs(o,t,r,l,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function ja(e,t,r){if(e==null)return e;var n=[],i=0;return Rs(e,n,"","",function(o){return t.call(r,o,i++)}),n}function g_(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var st={current:null},bs={transition:null},y_={ReactCurrentDispatcher:st,ReactCurrentBatchConfig:bs,ReactCurrentOwner:ih};function w0(){throw Error("act(...) is not supported in production builds of React.")}V.Children={map:ja,forEach:function(e,t,r){ja(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return ja(e,function(){t++}),t},toArray:function(e){return ja(e,function(t){return t})||[]},only:function(e){if(!oh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};V.Component=Ji;V.Fragment=o_;V.Profiler=s_;V.PureComponent=rh;V.StrictMode=a_;V.Suspense=f_;V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=y_;V.act=w0;V.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=d0({},e.props),i=e.key,o=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,a=ih.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)v0.call(t,l)&&!g0.hasOwnProperty(l)&&(n[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)n.children=r;else if(1<l){s=Array(l);for(var u=0;u<l;u++)s[u]=arguments[u+2];n.children=s}return{$$typeof:ga,type:e.type,key:i,ref:o,props:n,_owner:a}};V.createContext=function(e){return e={$$typeof:u_,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:l_,_context:e},e.Consumer=e};V.createElement=y0;V.createFactory=function(e){var t=y0.bind(null,e);return t.type=e,t};V.createRef=function(){return{current:null}};V.forwardRef=function(e){return{$$typeof:c_,render:e}};V.isValidElement=oh;V.lazy=function(e){return{$$typeof:d_,_payload:{_status:-1,_result:e},_init:g_}};V.memo=function(e,t){return{$$typeof:h_,type:e,compare:t===void 0?null:t}};V.startTransition=function(e){var t=bs.transition;bs.transition={};try{e()}finally{bs.transition=t}};V.unstable_act=w0;V.useCallback=function(e,t){return st.current.useCallback(e,t)};V.useContext=function(e){return st.current.useContext(e)};V.useDebugValue=function(){};V.useDeferredValue=function(e){return st.current.useDeferredValue(e)};V.useEffect=function(e,t){return st.current.useEffect(e,t)};V.useId=function(){return st.current.useId()};V.useImperativeHandle=function(e,t,r){return st.current.useImperativeHandle(e,t,r)};V.useInsertionEffect=function(e,t){return st.current.useInsertionEffect(e,t)};V.useLayoutEffect=function(e,t){return st.current.useLayoutEffect(e,t)};V.useMemo=function(e,t){return st.current.useMemo(e,t)};V.useReducer=function(e,t,r){return st.current.useReducer(e,t,r)};V.useRef=function(e){return st.current.useRef(e)};V.useState=function(e){return st.current.useState(e)};V.useSyncExternalStore=function(e,t,r){return st.current.useSyncExternalStore(e,t,r)};V.useTransition=function(){return st.current.useTransition()};V.version="18.3.1";f0.exports=V;var q=f0.exports;const $0=Al(q);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w_=q,$_=Symbol.for("react.element"),__=Symbol.for("react.fragment"),S_=Object.prototype.hasOwnProperty,E_=w_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,A_={key:!0,ref:!0,__self:!0,__source:!0};function _0(e,t,r){var n,i={},o=null,a=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(n in t)S_.call(t,n)&&!A_.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)i[n]===void 0&&(i[n]=t[n]);return{$$typeof:$_,type:e,key:o,ref:a,props:i,_owner:E_.current}}Ol.Fragment=__;Ol.jsx=_0;Ol.jsxs=_0;c0.exports=Ol;var p=c0.exports,Cc={},S0={exports:{}},Lt={},E0={exports:{}},A0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(L,j){var U=L.length;L.push(j);e:for(;0<U;){var pe=U-1>>>1,Me=L[pe];if(0<i(Me,j))L[pe]=j,L[U]=Me,U=pe;else break e}}function r(L){return L.length===0?null:L[0]}function n(L){if(L.length===0)return null;var j=L[0],U=L.pop();if(U!==j){L[0]=U;e:for(var pe=0,Me=L.length,Pa=Me>>>1;pe<Pa;){var bn=2*(pe+1)-1,vu=L[bn],xn=bn+1,Fa=L[xn];if(0>i(vu,U))xn<Me&&0>i(Fa,vu)?(L[pe]=Fa,L[xn]=U,pe=xn):(L[pe]=vu,L[bn]=U,pe=bn);else if(xn<Me&&0>i(Fa,U))L[pe]=Fa,L[xn]=U,pe=xn;else break e}}return j}function i(L,j){var U=L.sortIndex-j.sortIndex;return U!==0?U:L.id-j.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,s=a.now();e.unstable_now=function(){return a.now()-s}}var l=[],u=[],c=1,f=null,h=3,d=!1,y=!1,_=!1,$=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(L){for(var j=r(u);j!==null;){if(j.callback===null)n(u);else if(j.startTime<=L)n(u),j.sortIndex=j.expirationTime,t(l,j);else break;j=r(u)}}function E(L){if(_=!1,g(L),!y)if(r(l)!==null)y=!0,Q(O);else{var j=r(u);j!==null&&ye(E,j.startTime-L)}}function O(L,j){y=!1,_&&(_=!1,v(A),A=-1),d=!0;var U=h;try{for(g(j),f=r(l);f!==null&&(!(f.expirationTime>j)||L&&!I());){var pe=f.callback;if(typeof pe=="function"){f.callback=null,h=f.priorityLevel;var Me=pe(f.expirationTime<=j);j=e.unstable_now(),typeof Me=="function"?f.callback=Me:f===r(l)&&n(l),g(j)}else n(l);f=r(l)}if(f!==null)var Pa=!0;else{var bn=r(u);bn!==null&&ye(E,bn.startTime-j),Pa=!1}return Pa}finally{f=null,h=U,d=!1}}var R=!1,b=null,A=-1,x=5,T=-1;function I(){return!(e.unstable_now()-T<x)}function B(){if(b!==null){var L=e.unstable_now();T=L;var j=!0;try{j=b(!0,L)}finally{j?G():(R=!1,b=null)}}else R=!1}var G;if(typeof m=="function")G=function(){m(B)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,St=Te.port2;Te.port1.onmessage=B,G=function(){St.postMessage(null)}}else G=function(){$(B,0)};function Q(L){b=L,R||(R=!0,G())}function ye(L,j){A=$(function(){L(e.unstable_now())},j)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_continueExecution=function(){y||d||(y=!0,Q(O))},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return r(l)},e.unstable_next=function(L){switch(h){case 1:case 2:case 3:var j=3;break;default:j=h}var U=h;h=j;try{return L()}finally{h=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(L,j){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var U=h;h=L;try{return j()}finally{h=U}},e.unstable_scheduleCallback=function(L,j,U){var pe=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?pe+U:pe):U=pe,L){case 1:var Me=-1;break;case 2:Me=250;break;case 5:Me=1073741823;break;case 4:Me=1e4;break;default:Me=5e3}return Me=U+Me,L={id:c++,callback:j,priorityLevel:L,startTime:U,expirationTime:Me,sortIndex:-1},U>pe?(L.sortIndex=U,t(u,L),r(l)===null&&L===r(u)&&(_?(v(A),A=-1):_=!0,ye(E,U-pe))):(L.sortIndex=Me,t(l,L),y||d||(y=!0,Q(O))),L},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(L){var j=h;return function(){var U=h;h=j;try{return L.apply(this,arguments)}finally{h=U}}}})(A0);E0.exports=A0;var O_=E0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R_=q,Tt=O_;function C(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var O0=new Set,Zo={};function Xn(e,t){Bi(e,t),Bi(e+"Capture",t)}function Bi(e,t){for(Zo[e]=t,e=0;e<t.length;e++)O0.add(t[e])}var Nr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tc=Object.prototype.hasOwnProperty,b_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qd={},Zd={};function x_(e){return Tc.call(Zd,e)?!0:Tc.call(Qd,e)?!1:b_.test(e)?Zd[e]=!0:(Qd[e]=!0,!1)}function C_(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function T_(e,t,r,n){if(t===null||typeof t>"u"||C_(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function lt(e,t,r,n,i,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var Ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ve[e]=new lt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ve[t]=new lt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ve[e]=new lt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ve[e]=new lt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ve[e]=new lt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ve[e]=new lt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ve[e]=new lt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ve[e]=new lt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ve[e]=new lt(e,5,!1,e.toLowerCase(),null,!1,!1)});var ah=/[\-:]([a-z])/g;function sh(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ah,sh);Ve[t]=new lt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ah,sh);Ve[t]=new lt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ah,sh);Ve[t]=new lt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ve[e]=new lt(e,1,!1,e.toLowerCase(),null,!1,!1)});Ve.xlinkHref=new lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ve[e]=new lt(e,1,!1,e.toLowerCase(),null,!0,!0)});function lh(e,t,r,n){var i=Ve.hasOwnProperty(t)?Ve[t]:null;(i!==null?i.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(T_(t,r,i,n)&&(r=null),n||i===null?x_(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,n=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var Dr=R_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ba=Symbol.for("react.element"),gi=Symbol.for("react.portal"),yi=Symbol.for("react.fragment"),uh=Symbol.for("react.strict_mode"),Lc=Symbol.for("react.profiler"),R0=Symbol.for("react.provider"),b0=Symbol.for("react.context"),ch=Symbol.for("react.forward_ref"),Ic=Symbol.for("react.suspense"),kc=Symbol.for("react.suspense_list"),fh=Symbol.for("react.memo"),Xr=Symbol.for("react.lazy"),x0=Symbol.for("react.offscreen"),Jd=Symbol.iterator;function go(e){return e===null||typeof e!="object"?null:(e=Jd&&e[Jd]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Object.assign,yu;function ko(e){if(yu===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);yu=t&&t[1]||""}return`
`+yu+e}var wu=!1;function $u(e,t){if(!e||wu)return"";wu=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var n=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){n=u}e.call(t.prototype)}else{try{throw Error()}catch(u){n=u}e()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=n.stack.split(`
`),a=i.length-1,s=o.length-1;1<=a&&0<=s&&i[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(i[a]!==o[s]){if(a!==1||s!==1)do if(a--,s--,0>s||i[a]!==o[s]){var l=`
`+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=s);break}}}finally{wu=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?ko(e):""}function L_(e){switch(e.tag){case 5:return ko(e.type);case 16:return ko("Lazy");case 13:return ko("Suspense");case 19:return ko("SuspenseList");case 0:case 2:case 15:return e=$u(e.type,!1),e;case 11:return e=$u(e.type.render,!1),e;case 1:return e=$u(e.type,!0),e;default:return""}}function Mc(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case yi:return"Fragment";case gi:return"Portal";case Lc:return"Profiler";case uh:return"StrictMode";case Ic:return"Suspense";case kc:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case b0:return(e.displayName||"Context")+".Consumer";case R0:return(e._context.displayName||"Context")+".Provider";case ch:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fh:return t=e.displayName||null,t!==null?t:Mc(e.type)||"Memo";case Xr:t=e._payload,e=e._init;try{return Mc(e(t))}catch{}}return null}function I_(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mc(t);case 8:return t===uh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function vn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function C0(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function k_(e){var t=C0(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,o=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){n=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Da(e){e._valueTracker||(e._valueTracker=k_(e))}function T0(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=C0(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function Gs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Nc(e,t){var r=t.checked;return ge({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ep(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=vn(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function L0(e,t){t=t.checked,t!=null&&lh(e,"checked",t,!1)}function Pc(e,t){L0(e,t);var r=vn(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Fc(e,t.type,r):t.hasOwnProperty("defaultValue")&&Fc(e,t.type,vn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function tp(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Fc(e,t,r){(t!=="number"||Gs(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Mo=Array.isArray;function Ii(e,t,r,n){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&n&&(e[r].defaultSelected=!0)}else{for(r=""+vn(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function jc(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(C(91));return ge({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function rp(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(C(92));if(Mo(r)){if(1<r.length)throw Error(C(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:vn(r)}}function I0(e,t){var r=vn(t.value),n=vn(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function np(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function k0(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bc(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?k0(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ha,M0=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ha=Ha||document.createElement("div"),Ha.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ha.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jo(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Fo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},M_=["Webkit","ms","Moz","O"];Object.keys(Fo).forEach(function(e){M_.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fo[t]=Fo[e]})});function N0(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Fo.hasOwnProperty(e)&&Fo[e]?(""+t).trim():t+"px"}function P0(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,i=N0(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,i):e[r]=i}}var N_=ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Dc(e,t){if(t){if(N_[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(C(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(C(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(C(61))}if(t.style!=null&&typeof t.style!="object")throw Error(C(62))}}function Hc(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wc=null;function hh(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Uc=null,ki=null,Mi=null;function ip(e){if(e=$a(e)){if(typeof Uc!="function")throw Error(C(280));var t=e.stateNode;t&&(t=Tl(t),Uc(e.stateNode,e.type,t))}}function F0(e){ki?Mi?Mi.push(e):Mi=[e]:ki=e}function j0(){if(ki){var e=ki,t=Mi;if(Mi=ki=null,ip(e),t)for(e=0;e<t.length;e++)ip(t[e])}}function B0(e,t){return e(t)}function D0(){}var _u=!1;function H0(e,t,r){if(_u)return e(t,r);_u=!0;try{return B0(e,t,r)}finally{_u=!1,(ki!==null||Mi!==null)&&(D0(),j0())}}function ea(e,t){var r=e.stateNode;if(r===null)return null;var n=Tl(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(C(231,t,typeof r));return r}var zc=!1;if(Nr)try{var yo={};Object.defineProperty(yo,"passive",{get:function(){zc=!0}}),window.addEventListener("test",yo,yo),window.removeEventListener("test",yo,yo)}catch{zc=!1}function P_(e,t,r,n,i,o,a,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(r,u)}catch(c){this.onError(c)}}var jo=!1,Vs=null,Ks=!1,Gc=null,F_={onError:function(e){jo=!0,Vs=e}};function j_(e,t,r,n,i,o,a,s,l){jo=!1,Vs=null,P_.apply(F_,arguments)}function B_(e,t,r,n,i,o,a,s,l){if(j_.apply(this,arguments),jo){if(jo){var u=Vs;jo=!1,Vs=null}else throw Error(C(198));Ks||(Ks=!0,Gc=u)}}function Qn(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function W0(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function op(e){if(Qn(e)!==e)throw Error(C(188))}function D_(e){var t=e.alternate;if(!t){if(t=Qn(e),t===null)throw Error(C(188));return t!==e?null:e}for(var r=e,n=t;;){var i=r.return;if(i===null)break;var o=i.alternate;if(o===null){if(n=i.return,n!==null){r=n;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===r)return op(i),e;if(o===n)return op(i),t;o=o.sibling}throw Error(C(188))}if(r.return!==n.return)r=i,n=o;else{for(var a=!1,s=i.child;s;){if(s===r){a=!0,r=i,n=o;break}if(s===n){a=!0,n=i,r=o;break}s=s.sibling}if(!a){for(s=o.child;s;){if(s===r){a=!0,r=o,n=i;break}if(s===n){a=!0,n=o,r=i;break}s=s.sibling}if(!a)throw Error(C(189))}}if(r.alternate!==n)throw Error(C(190))}if(r.tag!==3)throw Error(C(188));return r.stateNode.current===r?e:t}function U0(e){return e=D_(e),e!==null?z0(e):null}function z0(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=z0(e);if(t!==null)return t;e=e.sibling}return null}var G0=Tt.unstable_scheduleCallback,ap=Tt.unstable_cancelCallback,H_=Tt.unstable_shouldYield,W_=Tt.unstable_requestPaint,Ee=Tt.unstable_now,U_=Tt.unstable_getCurrentPriorityLevel,dh=Tt.unstable_ImmediatePriority,V0=Tt.unstable_UserBlockingPriority,Ys=Tt.unstable_NormalPriority,z_=Tt.unstable_LowPriority,K0=Tt.unstable_IdlePriority,Rl=null,dr=null;function G_(e){if(dr&&typeof dr.onCommitFiberRoot=="function")try{dr.onCommitFiberRoot(Rl,e,void 0,(e.current.flags&128)===128)}catch{}}var rr=Math.clz32?Math.clz32:Y_,V_=Math.log,K_=Math.LN2;function Y_(e){return e>>>=0,e===0?32:31-(V_(e)/K_|0)|0}var Wa=64,Ua=4194304;function No(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function qs(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,i=e.suspendedLanes,o=e.pingedLanes,a=r&268435455;if(a!==0){var s=a&~i;s!==0?n=No(s):(o&=a,o!==0&&(n=No(o)))}else a=r&~i,a!==0?n=No(a):o!==0&&(n=No(o));if(n===0)return 0;if(t!==0&&t!==n&&!(t&i)&&(i=n&-n,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-rr(t),i=1<<r,n|=e[r],t&=~i;return n}function q_(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function X_(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-rr(o),s=1<<a,l=i[a];l===-1?(!(s&r)||s&n)&&(i[a]=q_(s,t)):l<=t&&(e.expiredLanes|=s),o&=~s}}function Vc(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Y0(){var e=Wa;return Wa<<=1,!(Wa&4194240)&&(Wa=64),e}function Su(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function ya(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-rr(t),e[t]=r}function Q_(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-rr(r),o=1<<i;t[i]=0,n[i]=-1,e[i]=-1,r&=~o}}function ph(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-rr(r),i=1<<n;i&t|e[n]&t&&(e[n]|=t),r&=~i}}var te=0;function q0(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var X0,mh,Q0,Z0,J0,Kc=!1,za=[],on=null,an=null,sn=null,ta=new Map,ra=new Map,en=[],Z_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function sp(e,t){switch(e){case"focusin":case"focusout":on=null;break;case"dragenter":case"dragleave":an=null;break;case"mouseover":case"mouseout":sn=null;break;case"pointerover":case"pointerout":ta.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ra.delete(t.pointerId)}}function wo(e,t,r,n,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:o,targetContainers:[i]},t!==null&&(t=$a(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function J_(e,t,r,n,i){switch(t){case"focusin":return on=wo(on,e,t,r,n,i),!0;case"dragenter":return an=wo(an,e,t,r,n,i),!0;case"mouseover":return sn=wo(sn,e,t,r,n,i),!0;case"pointerover":var o=i.pointerId;return ta.set(o,wo(ta.get(o)||null,e,t,r,n,i)),!0;case"gotpointercapture":return o=i.pointerId,ra.set(o,wo(ra.get(o)||null,e,t,r,n,i)),!0}return!1}function ey(e){var t=jn(e.target);if(t!==null){var r=Qn(t);if(r!==null){if(t=r.tag,t===13){if(t=W0(r),t!==null){e.blockedOn=t,J0(e.priority,function(){Q0(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Yc(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Wc=n,r.target.dispatchEvent(n),Wc=null}else return t=$a(r),t!==null&&mh(t),e.blockedOn=r,!1;t.shift()}return!0}function lp(e,t,r){xs(e)&&r.delete(t)}function eS(){Kc=!1,on!==null&&xs(on)&&(on=null),an!==null&&xs(an)&&(an=null),sn!==null&&xs(sn)&&(sn=null),ta.forEach(lp),ra.forEach(lp)}function $o(e,t){e.blockedOn===t&&(e.blockedOn=null,Kc||(Kc=!0,Tt.unstable_scheduleCallback(Tt.unstable_NormalPriority,eS)))}function na(e){function t(i){return $o(i,e)}if(0<za.length){$o(za[0],e);for(var r=1;r<za.length;r++){var n=za[r];n.blockedOn===e&&(n.blockedOn=null)}}for(on!==null&&$o(on,e),an!==null&&$o(an,e),sn!==null&&$o(sn,e),ta.forEach(t),ra.forEach(t),r=0;r<en.length;r++)n=en[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<en.length&&(r=en[0],r.blockedOn===null);)ey(r),r.blockedOn===null&&en.shift()}var Ni=Dr.ReactCurrentBatchConfig,Xs=!0;function tS(e,t,r,n){var i=te,o=Ni.transition;Ni.transition=null;try{te=1,vh(e,t,r,n)}finally{te=i,Ni.transition=o}}function rS(e,t,r,n){var i=te,o=Ni.transition;Ni.transition=null;try{te=4,vh(e,t,r,n)}finally{te=i,Ni.transition=o}}function vh(e,t,r,n){if(Xs){var i=Yc(e,t,r,n);if(i===null)Iu(e,t,n,Qs,r),sp(e,n);else if(J_(i,e,t,r,n))n.stopPropagation();else if(sp(e,n),t&4&&-1<Z_.indexOf(e)){for(;i!==null;){var o=$a(i);if(o!==null&&X0(o),o=Yc(e,t,r,n),o===null&&Iu(e,t,n,Qs,r),o===i)break;i=o}i!==null&&n.stopPropagation()}else Iu(e,t,n,null,r)}}var Qs=null;function Yc(e,t,r,n){if(Qs=null,e=hh(n),e=jn(e),e!==null)if(t=Qn(e),t===null)e=null;else if(r=t.tag,r===13){if(e=W0(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Qs=e,null}function ty(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(U_()){case dh:return 1;case V0:return 4;case Ys:case z_:return 16;case K0:return 536870912;default:return 16}default:return 16}}var rn=null,gh=null,Cs=null;function ry(){if(Cs)return Cs;var e,t=gh,r=t.length,n,i="value"in rn?rn.value:rn.textContent,o=i.length;for(e=0;e<r&&t[e]===i[e];e++);var a=r-e;for(n=1;n<=a&&t[r-n]===i[o-n];n++);return Cs=i.slice(e,1<n?1-n:void 0)}function Ts(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ga(){return!0}function up(){return!1}function It(e){function t(r,n,i,o,a){this._reactName=r,this._targetInst=i,this.type=n,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(r=e[s],this[s]=r?r(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ga:up,this.isPropagationStopped=up,this}return ge(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Ga)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Ga)},persist:function(){},isPersistent:Ga}),t}var eo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yh=It(eo),wa=ge({},eo,{view:0,detail:0}),nS=It(wa),Eu,Au,_o,bl=ge({},wa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_o&&(_o&&e.type==="mousemove"?(Eu=e.screenX-_o.screenX,Au=e.screenY-_o.screenY):Au=Eu=0,_o=e),Eu)},movementY:function(e){return"movementY"in e?e.movementY:Au}}),cp=It(bl),iS=ge({},bl,{dataTransfer:0}),oS=It(iS),aS=ge({},wa,{relatedTarget:0}),Ou=It(aS),sS=ge({},eo,{animationName:0,elapsedTime:0,pseudoElement:0}),lS=It(sS),uS=ge({},eo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),cS=It(uS),fS=ge({},eo,{data:0}),fp=It(fS),hS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mS(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=pS[e])?!!t[e]:!1}function wh(){return mS}var vS=ge({},wa,{key:function(e){if(e.key){var t=hS[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ts(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wh,charCode:function(e){return e.type==="keypress"?Ts(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ts(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),gS=It(vS),yS=ge({},bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hp=It(yS),wS=ge({},wa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wh}),$S=It(wS),_S=ge({},eo,{propertyName:0,elapsedTime:0,pseudoElement:0}),SS=It(_S),ES=ge({},bl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),AS=It(ES),OS=[9,13,27,32],$h=Nr&&"CompositionEvent"in window,Bo=null;Nr&&"documentMode"in document&&(Bo=document.documentMode);var RS=Nr&&"TextEvent"in window&&!Bo,ny=Nr&&(!$h||Bo&&8<Bo&&11>=Bo),dp=" ",pp=!1;function iy(e,t){switch(e){case"keyup":return OS.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function oy(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var wi=!1;function bS(e,t){switch(e){case"compositionend":return oy(t);case"keypress":return t.which!==32?null:(pp=!0,dp);case"textInput":return e=t.data,e===dp&&pp?null:e;default:return null}}function xS(e,t){if(wi)return e==="compositionend"||!$h&&iy(e,t)?(e=ry(),Cs=gh=rn=null,wi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ny&&t.locale!=="ko"?null:t.data;default:return null}}var CS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!CS[e.type]:t==="textarea"}function ay(e,t,r,n){F0(n),t=Zs(t,"onChange"),0<t.length&&(r=new yh("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Do=null,ia=null;function TS(e){gy(e,0)}function xl(e){var t=Si(e);if(T0(t))return e}function LS(e,t){if(e==="change")return t}var sy=!1;if(Nr){var Ru;if(Nr){var bu="oninput"in document;if(!bu){var vp=document.createElement("div");vp.setAttribute("oninput","return;"),bu=typeof vp.oninput=="function"}Ru=bu}else Ru=!1;sy=Ru&&(!document.documentMode||9<document.documentMode)}function gp(){Do&&(Do.detachEvent("onpropertychange",ly),ia=Do=null)}function ly(e){if(e.propertyName==="value"&&xl(ia)){var t=[];ay(t,ia,e,hh(e)),H0(TS,t)}}function IS(e,t,r){e==="focusin"?(gp(),Do=t,ia=r,Do.attachEvent("onpropertychange",ly)):e==="focusout"&&gp()}function kS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xl(ia)}function MS(e,t){if(e==="click")return xl(t)}function NS(e,t){if(e==="input"||e==="change")return xl(t)}function PS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ir=typeof Object.is=="function"?Object.is:PS;function oa(e,t){if(ir(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var i=r[n];if(!Tc.call(t,i)||!ir(e[i],t[i]))return!1}return!0}function yp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wp(e,t){var r=yp(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=yp(r)}}function uy(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?uy(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function cy(){for(var e=window,t=Gs();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Gs(e.document)}return t}function _h(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function FS(e){var t=cy(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&uy(r.ownerDocument.documentElement,r)){if(n!==null&&_h(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,o=Math.min(n.start,i);n=n.end===void 0?o:Math.min(n.end,i),!e.extend&&o>n&&(i=n,n=o,o=i),i=wp(r,o);var a=wp(r,n);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>n?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var jS=Nr&&"documentMode"in document&&11>=document.documentMode,$i=null,qc=null,Ho=null,Xc=!1;function $p(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Xc||$i==null||$i!==Gs(n)||(n=$i,"selectionStart"in n&&_h(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ho&&oa(Ho,n)||(Ho=n,n=Zs(qc,"onSelect"),0<n.length&&(t=new yh("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=$i)))}function Va(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var _i={animationend:Va("Animation","AnimationEnd"),animationiteration:Va("Animation","AnimationIteration"),animationstart:Va("Animation","AnimationStart"),transitionend:Va("Transition","TransitionEnd")},xu={},fy={};Nr&&(fy=document.createElement("div").style,"AnimationEvent"in window||(delete _i.animationend.animation,delete _i.animationiteration.animation,delete _i.animationstart.animation),"TransitionEvent"in window||delete _i.transitionend.transition);function Cl(e){if(xu[e])return xu[e];if(!_i[e])return e;var t=_i[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in fy)return xu[e]=t[r];return e}var hy=Cl("animationend"),dy=Cl("animationiteration"),py=Cl("animationstart"),my=Cl("transitionend"),vy=new Map,_p="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function wn(e,t){vy.set(e,t),Xn(t,[e])}for(var Cu=0;Cu<_p.length;Cu++){var Tu=_p[Cu],BS=Tu.toLowerCase(),DS=Tu[0].toUpperCase()+Tu.slice(1);wn(BS,"on"+DS)}wn(hy,"onAnimationEnd");wn(dy,"onAnimationIteration");wn(py,"onAnimationStart");wn("dblclick","onDoubleClick");wn("focusin","onFocus");wn("focusout","onBlur");wn(my,"onTransitionEnd");Bi("onMouseEnter",["mouseout","mouseover"]);Bi("onMouseLeave",["mouseout","mouseover"]);Bi("onPointerEnter",["pointerout","pointerover"]);Bi("onPointerLeave",["pointerout","pointerover"]);Xn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),HS=new Set("cancel close invalid load scroll toggle".split(" ").concat(Po));function Sp(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,B_(n,t,void 0,e),e.currentTarget=null}function gy(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],i=n.event;n=n.listeners;e:{var o=void 0;if(t)for(var a=n.length-1;0<=a;a--){var s=n[a],l=s.instance,u=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;Sp(i,s,u),o=l}else for(a=0;a<n.length;a++){if(s=n[a],l=s.instance,u=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;Sp(i,s,u),o=l}}}if(Ks)throw e=Gc,Ks=!1,Gc=null,e}function se(e,t){var r=t[tf];r===void 0&&(r=t[tf]=new Set);var n=e+"__bubble";r.has(n)||(yy(t,e,2,!1),r.add(n))}function Lu(e,t,r){var n=0;t&&(n|=4),yy(r,e,n,t)}var Ka="_reactListening"+Math.random().toString(36).slice(2);function aa(e){if(!e[Ka]){e[Ka]=!0,O0.forEach(function(r){r!=="selectionchange"&&(HS.has(r)||Lu(r,!1,e),Lu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ka]||(t[Ka]=!0,Lu("selectionchange",!1,t))}}function yy(e,t,r,n){switch(ty(t)){case 1:var i=tS;break;case 4:i=rS;break;default:i=vh}r=i.bind(null,t,r,e),i=void 0,!zc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function Iu(e,t,r,n,i){var o=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var a=n.tag;if(a===3||a===4){var s=n.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(a===4)for(a=n.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;a=a.return}for(;s!==null;){if(a=jn(s),a===null)return;if(l=a.tag,l===5||l===6){n=o=a;continue e}s=s.parentNode}}n=n.return}H0(function(){var u=o,c=hh(r),f=[];e:{var h=vy.get(e);if(h!==void 0){var d=yh,y=e;switch(e){case"keypress":if(Ts(r)===0)break e;case"keydown":case"keyup":d=gS;break;case"focusin":y="focus",d=Ou;break;case"focusout":y="blur",d=Ou;break;case"beforeblur":case"afterblur":d=Ou;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=cp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=oS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=$S;break;case hy:case dy:case py:d=lS;break;case my:d=SS;break;case"scroll":d=nS;break;case"wheel":d=AS;break;case"copy":case"cut":case"paste":d=cS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=hp}var _=(t&4)!==0,$=!_&&e==="scroll",v=_?h!==null?h+"Capture":null:h;_=[];for(var m=u,g;m!==null;){g=m;var E=g.stateNode;if(g.tag===5&&E!==null&&(g=E,v!==null&&(E=ea(m,v),E!=null&&_.push(sa(m,E,g)))),$)break;m=m.return}0<_.length&&(h=new d(h,y,null,r,c),f.push({event:h,listeners:_}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",d=e==="mouseout"||e==="pointerout",h&&r!==Wc&&(y=r.relatedTarget||r.fromElement)&&(jn(y)||y[Pr]))break e;if((d||h)&&(h=c.window===c?c:(h=c.ownerDocument)?h.defaultView||h.parentWindow:window,d?(y=r.relatedTarget||r.toElement,d=u,y=y?jn(y):null,y!==null&&($=Qn(y),y!==$||y.tag!==5&&y.tag!==6)&&(y=null)):(d=null,y=u),d!==y)){if(_=cp,E="onMouseLeave",v="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(_=hp,E="onPointerLeave",v="onPointerEnter",m="pointer"),$=d==null?h:Si(d),g=y==null?h:Si(y),h=new _(E,m+"leave",d,r,c),h.target=$,h.relatedTarget=g,E=null,jn(c)===u&&(_=new _(v,m+"enter",y,r,c),_.target=g,_.relatedTarget=$,E=_),$=E,d&&y)t:{for(_=d,v=y,m=0,g=_;g;g=ai(g))m++;for(g=0,E=v;E;E=ai(E))g++;for(;0<m-g;)_=ai(_),m--;for(;0<g-m;)v=ai(v),g--;for(;m--;){if(_===v||v!==null&&_===v.alternate)break t;_=ai(_),v=ai(v)}_=null}else _=null;d!==null&&Ep(f,h,d,_,!1),y!==null&&$!==null&&Ep(f,$,y,_,!0)}}e:{if(h=u?Si(u):window,d=h.nodeName&&h.nodeName.toLowerCase(),d==="select"||d==="input"&&h.type==="file")var O=LS;else if(mp(h))if(sy)O=NS;else{O=kS;var R=IS}else(d=h.nodeName)&&d.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(O=MS);if(O&&(O=O(e,u))){ay(f,O,r,c);break e}R&&R(e,h,u),e==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&Fc(h,"number",h.value)}switch(R=u?Si(u):window,e){case"focusin":(mp(R)||R.contentEditable==="true")&&($i=R,qc=u,Ho=null);break;case"focusout":Ho=qc=$i=null;break;case"mousedown":Xc=!0;break;case"contextmenu":case"mouseup":case"dragend":Xc=!1,$p(f,r,c);break;case"selectionchange":if(jS)break;case"keydown":case"keyup":$p(f,r,c)}var b;if($h)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else wi?iy(e,r)&&(A="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(A="onCompositionStart");A&&(ny&&r.locale!=="ko"&&(wi||A!=="onCompositionStart"?A==="onCompositionEnd"&&wi&&(b=ry()):(rn=c,gh="value"in rn?rn.value:rn.textContent,wi=!0)),R=Zs(u,A),0<R.length&&(A=new fp(A,e,null,r,c),f.push({event:A,listeners:R}),b?A.data=b:(b=oy(r),b!==null&&(A.data=b)))),(b=RS?bS(e,r):xS(e,r))&&(u=Zs(u,"onBeforeInput"),0<u.length&&(c=new fp("onBeforeInput","beforeinput",null,r,c),f.push({event:c,listeners:u}),c.data=b))}gy(f,t)})}function sa(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Zs(e,t){for(var r=t+"Capture",n=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ea(e,r),o!=null&&n.unshift(sa(e,o,i)),o=ea(e,t),o!=null&&n.push(sa(e,o,i))),e=e.return}return n}function ai(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ep(e,t,r,n,i){for(var o=t._reactName,a=[];r!==null&&r!==n;){var s=r,l=s.alternate,u=s.stateNode;if(l!==null&&l===n)break;s.tag===5&&u!==null&&(s=u,i?(l=ea(r,o),l!=null&&a.unshift(sa(r,l,s))):i||(l=ea(r,o),l!=null&&a.push(sa(r,l,s)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var WS=/\r\n?/g,US=/\u0000|\uFFFD/g;function Ap(e){return(typeof e=="string"?e:""+e).replace(WS,`
`).replace(US,"")}function Ya(e,t,r){if(t=Ap(t),Ap(e)!==t&&r)throw Error(C(425))}function Js(){}var Qc=null,Zc=null;function Jc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ef=typeof setTimeout=="function"?setTimeout:void 0,zS=typeof clearTimeout=="function"?clearTimeout:void 0,Op=typeof Promise=="function"?Promise:void 0,GS=typeof queueMicrotask=="function"?queueMicrotask:typeof Op<"u"?function(e){return Op.resolve(null).then(e).catch(VS)}:ef;function VS(e){setTimeout(function(){throw e})}function ku(e,t){var r=t,n=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(n===0){e.removeChild(i),na(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=i}while(r);na(t)}function ln(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Rp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var to=Math.random().toString(36).slice(2),hr="__reactFiber$"+to,la="__reactProps$"+to,Pr="__reactContainer$"+to,tf="__reactEvents$"+to,KS="__reactListeners$"+to,YS="__reactHandles$"+to;function jn(e){var t=e[hr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Pr]||r[hr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Rp(e);e!==null;){if(r=e[hr])return r;e=Rp(e)}return t}e=r,r=e.parentNode}return null}function $a(e){return e=e[hr]||e[Pr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Si(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(C(33))}function Tl(e){return e[la]||null}var rf=[],Ei=-1;function $n(e){return{current:e}}function le(e){0>Ei||(e.current=rf[Ei],rf[Ei]=null,Ei--)}function ae(e,t){Ei++,rf[Ei]=e.current,e.current=t}var gn={},et=$n(gn),mt=$n(!1),Un=gn;function Di(e,t){var r=e.type.contextTypes;if(!r)return gn;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in r)i[o]=t[o];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function vt(e){return e=e.childContextTypes,e!=null}function el(){le(mt),le(et)}function bp(e,t,r){if(et.current!==gn)throw Error(C(168));ae(et,t),ae(mt,r)}function wy(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var i in n)if(!(i in t))throw Error(C(108,I_(e)||"Unknown",i));return ge({},r,n)}function tl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||gn,Un=et.current,ae(et,e),ae(mt,mt.current),!0}function xp(e,t,r){var n=e.stateNode;if(!n)throw Error(C(169));r?(e=wy(e,t,Un),n.__reactInternalMemoizedMergedChildContext=e,le(mt),le(et),ae(et,e)):le(mt),ae(mt,r)}var Tr=null,Ll=!1,Mu=!1;function $y(e){Tr===null?Tr=[e]:Tr.push(e)}function qS(e){Ll=!0,$y(e)}function _n(){if(!Mu&&Tr!==null){Mu=!0;var e=0,t=te;try{var r=Tr;for(te=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}Tr=null,Ll=!1}catch(i){throw Tr!==null&&(Tr=Tr.slice(e+1)),G0(dh,_n),i}finally{te=t,Mu=!1}}return null}var Ai=[],Oi=0,rl=null,nl=0,Bt=[],Dt=0,zn=null,Lr=1,Ir="";function Nn(e,t){Ai[Oi++]=nl,Ai[Oi++]=rl,rl=e,nl=t}function _y(e,t,r){Bt[Dt++]=Lr,Bt[Dt++]=Ir,Bt[Dt++]=zn,zn=e;var n=Lr;e=Ir;var i=32-rr(n)-1;n&=~(1<<i),r+=1;var o=32-rr(t)+i;if(30<o){var a=i-i%5;o=(n&(1<<a)-1).toString(32),n>>=a,i-=a,Lr=1<<32-rr(t)+i|r<<i|n,Ir=o+e}else Lr=1<<o|r<<i|n,Ir=e}function Sh(e){e.return!==null&&(Nn(e,1),_y(e,1,0))}function Eh(e){for(;e===rl;)rl=Ai[--Oi],Ai[Oi]=null,nl=Ai[--Oi],Ai[Oi]=null;for(;e===zn;)zn=Bt[--Dt],Bt[Dt]=null,Ir=Bt[--Dt],Bt[Dt]=null,Lr=Bt[--Dt],Bt[Dt]=null}var Ct=null,xt=null,he=!1,er=null;function Sy(e,t){var r=Wt(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Cp(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ct=e,xt=ln(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ct=e,xt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=zn!==null?{id:Lr,overflow:Ir}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Wt(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Ct=e,xt=null,!0):!1;default:return!1}}function nf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function of(e){if(he){var t=xt;if(t){var r=t;if(!Cp(e,t)){if(nf(e))throw Error(C(418));t=ln(r.nextSibling);var n=Ct;t&&Cp(e,t)?Sy(n,r):(e.flags=e.flags&-4097|2,he=!1,Ct=e)}}else{if(nf(e))throw Error(C(418));e.flags=e.flags&-4097|2,he=!1,Ct=e}}}function Tp(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ct=e}function qa(e){if(e!==Ct)return!1;if(!he)return Tp(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Jc(e.type,e.memoizedProps)),t&&(t=xt)){if(nf(e))throw Ey(),Error(C(418));for(;t;)Sy(e,t),t=ln(t.nextSibling)}if(Tp(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(C(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){xt=ln(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}xt=null}}else xt=Ct?ln(e.stateNode.nextSibling):null;return!0}function Ey(){for(var e=xt;e;)e=ln(e.nextSibling)}function Hi(){xt=Ct=null,he=!1}function Ah(e){er===null?er=[e]:er.push(e)}var XS=Dr.ReactCurrentBatchConfig;function So(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(C(309));var n=r.stateNode}if(!n)throw Error(C(147,e));var i=n,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var s=i.refs;a===null?delete s[o]:s[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(C(284));if(!r._owner)throw Error(C(290,e))}return e}function Xa(e,t){throw e=Object.prototype.toString.call(t),Error(C(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Lp(e){var t=e._init;return t(e._payload)}function Ay(e){function t(v,m){if(e){var g=v.deletions;g===null?(v.deletions=[m],v.flags|=16):g.push(m)}}function r(v,m){if(!e)return null;for(;m!==null;)t(v,m),m=m.sibling;return null}function n(v,m){for(v=new Map;m!==null;)m.key!==null?v.set(m.key,m):v.set(m.index,m),m=m.sibling;return v}function i(v,m){return v=hn(v,m),v.index=0,v.sibling=null,v}function o(v,m,g){return v.index=g,e?(g=v.alternate,g!==null?(g=g.index,g<m?(v.flags|=2,m):g):(v.flags|=2,m)):(v.flags|=1048576,m)}function a(v){return e&&v.alternate===null&&(v.flags|=2),v}function s(v,m,g,E){return m===null||m.tag!==6?(m=Hu(g,v.mode,E),m.return=v,m):(m=i(m,g),m.return=v,m)}function l(v,m,g,E){var O=g.type;return O===yi?c(v,m,g.props.children,E,g.key):m!==null&&(m.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Xr&&Lp(O)===m.type)?(E=i(m,g.props),E.ref=So(v,m,g),E.return=v,E):(E=Fs(g.type,g.key,g.props,null,v.mode,E),E.ref=So(v,m,g),E.return=v,E)}function u(v,m,g,E){return m===null||m.tag!==4||m.stateNode.containerInfo!==g.containerInfo||m.stateNode.implementation!==g.implementation?(m=Wu(g,v.mode,E),m.return=v,m):(m=i(m,g.children||[]),m.return=v,m)}function c(v,m,g,E,O){return m===null||m.tag!==7?(m=Wn(g,v.mode,E,O),m.return=v,m):(m=i(m,g),m.return=v,m)}function f(v,m,g){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Hu(""+m,v.mode,g),m.return=v,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ba:return g=Fs(m.type,m.key,m.props,null,v.mode,g),g.ref=So(v,null,m),g.return=v,g;case gi:return m=Wu(m,v.mode,g),m.return=v,m;case Xr:var E=m._init;return f(v,E(m._payload),g)}if(Mo(m)||go(m))return m=Wn(m,v.mode,g,null),m.return=v,m;Xa(v,m)}return null}function h(v,m,g,E){var O=m!==null?m.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return O!==null?null:s(v,m,""+g,E);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ba:return g.key===O?l(v,m,g,E):null;case gi:return g.key===O?u(v,m,g,E):null;case Xr:return O=g._init,h(v,m,O(g._payload),E)}if(Mo(g)||go(g))return O!==null?null:c(v,m,g,E,null);Xa(v,g)}return null}function d(v,m,g,E,O){if(typeof E=="string"&&E!==""||typeof E=="number")return v=v.get(g)||null,s(m,v,""+E,O);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ba:return v=v.get(E.key===null?g:E.key)||null,l(m,v,E,O);case gi:return v=v.get(E.key===null?g:E.key)||null,u(m,v,E,O);case Xr:var R=E._init;return d(v,m,g,R(E._payload),O)}if(Mo(E)||go(E))return v=v.get(g)||null,c(m,v,E,O,null);Xa(m,E)}return null}function y(v,m,g,E){for(var O=null,R=null,b=m,A=m=0,x=null;b!==null&&A<g.length;A++){b.index>A?(x=b,b=null):x=b.sibling;var T=h(v,b,g[A],E);if(T===null){b===null&&(b=x);break}e&&b&&T.alternate===null&&t(v,b),m=o(T,m,A),R===null?O=T:R.sibling=T,R=T,b=x}if(A===g.length)return r(v,b),he&&Nn(v,A),O;if(b===null){for(;A<g.length;A++)b=f(v,g[A],E),b!==null&&(m=o(b,m,A),R===null?O=b:R.sibling=b,R=b);return he&&Nn(v,A),O}for(b=n(v,b);A<g.length;A++)x=d(b,v,A,g[A],E),x!==null&&(e&&x.alternate!==null&&b.delete(x.key===null?A:x.key),m=o(x,m,A),R===null?O=x:R.sibling=x,R=x);return e&&b.forEach(function(I){return t(v,I)}),he&&Nn(v,A),O}function _(v,m,g,E){var O=go(g);if(typeof O!="function")throw Error(C(150));if(g=O.call(g),g==null)throw Error(C(151));for(var R=O=null,b=m,A=m=0,x=null,T=g.next();b!==null&&!T.done;A++,T=g.next()){b.index>A?(x=b,b=null):x=b.sibling;var I=h(v,b,T.value,E);if(I===null){b===null&&(b=x);break}e&&b&&I.alternate===null&&t(v,b),m=o(I,m,A),R===null?O=I:R.sibling=I,R=I,b=x}if(T.done)return r(v,b),he&&Nn(v,A),O;if(b===null){for(;!T.done;A++,T=g.next())T=f(v,T.value,E),T!==null&&(m=o(T,m,A),R===null?O=T:R.sibling=T,R=T);return he&&Nn(v,A),O}for(b=n(v,b);!T.done;A++,T=g.next())T=d(b,v,A,T.value,E),T!==null&&(e&&T.alternate!==null&&b.delete(T.key===null?A:T.key),m=o(T,m,A),R===null?O=T:R.sibling=T,R=T);return e&&b.forEach(function(B){return t(v,B)}),he&&Nn(v,A),O}function $(v,m,g,E){if(typeof g=="object"&&g!==null&&g.type===yi&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Ba:e:{for(var O=g.key,R=m;R!==null;){if(R.key===O){if(O=g.type,O===yi){if(R.tag===7){r(v,R.sibling),m=i(R,g.props.children),m.return=v,v=m;break e}}else if(R.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Xr&&Lp(O)===R.type){r(v,R.sibling),m=i(R,g.props),m.ref=So(v,R,g),m.return=v,v=m;break e}r(v,R);break}else t(v,R);R=R.sibling}g.type===yi?(m=Wn(g.props.children,v.mode,E,g.key),m.return=v,v=m):(E=Fs(g.type,g.key,g.props,null,v.mode,E),E.ref=So(v,m,g),E.return=v,v=E)}return a(v);case gi:e:{for(R=g.key;m!==null;){if(m.key===R)if(m.tag===4&&m.stateNode.containerInfo===g.containerInfo&&m.stateNode.implementation===g.implementation){r(v,m.sibling),m=i(m,g.children||[]),m.return=v,v=m;break e}else{r(v,m);break}else t(v,m);m=m.sibling}m=Wu(g,v.mode,E),m.return=v,v=m}return a(v);case Xr:return R=g._init,$(v,m,R(g._payload),E)}if(Mo(g))return y(v,m,g,E);if(go(g))return _(v,m,g,E);Xa(v,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,m!==null&&m.tag===6?(r(v,m.sibling),m=i(m,g),m.return=v,v=m):(r(v,m),m=Hu(g,v.mode,E),m.return=v,v=m),a(v)):r(v,m)}return $}var Wi=Ay(!0),Oy=Ay(!1),il=$n(null),ol=null,Ri=null,Oh=null;function Rh(){Oh=Ri=ol=null}function bh(e){var t=il.current;le(il),e._currentValue=t}function af(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function Pi(e,t){ol=e,Oh=Ri=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pt=!0),e.firstContext=null)}function Kt(e){var t=e._currentValue;if(Oh!==e)if(e={context:e,memoizedValue:t,next:null},Ri===null){if(ol===null)throw Error(C(308));Ri=e,ol.dependencies={lanes:0,firstContext:e}}else Ri=Ri.next=e;return t}var Bn=null;function xh(e){Bn===null?Bn=[e]:Bn.push(e)}function Ry(e,t,r,n){var i=t.interleaved;return i===null?(r.next=r,xh(t)):(r.next=i.next,i.next=r),t.interleaved=r,Fr(e,n)}function Fr(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Qr=!1;function Ch(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function by(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function kr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function un(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,X&2){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,Fr(e,r)}return i=n.interleaved,i===null?(t.next=t,xh(n)):(t.next=i.next,i.next=t),n.interleaved=t,Fr(e,r)}function Ls(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ph(e,r)}}function Ip(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var i=null,o=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};o===null?i=o=a:o=o.next=a,r=r.next}while(r!==null);o===null?i=o=t:o=o.next=t}else i=o=t;r={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function al(e,t,r,n){var i=e.updateQueue;Qr=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var l=s,u=l.next;l.next=null,a===null?o=u:a.next=u,a=l;var c=e.alternate;c!==null&&(c=c.updateQueue,s=c.lastBaseUpdate,s!==a&&(s===null?c.firstBaseUpdate=u:s.next=u,c.lastBaseUpdate=l))}if(o!==null){var f=i.baseState;a=0,c=u=l=null,s=o;do{var h=s.lane,d=s.eventTime;if((n&h)===h){c!==null&&(c=c.next={eventTime:d,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,_=s;switch(h=t,d=r,_.tag){case 1:if(y=_.payload,typeof y=="function"){f=y.call(d,f,h);break e}f=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=_.payload,h=typeof y=="function"?y.call(d,f,h):y,h==null)break e;f=ge({},f,h);break e;case 2:Qr=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=i.effects,h===null?i.effects=[s]:h.push(s))}else d={eventTime:d,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},c===null?(u=c=d,l=f):c=c.next=d,a|=h;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;h=s,s=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(!0);if(c===null&&(l=f),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=c,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Vn|=a,e.lanes=a,e.memoizedState=f}}function kp(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],i=n.callback;if(i!==null){if(n.callback=null,n=r,typeof i!="function")throw Error(C(191,i));i.call(n)}}}var _a={},pr=$n(_a),ua=$n(_a),ca=$n(_a);function Dn(e){if(e===_a)throw Error(C(174));return e}function Th(e,t){switch(ae(ca,t),ae(ua,e),ae(pr,_a),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bc(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bc(t,e)}le(pr),ae(pr,t)}function Ui(){le(pr),le(ua),le(ca)}function xy(e){Dn(ca.current);var t=Dn(pr.current),r=Bc(t,e.type);t!==r&&(ae(ua,e),ae(pr,r))}function Lh(e){ua.current===e&&(le(pr),le(ua))}var me=$n(0);function sl(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Nu=[];function Ih(){for(var e=0;e<Nu.length;e++)Nu[e]._workInProgressVersionPrimary=null;Nu.length=0}var Is=Dr.ReactCurrentDispatcher,Pu=Dr.ReactCurrentBatchConfig,Gn=0,ve=null,Ie=null,Ne=null,ll=!1,Wo=!1,fa=0,QS=0;function Ye(){throw Error(C(321))}function kh(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!ir(e[r],t[r]))return!1;return!0}function Mh(e,t,r,n,i,o){if(Gn=o,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Is.current=e===null||e.memoizedState===null?tE:rE,e=r(n,i),Wo){o=0;do{if(Wo=!1,fa=0,25<=o)throw Error(C(301));o+=1,Ne=Ie=null,t.updateQueue=null,Is.current=nE,e=r(n,i)}while(Wo)}if(Is.current=ul,t=Ie!==null&&Ie.next!==null,Gn=0,Ne=Ie=ve=null,ll=!1,t)throw Error(C(300));return e}function Nh(){var e=fa!==0;return fa=0,e}function cr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?ve.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function Yt(){if(Ie===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=Ie.next;var t=Ne===null?ve.memoizedState:Ne.next;if(t!==null)Ne=t,Ie=e;else{if(e===null)throw Error(C(310));Ie=e,e={memoizedState:Ie.memoizedState,baseState:Ie.baseState,baseQueue:Ie.baseQueue,queue:Ie.queue,next:null},Ne===null?ve.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function ha(e,t){return typeof t=="function"?t(e):t}function Fu(e){var t=Yt(),r=t.queue;if(r===null)throw Error(C(311));r.lastRenderedReducer=e;var n=Ie,i=n.baseQueue,o=r.pending;if(o!==null){if(i!==null){var a=i.next;i.next=o.next,o.next=a}n.baseQueue=i=o,r.pending=null}if(i!==null){o=i.next,n=n.baseState;var s=a=null,l=null,u=o;do{var c=u.lane;if((Gn&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:e(n,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(s=l=f,a=n):l=l.next=f,ve.lanes|=c,Vn|=c}u=u.next}while(u!==null&&u!==o);l===null?a=n:l.next=s,ir(n,t.memoizedState)||(pt=!0),t.memoizedState=n,t.baseState=a,t.baseQueue=l,r.lastRenderedState=n}if(e=r.interleaved,e!==null){i=e;do o=i.lane,ve.lanes|=o,Vn|=o,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function ju(e){var t=Yt(),r=t.queue;if(r===null)throw Error(C(311));r.lastRenderedReducer=e;var n=r.dispatch,i=r.pending,o=t.memoizedState;if(i!==null){r.pending=null;var a=i=i.next;do o=e(o,a.action),a=a.next;while(a!==i);ir(o,t.memoizedState)||(pt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),r.lastRenderedState=o}return[o,n]}function Cy(){}function Ty(e,t){var r=ve,n=Yt(),i=t(),o=!ir(n.memoizedState,i);if(o&&(n.memoizedState=i,pt=!0),n=n.queue,Ph(ky.bind(null,r,n,e),[e]),n.getSnapshot!==t||o||Ne!==null&&Ne.memoizedState.tag&1){if(r.flags|=2048,da(9,Iy.bind(null,r,n,i,t),void 0,null),Pe===null)throw Error(C(349));Gn&30||Ly(r,t,i)}return i}function Ly(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Iy(e,t,r,n){t.value=r,t.getSnapshot=n,My(t)&&Ny(e)}function ky(e,t,r){return r(function(){My(t)&&Ny(e)})}function My(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!ir(e,r)}catch{return!0}}function Ny(e){var t=Fr(e,1);t!==null&&nr(t,e,1,-1)}function Mp(e){var t=cr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:e},t.queue=e,e=e.dispatch=eE.bind(null,ve,e),[t.memoizedState,e]}function da(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function Py(){return Yt().memoizedState}function ks(e,t,r,n){var i=cr();ve.flags|=e,i.memoizedState=da(1|t,r,void 0,n===void 0?null:n)}function Il(e,t,r,n){var i=Yt();n=n===void 0?null:n;var o=void 0;if(Ie!==null){var a=Ie.memoizedState;if(o=a.destroy,n!==null&&kh(n,a.deps)){i.memoizedState=da(t,r,o,n);return}}ve.flags|=e,i.memoizedState=da(1|t,r,o,n)}function Np(e,t){return ks(8390656,8,e,t)}function Ph(e,t){return Il(2048,8,e,t)}function Fy(e,t){return Il(4,2,e,t)}function jy(e,t){return Il(4,4,e,t)}function By(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Dy(e,t,r){return r=r!=null?r.concat([e]):null,Il(4,4,By.bind(null,t,e),r)}function Fh(){}function Hy(e,t){var r=Yt();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&kh(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Wy(e,t){var r=Yt();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&kh(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function Uy(e,t,r){return Gn&21?(ir(r,t)||(r=Y0(),ve.lanes|=r,Vn|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pt=!0),e.memoizedState=r)}function ZS(e,t){var r=te;te=r!==0&&4>r?r:4,e(!0);var n=Pu.transition;Pu.transition={};try{e(!1),t()}finally{te=r,Pu.transition=n}}function zy(){return Yt().memoizedState}function JS(e,t,r){var n=fn(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Gy(e))Vy(t,r);else if(r=Ry(e,t,r,n),r!==null){var i=it();nr(r,e,n,i),Ky(r,t,n)}}function eE(e,t,r){var n=fn(e),i={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Gy(e))Vy(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,s=o(a,r);if(i.hasEagerState=!0,i.eagerState=s,ir(s,a)){var l=t.interleaved;l===null?(i.next=i,xh(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}r=Ry(e,t,i,n),r!==null&&(i=it(),nr(r,e,n,i),Ky(r,t,n))}}function Gy(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function Vy(e,t){Wo=ll=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Ky(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ph(e,r)}}var ul={readContext:Kt,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useInsertionEffect:Ye,useLayoutEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useMutableSource:Ye,useSyncExternalStore:Ye,useId:Ye,unstable_isNewReconciler:!1},tE={readContext:Kt,useCallback:function(e,t){return cr().memoizedState=[e,t===void 0?null:t],e},useContext:Kt,useEffect:Np,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ks(4194308,4,By.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ks(4194308,4,e,t)},useInsertionEffect:function(e,t){return ks(4,2,e,t)},useMemo:function(e,t){var r=cr();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=cr();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=JS.bind(null,ve,e),[n.memoizedState,e]},useRef:function(e){var t=cr();return e={current:e},t.memoizedState=e},useState:Mp,useDebugValue:Fh,useDeferredValue:function(e){return cr().memoizedState=e},useTransition:function(){var e=Mp(!1),t=e[0];return e=ZS.bind(null,e[1]),cr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=ve,i=cr();if(he){if(r===void 0)throw Error(C(407));r=r()}else{if(r=t(),Pe===null)throw Error(C(349));Gn&30||Ly(n,t,r)}i.memoizedState=r;var o={value:r,getSnapshot:t};return i.queue=o,Np(ky.bind(null,n,o,e),[e]),n.flags|=2048,da(9,Iy.bind(null,n,o,r,t),void 0,null),r},useId:function(){var e=cr(),t=Pe.identifierPrefix;if(he){var r=Ir,n=Lr;r=(n&~(1<<32-rr(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=fa++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=QS++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},rE={readContext:Kt,useCallback:Hy,useContext:Kt,useEffect:Ph,useImperativeHandle:Dy,useInsertionEffect:Fy,useLayoutEffect:jy,useMemo:Wy,useReducer:Fu,useRef:Py,useState:function(){return Fu(ha)},useDebugValue:Fh,useDeferredValue:function(e){var t=Yt();return Uy(t,Ie.memoizedState,e)},useTransition:function(){var e=Fu(ha)[0],t=Yt().memoizedState;return[e,t]},useMutableSource:Cy,useSyncExternalStore:Ty,useId:zy,unstable_isNewReconciler:!1},nE={readContext:Kt,useCallback:Hy,useContext:Kt,useEffect:Ph,useImperativeHandle:Dy,useInsertionEffect:Fy,useLayoutEffect:jy,useMemo:Wy,useReducer:ju,useRef:Py,useState:function(){return ju(ha)},useDebugValue:Fh,useDeferredValue:function(e){var t=Yt();return Ie===null?t.memoizedState=e:Uy(t,Ie.memoizedState,e)},useTransition:function(){var e=ju(ha)[0],t=Yt().memoizedState;return[e,t]},useMutableSource:Cy,useSyncExternalStore:Ty,useId:zy,unstable_isNewReconciler:!1};function Zt(e,t){if(e&&e.defaultProps){t=ge({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function sf(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:ge({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var kl={isMounted:function(e){return(e=e._reactInternals)?Qn(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=it(),i=fn(e),o=kr(n,i);o.payload=t,r!=null&&(o.callback=r),t=un(e,o,i),t!==null&&(nr(t,e,i,n),Ls(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=it(),i=fn(e),o=kr(n,i);o.tag=1,o.payload=t,r!=null&&(o.callback=r),t=un(e,o,i),t!==null&&(nr(t,e,i,n),Ls(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=it(),n=fn(e),i=kr(r,n);i.tag=2,t!=null&&(i.callback=t),t=un(e,i,n),t!==null&&(nr(t,e,n,r),Ls(t,e,n))}};function Pp(e,t,r,n,i,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,o,a):t.prototype&&t.prototype.isPureReactComponent?!oa(r,n)||!oa(i,o):!0}function Yy(e,t,r){var n=!1,i=gn,o=t.contextType;return typeof o=="object"&&o!==null?o=Kt(o):(i=vt(t)?Un:et.current,n=t.contextTypes,o=(n=n!=null)?Di(e,i):gn),t=new t(r,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=kl,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Fp(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&kl.enqueueReplaceState(t,t.state,null)}function lf(e,t,r,n){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs={},Ch(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Kt(o):(o=vt(t)?Un:et.current,i.context=Di(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(sf(e,t,o,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&kl.enqueueReplaceState(i,i.state,null),al(e,r,i,n),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function zi(e,t){try{var r="",n=t;do r+=L_(n),n=n.return;while(n);var i=r}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Bu(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function uf(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var iE=typeof WeakMap=="function"?WeakMap:Map;function qy(e,t,r){r=kr(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){fl||(fl=!0,wf=n),uf(e,t)},r}function Xy(e,t,r){r=kr(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var i=t.value;r.payload=function(){return n(i)},r.callback=function(){uf(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(r.callback=function(){uf(e,t),typeof n!="function"&&(cn===null?cn=new Set([this]):cn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function jp(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new iE;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(r)||(i.add(r),e=yE.bind(null,e,t,r),t.then(e,e))}function Bp(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Dp(e,t,r,n,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=kr(-1,1),t.tag=2,un(r,t,1))),r.lanes|=1),e)}var oE=Dr.ReactCurrentOwner,pt=!1;function nt(e,t,r,n){t.child=e===null?Oy(t,null,r,n):Wi(t,e.child,r,n)}function Hp(e,t,r,n,i){r=r.render;var o=t.ref;return Pi(t,i),n=Mh(e,t,r,n,o,i),r=Nh(),e!==null&&!pt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jr(e,t,i)):(he&&r&&Sh(t),t.flags|=1,nt(e,t,n,i),t.child)}function Wp(e,t,r,n,i){if(e===null){var o=r.type;return typeof o=="function"&&!Gh(o)&&o.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=o,Qy(e,t,o,n,i)):(e=Fs(r.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var a=o.memoizedProps;if(r=r.compare,r=r!==null?r:oa,r(a,n)&&e.ref===t.ref)return jr(e,t,i)}return t.flags|=1,e=hn(o,n),e.ref=t.ref,e.return=t,t.child=e}function Qy(e,t,r,n,i){if(e!==null){var o=e.memoizedProps;if(oa(o,n)&&e.ref===t.ref)if(pt=!1,t.pendingProps=n=o,(e.lanes&i)!==0)e.flags&131072&&(pt=!0);else return t.lanes=e.lanes,jr(e,t,i)}return cf(e,t,r,n,i)}function Zy(e,t,r){var n=t.pendingProps,i=n.children,o=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ae(xi,Ot),Ot|=r;else{if(!(r&1073741824))return e=o!==null?o.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ae(xi,Ot),Ot|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=o!==null?o.baseLanes:r,ae(xi,Ot),Ot|=n}else o!==null?(n=o.baseLanes|r,t.memoizedState=null):n=r,ae(xi,Ot),Ot|=n;return nt(e,t,i,r),t.child}function Jy(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function cf(e,t,r,n,i){var o=vt(r)?Un:et.current;return o=Di(t,o),Pi(t,i),r=Mh(e,t,r,n,o,i),n=Nh(),e!==null&&!pt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jr(e,t,i)):(he&&n&&Sh(t),t.flags|=1,nt(e,t,r,i),t.child)}function Up(e,t,r,n,i){if(vt(r)){var o=!0;tl(t)}else o=!1;if(Pi(t,i),t.stateNode===null)Ms(e,t),Yy(t,r,n),lf(t,r,n,i),n=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,u=r.contextType;typeof u=="object"&&u!==null?u=Kt(u):(u=vt(r)?Un:et.current,u=Di(t,u));var c=r.getDerivedStateFromProps,f=typeof c=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==n||l!==u)&&Fp(t,a,n,u),Qr=!1;var h=t.memoizedState;a.state=h,al(t,n,a,i),l=t.memoizedState,s!==n||h!==l||mt.current||Qr?(typeof c=="function"&&(sf(t,r,c,n),l=t.memoizedState),(s=Qr||Pp(t,r,s,n,h,l,u))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=l),a.props=n,a.state=l,a.context=u,n=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{a=t.stateNode,by(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:Zt(t.type,s),a.props=u,f=t.pendingProps,h=a.context,l=r.contextType,typeof l=="object"&&l!==null?l=Kt(l):(l=vt(r)?Un:et.current,l=Di(t,l));var d=r.getDerivedStateFromProps;(c=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==f||h!==l)&&Fp(t,a,n,l),Qr=!1,h=t.memoizedState,a.state=h,al(t,n,a,i);var y=t.memoizedState;s!==f||h!==y||mt.current||Qr?(typeof d=="function"&&(sf(t,r,d,n),y=t.memoizedState),(u=Qr||Pp(t,r,u,n,h,y,l)||!1)?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(n,y,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(n,y,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=y),a.props=n,a.state=y,a.context=l,n=u):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),n=!1)}return ff(e,t,r,n,o,i)}function ff(e,t,r,n,i,o){Jy(e,t);var a=(t.flags&128)!==0;if(!n&&!a)return i&&xp(t,r,!1),jr(e,t,o);n=t.stateNode,oE.current=t;var s=a&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&a?(t.child=Wi(t,e.child,null,o),t.child=Wi(t,null,s,o)):nt(e,t,s,o),t.memoizedState=n.state,i&&xp(t,r,!0),t.child}function e1(e){var t=e.stateNode;t.pendingContext?bp(e,t.pendingContext,t.pendingContext!==t.context):t.context&&bp(e,t.context,!1),Th(e,t.containerInfo)}function zp(e,t,r,n,i){return Hi(),Ah(i),t.flags|=256,nt(e,t,r,n),t.child}var hf={dehydrated:null,treeContext:null,retryLane:0};function df(e){return{baseLanes:e,cachePool:null,transitions:null}}function t1(e,t,r){var n=t.pendingProps,i=me.current,o=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ae(me,i&1),e===null)return of(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=n.children,e=n.fallback,o?(n=t.mode,o=t.child,a={mode:"hidden",children:a},!(n&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=Pl(a,n,0,null),e=Wn(e,n,r,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=df(r),t.memoizedState=hf,e):jh(t,a));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return aE(e,t,a,n,s,i,r);if(o){o=n.fallback,a=t.mode,i=e.child,s=i.sibling;var l={mode:"hidden",children:n.children};return!(a&1)&&t.child!==i?(n=t.child,n.childLanes=0,n.pendingProps=l,t.deletions=null):(n=hn(i,l),n.subtreeFlags=i.subtreeFlags&14680064),s!==null?o=hn(s,o):(o=Wn(o,a,r,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,n=o,o=t.child,a=e.child.memoizedState,a=a===null?df(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~r,t.memoizedState=hf,n}return o=e.child,e=o.sibling,n=hn(o,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function jh(e,t){return t=Pl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Qa(e,t,r,n){return n!==null&&Ah(n),Wi(t,e.child,null,r),e=jh(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function aE(e,t,r,n,i,o,a){if(r)return t.flags&256?(t.flags&=-257,n=Bu(Error(C(422))),Qa(e,t,a,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=n.fallback,i=t.mode,n=Pl({mode:"visible",children:n.children},i,0,null),o=Wn(o,i,a,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,t.mode&1&&Wi(t,e.child,null,a),t.child.memoizedState=df(a),t.memoizedState=hf,o);if(!(t.mode&1))return Qa(e,t,a,null);if(i.data==="$!"){if(n=i.nextSibling&&i.nextSibling.dataset,n)var s=n.dgst;return n=s,o=Error(C(419)),n=Bu(o,n,void 0),Qa(e,t,a,n)}if(s=(a&e.childLanes)!==0,pt||s){if(n=Pe,n!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(n.suspendedLanes|a)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Fr(e,i),nr(n,e,i,-1))}return zh(),n=Bu(Error(C(421))),Qa(e,t,a,n)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=wE.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,xt=ln(i.nextSibling),Ct=t,he=!0,er=null,e!==null&&(Bt[Dt++]=Lr,Bt[Dt++]=Ir,Bt[Dt++]=zn,Lr=e.id,Ir=e.overflow,zn=t),t=jh(t,n.children),t.flags|=4096,t)}function Gp(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),af(e.return,t,r)}function Du(e,t,r,n,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=i)}function r1(e,t,r){var n=t.pendingProps,i=n.revealOrder,o=n.tail;if(nt(e,t,n.children,r),n=me.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gp(e,r,t);else if(e.tag===19)Gp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(ae(me,n),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&sl(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),Du(t,!1,i,r,o);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&sl(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}Du(t,!0,r,null,o);break;case"together":Du(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ms(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jr(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Vn|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(C(153));if(t.child!==null){for(e=t.child,r=hn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=hn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function sE(e,t,r){switch(t.tag){case 3:e1(t),Hi();break;case 5:xy(t);break;case 1:vt(t.type)&&tl(t);break;case 4:Th(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,i=t.memoizedProps.value;ae(il,n._currentValue),n._currentValue=i;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(ae(me,me.current&1),t.flags|=128,null):r&t.child.childLanes?t1(e,t,r):(ae(me,me.current&1),e=jr(e,t,r),e!==null?e.sibling:null);ae(me,me.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return r1(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ae(me,me.current),n)break;return null;case 22:case 23:return t.lanes=0,Zy(e,t,r)}return jr(e,t,r)}var n1,pf,i1,o1;n1=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};pf=function(){};i1=function(e,t,r,n){var i=e.memoizedProps;if(i!==n){e=t.stateNode,Dn(pr.current);var o=null;switch(r){case"input":i=Nc(e,i),n=Nc(e,n),o=[];break;case"select":i=ge({},i,{value:void 0}),n=ge({},n,{value:void 0}),o=[];break;case"textarea":i=jc(e,i),n=jc(e,n),o=[];break;default:typeof i.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=Js)}Dc(r,n);var a;r=null;for(u in i)if(!n.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var s=i[u];for(a in s)s.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Zo.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in n){var l=n[u];if(s=i!=null?i[u]:void 0,n.hasOwnProperty(u)&&l!==s&&(l!=null||s!=null))if(u==="style")if(s){for(a in s)!s.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in l)l.hasOwnProperty(a)&&s[a]!==l[a]&&(r||(r={}),r[a]=l[a])}else r||(o||(o=[]),o.push(u,r)),r=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(o=o||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Zo.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&se("scroll",e),o||s===l||(o=[])):(o=o||[]).push(u,l))}r&&(o=o||[]).push("style",r);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};o1=function(e,t,r,n){r!==n&&(t.flags|=4)};function Eo(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,n|=i.subtreeFlags&14680064,n|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function lE(e,t,r){var n=t.pendingProps;switch(Eh(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(t),null;case 1:return vt(t.type)&&el(),qe(t),null;case 3:return n=t.stateNode,Ui(),le(mt),le(et),Ih(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(qa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,er!==null&&(Sf(er),er=null))),pf(e,t),qe(t),null;case 5:Lh(t);var i=Dn(ca.current);if(r=t.type,e!==null&&t.stateNode!=null)i1(e,t,r,n,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(C(166));return qe(t),null}if(e=Dn(pr.current),qa(t)){n=t.stateNode,r=t.type;var o=t.memoizedProps;switch(n[hr]=t,n[la]=o,e=(t.mode&1)!==0,r){case"dialog":se("cancel",n),se("close",n);break;case"iframe":case"object":case"embed":se("load",n);break;case"video":case"audio":for(i=0;i<Po.length;i++)se(Po[i],n);break;case"source":se("error",n);break;case"img":case"image":case"link":se("error",n),se("load",n);break;case"details":se("toggle",n);break;case"input":ep(n,o),se("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!o.multiple},se("invalid",n);break;case"textarea":rp(n,o),se("invalid",n)}Dc(r,o),i=null;for(var a in o)if(o.hasOwnProperty(a)){var s=o[a];a==="children"?typeof s=="string"?n.textContent!==s&&(o.suppressHydrationWarning!==!0&&Ya(n.textContent,s,e),i=["children",s]):typeof s=="number"&&n.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&Ya(n.textContent,s,e),i=["children",""+s]):Zo.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&se("scroll",n)}switch(r){case"input":Da(n),tp(n,o,!0);break;case"textarea":Da(n),np(n);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(n.onclick=Js)}n=i,t.updateQueue=n,n!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=k0(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=a.createElement(r,{is:n.is}):(e=a.createElement(r),r==="select"&&(a=e,n.multiple?a.multiple=!0:n.size&&(a.size=n.size))):e=a.createElementNS(e,r),e[hr]=t,e[la]=n,n1(e,t,!1,!1),t.stateNode=e;e:{switch(a=Hc(r,n),r){case"dialog":se("cancel",e),se("close",e),i=n;break;case"iframe":case"object":case"embed":se("load",e),i=n;break;case"video":case"audio":for(i=0;i<Po.length;i++)se(Po[i],e);i=n;break;case"source":se("error",e),i=n;break;case"img":case"image":case"link":se("error",e),se("load",e),i=n;break;case"details":se("toggle",e),i=n;break;case"input":ep(e,n),i=Nc(e,n),se("invalid",e);break;case"option":i=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},i=ge({},n,{value:void 0}),se("invalid",e);break;case"textarea":rp(e,n),i=jc(e,n),se("invalid",e);break;default:i=n}Dc(r,i),s=i;for(o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="style"?P0(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&M0(e,l)):o==="children"?typeof l=="string"?(r!=="textarea"||l!=="")&&Jo(e,l):typeof l=="number"&&Jo(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Zo.hasOwnProperty(o)?l!=null&&o==="onScroll"&&se("scroll",e):l!=null&&lh(e,o,l,a))}switch(r){case"input":Da(e),tp(e,n,!1);break;case"textarea":Da(e),np(e);break;case"option":n.value!=null&&e.setAttribute("value",""+vn(n.value));break;case"select":e.multiple=!!n.multiple,o=n.value,o!=null?Ii(e,!!n.multiple,o,!1):n.defaultValue!=null&&Ii(e,!!n.multiple,n.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Js)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return qe(t),null;case 6:if(e&&t.stateNode!=null)o1(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(C(166));if(r=Dn(ca.current),Dn(pr.current),qa(t)){if(n=t.stateNode,r=t.memoizedProps,n[hr]=t,(o=n.nodeValue!==r)&&(e=Ct,e!==null))switch(e.tag){case 3:Ya(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ya(n.nodeValue,r,(e.mode&1)!==0)}o&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[hr]=t,t.stateNode=n}return qe(t),null;case 13:if(le(me),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&xt!==null&&t.mode&1&&!(t.flags&128))Ey(),Hi(),t.flags|=98560,o=!1;else if(o=qa(t),n!==null&&n.dehydrated!==null){if(e===null){if(!o)throw Error(C(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(C(317));o[hr]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;qe(t),o=!1}else er!==null&&(Sf(er),er=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||me.current&1?ke===0&&(ke=3):zh())),t.updateQueue!==null&&(t.flags|=4),qe(t),null);case 4:return Ui(),pf(e,t),e===null&&aa(t.stateNode.containerInfo),qe(t),null;case 10:return bh(t.type._context),qe(t),null;case 17:return vt(t.type)&&el(),qe(t),null;case 19:if(le(me),o=t.memoizedState,o===null)return qe(t),null;if(n=(t.flags&128)!==0,a=o.rendering,a===null)if(n)Eo(o,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=sl(e),a!==null){for(t.flags|=128,Eo(o,!1),n=a.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)o=r,e=n,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return ae(me,me.current&1|2),t.child}e=e.sibling}o.tail!==null&&Ee()>Gi&&(t.flags|=128,n=!0,Eo(o,!1),t.lanes=4194304)}else{if(!n)if(e=sl(a),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Eo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!he)return qe(t),null}else 2*Ee()-o.renderingStartTime>Gi&&r!==1073741824&&(t.flags|=128,n=!0,Eo(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(r=o.last,r!==null?r.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ee(),t.sibling=null,r=me.current,ae(me,n?r&1|2:r&1),t):(qe(t),null);case 22:case 23:return Uh(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?Ot&1073741824&&(qe(t),t.subtreeFlags&6&&(t.flags|=8192)):qe(t),null;case 24:return null;case 25:return null}throw Error(C(156,t.tag))}function uE(e,t){switch(Eh(t),t.tag){case 1:return vt(t.type)&&el(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ui(),le(mt),le(et),Ih(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Lh(t),null;case 13:if(le(me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(C(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return le(me),null;case 4:return Ui(),null;case 10:return bh(t.type._context),null;case 22:case 23:return Uh(),null;case 24:return null;default:return null}}var Za=!1,Je=!1,cE=typeof WeakSet=="function"?WeakSet:Set,M=null;function bi(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){$e(e,t,n)}else r.current=null}function mf(e,t,r){try{r()}catch(n){$e(e,t,n)}}var Vp=!1;function fE(e,t){if(Qc=Xs,e=cy(),_h(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var i=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break e}var a=0,s=-1,l=-1,u=0,c=0,f=e,h=null;t:for(;;){for(var d;f!==r||i!==0&&f.nodeType!==3||(s=a+i),f!==o||n!==0&&f.nodeType!==3||(l=a+n),f.nodeType===3&&(a+=f.nodeValue.length),(d=f.firstChild)!==null;)h=f,f=d;for(;;){if(f===e)break t;if(h===r&&++u===i&&(s=a),h===o&&++c===n&&(l=a),(d=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=d}r=s===-1||l===-1?null:{start:s,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(Zc={focusedElem:e,selectionRange:r},Xs=!1,M=t;M!==null;)if(t=M,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,M=e;else for(;M!==null;){t=M;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var _=y.memoizedProps,$=y.memoizedState,v=t.stateNode,m=v.getSnapshotBeforeUpdate(t.elementType===t.type?_:Zt(t.type,_),$);v.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(C(163))}}catch(E){$e(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,M=e;break}M=t.return}return y=Vp,Vp=!1,y}function Uo(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var i=n=n.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&mf(t,r,o)}i=i.next}while(i!==n)}}function Ml(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function vf(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function a1(e){var t=e.alternate;t!==null&&(e.alternate=null,a1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[hr],delete t[la],delete t[tf],delete t[KS],delete t[YS])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function s1(e){return e.tag===5||e.tag===3||e.tag===4}function Kp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||s1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gf(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Js));else if(n!==4&&(e=e.child,e!==null))for(gf(e,t,r),e=e.sibling;e!==null;)gf(e,t,r),e=e.sibling}function yf(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(yf(e,t,r),e=e.sibling;e!==null;)yf(e,t,r),e=e.sibling}var De=null,Jt=!1;function Ur(e,t,r){for(r=r.child;r!==null;)l1(e,t,r),r=r.sibling}function l1(e,t,r){if(dr&&typeof dr.onCommitFiberUnmount=="function")try{dr.onCommitFiberUnmount(Rl,r)}catch{}switch(r.tag){case 5:Je||bi(r,t);case 6:var n=De,i=Jt;De=null,Ur(e,t,r),De=n,Jt=i,De!==null&&(Jt?(e=De,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):De.removeChild(r.stateNode));break;case 18:De!==null&&(Jt?(e=De,r=r.stateNode,e.nodeType===8?ku(e.parentNode,r):e.nodeType===1&&ku(e,r),na(e)):ku(De,r.stateNode));break;case 4:n=De,i=Jt,De=r.stateNode.containerInfo,Jt=!0,Ur(e,t,r),De=n,Jt=i;break;case 0:case 11:case 14:case 15:if(!Je&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){i=n=n.next;do{var o=i,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&mf(r,t,a),i=i.next}while(i!==n)}Ur(e,t,r);break;case 1:if(!Je&&(bi(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(s){$e(r,t,s)}Ur(e,t,r);break;case 21:Ur(e,t,r);break;case 22:r.mode&1?(Je=(n=Je)||r.memoizedState!==null,Ur(e,t,r),Je=n):Ur(e,t,r);break;default:Ur(e,t,r)}}function Yp(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new cE),t.forEach(function(n){var i=$E.bind(null,e,n);r.has(n)||(r.add(n),n.then(i,i))})}}function Xt(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var i=r[n];try{var o=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:De=s.stateNode,Jt=!1;break e;case 3:De=s.stateNode.containerInfo,Jt=!0;break e;case 4:De=s.stateNode.containerInfo,Jt=!0;break e}s=s.return}if(De===null)throw Error(C(160));l1(o,a,i),De=null,Jt=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(u){$e(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)u1(t,e),t=t.sibling}function u1(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Xt(t,e),lr(e),n&4){try{Uo(3,e,e.return),Ml(3,e)}catch(_){$e(e,e.return,_)}try{Uo(5,e,e.return)}catch(_){$e(e,e.return,_)}}break;case 1:Xt(t,e),lr(e),n&512&&r!==null&&bi(r,r.return);break;case 5:if(Xt(t,e),lr(e),n&512&&r!==null&&bi(r,r.return),e.flags&32){var i=e.stateNode;try{Jo(i,"")}catch(_){$e(e,e.return,_)}}if(n&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,a=r!==null?r.memoizedProps:o,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&L0(i,o),Hc(s,a);var u=Hc(s,o);for(a=0;a<l.length;a+=2){var c=l[a],f=l[a+1];c==="style"?P0(i,f):c==="dangerouslySetInnerHTML"?M0(i,f):c==="children"?Jo(i,f):lh(i,c,f,u)}switch(s){case"input":Pc(i,o);break;case"textarea":I0(i,o);break;case"select":var h=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var d=o.value;d!=null?Ii(i,!!o.multiple,d,!1):h!==!!o.multiple&&(o.defaultValue!=null?Ii(i,!!o.multiple,o.defaultValue,!0):Ii(i,!!o.multiple,o.multiple?[]:"",!1))}i[la]=o}catch(_){$e(e,e.return,_)}}break;case 6:if(Xt(t,e),lr(e),n&4){if(e.stateNode===null)throw Error(C(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(_){$e(e,e.return,_)}}break;case 3:if(Xt(t,e),lr(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{na(t.containerInfo)}catch(_){$e(e,e.return,_)}break;case 4:Xt(t,e),lr(e);break;case 13:Xt(t,e),lr(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Hh=Ee())),n&4&&Yp(e);break;case 22:if(c=r!==null&&r.memoizedState!==null,e.mode&1?(Je=(u=Je)||c,Xt(t,e),Je=u):Xt(t,e),lr(e),n&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(M=e,c=e.child;c!==null;){for(f=M=c;M!==null;){switch(h=M,d=h.child,h.tag){case 0:case 11:case 14:case 15:Uo(4,h,h.return);break;case 1:bi(h,h.return);var y=h.stateNode;if(typeof y.componentWillUnmount=="function"){n=h,r=h.return;try{t=n,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(_){$e(n,r,_)}}break;case 5:bi(h,h.return);break;case 22:if(h.memoizedState!==null){Xp(f);continue}}d!==null?(d.return=h,M=d):Xp(f)}c=c.sibling}e:for(c=null,f=e;;){if(f.tag===5){if(c===null){c=f;try{i=f.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=N0("display",a))}catch(_){$e(e,e.return,_)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(_){$e(e,e.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Xt(t,e),lr(e),n&4&&Yp(e);break;case 21:break;default:Xt(t,e),lr(e)}}function lr(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(s1(r)){var n=r;break e}r=r.return}throw Error(C(160))}switch(n.tag){case 5:var i=n.stateNode;n.flags&32&&(Jo(i,""),n.flags&=-33);var o=Kp(e);yf(e,o,i);break;case 3:case 4:var a=n.stateNode.containerInfo,s=Kp(e);gf(e,s,a);break;default:throw Error(C(161))}}catch(l){$e(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hE(e,t,r){M=e,c1(e)}function c1(e,t,r){for(var n=(e.mode&1)!==0;M!==null;){var i=M,o=i.child;if(i.tag===22&&n){var a=i.memoizedState!==null||Za;if(!a){var s=i.alternate,l=s!==null&&s.memoizedState!==null||Je;s=Za;var u=Je;if(Za=a,(Je=l)&&!u)for(M=i;M!==null;)a=M,l=a.child,a.tag===22&&a.memoizedState!==null?Qp(i):l!==null?(l.return=a,M=l):Qp(i);for(;o!==null;)M=o,c1(o),o=o.sibling;M=i,Za=s,Je=u}qp(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,M=o):qp(e)}}function qp(e){for(;M!==null;){var t=M;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Je||Ml(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!Je)if(r===null)n.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:Zt(t.type,r.memoizedProps);n.componentDidUpdate(i,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&kp(t,o,n);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}kp(t,a,r)}break;case 5:var s=t.stateNode;if(r===null&&t.flags&4){r=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break;case"img":l.src&&(r.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&na(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(C(163))}Je||t.flags&512&&vf(t)}catch(h){$e(t,t.return,h)}}if(t===e){M=null;break}if(r=t.sibling,r!==null){r.return=t.return,M=r;break}M=t.return}}function Xp(e){for(;M!==null;){var t=M;if(t===e){M=null;break}var r=t.sibling;if(r!==null){r.return=t.return,M=r;break}M=t.return}}function Qp(e){for(;M!==null;){var t=M;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Ml(4,t)}catch(l){$e(t,r,l)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var i=t.return;try{n.componentDidMount()}catch(l){$e(t,i,l)}}var o=t.return;try{vf(t)}catch(l){$e(t,o,l)}break;case 5:var a=t.return;try{vf(t)}catch(l){$e(t,a,l)}}}catch(l){$e(t,t.return,l)}if(t===e){M=null;break}var s=t.sibling;if(s!==null){s.return=t.return,M=s;break}M=t.return}}var dE=Math.ceil,cl=Dr.ReactCurrentDispatcher,Bh=Dr.ReactCurrentOwner,Ut=Dr.ReactCurrentBatchConfig,X=0,Pe=null,Ae=null,Ge=0,Ot=0,xi=$n(0),ke=0,pa=null,Vn=0,Nl=0,Dh=0,zo=null,dt=null,Hh=0,Gi=1/0,Cr=null,fl=!1,wf=null,cn=null,Ja=!1,nn=null,hl=0,Go=0,$f=null,Ns=-1,Ps=0;function it(){return X&6?Ee():Ns!==-1?Ns:Ns=Ee()}function fn(e){return e.mode&1?X&2&&Ge!==0?Ge&-Ge:XS.transition!==null?(Ps===0&&(Ps=Y0()),Ps):(e=te,e!==0||(e=window.event,e=e===void 0?16:ty(e.type)),e):1}function nr(e,t,r,n){if(50<Go)throw Go=0,$f=null,Error(C(185));ya(e,r,n),(!(X&2)||e!==Pe)&&(e===Pe&&(!(X&2)&&(Nl|=r),ke===4&&tn(e,Ge)),gt(e,n),r===1&&X===0&&!(t.mode&1)&&(Gi=Ee()+500,Ll&&_n()))}function gt(e,t){var r=e.callbackNode;X_(e,t);var n=qs(e,e===Pe?Ge:0);if(n===0)r!==null&&ap(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&ap(r),t===1)e.tag===0?qS(Zp.bind(null,e)):$y(Zp.bind(null,e)),GS(function(){!(X&6)&&_n()}),r=null;else{switch(q0(n)){case 1:r=dh;break;case 4:r=V0;break;case 16:r=Ys;break;case 536870912:r=K0;break;default:r=Ys}r=y1(r,f1.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function f1(e,t){if(Ns=-1,Ps=0,X&6)throw Error(C(327));var r=e.callbackNode;if(Fi()&&e.callbackNode!==r)return null;var n=qs(e,e===Pe?Ge:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=dl(e,n);else{t=n;var i=X;X|=2;var o=d1();(Pe!==e||Ge!==t)&&(Cr=null,Gi=Ee()+500,Hn(e,t));do try{vE();break}catch(s){h1(e,s)}while(!0);Rh(),cl.current=o,X=i,Ae!==null?t=0:(Pe=null,Ge=0,t=ke)}if(t!==0){if(t===2&&(i=Vc(e),i!==0&&(n=i,t=_f(e,i))),t===1)throw r=pa,Hn(e,0),tn(e,n),gt(e,Ee()),r;if(t===6)tn(e,n);else{if(i=e.current.alternate,!(n&30)&&!pE(i)&&(t=dl(e,n),t===2&&(o=Vc(e),o!==0&&(n=o,t=_f(e,o))),t===1))throw r=pa,Hn(e,0),tn(e,n),gt(e,Ee()),r;switch(e.finishedWork=i,e.finishedLanes=n,t){case 0:case 1:throw Error(C(345));case 2:Pn(e,dt,Cr);break;case 3:if(tn(e,n),(n&130023424)===n&&(t=Hh+500-Ee(),10<t)){if(qs(e,0)!==0)break;if(i=e.suspendedLanes,(i&n)!==n){it(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ef(Pn.bind(null,e,dt,Cr),t);break}Pn(e,dt,Cr);break;case 4:if(tn(e,n),(n&4194240)===n)break;for(t=e.eventTimes,i=-1;0<n;){var a=31-rr(n);o=1<<a,a=t[a],a>i&&(i=a),n&=~o}if(n=i,n=Ee()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*dE(n/1960))-n,10<n){e.timeoutHandle=ef(Pn.bind(null,e,dt,Cr),n);break}Pn(e,dt,Cr);break;case 5:Pn(e,dt,Cr);break;default:throw Error(C(329))}}}return gt(e,Ee()),e.callbackNode===r?f1.bind(null,e):null}function _f(e,t){var r=zo;return e.current.memoizedState.isDehydrated&&(Hn(e,t).flags|=256),e=dl(e,t),e!==2&&(t=dt,dt=r,t!==null&&Sf(t)),e}function Sf(e){dt===null?dt=e:dt.push.apply(dt,e)}function pE(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var i=r[n],o=i.getSnapshot;i=i.value;try{if(!ir(o(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function tn(e,t){for(t&=~Dh,t&=~Nl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-rr(t),n=1<<r;e[r]=-1,t&=~n}}function Zp(e){if(X&6)throw Error(C(327));Fi();var t=qs(e,0);if(!(t&1))return gt(e,Ee()),null;var r=dl(e,t);if(e.tag!==0&&r===2){var n=Vc(e);n!==0&&(t=n,r=_f(e,n))}if(r===1)throw r=pa,Hn(e,0),tn(e,t),gt(e,Ee()),r;if(r===6)throw Error(C(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pn(e,dt,Cr),gt(e,Ee()),null}function Wh(e,t){var r=X;X|=1;try{return e(t)}finally{X=r,X===0&&(Gi=Ee()+500,Ll&&_n())}}function Kn(e){nn!==null&&nn.tag===0&&!(X&6)&&Fi();var t=X;X|=1;var r=Ut.transition,n=te;try{if(Ut.transition=null,te=1,e)return e()}finally{te=n,Ut.transition=r,X=t,!(X&6)&&_n()}}function Uh(){Ot=xi.current,le(xi)}function Hn(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,zS(r)),Ae!==null)for(r=Ae.return;r!==null;){var n=r;switch(Eh(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&el();break;case 3:Ui(),le(mt),le(et),Ih();break;case 5:Lh(n);break;case 4:Ui();break;case 13:le(me);break;case 19:le(me);break;case 10:bh(n.type._context);break;case 22:case 23:Uh()}r=r.return}if(Pe=e,Ae=e=hn(e.current,null),Ge=Ot=t,ke=0,pa=null,Dh=Nl=Vn=0,dt=zo=null,Bn!==null){for(t=0;t<Bn.length;t++)if(r=Bn[t],n=r.interleaved,n!==null){r.interleaved=null;var i=n.next,o=r.pending;if(o!==null){var a=o.next;o.next=i,n.next=a}r.pending=n}Bn=null}return e}function h1(e,t){do{var r=Ae;try{if(Rh(),Is.current=ul,ll){for(var n=ve.memoizedState;n!==null;){var i=n.queue;i!==null&&(i.pending=null),n=n.next}ll=!1}if(Gn=0,Ne=Ie=ve=null,Wo=!1,fa=0,Bh.current=null,r===null||r.return===null){ke=1,pa=t,Ae=null;break}e:{var o=e,a=r.return,s=r,l=t;if(t=Ge,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=s,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var h=c.alternate;h?(c.updateQueue=h.updateQueue,c.memoizedState=h.memoizedState,c.lanes=h.lanes):(c.updateQueue=null,c.memoizedState=null)}var d=Bp(a);if(d!==null){d.flags&=-257,Dp(d,a,s,o,t),d.mode&1&&jp(o,u,t),t=d,l=u;var y=t.updateQueue;if(y===null){var _=new Set;_.add(l),t.updateQueue=_}else y.add(l);break e}else{if(!(t&1)){jp(o,u,t),zh();break e}l=Error(C(426))}}else if(he&&s.mode&1){var $=Bp(a);if($!==null){!($.flags&65536)&&($.flags|=256),Dp($,a,s,o,t),Ah(zi(l,s));break e}}o=l=zi(l,s),ke!==4&&(ke=2),zo===null?zo=[o]:zo.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=qy(o,l,t);Ip(o,v);break e;case 1:s=l;var m=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof m.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(cn===null||!cn.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var E=Xy(o,s,t);Ip(o,E);break e}}o=o.return}while(o!==null)}m1(r)}catch(O){t=O,Ae===r&&r!==null&&(Ae=r=r.return);continue}break}while(!0)}function d1(){var e=cl.current;return cl.current=ul,e===null?ul:e}function zh(){(ke===0||ke===3||ke===2)&&(ke=4),Pe===null||!(Vn&268435455)&&!(Nl&268435455)||tn(Pe,Ge)}function dl(e,t){var r=X;X|=2;var n=d1();(Pe!==e||Ge!==t)&&(Cr=null,Hn(e,t));do try{mE();break}catch(i){h1(e,i)}while(!0);if(Rh(),X=r,cl.current=n,Ae!==null)throw Error(C(261));return Pe=null,Ge=0,ke}function mE(){for(;Ae!==null;)p1(Ae)}function vE(){for(;Ae!==null&&!H_();)p1(Ae)}function p1(e){var t=g1(e.alternate,e,Ot);e.memoizedProps=e.pendingProps,t===null?m1(e):Ae=t,Bh.current=null}function m1(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=uE(r,t),r!==null){r.flags&=32767,Ae=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ke=6,Ae=null;return}}else if(r=lE(r,t,Ot),r!==null){Ae=r;return}if(t=t.sibling,t!==null){Ae=t;return}Ae=t=e}while(t!==null);ke===0&&(ke=5)}function Pn(e,t,r){var n=te,i=Ut.transition;try{Ut.transition=null,te=1,gE(e,t,r,n)}finally{Ut.transition=i,te=n}return null}function gE(e,t,r,n){do Fi();while(nn!==null);if(X&6)throw Error(C(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(C(177));e.callbackNode=null,e.callbackPriority=0;var o=r.lanes|r.childLanes;if(Q_(e,o),e===Pe&&(Ae=Pe=null,Ge=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Ja||(Ja=!0,y1(Ys,function(){return Fi(),null})),o=(r.flags&15990)!==0,r.subtreeFlags&15990||o){o=Ut.transition,Ut.transition=null;var a=te;te=1;var s=X;X|=4,Bh.current=null,fE(e,r),u1(r,e),FS(Zc),Xs=!!Qc,Zc=Qc=null,e.current=r,hE(r),W_(),X=s,te=a,Ut.transition=o}else e.current=r;if(Ja&&(Ja=!1,nn=e,hl=i),o=e.pendingLanes,o===0&&(cn=null),G_(r.stateNode),gt(e,Ee()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],n(i.value,{componentStack:i.stack,digest:i.digest});if(fl)throw fl=!1,e=wf,wf=null,e;return hl&1&&e.tag!==0&&Fi(),o=e.pendingLanes,o&1?e===$f?Go++:(Go=0,$f=e):Go=0,_n(),null}function Fi(){if(nn!==null){var e=q0(hl),t=Ut.transition,r=te;try{if(Ut.transition=null,te=16>e?16:e,nn===null)var n=!1;else{if(e=nn,nn=null,hl=0,X&6)throw Error(C(331));var i=X;for(X|=4,M=e.current;M!==null;){var o=M,a=o.child;if(M.flags&16){var s=o.deletions;if(s!==null){for(var l=0;l<s.length;l++){var u=s[l];for(M=u;M!==null;){var c=M;switch(c.tag){case 0:case 11:case 15:Uo(8,c,o)}var f=c.child;if(f!==null)f.return=c,M=f;else for(;M!==null;){c=M;var h=c.sibling,d=c.return;if(a1(c),c===u){M=null;break}if(h!==null){h.return=d,M=h;break}M=d}}}var y=o.alternate;if(y!==null){var _=y.child;if(_!==null){y.child=null;do{var $=_.sibling;_.sibling=null,_=$}while(_!==null)}}M=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,M=a;else e:for(;M!==null;){if(o=M,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Uo(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,M=v;break e}M=o.return}}var m=e.current;for(M=m;M!==null;){a=M;var g=a.child;if(a.subtreeFlags&2064&&g!==null)g.return=a,M=g;else e:for(a=m;M!==null;){if(s=M,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ml(9,s)}}catch(O){$e(s,s.return,O)}if(s===a){M=null;break e}var E=s.sibling;if(E!==null){E.return=s.return,M=E;break e}M=s.return}}if(X=i,_n(),dr&&typeof dr.onPostCommitFiberRoot=="function")try{dr.onPostCommitFiberRoot(Rl,e)}catch{}n=!0}return n}finally{te=r,Ut.transition=t}}return!1}function Jp(e,t,r){t=zi(r,t),t=qy(e,t,1),e=un(e,t,1),t=it(),e!==null&&(ya(e,1,t),gt(e,t))}function $e(e,t,r){if(e.tag===3)Jp(e,e,r);else for(;t!==null;){if(t.tag===3){Jp(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(cn===null||!cn.has(n))){e=zi(r,e),e=Xy(t,e,1),t=un(t,e,1),e=it(),t!==null&&(ya(t,1,e),gt(t,e));break}}t=t.return}}function yE(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=it(),e.pingedLanes|=e.suspendedLanes&r,Pe===e&&(Ge&r)===r&&(ke===4||ke===3&&(Ge&130023424)===Ge&&500>Ee()-Hh?Hn(e,0):Dh|=r),gt(e,t)}function v1(e,t){t===0&&(e.mode&1?(t=Ua,Ua<<=1,!(Ua&130023424)&&(Ua=4194304)):t=1);var r=it();e=Fr(e,t),e!==null&&(ya(e,t,r),gt(e,r))}function wE(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),v1(e,r)}function $E(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(C(314))}n!==null&&n.delete(t),v1(e,r)}var g1;g1=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||mt.current)pt=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return pt=!1,sE(e,t,r);pt=!!(e.flags&131072)}else pt=!1,he&&t.flags&1048576&&_y(t,nl,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Ms(e,t),e=t.pendingProps;var i=Di(t,et.current);Pi(t,r),i=Mh(null,t,n,e,i,r);var o=Nh();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,vt(n)?(o=!0,tl(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Ch(t),i.updater=kl,t.stateNode=i,i._reactInternals=t,lf(t,n,e,r),t=ff(null,t,n,!0,o,r)):(t.tag=0,he&&o&&Sh(t),nt(null,t,i,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Ms(e,t),e=t.pendingProps,i=n._init,n=i(n._payload),t.type=n,i=t.tag=SE(n),e=Zt(n,e),i){case 0:t=cf(null,t,n,e,r);break e;case 1:t=Up(null,t,n,e,r);break e;case 11:t=Hp(null,t,n,e,r);break e;case 14:t=Wp(null,t,n,Zt(n.type,e),r);break e}throw Error(C(306,n,""))}return t;case 0:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:Zt(n,i),cf(e,t,n,i,r);case 1:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:Zt(n,i),Up(e,t,n,i,r);case 3:e:{if(e1(t),e===null)throw Error(C(387));n=t.pendingProps,o=t.memoizedState,i=o.element,by(e,t),al(t,n,null,r);var a=t.memoizedState;if(n=a.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=zi(Error(C(423)),t),t=zp(e,t,n,r,i);break e}else if(n!==i){i=zi(Error(C(424)),t),t=zp(e,t,n,r,i);break e}else for(xt=ln(t.stateNode.containerInfo.firstChild),Ct=t,he=!0,er=null,r=Oy(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Hi(),n===i){t=jr(e,t,r);break e}nt(e,t,n,r)}t=t.child}return t;case 5:return xy(t),e===null&&of(t),n=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Jc(n,i)?a=null:o!==null&&Jc(n,o)&&(t.flags|=32),Jy(e,t),nt(e,t,a,r),t.child;case 6:return e===null&&of(t),null;case 13:return t1(e,t,r);case 4:return Th(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Wi(t,null,n,r):nt(e,t,n,r),t.child;case 11:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:Zt(n,i),Hp(e,t,n,i,r);case 7:return nt(e,t,t.pendingProps,r),t.child;case 8:return nt(e,t,t.pendingProps.children,r),t.child;case 12:return nt(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value,ae(il,n._currentValue),n._currentValue=a,o!==null)if(ir(o.value,a)){if(o.children===i.children&&!mt.current){t=jr(e,t,r);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){a=o.child;for(var l=s.firstContext;l!==null;){if(l.context===n){if(o.tag===1){l=kr(-1,r&-r),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),af(o.return,r,t),s.lanes|=r;break}l=l.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(C(341));a.lanes|=r,s=a.alternate,s!==null&&(s.lanes|=r),af(a,r,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}nt(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,n=t.pendingProps.children,Pi(t,r),i=Kt(i),n=n(i),t.flags|=1,nt(e,t,n,r),t.child;case 14:return n=t.type,i=Zt(n,t.pendingProps),i=Zt(n.type,i),Wp(e,t,n,i,r);case 15:return Qy(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:Zt(n,i),Ms(e,t),t.tag=1,vt(n)?(e=!0,tl(t)):e=!1,Pi(t,r),Yy(t,n,i),lf(t,n,i,r),ff(null,t,n,!0,e,r);case 19:return r1(e,t,r);case 22:return Zy(e,t,r)}throw Error(C(156,t.tag))};function y1(e,t){return G0(e,t)}function _E(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Wt(e,t,r,n){return new _E(e,t,r,n)}function Gh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function SE(e){if(typeof e=="function")return Gh(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ch)return 11;if(e===fh)return 14}return 2}function hn(e,t){var r=e.alternate;return r===null?(r=Wt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Fs(e,t,r,n,i,o){var a=2;if(n=e,typeof e=="function")Gh(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case yi:return Wn(r.children,i,o,t);case uh:a=8,i|=8;break;case Lc:return e=Wt(12,r,t,i|2),e.elementType=Lc,e.lanes=o,e;case Ic:return e=Wt(13,r,t,i),e.elementType=Ic,e.lanes=o,e;case kc:return e=Wt(19,r,t,i),e.elementType=kc,e.lanes=o,e;case x0:return Pl(r,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case R0:a=10;break e;case b0:a=9;break e;case ch:a=11;break e;case fh:a=14;break e;case Xr:a=16,n=null;break e}throw Error(C(130,e==null?e:typeof e,""))}return t=Wt(a,r,t,i),t.elementType=e,t.type=n,t.lanes=o,t}function Wn(e,t,r,n){return e=Wt(7,e,n,t),e.lanes=r,e}function Pl(e,t,r,n){return e=Wt(22,e,n,t),e.elementType=x0,e.lanes=r,e.stateNode={isHidden:!1},e}function Hu(e,t,r){return e=Wt(6,e,null,t),e.lanes=r,e}function Wu(e,t,r){return t=Wt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function EE(e,t,r,n,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Su(0),this.expirationTimes=Su(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Su(0),this.identifierPrefix=n,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Vh(e,t,r,n,i,o,a,s,l){return e=new EE(e,t,r,s,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Wt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ch(o),e}function AE(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gi,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function w1(e){if(!e)return gn;e=e._reactInternals;e:{if(Qn(e)!==e||e.tag!==1)throw Error(C(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(vt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(C(171))}if(e.tag===1){var r=e.type;if(vt(r))return wy(e,r,t)}return t}function $1(e,t,r,n,i,o,a,s,l){return e=Vh(r,n,!0,e,i,o,a,s,l),e.context=w1(null),r=e.current,n=it(),i=fn(r),o=kr(n,i),o.callback=t??null,un(r,o,i),e.current.lanes=i,ya(e,i,n),gt(e,n),e}function Fl(e,t,r,n){var i=t.current,o=it(),a=fn(i);return r=w1(r),t.context===null?t.context=r:t.pendingContext=r,t=kr(o,a),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=un(i,t,a),e!==null&&(nr(e,i,a,o),Ls(e,i,a)),a}function pl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function em(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Kh(e,t){em(e,t),(e=e.alternate)&&em(e,t)}function OE(){return null}var _1=typeof reportError=="function"?reportError:function(e){console.error(e)};function Yh(e){this._internalRoot=e}jl.prototype.render=Yh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(C(409));Fl(e,t,null,null)};jl.prototype.unmount=Yh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kn(function(){Fl(null,e,null,null)}),t[Pr]=null}};function jl(e){this._internalRoot=e}jl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Z0();e={blockedOn:null,target:e,priority:t};for(var r=0;r<en.length&&t!==0&&t<en[r].priority;r++);en.splice(r,0,e),r===0&&ey(e)}};function qh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function tm(){}function RE(e,t,r,n,i){if(i){if(typeof n=="function"){var o=n;n=function(){var u=pl(a);o.call(u)}}var a=$1(t,n,e,0,null,!1,!1,"",tm);return e._reactRootContainer=a,e[Pr]=a.current,aa(e.nodeType===8?e.parentNode:e),Kn(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof n=="function"){var s=n;n=function(){var u=pl(l);s.call(u)}}var l=Vh(e,0,!1,null,null,!1,!1,"",tm);return e._reactRootContainer=l,e[Pr]=l.current,aa(e.nodeType===8?e.parentNode:e),Kn(function(){Fl(t,l,r,n)}),l}function Dl(e,t,r,n,i){var o=r._reactRootContainer;if(o){var a=o;if(typeof i=="function"){var s=i;i=function(){var l=pl(a);s.call(l)}}Fl(t,a,e,i)}else a=RE(r,t,e,i,n);return pl(a)}X0=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=No(t.pendingLanes);r!==0&&(ph(t,r|1),gt(t,Ee()),!(X&6)&&(Gi=Ee()+500,_n()))}break;case 13:Kn(function(){var n=Fr(e,1);if(n!==null){var i=it();nr(n,e,1,i)}}),Kh(e,1)}};mh=function(e){if(e.tag===13){var t=Fr(e,134217728);if(t!==null){var r=it();nr(t,e,134217728,r)}Kh(e,134217728)}};Q0=function(e){if(e.tag===13){var t=fn(e),r=Fr(e,t);if(r!==null){var n=it();nr(r,e,t,n)}Kh(e,t)}};Z0=function(){return te};J0=function(e,t){var r=te;try{return te=e,t()}finally{te=r}};Uc=function(e,t,r){switch(t){case"input":if(Pc(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var i=Tl(n);if(!i)throw Error(C(90));T0(n),Pc(n,i)}}}break;case"textarea":I0(e,r);break;case"select":t=r.value,t!=null&&Ii(e,!!r.multiple,t,!1)}};B0=Wh;D0=Kn;var bE={usingClientEntryPoint:!1,Events:[$a,Si,Tl,F0,j0,Wh]},Ao={findFiberByHostInstance:jn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},xE={bundleType:Ao.bundleType,version:Ao.version,rendererPackageName:Ao.rendererPackageName,rendererConfig:Ao.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Dr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=U0(e),e===null?null:e.stateNode},findFiberByHostInstance:Ao.findFiberByHostInstance||OE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var es=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!es.isDisabled&&es.supportsFiber)try{Rl=es.inject(xE),dr=es}catch{}}Lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bE;Lt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qh(t))throw Error(C(200));return AE(e,t,null,r)};Lt.createRoot=function(e,t){if(!qh(e))throw Error(C(299));var r=!1,n="",i=_1;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Vh(e,1,!1,null,null,r,!1,n,i),e[Pr]=t.current,aa(e.nodeType===8?e.parentNode:e),new Yh(t)};Lt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(C(188)):(e=Object.keys(e).join(","),Error(C(268,e)));return e=U0(t),e=e===null?null:e.stateNode,e};Lt.flushSync=function(e){return Kn(e)};Lt.hydrate=function(e,t,r){if(!Bl(t))throw Error(C(200));return Dl(null,e,t,!0,r)};Lt.hydrateRoot=function(e,t,r){if(!qh(e))throw Error(C(405));var n=r!=null&&r.hydratedSources||null,i=!1,o="",a=_1;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=$1(t,null,e,1,r??null,i,!1,o,a),e[Pr]=t.current,aa(e),n)for(e=0;e<n.length;e++)r=n[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new jl(t)};Lt.render=function(e,t,r){if(!Bl(t))throw Error(C(200));return Dl(null,e,t,!1,r)};Lt.unmountComponentAtNode=function(e){if(!Bl(e))throw Error(C(40));return e._reactRootContainer?(Kn(function(){Dl(null,null,e,!1,function(){e._reactRootContainer=null,e[Pr]=null})}),!0):!1};Lt.unstable_batchedUpdates=Wh;Lt.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Bl(r))throw Error(C(200));if(e==null||e._reactInternals===void 0)throw Error(C(38));return Dl(e,t,r,!1,n)};Lt.version="18.3.1-next-f1338f8080-20240426";function S1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(S1)}catch(e){console.error(e)}}S1(),S0.exports=Lt;var CE=S0.exports,rm=CE;Cc.createRoot=rm.createRoot,Cc.hydrateRoot=rm.hydrateRoot;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TE=typeof Object.defineProperty=="function"?Object.defineProperty:null,LE=TE;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var IE=LE;function kE(){try{return IE({},"x",{}),!0}catch{return!1}}var ME=kE;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var NE=Object.defineProperty,PE=NE;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function FE(e){return typeof e=="number"}var E1=FE;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function jE(e){return e[0]==="-"}function nm(e){var t="",r;for(r=0;r<e;r++)t+="0";return t}function BE(e,t,r){var n=!1,i=t-e.length;return i<0||(jE(e)&&(n=!0,e=e.substr(1)),e=r?e+nm(i):nm(i)+e,n&&(e="-"+e)),e}var A1=BE;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var DE=E1,im=A1,HE=String.prototype.toLowerCase,om=String.prototype.toUpperCase;function WE(e){var t,r,n;switch(e.specifier){case"b":t=2;break;case"o":t=8;break;case"x":case"X":t=16;break;case"d":case"i":case"u":default:t=10;break}if(r=e.arg,n=parseInt(r,10),!isFinite(n)){if(!DE(r))throw new Error("invalid integer. Value: "+r);n=0}return n<0&&(e.specifier==="u"||t!==10)&&(n=4294967295+n+1),n<0?(r=(-n).toString(t),e.precision&&(r=im(r,e.precision,e.padRight)),r="-"+r):(r=n.toString(t),!n&&!e.precision?r="":e.precision&&(r=im(r,e.precision,e.padRight)),e.sign&&(r=e.sign+r)),t===16&&(e.alternate&&(r="0x"+r),r=e.specifier===om.call(e.specifier)?om.call(r):HE.call(r)),t===8&&e.alternate&&r.charAt(0)!=="0"&&(r="0"+r),r}var UE=WE;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function zE(e){return typeof e=="string"}var GE=zE;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VE=E1,KE=Math.abs,YE=String.prototype.toLowerCase,am=String.prototype.toUpperCase,Cn=String.prototype.replace,qE=/e\+(\d)$/,XE=/e-(\d)$/,QE=/^(\d+)$/,ZE=/^(\d+)e/,JE=/\.0$/,eA=/\.0*e/,tA=/(\..*[^0])0*e/;function rA(e){var t,r,n=parseFloat(e.arg);if(!isFinite(n)){if(!VE(e.arg))throw new Error("invalid floating-point number. Value: "+r);n=e.arg}switch(e.specifier){case"e":case"E":r=n.toExponential(e.precision);break;case"f":case"F":r=n.toFixed(e.precision);break;case"g":case"G":KE(n)<1e-4?(t=e.precision,t>0&&(t-=1),r=n.toExponential(t)):r=n.toPrecision(e.precision),e.alternate||(r=Cn.call(r,tA,"$1e"),r=Cn.call(r,eA,"e"),r=Cn.call(r,JE,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return r=Cn.call(r,qE,"e+0$1"),r=Cn.call(r,XE,"e-0$1"),e.alternate&&(r=Cn.call(r,QE,"$1."),r=Cn.call(r,ZE,"$1.e")),n>=0&&e.sign&&(r=e.sign+r),r=e.specifier===am.call(e.specifier)?am.call(r):YE.call(r),r}var nA=rA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function sm(e){var t="",r;for(r=0;r<e;r++)t+=" ";return t}function iA(e,t,r){var n=t-e.length;return n<0||(e=r?e+sm(n):sm(n)+e),e}var oA=iA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var aA=UE,sA=GE,lA=nA,uA=oA,cA=A1,fA=String.fromCharCode,hA=Array.isArray;function ts(e){return e!==e}function dA(e){var t={};return t.specifier=e.specifier,t.precision=e.precision===void 0?1:e.precision,t.width=e.width,t.flags=e.flags||"",t.mapping=e.mapping,t}function pA(e){var t,r,n,i,o,a,s,l,u;if(!hA(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(a="",s=1,l=0;l<e.length;l++)if(n=e[l],sA(n))a+=n;else{if(t=n.precision!==void 0,n=dA(n),!n.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+l+"`. Value: `"+n+"`.");for(n.mapping&&(s=n.mapping),r=n.flags,u=0;u<r.length;u++)switch(i=r.charAt(u),i){case" ":n.sign=" ";break;case"+":n.sign="+";break;case"-":n.padRight=!0,n.padZeros=!1;break;case"0":n.padZeros=r.indexOf("-")<0;break;case"#":n.alternate=!0;break;default:throw new Error("invalid flag: "+i)}if(n.width==="*"){if(n.width=parseInt(arguments[s],10),s+=1,ts(n.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+n.width+"`.");n.width<0&&(n.padRight=!0,n.width=-n.width)}if(t&&n.precision==="*"){if(n.precision=parseInt(arguments[s],10),s+=1,ts(n.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+n.precision+"`.");n.precision<0&&(n.precision=1,t=!1)}switch(n.arg=arguments[s],n.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":t&&(n.padZeros=!1),n.arg=aA(n);break;case"s":n.maxWidth=t?n.precision:-1,n.arg=String(n.arg);break;case"c":if(!ts(n.arg)){if(o=parseInt(n.arg,10),o<0||o>127)throw new Error("invalid character code. Value: "+n.arg);n.arg=ts(o)?String(n.arg):fA(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":t||(n.precision=6),n.arg=lA(n);break;default:throw new Error("invalid specifier: "+n.specifier)}n.maxWidth>=0&&n.arg.length>n.maxWidth&&(n.arg=n.arg.substring(0,n.maxWidth)),n.padZeros?n.arg=cA(n.arg,n.width||n.precision,n.padRight):n.width&&(n.arg=uA(n.arg,n.width,n.padRight)),a+=n.arg||"",s+=1}return a}var mA=pA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vA=mA,gA=vA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rs=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function yA(e){var t={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return e[4]==="."&&e[5]===void 0&&(t.precision="1"),t}function wA(e){var t,r,n,i;for(r=[],i=0,n=rs.exec(e);n;)t=e.slice(i,rs.lastIndex-n[0].length),t.length&&r.push(t),r.push(yA(n)),i=rs.lastIndex,n=rs.exec(e);return t=e.slice(i),t.length&&r.push(t),r}var $A=wA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _A=$A,SA=_A;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function EA(e){return typeof e=="string"}var AA=EA;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OA=gA,RA=SA,bA=AA;function O1(e){var t,r;if(!bA(e))throw new TypeError(O1("invalid argument. First argument must be a string. Value: `%s`.",e));for(t=[RA(e)],r=1;r<arguments.length;r++)t.push(arguments[r]);return OA.apply(null,t)}var xA=O1;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var CA=xA,Se=CA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lm=Se,ro=Object.prototype,um=ro.toString,cm=ro.__defineGetter__,fm=ro.__defineSetter__,TA=ro.__lookupGetter__,LA=ro.__lookupSetter__;function IA(e,t,r){var n,i,o,a;if(typeof e!="object"||e===null||um.call(e)==="[object Array]")throw new TypeError(lm("invalid argument. First argument must be an object. Value: `%s`.",e));if(typeof r!="object"||r===null||um.call(r)==="[object Array]")throw new TypeError(lm("invalid argument. Property descriptor must be an object. Value: `%s`.",r));if(i="value"in r,i&&(TA.call(e,t)||LA.call(e,t)?(n=e.__proto__,e.__proto__=ro,delete e[t],e[t]=r.value,e.__proto__=n):e[t]=r.value),o="get"in r,a="set"in r,i&&(o||a))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return o&&cm&&cm.call(e,t,r.get),a&&fm&&fm.call(e,t,r.set),e}var kA=IA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var MA=ME,NA=PE,PA=kA,Ef;MA()?Ef=NA:Ef=PA;var Zn=Ef;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var FA=Zn;function jA(e,t,r){FA(e,t,{configurable:!1,enumerable:!1,writable:!1,value:r})}var BA=jA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var DA=BA,ce=DA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HA=Zn;function WA(e,t,r){HA(e,t,{configurable:!1,enumerable:!1,get:r})}var UA=WA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zA=UA,Sa=zA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var GA=Zn;function VA(e,t,r,n){GA(e,t,{configurable:!1,enumerable:!1,get:r,set:n})}var KA=VA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var YA=KA,Xh=YA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function qA(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}var XA=qA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QA=XA,ZA=QA;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JA=ZA,e2=JA();function t2(){return e2&&typeof Symbol.toStringTag=="symbol"}var r2=t2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var n2=r2,Hl=n2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var i2=Object.prototype.toString,R1=i2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var o2=R1;function a2(e){return o2.call(e)}var s2=a2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var l2=Object.prototype.hasOwnProperty;function u2(e,t){return e==null?!1:l2.call(e,t)}var c2=u2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var f2=c2,Hr=f2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var h2=typeof Symbol=="function"?Symbol:void 0,d2=h2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var p2=d2,b1=p2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hm=b1,m2=typeof hm=="function"?hm.toStringTag:"",v2=m2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var g2=Hr,Oo=v2,Uu=R1;function y2(e){var t,r,n;if(e==null)return Uu.call(e);r=e[Oo],t=g2(e,Oo);try{e[Oo]=void 0}catch{return Uu.call(e)}return n=Uu.call(e),t?e[Oo]=r:delete e[Oo],n}var w2=y2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $2=Hl,_2=s2,S2=w2,Af;$2()?Af=S2:Af=_2;var je=Af;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var E2=je,Of;function A2(e){return E2(e)==="[object Array]"}Array.isArray?Of=Array.isArray:Of=A2;var O2=Of;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var R2=O2,no=R2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var b2=no;function x2(e){return typeof e=="object"&&e!==null&&!b2(e)}var C2=x2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var T2=C2,Qh=T2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var L2=/./,I2=L2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function k2(e){return typeof e=="boolean"}var x1=k2;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var M2=Boolean,N2=M2;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var P2=N2,F2=P2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var j2=Boolean.prototype.toString,B2=j2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var D2=B2;function H2(e){try{return D2.call(e),!0}catch{return!1}}var W2=H2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var U2=Hl,z2=je,G2=F2,V2=W2,K2=U2();function Y2(e){return typeof e=="object"?e instanceof G2?!0:K2?V2(e):z2(e)==="[object Boolean]":!1}var C1=Y2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var q2=x1,X2=C1;function Q2(e){return q2(e)||X2(e)}var Z2=Q2;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var T1=ce,Zh=Z2,J2=x1,eO=C1;T1(Zh,"isPrimitive",J2);T1(Zh,"isObject",eO);var Wl=Zh;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function tO(){return new Function("return this;")()}var rO=tO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nO=typeof self=="object"?self:null,iO=nO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var oO=typeof window=="object"?window:null,aO=oO;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sO=typeof globalThis=="object"?globalThis:null,lO=sO;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var uO=Wl.isPrimitive,cO=Se,fO=rO,dm=iO,pm=aO,mm=lO;function hO(e){if(arguments.length){if(!uO(e))throw new TypeError(cO("invalid argument. Must provide a boolean. Value: `%s`.",e));if(e)return fO()}if(mm)return mm;if(dm)return dm;if(pm)return pm;throw new Error("unexpected error. Unable to resolve global object.")}var dO=hO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pO=dO,vm=pO(),mO=vm.document&&vm.document.childNodes,vO=mO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gO=Int8Array,yO=gO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wO=I2,$O=vO,_O=yO;function SO(){return typeof wO=="function"||typeof _O=="object"||typeof $O=="function"}var EO=SO;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function AO(){return/^\s*function\s*([^(]*)/i}var L1=AO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OO=L1,RO=OO(),bO=RO;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xO=ce,I1=L1,CO=bO;xO(I1,"REGEXP",CO);var k1=I1;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TO=no,LO=Se;function IO(e){if(typeof e!="function")throw new TypeError(LO("invalid argument. Must provide a function. Value: `%s`.",e));return t;function t(r){var n,i;if(!TO(r)||(n=r.length,n===0))return!1;for(i=0;i<n;i++)if(e(r[i])===!1)return!1;return!0}}var kO=IO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var MO=kO,NO=MO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function PO(e){return e!==null&&typeof e=="object"}var FO=PO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jO=ce,BO=NO,Jh=FO,DO=BO(Jh);jO(Jh,"isObjectLikeArray",DO);var M1=Jh;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HO=M1;function WO(e){return HO(e)&&(e._isBuffer||e.constructor&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e))}var UO=WO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zO=UO,N1=zO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var GO=je,VO=k1.REGEXP,KO=N1;function YO(e){var t,r,n;if(r=GO(e).slice(8,-1),(r==="Object"||r==="Error")&&e.constructor){if(n=e.constructor,typeof n.name=="string")return n.name;if(t=VO.exec(n.toString()),t)return t[1]}return KO(e)?"Buffer":r}var qO=YO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var XO=qO,io=XO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QO=io;function ZO(e){var t;return e===null?"null":(t=typeof e,t==="object"?QO(e).toLowerCase():t)}var JO=ZO;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eR=io;function tR(e){return eR(e).toLowerCase()}var rR=tR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nR=EO,iR=JO,oR=rR,aR=nR()?oR:iR,P1=aR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sR=P1;function lR(e){return sR(e)==="function"}var uR=lR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cR=uR,Sn=cR;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fR=Object,hR=fR;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dR=hR,ed=dR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pR=Object.getPrototypeOf,mR=pR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function vR(e){return e.__proto__}var gR=vR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yR=je,wR=gR;function $R(e){var t=wR(e);return t||t===null?t:yR(e.constructor)==="[object Function]"?e.constructor.prototype:e instanceof Object?Object.prototype:null}var _R=$R;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var SR=Sn,ER=mR,AR=_R,Rf;SR(Object.getPrototypeOf)?Rf=ER:Rf=AR;var OR=Rf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var RR=ed,bR=OR;function xR(e){return e==null?null:(e=RR(e),bR(e))}var CR=xR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TR=CR,Ul=TR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LR=Qh,gm=Sn,IR=Ul,js=Hr,kR=je,MR=Object.prototype;function NR(e){var t;for(t in e)if(!js(e,t))return!1;return!0}function PR(e){var t;return LR(e)?(t=IR(e),t?!js(e,"constructor")&&js(t,"constructor")&&gm(t.constructor)&&kR(t.constructor)==="[object Function]"&&js(t,"isPrototypeOf")&&gm(t.isPrototypeOf)&&(t===MR||NR(e)):!0):!1}var FR=PR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jR=FR,td=jR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function BR(e){return t;function t(){return e}}var DR=BR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HR=DR,F1=HR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function WR(){}var UR=WR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zR=UR,rd=zR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var GR=je,VR=typeof Uint32Array=="function";function KR(e){return VR&&e instanceof Uint32Array||GR(e)==="[object Uint32Array]"}var YR=KR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qR=YR,zl=qR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var XR=Math.floor,QR=XR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ZR=QR,oo=ZR;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JR=oo;function eb(e){return JR(e)===e}var tb=eb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rb=tb,En=rb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nb=9007199254740991,ib=nb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ob=En,ab=ib;function sb(e){return typeof e=="object"&&e!==null&&typeof e.length=="number"&&ob(e.length)&&e.length>=0&&e.length<=ab}var lb=sb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ub=lb,Gl=ub;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function cb(e){return typeof e=="number"}var j1=cb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fb=Number;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hb=fb,nd=hb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var db=nd,pb=db.prototype.toString,mb=pb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vb=mb;function gb(e){try{return vb.call(e),!0}catch{return!1}}var yb=gb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wb=Hl,$b=je,_b=nd,Sb=yb,Eb=wb();function Ab(e){return typeof e=="object"?e instanceof _b?!0:Eb?Sb(e):$b(e)==="[object Number]":!1}var B1=Ab;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ob=j1,Rb=B1;function bb(e){return Ob(e)||Rb(e)}var xb=bb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var D1=ce,id=xb,Cb=j1,Tb=B1;D1(id,"isPrimitive",Cb);D1(id,"isObject",Tb);var wr=id;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lb=Number.POSITIVE_INFINITY,$r=Lb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ib=nd,kb=Ib.NEGATIVE_INFINITY,Jn=kb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mb=$r,Nb=Jn,Pb=En;function Fb(e){return e<Mb&&e>Nb&&Pb(e)}var H1=Fb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jb=wr.isPrimitive,Bb=H1;function Db(e){return jb(e)&&Bb(e)}var W1=Db;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Hb=wr.isObject,Wb=H1;function Ub(e){return Hb(e)&&Wb(e.valueOf())}var U1=Ub;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zb=W1,Gb=U1;function Vb(e){return zb(e)||Gb(e)}var Kb=Vb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var z1=ce,od=Kb,Yb=W1,qb=U1;z1(od,"isPrimitive",Yb);z1(od,"isObject",qb);var ao=od;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xb=ao.isPrimitive;function Qb(e){return Xb(e)&&e>0}var G1=Qb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zb=ao.isObject;function Jb(e){return Zb(e)&&e.valueOf()>0}var V1=Jb;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ex=G1,tx=V1;function rx(e){return ex(e)||tx(e)}var nx=rx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var K1=ce,ad=nx,ix=G1,ox=V1;K1(ad,"isPrimitive",ix);K1(ad,"isObject",ox);var ax=ad;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sx=9007199254740991,lx=sx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ux=4294967295,Ea=ux;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cx=typeof Uint32Array=="function"?Uint32Array:null,fx=cx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hx=zl,zu=Ea,ym=fx;function dx(){var e,t;if(typeof ym!="function")return!1;try{t=[1,3.14,-3.14,zu+1,zu+2],t=new ym(t),e=hx(t)&&t[0]===1&&t[1]===3&&t[2]===zu-2&&t[3]===0&&t[4]===1}catch{e=!1}return e}var px=dx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mx=px,vx=mx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gx=typeof Uint32Array=="function"?Uint32Array:void 0,yx=gx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function wx(){throw new Error("not implemented")}var $x=wx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _x=vx,Sx=yx,Ex=$x,bf;_x()?bf=Sx:bf=Ex;var _r=bf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ax=$r;function Ox(e){return e===0&&1/e===Ax}var Rx=Ox;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bx=Rx,xx=bx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Cx(e){return e!==e}var Tx=Cx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lx=Tx,Wr=Lx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ix=xx,wm=Wr,Gu=$r;function kx(e,t){return wm(e)||wm(t)?NaN:e===Gu||t===Gu?Gu:e===t&&e===0?Ix(e)?e:t:e>t?e:t}var Mx=kx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Nx=Mx,Px=Nx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $m=65535;function Fx(e,t){var r,n,i,o,a,s;return e>>>=0,t>>>=0,i=e>>>16>>>0,o=t>>>16>>>0,a=(e&$m)>>>0,s=(t&$m)>>>0,r=a*s>>>0,n=i*s+a*o<<16>>>0,r+n>>>0}var jx=Fx;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Bx=jx,Dx=Bx;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _m="function";function Hx(e){return typeof e.get===_m&&typeof e.set===_m}var Wx=Hx;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ux=Wx,zx=Ux;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Sm={float64:Gx,float32:Vx,int32:Kx,int16:Yx,int8:qx,uint32:Xx,uint16:Qx,uint8:Zx,uint8c:Jx,generic:eC,default:tC};function Gx(e,t){return e[t]}function Vx(e,t){return e[t]}function Kx(e,t){return e[t]}function Yx(e,t){return e[t]}function qx(e,t){return e[t]}function Xx(e,t){return e[t]}function Qx(e,t){return e[t]}function Zx(e,t){return e[t]}function Jx(e,t){return e[t]}function eC(e,t){return e[t]}function tC(e,t){return e[t]}function rC(e){var t=Sm[e];return typeof t=="function"?t:Sm.default}var nC=rC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var iC=nC,sd=iC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Em={float64:oC,float32:aC,int32:sC,int16:lC,int8:uC,uint32:cC,uint16:fC,uint8:hC,uint8c:dC,generic:pC,default:mC};function oC(e,t,r){e[t]=r}function aC(e,t,r){e[t]=r}function sC(e,t,r){e[t]=r}function lC(e,t,r){e[t]=r}function uC(e,t,r){e[t]=r}function cC(e,t,r){e[t]=r}function fC(e,t,r){e[t]=r}function hC(e,t,r){e[t]=r}function dC(e,t,r){e[t]=r}function pC(e,t,r){e[t]=r}function mC(e,t,r){e[t]=r}function vC(e){var t=Em[e];return typeof t=="function"?t:Em.default}var gC=vC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yC=gC,wC=yC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Am={complex128:$C,complex64:_C,default:SC};function $C(e,t){return e.get(t)}function _C(e,t){return e.get(t)}function SC(e,t){return e.get(t)}function EC(e){var t=Am[e];return typeof t=="function"?t:Am.default}var AC=EC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OC=AC,ld=OC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Om={complex128:RC,complex64:bC,default:xC};function RC(e,t,r){e.set(r,t)}function bC(e,t,r){e.set(r,t)}function xC(e,t,r){e.set(r,t)}function CC(e){var t=Om[e];return typeof t=="function"?t:Om.default}var TC=CC;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LC=TC,IC=LC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kC={Float32Array:"float32",Float64Array:"float64",Array:"generic",Int16Array:"int16",Int32Array:"int32",Int8Array:"int8",Uint16Array:"uint16",Uint32Array:"uint32",Uint8Array:"uint8",Uint8ClampedArray:"uint8c",Complex64Array:"complex64",Complex128Array:"complex128"},MC=kC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var NC=je,PC=typeof Float64Array=="function";function FC(e){return PC&&e instanceof Float64Array||NC(e)==="[object Float64Array]"}var jC=FC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var BC=jC,DC=BC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HC=typeof Float64Array=="function"?Float64Array:null,WC=HC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var UC=DC,Rm=WC;function zC(){var e,t;if(typeof Rm!="function")return!1;try{t=new Rm([1,3.14,-3.14,NaN]),e=UC(t)&&t[0]===1&&t[1]===3.14&&t[2]===-3.14&&t[3]!==t[3]}catch{e=!1}return e}var GC=zC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VC=GC,Y1=VC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var KC=typeof Float64Array=="function"?Float64Array:void 0,YC=KC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function qC(){throw new Error("not implemented")}var XC=qC;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QC=Y1,ZC=YC,JC=XC,xf;QC()?xf=ZC:xf=JC;var or=xf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eT=je,tT=typeof Float32Array=="function";function rT(e){return tT&&e instanceof Float32Array||eT(e)==="[object Float32Array]"}var nT=rT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var iT=nT,oT=iT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var aT=typeof Float32Array=="function"?Float32Array:null,sT=aT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lT=oT,uT=$r,bm=sT;function cT(){var e,t;if(typeof bm!="function")return!1;try{t=new bm([1,3.14,-3.14,5e40]),e=lT(t)&&t[0]===1&&t[1]===3.140000104904175&&t[2]===-3.140000104904175&&t[3]===uT}catch{e=!1}return e}var fT=cT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hT=fT,dT=hT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pT=typeof Float32Array=="function"?Float32Array:void 0,mT=pT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function vT(){throw new Error("not implemented")}var gT=vT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yT=dT,wT=mT,$T=gT,Cf;yT()?Cf=wT:Cf=$T;var so=Cf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _T=je,ST=typeof Int32Array=="function";function ET(e){return ST&&e instanceof Int32Array||_T(e)==="[object Int32Array]"}var AT=ET;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OT=AT,RT=OT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bT=2147483647,xT=bT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var CT=-2147483648,TT=CT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LT=typeof Int32Array=="function"?Int32Array:null,IT=LT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kT=RT,MT=xT,NT=TT,xm=IT;function PT(){var e,t;if(typeof xm!="function")return!1;try{t=new xm([1,3.14,-3.14,MT+1]),e=kT(t)&&t[0]===1&&t[1]===3&&t[2]===-3&&t[3]===NT}catch{e=!1}return e}var FT=PT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jT=FT,BT=jT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var DT=typeof Int32Array=="function"?Int32Array:void 0,HT=DT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function WT(){throw new Error("not implemented")}var UT=WT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zT=BT,GT=HT,VT=UT,Tf;zT()?Tf=GT:Tf=VT;var ud=Tf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var KT=je,YT=typeof Uint16Array=="function";function qT(e){return YT&&e instanceof Uint16Array||KT(e)==="[object Uint16Array]"}var XT=qT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QT=XT,ZT=QT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JT=65535,eL=JT;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tL=typeof Uint16Array=="function"?Uint16Array:null,rL=tL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nL=ZT,Vu=eL,Cm=rL;function iL(){var e,t;if(typeof Cm!="function")return!1;try{t=[1,3.14,-3.14,Vu+1,Vu+2],t=new Cm(t),e=nL(t)&&t[0]===1&&t[1]===3&&t[2]===Vu-2&&t[3]===0&&t[4]===1}catch{e=!1}return e}var oL=iL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var aL=oL,sL=aL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lL=typeof Uint16Array=="function"?Uint16Array:void 0,uL=lL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function cL(){throw new Error("not implemented")}var fL=cL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hL=sL,dL=uL,pL=fL,Lf;hL()?Lf=dL:Lf=pL;var Vl=Lf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mL=je,vL=typeof Int16Array=="function";function gL(e){return vL&&e instanceof Int16Array||mL(e)==="[object Int16Array]"}var yL=gL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wL=yL,$L=wL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _L=32767,SL=_L;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var EL=-32768,AL=EL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OL=typeof Int16Array=="function"?Int16Array:null,RL=OL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bL=$L,xL=SL,CL=AL,Tm=RL;function TL(){var e,t;if(typeof Tm!="function")return!1;try{t=new Tm([1,3.14,-3.14,xL+1]),e=bL(t)&&t[0]===1&&t[1]===3&&t[2]===-3&&t[3]===CL}catch{e=!1}return e}var LL=TL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var IL=LL,kL=IL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ML=typeof Int16Array=="function"?Int16Array:void 0,NL=ML;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function PL(){throw new Error("not implemented")}var FL=PL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jL=kL,BL=NL,DL=FL,If;jL()?If=BL:If=DL;var cd=If;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HL=je,WL=typeof Uint8Array=="function";function UL(e){return WL&&e instanceof Uint8Array||HL(e)==="[object Uint8Array]"}var zL=UL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var GL=zL,VL=GL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var KL=255,YL=KL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qL=typeof Uint8Array=="function"?Uint8Array:null,XL=qL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QL=VL,Ku=YL,Lm=XL;function ZL(){var e,t;if(typeof Lm!="function")return!1;try{t=[1,3.14,-3.14,Ku+1,Ku+2],t=new Lm(t),e=QL(t)&&t[0]===1&&t[1]===3&&t[2]===Ku-2&&t[3]===0&&t[4]===1}catch{e=!1}return e}var JL=ZL;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eI=JL,tI=eI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rI=typeof Uint8Array=="function"?Uint8Array:void 0,nI=rI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function iI(){throw new Error("not implemented")}var oI=iI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var aI=tI,sI=nI,lI=oI,kf;aI()?kf=sI:kf=lI;var Kl=kf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var uI=je,cI=typeof Uint8ClampedArray=="function";function fI(e){return cI&&e instanceof Uint8ClampedArray||uI(e)==="[object Uint8ClampedArray]"}var hI=fI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dI=hI,pI=dI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mI=typeof Uint8ClampedArray=="function"?Uint8ClampedArray:null,vI=mI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gI=pI,Im=vI;function yI(){var e,t;if(typeof Im!="function")return!1;try{t=new Im([-1,0,1,3.14,4.99,255,256]),e=gI(t)&&t[0]===0&&t[1]===0&&t[2]===1&&t[3]===3&&t[4]===5&&t[5]===255&&t[6]===255}catch{e=!1}return e}var wI=yI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $I=wI,_I=$I;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var SI=typeof Uint8ClampedArray=="function"?Uint8ClampedArray:void 0,EI=SI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function AI(){throw new Error("not implemented")}var OI=AI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var RI=_I,bI=EI,xI=OI,Mf;RI()?Mf=bI:Mf=xI;var fd=Mf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var CI=je,TI=typeof Int8Array=="function";function LI(e){return TI&&e instanceof Int8Array||CI(e)==="[object Int8Array]"}var II=LI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kI=II,MI=kI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var NI=127,PI=NI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var FI=-128,jI=FI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var BI=typeof Int8Array=="function"?Int8Array:null,DI=BI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var HI=MI,WI=PI,UI=jI,km=DI;function zI(){var e,t;if(typeof km!="function")return!1;try{t=new km([1,3.14,-3.14,WI+1]),e=HI(t)&&t[0]===1&&t[1]===3&&t[2]===-3&&t[3]===UI}catch{e=!1}return e}var GI=zI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VI=GI,KI=VI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var YI=typeof Int8Array=="function"?Int8Array:void 0,qI=YI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function XI(){throw new Error("not implemented")}var QI=XI;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ZI=KI,JI=qI,e3=QI,Nf;ZI()?Nf=JI:Nf=e3;var hd=Nf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var t3=ao.isPrimitive;function r3(e){return t3(e)&&e>=0}var q1=r3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var n3=ao.isObject;function i3(e){return n3(e)&&e.valueOf()>=0}var X1=i3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var o3=q1,a3=X1;function s3(e){return o3(e)||a3(e)}var l3=s3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Q1=ce,dd=l3,u3=q1,c3=X1;Q1(dd,"isPrimitive",u3);Q1(dd,"isObject",c3);var Z1=dd;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var f3=4294967295,h3=f3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var d3=En,p3=h3;function m3(e){return typeof e=="object"&&e!==null&&typeof e.length=="number"&&d3(e.length)&&e.length>=0&&e.length<=p3}var v3=m3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var g3=v3,lo=g3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var y3=je,w3=typeof ArrayBuffer=="function";function $3(e){return w3&&e instanceof ArrayBuffer||y3(e)==="[object ArrayBuffer]"}var _3=$3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var S3=_3,J1=S3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function E3(e){return typeof e=="string"}var ew=E3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var A3=String.prototype.valueOf,O3=A3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var R3=O3;function b3(e){try{return R3.call(e),!0}catch{return!1}}var x3=b3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var C3=Hl,T3=je,L3=x3,I3=C3();function k3(e){return typeof e=="object"?e instanceof String?!0:I3?L3(e):T3(e)==="[object String]":!1}var tw=k3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var M3=ew,N3=tw;function P3(e){return M3(e)||N3(e)}var F3=P3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rw=ce,pd=F3,j3=ew,B3=tw;rw(pd,"isPrimitive",j3);rw(pd,"isObject",B3);var Yl=pd;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function D3(){var e=""+this.re;return this.im<0?e+=" - "+-this.im:e+=" + "+this.im,e+="i",e}var H3=D3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function W3(){var e={};return e.type="Complex128",e.re=this.re,e.im=this.im,e}var U3=W3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mm=wr.isPrimitive,Nm=Zn,Aa=ce,Pm=Se,z3=H3,G3=U3;function ei(e,t){if(!(this instanceof ei))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!Mm(e))throw new TypeError(Pm("invalid argument. Real component must be a number. Value: `%s`.",e));if(!Mm(t))throw new TypeError(Pm("invalid argument. Imaginary component must be a number. Value: `%s`.",t));return Nm(this,"re",{configurable:!1,enumerable:!0,writable:!1,value:e}),Nm(this,"im",{configurable:!1,enumerable:!0,writable:!1,value:t}),this}Aa(ei,"BYTES_PER_ELEMENT",8);Aa(ei.prototype,"BYTES_PER_ELEMENT",8);Aa(ei.prototype,"byteLength",16);Aa(ei.prototype,"toString",z3);Aa(ei.prototype,"toJSON",G3);var V3=ei;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var K3=V3,Y3=K3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var q3=typeof Math.fround=="function"?Math.fround:null,X3=q3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Q3=so,Fm=new Q3(1);function Z3(e){return Fm[0]=e,Fm[0]}var J3=Z3;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jm=X3,ek=J3,Pf;typeof jm=="function"?Pf=jm:Pf=ek;var nw=Pf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function tk(){var e=""+this.re;return this.im<0?e+=" - "+-this.im:e+=" + "+this.im,e+="i",e}var rk=tk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function nk(){var e={};return e.type="Complex64",e.re=this.re,e.im=this.im,e}var ik=nk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Bm=wr.isPrimitive,Dm=Zn,Oa=ce,Hm=nw,Wm=Se,ok=rk,ak=ik;function ti(e,t){if(!(this instanceof ti))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!Bm(e))throw new TypeError(Wm("invalid argument. Real component must be a number. Value: `%s`.",e));if(!Bm(t))throw new TypeError(Wm("invalid argument. Imaginary component must be a number. Value: `%s`.",t));return Dm(this,"re",{configurable:!1,enumerable:!0,writable:!1,value:Hm(e)}),Dm(this,"im",{configurable:!1,enumerable:!0,writable:!1,value:Hm(t)}),this}Oa(ti,"BYTES_PER_ELEMENT",4);Oa(ti.prototype,"BYTES_PER_ELEMENT",4);Oa(ti.prototype,"byteLength",8);Oa(ti.prototype,"toString",ok);Oa(ti.prototype,"toJSON",ak);var sk=ti;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lk=sk,uk=lk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ck=Y3,fk=uk;function hk(e){return e instanceof ck||e instanceof fk?!0:typeof e=="object"&&e!==null&&typeof e.re=="number"&&typeof e.im=="number"}var dk=hk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pk=dk,An=pk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mk=En;function vk(e){return mk(e/2)}var gk=vk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yk=gk,md=yk;/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wk=8;function $k(e){return typeof e=="object"&&e!==null&&e.constructor.name==="Complex64Array"&&e.BYTES_PER_ELEMENT===wk}var _k=$k;/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Sk=_k,iw=Sk;/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ek=16;function Ak(e){return typeof e=="object"&&e!==null&&e.constructor.name==="Complex128Array"&&e.BYTES_PER_ELEMENT===Ek}var Ok=Ak;/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Rk=Ok,ow=Rk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bk=Hr,ns=b1;function xk(){return typeof ns=="function"&&typeof ns("foo")=="symbol"&&bk(ns,"iterator")&&typeof ns.iterator=="symbol"}var Ck=xk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Tk=Ck,vd=Tk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lk=vd,Ik=Lk()?Symbol.iterator:null,kk=Ik;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mk=kk,aw=Mk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Nk(){var e=""+this.re;return this.im<0?e+=" - "+-this.im:e+=" + "+this.im,e+="i",e}var Pk=Nk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Fk(){var e={};return e.type="Complex64",e.re=this.re,e.im=this.im,e}var jk=Fk;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Um=wr.isPrimitive,zm=Zn,Ra=ce,Gm=nw,Vm=Se,Bk=Pk,Dk=jk;function ri(e,t){if(!(this instanceof ri))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!Um(e))throw new TypeError(Vm("invalid argument. Real component must be a number. Value: `%s`.",e));if(!Um(t))throw new TypeError(Vm("invalid argument. Imaginary component must be a number. Value: `%s`.",t));return zm(this,"re",{configurable:!1,enumerable:!0,writable:!1,value:Gm(e)}),zm(this,"im",{configurable:!1,enumerable:!0,writable:!1,value:Gm(t)}),this}Ra(ri,"BYTES_PER_ELEMENT",4);Ra(ri.prototype,"BYTES_PER_ELEMENT",4);Ra(ri.prototype,"byteLength",8);Ra(ri.prototype,"toString",Bk);Ra(ri.prototype,"toJSON",Dk);var Hk=ri;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Wk=Hk,Uk=Wk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function zk(e){return e.re}var Gk=zk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Vk=Gk,ql=Vk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Kk(e){return e.im}var Yk=Kk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qk=Yk,Xl=qk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xk=so;function Qk(e,t){return new Xk(e.buffer,e.byteOffset+e.BYTES_PER_ELEMENT*t,2*(e.length-t))}var Zk=Qk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jk=Zk,gd=Jk;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eM=or;function tM(e,t){return new eM(e.buffer,e.byteOffset+e.BYTES_PER_ELEMENT*t,2*(e.length-t))}var rM=tM;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nM=rM,yd=nM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var iM=lo,oM=An,aM=ql,sM=Xl,lM=Se;function uM(e){var t,r,n;for(t=[];r=e.next(),!r.done;)if(n=r.value,iM(n)&&n.length>=2)t.push(n[0],n[1]);else if(oM(n))t.push(aM(n),sM(n));else return new TypeError(lM("invalid argument. An iterator must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",n));return t}var cM=uM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fM=lo,hM=An,dM=ql,pM=Xl,mM=Se;function vM(e,t,r){var n,i,o,a;for(n=[],a=-1;i=e.next(),!i.done;)if(a+=1,o=t.call(r,i.value,a),fM(o)&&o.length>=2)n.push(o[0],o[1]);else if(hM(o))n.push(dM(o),pM(o));else return new TypeError(mM("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",o));return n}var gM=vM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yM=An,wM=ql,$M=Xl;function _M(e,t){var r,n,i,o;for(r=t.length,o=0,i=0;i<r;i++){if(n=t[i],!yM(n))return null;e[o]=wM(n),e[o+1]=$M(n),o+=2}return e}var SM=_M,Vo=Z1.isPrimitive,Ff=lo,wd=Gl,Km=J1,sw=Qh,EM=no,AM=Yl.isPrimitive,Ue=Sn,zt=An,ml=md,yt=En,OM=iw,RM=ow,bM=vd,Vi=aw,K=ce,Ql=Sa,Pt=so,lw=Uk,P=Se,mr=ql,vr=Xl,xM=oo,CM=gd,TM=yd,LM=sd,IM=ld,uw=cM,kM=gM,MM=SM,Rt=Pt.BYTES_PER_ELEMENT*2,cw=bM();function ne(e){return e instanceof H||typeof e=="object"&&e!==null&&(e.constructor.name==="Complex64Array"||e.constructor.name==="Complex128Array")&&typeof e._length=="number"&&typeof e._buffer=="object"}function fw(e){return e===H||e.name==="Complex128Array"}function ot(e,t){return t*=2,new lw(e[t],e[t+1])}function H(){var e,t,r,n;if(t=arguments.length,!(this instanceof H))return t===0?new H:t===1?new H(arguments[0]):t===2?new H(arguments[0],arguments[1]):new H(arguments[0],arguments[1],arguments[2]);if(t===0)r=new Pt(0);else if(t===1)if(Vo(arguments[0]))r=new Pt(arguments[0]*2);else if(wd(arguments[0]))if(r=arguments[0],n=r.length,n&&EM(r)&&zt(r[0])){if(r=MM(new Pt(n*2),r),r===null){if(!ml(n))throw new RangeError(P("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",n));r=new Pt(arguments[0])}}else{if(OM(r))r=CM(r,0);else if(RM(r))r=TM(r,0);else if(!ml(n))throw new RangeError(P("invalid argument. Array-like object and typed array arguments must have a length which is a multiple of two. Length: `%u`.",n));r=new Pt(r)}else if(Km(arguments[0])){if(r=arguments[0],!yt(r.byteLength/Rt))throw new RangeError(P("invalid argument. ArrayBuffer byte length must be a multiple of %u. Byte length: `%u`.",Rt,r.byteLength));r=new Pt(r)}else if(sw(arguments[0])){if(r=arguments[0],cw===!1)throw new TypeError(P("invalid argument. Environment lacks Symbol.iterator support. Must provide a length, ArrayBuffer, typed array, or array-like object. Value: `%s`.",r));if(!Ue(r[Vi]))throw new TypeError(P("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",r));if(r=r[Vi](),!Ue(r.next))throw new TypeError(P("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",r));if(r=uw(r),r instanceof Error)throw r;r=new Pt(r)}else throw new TypeError(P("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",arguments[0]));else{if(r=arguments[0],!Km(r))throw new TypeError(P("invalid argument. First argument must be an ArrayBuffer. Value: `%s`.",r));if(e=arguments[1],!Vo(e))throw new TypeError(P("invalid argument. Byte offset must be a nonnegative integer. Value: `%s`.",e));if(!yt(e/Rt))throw new RangeError(P("invalid argument. Byte offset must be a multiple of %u. Value: `%u`.",Rt,e));if(t===2){if(n=r.byteLength-e,!yt(n/Rt))throw new RangeError(P("invalid arguments. ArrayBuffer view byte length must be a multiple of %u. View byte length: `%u`.",Rt,n));r=new Pt(r,e)}else{if(n=arguments[2],!Vo(n))throw new TypeError(P("invalid argument. Length must be a nonnegative integer. Value: `%s`.",n));if(n*Rt>r.byteLength-e)throw new RangeError(P("invalid arguments. ArrayBuffer has insufficient capacity. Either decrease the array length or provide a bigger buffer. Minimum capacity: `%u`.",n*Rt));r=new Pt(r,e,n*2)}}return K(this,"_buffer",r),K(this,"_length",r.length/2),this}K(H,"BYTES_PER_ELEMENT",Rt);K(H,"name","Complex64Array");K(H,"from",function(t){var r,n,i,o,a,s,l,u,c,f,h,d;if(!Ue(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!fw(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(n=arguments.length,n>1){if(i=arguments[1],!Ue(i))throw new TypeError(P("invalid argument. Second argument must be a function. Value: `%s`.",i));n>2&&(r=arguments[2])}if(ne(t)){if(u=t.length,i){for(o=new this(u),a=o._buffer,d=0,h=0;h<u;h++){if(f=i.call(r,t.get(h),h),zt(f))a[d]=mr(f),a[d+1]=vr(f);else if(Ff(f)&&f.length>=2)a[d]=f[0],a[d+1]=f[1];else throw new TypeError(P("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",f));d+=2}return o}return new this(t)}if(wd(t)){if(i){for(u=t.length,t.get&&t.set?l=IM("default"):l=LM("default"),h=0;h<u;h++)if(!zt(l(t,h))){c=!0;break}if(c){if(!ml(u))throw new RangeError(P("invalid argument. First argument must have a length which is a multiple of %u. Length: `%u`.",2,u));for(o=new this(u/2),a=o._buffer,h=0;h<u;h++)a[h]=i.call(r,l(t,h),h);return o}for(o=new this(u),a=o._buffer,d=0,h=0;h<u;h++){if(f=i.call(r,l(t,h),h),zt(f))a[d]=mr(f),a[d+1]=vr(f);else if(Ff(f)&&f.length>=2)a[d]=f[0],a[d+1]=f[1];else throw new TypeError(P("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",f));d+=2}return o}return new this(t)}if(sw(t)&&cw&&Ue(t[Vi])){if(a=t[Vi](),!Ue(a.next))throw new TypeError(P("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",t));if(i?s=kM(a,i,r):s=uw(a),s instanceof Error)throw s;for(u=s.length/2,o=new this(u),a=o._buffer,h=0;h<u;h++)a[h]=s[h];return o}throw new TypeError(P("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",t))});K(H,"of",function(){var t,r;if(!Ue(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!fw(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(t=[],r=0;r<arguments.length;r++)t.push(arguments[r]);return new this(t)});K(H.prototype,"at",function(t){if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!yt(t))throw new TypeError(P("invalid argument. Must provide an integer. Value: `%s`.",t));if(t<0&&(t+=this._length),!(t<0||t>=this._length))return ot(this._buffer,t)});Ql(H.prototype,"buffer",function(){return this._buffer.buffer});Ql(H.prototype,"byteLength",function(){return this._buffer.byteLength});Ql(H.prototype,"byteOffset",function(){return this._buffer.byteOffset});K(H.prototype,"BYTES_PER_ELEMENT",H.BYTES_PER_ELEMENT);K(H.prototype,"copyWithin",function(t,r){if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return arguments.length===2?this._buffer.copyWithin(t*2,r*2):this._buffer.copyWithin(t*2,r*2,arguments[2]*2),this});K(H.prototype,"entries",function(){var t,r,n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return r=this,t=this._buffer,i=this._length,a=-1,s=-2,n={},K(n,"next",l),K(n,"return",u),Vi&&K(n,Vi,c),n;function l(){var f;return a+=1,o||a>=i?{done:!0}:(s+=2,f=new lw(t[s],t[s+1]),{value:[a,f],done:!1})}function u(f){return o=!0,arguments.length?{value:f,done:!0}:{done:!0}}function c(){return r.entries()}});K(H.prototype,"every",function(t,r){var n,i;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(!t.call(r,ot(n,i),i,this))return!1;return!0});K(H.prototype,"fill",function(t,r,n){var i,o,a,s,l,u;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!zt(t))throw new TypeError(P("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(i=this._buffer,o=this._length,arguments.length>1){if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));if(r<0&&(r+=o,r<0&&(r=0)),arguments.length>2){if(!yt(n))throw new TypeError(P("invalid argument. Third argument must be an integer. Value: `%s`.",n));n<0&&(n+=o,n<0&&(n=0)),n>o&&(n=o)}else n=o}else r=0,n=o;for(s=mr(t),l=vr(t),u=r;u<n;u++)a=2*u,i[a]=s,i[a+1]=l;return this});K(H.prototype,"filter",function(t,r){var n,i,o,a;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=[],o=0;o<this._length;o++)a=ot(n,o),t.call(r,a,o,this)&&i.push(a);return new this.constructor(i)});K(H.prototype,"find",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(o=ot(n,i),t.call(r,o,i,this))return o});K(H.prototype,"findIndex",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(o=ot(n,i),t.call(r,o,i,this))return i;return-1});K(H.prototype,"findLast",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=this._length-1;i>=0;i--)if(o=ot(n,i),t.call(r,o,i,this))return o});K(H.prototype,"findLastIndex",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=this._length-1;i>=0;i--)if(o=ot(n,i),t.call(r,o,i,this))return i;return-1});K(H.prototype,"forEach",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)o=ot(n,i),t.call(r,o,i,this)});K(H.prototype,"get",function(t){if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Vo(t))throw new TypeError(P("invalid argument. Must provide a nonnegative integer. Value: `%s`.",t));if(!(t>=this._length))return ot(this._buffer,t)});K(H.prototype,"includes",function(t,r){var n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!zt(t))throw new TypeError(P("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0&&(r+=this._length,r<0&&(r=0))}else r=0;for(o=mr(t),a=vr(t),n=this._buffer,s=r;s<this._length;s++)if(i=2*s,o===n[i]&&a===n[i+1])return!0;return!1});K(H.prototype,"indexOf",function(t,r){var n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!zt(t))throw new TypeError(P("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0&&(r+=this._length,r<0&&(r=0))}else r=0;for(o=mr(t),a=vr(t),n=this._buffer,s=r;s<this._length;s++)if(i=2*s,o===n[i]&&a===n[i+1])return s;return-1});K(H.prototype,"join",function(t){var r,n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)i=",";else if(AM(t))i=t;else throw new TypeError(P("invalid argument. First argument must be a string. Value: `%s`.",t));for(r=[],n=this._buffer,o=0;o<this._length;o++)r.push(ot(n,o).toString());return r.join(i)});K(H.prototype,"lastIndexOf",function(t,r){var n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!zt(t))throw new TypeError(P("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));r>=this._length?r=this._length-1:r<0&&(r+=this._length)}else r=this._length-1;for(o=mr(t),a=vr(t),n=this._buffer,s=r;s>=0;s--)if(i=2*s,o===n[i]&&a===n[i+1])return s;return-1});Ql(H.prototype,"length",function(){return this._length});K(H.prototype,"map",function(t,r){var n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(i=this._buffer,o=new this.constructor(this._length),n=o._buffer,a=0;a<this._length;a++)if(s=t.call(r,ot(i,a),a,this),zt(s))n[2*a]=mr(s),n[2*a+1]=vr(s);else if(Ff(s)&&s.length===2)n[2*a]=s[0],n[2*a+1]=s[1];else throw new TypeError(P("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",s));return o});K(H.prototype,"reduce",function(t,r){var n,i,o,a,s;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));if(n=this._buffer,o=this._length,arguments.length>1)i=r,s=0;else{if(o===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");i=ot(n,0),s=1}for(;s<o;s++)a=ot(n,s),i=t(i,a,s,this);return i});K(H.prototype,"reverse",function(){var t,r,n,i,o,a;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(n=this._length,t=this._buffer,i=xM(n/2),o=0;o<i;o++)a=n-o-1,r=t[2*o],t[2*o]=t[2*a],t[2*a]=r,r=t[2*o+1],t[2*o+1]=t[2*a+1],t[2*a+1]=r;return this});K(H.prototype,"set",function(t){var r,n,i,o,a,s,l,u,c;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=this._buffer,arguments.length>1){if(n=arguments[1],!Vo(n))throw new TypeError(P("invalid argument. Index argument must be a nonnegative integer. Value: `%s`.",n))}else n=0;if(zt(t)){if(n>=this._length)throw new RangeError(P("invalid argument. Index argument is out-of-bounds. Value: `%u`.",n));n*=2,i[n]=mr(t),i[n+1]=vr(t);return}if(ne(t)){if(s=t._length,n+s>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(r=t._buffer,c=i.byteOffset+n*Rt,r.buffer===i.buffer&&r.byteOffset<c&&r.byteOffset+r.byteLength>c){for(o=new Pt(r.length),u=0;u<r.length;u++)o[u]=r[u];r=o}for(n*=2,c=0,u=0;u<s;u++)i[n]=r[c],i[n+1]=r[c+1],n+=2,c+=2;return}if(wd(t)){for(s=t.length,u=0;u<s;u++)if(!zt(t[u])){a=!0;break}if(a){if(!ml(s))throw new RangeError(P("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",s));if(n+s/2>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(r=t,c=i.byteOffset+n*Rt,r.buffer===i.buffer&&r.byteOffset<c&&r.byteOffset+r.byteLength>c){for(o=new Pt(s),u=0;u<s;u++)o[u]=r[u];r=o}for(n*=2,s/=2,c=0,u=0;u<s;u++)i[n]=r[c],i[n+1]=r[c+1],n+=2,c+=2;return}if(n+s>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");for(n*=2,u=0;u<s;u++)l=t[u],i[n]=mr(l),i[n+1]=vr(l),n+=2;return}throw new TypeError(P("invalid argument. First argument must be either a complex number, an array-like object, or a complex number array. Value: `%s`.",t))});K(H.prototype,"slice",function(t,r){var n,i,o,a,s,l,u;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(s=this._buffer,l=this._length,arguments.length===0)t=0,r=l;else{if(!yt(t))throw new TypeError(P("invalid argument. First argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=l,t<0&&(t=0)),arguments.length===1)r=l;else{if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0?(r+=l,r<0&&(r=0)):r>l&&(r=l)}}for(t<r?n=r-t:n=0,o=new this.constructor(n),i=o._buffer,u=0;u<n;u++)a=2*(u+t),i[2*u]=s[a],i[2*u+1]=s[a+1];return o});K(H.prototype,"some",function(t,r){var n,i;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ue(t))throw new TypeError(P("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(t.call(r,ot(n,i),i,this))return!0;return!1});K(H.prototype,"subarray",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=this._buffer,o=this._length,arguments.length===0)t=0,r=o;else{if(!yt(t))throw new TypeError(P("invalid argument. First argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=o,t<0&&(t=0)),arguments.length===1)r=o;else{if(!yt(r))throw new TypeError(P("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0?(r+=o,r<0&&(r=0)):r>o&&(r=o)}}return t>=o?(o=0,n=i.byteLength):t>=r?(o=0,n=i.byteOffset+t*Rt):(o=r-t,n=i.byteOffset+t*Rt),new this.constructor(i.buffer,n,o<0?0:o)});K(H.prototype,"toReversed",function(){var t,r,n,i,o,a;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(n=this._length,r=new this.constructor(n),i=this._buffer,t=r._buffer,o=0;o<n;o++)a=n-o-1,t[2*o]=i[2*a],t[2*o+1]=i[2*a+1];return r});K(H.prototype,"toString",function(){var t,r,n;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(t=[],r=this._buffer,n=0;n<this._length;n++)t.push(ot(r,n).toString());return t.join(",")});K(H.prototype,"with",function(t,r){var n,i,o;if(!ne(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!yt(t))throw new TypeError(P("invalid argument. First argument must be an integer. Value: `%s`.",t));if(o=this._length,t<0&&(t+=o),t<0||t>=o)throw new RangeError(P("invalid argument. Index argument is out-of-bounds. Value: `%s`.",t));if(!zt(r))throw new TypeError(P("invalid argument. Second argument must be a complex number. Value: `%s`.",r));return i=new this.constructor(this._buffer),n=i._buffer,n[2*t]=mr(r),n[2*t+1]=vr(r),i});var NM=H;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var PM=NM,$d=PM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function FM(){var e=""+this.re;return this.im<0?e+=" - "+-this.im:e+=" + "+this.im,e+="i",e}var jM=FM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function BM(){var e={};return e.type="Complex128",e.re=this.re,e.im=this.im,e}var DM=BM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ym=wr.isPrimitive,qm=Zn,ba=ce,Xm=Se,HM=jM,WM=DM;function ni(e,t){if(!(this instanceof ni))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!Ym(e))throw new TypeError(Xm("invalid argument. Real component must be a number. Value: `%s`.",e));if(!Ym(t))throw new TypeError(Xm("invalid argument. Imaginary component must be a number. Value: `%s`.",t));return qm(this,"re",{configurable:!1,enumerable:!0,writable:!1,value:e}),qm(this,"im",{configurable:!1,enumerable:!0,writable:!1,value:t}),this}ba(ni,"BYTES_PER_ELEMENT",8);ba(ni.prototype,"BYTES_PER_ELEMENT",8);ba(ni.prototype,"byteLength",16);ba(ni.prototype,"toString",HM);ba(ni.prototype,"toJSON",WM);var UM=ni;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zM=UM,GM=zM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function VM(e){return e.re}var KM=VM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var YM=KM,Zl=YM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function qM(e){return e.im}var XM=qM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var QM=XM,Jl=QM;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ZM=lo,JM=An,eN=Se,tN=Zl,rN=Jl;function nN(e){var t,r,n;for(t=[];r=e.next(),!r.done;)if(n=r.value,ZM(n)&&n.length>=2)t.push(n[0],n[1]);else if(JM(n))t.push(tN(n),rN(n));else return new TypeError(eN("invalid argument. An iterator must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",n));return t}var iN=nN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var oN=lo,aN=An,sN=Se,lN=Zl,uN=Jl;function cN(e,t,r){var n,i,o,a;for(n=[],a=-1;i=e.next(),!i.done;)if(a+=1,o=t.call(r,i.value,a),oN(o)&&o.length>=2)n.push(o[0],o[1]);else if(aN(o))n.push(lN(o),uN(o));else return new TypeError(sN("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",o));return n}var fN=cN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hN=An,dN=Zl,pN=Jl;function mN(e,t){var r,n,i,o;for(r=t.length,o=0,i=0;i<r;i++){if(n=t[i],!hN(n))return null;e[o]=dN(n),e[o+1]=pN(n),o+=2}return e}var vN=mN,Ko=Z1.isPrimitive,jf=lo,_d=Gl,Qm=J1,hw=Qh,gN=no,yN=Yl,ze=Sn,Gt=An,vl=md,wt=En,wN=iw,$N=ow,_N=vd,Ki=aw,Y=ce,eu=Sa,Ft=or,dw=GM,gr=Zl,yr=Jl,SN=oo,EN=gd,AN=yd,ON=sd,RN=ld,F=Se,pw=iN,bN=fN,xN=vN,bt=Ft.BYTES_PER_ELEMENT*2,mw=_N();function ie(e){return e instanceof W||typeof e=="object"&&e!==null&&(e.constructor.name==="Complex64Array"||e.constructor.name==="Complex128Array")&&typeof e._length=="number"&&typeof e._buffer=="object"}function vw(e){return e===W||e.name==="Complex64Array"}function at(e,t){return t*=2,new dw(e[t],e[t+1])}function W(){var e,t,r,n;if(t=arguments.length,!(this instanceof W))return t===0?new W:t===1?new W(arguments[0]):t===2?new W(arguments[0],arguments[1]):new W(arguments[0],arguments[1],arguments[2]);if(t===0)r=new Ft(0);else if(t===1)if(Ko(arguments[0]))r=new Ft(arguments[0]*2);else if(_d(arguments[0]))if(r=arguments[0],n=r.length,n&&gN(r)&&Gt(r[0])){if(r=xN(new Ft(n*2),r),r===null){if(!vl(n))throw new RangeError(F("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",n));r=new Ft(arguments[0])}}else{if(wN(r))r=EN(r,0);else if($N(r))r=AN(r,0);else if(!vl(n))throw new RangeError(F("invalid argument. Array-like object and typed array arguments must have a length which is a multiple of two. Length: `%u`.",n));r=new Ft(r)}else if(Qm(arguments[0])){if(r=arguments[0],!wt(r.byteLength/bt))throw new RangeError(F("invalid argument. ArrayBuffer byte length must be a multiple of %u. Byte length: `%u`.",bt,r.byteLength));r=new Ft(r)}else if(hw(arguments[0])){if(r=arguments[0],mw===!1)throw new TypeError(F("invalid argument. Environment lacks Symbol.iterator support. Must provide a length, ArrayBuffer, typed array, or array-like object. Value: `%s`.",r));if(!ze(r[Ki]))throw new TypeError(F("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",r));if(r=r[Ki](),!ze(r.next))throw new TypeError(F("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",r));if(r=pw(r),r instanceof Error)throw r;r=new Ft(r)}else throw new TypeError(F("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",arguments[0]));else{if(r=arguments[0],!Qm(r))throw new TypeError(F("invalid argument. First argument must be an ArrayBuffer. Value: `%s`.",r));if(e=arguments[1],!Ko(e))throw new TypeError(F("invalid argument. Byte offset must be a nonnegative integer. Value: `%s`.",e));if(!wt(e/bt))throw new RangeError(F("invalid argument. Byte offset must be a multiple of %u. Value: `%u`.",bt,e));if(t===2){if(n=r.byteLength-e,!wt(n/bt))throw new RangeError(F("invalid arguments. ArrayBuffer view byte length must be a multiple of %u. View byte length: `%u`.",bt,n));r=new Ft(r,e)}else{if(n=arguments[2],!Ko(n))throw new TypeError(F("invalid argument. Length must be a nonnegative integer. Value: `%s`.",n));if(n*bt>r.byteLength-e)throw new RangeError(F("invalid arguments. ArrayBuffer has insufficient capacity. Either decrease the array length or provide a bigger buffer. Minimum capacity: `%u`.",n*bt));r=new Ft(r,e,n*2)}}return Y(this,"_buffer",r),Y(this,"_length",r.length/2),this}Y(W,"BYTES_PER_ELEMENT",bt);Y(W,"name","Complex128Array");Y(W,"from",function(t){var r,n,i,o,a,s,l,u,c,f,h,d;if(!ze(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!vw(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(n=arguments.length,n>1){if(i=arguments[1],!ze(i))throw new TypeError(F("invalid argument. Second argument must be a function. Value: `%s`.",i));n>2&&(r=arguments[2])}if(ie(t)){if(u=t.length,i){for(o=new this(u),a=o._buffer,d=0,h=0;h<u;h++){if(f=i.call(r,t.get(h),h),Gt(f))a[d]=gr(f),a[d+1]=yr(f);else if(jf(f)&&f.length>=2)a[d]=f[0],a[d+1]=f[1];else throw new TypeError(F("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",f));d+=2}return o}return new this(t)}if(_d(t)){if(i){for(u=t.length,t.get&&t.set?l=RN("default"):l=ON("default"),h=0;h<u;h++)if(!Gt(l(t,h))){c=!0;break}if(c){if(!vl(u))throw new RangeError(F("invalid argument. First argument must have a length which is a multiple of two. Length: `%u`.",u));for(o=new this(u/2),a=o._buffer,h=0;h<u;h++)a[h]=i.call(r,l(t,h),h);return o}for(o=new this(u),a=o._buffer,d=0,h=0;h<u;h++){if(f=i.call(r,l(t,h),h),Gt(f))a[d]=gr(f),a[d+1]=yr(f);else if(jf(f)&&f.length>=2)a[d]=f[0],a[d+1]=f[1];else throw new TypeError(F("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",f));d+=2}return o}return new this(t)}if(hw(t)&&mw&&ze(t[Ki])){if(a=t[Ki](),!ze(a.next))throw new TypeError(F("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",t));if(i?s=bN(a,i,r):s=pw(a),s instanceof Error)throw s;for(u=s.length/2,o=new this(u),a=o._buffer,h=0;h<u;h++)a[h]=s[h];return o}throw new TypeError(F("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",t))});Y(W,"of",function(){var t,r;if(!ze(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!vw(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(t=[],r=0;r<arguments.length;r++)t.push(arguments[r]);return new this(t)});Y(W.prototype,"at",function(t){if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!wt(t))throw new TypeError(F("invalid argument. Must provide an integer. Value: `%s`.",t));if(t<0&&(t+=this._length),!(t<0||t>=this._length))return at(this._buffer,t)});eu(W.prototype,"buffer",function(){return this._buffer.buffer});eu(W.prototype,"byteLength",function(){return this._buffer.byteLength});eu(W.prototype,"byteOffset",function(){return this._buffer.byteOffset});Y(W.prototype,"BYTES_PER_ELEMENT",W.BYTES_PER_ELEMENT);Y(W.prototype,"copyWithin",function(t,r){if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return arguments.length===2?this._buffer.copyWithin(t*2,r*2):this._buffer.copyWithin(t*2,r*2,arguments[2]*2),this});Y(W.prototype,"entries",function(){var t,r,n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return r=this,t=this._buffer,i=this._length,a=-1,s=-2,n={},Y(n,"next",l),Y(n,"return",u),Ki&&Y(n,Ki,c),n;function l(){var f;return a+=1,o||a>=i?{done:!0}:(s+=2,f=new dw(t[s],t[s+1]),{value:[a,f],done:!1})}function u(f){return o=!0,arguments.length?{value:f,done:!0}:{done:!0}}function c(){return r.entries()}});Y(W.prototype,"every",function(t,r){var n,i;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(!t.call(r,at(n,i),i,this))return!1;return!0});Y(W.prototype,"fill",function(t,r,n){var i,o,a,s,l,u;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Gt(t))throw new TypeError(F("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(i=this._buffer,o=this._length,arguments.length>1){if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));if(r<0&&(r+=o,r<0&&(r=0)),arguments.length>2){if(!wt(n))throw new TypeError(F("invalid argument. Third argument must be an integer. Value: `%s`.",n));n<0&&(n+=o,n<0&&(n=0)),n>o&&(n=o)}else n=o}else r=0,n=o;for(s=gr(t),l=yr(t),u=r;u<n;u++)a=2*u,i[a]=s,i[a+1]=l;return this});Y(W.prototype,"filter",function(t,r){var n,i,o,a;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=[],o=0;o<this._length;o++)a=at(n,o),t.call(r,a,o,this)&&i.push(a);return new this.constructor(i)});Y(W.prototype,"find",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(o=at(n,i),t.call(r,o,i,this))return o});Y(W.prototype,"findIndex",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(o=at(n,i),t.call(r,o,i,this))return i;return-1});Y(W.prototype,"findLast",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=this._length-1;i>=0;i--)if(o=at(n,i),t.call(r,o,i,this))return o});Y(W.prototype,"findLastIndex",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=this._length-1;i>=0;i--)if(o=at(n,i),t.call(r,o,i,this))return i;return-1});Y(W.prototype,"forEach",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)o=at(n,i),t.call(r,o,i,this)});Y(W.prototype,"get",function(t){if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ko(t))throw new TypeError(F("invalid argument. Must provide a nonnegative integer. Value: `%s`.",t));if(!(t>=this._length))return at(this._buffer,t)});eu(W.prototype,"length",function(){return this._length});Y(W.prototype,"includes",function(t,r){var n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Gt(t))throw new TypeError(F("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0&&(r+=this._length,r<0&&(r=0))}else r=0;for(o=gr(t),a=yr(t),n=this._buffer,s=r;s<this._length;s++)if(i=2*s,o===n[i]&&a===n[i+1])return!0;return!1});Y(W.prototype,"indexOf",function(t,r){var n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Gt(t))throw new TypeError(F("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0&&(r+=this._length,r<0&&(r=0))}else r=0;for(o=gr(t),a=yr(t),n=this._buffer,s=r;s<this._length;s++)if(i=2*s,o===n[i]&&a===n[i+1])return s;return-1});Y(W.prototype,"join",function(t){var r,n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)i=",";else if(yN(t))i=t;else throw new TypeError(F("invalid argument. First argument must be a string. Value: `%s`.",t));for(r=[],n=this._buffer,o=0;o<this._length;o++)r.push(at(n,o).toString());return r.join(i)});Y(W.prototype,"lastIndexOf",function(t,r){var n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Gt(t))throw new TypeError(F("invalid argument. First argument must be a complex number. Value: `%s`.",t));if(arguments.length>1){if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));r>=this._length?r=this._length-1:r<0&&(r+=this._length)}else r=this._length-1;for(o=gr(t),a=yr(t),n=this._buffer,s=r;s>=0;s--)if(i=2*s,o===n[i]&&a===n[i+1])return s;return-1});Y(W.prototype,"map",function(t,r){var n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(i=this._buffer,o=new this.constructor(this._length),n=o._buffer,a=0;a<this._length;a++)if(s=t.call(r,at(i,a),a,this),Gt(s))n[2*a]=gr(s),n[2*a+1]=yr(s);else if(jf(s)&&s.length===2)n[2*a]=s[0],n[2*a+1]=s[1];else throw new TypeError(F("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",s));return o});Y(W.prototype,"reduce",function(t,r){var n,i,o,a,s;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));if(n=this._buffer,o=this._length,arguments.length>1)i=r,s=0;else{if(o===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");i=at(n,0),s=1}for(;s<o;s++)a=at(n,s),i=t(i,a,s,this);return i});Y(W.prototype,"reverse",function(){var t,r,n,i,o,a;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(n=this._length,t=this._buffer,i=SN(n/2),o=0;o<i;o++)a=n-o-1,r=t[2*o],t[2*o]=t[2*a],t[2*a]=r,r=t[2*o+1],t[2*o+1]=t[2*a+1],t[2*a+1]=r;return this});Y(W.prototype,"set",function(t){var r,n,i,o,a,s,l,u,c;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=this._buffer,arguments.length>1){if(n=arguments[1],!Ko(n))throw new TypeError(F("invalid argument. Index argument must be a nonnegative integer. Value: `%s`.",n))}else n=0;if(Gt(t)){if(n>=this._length)throw new RangeError(F("invalid argument. Index argument is out-of-bounds. Value: `%u`.",n));n*=2,i[n]=gr(t),i[n+1]=yr(t);return}if(ie(t)){if(s=t._length,n+s>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(r=t._buffer,c=i.byteOffset+n*bt,r.buffer===i.buffer&&r.byteOffset<c&&r.byteOffset+r.byteLength>c){for(o=new Ft(r.length),u=0;u<r.length;u++)o[u]=r[u];r=o}for(n*=2,c=0,u=0;u<s;u++)i[n]=r[c],i[n+1]=r[c+1],n+=2,c+=2;return}if(_d(t)){for(s=t.length,u=0;u<s;u++)if(!Gt(t[u])){a=!0;break}if(a){if(!vl(s))throw new RangeError(F("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",s));if(n+s/2>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(r=t,c=i.byteOffset+n*bt,r.buffer===i.buffer&&r.byteOffset<c&&r.byteOffset+r.byteLength>c){for(o=new Ft(s),u=0;u<s;u++)o[u]=r[u];r=o}for(n*=2,s/=2,c=0,u=0;u<s;u++)i[n]=r[c],i[n+1]=r[c+1],n+=2,c+=2;return}if(n+s>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");for(n*=2,u=0;u<s;u++)l=t[u],i[n]=gr(l),i[n+1]=yr(l),n+=2;return}throw new TypeError(F("invalid argument. First argument must be either a complex number, an array-like object, or a complex number array. Value: `%s`.",t))});Y(W.prototype,"slice",function(t,r){var n,i,o,a,s,l,u;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(s=this._buffer,l=this._length,arguments.length===0)t=0,r=l;else{if(!wt(t))throw new TypeError(F("invalid argument. First argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=l,t<0&&(t=0)),arguments.length===1)r=l;else{if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0?(r+=l,r<0&&(r=0)):r>l&&(r=l)}}for(t<r?n=r-t:n=0,o=new this.constructor(n),i=o._buffer,u=0;u<n;u++)a=2*(u+t),i[2*u]=s[a],i[2*u+1]=s[a+1];return o});Y(W.prototype,"some",function(t,r){var n,i;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!ze(t))throw new TypeError(F("invalid argument. First argument must be a function. Value: `%s`.",t));for(n=this._buffer,i=0;i<this._length;i++)if(t.call(r,at(n,i),i,this))return!0;return!1});Y(W.prototype,"subarray",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=this._buffer,o=this._length,arguments.length===0)t=0,r=o;else{if(!wt(t))throw new TypeError(F("invalid argument. First argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=o,t<0&&(t=0)),arguments.length===1)r=o;else{if(!wt(r))throw new TypeError(F("invalid argument. Second argument must be an integer. Value: `%s`.",r));r<0?(r+=o,r<0&&(r=0)):r>o&&(r=o)}}return t>=o?(o=0,n=i.byteLength):t>=r?(o=0,n=i.byteOffset+t*bt):(o=r-t,n=i.byteOffset+t*bt),new this.constructor(i.buffer,n,o<0?0:o)});Y(W.prototype,"toReversed",function(){var t,r,n,i,o,a;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(n=this._length,r=new this.constructor(n),i=this._buffer,t=r._buffer,o=0;o<n;o++)a=n-o-1,t[2*o]=i[2*a],t[2*o+1]=i[2*a+1];return r});Y(W.prototype,"toString",function(){var t,r,n;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(t=[],r=this._buffer,n=0;n<this._length;n++)t.push(at(r,n).toString());return t.join(",")});Y(W.prototype,"with",function(t,r){var n,i,o;if(!ie(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!wt(t))throw new TypeError(F("invalid argument. First argument must be an integer. Value: `%s`.",t));if(o=this._length,t<0&&(t+=o),t<0||t>=o)throw new RangeError(F("invalid argument. Index argument is out-of-bounds. Value: `%s`.",t));if(!Gt(r))throw new TypeError(F("invalid argument. Second argument must be a complex number. Value: `%s`.",r));return i=new this.constructor(this._buffer),n=i._buffer,n[2*t]=gr(r),n[2*t+1]=yr(r),i});var CN=W;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TN=CN,Sd=TN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LN=or,IN=so,kN=_r,MN=ud,NN=Vl,PN=cd,FN=Kl,jN=fd,BN=hd,DN=$d,HN=Sd,WN=[LN,IN,MN,kN,PN,NN,BN,FN,jN,DN,HN],UN=WN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zN=["float64","float32","int32","uint32","int16","uint16","int8","uint8","uint8c","complex64","complex128"],GN=zN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VN=N1,KN=no,YN=io,qN=MC,XN=UN,gw=GN,QN=gw.length;function ZN(e){var t;if(KN(e))return"generic";if(VN(e))return null;for(t=0;t<QN;t++)if(e instanceof XN[t])return gw[t];return qN[YN(e)]||null}var JN=ZN;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eP=JN,tP=eP;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rP=zx,nP=sd,iP=wC,oP=ld,aP=IC,sP=tP;function lP(e){var t=sP(e);return rP(e)?{data:e,dtype:t,accessorProtocol:!0,accessors:[oP(t),aP(t)]}:{data:e,dtype:t,accessorProtocol:!1,accessors:[nP(t),iP(t)]}}var uP=lP;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cP=uP,yw=cP;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function fP(e,t,r,n,i,o,a){var s,l,u,c,f,h,d;for(s=t.data,l=i.data,c=t.accessors[0],u=i.accessors[1],f=n,h=a,d=0;d<e;d++)u(l,h,c(s,f)),f+=r,h+=o;return t}var ww=fP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zm=yw,hP=ww,Yu=8;function dP(e,t,r,n,i){var o,a,s,l,u,c;if(e<=0)return n;if(s=Zm(t),l=Zm(n),s.accessorProtocol||l.accessorProtocol)return r<0?o=(1-e)*r:o=0,i<0?a=(1-e)*i:a=0,hP(e,s,r,o,l,i,a),l.data;if(r===1&&i===1){if(u=e%Yu,u>0)for(c=0;c<u;c++)n[c]=t[c];if(e<Yu)return n;for(c=u;c<e;c+=Yu)n[c]=t[c],n[c+1]=t[c+1],n[c+2]=t[c+2],n[c+3]=t[c+3],n[c+4]=t[c+4],n[c+5]=t[c+5],n[c+6]=t[c+6],n[c+7]=t[c+7];return n}for(r<0?o=(1-e)*r:o=0,i<0?a=(1-e)*i:a=0,c=0;c<e;c++)n[a]=t[o],o+=r,a+=i;return n}var pP=dP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jm=yw,mP=ww,Ro=8;function vP(e,t,r,n,i,o,a){var s,l,u,c,f,h;if(e<=0)return i;if(u=Jm(t),c=Jm(i),u.accessorProtocol||c.accessorProtocol)return mP(e,u,r,n,c,o,a),c.data;if(s=n,l=a,r===1&&o===1){if(f=e%Ro,f>0)for(h=0;h<f;h++)i[l]=t[s],s+=r,l+=o;if(e<Ro)return i;for(h=f;h<e;h+=Ro)i[l]=t[s],i[l+1]=t[s+1],i[l+2]=t[s+2],i[l+3]=t[s+3],i[l+4]=t[s+4],i[l+5]=t[s+5],i[l+6]=t[s+6],i[l+7]=t[s+7],s+=Ro,l+=Ro;return i}for(h=0;h<e;h++)i[l]=t[s],s+=r,l+=o;return i}var gP=vP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yP=ce,$w=pP,wP=gP;yP($w,"ndarray",wP);var _w=$w;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function $P(){}var _P=$P;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var SP=_P;function EP(){return SP.name==="foo"}var AP=EP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var OP=AP,RP=OP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bP=Sn,xP=RP,CP=Se,TP=k1.REGEXP,LP=xP();function IP(e){if(bP(e)===!1)throw new TypeError(CP("invalid argument. Must provide a function. Value: `%s`.",e));return LP?e.name:TP.exec(e.toString())[1]}var kP=IP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var MP=kP,NP=MP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var PP=hd,FP=Kl,jP=fd,BP=cd,DP=Vl,HP=ud,WP=_r,UP=so,zP=or,GP=[zP,UP,HP,WP,BP,DP,PP,FP,jP],VP=GP;const KP=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"];/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var YP=io,qP=NP,Sw=Ul,XP=Y1,QP=or,ev=VP,tv=KP,Bs=XP()?Sw(QP):Ew;Bs=qP(Bs)==="TypedArray"?Bs:Ew;function Ew(){}function ZP(e){var t,r;if(typeof e!="object"||e===null)return!1;if(e instanceof Bs)return!0;for(r=0;r<ev.length;r++)if(e instanceof ev[r])return!0;for(;e;){for(t=YP(e),r=0;r<tv.length;r++)if(tv[r]===t)return!0;e=Sw(e)}return!1}var JP=ZP;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e4=JP,t4=e4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var r4=$d,n4=Sd,i4=[n4,r4],o4=i4;const a4=["Complex64Array","Complex128Array"];/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var s4=io,l4=Ul,rv=o4,nv=a4;function u4(e){var t,r;if(typeof e!="object"||e===null)return!1;for(r=0;r<rv.length;r++)if(e instanceof rv[r])return!0;for(;e;){for(t=s4(e),r=0;r<nv.length;r++)if(nv[r]===t)return!0;e=l4(e)}return!1}var c4=u4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var f4=c4,h4=f4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var d4=Se;function p4(e,t){if(typeof t!="function")throw new TypeError(d4("invalid argument. Second argument must be callable. Value: `%s`.",t));return e instanceof t}var m4=p4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var v4=m4,g4=v4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var y4=hd,w4=Kl,$4=fd,_4=cd,S4=Vl,E4=ud,A4=_r,O4=so,R4=or,b4=$d,x4=Sd,C4=[[R4,"Float64Array"],[O4,"Float32Array"],[E4,"Int32Array"],[A4,"Uint32Array"],[_4,"Int16Array"],[S4,"Uint16Array"],[y4,"Int8Array"],[w4,"Uint8Array"],[$4,"Uint8ClampedArray"],[b4,"Complex64Array"],[x4,"Complex128Array"]],T4=C4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var L4=g4,I4=io,k4=Ul,si=T4;function M4(e){var t,r;for(r=0;r<si.length;r++)if(L4(e,si[r][0]))return si[r][1];for(;e;){for(t=I4(e),r=0;r<si.length;r++)if(t===si[r][1])return si[r][1];e=k4(e)}}var N4=M4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var P4=t4,F4=h4,j4=gd,B4=yd,D4=Se,H4=N4;function W4(e){var t,r,n;if(P4(e))t=e;else if(F4(e))e.BYTES_PER_ELEMENT===8?t=j4(e,0):t=B4(e,0);else throw new TypeError(D4("invalid argument. Must provide a typed array. Value: `%s`.",e));for(r={type:H4(e),data:[]},n=0;n<t.length;n++)r.data.push(t[n]);return r}var U4=W4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var z4=U4,Ed=z4;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var G4=Ea,V4=oo,K4=G4-1;function Y4(){var e=V4(1+K4*Math.random());return e>>>0}var Aw=Y4,Sr=ce,zr=Sa,iv=Xh,qu=Hr,q4=td,X4=Gl,ov=zl,Q4=Wl.isPrimitive,av=ax.isPrimitive,Ow=lx,Rw=Ea,ut=_r,Z4=Px,Bf=Dx,li=_w,J4=Ed,ht=Se,sv=Aw,Le=624,Xu=397,lv=Rw>>>0,eF=19650218,Qu=2147483648,Zu=2147483647,tF=1812433253,rF=1664525,nF=1566083941,iF=2636928640,oF=4022730752,aF=2567483615,Ju=[0,aF>>>0],bw=1/(Ow+1),sF=67108864,lF=2147483648,ec=1,uF=Ow*bw,gl=1,yl=3,Zr=2,Jr=Le+3,ft=Le+5,Yo=Le+6;function uv(e,t){var r;return t?r="option":r="argument",e.length<Yo+1?new RangeError(ht("invalid %s. `state` array has insufficient length.",r)):e[0]!==gl?new RangeError(ht("invalid %s. `state` array has an incompatible schema version. Expected: `%s`. Actual: `%s.`",r,gl,e[0])):e[1]!==yl?new RangeError(ht("invalid %s. `state` array has an incompatible number of sections. Expected: `%s`. Actual: `%s`.",r,yl,e[1])):e[Zr]!==Le?new RangeError(ht("invalid %s. `state` array has an incompatible state length. Expected: `%u`. Actual: `%u`.",r,Le,e[Zr])):e[Jr]!==1?new RangeError(ht("invalid %s. `state` array has an incompatible section length. Expected: `%u`. Actual: `%u`.",r,1,e[Jr])):e[ft]!==e.length-Yo?new RangeError(ht("invalid %s. `state` array length is incompatible with seed section length. Expected: `%u`. Actual: `%u`.",r,e.length-Yo,e[ft])):null}function cv(e,t,r){var n;for(e[0]=r>>>0,n=1;n<t;n++)r=e[n-1]>>>0,r=(r^r>>>30)>>>0,e[n]=Bf(r,tF)+n>>>0;return e}function cF(e,t,r,n){var i,o,a,s;for(o=1,a=0,s=Z4(t,n);s>0;s--)i=e[o-1]>>>0,i=(i^i>>>30)>>>0,i=Bf(i,rF)>>>0,e[o]=(e[o]>>>0^i)+r[a]+a>>>0,o+=1,a+=1,o>=t&&(e[0]=e[t-1],o=1),a>=n&&(a=0);for(s=t-1;s>0;s--)i=e[o-1]>>>0,i=(i^i>>>30)>>>0,i=Bf(i,nF)>>>0,e[o]=(e[o]>>>0^i)-o>>>0,o+=1,o>=t&&(e[0]=e[t-1],o=1);return e[0]=lF,e}function fF(e){var t,r,n,i;for(i=Le-Xu,r=0;r<i;r++)t=e[r]&Qu|e[r+1]&Zu,e[r]=e[r+Xu]^t>>>1^Ju[t&ec];for(n=Le-1;r<n;r++)t=e[r]&Qu|e[r+1]&Zu,e[r]=e[r-i]^t>>>1^Ju[t&ec];return t=e[n]&Qu|e[0]&Zu,e[n]=e[Xu-1]^t>>>1^Ju[t&ec],e}function hF(e){var t,r,n,i,o,a;if(n={},arguments.length){if(!q4(e))throw new TypeError(ht("invalid argument. Options argument must be an object. Value: `%s`.",e));if(qu(e,"copy")&&(n.copy=e.copy,!Q4(e.copy)))throw new TypeError(ht("invalid option. `%s` option must be a boolean. Option: `%s`.","copy",e.copy));if(qu(e,"state")){if(r=e.state,n.state=!0,!ov(r))throw new TypeError(ht("invalid option. `%s` option must be a Uint32Array. Option: `%s`.","state",r));if(a=uv(r,!0),a)throw a;n.copy===!1?t=r:(t=new ut(r.length),li(r.length,r,1,t,1)),r=new ut(t.buffer,t.byteOffset+(Zr+1)*t.BYTES_PER_ELEMENT,Le),i=new ut(t.buffer,t.byteOffset+(ft+1)*t.BYTES_PER_ELEMENT,r[ft])}if(i===void 0)if(qu(e,"seed"))if(i=e.seed,n.seed=!0,av(i)){if(i>lv)throw new RangeError(ht("invalid option. `%s` option must be a positive integer less than or equal to the maximum unsigned 32-bit integer. Option: `%u`.","seed",i));i>>>=0}else{if(X4(i)===!1||i.length<1)throw new TypeError(ht("invalid option. `%s` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `%s`.","seed",i));if(i.length===1){if(i=i[0],!av(i))throw new TypeError(ht("invalid option. `%s` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `%s`.","seed",i));if(i>lv)throw new RangeError(ht("invalid option. `%s` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `%u`.","seed",i));i>>>=0}else o=i.length,t=new ut(Yo+o),t[0]=gl,t[1]=yl,t[Zr]=Le,t[Jr]=1,t[Jr+1]=Le,t[ft]=o,li.ndarray(o,i,1,0,t,1,ft+1),r=new ut(t.buffer,t.byteOffset+(Zr+1)*t.BYTES_PER_ELEMENT,Le),i=new ut(t.buffer,t.byteOffset+(ft+1)*t.BYTES_PER_ELEMENT,o),r=cv(r,Le,eF),r=cF(r,Le,i,o)}else i=sv()>>>0}else i=sv()>>>0;return r===void 0&&(t=new ut(Yo+1),t[0]=gl,t[1]=yl,t[Zr]=Le,t[Jr]=1,t[Jr+1]=Le,t[ft]=1,t[ft+1]=i,r=new ut(t.buffer,t.byteOffset+(Zr+1)*t.BYTES_PER_ELEMENT,Le),i=new ut(t.buffer,t.byteOffset+(ft+1)*t.BYTES_PER_ELEMENT,1),r=cv(r,Le,i)),Sr(y,"NAME","mt19937"),zr(y,"seed",s),zr(y,"seedLength",l),iv(y,"state",f,h),zr(y,"stateLength",u),zr(y,"byteLength",c),Sr(y,"toJSON",d),Sr(y,"MIN",0),Sr(y,"MAX",Rw),Sr(y,"normalized",_),Sr(_,"NAME",y.NAME),zr(_,"seed",s),zr(_,"seedLength",l),iv(_,"state",f,h),zr(_,"stateLength",u),zr(_,"byteLength",c),Sr(_,"toJSON",d),Sr(_,"MIN",0),Sr(_,"MAX",uF),y;function s(){var $=t[ft];return li($,i,1,new ut($),1)}function l(){return t[ft]}function u(){return t.length}function c(){return t.byteLength}function f(){var $=t.length;return li($,t,1,new ut($),1)}function h($){var v;if(!ov($))throw new TypeError(ht("invalid argument. Must provide a Uint32Array. Value: `%s`.",$));if(v=uv($,!1),v)throw v;n.copy===!1?n.state&&$.length===t.length?li($.length,$,1,t,1):(t=$,n.state=!0):($.length!==t.length&&(t=new ut($.length)),li($.length,$,1,t,1)),r=new ut(t.buffer,t.byteOffset+(Zr+1)*t.BYTES_PER_ELEMENT,Le),i=new ut(t.buffer,t.byteOffset+(ft+1)*t.BYTES_PER_ELEMENT,t[ft])}function d(){var $={};return $.type="PRNG",$.name=y.NAME,$.state=J4(t),$.params=[],$}function y(){var $,v;return v=t[Jr+1],v>=Le&&(r=fF(r),v=0),$=r[v],t[Jr+1]=v+1,$^=$>>>11,$^=$<<7&iF,$^=$<<15&oF,$^=$>>>18,$>>>0}function _(){var $=y()>>>5,v=y()>>>6;return($*sF+v)*bw}}var xw=hF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dF=xw,pF=Aw,mF=dF({seed:pF()}),vF=mF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gF=ce,Cw=vF,yF=xw;gF(Cw,"factory",yF);var Ad=Cw;const Od=Al(Ad);/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function wF(e){return Math.abs(e)}var $F=wF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _F=$F,tu=_F;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var SF=Math.ceil,EF=SF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var AF=EF,OF=AF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var RF=oo,bF=OF;function xF(e){return e<0?bF(e):RF(e)}var CF=xF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TF=CF,LF=TF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var IF=1023,xa=IF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kF=1023,MF=kF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var NF=-1023,PF=NF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var FF=-1074,jF=FF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var BF=$r,DF=Jn;function HF(e){return e===BF||e===DF}var WF=HF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var UF=WF,Rd=UF;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zF=2147483648,GF=zF;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VF=2147483647,ru=VF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var KF=Kl,YF=Vl,qF={uint16:YF,uint8:KF},XF=qF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fv=XF,Tw;function QF(){var e,t;return e=new fv.uint16(1),e[0]=4660,t=new fv.uint8(e.buffer),t[0]===52}Tw=QF();var ZF=Tw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JF=ZF,Ca=JF;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ej=Ca,Lw,Df,Hf;ej===!0?(Df=1,Hf=0):(Df=0,Hf=1);Lw={HIGH:Df,LOW:Hf};var tj=Lw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rj=_r,nj=or,Iw=tj,kw=new nj(1),hv=new rj(kw.buffer),ij=Iw.HIGH,oj=Iw.LOW;function aj(e,t,r,n){return kw[0]=e,t[n]=hv[ij],t[n+r]=hv[oj],t}var Mw=aj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sj=Mw;function lj(e){return sj(e,[0,0],1,0)}var uj=lj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cj=ce,Nw=uj,fj=Mw;cj(Nw,"assign",fj);var bd=Nw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hj=Ca,Wf;hj===!0?Wf=1:Wf=0;var dj=Wf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pj=_r,mj=or,vj=dj,Pw=new mj(1),gj=new pj(Pw.buffer);function yj(e){return Pw[0]=e,gj[vj]}var wj=yj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $j=wj,uo=$j;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _j=Ca,Fw,Uf,zf;_j===!0?(Uf=1,zf=0):(Uf=0,zf=1);Fw={HIGH:Uf,LOW:zf};var Sj=Fw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ej=_r,Aj=or,jw=Sj,Bw=new Aj(1),dv=new Ej(Bw.buffer),Oj=jw.HIGH,Rj=jw.LOW;function bj(e,t){return dv[Oj]=e,dv[Rj]=t,Bw[0]}var xj=bj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Cj=xj,Dw=Cj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Tj=GF,Lj=ru,Ij=bd,kj=uo,Mj=Dw,tc=[0,0];function Nj(e,t){var r,n;return Ij.assign(e,tc,1,0),r=tc[0],r&=Lj,n=kj(t),n&=Tj,r|=n,Mj(r,tc[1])}var Pj=Nj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Fj=Pj,Hw=Fj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jj=22250738585072014e-324,Bj=jj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Dj=Bj,Hj=Rd,Wj=Wr,Uj=tu,zj=4503599627370496;function Gj(e,t,r,n){return Wj(e)||Hj(e)?(t[n]=e,t[n+r]=0,t):e!==0&&Uj(e)<Dj?(t[n]=e*zj,t[n+r]=-52,t):(t[n]=e,t[n+r]=0,t)}var Ww=Gj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Vj=Ww;function Kj(e){return Vj(e,[0,0],1,0)}var Yj=Kj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qj=ce,Uw=Yj,Xj=Ww;qj(Uw,"assign",Xj);var Qj=Uw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zj=2146435072,Jj=Zj;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e6=uo,t6=Jj,r6=xa;function n6(e){var t=e6(e);return t=(t&t6)>>>20,t-r6|0}var i6=n6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var o6=i6,a6=o6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var s6=$r,l6=Jn,u6=xa,c6=MF,f6=PF,h6=jF,d6=Wr,p6=Rd,m6=Hw,v6=Qj.assign,g6=a6,y6=bd,w6=Dw,$6=2220446049250313e-31,_6=2148532223,rc=[0,0],nc=[0,0];function S6(e,t){var r,n;return t===0||e===0||d6(e)||p6(e)?e:(v6(e,rc,1,0),e=rc[0],t+=rc[1],t+=g6(e),t<h6?m6(0,e):t>c6?e<0?l6:s6:(t<=f6?(t+=52,n=$6):n=1,y6.assign(e,nc,1,0),r=nc[0],r&=_6,r|=t+u6<<20,n*w6(r,nc[1])))}var E6=S6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var A6=E6,zw=A6;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function O6(e){return e===0?.16666666666666602:.16666666666666602+e*(-.0027777777777015593+e*(6613756321437934e-20+e*(-16533902205465252e-22+e*41381367970572385e-24)))}var R6=O6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var b6=zw,x6=R6;function C6(e,t,r){var n,i,o,a;return n=e-t,i=n*n,o=n-i*x6(i),a=1-(t-n*o/(2-o)-e),b6(a,r)}var T6=C6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var L6=Wr,pv=LF,I6=Jn,mv=$r,k6=T6,M6=.6931471803691238,N6=19082149292705877e-26,vv=1.4426950408889634,P6=709.782712893384,F6=-745.1332191019411,j6=1/(1<<28),B6=-3725290298461914e-24;function D6(e){var t,r,n;return L6(e)||e===mv?e:e===I6?0:e>P6?mv:e<F6?0:e>B6&&e<j6?1+e:(e<0?n=pv(vv*e-.5):n=pv(vv*e+.5),t=e-n*M6,r=n*N6,k6(t,r,n))}var H6=D6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var W6=H6,xd=W6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var U6=Math.sqrt,z6=U6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var G6=z6,Cd=G6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var V6=Ca,Gf;V6===!0?Gf=1:Gf=0;var K6=Gf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Y6=_r,q6=or,X6=K6,Vf=new q6(1),Q6=new Y6(Vf.buffer);function Z6(e,t){return Vf[0]=e,Q6[X6]=t>>>0,Vf[0]}var J6=Z6;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e5=J6,Td=e5;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function t5(e){return e===0?.3999999999940942:.3999999999940942+e*(.22222198432149784+e*.15313837699209373)}var r5=t5;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function n5(e){return e===0?.6666666666666735:.6666666666666735+e*(.2857142874366239+e*(.1818357216161805+e*.14798198605116586))}var i5=n5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var gv=uo,o5=Td,a5=Wr,s5=xa,l5=Jn,u5=r5,c5=i5,is=.6931471803691238,os=19082149292705877e-26,f5=0x40000000000000,h5=.3333333333333333,yv=1048575,d5=2146435072,p5=1048576,m5=1072693248;function v5(e){var t,r,n,i,o,a,s,l,u,c,f,h;return e===0?l5:a5(e)||e<0?NaN:(r=gv(e),o=0,r<p5&&(o-=54,e*=f5,r=gv(e)),r>=d5?e+e:(o+=(r>>20)-s5|0,r&=yv,l=r+614244&1048576|0,e=o5(e,r|l^m5),o+=l>>20|0,s=e-1,(yv&2+r)<3?s===0?o===0?0:o*is+o*os:(a=s*s*(.5-h5*s),o===0?s-a:o*is-(a-o*os-s)):(c=s/(2+s),h=c*c,l=r-398458|0,f=h*h,u=440401-r|0,i=f*u5(f),n=h*c5(f),l|=u,a=n+i,l>0?(t=.5*s*s,o===0?s-(t-c*(t+a)):o*is-(t-(c*(t+a)+o*os)-s)):o===0?s-c*(s-a):o*is-(c*(s-a)-o*os-s))))}var g5=v5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var y5=g5,co=y5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var w5=Cd,wv=xd,$5=co,$v=.00991256303526217;function _5(e,t){var r,n,i;for(n=wv(-.5*t*t),r=[],r.push($v/n),r.push(t),i=2;i<e;i++)r[i]=w5(-2*$5($v/r[i-1]+n)),n=wv(-.5*r[i]*r[i]);return r.push(0),r}var S5=_5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function E5(e){var t,r;for(t=[],r=0;r<e.length-1;r++)t.push(e[r+1]/e[r]);return t}var A5=E5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _v=co;function O5(e,t,r){var n,i;do n=_v(e())/t,i=_v(e());while(-2*i<n*n);return r?n-t:t-n}var R5=O5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var b5=tu,Sv=xd,x5=S5,C5=A5,T5=R5,L5=128,Gw=3.442619855899,Fn=x5(L5,Gw),I5=C5(Fn),k5=127;function M5(e,t){return r;function r(){for(var n,i,o,a,s,l,u;;){if(s=2*e()-1,l=t()&k5,b5(s)<I5[l])return s*Fn[l];if(l===0)return T5(e,Gw,s<0);if(a=s*Fn[l],o=a*a,u=l+1,n=Sv(-.5*(Fn[l]*Fn[l]-o)),i=Sv(-.5*(Fn[u]*Fn[u]-o)),i+e()*(n-i)<1)return a}}}var N5=M5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Gr=ce,as=Sa,Ev=Xh,P5=Sn,F5=td,j5=Wl.isPrimitive,ss=Hr,B5=zl,ic=Ad.factory,Av=F1,D5=rd,H5=oo,W5=Ea,U5=Ed,bo=Se,z5=N5;function G5(e){var t,r,n,i;if(i={copy:!0},arguments.length){if(!F5(e))throw new TypeError(bo("invalid argument. Must provide an object. Value: `%s`.",e));if(ss(e,"copy")&&(i.copy=e.copy,!j5(e.copy)))throw new TypeError(bo("invalid option. `%s` option must be a boolean. Option: `%s`.","copy",e.copy));if(ss(e,"prng")){if(!P5(e.prng))throw new TypeError(bo("invalid option. `%s` option must be a pseudorandom number generator function. Option: `%s`.","prng",e.prng));t=e.prng}else if(ss(e,"state")){if(i.state=e.state,!B5(e.state))throw new TypeError(bo("invalid option. `%s` option must be a Uint32Array. Option: `%s`.","state",e.state))}else if(ss(e,"seed")&&(i.seed=e.seed,e.seed===void 0))throw new TypeError(bo("invalid option. `%s` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `%s`.","seed",e.seed))}return i.state===void 0?t===void 0?(r=ic(i),t=r.normalized):(r=ic({seed:H5(1+W5*t()),copy:i.copy}),i.seed=null):(r=ic(i),t=r.normalized),n=z5(t,r),Gr(n,"NAME","improved-ziggurat"),i.seed===null?(Gr(n,"seed",null),Gr(n,"seedLength",null)):(as(n,"seed",o),as(n,"seedLength",a)),e&&e.prng?(Ev(n,"state",Av(null),D5),Gr(n,"stateLength",null),Gr(n,"byteLength",null),Gr(n,"toJSON",Av(null))):(Ev(n,"state",u,c),as(n,"stateLength",s),as(n,"byteLength",l),Gr(n,"toJSON",f)),Gr(n,"PRNG",t),n;function o(){return r.seed}function a(){return r.seedLength}function s(){return r.stateLength}function l(){return r.byteLength}function u(){return r.state}function c(h){r.state=h}function f(){var h={};return h.type="PRNG",h.name=n.NAME,h.state=U5(r.state),h.params=[],h}}var Vw=G5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var V5=Vw,K5=V5(),Y5=K5;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var q5=ce,Kw=Y5,X5=Vw;q5(Kw,"factory",X5);var Q5=Kw;/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Z5=Sn,J5=Z5(Object.assign),eB=J5;/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tB=Object.assign,rB=tB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function nB(e){return Object.keys(Object(e))}var Ld=nB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var iB=Ld;function oB(){return(iB(arguments)||"").length!==2}function aB(){return oB(1,2)}var sB=aB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lB=typeof Object.keys<"u",uB=lB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cB=je;function fB(e){return cB(e)==="[object Arguments]"}var Yw=fB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hB=Yw,qw;function dB(){return hB(arguments)}qw=dB();var pB=qw;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mB=wr.isPrimitive,vB=Wr;function gB(e){return mB(e)&&vB(e)}var Xw=gB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yB=wr.isObject,wB=Wr;function $B(e){return yB(e)&&wB(e.valueOf())}var Qw=$B;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _B=Xw,SB=Qw;function EB(e){return _B(e)||SB(e)}var AB=EB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zw=ce,Id=AB,OB=Xw,RB=Qw;Zw(Id,"isPrimitive",OB);Zw(Id,"isObject",RB);var Jw=Id;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bB=Object.prototype.propertyIsEnumerable,e$=bB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xB=e$,t$;function CB(){return!xB.call("beep","0")}t$=CB();var TB=t$;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LB=Yl,IB=Jw.isPrimitive,kB=ao.isPrimitive,MB=e$,NB=TB;function PB(e,t){var r;return e==null?!1:(r=MB.call(e,t),!r&&NB&&LB(e)?(t=+t,!IB(t)&&kB(t)&&t>=0&&t<e.length):r)}var FB=PB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jB=FB,nu=jB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var BB=Hr,DB=nu,HB=no,WB=En,UB=Ea;function zB(e){return e!==null&&typeof e=="object"&&!HB(e)&&typeof e.length=="number"&&WB(e.length)&&e.length>=0&&e.length<=UB&&BB(e,"callee")&&!DB(e,"callee")}var GB=zB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VB=pB,KB=Yw,YB=GB,Kf;VB?Kf=KB:Kf=YB;var r$=Kf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qB=r$,Ov=Ld,XB=Array.prototype.slice;function QB(e){return qB(e)?Ov(XB.call(e)):Ov(e)}var ZB=QB;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JB=nu,eD=rd,tD=JB(eD,"prototype"),rD=tD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nD=nu,iD={toString:null},oD=!nD(iD,"toString"),aD=oD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Rv=Jw,sD=Gl,lD=Yl.isPrimitive,uD=ao.isPrimitive,bv=Se;function cD(e,t,r){var n,i;if(!sD(e)&&!lD(e))throw new TypeError(bv("invalid argument. First argument must be an array-like object. Value: `%s`.",e));if(n=e.length,n===0)return-1;if(arguments.length===3){if(!uD(r))throw new TypeError(bv("invalid argument. Third argument must be an integer. Value: `%s`.",r));if(r>=0){if(r>=n)return-1;i=r}else i=n+r,i<0&&(i=0)}else i=0;if(Rv(t)){for(;i<n;i++)if(Rv(e[i]))return i}else for(;i<n;i++)if(e[i]===t)return i;return-1}var fD=cD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hD=fD,dD=hD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function pD(e){return e.constructor&&e.constructor.prototype===e}var n$=pD;const mD=["console","external","frame","frameElement","frames","innerHeight","innerWidth","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","scrollLeft","scrollTop","scrollX","scrollY","self","webkitIndexedDB","webkitStorageInfo","window"];/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vD=typeof window>"u"?void 0:window,gD=vD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yD=Hr,wD=dD,xv=P1,$D=n$,_D=mD,ui=gD,i$;function SD(){var e;if(xv(ui)==="undefined")return!1;for(e in ui)try{wD(_D,e)===-1&&yD(ui,e)&&ui[e]!==null&&xv(ui[e])==="object"&&$D(ui[e])}catch{return!0}return!1}i$=SD();var ED=i$;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var AD=typeof window<"u",OD=AD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var RD=ED,Cv=n$,bD=OD;function xD(e){if(bD===!1&&!RD)return Cv(e);try{return Cv(e)}catch{return!1}}var CD=xD;const TD=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LD=M1,oc=Hr,ID=r$,kD=rD,MD=aD,ND=CD,Tv=TD;function PD(e){var t,r,n,i,o,a,s;if(i=[],ID(e)){for(s=0;s<e.length;s++)i.push(s.toString());return i}if(typeof e=="string"){if(e.length>0&&!oc(e,"0"))for(s=0;s<e.length;s++)i.push(s.toString())}else{if(n=typeof e=="function",n===!1&&!LD(e))return i;r=kD&&n}for(o in e)!(r&&o==="prototype")&&oc(e,o)&&i.push(String(o));if(MD)for(t=ND(e),s=0;s<Tv.length;s++)a=Tv[s],!(t&&a==="constructor")&&oc(e,a)&&i.push(String(a));return i}var FD=PD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jD=sB,BD=uB,DD=Ld,HD=ZB,WD=FD,Ds;BD?jD()?Ds=HD:Ds=DD:Ds=WD;var UD=Ds;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zD=UD,GD=zD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var VD=typeof Object.getOwnPropertySymbols<"u",KD=VD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var o$=ed,YD=o$.getOwnPropertySymbols;function qD(e){return YD(o$(e))}var XD=qD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function QD(){return[]}var ZD=QD;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var JD=KD,eH=XD,tH=ZD,Yf;JD?Yf=eH:Yf=tH;var rH=Yf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nH=GD,iH=rH,oH=nu;function aH(e){var t,r,n;for(t=nH(e),r=iH(e),n=0;n<r.length;n++)oH(e,r[n])&&t.push(r[n]);return t}var sH=aH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lH=sH,uH=lH;/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cH=uH,Lv=ed,fH=Se;function hH(e){var t,r,n,i,o,a,s;if(e==null)throw new TypeError(fH("invalid argument. First argument must be a non-null object. Value: `%s`.",e));for(o=Lv(e),a=1;a<arguments.length;a++)if(t=arguments[a],t!=null)for(r=cH(Lv(t)),i=r.length,s=0;s<i;s++)n=r[s],o[n]=t[n];return o}var dH=hH;/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pH=eB,mH=rB,vH=dH,qf;pH?qf=mH:qf=vH;var gH=qf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yH=wr.isPrimitive;function wH(e){return yH(e)&&e>0}var a$=wH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $H=wr.isObject;function _H(e){return $H(e)&&e.valueOf()>0}var s$=_H;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var SH=a$,EH=s$;function AH(e){return SH(e)||EH(e)}var OH=AH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var l$=ce,kd=OH,RH=a$,bH=s$;l$(kd,"isPrimitive",RH);l$(kd,"isObject",bH);var xH=kd;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Iv=xH.isPrimitive,kv=Se;function CH(e,t){return Iv(e)?Iv(t)?null:new TypeError(kv("invalid argument. Second argument must be a positive number. Value: `%s`.",t)):new TypeError(kv("invalid argument. First argument must be a positive number. Value: `%s`.",e))}var TH=CH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mv=md;function LH(e){return e>0?Mv(e-1):Mv(e+1)}var IH=LH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kH=IH,u$=kH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var MH=Ca,Xf;MH===!0?Xf=0:Xf=1;var NH=Xf;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var PH=_r,FH=or,jH=NH,Qf=new FH(1),BH=new PH(Qf.buffer);function DH(e,t){return Qf[0]=e,BH[jH]=t>>>0,Qf[0]}var HH=DH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var WH=HH,iu=WH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function UH(e){return e|0}var zH=UH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var GH=zH,c$=GH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var Nv=u$,VH=Hw,KH=Jn,ls=$r;function YH(e,t){return t===KH?ls:t===ls?0:t>0?Nv(t)?e:0:Nv(t)?VH(ls,e):ls}var qH=YH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var XH=ru,QH=uo,ZH=1072693247,us=1e300,cs=1e-300;function JH(e,t){var r,n;return n=QH(e),r=n&XH,r<=ZH?t<0?us*us:cs*cs:t>0?us*us:cs*cs}var eW=JH;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tW=tu,Pv=$r;function rW(e,t){return e===-1?(e-e)/(e-e):e===1?1:tW(e)<1==(t===Pv)?0:Pv}var nW=rW;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function iW(e){return e===0?.5999999999999946:.5999999999999946+e*(.4285714285785502+e*(.33333332981837743+e*(.272728123808534+e*(.23066074577556175+e*.20697501780033842))))}var oW=iW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var aW=uo,fs=iu,Fv=Td,sW=xa,lW=oW,uW=1048575,jv=1048576,cW=1072693248,fW=536870912,hW=524288,dW=20,pW=9007199254740992,mW=.9617966939259756,vW=.9617967009544373,gW=-7028461650952758e-24,yW=[1,1.5],wW=[0,.5849624872207642],$W=[0,1350039202129749e-23];function _W(e,t,r){var n,i,o,a,s,l,u,c,f,h,d,y,_,$,v,m,g,E,O,R,b,A;return R=0,r<jv&&(t*=pW,R-=53,r=aW(t)),R+=(r>>dW)-sW|0,b=r&uW|0,r=b|cW|0,b<=235662?A=0:b<767610?A=1:(A=0,R+=1,r-=jv),t=Fv(t,r),c=yW[A],E=t-c,O=1/(t+c),i=E*O,a=fs(i,0),n=(r>>1|fW)+hW,n+=A<<18,l=Fv(0,n),u=t-(l-c),s=O*(E-a*l-a*u),o=i*i,g=o*o*lW(o),g+=s*(a+i),o=a*a,l=3+o+g,l=fs(l,0),u=g-(l-3-o),E=a*l,O=s*l+u*i,h=E+O,h=fs(h,0),d=O-(h-E),y=vW*h,_=gW*h+d*mW+$W[A],f=wW[A],m=R,$=y+_+f+m,$=fs($,0),v=_-($-m-f-y),e[0]=$,e[1]=v,e}var SW=_W;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function EW(e){return e===0?.5:.5+e*(-.3333333333333333+e*.25)}var AW=EW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var OW=iu,RW=AW,bW=1.4426950408889634,xW=1.4426950216293335,CW=19259629911266175e-24;function TW(e,t){var r,n,i,o,a,s;return i=t-1,o=i*i*RW(i),a=xW*i,s=i*CW-o*bW,n=a+s,n=OW(n,0),r=s-(n-a),e[0]=n,e[1]=r,e}var LW=TW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var IW=.6931471805599453,kW=IW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var MW=1048575,NW=MW;/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function PW(e){return e===0?.16666666666666602:.16666666666666602+e*(-.0027777777777015593+e*(6613756321437934e-20+e*(-16533902205465252e-22+e*41381367970572385e-24)))}var FW=PW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var jW=uo,Bv=Td,BW=iu,DW=c$,HW=zw,WW=kW,Dv=xa,Hv=ru,Wv=NW,UW=FW,Uv=1048576,zW=1071644672,xo=20,GW=.6931471824645996,VW=-1904654299957768e-24;function KW(e,t,r){var n,i,o,a,s,l,u,c,f,h,d;return h=e&Hv|0,d=(h>>xo)-Dv|0,f=0,h>zW&&(f=e+(Uv>>d+1)>>>0,d=((f&Hv)>>xo)-Dv|0,n=(f&~(Wv>>d))>>>0,o=Bv(0,n),f=(f&Wv|Uv)>>xo-d>>>0,e<0&&(f=-f),t-=o),o=r+t,o=BW(o,0),s=o*GW,l=(r-(o-t))*WW+o*VW,c=s+l,u=l-(c-s),o=c*c,i=c-o*UW(o),a=c*i/(i-2)-(u+c*u),c=1-(a-c),e=jW(c),e=DW(e),e+=f<<xo>>>0,e>>xo<=0?c=HW(c,f):c=Bv(c,e),c}var YW=KW;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/var zv=Wr,Gv=u$,Vv=Rd,qW=En,Kv=Cd,XW=tu,ac=bd,QW=iu,Yv=c$,ZW=Jn,JW=$r,sc=ru,e8=qH,t8=eW,r8=nW,n8=SW,i8=LW,o8=YW,a8=1072693247,s8=1105199104,l8=1139802112,qv=1083179008,u8=1072693248,c8=1083231232,f8=3230714880,Xv=31,Vr=1e300,Kr=1e-300,h8=8008566259537294e-32,Er=[0,0],Qv=[0,0];function f$(e,t){var r,n,i,o,a,s,l,u,c,f,h,d,y,_,$,v;if(zv(e)||zv(t))return NaN;if(ac.assign(t,Er,1,0),s=Er[0],l=Er[1],l===0){if(t===0)return 1;if(t===1)return e;if(t===-1)return 1/e;if(t===.5)return Kv(e);if(t===-.5)return 1/Kv(e);if(t===2)return e*e;if(t===3)return e*e*e;if(t===4)return e*=e,e*e;if(Vv(t))return r8(e,t)}if(ac.assign(e,Er,1,0),o=Er[0],a=Er[1],a===0){if(o===0)return e8(e,t);if(e===1)return 1;if(e===-1&&Gv(t))return-1;if(Vv(e))return e===ZW?f$(-0,-t):t<0?0:JW}if(e<0&&qW(t)===!1)return(e-e)/(e-e);if(i=XW(e),r=o&sc|0,n=s&sc|0,u=o>>>Xv|0,c=s>>>Xv|0,u&&Gv(t)?u=-1:u=1,n>s8){if(n>l8)return t8(e,t);if(r<a8)return c===1?u*Vr*Vr:u*Kr*Kr;if(r>u8)return c===0?u*Vr*Vr:u*Kr*Kr;y=i8(Qv,i)}else y=n8(Qv,i,r);if(f=QW(t,0),d=(t-f)*y[0]+t*y[1],h=f*y[0],_=d+h,ac.assign(_,Er,1,0),$=Yv(Er[0]),v=Yv(Er[1]),$>=qv){if($-qv|v||d+h8>_-h)return u*Vr*Vr}else if(($&sc)>=c8&&($-f8|v||d<=_-h))return u*Kr*Kr;return _=o8($,h,d),u*_}var d8=f$;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var p8=d8,ou=p8;/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zv=co,Jv=Cd,m8=ou,eg=1/3;function v8(e,t,r){var n,i,o,a,s,l,u,c,f,h;for(r<1?(l=r+1-eg,s=1/Jv(9*l),c=m8(e(),1/r)):(l=r-eg,s=1/Jv(9*l),c=1),n=!0;n;){do u=t(),h=1+s*u;while(h<=0);h*=h*h,i=u*u,o=1-.331*i*i,a=.5*i+l*(1-h+Zv(h)),f=e(),(f<o||Zv(f)<a)&&(n=!1)}return l*h*c}var g8=v8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lc=ou,tg=co;function y8(e,t,r){var n,i,o,a,s,l,u,c;for(o=r-1,s=lc(o+o,.5),n=!0;n===!0;)a=t(),u=.5*(1+a/s),u>=0&&u<=1&&(l=e(),i=lc(a,4),c=8*r-12,c=1-i/c,l<=c?n=!1:(c+=.5*lc(i/(8*r-8),2),l<c&&(c=o*tg(4*u*(1-u)),c+=a*a/2,c>=tg(l)&&(n=!1))));return u}var w8=y8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $8=ou,hs=co;function _8(e,t,r,n){var i,o,a,s,l,u,c,f,h,d,y;for(s=r-1,l=n-1,u=s+l,c=u*hs(u),a=s/u,i=.5/$8(u,.5),o=!0;o===!0;)f=t(),d=a+f*i,d>=0&&d<=1&&(h=e(),y=s*hs(d/s),y+=l*hs((1-d)/l),y+=c+.5*f*f,y>=hs(h)&&(o=!1));return d}var S8=_8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var uc=xd,rg=ou,cc=co;function E8(e,t,r){for(var n,i,o,a,s,l,u;;)if(a=e(),s=e(),l=rg(a,1/t),u=rg(s,1/r),o=l+u,o<=1)return o>0?l/o:(n=cc(a)/t,i=cc(s)/r,n>i?(i-=n,n=0):(n-=i,i=0),uc(n-cc(uc(n)+uc(i))))}var A8=E8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ng=g8,O8=w8,R8=S8,b8=A8;function x8(e,t,r,n){var i,o;return r===n&&r>1.5?O8(e,t,r):r>1&&n>1?R8(e,t,r,n):r<1&&n<1?b8(e,r,n):(i=ng(e,t,r),o=ng(e,t,n),i/(i+o))}var C8=x8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ar=ce,ds=Sa,ig=Xh,og=td,ag=Wl.isPrimitive,sg=Sn,ci=Hr,lg=F1,T8=rd,ug=Q5.factory,ps=Ad.factory,cg=Wr,fc=_w,hc=_r,dc=zl,fg=gH,L8=Ed,Or=Se,I8=TH,hg=C8;function k8(){var e,t,r,n,i,o,a,s,l;if(s=!0,arguments.length===0)i={copy:!1},o=ps(i);else if(arguments.length===1){if(i=arguments[0],!og(i))throw new TypeError(Or("invalid argument. Options argument must be an object. Value: `%s`.",i));if(ci(i,"copy")&&!ag(i.copy))throw new TypeError(Or("invalid option. `%s` option must be a boolean. Option: `%s`.","copy",i.copy));if(ci(i,"prng")){if(!sg(i.prng))throw new TypeError(Or("invalid option. `%s` option must be a pseudorandom number generator function. Option: `%s`.","prng",i.prng));o=i.prng}else{if(ci(i,"state")&&!dc(i.state))throw new TypeError(Or("invalid option. `%s` option must be a Uint32Array. Option: `%s`.","state",i.state));i=fg({},i),i.copy===!1?s=!1:i.state&&(i.state=fc(i.state.length,i.state,1,new hc(i.state.length),1)),i.copy=!1,o=ps(i)}}else{if(r=arguments[0],n=arguments[1],l=I8(r,n),l)throw l;if(arguments.length>2){if(i=arguments[2],!og(i))throw new TypeError(Or("invalid argument. Options argument must be an object. Value: `%s`.",i));if(ci(i,"copy")&&!ag(i.copy))throw new TypeError(Or("invalid option. `%s` option must be a boolean. Option: `%s`.","copy",i.copy));if(ci(i,"prng")){if(!sg(i.prng))throw new TypeError(Or("invalid option. `%s` option must be a pseudorandom number generator function. Option: `%s`.","prng",i.prng));o=i.prng}else{if(ci(i,"state")&&!dc(i.state))throw new TypeError(Or("invalid option. `%s` option must be a Uint32Array. Option: `%s`.","state",i.state));i=fg({},i),i.copy===!1?s=!1:i.state&&(i.state=fc(i.state.length,i.state,1,new hc(i.state.length),1)),i.copy=!1,o=ps(i)}}else i={copy:!1},o=ps(i)}return i&&i.prng?t=ug({prng:i.prng}):(i.state?e=i.state:(e=o.state,o.state=e),t=ug({state:e,copy:!1})),r===void 0?a=v:a=$,Ar(a,"NAME","beta"),i&&i.prng?(Ar(a,"seed",null),Ar(a,"seedLength",null),ig(a,"state",lg(null),T8),Ar(a,"stateLength",null),Ar(a,"byteLength",null),Ar(a,"toJSON",lg(null)),Ar(a,"PRNG",o)):(ds(a,"seed",u),ds(a,"seedLength",c),ig(a,"state",d,y),ds(a,"stateLength",f),ds(a,"byteLength",h),Ar(a,"toJSON",_),Ar(a,"PRNG",o),o=o.normalized),a;function u(){return o.seed}function c(){return o.seedLength}function f(){return o.stateLength}function h(){return o.byteLength}function d(){return o.state}function y(m){if(!dc(m))throw new TypeError(Or("invalid argument. Must provide a Uint32Array. Value: `%s`.",m));s&&(m=fc(m.length,m,1,new hc(m.length),1)),o.state=m}function _(){var m={};return m.type="PRNG",m.name=a.NAME,m.state=L8(o.state),r===void 0?m.params=[]:m.params=[r,n],m}function $(){return hg(o,t,r,n)}function v(m,g){return cg(m)||cg(g)||m<=0||g<=0?NaN:hg(o,t,m,g)}}var h$=k8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var M8=h$,N8=M8(),P8=N8;/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var F8=ce,d$=P8,j8=h$;F8(d$,"factory",j8);var B8=d$;const D8=Al(B8),dn=Od.MAX+1;class p${constructor(t){this.mt=Od.factory({seed:t}),this.bt=D8.factory({state:this.mt.state,copy:!1})}chance(t){return this.mt()<t*dn}uniform({min:t=0,max:r=1}){return t+this.mt()*(r-t)/dn}beta({a:t,b:r,min:n=0,max:i=1}){return n+this.bt(t,r)*(i-n)}uniformInt(t){return Math.floor(this.uniform(t))}betaInt(t){return Math.floor(this.beta(t))}uniformChoice(t){const r=t.length;if(r===0)throw new Error("No choices given.");return t[this.uniformInt({max:r})]}betaChoice(t,{a:r,b:n}){const i=t.length;if(i===0)throw new Error("No choices given.");return t[this.betaInt({a:r,b:n,max:i})]}weightedChoice(t){const r=t.filter(o=>o.bid>0),n=r.reduce((o,a)=>o+a.bid,0);if(n===0)throw new Error("No positive bids given.");let i=this.uniform({max:n});for(const{bid:o,item:a}of r)if(i-=o,i<=0)return a;return r[r.length-1].item}shuffle(t){const r=[];for(let n=0;n<t.length;n++){const i=Math.floor(this.mt()*n/dn);n!==i&&(r[n]=r[i]),r[i]=t[n]}return r}}var m$=(e=>(e[e.init=0]="init",e[e.partition=1]="partition",e[e.weave=2]="weave",e[e.flood=3]="flood",e[e.pickSpawn=4]="pickSpawn",e[e.pickArchitect=5]="pickArchitect",e[e.pearl=6]="pearl",e[e.prime=7]="prime",e[e.rough=8]="rough",e[e.placeRechargeSeam=9]="placeRechargeSeam",e[e.placeBuildings=10]="placeBuildings",e[e.placeCrystals=11]="placeCrystals",e[e.placeOre=12]="placeOre",e[e.placeLandslides=13]="placeLandslides",e[e.placeErosion=14]="placeErosion",e[e.placeEntities=15]="placeEntities",e[e.lore=16]="lore",e[e.mod=17]="mod",e[e.script=18]="script",e[e.monsterSpawnScript=19]="monsterSpawnScript",e[e.brace=20]="brace",e[e.height=21]="height",e[e.placeSlugHoles=22]="placeSlugHoles",e[e.slugSpawnScript=23]="slugSpawnScript",e))(m$||{}),Oe=(e=>(e[e.premise=0]="premise",e[e.orders=1]="orders",e[e.success=2]="success",e[e.failure=3]="failure",e[e.foundHoard=4]="foundHoard",e[e.foundHq=5]="foundHq",e[e.foundAllLostMiners=6]="foundAllLostMiners",e[e.nomadsSettled=7]="nomadsSettled",e[e.foundSlugNest=8]="foundSlugNest",e[e.name=9]="name",e[e.failureBaseDestroyed=10]="failureBaseDestroyed",e[e.buildAndPower=11]="buildAndPower",e[e.seismicForeshadow=12]="seismicForeshadow",e[e.pandora=13]="pandora",e))(Oe||{});const dg=Symbol("sealed");class v${constructor(t){this.pickArchitect=o=>this.prng(5,o),this.mod=o=>this.prng(17,o),this.prime=o=>this.prng(7,o),this.pearl=o=>this.prng(6,o),this.rough=o=>this.prng(8,o),this.placeRechargeSeam=o=>this.prng(9,o),this.placeBuildings=o=>this.prng(10,o),this.placeCrystals=o=>this.prng(11,o),this.placeOre=o=>this.prng(12,o),this.placeSlugHoles=o=>this.prng(22,o),this.placeLandslides=o=>this.prng(13,o),this.placeErosion=o=>this.prng(14,o),this.placeEntities=o=>this.prng(15,o),this.lore=o=>this.prng(16,o),this.script=o=>this.prng(18,o),this.monsterSpawnScript=o=>this.prng(19,o),this.slugSpawnScript=o=>this.prng(23,o),this.seed=t,t===0&&(t=1999);const r=Od.factory({seed:t}),n=Object.keys(m$).length,i=[];for(let o=0;o<n;o++)i[o]={seed:r(),rngs:[]};this.boxes=i}prng(t,r){const n=this.boxes[t];let i=n.rngs[r];if(i){if(Object.is(i,dg))throw new Error(`prng at [${t},${r}] was sealed`);return i}const o=(n.seed+r*1999+dn)%dn;return i=new p$(o),n.rngs[r]=i,i}init(t){return this.prng(0,t)}seal(){this.boxes.forEach(t=>t.rngs.forEach((r,n)=>t.rngs[n]=dg))}get partition(){return this.prng(1,0)}get weave(){return this.prng(2,0)}get flood(){return this.prng(3,0)}get pickSpawn(){return this.prng(4,0)}get brace(){return this.prng(20,0)}get height(){return this.prng(21,0)}}const H8={baseplateMaxOblongness:3,baseplateMaxRatioOfSize:.33,caveCount:20,optimalAuxiliaryPathCount:2,randomAuxiliaryPathCount:3,auxiliaryPathMinAngle:Math.PI/4,anchorGravity:1,anchorWhimsy:1,planWhimsy:1,caveBaroqueness:.16,hallBaroqueness:.07,caveCrystalRichness:{base:.16,hops:.32,order:.32},hallCrystalRichness:{base:.07,hops:0,order:0},caveOreRichness:{base:1.19,hops:-.16,order:-.08},hallOreRichness:{base:.12,hops:0,order:0},monsterSpawnRate:{base:.3,hops:.56,order:.6},monsterWaveSize:{base:1.75,hops:2,order:3},architects:{},caveCrystalSeamBias:.05,hallCrystalSeamBias:.05,caveOreSeamBias:.05,hallOreSeamBias:.05,hallHasSlugHoleChance:0,stratascosity:0,strataplanity:3,caveHasLandslidesChance:.4,hallHasLandslidesChance:.8,caveLandslideCooldownRange:{min:15,max:120},hallLandslideCooldownRange:{min:30,max:150},crystalGoalRatio:.2,airSafetyFactor:2,globalHostilesCooldown:0,globalHostilesCap:15},W8={rock:{caveHasRechargeSeamChance:.07,hallHasRechargeSeamChance:.02,caveHasSlugHoleChance:.05,caveMaxSlope:75,hallMaxSlope:90,voidMaxSlope:120,borderMaxSlope:200},ice:{caveHasRechargeSeamChance:.07,hallHasRechargeSeamChance:.07,caveHasSlugHoleChance:0,caveMaxSlope:30,hallMaxSlope:30,voidMaxSlope:40,borderMaxSlope:100},lava:{caveHasRechargeSeamChance:.1,hallHasRechargeSeamChance:.04,caveHasSlugHoleChance:.01,caveMaxSlope:60,hallMaxSlope:90,voidMaxSlope:120,borderMaxSlope:200}};function U8(e,t){const r=e.init(3),n=r.betaInt({a:1.4,b:1.4,...{rock:{min:0,max:8},ice:{min:0,max:20},lava:{min:0,max:4}}[t]}),i=n>3?r.uniformInt({min:1,max:n/2}):1,o=r.betaInt({a:1.4,b:1.4,...{rock:{min:0,max:4},ice:{min:0,max:2},lava:{min:4,max:16}}[t]}),a=o>3?r.uniformInt({min:1,max:Math.min(o/2,3)}):1,s=o>0?r.betaInt({rock:{a:.8,b:1.4,min:0,max:6},ice:{a:.5,b:1.8,min:0,max:4},lava:{a:1.4,b:1.4,min:0,max:16}}[t]):0;return{waterPlans:n,waterLakes:i,lavaPlans:o,lavaLakes:a,erosionPlans:s}}function ii(e){const t=new v$(e.seed),r={biome:t.init(0).uniformChoice(["rock","ice","lava"]),hasMonsters:t.init(2).chance(.75),targetSize:t.init(1).uniformInt({min:50,max:78}),...e},n=t.init(6).chance(.75),i=t.init(5).chance({rock:.25,ice:.01,lava:.05}[r.biome]),o=t.init(4).betaInt({rock:{a:3,b:1,min:100,max:500},ice:{a:1,b:3,min:100,max:500},lava:{a:2,b:1.5,min:100,max:500}}[r.biome]);return{...H8,...W8[r.biome],...U8(t,r.biome),hasAirLimit:n,hasSlugs:i,heightTargetRange:o,...r}}const z8="_contextInput_1wbia_1",G8="_section_1wbia_17",V8="_subsection_1wbia_17",K8="_inputRow_1wbia_51",Y8="_icon_1wbia_72",q8="_inactive_1wbia_78",X8="_invisible_1wbia_82",Q8="_override_1wbia_85",Z8="_seed_1wbia_89",J8="_architectCount_1wbia_92",eU="_showAdvanced_1wbia_97",tU="_curve_1wbia_105",k={contextInput:z8,section:G8,subsection:V8,inputRow:K8,icon:Y8,inactive:q8,invisible:X8,override:Q8,seed:Z8,architectCount:J8,showAdvanced:eU,curve:tU},Ta=[0,0],oi=[0,-1],g$=[1,-1],au=[1,0],y$=[1,1],su=[0,1],w$=[-1,1],lu=[-1,0],Md=[-1,-1],Ke=[oi,su,au,lu],$$=[oi,g$,au,y$,su,w$,lu,Md];function rU(e,t){return Math.abs(e[0]-t[0])<=1&&Math.abs(e[1]-t[1])<=1}function pg([e,t]){return{x:e,y:t}}function _$([e,t],r){if(!r.length)return null;let[n,i]=r[0],o=1/0;for(const[a,s]of r){const l=(e-a)*(e-a)+(t-s)*(t-s);l<o&&([n,i,o]=[a,s,l])}return[n,i]}function tr([e,t],[r,n]){return[e+r,t+n]}function*fo(e,t){let r=Math.floor(e[0]),n=Math.floor(e[1]);const i=Math.floor(t[0]),o=Math.floor(t[1]),a=Math.abs(i-r),s=i>r?1:-1,l=-Math.abs(o-n),u=o>n?1:-1;let c=a+l;for(;yield[r,n],!(r===i&&n===o);){const f=2*c,h=f>=l,d=f<=a;if(h){if(r===i)break;c+=l,r+=s}if(d){if(h&&(yield[r,n]),n===o)break;c+=a,n+=u}}}function qo(e){return(e*180/Math.PI+180)%360-180}function nU([e,t]){return[-e,-t]}function iU([e,t]){return[t,-e]}function oU([e,t]){return[-t,e]}const ms=({of:e,choices:t,update:r,initialContext:n,context:i})=>p.jsxs(p.Fragment,{children:[p.jsx("p",{children:e}),p.jsx("div",{className:k.inputRow,children:t.map(o=>{const a=[k.choice],s=n[e]===o;s&&a.push(k.override);const l=(i==null?void 0:i[e])===o;return a.push(l?k.active:k.inactive),p.jsx("button",{className:a.join(" "),onClick:()=>{r({[e]:s?void 0:o})},children:`${o}`},`${o}`)})})]}),mg=({of:e,min:t,max:r,step:n,update:i,initialContext:o,context:a})=>{function s(l,u){i({[e]:{...a[e],[l]:u}})}return p.jsxs(p.Fragment,{children:[p.jsxs("p",{children:[e,":"]}),p.jsxs("p",{children:[a[e].base.toFixed(2),", ",a[e].hops.toFixed(2),","," ",a[e].order.toFixed(2)]}),p.jsxs("div",{className:k.inputRow,children:[p.jsx("div",{className:k.curve,children:["base","hops","order"].map(l=>{const u=a[e][l];return p.jsx("input",{className:k.slider,type:"range",min:t,max:r,step:n,value:u,style:{"--completion":`${100*(u-t)/(r-t)}%`},onChange:c=>s(l,c.target.valueAsNumber)},l)})}),e in o?p.jsx("button",{className:`${k.icon} ${k.override}`,onClick:()=>i({[e]:void 0}),children:"undo"}):p.jsx("div",{className:`${k.icon} ${k.invisible}`})]})]})},fe=({of:e,min:t,max:r,percent:n,angle:i,step:o,zeroLabel:a,update:s,initialContext:l,context:u})=>{const c=u[e],f=a&&c===0?a:n?p.jsxs(p.Fragment,{children:[(c*100).toFixed(),"%"]}):i?p.jsxs(p.Fragment,{children:[qo(c).toFixed(),"°"]}):c;return p.jsxs(p.Fragment,{children:[p.jsxs("p",{children:[e,": ",f]}),p.jsxs("div",{className:k.inputRow,children:[p.jsx("input",{className:k.slider,type:"range",min:t,max:r,step:o||(n?.01:i?Math.PI/36:1),value:c,style:{"--completion":`${100*(c-t)/(r-t)}%`},onChange:h=>s({[e]:h.target.valueAsNumber})}),e in l?p.jsx("button",{className:`${k.icon} ${k.override}`,onClick:()=>s({[e]:void 0}),children:"undo"}):p.jsx("div",{className:`${k.icon} ${k.invisible}`})]})]})},pc=({of:e,min:t,max:r,step:n,zeroLabel:i,update:o,initialContext:a,context:s})=>{const l=Math.log2(s[e]),u=i&&l===0?i:l<0?`1/${Math.pow(2,-l).toFixed()}`:s[e].toFixed();return p.jsxs(p.Fragment,{children:[p.jsxs("p",{children:[e,": ",u]}),p.jsxs("div",{className:k.inputRow,children:[p.jsx("input",{className:k.slider,type:"range",min:t,max:r,step:n||1,value:l,style:{"--completion":`${100*(l-t)/(r-t)}%`},onChange:c=>o({[e]:Math.pow(2,c.target.valueAsNumber)})}),e in a?p.jsx("button",{className:`${k.icon} ${k.override}`,onClick:()=>o({[e]:void 0}),children:"undo"}):p.jsx("div",{className:`${k.icon} ${k.invisible}`})]})]})};function uu(e,t){for(let r=0;r<e.length-1;r++)t(e[r],e[r+1],r)}function Nd(e,t){const r=[];return uu(e,(n,i,o)=>r.push(t(n,i,o))),r}function Fe(e){return e.filter(t=>t)}class aU{constructor(){this.phrases=[],this.states=new Set}phrase(t,r){const n={id:this.phrases.length,text:t,requires:r??null,after:[],before:[],reachableStates:new Set,lane:-1};return this.phrases.push(n),r&&r!=="start"&&r!=="end"&&this.states.add(r),n}}function sU(e,t){e.after.push(t),t.before.push(e)}function vs(e,t){let r=0,n=0;const i=[];for(;;)if(r>=e.length){if(n>=t.length)return i;i.push(t[n++])}else n>=t.length||e[r].id<t[n].id?i.push(e[r++]):e[r].id>t[n].id?i.push(t[n++]):(i.push(e[r++]),n++)}function Zf(e,t){return e==="start"?1n:e==="end"?2n:4n<<BigInt(t.indexOf(e))}function lU(e,t){let r=e;const n=[];for(const i of["start","end",...t])(r&1n)===1n&&n.push(i),r>>=1n;return n.join(" ")}class Ht{constructor(t,r,n,i){this.v=t,this.heads=r,this.tails=n,this.skip=i}static coerce(t,r){const n=[],i=[];for(const l of r)l instanceof Ht?i.push(l):typeof l=="function"?n.push(l):n.push(()=>l);if(i.length===0){const l=[t.phrase(n)];return new Ht(t,l,l,!1)}const o=i.reduce((l,u)=>vs(l,u.heads),[]),a=i.reduce((l,u)=>vs(l,u.tails),[]),s=i.some(l=>l.skip);if(n.length>0){const l=t.phrase(n);o.push(l),a.push(l)}return new Ht(t,o,a,s)}then(...t){const r=Ht.coerce(this.v,t);for(const n of this.tails)for(const i of r.heads)sU(n,i);return new Ht(this.v,this.skip?vs(this.heads,r.heads):this.heads,r.skip?vs(this.tails,r.tails):r.tails,this.skip&&r.skip)}}function uU(e){const t=[],r=e.filter(i=>i.before.length===0),n=[];for(;r.length>0;){const i=r.shift();if(t[i.id]!==void 0)continue;const o=i.before.filter(a=>t[a.id]===void 0);o.length>0?r.unshift(...o,i):(t[i.id]=n.length,n.push({...i,id:n.length}),r.unshift(...i.after))}return n.forEach(i=>{i.after=i.after.map(o=>n[t[o.id]]).sort((o,a)=>o.id-a.id),i.before=i.before.map(o=>n[t[o.id]]).sort((o,a)=>o.id-a.id)}),n}function cU(e,t){const r=new Set;for(const o of e.after)for(const a of o.reachableStates)r.add(a);const n=e.requires?Zf(e.requires,t):0n;if(r.size===0){const o=new Set;return n!==0n&&o.add(n),o}if(!e.requires)return r;const i=new Set;for(const o of r)(o&n)===0n&&i.add(o|n);return i}const fU={".":!0,"!":!0,"?":!0,"\n":!0},hU={"\n":!0},dU={",":!0,".":!0,"!":!0,"?":!0,"\n":!0};function pU(e,t){var o;const r=[];let n=!0,i=!1;for(let a=0;a<e.length;a++){const s=(o=e[a])==null?void 0:o.call(e,{chosen:e,index:a,format:t});if(!s)continue;i&&!(s.charAt(0)in dU)&&r.push(" "),n?(r.push(s[0].toUpperCase()),r.push(s.slice(1))):r.push(s);const l=s.charAt(s.length-1);n=l in fU,i=!(l in hU)}return r.join("")}class mU extends Error{}class vU{constructor(t,r,n,i){this.didTraverse=!1,this.name=t,this.start=r,this.phrases=n,this.states=i}cacheReachableStates(){if(!this.didTraverse){for(let t=this.phrases.length-1;t>=0;t--){const r=this.phrases[t];r.reachableStates=cU(r,this.states)}this.didTraverse=!0}}generate(t,r,n){this.cacheReachableStates();let i=3n;for(const s of this.states)r[s]&&(i|=Zf(s,this.states));const o=[this.start];for(;;){const s=o[o.length-1];if(s.requires==="end")break;s.requires&&(i^=Zf(s.requires,this.states));const l=s.after.filter(u=>u.reachableStates.has(i));if(l.length===0)throw new mU(`${this.name}: No continuation has state ${lU(i,this.states)} at phrase ${s.id}`);o.push(t.uniformChoice(l))}const a=o.map(s=>s.text.length?t.uniformChoice(s.text):null);return pU(a,n)}}function Z(e,t){const r=new aU,n=(...h)=>Ht.coerce(r,h),i=(...h)=>{const d=h.map(y=>r.phrase([],y));return new Ht(r,d,d,!1)},o=new Ht(r,[],[r.phrase([],"start")],!1),a=new Ht(r,[r.phrase([],"end")],[],!1),s=new Ht(r,[],[],!1),l=new Ht(r,[],[],!0);t({pg:n,state:i,start:o,end:a,cut:s,skip:l});const u=uU(r.phrases),c=Array.from(r.states.values()).sort(),f=u.find(h=>h.requires==="start");return new vU(e,f,u,c)}const gU=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],yU=["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];function xe(e){if(e>999||e<0)return e.toString();if(e===0)return"zero";const t=[];return e>=100&&(t.push(`${xe(Math.floor(e/100))} hundred`),e%=100),e>=20&&(t.push(yU[Math.floor(e/10)-2]),e%=10),e>0&&(t.push(gU[e-1]),e=0),t.join(" ")}function Ci(e,t){return e===2?"both":t(xe(e))}const wU=Z("Build and Power First Geological Center",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("We're getting those readings already!","The first scans are coming in now.").then(({format:{remainingCount:a}})=>`Just ${xe(a)} to go!`,({format:{remainingCount:a}})=>`Now just build ${xe(a)} more.`,({format:{remainingCount:a}})=>`${xe(a)} more like that and we're good to go!`).then(o,t("hasMonsters").then(o,"Be sure to keep it defended.","You may want to build some Electric Fences around it.")).then(n)}),$U=Z("Build and Power Penultimate Geological Center",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Good work!","Well done!").then("Just one more to go!").then(n)}),_U=Z("Build and Power Last Geological Center",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Well done!","Outstanding!").then("We're getting all the data we need now.","Our geologists will review these scans immediately.").then(n)}),SU=Z("Build and Power First Support Station",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("It's cleaning up the air already.","The air feels cleaner already.").then(({format:{remainingCount:a}})=>`Just ${xe(a)} to go!`,({format:{remainingCount:a}})=>`Now just build ${xe(a)} more.`,({format:{remainingCount:a}})=>`${xe(a)} more like that and we're good to go!`).then(o,t("hasMonsters").then("Be sure to keep it defended.")).then(n)}),EU=Z("Build and Power Penultimate Support Station",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Good work!","Well done!").then("Just one more to go!","We only need one more.").then(n)}),AU=Z("Build and Power Last Support Station",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Well done!","Outstanding!").then("This should handle the atmosphere.").then(n)});function S$(e){if("aimedAt"in e)return Math.atan2(e.aimedAt[1]-e.y,e.aimedAt[0]-e.x);if("facing"in e)return Math.atan2(e.facing[1],e.facing[0]);if("yaw"in e)return e.yaw}const mc=300,Tn={z:0,pitch:0,yaw:0,roll:0,scaleX:1,scaleY:1,scaleZ:1};function Br(e){return{x:e.x,y:e.y,z:e.z??Tn.z,pitch:e.pitch??Tn.pitch,yaw:S$(e)??Tn.yaw,roll:e.roll??Tn.roll,scaleX:e.scaleX??e.scale??Tn.scaleX,scaleY:e.scaleY??e.scale??Tn.scaleY,scaleZ:e.scaleZ??e.scale??Tn.scaleZ}}const OU=e=>Br({...e,x:e.x+.5,y:e.y+.5});function pn(e){const t=e.rng.uniform({})+e.x,r=e.rng.uniform({})+e.y,n=S$(e)??e.rng.uniform({min:-Math.PI,max:Math.PI}),i=e.scale;return Br({x:t,y:r,yaw:n,scale:i})}function RU(e,t,r,n,i,o){return(Math.max(r,n,i,o)+Math.min(r,n,i,o))/2}function bU(e,t,r,n,i,o){if(t<=1-e){const a=(n-r)*e,s=(i-r)*t;return r+a+s}else{const a=(i-o)*(e-1),s=(n-o)*(t-1);return o+a+s}}function xU(e,t,r,n){const i=Math.floor(e),o=Math.floor(t),a={entity:bU,building:RU}[n];return a(e-i,t-o,r.get(i,o),r.get(i+1,o),r.get(i,o+1),r.get(i+1,o+1))}function La({position:e,tileOffset:[t,r],heightMap:n,entityOffset:i,floorMethod:o="entity"}){const{scaleX:a,scaleY:s,scaleZ:l}=e,u=(e.x+t)*mc+((i==null?void 0:i.x)??0),c=(e.y+r)*mc+((i==null?void 0:i.y)??0),f=e.z*mc+((i==null?void 0:i.z)??0)+xU(e.x,e.y,n,o),h=qo(e.pitch+((i==null?void 0:i.pitch)??0)),d=qo(e.yaw+((i==null?void 0:i.yaw)??0)),y=qo(e.roll+((i==null?void 0:i.roll)??0));return`Translation: X=${u.toFixed(3)} Y=${c.toFixed(3)} Z=${f.toFixed(3)} Rotation: P=${h.toFixed(6)} Y=${d.toFixed(6)} R=${y.toFixed(6)} Scale X=${a.toFixed(3)} Y=${s.toFixed(3)} Z=${l.toFixed(3)}`}const CU=[Ta],ho=[Ta,oi],E$=[Ta,su,oi],TU=[Ta,au,oi],LU=[Ta,Md,lu,oi],IU="BuildingElectricFence_C";function kU(e,[t,r]){return r===-1?e:t===1?e.map(oU):r===1?e.map(nU):e.map(iU)}class ar{constructor(t,r,n,i,o,a,s,l){this.atTile=u=>({...OU(u),template:this,foundation:kU(this.footprint,u.facing).map(([c,f])=>[c+u.x,f+u.y]),level:u.level??1,isEssential:u.isEssential??!1,teleportAtStart:u.teleportAtStart??!1,placeRubbleInstead:u.placeRubbleInstead??!1}),this.id=t,this.name=r,this.inspectAbbrev=n,this.maxLevel=i,this.ore=o,this.crystals=a,this.footprint=s,this.dependencies=l}}const de=new ar("BuildingToolStore_C","Tool Store","Ts",3,0,0,ho,[]),_t=new ar("BuildingTeleportPad_C","Teleport Pad","Tp",2,8,0,ho,[de]),On=new ar("BuildingDocks_C","Docks","Dk",1,8,0,ho,[de]),cu=new ar("BuildingCanteen_C","Canteen","Cn",1,10,1,E$,[de]),_e=new ar("BuildingPowerStation_C","Power Station","Ps",2,12,2,TU,[de,_t]),Ce=new ar("BuildingSupportStation_C","Support Station","Ss",2,15,3,ho,[de,_t,_e]),Pd=new ar("BuildingUpgradeStation_C","Upgrade Station","Us",3,20,3,ho,[de,_t,_e]),yn=new ar("BuildingGeologicalCenter_C","Geological Center","Gc",5,20,2,ho,[de,_t,_e]),Ia=new ar("BuildingOreRefinery_C","Ore Refinery","Or",4,20,3,E$,[de,_t,_e]),mn=new ar("BuildingMiningLaser_C","Mining Laser","Ml",1,10,1,CU,[de,_t,_e,Ce]),po=new ar("BuildingSuperTeleport_C","Super Teleport","St",2,20,4,LU,[de,_t,_e,Ce]),MU=[de,_t,cu,_e,Ce,Pd,yn,Ia,mn,po],NU={yaw:Math.PI/2};function PU(e,t,r){if(e.placeRubbleInstead)throw new Error('Building was marked "placeRubbleInstead" but made it into the level anyway.');return[e.template.id,La({position:e,tileOffset:t,heightMap:r,entityOffset:NU,floorMethod:"building"}),e.level>1&&`Level=${e.level.toFixed()}`,e.isEssential&&"Essential=True",e.teleportAtStart&&"Teleport=True"].filter(n=>n).join(",")}var Re=(e=>(e[e.NONE=0]="NONE",e[e.RUBBLE=1]="RUBBLE",e[e.DIRT=2]="DIRT",e[e.LOOSE=3]="LOOSE",e[e.SEAM=4]="SEAM",e[e.HARD=5]="HARD",e[e.SOLID=6]="SOLID",e))(Re||{});const FU={FLOOR:{id:1,name:"Cavern Floor",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},LAVA:{id:6,name:"Lava",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!0,isWall:!1,maxSlope:0,oreYield:0,trigger:null},WATER:{id:11,name:"Water",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!0,isWall:!1,maxSlope:0,oreYield:0,trigger:null},DIRT:{id:26,name:"Dirt",canLandslide:!0,crystalYield:0,hardness:2,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:4,trigger:null},LOOSE_ROCK:{id:30,name:"Loose Rock",canLandslide:!0,crystalYield:0,hardness:3,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:4,trigger:null},HARD_ROCK:{id:34,name:"Hard Rock",canLandslide:!0,crystalYield:0,hardness:5,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:4,trigger:null},SOLID_ROCK:{id:38,name:"Solid Rock",canLandslide:!1,crystalYield:0,hardness:6,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:4,trigger:null},RUBBLE_1:{id:2,name:"Rubble 1",canLandslide:!1,crystalYield:0,hardness:1,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:1,trigger:null},SLUG_HOLE:{id:12,name:"Slimy Slug Hole",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!1,isWall:!1,maxSlope:15,oreYield:0,trigger:null},FOUNDATION:{id:14,name:"Foundation",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!1,isWall:!1,maxSlope:15,oreYield:0,trigger:null},POWER_PATH:{id:24,name:"Power Path",canLandslide:!1,crystalYield:0,hardness:0,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},WASTE_DIRT:{id:26,name:"Dirt (Waste)",canLandslide:!0,crystalYield:0,hardness:2,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:0,trigger:"waste"},WASTE_LOOSE_ROCK:{id:30,name:"Loose Rock (Waste)",canLandslide:!0,crystalYield:0,hardness:3,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:0,trigger:"waste"},WASTE_HARD_ROCK:{id:34,name:"Hard Rock (Waste)",canLandslide:!0,crystalYield:0,hardness:5,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:0,trigger:"waste"},WASTE_SOLID_ROCK:{id:38,name:"Solid Rock (Waste)",canLandslide:!1,crystalYield:0,hardness:6,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:0,trigger:"waste"},WASTE_RUBBLE_1:{id:60,name:"Rubble 1 (Waste)",canLandslide:!1,crystalYield:0,hardness:1,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},WASTE_RUBBLE_2:{id:61,name:"Rubble 2 (Waste)",canLandslide:!1,crystalYield:0,hardness:1,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},WASTE_RUBBLE_3:{id:62,name:"Rubble 3 (Waste)",canLandslide:!1,crystalYield:0,hardness:1,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},WASTE_RUBBLE_4:{id:63,name:"Rubble 4 (Waste)",canLandslide:!1,crystalYield:0,hardness:1,isFluid:!1,isWall:!1,maxSlope:void 0,oreYield:0,trigger:null},CRYSTAL_SEAM:{id:42,name:"Energy Crystal Seam",canLandslide:!1,crystalYield:4,hardness:4,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:4,trigger:null},ORE_SEAM:{id:46,name:"Ore Seam",canLandslide:!1,crystalYield:0,hardness:4,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:8,trigger:null},RECHARGE_SEAM:{id:50,name:"Recharge Seam",canLandslide:!1,crystalYield:0,hardness:6,isFluid:!1,isWall:!0,maxSlope:void 0,oreYield:0,trigger:null}},S=FU,A$=16,Xo=16384,jU=32767,vg=32767;function Qo(e,t){const r=e+Xo,n=t+Xo;if(r<0||r>vg||n<0||n>vg)throw new Error(`[${e}, ${t}] is out of range (-16384..${Xo-1})`);return n<<A$|r}function BU(e){const t=e>>A$;return[(e&jU)-Xo,t-Xo]}class oe{constructor(t){this.data=new Map(t)}copy(){return new oe(this.data)}get(t,r){return this.data.get(Qo(t,r))}set(t,r,n){this.data.set(Qo(t,r),n)}delete(t,r){return this.data.delete(Qo(t,r))}get size(){return this.data.size}get bounds(){const t={};return this.forEach((r,n,i)=>{n>=t.left?n+1<=t.right||(t.right=n+1):t.left=n,i>=t.top?i+1<=t.bottom||(t.bottom=i+1):t.top=i}),t}forEach(t){this.data.forEach((r,n)=>{t(r,...BU(n))})}map(t){const r=[];return this.forEach((...n)=>r.push(t(...n))),r}flatMap(t){const r=[];return this.forEach((...n)=>r.push(...t(...n))),r}reduce(t,r){let n=r;return this.forEach((...i)=>n=t(n,...i)),n}}function DU(e){var t;if((t=e.args)!=null&&t.placeRubbleInstead)return 3;switch(e.bt){case On:return 0;case _e:case po:return 1;case Ia:case cu:return 2;default:return 3}}function Fd({from:e,to:t,queue:r},{cavern:n,plan:i,tiles:o}){var h;const a=new oe,s=n.dice.placeBuildings(i.id),l=[],u=[];for(let d=e??1;d<(t??i.innerPearl.length);d++)for(const[y,_]of s.shuffle(i.innerPearl[d]))for(const $ of Ke){const[v,m]=$;((h=n.pearlInnerDex.get(y+v,_+m))==null?void 0:h[i.id])===d-1&&u.push({x:y,y:_,facing:$})}const c=[[],[],[],[]];r.forEach(d=>{c[DU(d)].push(d)});const f=d=>a.get(...d)||o.get(...d)!==S.FLOOR;for(const d of c){for(const{x:y,y:_,facing:$}of u){if(d.length===0)break;if(f([y,_]))continue;const[v,m]=$;for(let g=0;g<d.length;g++){const{bt:E,args:O}=d[g];if(E===On&&o.get(y-v,_-m)!==S.WATER)continue;const R=E.atTile({x:y,y:_,facing:$,...O});if(!R.foundation.some(f)){l.push(R),R.foundation.forEach(([b,A])=>a.set(b,A,!0)),d.splice(g,1);break}}}d.forEach(y=>{if(y.required)throw console.error("Failed to place required building: %o",y),new Error(`Failed to place ${y.bt.name}, which is required.`);console.warn("Failed to place optional building: %o",y)})}return l}function Rn(e){return e.plans[e.anchor]}class fu{constructor(t,r,n,i){this.id=t,this.name=r,this.inspectAbbrev=n,this.zOffset=i}}const O$=new fu("CreatureRockMonster_C","Rock Monster","Rm",138.15),R$=new fu("CreatureIceMonster_C","Ice Monster","Im",138.15),b$=new fu("CreatureLavaMonster_C","Lava Monster","Lm",138.15),x$=new fu("CreatureSlimySlug_C","Slimy Slug","Sg",62.15);function Yi(e){switch(e){case"rock":return O$;case"ice":return R$;case"lava":return b$}}class HU{constructor(){this.id=0}create(t){return{sleep:!1,...t,id:this.id++}}}function WU(e,t,r){return`${e.template.id}
${La({position:e,tileOffset:t,heightMap:r,entityOffset:{z:e.template.zOffset}})}
ID=${e.id.toFixed()}${e.sleep?",Sleep=true":""}`}function Hs(e,t){for(let r=0;r<e.innerPearl.length;r++){const n=e.innerPearl[r],i=e.id%(n.length-1);for(let o=i;o<n.length;o++)if(t(...n[o]))return n[o];for(let o=0;o<i;o++)if(t(...n[o]))return n[o]}}function UU(e,t,r){for(let n=r.to??t.innerPearl.length-2;n>=(r.from??0);n--){const i=C$(e,t,r.count,r.rng,r.filterFn,n,n+1);if(i.length)return i}return[]}function zU(e,t,r){for(let n=r.from??1;n<(r.to??t.innerPearl.length);n++){const i=C$(e,t,r.count,r.rng,r.filterFn,n,n-1);if(i.length)return i}return[]}function C$(e,t,r,n,i,o,a){const s=Fe(t.innerPearl[o].map(([l,u])=>{var h;const c=e.tiles.get(l,u);if((c==null?void 0:c.isWall)!==!1||!i(l,u,c)||(h=e.pearlInnerDex.get(l,u))!=null&&h.some((d,y)=>y!==t.id&&e.plans[y].kind!=="hall"))return null;const f=Ke.find(([d,y])=>{var _,$;return((_=e.tiles.get(l+d,u+y))==null?void 0:_.isWall)&&(($=e.pearlInnerDex.get(l+d,u+y))==null?void 0:$[t.id])===a});return f?[l,u,f]:null}));return n.shuffle(s).filter((l,u)=>u<r).map(([l,u,[c,f]])=>{const h=l+n.uniform({max:c===0?1:.25})+(c>0?.75:0),d=u+n.uniform({max:f===0?1:.25})+(f>0?.75:0),y=l+(c===0?n.uniform({min:-2,max:2}):c*-5),_=u+(f===0?n.uniform({min:-2,max:2}):f*-5);return Br({x:h,y:d,aimedAt:[y,_]})})}const GU={rock:(e,t,r)=>!r.isFluid,ice:(e,t,r)=>r!==S.LAVA,lava:(e,t,r)=>r!==S.WATER},VU={inner:zU,outer:UU};function qi({cavern:e,plan:t,creatureFactory:r},n){var i;if(n.force||e.context.hasMonsters&&((i=Rn(e).metadata)==null?void 0:i.tag)!=="pandora"){const o=Yi(e.context.biome),a=GU[e.context.biome];return VU[n.placement??"outer"](e,t,{...n,filterFn:a}).map(s=>r.create({...s,planId:t.id,template:o,sleep:!0}))}return[]}function ka(e,t){const r=e.cavern.dice.placeSlugHoles(e.plan.id),n=(t==null?void 0:t.count)??(r.chance(e.cavern.context[`${e.plan.kind}HasSlugHoleChance`])?1:0);let i=(t==null?void 0:t.placements)??e.plan.innerPearl.flatMap(o=>o.filter(a=>e.tiles.get(...a)===S.FLOOR));for(let o=1;o<=n&&i.length;o++){const[a,s]=r.uniformChoice(i);if(e.tiles.set(a,s,S.SLUG_HOLE),o===n)return;i=i.filter(([l,u])=>l<a-1||l>a+1||u<s-1||u>s+1)}}class KU{constructor(t){this.cooldown=t}get key(){return this.cooldown.toFixed(1)}}class gg{constructor(t,r){this.cooldown=t,this.initialDelay=r}get key(){return`${this.cooldown.toFixed(1)}/${this.initialDelay.toFixed(1)}`}}const yg=10;function jd(e,{cavern:t,plan:r,landslides:n}){const i=t.dice.placeLandslides(r.id),o=i.uniform({min:.2,max:.8});r.innerPearl.flatMap(a=>a).filter(a=>{var s;return!n.get(...a)&&((s=t.tiles.get(...a))==null?void 0:s.canLandslide)&&i.chance(o)}).forEach(a=>{const s=i.betaInt({...e,a:yg*o,b:yg*(1-o)});n.set(...a,new KU(s))})}function YU({cavern:e,plan:t,erosion:r}){t.innerPearl.forEach(n=>n.forEach(i=>{var o;((o=e.tiles.get(...i))==null?void 0:o.isFluid)===!1&&r.set(...i,!0)}))}function Bd({cavern:e,plan:t,erosion:r},n){const i=new gg((n==null?void 0:n.cooldown)??30,(n==null?void 0:n.initialDelay)??10),o=new gg((n==null?void 0:n.cooldown)??30,(n==null?void 0:n.initialDelayStartsExposed)??120);t.innerPearl.forEach(a=>a.forEach(s=>{var l;if(e.erosion.get(...s)){const u=((l=e.discoveryZones.get(...s))==null?void 0:l.openOnSpawn)&&Ke.some(c=>e.tiles.get(...tr(s,c))===S.LAVA);r.set(...s,u?o:i)}}))}function wg(e){switch(e){case S.SOLID_ROCK:case S.HARD_ROCK:case S.LOOSE_ROCK:case S.DIRT:return!0;default:return!1}}function T$(e,t,r,n,i,o,a){for(let l=a;l>0;){const u=e(),c=n.get(...u);if(l>=4&&(!c||t>0&&wg(c)&&r.chance(t))){n.set(...u,o),l-=4;continue}c||n.set(...u,S.LOOSE_ROCK);const f=(i.get(...u)??0)+1;f>=4&&t>=0&&wg(c??S.LOOSE_ROCK)?(n.set(...u,o),i.set(...u,f-4)):i.set(...u,f),l--}}function $t(e,t){const r=e.cavern.dice.placeCrystals(e.plan.id);return T$((t==null?void 0:t.getRandomTile)??M$(r,e),(t==null?void 0:t.seamBias)??e.cavern.context[`${e.plan.kind}CrystalSeamBias`],r,e.tiles,e.crystals,S.CRYSTAL_SEAM,(t==null?void 0:t.count)??e.plan.crystals-e.plan.architect.crystalsFromMetadata(e.plan.metadata))}function L$(e,t){const r=e.cavern.dice.placeOre(e.plan.id);return T$((t==null?void 0:t.getRandomTile)??M$(r,e),(t==null?void 0:t.seamBias)??e.cavern.context[`${e.plan.kind}OreSeamBias`],r,e.tiles,e.ore,S.ORE_SEAM,(t==null?void 0:t.count)??e.plan.ore)}function I$(e){return e.plan.outerPearl.flatMap(t=>t.map(r=>{const n=e.tiles.get(...r)??S.SOLID_ROCK;if(n.hardness>=Re.SOLID&&n!==S.RECHARGE_SEAM){let i=0,o=0;for(const s of Ke){const l=e.tiles.get(...tr(r,s))??S.SOLID_ROCK;l===S.RECHARGE_SEAM?i++:l.hardness>=Re.SOLID&&o++}const a=i+o>=4?0:o;return{item:r,bid:a}}return n.hardness===Re.DIRT||n.hardness===Re.LOOSE||n.hardness===Re.HARD?{item:r,bid:1}:{item:r,bid:0}}).filter(({bid:r})=>r>0).map(({item:r,bid:n})=>{var a,s;const i=((a=e.cavern.pearlInnerDex.get(...r))==null?void 0:a.reduce(l=>l+1,0))??0,o=((s=e.cavern.pearlOuterDex.get(...r))==null?void 0:s.reduce(l=>l+1,0))??0;return{item:r,bid:n/(i+o)}}))}function k$(e,t){return e.filter(r=>{const n=t.get(...r);return n&&(n.hardness===Re.DIRT||n.hardness===Re.LOOSE||n.hardness===Re.HARD)})}function M$(e,t){const r=k$(t.plan.innerPearl.flatMap(i=>i),t.tiles);if(r.length>0)return()=>e.uniformChoice(r);const n=I$(t);if(n)return()=>e.weightedChoice(n);throw new Error("No place to put resource!")}function mo(e){return t=>{const r=t.cavern.dice.placeRechargeSeam(t.plan.id),n=e??(r.chance(t.plan.kind==="cave"?t.cavern.context.caveHasRechargeSeamChance:t.cavern.context.hallHasRechargeSeamChance)?1:0);if(n>0)for(let i=0;i<n;i++){const o=I$(t).filter(({bid:a})=>a>=1);if(o.length===0)console.warn("Failed to place recharge seam in plan %d",t.plan.id);else{const[a,s]=r.weightedChoice(o);t.tiles.set(a,s,S.RECHARGE_SEAM)}}}}function Dd({tiles:e,crystals:t,buildings:r,vehicles:n}){let i=0;return e==null||e.forEach(o=>i+=o.crystalYield),t==null||t.forEach(o=>i+=o),r==null||r.forEach(o=>i+=o.template.crystals),n==null||n.forEach(o=>i+=o.template.crystals),i}function N$({tiles:e,ore:t}){let r=0;return e==null||e.forEach(n=>r+=n.oreYield),t==null||t.forEach(n=>r+=n),r}const[kt,Ma]=[{hasLandslidesChance:"caveHasLandslidesChance",landslideCooldownRange:"caveLandslideCooldownRange",baroqueness:"caveBaroqueness"},{hasLandslidesChance:"hallHasLandslidesChance",landslideCooldownRange:"hallLandslideCooldownRange",baroqueness:"hallBaroqueness"}].map(({hasLandslidesChance:e,landslideCooldownRange:t,baroqueness:r})=>({baroqueness:({cavern:n})=>n.context[r],crystalsToPlace:({plan:n})=>n.crystalRichness*n.perimeter,crystalsFromMetadata:()=>0,ore:({plan:n})=>n.oreRichness*n.perimeter,prime:()=>{},placeRechargeSeam:mo(),placeBuildings:()=>({}),placeCrystals:n=>$t(n),placeOre:n=>L$(n),placeSlugHoles(n){return ka(n)},preErode:n=>YU(n),placeLandslides:n=>{n.cavern.dice.placeLandslides(n.plan.id).chance(n.cavern.context[e])&&jd(n.cavern.context[t],n)},placeErosion:n=>Bd(n),placeEntities:()=>({}),maxSlope:void 0,claimEventOnDiscover:()=>[]})),hu={...kt,crystalsToPlace:()=>5,placeRechargeSeam:mo(1),placeBuildings:e=>{const[t]=Fd({queue:[{bt:de,args:{teleportAtStart:!0},required:!0}]},e);t.foundation.forEach(([n,i])=>e.tiles.set(n,i,S.FOUNDATION)),e.openCaveFlags.set(...t.foundation[0],!0);const r={buildings:[t]};return e.plan.id===e.cavern.anchor&&(r.cameraPosition=Br({x:t.x,y:t.y,yaw:t.yaw+Math.PI*.75,pitch:Math.PI/4})),r},maxSlope:15};function $g(e,t,r){return e.some(n=>t.intersects[n.id]&&n.fluid===r)}function Vt(e,t,r){return!e.some(n=>t.intersects[n.id]&&n.fluid!==r)}function jt(e){return e.intersects.reduce((t,r)=>t+(r?1:0),0)<=1}function ue(e,t){const r={};return t.forEach(n=>r[n]=`${e}_${n}`),r}function z(e,[t,r]){return`${r-e.top},${t-e.left}`}function Xi(...e){return e.filter(t=>t).join(`
`)}function qU(e,t,r){return r?`((${e}))[${t}][${r}];`:`((${e}))${t};`}function vc(e,...t){return`${e}::;
${Xi(...t)}
`}function XU(e){return e.replace(/[\\"]+/g,"").replace(/\s*\n[\s\n]*/g," ")}function QU(e){let t=0;const r=[],n={byCondition:{},withCalls:{},inOrder:[]},i=[];function o(l,u,c){const f=Xi(...c);if(!f)return;if(n.byCondition[u]){n.byCondition[u][`${l}s`].push(f);return}const d=l==="if"?{condition:u,ifs:[f],whens:[]}:{condition:u,ifs:[],whens:[f]};n.inOrder.push(d),n.byCondition[u]=d}function a({condition:l,ifs:u,whens:c}){if(u.length&&c.length){const f=`tf${t++}`;return[`int ${f}=0`,s("if",`${f}>0`,u),s("when",l,[`${f}=1;`,...c])].join(`
`)}else{if(u.length)return s("if",l,u);if(c.length)return s("when",l,c)}return""}function s(l,u,c){const f=[],h=[];if(c.forEach(d=>{if(d.includes(`
`)){const y=`t${t++}`;f.push(`${y};`),h.push(vc(y,d))}else f.push(d)}),f.length>1){const d=Xi(...f);if(d in n.withCalls)f.length=1,f[0]=`${n.withCalls[d]};`;else{const y=`tw${t++}`;h.unshift(vc(y,d)),n.withCalls[d]=y,f.length=1,f[0]=`${y};`}}return[`${l}(${u})[${f[0].substring(0,f[0].length-1)}]`,...h].join(`
`)}return{build(){if(t>0)throw new Error("Already used");return[...r,...n.inOrder.map(a),...i].join(`
`)},declareInt(l,u){return r.push(`int ${l}=${u.toFixed()}`),l},declareFloat(l,u){return r.push(`float ${l}=${u}`),l},declareString(l,u){let c="";if(typeof u=="string")c=u;else{const f="rng"in u?u.rng:e.dice.lore(u.die),h={...e.lore.state,..."state"in u?u.state:{}},d={...e.lore.format,..."format"in u?u.format:{}};c=u.pg.generate(f,h,d)}return r.push(`string ${l}="${XU(c)}"`),l},declareArrow(l){return r.push(`arrow ${l}`),l},declareBuilding(l){return r.push(`building ${l}`),l},declareCreature(l,u){return r.push(`creature ${l}${u?`=${u.id}`:""}`),l},if:(l,...u)=>{o("if",l,u)},when:(l,...u)=>{o("when",l,u)},event(l,...u){i.push(vc(l,...u))},onInit(...l){o("if","time:0",l)}}}var Qi=(e=>(e[e.CRITICAL=0]="CRITICAL",e[e.OBJECTIVE=1]="OBJECTIVE",e[e.HINT=2]="HINT",e[e.TRIVIAL=3]="TRIVIAL",e))(Qi||{});const He=ue("objectives",["res","met","won"]);function ZU({cavern:{objectives:e},sb:t}){const r=["crystals","ore","studs"].filter(i=>e[i]>0),n=(r.length?1:0)+e.variables.length;t.declareInt(He.met,0),t.declareInt(He.won,0),r.length&&(r.length===1?t.if(`${r[0]}>=${e[r[0]]}`,`${He.met}+=1;`):(t.declareInt(He.res,0),r.forEach(i=>t.when(`${i}>=${e[i]}`,...r.map(o=>o!==i&&`((${o}<${e[o]}))return;`),`${He.res}=1;`)),t.if(`${He.res}>0`,`${He.met}+=1;`))),t.if(`${He.met}>=${n}`,`${He.won}=1;`)}function JU(e){return e.map(t=>({width:1,shrink:0,grow:0,...t}))}function _g(e,t){t=t+1;const r=e.reduce((u,{width:c})=>u+c,0),n=e.reduce((u,{shrink:c})=>u+c,0),i=e.reduce((u,{grow:c})=>u+c,0);let o=0,a=0;t<r&&n>0?a=(r-t)/e.reduce((u,{width:c,shrink:f})=>u+c*f,0):t>r&&i>0&&(o=(t-r)/i);const s=[];let l=0;for(const{of:u,width:c,shrink:f,grow:h}of e)for(l=l+c*Math.max(0,1-f*a)+h*o;Math.round(l)>0;)s.push(u),l-=1;return s}function Et({floor:e,dirt:t,looseRock:r,hardRock:n,solidRock:i,water:o,lava:a}){const s=[];return e&&(s[S.FLOOR.id]=e),t&&(s[S.DIRT.id]=t),r&&(s[S.LOOSE_ROCK.id]=r),n&&(s[S.HARD_ROCK.id]=n),i&&(s[S.SOLID_ROCK.id]=i),o&&(s[S.WATER.id]=o),a&&(s[S.LAVA.id]=a),l=>s[l.id]??null}function Ln(e){return Et({floor:e,dirt:e,looseRock:e,hardRock:e,solidRock:e})}const be=(...e)=>(t,r)=>r.weightedChoice(e)(t,r),ur={VOID:()=>null,ALWAYS_FLOOR:()=>S.FLOOR,ALWAYS_DIRT:()=>S.DIRT,ALWAYS_LOOSE_ROCK:()=>S.LOOSE_ROCK,ALWAYS_HARD_ROCK:()=>S.HARD_ROCK,ALWAYS_SOLID_ROCK:()=>S.SOLID_ROCK,ALWAYS_WATER:()=>S.WATER,ALWAYS_LAVA:()=>S.LAVA,AT_MOST_DIRT:Et({looseRock:S.DIRT,hardRock:S.DIRT,solidRock:S.DIRT}),AT_MOST_LOOSE_ROCK:Et({hardRock:S.LOOSE_ROCK,solidRock:S.LOOSE_ROCK}),AT_MOST_HARD_ROCK:Et({solidRock:S.HARD_ROCK}),AT_LEAST_DIRT:Et({floor:S.DIRT}),AT_LEAST_LOOSE_ROCK:Et({floor:S.LOOSE_ROCK,dirt:S.LOOSE_ROCK}),AT_LEAST_HARD_ROCK:Et({floor:S.HARD_ROCK,dirt:S.HARD_ROCK,looseRock:S.HARD_ROCK}),FLOOR:Ln(S.FLOOR),DIRT:Ln(S.DIRT),LOOSE_ROCK:Ln(S.LOOSE_ROCK),HARD_ROCK:Ln(S.HARD_ROCK),SOLID_ROCK:Ln(S.SOLID_ROCK),WATER:Ln(S.WATER),LAVA:Ln(S.LAVA),DIRT_OR_LOOSE_ROCK:Et({floor:S.DIRT,hardRock:S.LOOSE_ROCK,solidRock:S.LOOSE_ROCK}),LOOSE_OR_HARD_ROCK:Et({floor:S.LOOSE_ROCK,dirt:S.LOOSE_ROCK,solidRock:S.HARD_ROCK}),BRIDGE_ON_WATER:Et({dirt:S.FLOOR,looseRock:S.FLOOR,hardRock:S.FLOOR,solidRock:S.WATER}),BRIDGE_ON_LAVA:Et({dirt:S.FLOOR,looseRock:S.FLOOR,hardRock:S.FLOOR,solidRock:S.LAVA})},w={...ur,MIX_DIRT_LOOSE_ROCK:be({item:ur.DIRT,bid:1},{item:ur.LOOSE_ROCK,bid:4}),MIX_AT_MOST_DIRT_LOOSE_ROCK:be({item:ur.AT_MOST_DIRT,bid:1},{item:ur.AT_MOST_LOOSE_ROCK,bid:4}),MIX_LOOSE_HARD_ROCK:be({item:ur.LOOSE_ROCK,bid:4},{item:ur.LOOSE_OR_HARD_ROCK,bid:1}),MIX_FRINGE:be({item:ur.AT_MOST_LOOSE_ROCK,bid:10},{item:ur.AT_MOST_HARD_ROCK,bid:1},{item:ur.VOID,bid:4})};function N(...e){const t=JU(e);return{roughExtent:t[t.length-1].of===w.VOID?i=>{const o=_g(t,i.pearlRadius);for(let a=o.length-1;a>0;a--)if(o[a]!==w.VOID)return a;return 0}:i=>i.pearlRadius,rough:({cavern:i,plan:o,tiles:a})=>{const s=i.dice.rough(o.id),l=_g(t,o.pearlRadius);o.innerPearl.forEach((u,c)=>{u.forEach(([f,h])=>{const d=l[c](a.get(f,h)??S.SOLID_ROCK,s);d&&a.set(f,h,d)})})}}}const ji="buildAndPower",Sg={...kt,maxSlope:15,placeBuildings({cavern:e,plan:t,openCaveFlags:r}){return t.innerPearl.some(n=>n.some(i=>{var o;return((o=e.tiles.get(...i))==null?void 0:o.isWall)===!1?(r.set(...i,!0),!0):!1})),{}}};function Eg(e,t,r,n,i){const o=ue(`gBuPw${e.inspectAbbrev}`,["built","checkPower","doneCount","done","msgA","msgB","msgC"]),a={tag:ji,template:e},s=l=>ue(`p${l.id}BuPw${e.inspectAbbrev}`,["arrow","building","onBuild"]);return{prime:()=>a,placeRechargeSeam:mo(3),objectives({cavern:l}){const u=l.plans.filter(c=>{var f;return((f=c.metadata)==null?void 0:f.tag)===ji&&c.metadata.template===e}).length;return{variables:[{condition:`${o.done}>0`,description:Fe(["Build and power a ",i>1?`Level ${i} `:"",e.name," in ",u===1&&"the marked cave.",u===2&&"both marked caves.",u>2&&`all ${u} marked caves.`]).join("")}],sufficient:!0}},scriptGlobals({cavern:l,sb:u}){const c=l.plans.filter(f=>{var h;return((h=f.metadata)==null?void 0:h.tag)===ji&&f.metadata.template===e}).map(f=>s(f));u.declareBuilding(o.built),u.when(`${e.id}.${i>1?"levelup":"new"}`,`savebuilding:${o.built};`,i>1&&`((${o.built}.level<${i}))return;`,...c.map(f=>`${f.onBuild};`)),u.declareInt(o.checkPower,0),u.declareInt(o.doneCount,0),c.forEach(f=>{u.declareArrow(f.arrow),u.declareBuilding(f.building)}),u.when(`${e.id}.poweron`,`${o.checkPower}+=1;`),u.when(`${e.id}.poweroff`,`${o.checkPower}+=1;`),u.when(`${o.checkPower}==1`,`${o.doneCount}=0;`,...c.flatMap(f=>[`((${f.building}.powered>0))[hidearrow:${f.arrow}][showarrow:${f.building}.row,${f.building}.column,${f.arrow}];`,`((${f.building}.powered>0))${o.doneCount}+=1;`]),`((${o.checkPower}>1))[${o.checkPower}=1][${o.checkPower}=0];`),c.length>1&&(u.declareString(o.msgA,{die:Oe.buildAndPower,pg:t,format:{remainingCount:c.length-1}}),u.if(`${o.doneCount}==1`,`msg:${o.msgA};`)),c.length>2&&(u.declareString(o.msgB,{die:Oe.buildAndPower,pg:r,format:{template:e}}),u.if(`${o.doneCount}==${c.length-1}`,`msg:${o.msgB};`)),u.declareInt(o.done,0),u.declareString(o.msgC,{die:Oe.buildAndPower,pg:n}),u.if(`${o.doneCount}>=${c.length}`,`${He.met}+=1;`,`msg:${o.msgC};`,"wait:2;",`${o.done}=1;`)},script({cavern:l,plan:u,sb:c}){const f=s(u);if(u.path.baseplates.length>1)throw new Error("Plan must have one baseplate.");const h=u.path.baseplates[0],d=u.innerPearl.flatMap($=>$).find($=>{var v;return((v=l.tiles.get(...$))==null?void 0:v.isWall)===!1});if(!d)throw new Error("No non-wall points found");const y=z(l,d),_=l.discoveryZones.get(...d).openOnSpawn;c.if(`${_?"time:0":`change:${y}`}`,`showarrow:${y},${f.arrow};`),c.event(f.onBuild,`((${o.built}.column<${h.left-l.left}))return;`,`((${o.built}.column>=${h.right-l.left}))return;`,`((${o.built}.row<${h.top-l.top}))return;`,`((${o.built}.row>=${h.bottom-l.top}))return;`,`savebuilding:${f.building};`,`${o.checkPower}+=1;`)}}}function Ag(e,t,r,n,i){var s;let o=0,a=0;for(const l of e)if(l.kind==="cave"&&!l.architect)a++;else if(((s=l.metadata)==null?void 0:s.tag)===ji&&(l.metadata.template!==t||(o+=1,o>=r)))return 0;return o>0?i:a>=r*2?n:0}const e9=[{name:"BuildAndPower.GC",...Sg,...Eg(yn,wU,$U,_U,5),...N({of:w.FLOOR,width:2,grow:1},{of:w.MIX_DIRT_LOOSE_ROCK,grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.5},{of:w.VOID,width:0,grow:.5}),caveBid:({cavern:e,plans:t,plan:r,hops:n})=>{const i=t[e.anchor].metadata;return!r.fluid&&r.pearlRadius>2&&r.pearlRadius<10&&r.path.baseplates.length===1&&!((i==null?void 0:i.tag)==="hq"&&i.special==="fixedComplete")&&(i==null?void 0:i.tag)!=="mobFarm"&&(i==null?void 0:i.tag)!=="pandora"&&Vt(t,r,null)&&n.length>5&&!n.some(o=>{var a;return((a=t[o].metadata)==null?void 0:a.tag)===ji})&&e.context.planWhimsy*Ag(t,yn,3,.04,10)}},{name:"BuildAndPower.SS.ForGasLeak",...Sg,...Eg(Ce,SU,EU,AU,1),...N({of:w.ALWAYS_FLOOR,width:2},{of:w.LAVA,width:2,grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.5},{of:w.HARD_ROCK,width:0,grow:.5},{of:w.MIX_FRINGE}),caveBid:({cavern:e,plans:t,plan:r,hops:n})=>{const i=t[e.anchor].metadata;return r.fluid===S.LAVA&&r.pearlRadius>3&&r.path.baseplates.length===1&&(i==null?void 0:i.tag)==="hq"&&i.special==="gasLeak"&&n.length>3&&!n.some(o=>{var a;return((a=t[o].metadata)==null?void 0:a.tag)===ji})&&e.context.planWhimsy*Ag(t,Ce,3,10,5)},preErode:({cavern:e,plan:t,erosion:r})=>{t.innerPearl.forEach((n,i)=>{i<2?n.forEach(o=>{r.delete(...o)}):n.forEach(o=>{var a;((a=e.tiles.get(...o))==null?void 0:a.isFluid)===!1&&r.set(...o,!0)})})},placeErosion:e=>Bd(e,{cooldown:45})}],Mr=11102230246251565e-32,Xe=134217729,t9=(3+8*Mr)*Mr;function gc(e,t,r,n,i){let o,a,s,l,u=t[0],c=n[0],f=0,h=0;c>u==c>-u?(o=u,u=t[++f]):(o=c,c=n[++h]);let d=0;if(f<e&&h<r)for(c>u==c>-u?(a=u+o,s=o-(a-u),u=t[++f]):(a=c+o,s=o-(a-c),c=n[++h]),o=a,s!==0&&(i[d++]=s);f<e&&h<r;)c>u==c>-u?(a=o+u,l=a-o,s=o-(a-l)+(u-l),u=t[++f]):(a=o+c,l=a-o,s=o-(a-l)+(c-l),c=n[++h]),o=a,s!==0&&(i[d++]=s);for(;f<e;)a=o+u,l=a-o,s=o-(a-l)+(u-l),u=t[++f],o=a,s!==0&&(i[d++]=s);for(;h<r;)a=o+c,l=a-o,s=o-(a-l)+(c-l),c=n[++h],o=a,s!==0&&(i[d++]=s);return(o!==0||d===0)&&(i[d++]=o),d}function r9(e,t){let r=t[0];for(let n=1;n<e;n++)r+=t[n];return r}function Na(e){return new Float64Array(e)}const n9=(3+16*Mr)*Mr,i9=(2+12*Mr)*Mr,o9=(9+64*Mr)*Mr*Mr,fi=Na(4),Og=Na(8),Rg=Na(12),bg=Na(16),tt=Na(4);function a9(e,t,r,n,i,o,a){let s,l,u,c,f,h,d,y,_,$,v,m,g,E,O,R,b,A;const x=e-i,T=r-i,I=t-o,B=n-o;E=x*B,h=Xe*x,d=h-(h-x),y=x-d,h=Xe*B,_=h-(h-B),$=B-_,O=y*$-(E-d*_-y*_-d*$),R=I*T,h=Xe*I,d=h-(h-I),y=I-d,h=Xe*T,_=h-(h-T),$=T-_,b=y*$-(R-d*_-y*_-d*$),v=O-b,f=O-v,fi[0]=O-(v+f)+(f-b),m=E+v,f=m-E,g=E-(m-f)+(v-f),v=g-R,f=g-v,fi[1]=g-(v+f)+(f-R),A=m+v,f=A-m,fi[2]=m-(A-f)+(v-f),fi[3]=A;let G=r9(4,fi),Te=i9*a;if(G>=Te||-G>=Te||(f=e-x,s=e-(x+f)+(f-i),f=r-T,u=r-(T+f)+(f-i),f=t-I,l=t-(I+f)+(f-o),f=n-B,c=n-(B+f)+(f-o),s===0&&l===0&&u===0&&c===0)||(Te=o9*a+t9*Math.abs(G),G+=x*c+B*s-(I*u+T*l),G>=Te||-G>=Te))return G;E=s*B,h=Xe*s,d=h-(h-s),y=s-d,h=Xe*B,_=h-(h-B),$=B-_,O=y*$-(E-d*_-y*_-d*$),R=l*T,h=Xe*l,d=h-(h-l),y=l-d,h=Xe*T,_=h-(h-T),$=T-_,b=y*$-(R-d*_-y*_-d*$),v=O-b,f=O-v,tt[0]=O-(v+f)+(f-b),m=E+v,f=m-E,g=E-(m-f)+(v-f),v=g-R,f=g-v,tt[1]=g-(v+f)+(f-R),A=m+v,f=A-m,tt[2]=m-(A-f)+(v-f),tt[3]=A;const St=gc(4,fi,4,tt,Og);E=x*c,h=Xe*x,d=h-(h-x),y=x-d,h=Xe*c,_=h-(h-c),$=c-_,O=y*$-(E-d*_-y*_-d*$),R=I*u,h=Xe*I,d=h-(h-I),y=I-d,h=Xe*u,_=h-(h-u),$=u-_,b=y*$-(R-d*_-y*_-d*$),v=O-b,f=O-v,tt[0]=O-(v+f)+(f-b),m=E+v,f=m-E,g=E-(m-f)+(v-f),v=g-R,f=g-v,tt[1]=g-(v+f)+(f-R),A=m+v,f=A-m,tt[2]=m-(A-f)+(v-f),tt[3]=A;const Q=gc(St,Og,4,tt,Rg);E=s*c,h=Xe*s,d=h-(h-s),y=s-d,h=Xe*c,_=h-(h-c),$=c-_,O=y*$-(E-d*_-y*_-d*$),R=l*u,h=Xe*l,d=h-(h-l),y=l-d,h=Xe*u,_=h-(h-u),$=u-_,b=y*$-(R-d*_-y*_-d*$),v=O-b,f=O-v,tt[0]=O-(v+f)+(f-b),m=E+v,f=m-E,g=E-(m-f)+(v-f),v=g-R,f=g-v,tt[1]=g-(v+f)+(f-R),A=m+v,f=A-m,tt[2]=m-(A-f)+(v-f),tt[3]=A;const ye=gc(Q,Rg,4,tt,bg);return bg[ye-1]}function gs(e,t,r,n,i,o){const a=(t-o)*(r-i),s=(e-i)*(n-o),l=a-s,u=Math.abs(a+s);return Math.abs(l)>=n9*u?l:-a9(e,t,r,n,i,o,u)}const xg=Math.pow(2,-52),ys=new Uint32Array(512);class du{static from(t,r=f9,n=h9){const i=t.length,o=new Float64Array(i*2);for(let a=0;a<i;a++){const s=t[a];o[2*a]=r(s),o[2*a+1]=n(s)}return new du(o)}constructor(t){const r=t.length>>1;if(r>0&&typeof t[0]!="number")throw new Error("Expected coords to contain numbers.");this.coords=t;const n=Math.max(2*r-5,0);this._triangles=new Uint32Array(n*3),this._halfedges=new Int32Array(n*3),this._hashSize=Math.ceil(Math.sqrt(r)),this._hullPrev=new Uint32Array(r),this._hullNext=new Uint32Array(r),this._hullTri=new Uint32Array(r),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(r),this._dists=new Float64Array(r),this.update()}update(){const{coords:t,_hullPrev:r,_hullNext:n,_hullTri:i,_hullHash:o}=this,a=t.length>>1;let s=1/0,l=1/0,u=-1/0,c=-1/0;for(let x=0;x<a;x++){const T=t[2*x],I=t[2*x+1];T<s&&(s=T),I<l&&(l=I),T>u&&(u=T),I>c&&(c=I),this._ids[x]=x}const f=(s+u)/2,h=(l+c)/2;let d,y,_;for(let x=0,T=1/0;x<a;x++){const I=yc(f,h,t[2*x],t[2*x+1]);I<T&&(d=x,T=I)}const $=t[2*d],v=t[2*d+1];for(let x=0,T=1/0;x<a;x++){if(x===d)continue;const I=yc($,v,t[2*x],t[2*x+1]);I<T&&I>0&&(y=x,T=I)}let m=t[2*y],g=t[2*y+1],E=1/0;for(let x=0;x<a;x++){if(x===d||x===y)continue;const T=u9($,v,m,g,t[2*x],t[2*x+1]);T<E&&(_=x,E=T)}let O=t[2*_],R=t[2*_+1];if(E===1/0){for(let I=0;I<a;I++)this._dists[I]=t[2*I]-t[0]||t[2*I+1]-t[1];Ti(this._ids,this._dists,0,a-1);const x=new Uint32Array(a);let T=0;for(let I=0,B=-1/0;I<a;I++){const G=this._ids[I],Te=this._dists[G];Te>B&&(x[T++]=G,B=Te)}this.hull=x.subarray(0,T),this.triangles=new Uint32Array(0),this.halfedges=new Uint32Array(0);return}if(gs($,v,m,g,O,R)<0){const x=y,T=m,I=g;y=_,m=O,g=R,_=x,O=T,R=I}const b=c9($,v,m,g,O,R);this._cx=b.x,this._cy=b.y;for(let x=0;x<a;x++)this._dists[x]=yc(t[2*x],t[2*x+1],b.x,b.y);Ti(this._ids,this._dists,0,a-1),this._hullStart=d;let A=3;n[d]=r[_]=y,n[y]=r[d]=_,n[_]=r[y]=d,i[d]=0,i[y]=1,i[_]=2,o.fill(-1),o[this._hashKey($,v)]=d,o[this._hashKey(m,g)]=y,o[this._hashKey(O,R)]=_,this.trianglesLen=0,this._addTriangle(d,y,_,-1,-1,-1);for(let x=0,T,I;x<this._ids.length;x++){const B=this._ids[x],G=t[2*B],Te=t[2*B+1];if(x>0&&Math.abs(G-T)<=xg&&Math.abs(Te-I)<=xg||(T=G,I=Te,B===d||B===y||B===_))continue;let St=0;for(let U=0,pe=this._hashKey(G,Te);U<this._hashSize&&(St=o[(pe+U)%this._hashSize],!(St!==-1&&St!==n[St]));U++);St=r[St];let Q=St,ye;for(;ye=n[Q],gs(G,Te,t[2*Q],t[2*Q+1],t[2*ye],t[2*ye+1])>=0;)if(Q=ye,Q===St){Q=-1;break}if(Q===-1)continue;let L=this._addTriangle(Q,B,n[Q],-1,-1,i[Q]);i[B]=this._legalize(L+2),i[Q]=L,A++;let j=n[Q];for(;ye=n[j],gs(G,Te,t[2*j],t[2*j+1],t[2*ye],t[2*ye+1])<0;)L=this._addTriangle(j,B,ye,i[B],-1,i[j]),i[B]=this._legalize(L+2),n[j]=j,A--,j=ye;if(Q===St)for(;ye=r[Q],gs(G,Te,t[2*ye],t[2*ye+1],t[2*Q],t[2*Q+1])<0;)L=this._addTriangle(ye,B,Q,-1,i[Q],i[ye]),this._legalize(L+2),i[ye]=L,n[Q]=Q,A--,Q=ye;this._hullStart=r[B]=Q,n[Q]=r[j]=B,n[B]=j,o[this._hashKey(G,Te)]=B,o[this._hashKey(t[2*Q],t[2*Q+1])]=Q}this.hull=new Uint32Array(A);for(let x=0,T=this._hullStart;x<A;x++)this.hull[x]=T,T=n[T];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,r){return Math.floor(s9(t-this._cx,r-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:r,_halfedges:n,coords:i}=this;let o=0,a=0;for(;;){const s=n[t],l=t-t%3;if(a=l+(t+2)%3,s===-1){if(o===0)break;t=ys[--o];continue}const u=s-s%3,c=l+(t+1)%3,f=u+(s+2)%3,h=r[a],d=r[t],y=r[c],_=r[f];if(l9(i[2*h],i[2*h+1],i[2*d],i[2*d+1],i[2*y],i[2*y+1],i[2*_],i[2*_+1])){r[t]=_,r[s]=h;const v=n[f];if(v===-1){let g=this._hullStart;do{if(this._hullTri[g]===f){this._hullTri[g]=t;break}g=this._hullPrev[g]}while(g!==this._hullStart)}this._link(t,v),this._link(s,n[a]),this._link(a,f);const m=u+(s+1)%3;o<ys.length&&(ys[o++]=m)}else{if(o===0)break;t=ys[--o]}}return a}_link(t,r){this._halfedges[t]=r,r!==-1&&(this._halfedges[r]=t)}_addTriangle(t,r,n,i,o,a){const s=this.trianglesLen;return this._triangles[s]=t,this._triangles[s+1]=r,this._triangles[s+2]=n,this._link(s,i),this._link(s+1,o),this._link(s+2,a),this.trianglesLen+=3,s}}function s9(e,t){const r=e/(Math.abs(e)+Math.abs(t));return(t>0?3-r:1+r)/4}function yc(e,t,r,n){const i=e-r,o=t-n;return i*i+o*o}function l9(e,t,r,n,i,o,a,s){const l=e-a,u=t-s,c=r-a,f=n-s,h=i-a,d=o-s,y=l*l+u*u,_=c*c+f*f,$=h*h+d*d;return l*(f*$-_*d)-u*(c*$-_*h)+y*(c*d-f*h)<0}function u9(e,t,r,n,i,o){const a=r-e,s=n-t,l=i-e,u=o-t,c=a*a+s*s,f=l*l+u*u,h=.5/(a*u-s*l),d=(u*c-s*f)*h,y=(a*f-l*c)*h;return d*d+y*y}function c9(e,t,r,n,i,o){const a=r-e,s=n-t,l=i-e,u=o-t,c=a*a+s*s,f=l*l+u*u,h=.5/(a*u-s*l),d=e+(u*c-s*f)*h,y=t+(a*f-l*c)*h;return{x:d,y}}function Ti(e,t,r,n){if(n-r<=20)for(let i=r+1;i<=n;i++){const o=e[i],a=t[o];let s=i-1;for(;s>=r&&t[e[s]]>a;)e[s+1]=e[s--];e[s+1]=o}else{const i=r+n>>1;let o=r+1,a=n;Co(e,i,o),t[e[r]]>t[e[n]]&&Co(e,r,n),t[e[o]]>t[e[n]]&&Co(e,o,n),t[e[r]]>t[e[o]]&&Co(e,r,o);const s=e[o],l=t[s];for(;;){do o++;while(t[e[o]]<l);do a--;while(t[e[a]]>l);if(a<o)break;Co(e,o,a)}e[r+1]=e[a],e[a]=s,n-o+1>=a-r?(Ti(e,t,o,n),Ti(e,t,r,a-1)):(Ti(e,t,r,a-1),Ti(e,t,o,n))}}function Co(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}function f9(e){return e[0]}function h9(e){return e[1]}function ma(e,t){for(let r=0;r<t.innerPearl.length;r++){const n=t.innerPearl[r];for(let i=0;i<n.length;i++){const o=n[i],a=e.discoveryZones.get(...o);if(a)return a.openOnSpawn?void 0:a.triggerPoint}}}const re=ue("gCrSp",["globalCooldown","airMiners","anchorHold","active","mob"]);function d9(e){return e.path.baseplates.map(t=>{const[r,n]=t.center;return{x:Math.floor(r),y:Math.floor(n),radius:t.pearlRadius}})}function p9(e,t,r){const n=[];for(;n.length<r;)n.push(...t.shuffle(e));return n.length=r,n}function m9(e,t){return t.outerPearl[0].filter(r=>e.tiles.get(...r))}function v9({cavern:e,sb:t}){!e.context.hasMonsters&&!e.context.hasSlugs||(e.context.globalHostilesCooldown>0&&(t.declareInt(re.globalCooldown,0),t.when(`${re.globalCooldown}==1`,`wait:${e.context.globalHostilesCooldown};`,`${re.globalCooldown}=0;`)),e.oxygen&&(t.declareInt(re.airMiners,0),t.when(`${Ce.id}.poweron`,`${re.airMiners}+=10;`),t.when(`${Ce.id}.poweroff`,`${re.airMiners}-=10;`)),e.anchorHoldCreatures&&t.declareInt(re.anchorHold,1),e.context.globalHostilesCap>0&&(t.declareInt(re.active,0),e.creatures.forEach(r=>{if(r.sleep){const n=`${re.mob}${r.id}`;t.declareCreature(n,r),t.if(`${n}.wake`,`${re.active}+=1;`)}}),[O$,R$,b$,x$].forEach(r=>{t.when(`${r.id}.dead`,`((${re.active}>0))${re.active}-=1;`)})))}function P$(e){var t;return e.context.hasMonsters&&((t=Rn(e).metadata)==null?void 0:t.tag)!=="pandora"}function sr(e,t){(t!=null&&t.force||P$(e.cavern))&&F$(e,{creature:Yi(e.cavern.context.biome),reArmMode:"automatic",rng:e.cavern.dice.monsterSpawnScript(e.plan.id),...t})}function pu(e,t){(t!=null&&t.force||e.cavern.context.hasSlugs)&&F$(e,{creature:x$,needCrystals:{base:1},reArmMode:"automatic",rng:e.cavern.dice.slugSpawnScript(e.plan.id),...t})}function F$({cavern:e,plan:t,sb:r},n){var c,f;const i=ue(`p${t.id}${n.creature.inspectAbbrev}Sp`,["arm","doCooldown","doTrip","doSpawn","emerge","hoardTrip","needCrystals"]),o=Math.min(n.waveSize??n.rng.betaInt({a:5,b:2,min:1,max:(n.meanWaveSize??t.monsterWaveSize)*1.25}),e.context.globalHostilesCap>0?e.context.globalHostilesCap:1/0),a={min:2/o,max:15/o},s=p9(n.emerges??d9(t),n.rng,o);r.declareInt(i.arm,0);const l=[n.initialCooldown&&`wait:random(${n.initialCooldown.min.toFixed(2)})(${n.initialCooldown.max.toFixed(2)});`,`${i.arm}=1;`,n.tripOnArmed&&`${i.doTrip};`];if(n.armEvent)r.event(n.armEvent,...l);else{const h=ma(e,t);h?r.if(`change:${z(e,h)}`,...l):r.onInit(...l)}const u=n.tripEvent??i.doTrip;if((n.tripPoints??m9(e,t)).forEach(h=>r.when(`enter:${z(e,h)}`,`${u};`)),(c=n.needCrystals)!=null&&c.increment&&r.declareInt(i.needCrystals,n.needCrystals.base),r.event(u,e.anchorHoldCreatures&&`((${re.anchorHold}>0))return;`,e.context.globalHostilesCap>0&&`((${re.active}>${e.context.globalHostilesCap-o}))return;`,e.oxygen&&n.needStableAir&&`((${re.airMiners}<miners))return;`,n.needCrystals&&`((crystals<${n.needCrystals.increment?i.needCrystals:n.needCrystals.base}))return;`,e.context.globalHostilesCooldown>0&&`((${re.globalCooldown}>0))return;`,`((${i.arm}==1))${i.arm}=2;`),r.when(`${i.arm}==2`,`${i.doSpawn};`),r.event(i.doSpawn,e.context.globalHostilesCap>0&&`${re.active}+=${o};`,e.context.globalHostilesCooldown>0&&`${re.globalCooldown}+=1;`,!!((f=n.needCrystals)!=null&&f.increment)&&`${i.needCrystals}=crystals+${n.needCrystals.increment};`,...s.map(h=>Xi(`wait:random(${a.min.toFixed(2)})(${a.max.toFixed(2)});`,`emerge:${z(e,[h.x,h.y])},A,${n.creature.id},${h.radius};`)),n.reArmMode!=="none"&&`${i.doCooldown};`),n.reArmMode!=="none"){n.reArmMode==="hoard"&&(r.declareInt(i.hoardTrip,0),t.innerPearl[0].forEach($=>r.when(`enter:${z(e,$)},${n.creature.id}`,`${i.hoardTrip}=1;`)));const h=n.spawnRate??t.monsterSpawnRate,d=60*o/h,y=d/4,_={min:d-y,max:d+y};r.event(i.doCooldown,n.reArmMode==="hoard"&&`${i.hoardTrip}=0;`,`wait:random(${_.min.toFixed(2)})(${_.max.toFixed(2)});`,n.reArmMode==="hoard"&&`((${i.hoardTrip}==0))return;`,`${i.arm}=1;`,n.tripOnArmed==="always"&&`${i.doTrip};`)}}const g9=.62;function wl(e,t){return({cavern:r,plan:n})=>({crystalsInBuildings:r.dice.prime(n.id).betaInt({a:1,b:1.75,min:3,max:e}),ruin:t,special:null,tag:"hq"})}const y9=[{bt:de}],Cg=[{bt:_t},{bt:_e},{bt:Ce}],w9=[{bt:Pd},{bt:yn},{bt:On}],$9=[{bt:cu},{bt:mn},{bt:mn},{bt:mn}];function _9(e,t,r){function n(){if(t&&!r)return Cg;const i=e.shuffle(Cg);return r&&(i[0]={...i[0],args:{...i[0].args,placeRubbleInstead:!0}}),i}return[...y9,...n(),...e.shuffle(w9),...e.shuffle($9)]}function Yn({discovered:e=!1,from:t=2,templates:r}){return n=>{var _;const i=n.plan.metadata.ruin,o=!n.plan.hops.length,a=n.cavern.dice.placeBuildings(n.plan.id),s=r?r(a):_9(a,o,i);let l=n.plan.metadata.crystalsInBuildings;const u=[];for(const $ of s){if((_=$.args)!=null&&_.placeRubbleInstead){u.push($);continue}if($.bt.crystals>0&&l<=0)break;($.bt===de?!0:!(l<$.bt.crystals||$.bt===On&&!n.plan.intersects.some((m,g)=>n.cavern.plans[g].fluid===S.WATER)))?(u.push($),l-=$.bt.crystals):i&&u.push({...$,args:{...$.args,placeRubbleInstead:!0}})}const c=Fd({from:t,queue:u},n);c.forEach($=>$.foundation.forEach(v=>n.tiles.set(...v,$.placeRubbleInstead?S.RUBBLE_1:S.FOUNDATION)));const f=new Set(c.flatMap($=>$.template.dependencies));for(let $=0;$<c.length;$++){const v=c[$];f.has(v.template)&&(c[$]={...v,level:2})}const h=$=>$.foundation[$.foundation.length-1],d=($,v)=>{for(const m of fo(h($),h(v)))n.tiles.get(...m)===S.FLOOR&&n.tiles.set(...m,i&&a.chance(g9)?S.WASTE_RUBBLE_4:S.POWER_PATH)};if(c.length>2){const $=c.flatMap(h),v=new du($);for(let m=0;m<v.triangles.length;m++)if(m>v.halfedges[m]){const g=c[v.triangles[m]],E=c[v.triangles[m+(m%3===2?-2:1)]];d(g,E)}}else c.length>1&&d(c[0],c[1]);i&&n.plan.innerPearl.forEach($=>$.forEach(v=>{n.tiles.get(...v)===S.FLOOR&&n.tiles.set(...v,a.betaChoice([S.FLOOR,S.WASTE_RUBBLE_1,S.WASTE_RUBBLE_2,S.WASTE_RUBBLE_3,S.WASTE_RUBBLE_4],{a:1,b:4}))})),e&&n.openCaveFlags.set(...c.find($=>!$.placeRubbleInstead).foundation[0],!0);const y=o?(()=>{const[$,v]=c.reduce(([m,g],E)=>[m+E.x,g+E.y],[0,0]);return Br({x:c[0].x,y:c[0].y,aimedAt:[$/c.length,v/c.length],pitch:Math.PI/4})})():void 0;return l>0&&$t(n,{count:l,seamBias:0}),{buildings:c.filter($=>!$.placeRubbleInstead),cameraPosition:y}}}const qn={...kt,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.FLOOR,width:0,grow:2},{of:w.DIRT,width:0,grow:.5},{of:w.DIRT_OR_LOOSE_ROCK,grow:.25},{of:w.MIX_LOOSE_HARD_ROCK,grow:.25}),crystalsFromMetadata:e=>e.crystalsInBuildings,placeRechargeSeam:mo(1),placeSlugHoles(e){e.cavern.context.hasSlugs&&ka(e,{count:2})},monsterSpawnScript:e=>sr(e,{initialCooldown:{min:120,max:240},needCrystals:{base:4},needStableAir:!0}),slugSpawnScript(e){return pu(e,{needCrystals:{base:5,increment:10},waveSize:2})},maxSlope:15},S9=Z("Found Crystal Hoard",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("Wow! This ought to do it!","You've found quite the haul here.","Our intel was accurate. Look at all those Energy Crystals!").then(e("Now, transport these Energy Crystals back to your base.","Bring this to your base to complete our mission!","Get this back to your base."),t("treasureCaveMany").then("With this, we have enough to complete our mission!","Collect all the Energy Crystals you've found and complete our mission!"),t("hasMonsters").then("I hope we can collect these without attracting too much attention.",({format:{enemies:a}})=>`Be careful, Cadet! This is surely enough to attract those ${a}.`)).then(t("treasureCaveOne","treasureCaveMany"),o).then(t("hasMonsters"),o).then(n)}),Tg=Z("Found HQ",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{const a=r.then("Our Rock Raider HQ is safe and sound!","Way to go, Cadet!"),s=r.then("You found the Rock Raider HQ.","There it is!",t("reachHq")),l=e(o,t("resourceObjective")).then(n);e(e(a,s).then("Now, ","Now you should be able to"),s.then(t("hasMonsters").then("Shore up the base defenses","Now, get some Electric Fences up")).then(". We need this base secure if we're going to",". Once the base is safe,",e("before the monsters find it too!",({format:{enemies:u}})=>`and keep it safe from those ${u}!`,"and hope those monsters don't cause any more damage!").then(o,t("lostMinersOne","lostMinersTogether","lostMinersApart")).then(l))).then(o,e(t("buildAndPowerGcOne").then("build that Geological Center"),t("buildAndPowerGcMultiple").then("build the Geological Centers"),t("buildAndPowerSsOne").then("build that Support Station"),t("buildAndPowerSsMultiple").then("build the Support Station")).then(e("and"),e("!").then(l))).then(e(t("lostMinersOne").then("find the lost Rock Raider!"),t("lostMinersTogether","lostMinersApart").then("find those lost Rock Raiders!")).then(l),t("resourceObjective").then(({format:{resourceGoal:u}})=>`collect ${u}.`,({format:{resourceGoalNamesOnly:u}})=>`get those ${u}.`).then(n))}),E9=Z("Found Vehicle left by Lost Miners",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(({format:{vehicle:a}})=>`Look! A ${a.template.name}!`,({format:{vehicle:a}})=>`You found a missing ${a.template.name}!`,"Hmm. That doesn't belong there.").then("They must be nearby.","They must have passed this way.","They should be close.","You must be getting warmer.").then(n)}),A9=Z("Found Lost Miners",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(t("foundMinersOne").then("Look! It's one of the lost Rock Radiers!","You found a lost Rock Raider!","You found one of the lost Rock Raiders!"),t("foundMinersTogether").then(({format:{foundMiners:a}})=>`Look at that! ${xe(a)} of the lost Rock Raiders are here, safely together.`,({format:{foundMiners:a}})=>`That's ${xe(a)} Rock Raiders found!`,({format:{foundMiners:a}})=>`You found ${xe(a)} of them here!`)).then(o,"Keep going!","Keep searching, Cadet.").then(({format:{lostMiners:a}})=>`We need to find ${Ci(a,s=>`all ${s}`)} before we can leave.`).then(n)}),O9=Z("Found All Lost Miners",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(({format:{lostMiners:a}})=>`And that makes ${xe(a)} Rock Raiders found!`,({format:{lostMiners:a}})=>`You found ${Ci(a,s=>`all ${s}`)} Rock Raiders!`,({format:{lostMiners:a}})=>`That's all ${Ci(a,s=>`all ${s}`)} Rock Raiders found!`,t("lostMinersOne").then("Look! It's the lost Rock Raider!","You found the missing Rock Raider!"),t("lostMinersTogether").then(({format:{lostMiners:a}})=>`${Ci(a,s=>`the ${s}`)} Rock Raiders are right here, safe and sound!`,({format:{lostMiners:a}})=>`You found ${Ci(a,s=>`all ${s}`)} Rock Raiders!`,"That's all of the missing Rock Raiders found!")).then(o,t("resourceObjective").then(({format:{resourceGoal:a}})=>`Now, collect ${a}.`)).then(n)}),R9=Z("Nomads have settled",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("This seems like as good a place as any.","Well done, Cadet.").then(t("lostMinersOne").then(o,t("resourceObjective")).then("Now, go find that lost Rock Raider!"),t("lostMinersTogether","lostMinersApart").then(o,t("resourceObjective")).then("Now, go find those lost Rock Raiders!"),t("resourceObjective").then(({format:{resourceGoal:a}})=>`Now, collect ${a}.`,({format:{resourceGoalNamesOnly:a}})=>`Those ${a} are as good as ours!`)).then(o,t("hasMonsters")).then(n),r.then("With your base constructed, you should now have no problem").then(t("lostMinersOne").then(o,t("resourceObjective")).then("finding that lost Rock Raider!"),t("lostMinersTogether","lostMinersApart").then(o,t("resourceObjective")).then("finding those lost Rock Raiders!"),t("resourceObjective").then(({format:{resourceGoal:a}})=>`collecting ${a}!`)).then(o,t("hasMonsters").then(o,({format:{enemies:a}})=>`Don't forget to build plenty of Electric Fences in case those ${a} come.`,({format:{enemies:a}})=>`Just keep an eye out for those ${a}.`)).then(n),r.then(e("With your Support Station built, you can move on to building").then(t("buildAndPowerGcOne").then("that Geological Center! Be sure to place it in the cavern marked with an arrow."),t("buildAndPowerGcMultiple").then("those Geological Centers!")),t("buildAndPowerSsOne","buildAndPowerSsMultiple").then("FAIL!!")).then(o,t("resourceObjective")).then(o,t("lostMinersOne","lostMinersTogether","lostMinersApart")).then(o,t("hasMonsters")).then(n)}),b9=Z("Found Slimy Slug Nest",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("I don't like the look of this.","Look at that!","Oh, dear.","This could be a problem!").then("It must be a nest of Slimy Slugs!","We need to keep these Slimy Slugs at bay.").then(n)}),x9=Z("Base Destroyed - Mission Failure",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("With your base destroyed,","Oh no! The Rock Raider HQ is in ruins, and").then("I don't think you can complete our mission.","that doesn't bode well for our mission.").then("I'm pulling you out.","We're teleporting everyone out.","I'm ordering you to evacuate immedately!").then(n)});Z("Boss Enemy Defeated",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("Good work!",({format:{enemy:a}})=>`Your Rock Raiders made short work of that ${a.template.name}.`,"That's a relief!","I was worried for a minute there.").then(n)});const C9=Z("Blackout Start",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Hmmm -","Oh no!","This isn't good.").then("the magnetic shifts are interfering with our Power Station.","the anomaly disabled our Power Station.","our Energy Crystals aren't able to power our HQ right now.").then(n)}),T9=Z("Blackout End",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("The power is back, but it's hard to tell how long it will last.","The anomaly has disappeared for now.").then(o,"The Canteen doesn't need power, so you might want to build one as a backup.",t("hasAirLimit").then("I suggest you build additional Support Stations to keep the cavern breathable.")).then(n)}),L9=Z("Mob Farm no longer blocking",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("With so many Energy Crystals removed, you should now have no issues teleporting in the other vehicles.").then(o,t("lostMinersOne").then("Use them to find that missing Rock Raider!"),t("lostMinersTogether","lostMinersApart").then("Use them to find those missing Rock Raiders!")).then(n)}),I9=Z("Gas Leak - All Support Stations offline",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Careful there!","Oh no!","This isn't good.").then("Without even one Support Station online, this cavern will be uninhabitable very quickly.").then("Fix it NOW or we will need to abort!").then(n)}),k9=Z("Gas Leak - Support Stations Insufficient",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Careful there!","Oh no!","This isn't good.").then("Our Support Stations can't keep up and this cavern will be uninhabitable very quickly.").then("Fix it NOW or we will need to abort!").then(n)}),j$=[{bt:de,required:!0},{bt:_t,required:!0},{bt:_e,required:!0},{bt:Ce,required:!0},{bt:On},{bt:de,required:!0},{bt:po,required:!0},{bt:Pd,required:!0},{bt:yn,required:!0},{bt:Ce,required:!0}],M9=j$.reduce((e,{bt:t})=>e+t.crystals,0),In=ue("gFCHq",["msgLose","wasBaseDestroyed"]),N9={mod:e=>{const t=ii({crystalGoalRatio:.3,...e.initialContext});return{...e,context:t}},prime:()=>({crystalsInBuildings:M9,ruin:!1,special:"fixedComplete",tag:"hq"}),placeBuildings:Yn({discovered:!0,templates:()=>j$}),scriptGlobals:({sb:e})=>{e.onInit(...MU.map(t=>`disable:${t.id};`)),e.declareString(In.msgLose,{die:Oe.failureBaseDestroyed,pg:x9}),e.declareInt(In.wasBaseDestroyed,0),e.if(`${de.id}<=0`,`${In.wasBaseDestroyed}=1;`),e.if(`${_e.id}<=0`,`${In.wasBaseDestroyed}=1;`),e.if(`${Ce.id}<=0`,`${In.wasBaseDestroyed}=1;`),e.if(`${In.wasBaseDestroyed}>=1`,`((${He.won}>0))return;`,`msg:${In.msgLose};`,"wait:5;","lose;")}},P9=[{name:"Hq.FixedComplete",...qn,...N9,anchorBid:({cavern:e,plan:t})=>!t.fluid&&t.pearlRadius>6&&e.context.anchorWhimsy*.1}],F9="You're gathering quite the stockpile there. Click on the Tool Store to dispense some ore. Your Rock Raiders can take it to the Ore Refinery to make Building Studs.",j9="Hint: Hold SHIFT+click to select multiple units. CTRL+[0-9] assigns a group of units that you can recall with [0-9]. X activates laser mode.",B9={land:"JobDriver",air:"JobPilot",sea:"JobSailor"};class qt{constructor(t,r,n,i,o,a,s,l){this.id=t,this.name=r,this.inspectAbbrev=n,this.frame=i,this.kind=o,this.crystals=a,this.upgrades=s,this.zOffset=l}get job(){return B9[this.kind]}}const Hd=new qt("VehicleHoverScout_C","Hover Scout","HoSc","small","land",1,["UpEngine"],.99),B$=new qt("VehicleSmallDigger_C","Small Digger","SmDi","small","land",1,["UpEngine","UpDrill"],-.004),D$=new qt("VehicleSmallTransportTruck_C","Small Transport Truck","SmTT","small","land",2,["UpEngine","UpCargoHold"],.971),va=new qt("VehicleRapidRider_C","Rapid Rider","RaRr","small","sea",2,["UpAddDrill","UpCargoHold"],.978),Wd=new qt("VehicleSMLC_C","Small Mobile Laser Cutter","SMLC","small","land",3,["UpEngine","UpLaser"],.388),mu=new qt("VehicleTunnelScout_C","Tunnel Scout","TuSc","small","air",3,["UpAddDrill"],-.012),D9=new qt("VehicleLoaderDozer_C","Loader Dozer","LoDz","large","land",5,["UpEngine"],.773),H9=new qt("VehicleGraniteGrinder_C","Granite Grinder","GrGr","large","land",5,["UpEngine","UpDrill"],-.553),W9=new qt("VehicleCargoCarrier_C","Cargo Carrier","CaCa","large","sea",5,["UpAddNav"],.978),$l=new qt("VehicleLMLC_C","Large Mobile Laser Cutter","LMLC","large","land",8,["UpEngine","UpLaser","UpAddNav"],.036),U9=new qt("VehicleChromeCrusher_C","Chrome Crusher","CrCr","large","land",8,["UpEngine","UpDrill","UpLaser","UpScanner"],-.346),z9=new qt("VehicleTunnelTransport_C","Tunnel Transport","TuTr","large","air",10,[],-.012);class G9{constructor(){this.id=0}create(t){return{essential:!1,driverId:null,upgrades:[],...t,id:this.id++}}}function V9(e,t,r){return[e.template.id,La({position:e,tileOffset:t,heightMap:r,entityOffset:{z:e.template.zOffset}}),e.upgrades.length&&`upgrades=${e.upgrades.map(n=>`${n}/`).join("")}`,e.driverId!==null&&`driver=${e.driverId.toFixed()}`,e.essential&&"Essential=true",`ID=${e.id.toFixed()}`].filter(n=>n).join(",")}function K9(e){const t=ue("hintEjectOre",["do","msg"]);e.declareInt(t.do,0),e.when("ore>10",`((${Ia.id}==0))return;`,"((studs<5))return;",`${t.do}=1;`),e.declareString(t.msg,F9),e.if(`${t.do}>0`,`msg:${t.msg};`)}function H$(e){const t=ue("hintLG",["do","msg"]);e.declareInt(t.do,0),[mn,Wd,$l].forEach(r=>e.when(`${r.id}.click`,`((${r.id}>1))${t.do}=1;`)),e.declareString(t.msg,j9),e.if(`${t.do}>0`,`msg:${t.msg};`)}const W$=[{bt:de,required:!0},{bt:_e,required:!0},{bt:Ce,required:!0},{bt:_t,required:!1}],Y9=W$.reduce((e,{bt:t})=>e+t.crystals,0),Lg=2,q9=4,X9=10,Ig=4*60,Q9=7*60,Z9={mod(e){const t=ii({globalHostilesCap:q9,...e.initialContext});return{...e,context:t,oxygen:[500,500]}},prime:()=>({crystalsInBuildings:Y9,ruin:!1,special:"gasLeak",tag:"hq"}),crystalsFromMetadata:e=>Lg+e.crystalsInBuildings,placeBuildings:Yn({discovered:!0,from:2,templates:()=>W$}),holdCreatures:()=>!0,script({cavern:e,plan:t,sb:r}){const n=ue(`p${t.id}GlHq`,["msgNoAir","msgInsuffAir","monstersCount"]),i=e.dice.script(t.id);r.onInit(`disable:${IU};`,`crystals=${Lg};`,`wait:${Ig};`,`${re.anchorHold}=0;`),r.declareString(n.msgNoAir,{pg:I9,rng:i}),r.declareString(n.msgInsuffAir,{pg:k9,rng:i}),r.if(`${re.airMiners}<miners`,`((${He.won}>0))return;`,"wait:5;",`((${re.airMiners}>0))[msg:${n.msgInsuffAir}][msg:${n.msgNoAir}];`),r.declareInt(n.monstersCount,0),r.when(`${Yi(e.context.biome).id}.new`,`${n.monstersCount}+=1;`),r.when(`${n.monstersCount}==${X9}`,`${re.anchorHold}=1;`,`wait:random(${Ig})(${Q9});`,`${re.anchorHold}=0;`,`${n.monstersCount}=0;`),H$(r)}},J9=[{name:"Hq.Spawn.GasLeak",...qn,...Z9,anchorBid:({cavern:e,plan:t})=>e.context.biome==="lava"&&e.context.hasMonsters&&e.context.hasAirLimit&&!t.fluid&&t.lakeSize>3&&t.pearlRadius>3&&e.context.anchorWhimsy*.2}],U$=[{bt:de,required:!0},{bt:On,required:!0},{bt:_e,required:!0}],kg=U$.reduce((e,{bt:t})=>e+t.crystals,0),z$=[{bt:mn},{bt:mn},{bt:Ce},{bt:yn}],ez=z$.reduce((e,{bt:t})=>e+t.crystals,0);function tz(e,t){for(let r=0;r<e.innerPearl.length;r++){const n=e.innerPearl[r];for(let i=0;i<n.length;i++)if(t.get(...n[i])===S.WATER)return n[i]}throw new Error("Failed to find water tile")}const rz={crystalsFromMetadata:e=>va.crystals+e.crystalsInBuildings,prime:({cavern:e,plan:t})=>({crystalsInBuildings:e.dice.prime(t.id).betaInt({a:1,b:1.75,min:kg,max:kg+ez+1}),ruin:!1,special:null,tag:"hq"}),placeBuildings:Yn({discovered:!0,from:1,templates:e=>[...U$,...e.shuffle(z$)]}),placeCrystals:e=>$t(e,{seamBias:1}),placeEntities:({cavern:e,plan:t,minerFactory:r,vehicleFactory:n})=>{const i=e.dice.placeEntities(t.id),[o,a]=tz(t,e.tiles),s=pn({rng:i,x:o,y:a}),l=r.create({...s,planId:t.id,loadout:["Drill","JobSailor"]}),u=[n.create({...s,planId:t.id,driverId:l.id,template:va,upgrades:["UpAddDrill"]})];return{miners:[l],vehicles:u}},script:({cavern:e,plan:t,sb:r})=>{t.innerPearl.forEach(n=>n.forEach(i=>{var o;if((o=e.tiles.get(...i))!=null&&o.isWall){const a=z(e,i);r.if(`change:${a}`,`place:${a},${S.WATER.id};`)}}))}},nz=[{name:"Hq.Island",...qn,...rz,...N({of:w.ALWAYS_FLOOR,width:3},{of:w.FLOOR,width:0,grow:1},{of:w.WATER,width:2,grow:2},{of:w.MIX_FRINGE}),anchorBid:({cavern:e,plan:t})=>t.fluid===S.WATER&&t.lakeSize>3&&t.path.baseplates.length===1&&t.pearlRadius>5&&e.context.anchorWhimsy*.2}],Mg=3,vi=ue("gLostHq",["foundHq"]);function iz(e){return e.buildings.some(t=>{var n,i;const r=t.foundation[0];return(n=e.discoveryZones.get(...r))!=null&&n.openOnSpawn?!1:(i=e.pearlInnerDex.get(...r))==null?void 0:i.some((o,a)=>{var s;return((s=e.plans[a].metadata)==null?void 0:s.tag)==="hq"})})}const Ng={objectives:({cavern:e})=>iz(e)?{sufficient:!1,tag:"findHq",variables:[{condition:`${vi.foundHq}>0`,description:"Find the lost Rock Raider HQ"}]}:{sufficient:!1,tag:"reachHq",variables:[{condition:`${vi.foundHq}>0`,description:"Reach the abandoned Rock Raider HQ"}]},claimEventOnDiscover({cavern:e,plan:t}){if(!e.objectives.tags.findHq)return[];const r=ma(e,t);if(!r)throw new Error("Cave has Find HQ objective but no undiscovered point.");return[{pos:r,priority:Qi.OBJECTIVE}]},scriptGlobals:({sb:e})=>e.declareInt(vi.foundHq,0),script({cavern:e,plan:t,sb:r}){if(e.objectives.tags.findHq){const n=ma(e,t),i=e.ownsScriptOnDiscover[e.discoveryZones.get(...n).id]===t.id,o=t.path.baseplates.reduce((s,l)=>s.pearlRadius>l.pearlRadius?s:l).center,a=ue(`p${t.id}LoHq`,["messageDiscover"]);i&&(r.declareString(a.messageDiscover,{die:Oe.foundHq,pg:Tg}),r.if(`change:${z(e,n)}`,i&&`msg:${a.messageDiscover};`,i&&`pan:${z(e,o)};`,"wait:1;",`${He.met}+=1;`,`${vi.foundHq}=1;`))}else if(e.objectives.tags.reachHq){const n=ue(`p${t.id}LoHq`,["messageReach","reached"]);r.declareString(n.messageReach,{die:Oe.foundHq,pg:Tg}),r.declareInt(n.reached,0),r.if(`${n.reached}>=1`,"wait:1;",`msg:${n.messageReach};`,`${He.met}+=1;`,`${vi.foundHq}=1;`),t.outerPearl[0].forEach(i=>{e.tiles.get(...i)&&r.when(`enter:${z(e,i)}`,`${n.reached}=1;`)})}}},oz=[{name:"Hq.Lost.Established",...qn,...Ng,prime:wl(15,!1),placeBuildings:Yn({}),caveBid:({cavern:e,plan:t,hops:r,plans:n})=>{var i,o;return!t.fluid&&t.pearlRadius>5&&r.length<=Mg&&((o=(i=n[e.anchor])==null?void 0:i.metadata)==null?void 0:o.tag)!=="mobFarm"&&!r.some(a=>n[a].fluid)&&!n.some(a=>{var s;return((s=a.metadata)==null?void 0:s.tag)==="hq"})&&.5}},{name:"Hq.Lost.Ruins",...qn,...Ng,prime:wl(15,!0),placeBuildings:Yn({from:3}),placeLandslides:e=>jd({min:15,max:100},e),caveBid:({cavern:e,plan:t,hops:r,plans:n})=>{var i,o,a;return!t.fluid&&t.pearlRadius>6&&r.length<=Mg&&((o=(i=n[e.anchor])==null?void 0:i.metadata)==null?void 0:o.tag)!=="mobFarm"&&!n.some(s=>{var l;return((l=s.metadata)==null?void 0:l.tag)==="hq"})&&e.context.planWhimsy*(((a=n[r[0]].metadata)==null?void 0:a.tag)==="nomads"?5:.5)}}],az=[{name:"Hq.Spawn.Established",...qn,prime:wl(10,!1),placeBuildings:Yn({discovered:!0}),anchorBid:({plan:e})=>!e.fluid&&e.pearlRadius>5&&.5},{name:"Hq.Spawn.Ruins",...qn,prime:wl(12,!0),placeBuildings:Yn({discovered:!0,from:3}),placeLandslides:e=>jd({min:15,max:60},e),anchorBid:({plan:e})=>!e.fluid&&e.pearlRadius>6&&.5},...P9,...J9,...nz,...oz],sz=Z("Foreshadow Seismic Event",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("I don't like the look of this.","This could be a problem.",o).then("Our scanners are picking up seismic activity in the area.","We're detecting an increase in geological activity nearby.").then("Be careful down there!","Keep an eye out for anything unusual.","Stay sharp and keep your Rock Raiders safe.").then(n)}),Pg=Z("Foreshadow Seismic Event (Again)",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("The seismic scanners are lighting up again.","We're detecting another big shift.","We're picking up more activity now.").then("Anything could be happening down there.","Exercise extreme caution!","Prepare yourself, Cadet!","You must protect your Rock Radiers.",o).then(n)}),lz={tag:"seismic"},At=ue("gSeismic",["showMessage","msg"]),Ud={prime:()=>lz,scriptGlobals:({cavern:e,sb:t})=>{const r=e.dice.lore(Oe.seismicForeshadow),n=e.plans.reduce((i,o)=>{var a;return((a=o.metadata)==null?void 0:a.tag)==="seismic"?i+1:i},0);t.declareInt(At.showMessage,0),t.declareString(`${At.msg}1`,{rng:r,pg:sz}),t.if(`${At.showMessage}==1`,`msg:${At.msg}1;`),n>1&&(t.declareString(`${At.msg}2`,{rng:r,pg:Pg}),t.if(`${At.showMessage}==2`,`msg:${At.msg}2;`)),n>2&&(t.declareString(`${At.msg}3`,{rng:r,pg:Pg}),t.when(`${At.showMessage}>=3`,`msg:${At.msg}3;`))}},Fg=e=>ue(`p${e.id}SmBBa`,["boss","onTrip","doArm","tripCount"]);function uz(e,t){const r=[];return $$.forEach(n=>{const i=e.discoveryZones.get(...tr(t,n));i&&!i.openOnSpawn&&(r[i.id]=i)}),Fe(r)}function cz(e,t,r){const n=r,i=[],o=[],a=[];return t.innerPearl.forEach((s,l)=>{l<r||(l<r+2?a.push(...s.filter(u=>{var c;return(c=e.tiles.get(...u))==null?void 0:c.isWall})):s.forEach(u=>{var f,h;if((f=e.pearlInnerDex.get(...u))==null?void 0:f.some((d,y)=>y!==t.id&&d<n)){const d=uz(e,u);(d.length===1?i[h=d[0].id]||(i[h]=[]):o).push(u)}}))}),[...Fe(i),o,a]}const fz={...kt,...Ud,placeBuildings:({plan:e,tiles:t})=>{for(let r=0;r<e.pearlRadius;r++){let n=!1;for(const i of e.innerPearl[r])t.get(...i)===S.FLOOR&&(n=!0,t.set(...i,S.WASTE_RUBBLE_4));if(!n)break}return{}},placeEntities:({cavern:e,plan:t,creatureFactory:r})=>{const n=t.innerPearl[0][0],i=e.dice.placeEntities(t.id);return{creatures:[r.create({template:Yi(e.context.biome),planId:t.id,sleep:!1,...pn({rng:i,x:n[0],y:n[1],scale:2})})]}},script:({cavern:e,plan:t,sb:r})=>{const n=Fg(t),i=t.innerPearl[0][0],o=e.creatures.find(u=>u.planId===t.id);r.declareCreature(n.boss,o);let a=1;for(;;){const u=t.innerPearl[a];if(u.reduce((f,h)=>{var d;return(d=e.tiles.get(...h))!=null&&d.isWall?f+1:f},0)*2>=u.length)break;a++}const s=cz(e,t,a);r.declareInt(n.tripCount,0);let l=0;s.forEach((u,c)=>{c<s.length-1&&u.forEach(f=>{var y;const h=(y=e.tiles.get(...f))==null?void 0:y.isWall,d=h?3:1;l+=d,r.if(`${h?"drill":"enter"}:${z(e,f)}`,`${n.tripCount}+=${d};`)})}),r.if(`${n.tripCount}>=${Math.ceil(l/4)}`,"wait:random(5)(30);","shake:1;",`${At.showMessage}+=1;`,"wait:random(15)(60);","shake:2;",`pan:${z(e,[Math.floor(o.x),Math.floor(o.y)])};`,"wait:1;","shake:4;",...s.map((u,c)=>c<s.length-1&&Xi(...u.filter(f=>{var h;return(h=e.tiles.get(...f))==null?void 0:h.isWall}).map(f=>`drill:${z(e,f)};`),"wait:0.25;")),"shake:5;",...s[s.length-1].filter(u=>{var c;return(c=e.tiles.get(...u))==null?void 0:c.isWall}).map(u=>`drill:${z(e,u)};`)),r.if(`change:${z(e,i)}`,`${n.tripCount}=9999;`,`${n.doArm};`)},monsterSpawnScript:e=>sr(e,{armEvent:Fg(e.plan).doArm,tripOnArmed:"first"})},hz=[{name:"Seismic.BossBattle",...fz,...N({of:w.ALWAYS_FLOOR,width:2,grow:1},{of:w.ALWAYS_SOLID_ROCK,width:2},{of:w.MIX_LOOSE_HARD_ROCK,shrink:1},{of:w.MIX_AT_MOST_DIRT_LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE,shrink:1},{of:w.VOID,width:0,grow:1}),caveBid:({cavern:e,plan:t,plans:r})=>{var n;return!t.fluid&&e.context.hasMonsters&&((n=r[e.anchor].metadata)==null?void 0:n.tag)!=="pandora"&&t.pearlRadius>=5&&t.path.baseplates.length===1&&!t.intersects.some((i,o)=>{var a;return((a=r[o].metadata)==null?void 0:a.tag)==="seismic"})&&e.context.planWhimsy*.1}}],jg=e=>ue(`p${e.id}SmEr`,["doSpawn","tripCount"]);function dz(e,t){const[r,n]=t.path.baseplates[0].center,[i,o]=t.path.baseplates[1].center,a=Math.atan2(o-n,i-r),s=t.pearlRadius+2,l=Math.sin(a)*s,u=Math.cos(a)*s,c=(r+i)/2,f=(n+o)/2,h=[];for(const d of[[c-l,f+u],[c+l,f-u]]){let y=!0;for(const _ of fo([c,f],d)){if(y&&(y=!1,h.length))continue;const $=e.tiles.get(..._);if(!$||$.isFluid)break;h.push(_)}}return h}const pz={...kt,...Ud,placeErosion:e=>Bd(e,{cooldown:25,initialDelay:2,initialDelayStartsExposed:360}),script:({cavern:e,plan:t,sb:r})=>{const n=jg(t),i=dz(e,t),o=10,a=20;r.declareInt(n.tripCount,0),i.forEach(s=>{r.when(`enter:${z(e,s)}`,`${n.tripCount}+=1;`),r.if(`change:${z(e,s)}:${S.LAVA.id}`,`${n.tripCount}=999;`)}),r.if(`${n.tripCount}>=${o}`,"wait:random(5)(20);","shake:1;",`${At.showMessage}+=1;`),r.if(`${n.tripCount}>=${a}`,"wait:random(30)(150);","shake:2;",`pan:${z(e,i[0])};`,"wait:1;","shake:4;",...i.map(s=>`place:${z(e,s)},${S.LAVA.id};`),P$(e)&&`${n.doSpawn};`)},monsterSpawnScript:e=>sr(e,{armEvent:jg(e.plan).doSpawn,tripOnArmed:"first"})},mz=[{name:"Seismic.Eruption",...pz,...N({of:w.FLOOR,grow:2},{of:w.DIRT,width:0,grow:.1},{of:be({item:w.DIRT,bid:.25},{item:w.LOOSE_ROCK,bid:1}),grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.5}),caveBid:({cavern:e,plan:t,plans:r})=>!t.fluid&&t.hasErosion&&e.context.biome!=="ice"&&t.path.baseplates.length===2&&!t.intersects.some((n,i)=>{var o;return r[i].fluid===S.WATER||((o=r[i].metadata)==null?void 0:o.tag)==="seismic"})&&e.context.planWhimsy*1}];function vz(e,t){const r=[];return t.innerPearl[0].filter(n=>{const i=e.discoveryZones.get(...n);return!i||i.openOnSpawn||r[i.id]?!1:(r[i.id]=!0,!0)})}const Bg=e=>ue(`p${e.id}SSeTu`,["onTrip","doSpawn","tripCount"]),gz={...Ma,...Ud,script:({cavern:e,plan:t,sb:r})=>{const n=Bg(t),i=vz(e,t),o=t.innerPearl[0][Math.floor(t.innerPearl[0].length/2)],a=t.innerPearl[0].filter(l=>{const u=e.tiles.get(...l)??S.SOLID_ROCK;return u.isWall&&u.hardness<Re.SOLID}),s=Math.ceil((i.length+a.length)/4);r.declareInt(n.tripCount,0),i.forEach(l=>r.if(`change:${z(e,l)}`,`${n.tripCount}+=1;`)),a.map(l=>r.if(`drill:${z(e,l)}`,`${n.tripCount}+=1;`)),r.if(`${n.tripCount}>=${s}`,"wait:random(5)(30);","shake:1;",`${At.showMessage}+=1;`,"wait:random(30)(150);","shake:2;",`pan:${z(e,o)};`,"wait:1;","shake:4;",...t.innerPearl[0].filter(l=>{var u;return(u=e.tiles.get(...l))==null?void 0:u.isWall}).map(l=>`drill:${z(e,l)};`),e.context.hasMonsters&&`${n.doSpawn};`)},monsterSpawnScript:e=>{const t=e.plan.path.baseplates,r=[t[0],t[t.length-1]];return sr(e,{reArmMode:"none",armEvent:Bg(e.plan).doSpawn,tripOnArmed:"first",tripPoints:[],emerges:r.map(n=>{const[i,o]=n.center;return{x:Math.floor(i),y:Math.floor(o),radius:n.pearlRadius}})})}},yz=[{name:"Seismic.SecretTunnel",...gz,...N({of:w.SOLID_ROCK},{of:w.VOID,grow:1}),hallBid:({cavern:e,plan:t,plans:r})=>!t.fluid&&t.path.kind==="auxiliary"&&t.path.exclusiveSnakeDistance>1&&!t.intersects.some((n,i)=>{var o;return["seismic","pandora"].includes(((o=r[i].metadata)==null?void 0:o.tag)??"")})&&e.context.planWhimsy*.75}],wz=[...hz,...mz,...yz],Yr={...kt,placeSlugHoles(){},monsterSpawnScript(e){if(!(e.cavern.context.biome==="ice"&&e.plan.fluid===S.LAVA)&&!(e.cavern.context.biome==="lava"&&e.plan.fluid!==S.LAVA))return sr(e)}},$z=[{name:"Flooded.Water.Lake",...Yr,...N({of:w.WATER,grow:2},{of:w.FLOOR,shrink:1,grow:1},{of:w.LOOSE_ROCK},{of:be({item:w.LOOSE_ROCK,bid:10},{item:w.LOOSE_OR_HARD_ROCK,bid:1})}),caveBid:({plan:e})=>e.fluid===S.WATER&&e.pearlRadius<10&&1},{name:"Flooded.Water.LakeWithMonsters",...Yr,...N({of:w.WATER,grow:2},{of:w.FLOOR,grow:1},{of:w.LOOSE_ROCK},{of:w.LOOSE_OR_HARD_ROCK}),caveBid:({cavern:e,plan:t})=>e.context.hasMonsters&&e.context.biome==="ice"&&t.fluid===S.WATER&&t.path.baseplates.length>1&&t.pearlRadius>3&&t.pearlRadius<10&&1,placeEntities(e){const t=e.cavern.dice.placeEntities(e.plan.id),r=Math.ceil(e.plan.monsterWaveSize*1.2);return{creatures:qi(e,{rng:t,count:r})}}},{name:"Flooded.Water.Island",...Yr,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:.7},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.2},{of:w.ALWAYS_LOOSE_ROCK,width:0,grow:.2},{of:w.ALWAYS_DIRT,grow:.5},{of:w.ALWAYS_FLOOR,grow:.1},{of:w.WATER,grow:2},{of:w.FLOOR,grow:1},{of:w.LOOSE_ROCK},{of:w.MIX_FRINGE}),caveBid:({plan:e})=>e.fluid===S.WATER&&e.pearlRadius>5&&2},{name:"Flooded.Lava.Lake",...Yr,...N({of:w.LAVA,grow:2},{of:w.FLOOR,grow:1},{of:w.LOOSE_ROCK,shrink:1},{of:w.LOOSE_OR_HARD_ROCK}),caveBid:({plan:e})=>e.fluid===S.LAVA&&e.pearlRadius<10&&1},{name:"Flooded.Lava.Island",...Yr,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:.7},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.2},{of:w.ALWAYS_LOOSE_ROCK,width:0,grow:.2},{of:w.ALWAYS_FLOOR,width:2,grow:.1},{of:w.LAVA,grow:2},{of:w.FLOOR,grow:.5},{of:w.LOOSE_ROCK},{of:w.LOOSE_OR_HARD_ROCK}),caveBid:({plan:e})=>e.fluid===S.LAVA&&e.pearlRadius>5&&1},{name:"Flooded.Water.Peninsula",...Yr,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:.7},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.2},{of:w.ALWAYS_LOOSE_ROCK,width:0,grow:.2},{of:w.ALWAYS_DIRT,width:0,grow:.5},{of:w.ALWAYS_FLOOR,width:2,grow:.1},{of:w.BRIDGE_ON_WATER,grow:2},{of:w.LOOSE_ROCK},{of:w.MIX_FRINGE}),caveBid:({plans:e,plan:t})=>t.fluid===S.WATER&&t.pearlRadius>5&&jt(t)&&Vt(e,t,null)&&1},{name:"Flooded.Lava.Peninsula",...Yr,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:.7},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.2},{of:w.ALWAYS_LOOSE_ROCK,grow:.2},{of:w.ALWAYS_FLOOR,grow:.1},{of:w.BRIDGE_ON_LAVA,grow:2},{of:w.AT_MOST_HARD_ROCK}),caveBid:({plans:e,plan:t})=>t.fluid===S.LAVA&&t.pearlRadius>5&&jt(t)&&Vt(e,t,null)&&1},{name:"Flooded.Lava.Stalagmites",...Yr,crystalsToPlace:({plan:e})=>e.crystalRichness*e.perimeter*2,...N({of:be({item:w.ALWAYS_DIRT,bid:.01},{item:w.ALWAYS_LOOSE_ROCK,bid:.1},{item:w.LAVA,bid:1}),width:4,grow:1},{of:be({item:w.AT_MOST_DIRT,bid:.25},{item:w.AT_MOST_LOOSE_ROCK,bid:1})},{of:w.AT_MOST_HARD_ROCK}),placeCrystals(e){$t(e,{seamBias:Math.max(e.cavern.context.caveCrystalSeamBias,.6)})},caveBid:({plan:e})=>e.fluid===S.LAVA&&e.hasErosion&&e.pearlRadius>5&&.4}],_z={...Ma};function Sz({roughExtent:e,rough:t}){return{roughExtent:e,rough:n=>{t(n);function i(s){const l=n.cavern.pearlInnerDex.get(...s);return l&&!l.some((u,c)=>c!==n.plan.id)}const o=n.plan.intersects.map((s,l)=>n.cavern.plans[l]).filter(s=>s.kind==="cave").sort((s,l)=>s.hops.length-l.hops.length),a=Math.min(...o.map(s=>s.outerPearl.length))-1;for(let s=0;s<a;s++)for(const l of o){const u=l.outerPearl[s].filter(i);if(!(u.length<n.plan.pearlRadius)){u.forEach(c=>n.tiles.set(...c,S.SOLID_ROCK)),l.outerPearl[s+1].filter(i).filter(([c,f])=>Ke.reduce((h,[d,y])=>(n.tiles.get(c+d,f+y)??S.SOLID_ROCK)===S.SOLID_ROCK?h+1:h,0)>1).forEach(c=>n.tiles.set(...c,S.SOLID_ROCK));return}}}}}const Ez=[{name:"Loopback",..._z,...Sz(N({of:w.FLOOR,grow:2},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.AT_MOST_HARD_ROCK},{of:w.VOID,grow:1})),hallBid:({plan:e})=>!e.fluid&&e.pearlRadius>1&&e.path.kind==="auxiliary"&&e.path.exclusiveSnakeDistance>5&&2}],Qt=ue("gLostMiners",["remainingCaves","onFoundAll","messageFoundAll","done"]);function Ws(e){let t=0,r=0;return e.plans.forEach(n=>{var i;((i=n.metadata)==null?void 0:i.tag)==="lostMiners"&&(r++,t+=n.metadata.minersCount)}),{lostMiners:t,lostMinerCaves:r}}function G$(e,t,r,n){if(!n.hops.length)throw new Error("Reached spawn without a breadcrumb");const i=e.plans[n.hops[n.hops.length-1]],o=_$(t,i.innerPearl.flatMap(a=>a).filter(([a,s])=>{const l=e.discoveryZones.get(a,s);return l&&l!==r}));return o||G$(e,t,r,i)}function Az(e,t,[r,n],i,o){var c;const a=e.tiles.get(r,n),s=a===S.LAVA||a===S.WATER?a:null,l=((c=e.plans[e.anchor].metadata)==null?void 0:c.tag)==="mobFarm",u=o.weightedChoice(Fe([!s&&!l&&{item:Hd,bid:2},!s&&{item:B$,bid:.5},!s&&{item:D$,bid:.75},!s&&{item:Wd,bid:.05},!l&&s===S.WATER&&{item:va,bid:1},!l&&{item:mu,bid:.25},{item:null,bid:.0025}]));return u?[i.create({...pn({x:r,y:n,aimedAt:t.path.baseplates[0].center,rng:o}),planId:t.id,template:u})]:[]}const Oz=(e,{tiles:t,discoveryZones:r})=>Hs(e,(n,i)=>{var a;const o=t.get(n,i);return!(o!=null&&o.isWall)&&!(o!=null&&o.isFluid)&&!((a=r.get(n,i))!=null&&a.openOnSpawn)});function Dg(e,t){const r=e.miners.find(s=>s.planId===t.id),n=[Math.floor(r.x),Math.floor(r.y)],i=e.discoveryZones.get(...n),o=e.vehicles.find(s=>s.planId!==t.id?!1:e.discoveryZones.get(Math.floor(s.x),Math.floor(s.y))!==i),a=o?[Math.floor(o.x),Math.floor(o.y)]:void 0;return{minersPoint:n,breadcrumb:o,breadcrumbPoint:a}}const Rz={...kt,prime:({cavern:e,plan:t})=>({tag:"lostMiners",minersCount:e.dice.prime(t.id).betaInt({a:1,b:2,min:1,max:5})}),placeEntities:({cavern:e,plan:t,minerFactory:r,vehicleFactory:n})=>{const i=e.dice.placeEntities(t.id),[o,a]=Oz(t,e)??(()=>{throw new Error("Nowhere to place lost miners")})(),s=e.discoveryZones.get(o,a);if(!s)throw new Error("Lost Miners point is not discoverable");if(s.openOnSpawn)throw new Error("Lost Miners point is discovered on spawn");const l=[];for(let f=0;f<t.metadata.minersCount;f++)l.push(r.create({planId:t.id,...pn({x:o,y:a,rng:i})}));const u=G$(e,[o,a],s,t),c=Az(e,t,u,n,i);return{miners:l,vehicles:c}},objectives:({cavern:e})=>{const{lostMiners:t,lostMinerCaves:r}=Ws(e),n=t===1?"Find the lost Rock Raider":r===1?"Find the cave with the lost Rock Radiers":`Find ${t} lost Rock Raiders`;return{variables:[{condition:`${Qt.done}>0`,description:n}],sufficient:!0}},claimEventOnDiscover({cavern:e,plan:t}){const{minersPoint:r,breadcrumbPoint:n}=Dg(e,t);return[{pos:n,priority:Qi.HINT},{pos:r,priority:Qi.OBJECTIVE}]},scriptGlobals({cavern:e,sb:t}){const{lostMinerCaves:r}=Ws(e);t.declareInt(Qt.remainingCaves,r),t.declareInt(Qt.done,0),t.declareString(Qt.messageFoundAll,{die:Oe.foundAllLostMiners,pg:O9}),t.event(Qt.onFoundAll,`${He.met}+=1;`,`msg:${Qt.messageFoundAll};`,"wait:3;",`${Qt.done}=1;`)},script({cavern:e,plan:t,sb:r}){const n=e.dice.script(t.id),{lostMinerCaves:i}=Ws(e),o=ue(`p${t.id}LoMi`,["msgFoundBreadcrumb","msgFoundMiners","wasFound"]),{minersPoint:a,breadcrumb:s,breadcrumbPoint:l}=Dg(e,t),u=e.ownsScriptOnDiscover[e.discoveryZones.get(...a).id]===t.id,c=u&&i>1,f=l&&e.ownsScriptOnDiscover[e.discoveryZones.get(...l).id]===t.id;c&&r.declareString(o.msgFoundMiners,{rng:n,pg:A9,state:{foundMinersOne:t.metadata.minersCount<=1,foundMinersTogether:t.metadata.minersCount>1},format:{foundMiners:t.metadata.minersCount}}),r.declareInt(o.wasFound,0),r.if(`change:${z(e,a)}`,u&&`pan:${z(e,a)};`,`${o.wasFound}=1;`,`${Qt.remainingCaves}-=1;`,qU(`${Qt.remainingCaves}<=0`,Qt.onFoundAll,c&&`msg:${o.msgFoundMiners}`)),f&&(r.declareString(o.msgFoundBreadcrumb,{rng:n,pg:E9,format:{vehicle:s}}),r.if(`change:${z(e,l)}`,`((${o.wasFound}>0))return;`,`pan:${z(e,l)};`,`msg:${o.msgFoundBreadcrumb};`))}},bz={rock:1,ice:1.4,lava:.7},xz=[{name:"LostMiners",...Rz,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.ALWAYS_LOOSE_ROCK,grow:1},{of:w.HARD_ROCK,grow:.5}),caveBid:({cavern:e,hops:t,plans:r,plan:n})=>!n.fluid&&n.pearlRadius>2&&n.pearlRadius<10&&t.length>3&&t.length<=8&&jt(n)&&r.reduce((i,o)=>{var a;return((a=o.metadata)==null?void 0:a.tag)==="lostMiners"?i+1:i},0)<4&&e.context.planWhimsy*bz[e.context.biome]}],Cz=[{item:Hd,bid:1},{item:B$,bid:4},{item:D$,bid:1},{item:Wd,bid:2},{item:mu,bid:1},{item:null,bid:1}],Hg=ue("gNomads",["messageBuiltBase"]),wc={...kt,crystalsToPlace:()=>5,crystalsFromMetadata:e=>e.vehicles.reduce((t,r)=>t+r.crystals,0),prime:({cavern:e,plan:t})=>{const r=e.dice.prime(t.id),n=r.betaInt({a:1,b:3,min:1,max:4}),i=Fe([r.weightedChoice(Cz)]);return{tag:"nomads",minersCount:n,vehicles:i}},placeRechargeSeam:mo(1),placeBuildings:({cavern:e,plan:t,tiles:r,openCaveFlags:n})=>{var i;return n.set(...Hs(t,(o,a)=>{const s=r.get(o,a);return!!s&&!s.isWall}),!0),(i=e.plans.find(o=>{var a;return((a=o.metadata)==null?void 0:a.tag)==="hq"}))==null||i.hops.forEach(o=>{uu(e.plans[o].path.baseplates,(a,s)=>{var l;for(const u of fo(a.center,s.center))(((l=r.get(...u))==null?void 0:l.hardness)??Re.SOLID>=Re.HARD)&&r.set(...u,S.LOOSE_ROCK)})}),{}},placeEntities:({cavern:e,plan:t,minerFactory:r,vehicleFactory:n})=>{const i=e.dice.placeEntities(t.id),[o,a]=Hs(t,(u,c)=>{var f;return!!((f=e.discoveryZones.get(u,c))!=null&&f.openOnSpawn&&!e.tiles.get(u,c).isFluid)}),s=t.metadata.vehicles.map(u=>{if(u.kind==="sea"){const c=Hs(t,(f,h)=>{var d;return!!((d=e.discoveryZones.get(f,h))!=null&&d.openOnSpawn&&e.tiles.get(f,h)===S.WATER)});if(!c)throw new Error(`Failed to place sea vehicle in plan ${t.id}`);return n.create({...pn({x:c[0],y:c[1],rng:i}),planId:t.id,template:u})}return n.create({...pn({x:o,y:a,rng:i}),planId:t.id,template:u})}),l=[];for(let u=0;u<t.metadata.minersCount;u++){const c=s[u],f=c?Br(c):pn({x:o,y:a,rng:i}),h=Fe(["Drill",(u===0||i.chance(.25))&&"JobGeologist",c==null?void 0:c.template.job]),d=r.create({...f,planId:t.id,loadout:h});s[u]&&(s[u]={...s[u],driverId:d.id}),l.push(d)}return{vehicles:s,miners:l,cameraPosition:Br({x:l[0].x,y:l[0].y,aimedAt:t.path.baseplates[0].center,pitch:Math.PI/4})}},holdCreatures:()=>!0,scriptGlobals({cavern:e,sb:t}){e.plans.some(r=>{var n;return((n=r.metadata)==null?void 0:n.tag)==="hq"})?(t.onInit("disable:miners;","disable:buildings;","disable:vehicles;"),t.if(`${vi.foundHq}>0`,"enable:miners;","enable:buildings;","enable:vehicles;","wait:random(20)(120);",`${re.anchorHold}=0;`)):(t.declareString(Hg.messageBuiltBase,{die:Oe.nomadsSettled,pg:R9}),t.if(`${de.id}.new`,"wait:random(20)(120);",`${re.anchorHold}=0;`),t.if(`${Ce.id}.onPowered`,`msg:${Hg.messageBuiltBase};`))}},Tz=[{name:"Nomads",...wc,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),crystalsToPlace:({plan:e})=>Math.max(e.crystalRichness*e.perimeter,5),ore:({plan:e})=>Math.max(e.oreRichness*e.perimeter,10),placeOre:e=>L$(e,{seamBias:1}),anchorBid:({cavern:e,plan:t})=>!t.fluid&&t.pearlRadius>0&&Vt(e.plans,t,null)&&(jt(t)?1:.1)},{name:"Nomads.WaterPeninsula",...wc,...N({of:w.ALWAYS_FLOOR,grow:2},{of:w.BRIDGE_ON_WATER,width:2,grow:.5},{of:w.FLOOR},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),prime:()=>({tag:"nomads",minersCount:1,vehicles:[va]}),anchorBid:({cavern:e,plan:t})=>t.fluid===S.WATER&&t.pearlRadius>4&&$g(e.plans,t,null)&&.5},{name:"Nomads.LavaPeninsula",...wc,...N({of:w.ALWAYS_FLOOR,grow:2},{of:w.BRIDGE_ON_LAVA,width:2,grow:.5},{of:w.FLOOR},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.AT_MOST_HARD_ROCK}),prime:()=>({tag:"nomads",minersCount:1,vehicles:[mu]}),anchorBid:({cavern:e,plan:t})=>t.fluid===S.LAVA&&t.pearlRadius>4&&$g(e.plans,t,null)&&.5}],hi={...kt,monsterSpawnScript:e=>sr(e)},Lz=[{name:"SimpleCave.Filled",...hi,...N({of:w.DIRT,width:0,grow:.25},{of:be({item:w.DIRT,bid:.25},{item:w.LOOSE_ROCK,bid:.25},{item:w.DIRT_OR_LOOSE_ROCK,bid:.5}),grow:1},{of:w.LOOSE_OR_HARD_ROCK}),caveBid:({plan:e})=>!e.fluid&&e.pearlRadius<4&&.04},{name:"SimpleCave.Open",...hi,...N({of:w.FLOOR,grow:2},{of:w.AT_MOST_DIRT,width:0,grow:.5},{of:be({item:w.AT_MOST_DIRT,bid:.25},{item:w.AT_MOST_LOOSE_ROCK,bid:1}),grow:1},{of:w.MIX_FRINGE},{of:w.VOID,width:0,grow:.5}),caveBid:({plans:e,plan:t})=>!t.fluid&&t.pearlRadius<10&&Vt(e,t,null)&&2},{name:"SimpleCave.Empty",...hi,...N({of:w.FLOOR,grow:2},{of:w.DIRT,width:0,grow:.1},{of:be({item:w.DIRT,bid:.25},{item:w.LOOSE_ROCK,bid:1}),grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.5},{of:w.VOID,width:0,grow:.5}),caveBid:({plan:e})=>!e.fluid&&e.pearlRadius<10&&1},{name:"SimpleCave.FilledWithPaths",...hi,...N({of:w.FLOOR,width:0,grow:.5},{of:Et({dirt:S.FLOOR,looseRock:S.FLOOR,hardRock:S.FLOOR,solidRock:S.LOOSE_ROCK}),grow:.5},{of:Et({dirt:S.FLOOR,looseRock:S.FLOOR,hardRock:S.FLOOR,solidRock:S.DIRT}),grow:1},{of:w.AT_MOST_LOOSE_ROCK},{of:w.AT_MOST_HARD_ROCK},{of:w.VOID,width:0,grow:.5}),caveBid:({plans:e,plan:t})=>!t.fluid&&t.pearlRadius>4&&t.path.baseplates.length===1&&e.some(r=>t.intersects[r.id]&&r.fluid)&&1},{name:"SimpleCave.Doughnut",...hi,...N({of:w.ALWAYS_SOLID_ROCK,grow:.2},{of:w.ALWAYS_HARD_ROCK,grow:.3},{of:w.LOOSE_ROCK,width:0,grow:.5},{of:w.FLOOR,width:2,grow:1},{of:w.DIRT,width:0,grow:.5},{of:w.LOOSE_ROCK},{of:w.AT_MOST_HARD_ROCK}),caveBid:({plan:e})=>!e.fluid&&e.pearlRadius>5&&.5},{name:"SimpleCave.Stalagmites",...hi,...N({of:be({item:w.ALWAYS_DIRT,bid:.01},{item:w.ALWAYS_LOOSE_ROCK,bid:.04},{item:w.FLOOR,bid:1}),width:4,grow:3},{of:w.MIX_DIRT_LOOSE_ROCK,grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.25}),caveBid:({plan:e})=>!e.fluid&&e.pearlRadius>5&&.2}],kn={...Ma},Iz=[{name:"SimpleHall.Open",...kn,...N({of:w.FLOOR,grow:2},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.AT_MOST_HARD_ROCK},{of:w.VOID,grow:1}),hallBid:({plans:e,plan:t,hops:r})=>{var n;return!t.fluid&&t.pearlRadius>0&&(r.length<3&&((n=e[r[0]].metadata)==null?void 0:n.tag)==="nomads"?5:1)}},{name:"SimpleHall.WideWithMonsters",...kn,...N({of:w.FLOOR,grow:1},{of:w.AT_MOST_HARD_ROCK},{of:w.VOID}),hallBid:({cavern:e,plan:t})=>e.context.hasMonsters&&!t.fluid&&t.pearlRadius>3&&t.path.exclusiveSnakeDistance>0&&.5,placeEntities(e){const t=e.cavern.dice.placeEntities(e.plan.id),r=Math.ceil(e.plan.monsterWaveSize/2);return{creatures:qi(e,{rng:t,count:r})}}},{name:"SimpleHall.Filled",...kn,...N({of:be({item:w.FLOOR,bid:1},{item:w.DIRT,bid:.4},{item:w.LOOSE_ROCK,bid:.1})},{of:w.MIX_FRINGE},{of:w.VOID,grow:1}),hallBid:({plan:e})=>!e.fluid&&e.pearlRadius>0&&1},{name:"SimpleHall.Water.River",...kn,crystalsToPlace:({plan:e})=>3*e.crystalRichness*e.perimeter,...N({of:w.WATER,width:2,grow:1},{of:be({item:w.AT_MOST_HARD_ROCK,bid:1},{item:w.VOID,bid:.5})},{of:w.VOID,grow:1}),placeCrystals(e){$t(e,{seamBias:Math.max(e.cavern.context.hallCrystalSeamBias,.75)})},hallBid:({plan:e})=>e.fluid===S.WATER&&1},{name:"SimpleHall.Water.Stream",...kn,...N({of:w.WATER,grow:.5},{of:w.FLOOR,grow:.25,shrink:1},{of:w.DIRT_OR_LOOSE_ROCK,grow:1},{of:w.AT_MOST_HARD_ROCK,shrink:1}),hallBid:({plans:e,plan:t})=>t.fluid===S.WATER&&Vt(e,t,S.WATER)&&1},{name:"SimpleHall.Lava.River",...kn,...N({of:w.LAVA,width:2,grow:1},{of:w.AT_MOST_HARD_ROCK,width:0,grow:1},{of:w.VOID,grow:1}),hallBid:({plan:e})=>e.fluid===S.LAVA&&1},{name:"SimpleHall.Lava.WideWithMonsters",...kn,...N({of:w.LAVA,width:2,grow:1},{of:w.AT_MOST_HARD_ROCK},{of:w.VOID}),hallBid:({cavern:e,plan:t})=>e.context.hasMonsters&&e.context.biome==="lava"&&t.fluid===S.LAVA&&t.pearlRadius>3&&t.path.exclusiveSnakeDistance>0&&1,placeEntities(e){const t=e.cavern.dice.placeEntities(e.plan.id),r=Math.ceil(e.plan.monsterWaveSize/2);return{creatures:qi(e,{rng:t,count:r})}}}],$c={...hu,placeSlugHoles:e=>{const t=e.cavern.context.hasSlugs?e.cavern.dice.placeSlugHoles(e.plan.id).betaInt({a:1.5,b:2,min:1,max:4}):void 0;ka(e,{count:t})},monsterSpawnScript:e=>sr(e,{initialCooldown:{min:120,max:240},needCrystals:{base:4},needStableAir:!0}),slugSpawnScript:e=>pu(e,{initialCooldown:{min:120,max:240},needCrystals:{base:5,increment:4},spawnRate:.2,waveSize:1})},Wg=N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.AT_MOST_LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),V$=[{name:"SimpleSpawn.Open",...$c,...Wg,anchorBid:({plan:e})=>!e.fluid&&e.lakeSize>=3&&e.pearlRadius>0&&1},{name:"SimpleSpawn.Empty",...$c,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),anchorBid:({plan:e})=>!e.fluid&&e.lakeSize>=3&&e.pearlRadius>0&&1},{name:"SimpleSpawn.Fallback",...$c,...Wg,crystalsToPlace:()=>9,anchorBid:({plan:e})=>!e.fluid&&e.pearlRadius>=2&&1e-4}],K$=e=>e.plan.innerPearl.flatMap(t=>t.filter(r=>e.cavern.tiles.get(...r)===S.SLUG_HOLE)),kz={tag:"slugNest"},Mz={...kt,prime:()=>kz,placeCrystals(e){$t(e,{seamBias:Math.max(e.cavern.context.caveCrystalSeamBias,.5)})},placeSlugHoles(e){const t=e.cavern.dice.placeSlugHoles(e.plan.id).betaInt({a:2,b:2,min:4,max:8});ka(e,{count:t})},slugSpawnScript:e=>{const t=K$(e).length;return pu(e,{reArmMode:"none",initialCooldown:{min:20,max:60},needCrystals:{base:Math.floor(Dd(e.cavern)/10)},tripOnArmed:"first",waveSize:t})},claimEventOnDiscover:({cavern:e,plan:t})=>[{pos:ma(e,t),priority:Qi.TRIVIAL}],script:({cavern:e,plan:t,sb:r})=>{const n=ma(e,t);if(!n||e.ownsScriptOnDiscover[e.discoveryZones.get(...n).id]!==t.id)return;const i=ue(`p${t.id}SgNt`,["messageDiscover"]);r.declareString(i.messageDiscover,{die:Oe.foundSlugNest,pg:b9}),r.if(`change:${z(e,n)}`,`msg:${i.messageDiscover};`,`pan:${z(e,t.innerPearl[0][0])};`)}},Nz={...Ma,crystalsToPlace:({plan:e})=>Math.max(e.crystalRichness*e.perimeter,5),placeCrystals(e){$t(e,{seamBias:Math.max(e.cavern.context.hallCrystalSeamBias,.75)})},placeSlugHoles(e){const t=e.cavern.dice.placeSlugHoles(e.plan.id).betaInt({a:2,b:2,min:1,max:3}),r=e.plan.innerPearl.flatMap(n=>n.filter(i=>{var o;return e.tiles.get(...i)===S.FLOOR&&!((o=e.cavern.pearlInnerDex.get(...i))!=null&&o.some((a,s)=>s!==e.plan.id))}));ka(e,{count:t,placements:r})},slugSpawnScript:e=>{const t=K$(e);return pu(e,{emerges:t.map(([r,n])=>({x:r,y:n,radius:1})),initialCooldown:{min:60,max:120},needCrystals:{base:e.plan.crystals*2,increment:e.plan.crystals},tripPoints:t,waveSize:t.length})}},Pz=[{name:"Slugs.Nest",...Mz,...N({of:w.FLOOR,width:3,grow:1},{of:w.AT_MOST_DIRT,width:0,grow:.5},{of:be({item:w.DIRT,bid:.25},{item:w.LOOSE_ROCK,bid:1}),grow:1},{of:w.MIX_LOOSE_HARD_ROCK,grow:.25}),caveBid:({cavern:e,plans:t,plan:r})=>e.context.hasSlugs&&r.pearlRadius>=5&&r.path.baseplates.length===1&&!r.fluid&&!r.hasErosion&&Vt(t,r,null)&&!t.some(n=>{var i;return((i=n.metadata)==null?void 0:i.tag)==="slugNest"})&&e.context.planWhimsy*.25},{name:"Slugs.Hall",...Nz,...N({of:w.FLOOR},{of:be({item:w.LOOSE_OR_HARD_ROCK,bid:1},{item:w.HARD_ROCK,bid:2})},{of:w.VOID,grow:1}),hallBid:({cavern:e,plan:t})=>e.context.hasSlugs&&t.path.exclusiveSnakeDistance>5&&!t.fluid&&!t.hasErosion&&1}],_c={...Ma},Fz=_e.crystals+Ce.crystals+1+po.crystals+1+5,jz=[{name:"ThinHall.Open",..._c,...N({of:w.FLOOR},{of:be({item:w.AT_MOST_HARD_ROCK,bid:1},{item:w.VOID,bid:10})},{of:w.VOID,grow:1}),hallBid:({plan:e})=>!e.fluid&&.2},{name:"ThinHall.Filled",..._c,...N({of:be({item:w.FLOOR,bid:1},{item:w.LOOSE_ROCK,bid:.5})},{of:w.VOID,grow:1}),hallBid:({plan:e})=>!e.fluid&&.1},{name:"ThinHall.HardRock",..._c,...N({of:w.HARD_ROCK},{of:w.VOID,grow:1}),hallBid:({plan:e,totalCrystals:t})=>!e.fluid&&t>=Fz&&e.path.exclusiveSnakeDistance<10&&.7}],Bz={tag:"treasure"},Y$={...kt,prime:()=>Bz,objectives:({cavern:e})=>{const t=e.plans.filter(r=>{var n;return((n=r.metadata)==null?void 0:n.tag)==="treasure"}).reduce((r,n)=>Math.max(r,n.crystals),0);if(!(t<15))return{crystals:Math.floor(t/5)*5,sufficient:!1}}},Rr=ue("gHoard",["lock","message","crystalsAvailable"]),Ug=e=>{var t;return e.objectives.crystals&&((t=Rn(e).metadata)==null?void 0:t.tag)!=="mobFarm"},ws={...Y$,crystalsToPlace:({plan:e})=>e.crystalRichness*e.perimeter*3,placeCrystals(e){const t=k$(e.plan.innerPearl.flatMap(o=>o),e.tiles),r=e.plan.innerPearl[0].length>1?e.plan.innerPearl[0]:[...e.plan.innerPearl[0],...e.plan.innerPearl[1]],n=[...t.map(o=>({bid:1/t.length,item:o})),...r.map(o=>({bid:3/r.length,item:o}))],i=e.cavern.dice.placeCrystals(e.plan.id);$t(e,{getRandomTile:()=>i.weightedChoice(n),seamBias:0})},placeSlugHoles(){},placeEntities(e){if(e.plan.pearlRadius>3){const t=e.cavern.dice.placeEntities(e.plan.id),r=Math.ceil(e.plan.monsterWaveSize/2);return{creatures:qi(e,{rng:t,count:r})}}return{}},monsterSpawnScript:e=>sr(e,{meanWaveSize:e.plan.monsterWaveSize*1.5,reArmMode:"hoard",rng:e.cavern.dice.monsterSpawnScript(e.plan.id),spawnRate:e.plan.monsterSpawnRate*3.5}),scriptGlobals({cavern:e,sb:t}){Ug(e)&&(t.declareInt(Rr.lock,0),t.declareString(Rr.message,{die:Oe.foundHoard,pg:S9}),t.declareInt(Rr.crystalsAvailable,0))},claimEventOnDiscover({plan:e}){return[{pos:e.innerPearl[0][0],priority:Qi.HINT}]},script({cavern:e,plan:t,sb:r}){var o;if(!Ug(e))return;const n=t.innerPearl[0][0];if(e.ownsScriptOnDiscover[((o=e.discoveryZones.get(...n))==null?void 0:o.id)??-1]!==t.id)return;const i=e.plans.some(a=>{var s;return((s=a.metadata)==null?void 0:s.tag)==="lostMiners"});r.if(`change:${z(e,n)}`,`((${Rr.lock}>0))[return][${Rr.lock}=1];`,"wait:1;",`${Rr.lock}=0;`,`((${He.won}>0))return;`,i&&`((${Qt.done}<1))return;`,`${Rr.crystalsAvailable}=crystals+Crystal_C;`,`((${Rr.crystalsAvailable}<${e.objectives.crystals}))return;`,`msg:${Rr.message};`,`pan:${z(e,n)};`)}},Sc={...Y$,monsterSpawnScript:e=>sr(e,{meanWaveSize:e.plan.monsterWaveSize*1.5,spawnRate:e.plan.monsterSpawnRate*2})},Dz=[{name:"Treasure.Hoard.Open",...ws,...N({of:w.ALWAYS_FLOOR,width:2,grow:3},{of:w.LOOSE_ROCK,shrink:1},{of:w.HARD_ROCK,grow:.5}),caveBid:({cavern:e,plans:t,plan:r})=>!r.fluid&&r.path.baseplates.length===1&&jt(r)&&Vt(t,r,null)&&e.context.planWhimsy*.5},{name:"Treasure.Hoard.Sealed",...ws,...N({of:w.ALWAYS_FLOOR,width:1,grow:3},{of:w.ALWAYS_LOOSE_ROCK},{of:w.ALWAYS_HARD_ROCK,grow:.5}),caveBid:({cavern:e,plan:t})=>!t.fluid&&t.path.baseplates.length===1&&jt(t)&&e.context.planWhimsy*.5},{name:"Treasure.Rich.Open",...Sc,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:1},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.5},{of:w.LOOSE_ROCK,grow:2},{of:w.FLOOR,width:2,shrink:1,grow:3},{of:w.LOOSE_ROCK,shrink:1},{of:w.HARD_ROCK,grow:.5}),caveBid:({plan:e})=>!e.fluid&&e.path.baseplates.length>=1&&jt(e)&&1},{name:"Treasure.Rich.Water.Island",...Sc,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:1},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.5},{of:w.ALWAYS_LOOSE_ROCK,grow:2},{of:w.WATER,width:2,grow:3},{of:w.LOOSE_ROCK,shrink:1},{of:w.HARD_ROCK,grow:.5}),caveBid:({plan:e})=>e.fluid===S.WATER&&e.pearlRadius>3&&e.path.baseplates.length>=1&&jt(e)&&.5,placeEntities(e){const t=e.cavern.dice.placeEntities(e.plan.id);if(e.cavern.context.biome==="ice"&&t.chance(.5)){const r=Math.ceil(e.plan.monsterWaveSize/2);return{creatures:qi(e,{rng:t,count:r,placement:"inner"})}}return{}}},{name:"Treasure.Hoard.Water.Peninsula",...ws,...N({of:w.ALWAYS_FLOOR,width:2,grow:1},{of:w.BRIDGE_ON_WATER,width:2,grow:3},{of:w.LOOSE_ROCK,shrink:1},{of:w.HARD_ROCK,grow:.5}),caveBid:({cavern:e,plans:t,plan:r})=>r.fluid===S.WATER&&r.pearlRadius>3&&r.path.baseplates.length>=1&&jt(r)&&Vt(t,r,null)&&e.context.planWhimsy*.5},{name:"Treasure.Rich.Lava.Island",...Sc,...N({of:w.ALWAYS_SOLID_ROCK,width:0,grow:1},{of:w.ALWAYS_HARD_ROCK,width:0,grow:.5},{of:w.ALWAYS_LOOSE_ROCK,grow:2},{of:w.LAVA,width:2,grow:3},{of:w.HARD_ROCK,grow:.5}),caveBid:({plan:e})=>e.fluid===S.LAVA&&e.pearlRadius>3&&e.path.baseplates.length>=1&&jt(e)&&.5},{name:"Treasure.Hoard.Lava.Peninsula",...ws,...N({of:w.ALWAYS_FLOOR,width:2,grow:1},{of:w.BRIDGE_ON_LAVA,width:2,grow:3},{of:w.HARD_ROCK,grow:.5}),caveBid:({cavern:e,plans:t,plan:r})=>r.fluid===S.LAVA&&r.pearlRadius>3&&r.path.baseplates.length>=1&&jt(r)&&Vt(t,r,null)&&e.context.planWhimsy*.5}],Hz=10,Wz=7,Uz=15,zz=500,To=120,Gz={tag:"blackout"},Vz={...hu,prime:()=>Gz,mod(e){const t=ii({caveHasRechargeSeamChance:.15,hallHasRechargeSeamChance:.15,...e.initialContext});return{...e,context:t}},script({cavern:e,plan:t,sb:r}){const n=ue(`p${t.id}Bo`,["crystalBank","doReset","hasPS","loop","showMsg","msgStart","msgEnd","needCrystals","reset","tc","trips"]),i=e.dice.script(t.id);r.declareInt(n.crystalBank,0),r.declareInt(n.needCrystals,Hz),r.declareInt(n.tc,0);const o=e.buildings.filter(a=>a.template===_e);o.some(a=>{var s;return(s=e.discoveryZones.get(...a.foundation[0]))==null?void 0:s.openOnSpawn})?r.declareInt(n.trips,0):(r.declareInt(n.trips,2),o.length?(r.declareInt(n.hasPS,0),r.if(`${_e.id}.new`,`${n.hasPS}=1;`),o.forEach(a=>r.if(`change:${z(e,a.foundation[0])}`,`${n.hasPS}=1;`)),r.if(`${n.hasPS}>0`,`${n.trips}=0;`)):r.if(`${_e.id}.new`,`${n.trips}=0;`)),r.when(`crystals>=${n.needCrystals}`,`${n.trips}+=1;`),r.declareInt(n.showMsg,0),r.when(`${n.trips}==1`,"wait:random(5)(30);",`${n.needCrystals}=crystals+${Wz};`,"disable:lights;",`${n.reset}=0;`,`${n.loop};`,"wait:1;",`${n.showMsg}=1;`),r.declareString(n.msgStart,{pg:C9,rng:i}),r.if(`${n.showMsg}==1`,`msg:${n.msgStart};`),r.declareInt(n.reset,0),r.when("building.dead",`${n.reset}=${To-5};`),r.when("vehicle.dead",`${n.reset}=${To-5};`),r.when(`${n.crystalBank}>=${n.needCrystals}`,`${n.reset}=${To};`),r.event(n.loop,`${n.tc}=crystals;`,`crystals-=${n.tc};`,`${n.crystalBank}+=${n.tc};`,"wait:1;",e.oxygen&&`((air<${zz}))${n.reset}=${To};`,`${n.reset}+=1;`,`((${n.reset}>=${To}))[${n.doReset}][${n.loop}];`),r.event(n.doReset,`crystals+=${n.crystalBank};`,`${n.needCrystals}=${n.crystalBank}+${Uz};`,`${n.crystalBank}=0;`,"wait:1;","enable:lights;",`${n.trips}=0;`,"wait:1;",`${n.showMsg}=2;`),r.declareString(n.msgEnd,{pg:T9,rng:i}),r.if(`${n.showMsg}==2`,`msg:${n.msgEnd};`)}},Kz=[{name:"Blackout",...Vz,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),anchorBid:({cavern:e,plan:t})=>!t.fluid&&t.lakeSize>=3&&t.pearlRadius>0&&!e.context.hasSlugs&&e.context.anchorWhimsy*.03}],zg=[On,po,Hd,va,mu,D9,H9,W9,$l,U9,z9],Yz={...hu,prime:({cavern:e,plan:t})=>({tag:"mobFarm",hoardSize:e.dice.prime(t.id).betaInt({a:4,b:4,min:170,max:230})}),mod(e){const t=ii({caveCrystalRichness:{base:-.16,hops:.32,order:.32},hallCrystalRichness:{base:0,hops:0,order:0},caveCrystalSeamBias:.7,globalHostilesCap:10,...e.initialContext});return{...e,context:t}},crystalsToPlace:({plan:e})=>Math.max(e.crystalRichness*e.perimeter,9),crystalsFromMetadata:e=>4+$l.crystals+e.hoardSize,placeRechargeSeam:mo(3),placeBuildings(e){const[t]=Fd({from:4,queue:[{bt:de,required:!0}]},e);t.foundation.forEach(([n,i])=>e.tiles.set(n,i,S.FOUNDATION)),e.openCaveFlags.set(...t.foundation[0],!0);const r=_$(t.foundation[0],e.plan.innerPearl.flatMap(n=>n.filter(i=>{const o=e.tiles.get(...i);return o===S.DIRT||o===S.LOOSE_ROCK})));return e.tiles.set(...r,S.CRYSTAL_SEAM),{buildings:[t],cameraPosition:Br({...pg(e.plan.innerPearl[0][0]),aimedAt:[t.x,t.y],pitch:Math.PI/3})}},placeCrystals(e){$t(e);const t=e.plan.innerPearl.flatMap((n,i)=>i<=2?n:[]).filter(n=>{const i=e.tiles.get(...n);return i&&!i.isWall&&!i.isFluid}),r=e.cavern.dice.placeCrystals(e.plan.id);$t(e,{getRandomTile:()=>r.betaChoice(t,{a:1,b:2.5}),seamBias:0,count:e.plan.metadata.hoardSize})},placeSlugHoles(){},placeLandslides(){},placeEntities({cavern:e,plan:t,minerFactory:r,vehicleFactory:n}){const i=e.dice.placeEntities(t.id),o=e.buildings.find(c=>{var f;return(f=e.pearlInnerDex.get(...c.foundation[0]))==null?void 0:f[t.id]}),a=Ke.map(c=>tr(o.foundation[0],c)).filter(c=>{const f=e.tiles.get(...c);return f&&!f.isWall&&!f.isFluid}),s=pn({...pg(i.uniformChoice(a)),rng:i}),l=r.create({loadout:["Drill","JobDriver","JobEngineer"],planId:t.id,...s}),u=n.create({template:$l,upgrades:["UpLaser"],planId:t.id,driverId:l.id,...s});return{miners:[l],vehicles:[u]}},objectives({cavern:e}){const t=e.plans[e.anchor].crystals*.6;return{crystals:Math.floor(t/5)*5,sufficient:!0}},script({cavern:e,plan:t,sb:r}){const n=ue(`p${t.id}MbFm`,["msgNotBlocking"]),i=e.dice.script(t.id);r.onInit(...zg.map(o=>`disable:${o.id};`)),e.objectives.variables.length>0&&(r.declareString(n.msgNotBlocking,{rng:i,pg:L9}),r.if(`crystals>=${e.objectives.crystals}`,"wait:5;",...zg.map(o=>`enable:${o.id};`),`((${He.won}==0))msg:${n.msgNotBlocking};`)),H$(r)},monsterSpawnScript:e=>sr(e,{initialCooldown:{min:120,max:240},needCrystals:{base:2},tripOnArmed:"always"})},qz=[{name:"MobFarm.Water",...Yz,...N({of:w.ALWAYS_FLOOR,width:2},{of:w.WATER,width:2,grow:.5},{of:w.FLOOR,grow:1},{of:be({item:w.LOOSE_ROCK,bid:5},{item:w.FLOOR,bid:1})},{of:be({item:w.LOOSE_ROCK,bid:10},{item:w.LOOSE_OR_HARD_ROCK,bid:1})},{of:w.MIX_FRINGE}),anchorBid:({cavern:e,plan:t})=>e.context.biome==="ice"&&e.context.hasMonsters&&t.fluid===S.WATER&&t.pearlRadius>6&&t.path.baseplates.length===1&&t.intersects.some((r,n)=>{const i=e.plans[n];return!i.fluid&&i.lakeSize>=6})&&t.intersects.reduce((r,n,i)=>e.plans[i].fluid?r+1:r,0)<=1&&2}],Xz={tag:"oreWaste"},Qz=de.ore+5+6+_t.ore+5+_e.ore+5+Ce.ore+Ia.ore;function Zz(e){return e===S.DIRT?S.WASTE_DIRT:e===S.LOOSE_ROCK?S.WASTE_LOOSE_ROCK:e===S.HARD_ROCK?S.WASTE_HARD_ROCK:e===S.SOLID_ROCK?S.WASTE_SOLID_ROCK:null}const Jz={...hu,mod(e){const t=ii({caveOreRichness:{base:.4,hops:.2,order:-.2},caveOreSeamBias:.6,...e.initialContext});return{...e,context:t}},prime:()=>Xz,closer({cavern:e,tiles:t}){t.forEach((r,n,i)=>{var a;const o=Zz(r);o&&!((a=e.pearlOuterDex.get(n,i))!=null&&a.some((s,l)=>e.plans[l].kind==="cave"&&s<1))&&t.set(n,i,o)})},objectives({cavern:e}){if(e.plans.some(r=>{var n;return((n=r.metadata)==null?void 0:n.tag)==="buildAndPower"}))return;const t=(N$(e)-Qz)*e.context.crystalGoalRatio/5;if(!(t<=0))return{studs:Math.floor(t/5)*5,sufficient:!1}},script({sb:e}){K9(e)}},e7=[{name:"OreWaste",...Jz,...N({of:w.ALWAYS_FLOOR,width:2,grow:2},{of:w.LOOSE_ROCK,grow:1},{of:w.MIX_FRINGE}),anchorBid:({cavern:e,plan:t})=>!t.fluid&&t.lakeSize>=3&&t.pearlRadius>0&&e.plans.reduce((r,n)=>n.hasErosion?r+1:r,0)<3&&e.context.anchorWhimsy*.03}];function q$(e,t){return e.filter(r=>{var n;return((n=t.context.architects)==null?void 0:n[r.name])!=="disable"}).map(r=>{var n;if(((n=t.context.architects)==null?void 0:n[r.name])==="encourage"){const i={...r};return i.caveBid=o=>{var a;return!!((a=r.caveBid)!=null&&a.call(r,o))&&999999},i.hallBid=o=>{var a;return!!((a=r.hallBid)!=null&&a.call(r,o))&&999999},i.anchorBid=o=>{var a;return!!((a=r.anchorBid)!=null&&a.call(r,o))&&999999},i}return r})}function X$(e){const t=e.filter(n=>"hops"in n),r=[];t.forEach(n=>r[n.id]=!0);for(let n=0;n<e.length;n++){const i=t[n];if(!i)throw new Error("Failed to order all plans. (Is the graph disjoint?)");const o=i.intersects.map((a,s)=>a?s:-1).filter(a=>a>=0&&!r[a]&&e[a].kind!==i.kind);o.forEach(a=>r[a]=!0),t.push(...o.map(a=>({...e[a],hops:[...i.hops,i.id]})))}return t}function $s(e,t){return e.base+e.hops*t.hops+e.order*t.order}function t7(e){const t=q$(Gd,e),r=X$(e.plans),n=[];r.forEach(u=>n[u.id]=u);let i=0;const o=r.length-1,a=r[r.length-1].hops.length;function s(u,c){const f={hops:u.hops.length/a,order:c/o},h=u.architect||e.dice.pickArchitect(u.id).weightedChoice(t.map(m=>{const g=u.kind==="cave"?m.caveBid:m.hallBid;return{item:m,bid:(g==null?void 0:g({cavern:e,plan:u,plans:n,hops:u.hops,totalCrystals:i}))||0}})),d=h.prime({cavern:e,plan:u}),y=$s(u.kind==="cave"?e.context.caveCrystalRichness:e.context.hallCrystalRichness,f),_=$s(u.kind==="cave"?e.context.caveOreRichness:e.context.hallOreRichness,f),$=$s(e.context.monsterSpawnRate,f),v=$s(e.context.monsterWaveSize,f);return{...u,architect:h,metadata:d,crystalRichness:y,oreRichness:_,monsterSpawnRate:$,monsterWaveSize:v}}function l(u){const c={cavern:e,plan:u,totalCrystals:i},f=u.architect.baroqueness(c),h=Math.round(u.architect.crystalsToPlace(c)+u.architect.crystalsFromMetadata(u.metadata));i+=h;const d=Math.round(u.architect.ore(c)),y={...u,baroqueness:f,crystals:h,ore:d};n[u.id]=y}return r.forEach((u,c)=>l(s(u,c))),{...e,plans:n}}const zd=["Oh dear.","Uh-oh!","Oh no!","Be careful."],r7=Z("Pandora - Did spawn monster from seam",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(...zd,o).then("Drilling that Energy Crystal Seam must have upset them.","Try to avoid drilling those seams! The monsters here don't like it.").then(n)}),n7=Z("Pandora - Did spawn rogue monster",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(...zd,o).then(({format:{monsters:a}})=>`Attacking the ${a} only upsets them!`,"It seems attacking them attracts more monsters.").then(n)}),i7=Z("Pandora - Did spawn hoard",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(...zd,o).then("We've upset the horde.","The monsters have started a feast. ").then(n)}),o7=Z("Pandora - Approaching hoard",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("This is it!","You're getting very close.",o).then(({format:{monsters:a}})=>`Make sure your Rock Raiders are armed and ready to take on those ${a}.`,"This will be a tough fight once you breach those walls. Make sure you are ready to defend those Energy Crystals!").then(n)}),Gg={tag:"pandora"},Vg=3,we=ue("gPandora",["didSpawnSeam","msgApproachingHoard","msgDidSpawnSeam","msgDidSpawnHoard","msgDidSpawnRogue","onDisturbed","roll","willSpawnHoard","willSpawnRogue"]),Kg=e=>ue(`p${e.id}Pa`,["approachingHoard","doCollapse","lyDidCollapse","lyWillCollapse","maybeCollapse","spawnHoard"]);function Yg(e){const t=e.buildings.find(i=>{var o;return i.template===de&&((o=e.discoveryZones.get(Math.floor(i.x),Math.floor(i.y)))==null?void 0:o.openOnSpawn)});if(t)return[t.x,t.y];const r="miners"in e&&e.miners.find(i=>{var o;return(o=e.discoveryZones.get(Math.floor(i.x),Math.floor(i.y)))==null?void 0:o.openOnSpawn});if(r)return[r.x,r.y];const n=e.plans.find(i=>i.hops.length===0);if(n)return n.path.baseplates[0].center;throw new Error("Failed to find anything to pan to. Is there even a spawn?")}const a7={...kt,crystalsToPlace:({plan:e})=>e.crystalRichness*e.perimeter*20,mod(e){const t={...e.context,caveCrystalSeamBias:Math.max(.6,e.initialContext.caveCrystalSeamBias??0)},r=[...e.plans],n=X$(r),i=V$.flatMap(l=>n.filter(u=>u.kind==="cave"&&u.hops.length>0).map(u=>({dist:u.hops.length,item:{...u,architect:l,hops:[]},bid:l.anchorBid({cavern:e,plan:u})||0}))),o=i.reduce((l,u)=>u.bid>0?Math.max(u.dist,l):l,0),a=e.dice.mod(0).weightedChoice(i.filter(({dist:l})=>l===o));r[a.id]=a;const s={...Rn(e),metadata:Gg};return delete s.hops,r[s.id]=s,{...e,context:t,plans:r}},prime:()=>Gg,placeBuildings({cavern:e,plan:t,openCaveFlags:r}){return t.innerPearl.some(n=>n.some(i=>{var o;return((o=e.tiles.get(...i))==null?void 0:o.isWall)===!1?(r.set(...i,!0),!0):!1})),{}},placeCrystals(e){const t=e.cavern.dice.placeCrystals(e.plan.id),r=e.plan.innerPearl.length-Vg,n=e.plan.innerPearl.flatMap((l,u)=>u<r?l:[]).filter(l=>{const u=e.tiles.get(...l);return u&&u.hardness<Re.HARD}),i=[],o=[];n.forEach(l=>{var u;return((u=e.cavern.tiles.get(...l))!=null&&u.isWall?i:o).push(l)});const a=Math.round(Math.min(i.length*.15*4,e.plan.crystals/2));$t(e,{count:a,getRandomTile:()=>t.betaChoice(i,{a:4,b:.8}),seamBias:1});const s=Math.round(Math.min(o.length*1.3,(e.plan.crystals-a)/2));$t(e,{count:s,getRandomTile:()=>t.uniformChoice(o)}),$t(e,{count:e.plan.crystals-a-s,getRandomTile:()=>t.betaChoice(i,{a:.8,b:1.5}),seamBias:-1})},placeOre:()=>{},placeSlugHoles:()=>{},placeLandslides:()=>{},placeEntities({cavern:e,plan:t}){const[r,n]=t.innerPearl[0][0],i=Yg(e);return{cameraPosition:Br({x:r,y:n,aimedAt:i,pitch:Math.PI/3})}},objectives:({cavern:e})=>({crystals:Math.floor(e.plans[e.anchor].crystals*.33/5)*5,sufficient:!1}),scriptGlobals({cavern:e,sb:t}){t.if("time:5",`pan:${z(e,Yg(e))};`);const r=Yi(e.context.biome).id;t.declareInt(we.didSpawnSeam,0),e.tiles.forEach((o,...a)=>{var l;if(o.id!==S.CRYSTAL_SEAM.id||(l=e.pearlInnerDex.get(...a))!=null&&l[e.anchor])return;const s=z(e,a);t.if(`drill:${s}`,"wait:random(1)(4);",e.context.globalHostilesCap>0&&`((${re.active}>=${e.context.globalHostilesCap}))return;`,`emerge:${s},A,${r},5;`,`${we.didSpawnSeam}+=1;`)}),t.if(`${we.didSpawnSeam}>=1`,`msg:${t.declareString(we.msgDidSpawnSeam,{pg:r7,die:Oe.pandora})};`),t.when(`${r}.wake`,`${we.onDisturbed};`),t.when(`${r}.dead`,"((lastcreature.hp>0))return;",`${we.onDisturbed};`),t.declareFloat(we.roll,0),t.event(we.onDisturbed,`((${re.active}>=${e.context.globalHostilesCap}))return;`,`${we.roll}=random(0)(100);`,`((${we.roll}>75))return;`,`((${we.roll}>10))[${we.willSpawnRogue}+=1][${we.willSpawnHoard}+=1];`),t.declareInt(we.willSpawnRogue,0);const n=Math.floor((e.right-e.left)/2),i=Math.floor((e.bottom-e.top)/2);t.when(`${we.willSpawnRogue}>=1`,"wait:random(1)(5);",e.context.globalHostilesCap>0&&`${re.active}+=1;`,`emerge:${i},${n},A,${r},${Math.max(n,i)};`),t.if(`${we.willSpawnRogue}>=1`,"wait:5;",`msg:${t.declareString(we.msgDidSpawnRogue,{pg:n7,die:Oe.pandora})};`),t.declareInt(we.willSpawnHoard,0)},script({cavern:e,plan:t,sb:r}){const n=e.dice.script(t.id),i=Kg(t);r.declareInt(i.approachingHoard,0),t.outerPearl[2].filter(u=>e.tiles.get(...u)).map(u=>r.if(`enter:${z(e,u)}`,`${i.approachingHoard}=1;`)),r.if(`${i.approachingHoard}>0`,`msg:${r.declareString(we.msgApproachingHoard,{pg:o7,rng:n})};`),r.when(`${we.willSpawnHoard}>=1`,`${i.spawnHoard};`),r.if(`${we.willSpawnHoard}>=1`,"wait:2;",`msg:${r.declareString(we.msgDidSpawnHoard,{pg:i7,die:Oe.pandora})};`,`pan:${z(e,t.path.baseplates[0].center)};`);const o=t.innerPearl.map((u,c)=>{let f=0,h=0;const d=[],y=[];return c<t.innerPearl.length-Vg&&u.forEach(_=>{var $;($=e.tiles.get(..._))!=null&&$.isWall?(d.push(_),f+=e.crystals.get(..._)??0):(y.push(_),h+=e.crystals.get(..._)??0)}),{wallCrystals:f,floorCrystals:h,walls:d,floors:y}}),a=Math.min(20,o.reduce((u,{floorCrystals:c})=>u+c,0));r.when(`${Yi(e.context.biome).id}.new`,`${i.maybeCollapse};`);let s=-1;if(!o.some(({walls:u,wallCrystals:c},f)=>c>0&&u.length>0?(r.event(`${i.doCollapse}${f}`,"wait:2;","shake:2;",...u.flatMap((h,d)=>Xi(`drill:${z(e,h)};`,d%5===4&&f<u.length-1&&"wait:0.4;")),"wait:1;",`${i.lyDidCollapse}=${f};`),!1):(s=f,r.declareInt(i.lyWillCollapse,f),r.declareInt(i.lyDidCollapse,f),!0)))throw new Error("Failed to reach outer layer.");r.event(i.maybeCollapse,`((Crystal_C>${a}))return;`,`((${i.lyWillCollapse}>=${i.lyDidCollapse}))[${i.lyWillCollapse}-=1][return];`,...o.map((u,c)=>c<s?`((${i.lyWillCollapse}==${c}))${i.doCollapse}${c};`:null))},monsterSpawnScript:e=>sr(e,{tripEvent:Kg(e.plan).spawnHoard,spawnRate:40,tripPoints:e.plan.innerPearl[e.plan.innerPearl.length-3],force:!0}),slugSpawnScript:()=>{}};function qg(e,{roughExtent:t,rough:r}){return{roughExtent:t,rough:i=>{r(i);const o=i.plan.intersects.reduce((a,s,l)=>a>=0?a:l,-1);i.cavern.plans[o].innerPearl[0].forEach(a=>{var l;(i.cavern.pearlInnerDex.get(...a)[i.plan.id]??1/0)<=e&&((l=i.tiles.get(...a))==null?void 0:l.isWall)!==!1&&i.tiles.set(...a,S.FLOOR)})}}}const Ec=e=>({...kt,crystalsToPlace:({plan:t})=>t.crystalRichness*t.perimeter*2,placeEntities(t){const r=t.cavern.dice.placeEntities(t.plan.id);return{creatures:qi(t,{rng:r,count:3,to:e-1,force:!0})}},placeCrystals(t){const r=t.cavern.dice.placeCrystals(t.plan.id),n=t.plan.innerPearl[e].filter(o=>{var a;return(a=t.tiles.get(...o))==null?void 0:a.isWall}),i=n.length>0?n:t.plan.innerPearl.flatMap(o=>o.filter(a=>{var s;return(s=t.tiles.get(...a))==null?void 0:s.isWall}));$t(t,{getRandomTile:()=>r.uniformChoice(i),seamBias:1})}}),s7=[{name:"Pandora.Hoard",...a7,...N({of:w.ALWAYS_DIRT,grow:1},{of:w.ALWAYS_FLOOR,width:2},{of:w.ALWAYS_HARD_ROCK},{of:w.AT_LEAST_HARD_ROCK}),anchorBid:({cavern:e,plan:t})=>e.context.hasMonsters&&!t.fluid&&Vt(e.plans,t,null)&&t.pearlRadius>5&&e.context.anchorWhimsy*.1},{name:"Pandora.Minihoard",...Ec(2),...qg(4,N({of:w.ALWAYS_FLOOR,width:2},{of:w.ALWAYS_HARD_ROCK},{of:w.ALWAYS_SOLID_ROCK},{of:w.FLOOR,grow:1},{of:w.MIX_DIRT_LOOSE_ROCK,width:0,grow:.5},{of:w.MIX_FRINGE})),caveBid:({cavern:e,plan:t,plans:r})=>{var n;return((n=r[e.anchor].metadata)==null?void 0:n.tag)==="pandora"&&!t.fluid&&Vt(e.plans,t,null)&&t.pearlRadius>4&&e.context.anchorWhimsy*4}},{name:"Pandora.Minihoard.DeadEnd",...Ec(2),...N({of:w.ALWAYS_FLOOR,width:2},{of:w.MIX_AT_MOST_DIRT_LOOSE_ROCK,width:0,grow:1},{of:w.AT_MOST_HARD_ROCK},{of:w.MIX_FRINGE}),caveBid:({cavern:e,plan:t,plans:r})=>{var n;return((n=r[e.anchor].metadata)==null?void 0:n.tag)==="pandora"&&!t.fluid&&jt(t)&&t.pearlRadius>2&&e.context.anchorWhimsy*4}},{name:"Pandora.Minihoard.Island",...Ec(2),...qg(4,N({of:w.ALWAYS_FLOOR,width:2},{of:w.ALWAYS_HARD_ROCK},{of:w.ALWAYS_SOLID_ROCK},{of:w.WATER,grow:1},{of:w.MIX_FRINGE})),caveBid:({cavern:e,plan:t,plans:r})=>{var n;return((n=r[e.anchor].metadata)==null?void 0:n.tag)==="pandora"&&t.fluid===S.WATER&&t.pearlRadius>5&&e.context.anchorWhimsy*4}}],Gd=[...Kz,...e9,...az,...wz,...$z,...Ez,...xz,...qz,...Tz,...e7,...s7,...Lz,...Iz,...V$,...Pz,...jz,...Dz],l7=({update:e,initialContext:t,cavern:r})=>{function n(o,a){const s={...t.architects};if(a===void 0){if(o in s&&delete s[o],Object.keys(s).length===0){e({architects:void 0});return}}else s[o]!==a&&(s[o]=a);e({architects:s})}const i=q.useMemo(()=>{var a;const o={};return(a=r==null?void 0:r.plans)==null||a.forEach(s=>s.architect&&(o[s.architect.name]=(o[s.architect.name]??0)+1)),o},[r]);return[...Gd].map(o=>{var s,l;const a=(s=t.architects)==null?void 0:s[o.name];return p.jsxs($0.Fragment,{children:[p.jsx("p",{children:o.name}),p.jsxs("div",{className:k.inputRow,children:[p.jsx("button",{className:`${k.choice} ${a==="encourage"?k.override:k.inactive}`,onClick:()=>n(o.name,a==="encourage"?void 0:"encourage"),children:"Encourage"}),p.jsx("button",{className:`${k.choice} ${a==="disable"?k.override:k.inactive}`,onClick:()=>n(o.name,a==="disable"?void 0:"disable"),children:"Disable"}),a==="encourage"&&!i[o.name]&&((l=r==null?void 0:r.plans)!=null&&l.some(u=>"architect"in u))?p.jsx("div",{className:`${k.architectCount} ${k.icon}`,children:"warning"}):p.jsx("div",{className:k.architectCount,children:i[o.name]})]})]},o.name)})},u7=Date.now()%dn;function c7(){return Jf(window.location.hash)??u7}function Jf(e){const t=e.replace(/[^0-9a-fA-F]+/g,""),r=t===""?-1:parseInt(t,16);return r>=0&&r<dn?r:void 0}function Xg(e,t){const r=e.toString(16).padStart(8,"0").toUpperCase();return t?`${r.substring(0,3)} ${r.substring(3,6)} ${r.substring(6)}`:r}const Ac=e=>{const t=e.caveCount,r=e.caveCount-1,n=e.optimalAuxiliaryPathCount+e.randomAuxiliaryPathCount;return t+r+n};function f7({initialContext:e,cavern:t,setInitialContext:r}){return p.jsx(h7,{initialContext:e,context:(t==null?void 0:t.context)??ii(e),cavern:t,setInitialContext:r})}function h7({initialContext:e,context:t,cavern:r,setInitialContext:n}){const[i,o]=q.useState(!1),a=q.useCallback(()=>n(u=>({seed:u.seed})),[n]),s=q.useCallback(u=>n(c=>{const f={...c,...u};for(const h of Object.keys(f))f[h]===void 0&&h in f&&delete f[h];return f}),[n]);q.useEffect(()=>{const u=()=>{const c=Jf(window.location.hash);c!==void 0&&s({seed:c})};return window.addEventListener("hashchange",u),()=>{window.removeEventListener("hashchange",u)}},[s]),q.useEffect(()=>{window.location.hash=Xg(e.seed,!1)},[e.seed]);const l={update:s,initialContext:e,context:t};return p.jsxs("div",{className:k.contextInput,children:[p.jsxs("div",{className:k.inputRow,children:[p.jsx("input",{type:"text",className:k.seed,value:Xg(e.seed,!0),onChange:u=>{const c=Jf(u.target.value);c!==void 0&&s({seed:c})},spellCheck:!1}),p.jsx("button",{className:k.icon,onClick:()=>s({seed:Math.floor(Math.random()*dn)}),children:"ifl"})]}),p.jsx("div",{className:k.inputRow,children:p.jsxs("button",{className:`${k.showAdvanced} ${Object.keys(e).length>1&&!i?k.override:""}`,onClick:()=>o(u=>!u),children:[p.jsx("span",{children:"Advanced"}),p.jsx("span",{className:k.icon,children:i?"expand_less":"expand_more"})]})}),i&&p.jsxs(p.Fragment,{children:[p.jsx("div",{className:k.section,children:p.jsxs("div",{className:k.subsection,children:[p.jsx("div",{className:k.inputRow,children:Object.keys(e).length>1?p.jsx("button",{className:k.override,onClick:a,children:"Clear All Overrides"}):p.jsx("div",{className:k.invisible})}),p.jsx(ms,{of:"biome",choices:["rock","ice","lava"],...l}),p.jsx(ms,{of:"hasMonsters",choices:[!0,!1],...l}),p.jsx(ms,{of:"hasSlugs",choices:[!0,!1],...l}),p.jsx(ms,{of:"hasAirLimit",choices:[!0,!1],...l})]})}),p.jsxs("div",{className:k.section,children:[p.jsx("h2",{children:"Outlines"}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Partition"}),p.jsx(fe,{of:"targetSize",min:40,max:100,...l}),p.jsx(fe,{of:"baseplateMaxOblongness",min:0,max:10,...l}),p.jsx(fe,{of:"baseplateMaxRatioOfSize",min:0,max:1,percent:!0,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Discriminate"}),p.jsx(fe,{of:"caveCount",min:3,max:50,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Weave"}),p.jsx(fe,{of:"optimalAuxiliaryPathCount",min:0,max:t.caveCount,...l}),p.jsx(fe,{of:"randomAuxiliaryPathCount",min:0,max:t.caveCount,...l}),p.jsx(fe,{of:"auxiliaryPathMinAngle",min:0,max:Math.PI,angle:!0,...l})]})]}),p.jsxs("div",{className:k.section,children:[p.jsx("h2",{children:"Planning"}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Flood"}),p.jsx(fe,{of:"waterPlans",min:0,max:Ac(t),...l}),p.jsx(fe,{of:"lavaPlans",min:0,max:Ac(t),...l}),p.jsx(fe,{of:"waterLakes",min:1,max:t.caveCount,...l}),p.jsx(fe,{of:"lavaLakes",min:1,max:t.caveCount,...l}),p.jsx(fe,{of:"erosionPlans",min:0,max:Ac(t),...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Anchor"}),p.jsx(pc,{of:"anchorGravity",min:-7,max:7,step:.5,...l}),p.jsx(pc,{of:"anchorWhimsy",min:-7,max:7,step:.5,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Establish"}),p.jsx(pc,{of:"planWhimsy",min:-7,max:7,step:.5,...l}),p.jsx(l7,{...l,cavern:r}),["caveCrystalRichness","hallCrystalRichness","caveOreRichness","hallOreRichness","monsterSpawnRate"].map(u=>p.jsx(mg,{of:u,min:-.5,max:1.5,step:.01,...l},u)),p.jsx(mg,{of:"monsterWaveSize",min:-1,max:5,step:.25,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Pearl"}),p.jsx(fe,{of:"caveBaroqueness",min:0,max:.8,percent:!0,...l}),p.jsx(fe,{of:"hallBaroqueness",min:0,max:.8,percent:!0,...l})]})]}),p.jsxs("div",{className:k.section,children:[p.jsx("h2",{children:"Masonry"}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Fine"}),["caveHasRechargeSeamChance","hallHasRechargeSeamChance","caveCrystalSeamBias","hallCrystalSeamBias","caveOreSeamBias","hallOreSeamBias","caveHasSlugHoleChance","hallHasSlugHoleChance"].map(u=>p.jsx(fe,{of:u,min:0,max:1,percent:!0,update:s,initialContext:e,context:t},u))]})]}),p.jsxs("div",{className:k.section,children:[p.jsx("h2",{children:"Plastic"}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Strataform"}),p.jsx(fe,{of:"heightTargetRange",min:0,max:600,step:5,...l}),p.jsx(fe,{of:"stratascosity",min:0,max:20,step:1,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Strataflux"}),p.jsx(fe,{of:"strataplanity",min:0,max:10,...l}),["caveMaxSlope","hallMaxSlope","voidMaxSlope","borderMaxSlope"].map(u=>p.jsx(fe,{of:u,min:0,max:300,...l},u))]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Populate"}),["caveHasLandslidesChance","hallHasLandslidesChance"].map(u=>p.jsx(fe,{of:u,min:0,max:1,percent:!0,update:s,initialContext:e,context:t},u))]})]}),p.jsxs("div",{className:k.section,children:[p.jsx("h2",{children:"Ephemera"}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Aerate"}),p.jsx(fe,{of:"airSafetyFactor",min:1,max:5,step:.1,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Adjure"}),p.jsx(fe,{of:"crystalGoalRatio",min:0,max:.9,percent:!0,...l})]}),p.jsxs("div",{className:k.subsection,children:[p.jsx("h3",{children:"Enscribe"}),p.jsx(fe,{of:"globalHostilesCooldown",min:0,max:20,...l}),p.jsx(fe,{of:"globalHostilesCap",min:0,max:40,zeroLabel:"disabled",...l})]})]})]})]})}const d7="_cavernPreview_mhy0i_26",p7="_mapWrapper_mhy0i_80",m7="_map_mhy0i_80",v7="_baseplate_mhy0i_92",g7="_fg_mhy0i_95",y7="_ambiguousKind_mhy0i_98",w7="_bg_mhy0i_98",$7="_caveKind_mhy0i_101",_7="_hallKind_mhy0i_104",S7="_path_mhy0i_107",E7="_spanningKind_mhy0i_115",A7="_auxiliaryKind_mhy0i_118",O7="_plan_mhy0i_131",R7="_hasScript_mhy0i_139",b7="_isAnchor_mhy0i_142",x7="_spanningPathKind_mhy0i_149",C7="_auxiliaryPathKind_mhy0i_152",T7="_fluid6_mhy0i_155",L7="_fluid11_mhy0i_158",I7="_left_mhy0i_161",k7="_label_mhy0i_161",M7="_inline_mhy0i_164",N7="_pointer_mhy0i_172",P7="_pearl_mhy0i_180",F7="_innerPearl_mhy0i_180",j7="_outerPearl_mhy0i_195",B7="_layer_mhy0i_202",D7="_layer0_mhy0i_202",H7="_layer1_mhy0i_205",W7="_layer2_mhy0i_208",U7="_layer3_mhy0i_211",z7="_tiles_mhy0i_214",G7="_tile_mhy0i_214",V7="_resources_mhy0i_220",K7="_ore_mhy0i_220",Y7="_ring_mhy0i_220",q7="_crystals_mhy0i_223",X7="_height_mhy0i_226",Q7="_entity_mhy0i_229",Z7="_enemy_mhy0i_232",J7="_marker_mhy0i_235",eG="_openCaveFlag_mhy0i_247",tG="_objectives_mhy0i_251",rG="_origin_mhy0i_251",nG="_objective_mhy0i_251",iG="_stats_mhy0i_261",oG="_error_mhy0i_290",D={cavernPreview:d7,mapWrapper:p7,map:m7,void:"_void_mhy0i_89",baseplate:v7,fg:g7,ambiguousKind:y7,bg:w7,caveKind:$7,hallKind:_7,path:S7,spanningKind:E7,auxiliaryKind:A7,plan:O7,hasScript:R7,isAnchor:b7,spanningPathKind:x7,auxiliaryPathKind:C7,fluid6:T7,fluid11:L7,left:I7,label:k7,inline:M7,pointer:N7,pearl:P7,innerPearl:F7,outerPearl:j7,layer:B7,layer0:D7,layer1:H7,layer2:W7,layer3:U7,tiles:z7,tile:G7,resources:V7,ore:K7,ring:Y7,crystals:q7,height:X7,entity:Q7,enemy:Z7,marker:J7,openCaveFlag:eG,objectives:tG,origin:rG,objective:nG,stats:iG,error:oG},di=6;function aG({baseplate:e}){return p.jsxs("g",{className:`${D.baseplate} ${D[`${e.kind}Kind`]}`,children:[p.jsx("rect",{className:D.bg,x:e.left*di,y:e.top*di,width:e.width*di,height:e.height*di}),p.jsx("text",{className:D.fg,x:e.left*di,y:e.top*di+8,children:e.id})]},`bp${e.id}`)}const Qg=6;function Q$({path:e}){const t=e.baseplates.map((r,n)=>{const[i,o]=r.center;return`${n===0?"M":"L"}${i*Qg} ${o*Qg}`}).join(" ");return p.jsxs("g",{className:`${D.path} ${D[`${e.kind}Kind`]}`,children:[p.jsx("path",{id:`path${e.id}`,d:t,fill:"none"}),p.jsx("text",{children:p.jsx("textPath",{href:`#path${e.id}`,startOffset:"25%",children:e.id})})]},`path${e.id}`)}const _s=6;function sG(e){if(e.length===0)return"";const t=Nd(e,([i,o],[a,s])=>`${rU([i,o],[a,s])?"L":"M"}${(a+.5)*_s} ${(s+.5)*_s}`),[r,n]=e[0];return`M${(r+.5)*_s} ${(n+.5)*_s} ${t.join(" ")}`}function Zg({plan:e,pearl:t}){const r=t==="outerPearl"?e.innerPearl.length:0;return p.jsx("g",{className:`${D.pearl} ${D[t]} ${D[`${e.kind}Kind`]}`,children:e[t].map((n,i)=>p.jsx("path",{className:`${D.layer} ${D[`layer${(i+r)%4}`]}`,d:sG(n),fill:"none",children:p.jsxs("title",{children:["Plan ",e.id,", ",t==="outerPearl"?"Outer ":"","Layer ",i]})},i))})}const lG=6,Us=8,uG=600,cG=300;function br(e){return`tile${e.id}`}const fG={[S.WATER.id]:"dwater",[S.LAVA.id]:"dlava",[S.SOLID_ROCK.id]:"dsolid"};function xr(e){return fG[e.id]??(e.isWall?"dwall":"dfloor")}function Lo(e){return`scale${Math.min(Math.floor(e),Us-1)}`}function hG(e,t,r,n,i){var o,a,s,l,u,c,f,h,d,y,_,$,v,m;switch(t){case"overview":{for(let g=-1;g<=1;g++)for(let E=-1;E<=1;E++)if((a=(o=e.discoveryZones)==null?void 0:o.get(n+g,i+E))!=null&&a.openOnSpawn)return br(r);return null}case"entities":return r===S.FOUNDATION||r===S.POWER_PATH?br(r):xr(r);case"tiles":return br(r);case"crystals":{if(r.crystalYield>0)return br(r);const g=((s=e.crystals)==null?void 0:s.get(n,i))??0;return g>0?Lo(g-1):xr(r)}case"ore":{if(r.oreYield>4)return br(r);const g=(((l=e.ore)==null?void 0:l.get(n,i))??0)+r.oreYield;return g>0?Lo(g-1):xr(r)}case"discovery":{const g=(u=e.discoveryZones)==null?void 0:u.get(n,i);return g?g.openOnSpawn?"disco0":"disco1":xr(r)}case"erosion":{if(r===S.WATER||r===S.LAVA)return br(r);const g=(c=e.erosion)==null?void 0:c.get(n,i);if(!g)return xr(r);if(g===!0)return Lo(Us-1);const E=g.cooldown*4+g.initialDelay;return Lo((Us-1)*Math.max(0,1-E/uG))}case"landslides":{const g=(f=e.landslides)==null?void 0:f.get(n,i);if(!g)return xr(r);const E=g.cooldown;return Lo((Us-1)*Math.max(0,1-E/cG))}case"oxygen":return((h=e.aerationLog)==null?void 0:h.get(n,i))?(d=e.crystals)!=null&&d.get(n,i)?"oxhc":r.isWall?br(r):"oxex":xr(r);case"objectives":return(y=e.objectives)!=null&&y.crystals&&(r.crystalYield>0||(_=e.crystals)!=null&&_.get(n,i))?br(S.CRYSTAL_SEAM):(($=e.objectives)!=null&&$.ore||(v=e.objectives)!=null&&v.studs)&&(r.oreYield>0||(m=e.ore)!=null&&m.get(n,i))?br(S.ORE_SEAM):xr(r);case"script":return xr(r)}return null}function dG(e,t,r,n,i){var o,a,s,l,u;switch(t){case"crystals":{const c=((o=e.crystals)==null?void 0:o.get(n,i))??0,f=r.crystalYield,h=f>0?`${c} + ${f} from ${r.name}`:c;return c+f>0&&(r.isWall?`Yields ${h}`:`${h} on ground`)}case"ore":{const c=((a=e.ore)==null?void 0:a.get(n,i))??0,f=r.oreYield,h=f>0?`${c} + ${f} from ${r.name}`:c;return c+f>0&&(r.isWall?`Yields ${h}`:`${h} on ground`)}case"landslides":{const c=(s=e.landslides)==null?void 0:s.get(n,i);return c&&`${c.cooldown}s`}case"erosion":{const c=(l=e.erosion)==null?void 0:l.get(n,i);return c===!0?null:c&&`${c.cooldown}s cooldown + ${c.initialDelay}s delay`}case"discovery":{const c=(u=e.discoveryZones)==null?void 0:u.get(n,i);return c&&`${c.openOnSpawn?"Cavern":"Undiscovered cavern"} ${c.id}`}case"overview":case"tiles":return r.name;default:return null}}function pG({cavern:e,mapOverlay:t}){return!e.tiles||!t?null:p.jsx("g",{className:D.tiles,style:{scale:`${lG}`},children:e.tiles.map((r,n,i)=>{const o=hG(e,t,r,n,i);if(!o)return null;const a=dG(e,t,r,n,i),[s,l]=e.top?[n-e.left,i-e.top]:[n,i];return p.jsx("rect",{className:D.tile,fill:`var(--pvw-${o})`,x:n,y:i,width:1,height:1,children:a&&p.jsxs("title",{children:[s,", ",l,": ",a]})},`${n},${i}`)})})}const Nt=6;function mG(e){const t=!!(e!=null&&e.footprint),r=!!(e!=null&&e.frame),n=t||r,i=t?Nt/3:Nt/4,o=e===po?-i-Nt:-i,a=e===_e?i+Nt:i,s=r?Nt/2:i,l=e===Ia?-s-Nt:-s,u=e===yn?s+Nt:s;return Fe([`M${l} ${o}`,n&&`L${u} ${o}`,o!==-i&&`L${u+Nt/4}, -6`,e!==mn&&`L${u+Nt/4} 0`,n&&`L${u} ${i}`,a!==i&&`L${u} ${a}`,`L${l} ${a}`,!n&&`L${-6/4} 0`,(e===On||e===cu)&&`L${l-Nt/4} 0`,"Z"]).join("")}function vG(e){var t;return Fe([(t=e.template)==null?void 0:t.name,e.unique||e.loadout&&"Rock Raider",e.level&&`Lv${e.level}`,(r=>r&&`(${r})`)(Fe([e.sleep&&"Sleeping",e.essential&&"VIP",...e.loadout??[],...e.upgrades??[]]).join(", "))]).join(" ")}function Ss({entity:e,cavern:t,mapOverlay:r}){var i,o,a,s;const n=q.useMemo(()=>mG(e.template),[e.template]);if(r==="overview"){if(!((o=(i=t.discoveryZones)==null?void 0:i.get(Math.floor(e.x),Math.floor(e.y)))!=null&&o.openOnSpawn))return null}else if(r!=="entities")return null;return p.jsxs("g",{className:`${D.entity} ${"sleep"in e?D.enemy:""}`,transform:`translate(${e.x*Nt} ${e.y*Nt}) rotate(${qo(e.yaw)})`,children:[p.jsx("path",{className:D.marker,d:n,children:p.jsx("title",{children:vG(e)})}),((a=e.template)==null?void 0:a.inspectAbbrev)&&p.jsx("text",{className:D.label,x:0,y:.75,children:(s=e.template)==null?void 0:s.inspectAbbrev})]})}const Jg=6;function gG({x:e,y:t}){return p.jsx("path",{className:D.openCaveFlag,d:"M0 0 L0 -9 L4 -7 L0 -5 Z",transform:`translate(${(e+.5)*Jg} ${(t+.5)*Jg})`})}const yG=[[-1,-1],[0,-1],[-1,0],[0,0]],_l=-600,eh=600,wG=6;function $G(e){const t=(e-_l)/(eh-_l),r=t*100;return`hsl(${(50+200*(1-t)).toFixed()} 50% ${r.toFixed()}%)`}function _G({height:e}){return p.jsx("g",{className:D.height,style:{scale:`${wG}`},children:e.map((t,r,n)=>p.jsx("rect",{fill:$G(t),x:r-.5,y:n-.5,width:1,height:1,children:p.jsx("title",{children:t.toFixed()})},`${r},${n}`))})}function Z$(e=",",t="and"){const r=({chosen:n,index:i})=>{for(let o=i+1;o<n.length;o++)if(n[o]===r)return e;return t};return r}function Vd({pg:e,joiner:t},r,...n){const i=t||Z$();return n.reduce((o,a)=>e(o,a,o.then(i).then(a)),e(r))}function J$({pg:e,state:t}){return Vd({pg:e},e(t("buildAndPowerGcOne").then("build the Geological Center"),t("buildAndPowerGcMultiple").then(({format:{buildAndPowerGcCount:r}})=>`build ${xe(r)} Geological Centers`)),e(t("buildAndPowerSsOne").then("build the Support Station"),t("buildAndPowerSsMultiple").then(({format:{buildAndPowerSsCount:r}})=>`build ${xe(r)} Support Stations`)),e(t("lostMinersOne").then("find the lost Rock Raider"),t("lostMinersTogether","lostMinersApart").then("find the lost Rock Raiders",({format:{lostMiners:r}})=>`find ${Ci(r,n=>`all ${n}`)} lost Rock Raiders`)),t("resourceObjective").then(({format:{resourceGoal:r}})=>`collect all ${r}`,({format:{resourceGoal:r}})=>`get the ${r} we needed`))}const e0=["Well done!","Good work!","Outstanding!","I knew you could do it, Cadet!","You're very good at this, Cadet!","Your efforts have been outstanding!","We were right to count on you, Cadet!"],SG=Z("Conclusion - Success",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{const a=(()=>{const l=t("commend").then("Wow!",...e0),u=t("hasMonsters").then(({format:{enemies:f}})=>`Those ${f} were no match for you!`,({format:{enemies:f}})=>`You had nothing to fear from those ${f}!`),c=e("Despite the odds,","In the face of danger,","Even with the odds against you,");return u.then(c),r.then(o,l,u).then(o,t("hasMonsters","spawnHasErosion","anchorIsGasLeak").then(c))})(),s=e();a.then("you").then(e("managed to","were able to").then(J$({pg:e,state:t})).then(".",t("hasMonsters").then(({format:{enemies:l}})=>`despite that horde of ${l}!`)),Vd({pg:e},t("findHq").then("found the base"),t("hqIsRuin").then("repaired the Rock Raider HQ","restored our mining operations"),t("buildAndPowerGcOne").then("constructed the Geological Center","built the Geological Center where we needed it"),t("buildAndPowerGcMultiple").then(({format:{buildAndPowerGcCount:l}})=>`built ${l===2?"both":xe(l)} Geological Centers`),t("buildAndPowerSsOne").then("constructed the Support Station","built the Support Station where we needed it"),t("buildAndPowerSsMultiple").then(({format:{buildAndPowerSsCount:l}})=>`built ${l===2?"both":xe(l)} Support Stations`),e(t("lostMinersOne").then("found the lost Rock Raider","located the lost Rock Raider"),t("lostMinersTogether","lostMinersApart").then("found the lost Rock Raiders","located the lost Rock Raiders",({format:{lostMiners:l}})=>`found ${l===2?"both":`all ${xe(l)}`} Rock Raiders`)).then(o,e(", safe and sound.",t("resourceObjective").then(({format:{resourceGoal:l}})=>`. You even collected ${l}!`,({format:{resourceGoal:l}})=>`. Collecting ${l} was no small feat either!`)).then(s).then(i)),t("resourceObjective").then(({format:{resourceGoal:l}})=>`collected ${l}`,({format:{resourceGoal:l}})=>`collected all ${l}`,({format:{resourceGoal:l}})=>`got all ${l}`)).then(".").then(s)).then(`

`).then(o,t("commend").then("Keep up the good work, Cadet!","You make this look rather easy, Cadet!",...e0)).then("Mission Complete!").then(o,t("hasMonsters")).then(o,t("spawnHasErosion")).then(n),a.then(e(t("buildAndPowerGcOne").then("That Geological Center you built will be very useful to decide where we can mine next."),t("buildAndPowerGcMultiple").then("Those Geological Centers you built are already helping us far beyond the reaches of this cavern.")).then(o,"We already have a promising lead!",({format:{buildAndPowerGcCount:l}})=>`With ${l===1?"this":"these"} built, we can safely make our way further into the planet.`)).then(o,t("hasMonsters")).then(s)}),EG=Z("Conclusion - Mission Failed",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then(o,"Oh, dear.","Bad luck!").then("You didn't","You couldn't","You were unable to","We were counting on you to").then(J$({pg:e,state:t})).then(".").then(o,"You must succeed, Cadet!",e(o,"Chin up, Cadet!").then("You'll do better next time.")).then(`

Mission Failed!`).then(n)}),AG=Z("Mission Name",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{function a({rock:s,ice:l,lava:u,mid:c,last:f}){r.then(s?t("rockBiome").then(...s):i,l?t("iceBiome").then(...l):i,u?t("lavaBiome").then(...u):i).then(o,...c||[]).then(...f).then(n)}a({rock:["Amethyst","Andesite","Anthracite","Argillite"],ice:["Arctic","Avalanche"],lava:["Asbestos","Ashen"],last:["Abyss","Action","Alley","Attack"]}),a({rock:["Basalt","Basanite","Bauxite","Boulder","Breccia","Bullion"],ice:["Blizzard"],last:["Balance","Blitz","Breach","Break","Bonanza","Burrow"]}),a({rock:["Chalk","Claystone","Core","Crystal"],ice:["Chilly","Cold"],lava:["Caldera","Cinder"],last:["Calamity","Caper","Cavern","Chaos","Conflict","Conundrum","Cruise"]}),a({rock:["Diamond","Diorite","Dolomite","Dunite"],ice:["Dichoric","Drift"],last:["Depths","Dash","Descent","Despair","Drive"]}),a({rock:["Emerald","Evaporite"],lava:["Ember"],last:["Enigma","Eruption","Excavation","Express"]}),a({rock:["Fault Line","Final","Fissure","Flint"],ice:["Frostbite","Frosty"],last:["Folly","Frenzy","Fury"]}),a({rock:["Garnet","Giga Granite","Gneiss","Granite","Gritstone","Gypsum"],ice:["Giga Glacier","Glacial","Glacier"],last:["Gauntlet","Getaway"]}),a({ice:["Iceberg","Icicle"],lava:["Igneous","Infernal"],last:["Impact","Incursion","Inset","Intrusion"]}),a({rock:["Lapis Lazuli","Laterite","Lignite","Limestone","Lithosphere"],lava:["Lava","Lava Lake","Lithic"],last:["Labyrinth","Lair","Lure"]}),a({rock:["Marble","Metamorphic","Mineral","Mudstone"],ice:["Mammoth"],lava:["Mafic","Magma","Mantle","Molten"],mid:["Mine","Moon"],last:["Mayhem","Maze","Meltdown","Menace","Mishap"]}),a({ice:["Ice Planet","Permafrost","Polar"],lava:["Pumice","Pyroclastic","Pyrolite"],last:["Passage","Peril","Pit","Plunge","Puzzle"]}),a({rock:["Sandstone","Schist","Sedimentary","Seismic","Shale","Silica","Silt","Slate","Stalactite"],ice:["Snowdrift","Sub-Zero"],mid:["Shaft"],last:["Scramble","Shock","Showdown","Slide"]}),a({rock:["Tuff","Turbidite","Twilight"],ice:["Taiga","Titanic","Tundra"],mid:["Tunnel"],last:["Tempest","Terror","Trouble"]})}),OG=["2000","3000","Ablated","Actual Final Version 2","And Beyond","As Seen On PC","Boosted","Chief's Version","Chrome Edition","Denali","Diamond Version","Director's Cut","Emerald Version","Enhanced","Episode One","Episode Two","Extended","Extremely Fungible Edition","Forever","Founders Edition","Gold Version","Green Crystal Version","HD","HD 1.5 Remix","Inspired by True Events","Into Darkness","Limited Edition","Millenium Edition","New","Now With Flavor","Onyx Version","Original Level, Do Not Steal","Pioneers Edition","Planet U Remix","Platinum Version","Power Brick Edition","Premium","Rebirthed","Reborn","Recoded","Rectified","Recycled","Redux","Rehashed","Reimagined","Reloaded","Remixed","Resurrection","Retooled","Revenant","Revolutions","Ruby Version","Sapphire Version","Shadow Operation","Silver Version","Slug Armor Edition","Special Edition","The Beginning","Unhinged","Unglued","Ungrounded","Unleaded","Unleashed","Unlocked","Unobtaininum Version","Unplugged","Unsanctioned","Unstable","Unverified","Uranium Version","XP","Xtreme Edition","Y2K Compliant Edition","Y2K Edition"],RG=Z("Briefing - Orders",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{const a=e(({format:{resourceGoal:f}})=>`collect ${f}.`,({format:{resourceGoal:f}})=>`continue our mining operation by collecting ${f}.`),s=e(({format:{resourceGoal:f}})=>`we need ${f}.`,({format:{resourceGoal:f}})=>`you need to collect ${f}.`),l=e("Best of luck!","Good luck out there!","We're counting on you!").then(n),u=e(l,n),c=Z$();r.then(t("hasMonsters").then(o,t("hasSlugs")).then("defend the Rock Radier HQ","build up your defenses","arm your Rock Raiders").then(c),t("hasSlugs").then("defend the Rock Radier HQ","arm your Rock Raiders").then(c),e(o,t("nomadsOne","nomadsMany"),t("spawnIsHq").then(t("hqIsRuin","spawnHasErosion")).then("move to a safer cavern","find a more suitable location").then(c)).then("build the Rock Raider HQ","build up your base",t("spawnHasErosion").then("get your Rock Raiders to safety","make sure your Rock Raiders are safe"),t("spawnIsHq").then("send some Rock Raiders down to this base",e("resume our mining operations").then(c).then(a).then(i),t("hqIsRuin").then("clean up this mess","get the Rock Raider HQ back in operation"),t("hqIsFixedComplete").then(o,t("spawnHasErosion")).then("keep this base in good working order","maintain what you do have here")),t("findHq").then(o,t("spawnHasErosion")).then("reach the Rock Raider HQ","locate the base").then(o,t("hqIsRuin").then(c).then("salvage what's left","repair it","get it back in working order")),t("reachHq").then(o,t("spawnHasErosion")).then("reach the Rock Raider HQ").then(o,t("hqIsRuin").then(c).then("salvage what's left","repair it","get it back in working order"))).then(o,e(c).then(t("hasMonsters").then(t("hasSlugs"),o),t("hasSlugs")).then("keep it safe","make sure it is heavily defended")).then(". Use it to",". When you're ready,",". You must",e(". Then,").then(s).then(i))).then(o,a.then(i),e(t("buildAndPowerGcOne").then("construct a Geological Center in the marked cavern, upgrade it to Level 5, and keep it powered on."),t("buildAndPowerGcMultiple").then(({format:{buildAndPowerGcCount:f}})=>`build a Geological Center in ${f===2?"both":"each"} of the marked caverns`).then(", upgrade them to Level 5, and keep them powered on.","and upgrade them all to Level 5. They must all be powered at the same time for the scans to work properly."),t("buildAndPowerSsOne").then("construct a Support Station in the marked cavern and find someway to power it.","go to the island we've chosen and build a Support Station there. It will need power, so build a Power Station too."),t("buildAndPowerSsMultiple").then(({format:{buildAndPowerSsCount:f}})=>`build a Support Station in ${f===2?"both":"each"} of the marked caverns`).then(", and keep them powered on. We think this will mitigate the gas.")).then(l,e("Finally,").then(a).then(i),e("Then,"))).then(e("find","locate","search the cavern for").then(t("lostMinersOne").then("the","that").then("lost Rock Raider","missing Rock Raider"),t("lostMinersTogether").then("the","that").then("cavern with the lost Rock Raiders","missing group of Rock Raiders"),t("lostMinersApart").then("the","those").then("lost Rock Raiders","missing Rock Raiders")).then(".",t("hasMonsters").then(({format:{enemies:f}})=>`before the ${f} do!`)).then(u,e("Once you've found them,","With them safe,","When they are safe,").then(s,a))),e(s,a).then(t("resourceObjective")).then(u)}),bG=Z("Briefing - Premise",({pg:e,state:t,start:r,end:n,cut:i,skip:o})=>{r.then("Our mining operations have been going smoothly, and we are ready to move on to the next cavern.","There is nothing out of the ordinary to report today.","Things have been quiet and I hope they should remain that way, Cadet!").then(n);const a=r.then(e("Are you ready for the next mission?","Welcome back, Cadet.","I hope you're prepared for this one, Cadet.","Up and at 'em, Cadet!","Cadet, are you up for some more action?",t("floodedWithWater").then("Are you ready to set sail?","I hope you packed your lifejacket, Cadet."),t("floodedWithLava").then("I hope you're not afraid of a little heat!","You'd better keep your cool with this one!")).then(`

`),o).then(e(),t("hasGiantCave")),s=Vd({pg:e},t("spawnHasErosion").then("we are concerned about nearby lava flows that could engulf this cavern","you will need to keep an eye on the volcanic activity in this cavern to avoid being buried in lava",e("we are dangerously close to a cavern full of lava. Left unchecked, this whole area could be consumed by molten rock!").then(n)),t("anchorIsBlackout").then("the unusual magnetic properties of the rock here might interfere with our equipment","there are unusual magnetic readings in this cavern and we're concerned about the effects that might have on our equipment"),t("anchorIsOreWaste").then("the rock in this cavern has very little ore"),e(t("hasMonsters").then(o,t("hasSlugs")),t("hasSlugs")).then("the tunnels here are full of large creatures that threaten our operations","we are picking up signs of large creatures in the area",({format:{enemies:h}})=>`this cavern is inhabited by nests of ${h}`,({format:{enemies:h}})=>`we have reason to believe there are dozens of ${h} just out of sight`),t("anchorIsGasLeak").then("the atmosphere in this cavern contains a toxic gas that might explode when exposed to plasma").then(" - which means we cannot rely on Electric Fences.",". While our laser weapons should be fine, a single Electric Fence could blast us all into tiny bits of ABS.").then(n),t("hqIsFixedComplete").then("the teleporters are operating in a low-power mode, so").then("you will not be able to construct any more buildings.","you must make do with the buildings that are already constructed.").then(n)).then(".").then(n);a.then(t("findHq")).then(o,t("spawnHasErosion")).then(o,t("treasureCaveOne","treasureCaveMany")).then(o,t("nomadsOne","nomadsMany")).then(o,t("buildAndPowerGcOne","buildAndPowerGcMultiple")).then("A forward team has established Rock Raider HQ in the viscinity, but we haven't had the means to use it yet.","There should be a base near here primed and ready for our mining operations, but our teleporters are unable to get a lock on it for some reason.","We've had our eyes on this region and were all set to mine here. Unfortunately, the signed copy of Form 27b-6 went missing below a desk, we forgot about it, and now we aren't exactly sure where that base is.",t("hasMonsters").then(o,t("hasSlugs")).then(({format:{enemies:h}})=>`We were all set to mine this cavern, but the team was scared off by readings of ${h} in the area. They left in such a hurry that they forgot to record where exactly the Rock Raider HQ is.`,({format:{enemies:h}})=>`There should be a base near here, but it's not showing up on our scanners. We hope it hasn't been destroyed by ${h}, but to be safe, we're sending you to a nearby cavern instead.`),t("hasSlugs").then("We were all set to mine this cavern, but the team was scared off by a Slimy Slug that suddenly appeared in the middle of our HQ. They even left without recording their location properly.",({format:{enemies:h}})=>`There should be a base near here, but it's not showing up on our scanners. Some interference from ${h} must have shut off its location beacon! To be safe, we're sending you to a nearby cavern instead.`)).then(n);const l=e("Also,","If that wasn't hard enough,","It gets worse:").then(s);a.then(e(t("buildAndPowerGcOne","buildAndPowerGcMultiple")).then(o,t("treasureCaveOne","treasureCaveMany")).then(o,"We're sending you to a cavern deep within the planet.").then(e("Our long-range scanners","The scanners up on the L.M.S. Explorer").then("are unable to penetrate the geology in this area and we need some way to amplify them. That's where you come in - we need a team to scan the area manually","have been unreliable at this depth and we'd like to understand the area better"),t("anchorIsBlackout").then("There seems to be some geomagnetic anomaly in this area and researching it could prove vital to our mining operations")),e(e("A recent scan","Our most recent geological survey").then("found","has discovered","has indicated"),e("We","The scanners","The scanners aboard the L.M.S. Explorer").then("have found","have located","have discovered")).then(t("treasureCaveOne").then("a large Energy Crystal signature near here","a nearby cave with an abundance of Energy Crystals"),t("treasureCaveMany").then("large deposits of Energy Crystals in this cavern","a cave system with an abundance of Energy Crystals"),t("hasGiantCave").then('a nearby cavern approximately the size of "yes"'),"another cavern where we can continue our mining operations"),t("anchorIsBlackout").then("We found a cavern with unusual geomagnetic properties. We believe it will have plenty of Energy Crystals","We're sending you to a cavern deep within the planet where we've been picking up unusual magnetic readings").then(o,t("treasureCaveOne","treasureCaveMany"))).then(e(".").then(n),e(`. 

However,`,`. 

Unfortunately,`,`. 

Unfortunately for us,`,`. 

The bad news?`,". Use caution!",`, but proceed with caution!

`,", but this is no walk in the park.").then(s,t("findHq").then("we already sent another team down here before, and they failed miserably. You should be able to find their Rock Raider HQ nearby","you aren't the first to attempt this mission. You'll find an existing base somewhere in the viscinity").then(".",t("hqIsRuin").then(" - or what's left of it at least.")).then(l)),e(t("spawnIsHq"),t("reachHq").then(o,t("nomadsOne","nomadsMany"))).then(", and we have established our Rock Raider HQ.",", and our HQ is ready to go!").then(e(`

However,`,`

Unfortunately,`,`

Unfortunately for us,`,`

The bad news?`,"Don't be fooled, though.","I do ask that you be careful down there!").then(s),n),e(t("nomadsOne").then(". Your mission is to find a suitable location for our Rock Raider HQ."),t("nomadsMany").then(". We haven't yet chosen where to establish our base, so I'm leaving that decision to you.",", and I've picked this team to decide where to build our HQ.")).then(o,e(t("hasMonsters").then(o,t("hasSlugs")),t("hasSlugs")).then(({format:{enemies:h}})=>`

Be on the lookout for ${h}, especially once you start construction.`,({format:{enemies:h}})=>`Use caution! There may be ${h} afoot and I don't want you taking any unnecessary risk.`)).then(o,t("spawnHasErosion")).then(n)),a.then(t("anchorIsMobFarm")).then("We discovered this incredible cave with the abundance of Energy Crystals you now see before you.","As you can see, we have located a cave with an absurd number of Energy Crystals.").then("We meant to teleport you onto that island, but something is interfering with the signal.","That many Energy Crystals in one place seems to be interfering with our teleporters.").then("We are extremely limited in what vehicles we can send down to you, so you'll have to get the crystals some other way.").then(o,t("hasMonsters")).then(o,t("hasSlugs")).then(o,t("spawnHasErosion")).then(o,t("treasureCaveOne","treasureCaveMany")).then(o,e(`

There's one more thing - `).then(o,"you aren't the first to arrive here.").then(t("lostMinersApart").then("Some of our Rock Raiders were scattered a bit further away from the island. By our readings, they seem to be in separate caverns nearby"),t("lostMinersTogether").then("We already sent a team down here, but they failed to check in").then(o,". We believe they are stranded in a nearby cavern"),t("lostMinersOne").then("One of our Rock Raiders was teleported to another cavern somewhere near here","One of our Rock Raiders didn't come down with the group. They should be somewhere nearby")).then("and we're counting on you to rescue them!",". I know I can count on you to reach them.",".")).then(n),a.then(t("anchorIsPandora")).then("We've located an unusual cavern with a massive cache of Energy Crystals. Of course, it couldn't be that easy - the cavern has more monsters than we've ever seen before!",({format:{monsters:h}})=>`The bounty before your eyes is one of the largest loose crystal deposits I've ever seen, and it is, unfortunately, guarded by an army of ${h}.`).then("Our scouts report they seem a bit shy and probably won't bother us unless we disturb the Energy Crystals here.",({format:{monsters:h}})=>`Early scouting of this area suggests the ${h} are fairly docile and won't attack as long as we aren't disturbing their food source.`).then(o,t("hasSlugs").then("The Slimy Slugs here might be a problem, though.")).then(o,e(t("lostMinersOne").then(`

One of the scouts`),t("lostMinersTogether","lostMinersApart").then(`

The team`)).then("hasn't reported back yet, so we're sending you to find them.")).then(o,t("findHq").then("There should be a base nearby for you to use.",t("hqIsRuin").then("There should be a base nearby, but I can't be sure what condition you'll find it in.")),t("reachHq").then("The Rock Raider HQ is ready for you nearby.",t("hqIsRuin").then(({format:{monsters:h}})=>`The Rock Raider HQ is nearby, but it looks like those ${h} got to it first!`))).then(o,t("treasureCaveOne"),t("treasureCaveMany")).then(o,t("spawnHasErosion")).then(o,t("hasGiantCave")).then(o,t("hasMonsters")).then(n);const u=e(a,r.then("Things have been going smoothly... until now!","Bad news, Cadet!","We need your help, Cadet.","Oh, dear.").then(`

`)),c=e("we're counting on you to find them!","we don't know how long they'll last out there.",t("hasMonsters").then(({format:{enemies:h}})=>`we need to find them before the ${h} do.`,({format:{enemies:h}})=>`I hope they don't meet any of the ${h} roaming this cavern.`)),f=e("we're counting on you to find the others!",t("hasMonsters").then(({format:{enemies:h}})=>`you need to find the others before the ${h} do.`));e(c,f).then(t("spawnHasErosion"),o).then(t("hasSlugs"),o).then(o,t("anchorIsGasLeak").then("Our geologists have warned me that the air in this cavern contains a gas that reacts explosively with plasma, so we can'trely on Electric Fences."),t("anchorIsOreWaste").then("This cavern has very little ore, so build only what you really need").then("!",t("anchorIsGasLeak").then(" - and no Electric Fences either. The atmosphere here would likely react with plasma... explosively."))).then(o,t("anchorIsBlackout").then(`

One more thing to look out for: We're picking up some unusal magnetic disturbances`).then(", so be prepared for anything.",", so be careful down there!",t("buildAndPowerGcOne","buildAndPowerGcMultiple").then(". Perhaps while you're down there, you can extend the range of our scanners.")),t("buildAndPowerGcOne","buildAndPowerGcMultiple").then(`

While you're down there, we need you to extend the range of our scanners.`)).then(n),u.then(t("treasureCaveOne","treasureCaveMany"),o).then(o,t("spawnIsHq","findHq","reachHq").then("We established our Rock Raider HQ, but","We constructed our base and were ready to begin mining. Unfortunately,")).then(t("nomadsOne").then("a teleporter malfunction sent this Rock Raider to an uncharted cavern.","the teleporter on the L.M.S. Explorer has been acting up again and one of our Rock Raiders is trapped in an uncharted cavern.","one of our Rock Raiders was accidentally sent to the wrong cavern!"),t("nomadsMany").then("a teleporter malfunction sent a group of our Rock Raiders to an uncharted cavern.","the teleporter on the L.M.S. Explorer has been acting up again and a group of our Rock Raiders ended up in an uncharted cavern."),e(t("lostMinersOne").then("a teleporter malfunction sent one of our Rock Raiders to a cavern near here.","the teleporter on the L.M.S. Explorer has been acting up again and one of our Rock Raiders is trapped in an uncharted cavern.","one of our Rock Raiders was accidentally sent to the wrong cavern!"),t("lostMinersTogether").then("a teleporter malfunction sent a group of our Rock Raiders to a cavern near here.","the teleporter on the L.M.S. Explorer has been acting up again and a group of our Rock Raiders ended up in an uncharted cavern."),t("lostMinersApart").then(({format:{lostMiners:h}})=>`a teleporter malfunction scattered ${xe(h)} of our Rock Raiders throughout this cavern.`,({format:{lostMinerCaves:h}})=>`the teleporters have failed again and ${xe(h)} groups of Rock Raiders are lost somewhere in this cavern.`)).then(o,c.then(i)),t("nomadsOne","nomadsMany").then(t("lostMinersOne","lostMinersTogether","lostMinersApart")).then("a teleporter malfunction left our Rock Raiders scattered throughout this cavern.").then(o,f.then(i))).then(t("hqIsFixedComplete").then("While the teleporters have been repaired, they are operating in a low-power mode and cannot send down any buildings.","We cannot risk running the teleporters at full power, so you will have to make do with the buildings that are already there.").then(l),e("Our engineers have assured us the teleporters have been repaired, but","While the teleporters are back in working order,").then(s),l),u.then(t("hqIsRuin")).then(t("treasureCaveOne","treasureCaveMany"),o).then(t("buildAndPowerGcOne","buildAndPowerGcMultiple"),o).then(t("hasSlugs"),o).then("Recent seismic activity has damaged our Rock Raider HQ","An earthquake in this area has caused several cave-ins and destroyed part of our Rock Raider HQ",t("hasMonsters").then(({format:{enemies:h}})=>`A horde of ${h} attacked our Rock Raider HQ`)).then(e(", and").then(o,t("spawnIsHq","findHq","reachHq")).then(e(t("lostMinersOne").then("one of our Rock Raiders is missing."),t("lostMinersTogether").then("a group of Rock Raidiers are missing.","a group of Rock Raidiers are trapped somewhere in the cavern."),t("lostMinersApart").then("some of our Rock Raidiers are missing.","our Rock Raiders are trapped throughout the cavern.")).then(o,c.then(i)),t("nomadsOne","nomadsMany").then(t("lostMinersOne","lostMinersTogether","lostMinersApart")).then("our Rock Raiders have been scattered throughout this cavern.").then(o,f.then(i))).then(l,s),e(". We were able to evacuate in time",". All of our Rock Raiders made it out",". We evacuated the cavern",". Everyone evacuated safely").then(t("findHq","reachHq").then(", but this is as close as we can get for now.",", but without the homing beacon we don't want to risk teleporting anyone directly inside.",t("nomadsOne").then(", but we can't get you any closer than this.",", but we cannot risk teleporting you in any closer than this.",", and we want you to return to the base and salvage what's left of it."),t("nomadsMany").then(", and you'll be leading the salvage team.",", and this is the team that will restore our operations.")),t("spawnIsHq","reachHq").then(", but this is all that's left.","and now we need to pick up the pieces and try again.")).then(s,n)),r.then(t("hasGiantCave")).then(o,t("floodedWithWater","floodedWithLava")).then(`We've got news for you, Rock Raider! Our geological scanners have discovered a nearby cave approximately the size of "yes".`).then(o,t("hasMonsters")).then(o,t("hasSlugs")).then(o,t("spawnHasErosion")).then(o,t("spawnIsHq","findHq","reachHq")).then(o,t("treasureCaveOne","treasureCaveMany")).then(o,t("nomadsOne","nomadsMany","anchorIsBlackout")).then(o,t("buildAndPowerGcOne","buildAndPowerGcMultiple")).then(n),r.then(t("floodedWithWater")).then(t("lostMinersOne")).then(t("spawnIsHq")).then(`A man has fallen into the river under Planet U!

Build the Docks! Build the Rapid Rider and off to the rescue. Follow the shoreline! Find the missing Rock Raider!`).then(o,t("hasMonsters")).then(o,t("hasSlugs")).then(o,t("spawnHasErosion")).then(o,t("treasureCaveOne","treasureCaveMany")).then(n)});function xG(e){let t=0,r=0;for(const n of e.plans)n.fluid===S.LAVA?t++:n.fluid===S.WATER&&r++;return t/e.plans.length>.4?S.LAVA:r/e.plans.length>.4?S.WATER:null}function Oc(e,t="and"){return e.length===0?"":e.length===1?e[0]:`${e.slice(0,-1).join(", ")} ${t} ${e[e.length-1]}`}function e_(e){const t=[{count:e.crystals,name:"Energy Crystals"},{count:e.ore,name:"Ore"},{count:e.studs,name:"Building Studs"}].filter(({count:r})=>r>0);return{resourceGoal:Oc(t.map(({count:r,name:n})=>`${xe(r)} ${n}`)),resourceGoalNumbers:Oc(t.map(({count:r,name:n})=>`${r} ${n}`)),resourceGoalNamesOnly:Oc(t.map(({name:r})=>r))}}class CG{constructor(t){var b,A,x,T;const r=xG(t),{lostMiners:n,lostMinerCaves:i}=Ws(t),o=Rn(t),a=t.plans.find(I=>!I.hops.length),s=t.objectives.crystals+t.objectives.ore+t.objectives.studs>0,l=t.plans.find(I=>{var B;return((B=I.metadata)==null?void 0:B.tag)==="hq"}),u=Object.is(o,l),c=Object.is(a,l),f=(l==null?void 0:l.metadata.special)==="fixedComplete",h=!!(l&&t.objectives.tags.findHq),d=!!(l&&t.objectives.tags.reachHq),y=!!(l!=null&&l.metadata.ruin),_=t.plans.reduce((I,B)=>{var G;return((G=B.metadata)==null?void 0:G.tag)==="buildAndPower"&&B.metadata.template===yn?I+1:I},0),$=t.plans.reduce((I,B)=>{var G;return((G=B.metadata)==null?void 0:G.tag)==="buildAndPower"&&B.metadata.template===Ce?I+1:I},0),v=t.plans.reduce((I,B)=>{var G;return((G=B.metadata)==null?void 0:G.tag)==="nomads"?I+B.metadata.minersCount:I},0),m=t.plans.reduce((I,B)=>{var G;return((G=B.metadata)==null?void 0:G.tag)==="treasure"?I+1:I},0),g=t.plans.some(I=>I.pearlRadius>20&&I.pearlRadius*4>t.context.targetSize),E=t.context.hasMonsters;this.state={anchorIsBlackout:((b=o.metadata)==null?void 0:b.tag)==="blackout",anchorIsGasLeak:u&&l.metadata.special==="gasLeak",anchorIsMobFarm:((A=o.metadata)==null?void 0:A.tag)==="mobFarm",anchorIsOreWaste:((x=o.metadata)==null?void 0:x.tag)==="oreWaste",anchorIsPandora:((T=o.metadata)==null?void 0:T.tag)==="pandora",buildAndPowerGcMultiple:_>1,buildAndPowerGcOne:_===1,buildAndPowerSsMultiple:$>1,buildAndPowerSsOne:$===1,findHq:h,floodedWithLava:r===S.LAVA,floodedWithWater:r===S.WATER,hasAirLimit:!!t.oxygen,hasGiantCave:g,hasMonsters:E,hasSlugs:t.context.hasSlugs,hqIsFixedComplete:f,hqIsRuin:y,iceBiome:t.context.biome==="ice",lavaBiome:t.context.biome==="lava",lostMinersApart:i>1,lostMinersOne:n===1,lostMinersTogether:n>1&&i===1,nomadsMany:v>1,nomadsOne:v===1,reachHq:d,resourceObjective:s,rockBiome:t.context.biome==="rock",spawnHasErosion:a.hasErosion,spawnIsHq:c,treasureCaveMany:m>1,treasureCaveOne:m===1};const O={rock:"Rock Monsters",ice:"Ice Monsters",lava:"Lava Monsters"}[t.context.biome],R=Fe([E&&O,t.context.hasSlugs&&"Slimy Slugs"]).join(" and ");this.format={buildAndPowerGcCount:_,buildAndPowerSsCount:$,enemies:R,lostMinerCaves:i,lostMiners:n,monsters:O,...e_(t.objectives)}}briefings(t){return{name:AG.generate(t.lore(Oe.name),this.state,this.format),premise:bG.generate(t.lore(Oe.premise),this.state,this.format),orders:RG.generate(t.lore(Oe.orders),this.state,this.format),success:SG.generate(t.lore(Oe.success),{...this.state,commend:!0},this.format),failure:EG.generate(t.lore(Oe.failure),this.state,this.format)}}}function Rc({entities:e}){const t={};return e==null||e.forEach(r=>{const n=r.template.inspectAbbrev;t[n]=(t[n]??0)+1}),p.jsxs(p.Fragment,{children:[!Object.entries(t).length&&"n/a",Object.entries(t).map(([r,n])=>`${r}${n>1?`x${n}`:""}`).join(" ")]})}function TG({cavern:e,mapOverlay:t}){const r=(()=>{var n,i,o,a,s,l,u,c,f,h,d,y,_;switch(t){case"overview":return p.jsxs(p.Fragment,{children:[e.levelName&&p.jsx("h1",{children:e.levelName}),p.jsx("p",{children:e.fileName??e.initialContext.seed.toString(16)}),p.jsx("p",{children:((n=e.briefing)==null?void 0:n.intro)??"No briefing yet..."})]});case"tiles":return p.jsxs("ul",{children:[p.jsxs("li",{children:["Playable area: ",((i=e.tiles)==null?void 0:i.size)??0]}),p.jsxs("li",{children:["Walls: ",(o=e.tiles)==null?void 0:o.reduce(($,v)=>v.isWall?$+1:$,0)]})]});case"entities":return p.jsxs("ul",{children:[p.jsxs("li",{children:["Miners: ",((a=e.miners)==null?void 0:a.length)??0]}),p.jsxs("li",{children:["Buildings: ",p.jsx(Rc,{entities:e.buildings})]}),p.jsxs("li",{children:["Vehicles: ",p.jsx(Rc,{entities:e.vehicles})]}),p.jsxs("li",{children:["Creatures: ",p.jsx(Rc,{entities:e.creatures})]})]});case"crystals":return p.jsxs("ul",{children:[p.jsxs("li",{children:["Total EC: ",Dd(e)]}),(s=e.objectives)!=null&&s.crystals?p.jsxs("li",{children:["Goal: ",(l=e.objectives)==null?void 0:l.crystals]}):null]});case"ore":return p.jsxs("ul",{children:[p.jsxs("li",{children:["Total Ore: ",N$(e)]}),(u=e.objectives)!=null&&u.ore?p.jsxs("li",{children:["Goal: ",(c=e.objectives)==null?void 0:c.ore]}):null]});case"landslides":{if(!((f=e.landslides)!=null&&f.size))return null;const $=e.landslides.size,v=e.landslides.reduce((m,g)=>m+g.cooldown,0)/$;return p.jsxs("ul",{children:[p.jsxs("li",{children:["Landslides: ",$]}),v&&p.jsxs("li",{children:["Avg Cooldown: ",v.toFixed(2)," seconds"]})]})}case"erosion":{const $=((h=e.erosion)==null?void 0:h.size)??0,v=e.erosion?e.erosion.reduce((m,g)=>m+(g===!0?-1:g.cooldown),0)/$:null;return p.jsxs("ul",{children:[p.jsxs("li",{children:["Water:"," ",(d=e.tiles)==null?void 0:d.reduce((m,g)=>g===S.WATER?m+1:m,0)]}),p.jsxs("li",{children:["Lava:"," ",(y=e.tiles)==null?void 0:y.reduce((m,g)=>g===S.LAVA?m+1:m,0)]}),p.jsxs("li",{children:["Erosion: ",$]}),v&&v>0&&p.jsxs("li",{children:["Avg Cooldown: ",v.toFixed(2)," seconds"]})]})}case"height":return e.height?p.jsxs("ul",{children:[p.jsxs("li",{children:["min:"," ",e.height.reduce(($,v)=>v<$?v:$,0).toFixed()]}),p.jsxs("li",{children:["mean:"," ",(()=>{let $=0,v=0;return e.height.forEach(m=>{$+=m,v+=1}),($/v).toFixed(1)})()]}),p.jsxs("li",{children:["max:"," ",e.height.reduce(($,v)=>v>$?v:$,0).toFixed()]})]}):null;case"oxygen":return p.jsxs("p",{children:["Oxygen: ",((_=e.oxygen)==null?void 0:_.join("/"))??"Infinity"]});case"objectives":{if(!e.objectives)return p.jsx("p",{children:"No objectives yet..."});const $=e_(e.objectives).resourceGoalNumbers;return p.jsxs("ul",{children:[e.objectives.variables.map(({description:v})=>p.jsx("li",{children:v},v)),$&&p.jsxs("li",{children:["Collect ",$,"."]})]})}default:return null}})();return r&&p.jsx("div",{className:D.stats,children:r})}const We=6;function Kd(e){return e+1}function LG(e){const[t,r]=e.path.baseplates[0].center;return p.jsx("circle",{className:D.bg,cx:t*We,cy:r*We,r:Kd(e.pearlRadius)*We})}function IG(e,t){e.radius<t.radius&&([e,t]=[t,e]);const[r,n]=[t.x-e.x,t.y-e.y],i=Math.hypot(r,n),o=Math.atan2(n,r),a=e.radius-t.radius,s=Math.acos(a/i),l={x:Math.cos(o-s),y:Math.sin(o-s)},u={x:Math.cos(o+s),y:Math.sin(o+s)},c=[e.x+e.radius*l.x,e.y+e.radius*l.y],f=[e.x+e.radius*u.x,e.y+e.radius*u.y],h=[t.x+t.radius*l.x,t.y+t.radius*l.y],d=[t.x+t.radius*u.x,t.y+t.radius*u.y];return[`M ${f.join(",")}`,`A ${e.radius},${e.radius} 0 1 1 ${c.join(",")}`,`L ${h.join(",")}`,`A ${t.radius},${t.radius} 0 0 1 ${d.join(",")} Z`].join("")}function kG(e){const[t,r]=e.path.baseplates.map(n=>{const[i,o]=n.center;return{x:i*We,y:o*We,radius:Kd(n.pearlRadius)*We}});return p.jsx("path",{className:D.bg,d:IG(t,r)})}function MG(e){const r=e.path.baseplates.map((n,i)=>{const[o,a]=n.center;return`${i===0?"M":"L"}${o*We} ${a*We}`}).join(" ");return p.jsx("path",{className:D.bg,d:r,fill:"none",strokeWidth:Kd(e.pearlRadius)*2*We})}function NG({cavern:e,mapOverlay:t}){if(!e.plans)return null;function r(s){var l,u,c;return Fe([D.plan,s.kind&&D[`${s.kind}Kind`],((l=s.path)==null?void 0:l.kind)&&D[`${s.path.kind}PathKind`],s.fluid&&D[`fluid${s.fluid.id}`],s.hasErosion&&D.hasErosion,(((u=s.architect)==null?void 0:u.script)||((c=s.architect)==null?void 0:c.scriptGlobals))&&D.hasScript,s.id===e.anchor&&D.isAnchor]).join(" ")}const n=[];e.plans.forEach(s=>{const l=s.path.baseplates,u=Math.floor((l.length-1)/2),c=Math.floor(l.length/2);if(u===c)n[s.id]=l[u].center;else{const[f,h]=l[u].center,[d,y]=l[c].center;n[s.id]=[(f+d)/2,(h+y)/2]}});const i=[...e.plans];i.sort((s,l)=>n[l.id][0]-n[s.id][0]);const o=i.splice(Math.floor(i.length/2));i.sort((s,l)=>n[s.id][1]-n[l.id][1]),o.sort((s,l)=>n[s.id][1]-n[l.id][1]||n[s.id][0]-n[l.id][0]);function a(s,l,u){var h;if(t==="script")return null;if(t==="overview")return s.map(d=>{var $,v;const y=d.path.baseplates;if(y.length<=1){const[m,g]=y[0].center;return p.jsx("g",{className:`${D.inline} ${r(d)}`,children:p.jsxs("text",{className:D.label,x:m*We,y:g*We,children:["architect"in d&&(($=d.architect)==null?void 0:$.name)," ",d.id]})},d.id)}const _=y.map((m,g)=>{const[E,O]=m.center;return`${g===0?"M":"L"}${E*We} ${O*We}`}).join(" ");return p.jsxs("g",{className:`${D.inline} ${r(d)}`,children:[p.jsx("path",{id:`planLabel${d.id}`,d:_,fill:"none"}),p.jsx("text",{className:D.label,children:p.jsxs("textPath",{href:`#planLabel${d.id}`,startOffset:"50%",children:["architect"in d&&((v=d.architect)==null?void 0:v.name)," ",d.id]})})]},d.id)});let c=-1/0;const f=((h=e.context)==null?void 0:h.targetSize)??0;return s.map((d,y)=>{var E,O;const _=We*n[d.id][0];c=Math.max(We*n[d.id][1],c+4);const $=(We*f/2+50)*l,v=We*f*((y+1)/s.length-.5),m=$-Math.abs(c-v)*.56*l,g=Fe([`M ${$+25*l} ${v}`,`L ${$} ${v}`,m*l>_*l&&`L ${m} ${c}`,`L ${_} ${c}`]).join("");return p.jsxs("g",{className:`${u} ${r(d)}`,children:[p.jsx("path",{className:D.pointer,d:g}),p.jsx("text",{className:D.label,x:$+25*l,y:v,children:"architect"in d&&((E=d.architect)!=null&&E.name)?p.jsxs(p.Fragment,{children:[d.architect.name,!((O=d.hops)!=null&&O.length)&&"*"," ",d.id]}):p.jsx(p.Fragment,{children:d.id})})]},d.id)})}return p.jsxs(p.Fragment,{children:[e.plans.map(s=>"pearlRadius"in s?p.jsx("g",{className:r(s),children:s.kind==="cave"?s.path.baseplates.length===2?kG(s):LG(s):MG(s)},s.id):s.path.baseplates.length??!1?p.jsx(Q$,{path:s.path},s.id):null),a(o,-1,D.left),a(i,1,D.right)]})}const PG="_script_ioqac_1",FG="_src_ioqac_14",jG="_line_ioqac_19",BG="_hovered_ioqac_24",DG="_scriptOverlay_ioqac_29",HG="_tile_ioqac_29",WG="_arrow_ioqac_32",UG="_misc_ioqac_37",zG="_arrowhead_ioqac_40",GG="_h3_ioqac_49",VG="_h4_ioqac_54",KG="_condition_ioqac_63",YG="_event_ioqac_67",Ze={script:PG,src:FG,line:jG,hovered:BG,scriptOverlay:DG,tile:HG,arrow:WG,misc:UG,arrowhead:zG,h3:GG,h4:VG,condition:KG,event:YG},pi=6,qG=/^# (P\d+|Globals):/;function th(e){const t=e.script;return t?t.split(`
`).map(r=>{var i;if(r.startsWith("#>"))return{kind:"h3",code:r};if(r.startsWith("#"))return qG.test(r)?{kind:"h4",code:r}:{kind:"misc",code:r};if(!r)return{kind:"misc",code:" "};let n=r.match(/(?<prefix>(^|\())[a-z]+:(?<y>\d+),(?<x>\d+)/);if(n)return{kind:n.groups.prefix==="("?"condition":"event",code:r,pos:[parseInt(n.groups.x,10),parseInt(n.groups.y)]};if(n=r.match(/\bp(?<id>\d+)/),n){const o=(i=e.plans)==null?void 0:i[parseInt(n.groups.id,10)].path.baseplates;if(o)return{kind:"misc",code:r,pos:tr(o[Math.floor(o.length/2)].center,[-e.left,-e.top])}}return{kind:"misc",code:r}}):[]}function t0(e){const t=[],r=Array.from(e.getElementsByClassName(Ze.line));let n=0;for(;n<r.length&&!(r[n].offsetTop+r[n].clientHeight>=e.scrollTop);n++);for(;n<r.length&&!(r[n].offsetTop>=e.scrollTop+e.clientHeight);n++)t[n]=r[n].offsetTop+r[n].clientHeight/2-e.clientHeight/2-e.scrollTop;return t}function XG({cavern:e,setScriptLineOffsets:t,scriptLineHovered:r,setScriptLineHovered:n}){const i=q.createRef();q.useLayoutEffect(()=>{const a=i.current;a&&t(t0(a))},[i,t]);const o=q.useMemo(()=>e!=null&&e.script?th(e):void 0,[e]);return p.jsxs("div",{className:Ze.script,ref:i,onScroll:()=>{i.current&&t(t0(i.current))},children:[p.jsx("h2",{children:"Script"}),p.jsxs("p",{children:[(o==null?void 0:o.length)??0," lines"]}),p.jsx("div",{className:Ze.src,children:o==null?void 0:o.map(({code:a,kind:s},l)=>{const u=Fe([Ze.line,r===l&&Ze.hovered,Ze[s]]).join(" ");return p.jsx("div",{className:u,onMouseOver:()=>n(l),onMouseLeave:()=>r===l&&n(-1),children:a},l)})})]})}function QG({cavern:e,scriptLineOffsets:t,scriptLineHovered:r,scale:n}){const i=q.useMemo(()=>e!=null&&e.script?th(e):void 0,[e]);if(!(e!=null&&e.script))return null;const o=e.left,a=e.top;return p.jsxs("g",{className:Ze.scriptOverlay,children:[i.map(({kind:s,pos:l},u)=>{if(!l||t[u]===void 0||s==="misc")return null;const c=Fe([Ze.tile,r===u&&Ze.hovered,Ze[s]]).join(" ");return p.jsx("rect",{className:c,x:(l[0]+o)*pi,y:(l[1]+a)*pi,width:pi,height:pi},u)}),th(e).map(({kind:s,pos:l},u)=>{if(!l||r!==u||t[u]===void 0)return null;const c=-9999,f=t[u]/n,h=(l[0]+o+.5)*pi,d=(l[1]+a+.5)*pi,y=h-Math.abs(d-f)*.3,_=`M ${h} ${d} L ${y} ${f} L ${c} ${f}`,$=10,v=4;return p.jsxs(q.Fragment,{children:[p.jsx("path",{className:`${Ze.arrow} ${Ze[s]}`,d:_}),s!=="misc"&&p.jsxs(p.Fragment,{children:[p.jsx("circle",{className:`${Ze.arrowhead} ${Ze[s]}`,cx:h,cy:d,r:$}),p.jsx("rect",{className:`${Ze.tile} ${Ze[s]}`,x:h-v,y:d-v,width:2*v,height:2*v})]})]},u)})]})}const Es=6;function ZG({cavern:e}){var t;return p.jsxs("g",{className:D.objectives,children:[e.anchor&&(()=>{const[r,n]=e.plans[e.anchor].path.baseplates[0].center;return p.jsx("circle",{r:10,cx:r*Es,cy:n*Es,className:D.origin})})(),(t=e.plans)==null?void 0:t.map(r=>{var n;if((n=r.architect)!=null&&n.objectives){const[i,o]=r.path.baseplates[0].center;return p.jsx("g",{transform:`translate(${i*Es} ${o*Es})`,className:D.objective,children:p.jsx("path",{d:"M -10 -10 L 10 10 M -10 10 L 10 -10",strokeWidth:5})},r.id)}return null})]})}const r0=6;function JG({ore:e,crystals:t,discoveryZones:r}){function n(i,o,a,s){var l;return(l=r==null?void 0:r.get(a,s))!=null&&l.openOnSpawn?Array.from({length:o},(u,c)=>p.jsx("circle",{className:D.ring,cx:(a+(i+.2+(s+c*c)*.53)%1)*r0,cy:(s+(i+.7+(a+c*c)*.35)%1)*r0,r:.5},c)):null}return p.jsxs("g",{className:D.resources,children:[e&&p.jsx("g",{className:D.ore,children:e.map((...i)=>n(.5,...i))}),t&&p.jsx("g",{className:D.crystals,children:t.map((...i)=>n(0,...i))})]})}function eV(e,t,r,n){if(!n||e.left===void 0)return 1;const i=Math.max(-1*(e.left??0),1+(e.right??0))+1,o=Math.max(-1*(e.top??0),1+(e.bottom??0))+1,a=e.plans&&r&&t!=="script"?400:0,s=6*2*i+a,l=6*2*o;return Math.max(Math.floor(Math.min(n.clientWidth/s,n.clientHeight/l)*2)/2,.5)}function tV(e,t,r){if(t!=="overview"||!e.cameraPosition)return{"--pvw-scale":r};const{x:n,y:i,yaw:o,pitch:a}=e.cameraPosition;return{"--pvw-scale":6,"--pvw-pitch":`${a}rad`,"--pvw-yaw":`${Math.PI-(o+Math.PI*1.5)%(Math.PI*2)}rad`,"--pvw-tr-x":-n*6,"--pvw-tr-y":-i*6}}function rV({cavern:e,mapOverlay:t,showOutlines:r,showPearls:n}){var y,_,$,v,m,g,E,O,R,b;const[i,o]=q.useState(-1),[a,s]=q.useReducer((A,x)=>{if(A.length!==x.length)return x;for(let T=0;T<A.length;T++)if(A[T]!==x[T])return x;return A},[]),l=q.createRef(),[u,c]=q.useState(1);switch(q.useLayoutEffect(()=>{const A=()=>c(eV(e,t,r,l.current));return window.addEventListener("resize",A),A(),()=>window.removeEventListener("resize",A)},[e,t,r,l]),t){case"about":case"lore":return null}const f=(y=e.context)==null?void 0:y.targetSize;if(!f)return null;const h=f*2*6,d=Math.max(h,f*6+600);return p.jsxs("div",{className:D.cavernPreview,style:tV(e,t,u),children:[t==="script"&&p.jsx(XG,{cavern:e,setScriptLineOffsets:s,scriptLineHovered:i,setScriptLineHovered:o}),p.jsx("div",{className:D.mapWrapper,ref:l,children:p.jsxs("svg",{className:`${D.map} ${e.baseplates||e.plans?"":D.void}`,style:{top:`calc(50% - ${h/2}px)`,left:`calc(50% - ${d/2}px)`,width:d,height:h},viewBox:`${d/-2} ${h/-2} ${d} ${h}`,xmlns:"http://www.w3.org/2000/svg",children:[p.jsx(pG,{cavern:e,mapOverlay:t}),t==="overview"&&p.jsx(JG,{...e}),t==="height"&&e.height&&p.jsx(_G,{height:e.height}),r&&((_=e.baseplates)==null?void 0:_.map(A=>p.jsx(aG,{baseplate:A},A.id))),r&&(($=e.paths)==null?void 0:$.map(A=>p.jsx(Q$,{path:A},A.id))),(v=e.buildings)==null?void 0:v.map((A,x)=>p.jsx(Ss,{entity:A,mapOverlay:t,cavern:e},x)),(m=e.creatures)==null?void 0:m.map(A=>p.jsx(Ss,{entity:A,mapOverlay:t,cavern:e},A.id)),(g=e.miners)==null?void 0:g.map(A=>p.jsx(Ss,{entity:A,mapOverlay:t,cavern:e},A.id)),(E=e.vehicles)==null?void 0:E.map(A=>p.jsx(Ss,{entity:A,mapOverlay:t,cavern:e},A.id)),t==="discovery"&&((O=e.openCaveFlags)==null?void 0:O.map((A,x,T)=>p.jsx(gG,{x,y:T},`${x},${T}`))),t==="objectives"&&p.jsx(ZG,{cavern:e}),t==="script"&&p.jsx(QG,{cavern:e,scriptLineOffsets:a,scriptLineHovered:i,scale:u}),r&&e.plans&&p.jsx(NG,{cavern:e,mapOverlay:t}),n&&((R=e.plans)==null?void 0:R.filter(A=>"outerPearl"in A).map(A=>p.jsx(Zg,{plan:A,pearl:"outerPearl"},A.id))),n&&((b=e.plans)==null?void 0:b.filter(A=>"innerPearl"in A).map(A=>p.jsx(Zg,{plan:A,pearl:"innerPearl"},A.id)))]})}),p.jsx(TG,{cavern:e,mapOverlay:t})]})}class Sl{constructor(t){this.steps=t}mkResult(t,r){const n=r<this.steps.length?()=>this.mkResult(this.steps[r].fn(t),r+1):null;return{result:t,next:n,completedSteps:r,totalSteps:this.steps.length,lastStepName:r>0?this.steps[r-1].name:"init",nextStepName:r<this.steps.length?this.steps[r].name:"done"}}start(t){return this.mkResult(t,0)}first(t){return this.start(t).next()}chain(t){return new Sl([...this.steps,...t.steps])}then(t,r){return r??(r=t.name),new Sl([...this.steps,{fn:t,name:r}])}}function vo(e,t){return t??(t=e.name),new Sl([{fn:e,name:t}])}class Li{constructor(t,r,n,i,o,a){this.id=t,this.left=r,this.top=n,this.right=i,this.bottom=o,this.kind=a}get width(){return this.right-this.left}get height(){return this.bottom-this.top}get area(){return this.width*this.height}get center(){return[this.left+this.width/2,this.top+this.height/2]}withKind(t){return new Li(this.id,this.left,this.top,this.right,this.bottom,t)}get pearlRadius(){return Math.min(this.width,this.height)>>1}}const n0=3;class nV{constructor({context:t,dice:r}){this.nextId=0,this.context=t,this.rng=r.partition,this.baseplateMaxSize=Math.max(Math.round(t.targetSize*t.baseplateMaxRatioOfSize),3);const n=t.targetSize>>1;this.queue=[new Li(this.id(),-n,-n,n,n,"stock")],this.outbox=[]}id(){return this.nextId++}clone(t,r,n){const i=new Li(r,n.left??t.left,n.top??t.top,n.right??t.right,n.bottom??t.bottom,"stock");Math.min(i.width,i.height)>=n0&&this.queue.push(i)}get baseplates(){return[...this.queue,...this.outbox]}get done(){return this.queue.length===0}step(){const t=[...this.queue];this.queue.length=0;for(const r of t)this.split(r)}split(t){if(t.width>t.height*2){const r=this.rng.betaInt({a:5,b:5,min:t.left+1,max:t.right});this.clone(t,t.id,{right:r}),this.clone(t,this.id(),{left:r})}else if(t.height>t.width*2){const r=this.rng.betaInt({a:5,b:5,min:t.top+1,max:t.bottom});this.clone(t,t.id,{bottom:r}),this.clone(t,this.id(),{top:r})}else{let r=this.rng.betaInt({a:5,b:2.5,min:3,max:Math.min(this.baseplateMaxSize,t.width)}),n=this.rng.betaInt({a:5,b:2.5,min:3,max:Math.min(this.baseplateMaxSize,t.height)});r=Math.min(r,n+this.context.baseplateMaxOblongness),n=Math.min(n,r+this.context.baseplateMaxOblongness);const i=this.rng.uniformInt({min:t.left,max:t.right-r}),o=this.rng.uniformInt({min:t.top,max:t.bottom-n}),a=i+r,s=o+n;Math.min(r,n)>=n0&&(Math.max(r,n)<=this.baseplateMaxSize?this.outbox.push(new Li(t.id,i,o,a,s,"ambiguous")):this.queue.push(new Li(t.id,i,o,a,s,"stock"))),this.rng.chance(.5)?(this.clone(t,this.id(),{right:i,bottom:s}),this.clone(t,this.id(),{left:i,bottom:o}),this.clone(t,this.id(),{left:a,top:o}),this.clone(t,this.id(),{right:a,top:s})):(this.clone(t,this.id(),{right:a,bottom:o}),this.clone(t,this.id(),{left:a,bottom:s}),this.clone(t,this.id(),{left:i,top:s}),this.clone(t,this.id(),{right:i,top:o}))}}}function iV(e){const t=new nV(e);for(;!t.done;)t.step();return{...e,baseplates:t.baseplates}}function oV(e){const t=[...e.baseplates],r=e.baseplates.map((i,o)=>[i.area,o]).sort(([i],[o])=>o-i),n=Math.min(e.context.caveCount,t.length-1);for(let i=0;i<n;i++){const o=r[i][1];t[o]=t[o].withKind("cave")}return{...e,baseplates:t}}function i0(e,t){const[r,n]=e.center,[i,o]=t.center,a=r-i,s=n-o;return Math.hypot(a,s)}class Zi{constructor(t,r,n){this.id=t,this.kind=r,this.baseplates=n}get origin(){return this.baseplates[0]}get destination(){return this.baseplates[this.baseplates.length-1]}get batDistance(){return i0(this.origin,this.destination)}get snakeDistance(){return Nd(this.baseplates,i0).reduce((t,r)=>t+r,0)}get exclusiveSnakeDistance(){return Math.max(this.snakeDistance-this.origin.pearlRadius-this.destination.pearlRadius,0)}}function aV(e){const t=e.baseplates.filter(o=>o.kind==="cave"),r=t.flatMap(o=>o.center),n=new du(r),i=[];for(let o=0;o<n.triangles.length;o++)if(o>n.halfedges[o]){const a=i.length,s=t[n.triangles[o]],l=t[n.triangles[o+(o%3===2?-2:1)]];i[a]=new Zi(a,"ambiguous",[s,l])}return{...e,paths:i}}function sV(e){const t=[];let r=1;const n=[];for(const i of[...e.paths].sort((o,a)=>o.batDistance-a.batDistance)){const o=i.origin.id,a=i.destination.id,s=t[o],l=t[a];if(s&&l){if(s===l){n[i.id]=i;continue}t.forEach((u,c)=>{u===l&&(t[c]=s)})}else s?t[a]=s:l?t[o]=l:(t[o]=r,t[a]=r,r++);n[i.id]=new Zi(i.id,"spanning",i.baseplates)}return{...e,paths:n.filter(i=>i)}}function lV(e){const t=e.context.targetSize/2,r=t*t,n=e.paths.filter(i=>i.kind==="spanning"||!i.baseplates.some(o=>{const[a,s]=o.center;return a*a+s*s>r}));return{...e,paths:n}}function uV(e){const t={};for(const i of e.baseplates)for(let o=i.left;o<i.right;o++)for(let a=i.top;a<i.bottom;a++)t[`${o},${a}`]=i;function*r(i){let o=i.origin;const a=new Set([o]);for(yield o;;)for(const[s,l]of fo(o.center,i.destination.center)){const u=t[`${s},${l}`];if(u===i.destination){yield u;return}if(u&&!a.has(u)&&(a.add(u),u.kind!=="cave")){o=u,yield o;break}}}const n=e.paths.map(i=>new Zi(i.id,i.kind,Array.from(r(i))));return{...e,paths:n}}function cV(e){const t=[],r=(n,i,o,a)=>{var d;const[s,l]=i.center,[u,c]=o.center,f=Math.atan2(c-l,u-s),h=n.snakeDistance;(t[d=i.id]||(t[d]={src:i,edges:[]})).edges[n.id]={theta:f,distance:h,dest:a}};return e.forEach(n=>{const i=n.baseplates;r(n,i[0],i[1],i[i.length-1]),r(n,i[i.length-1],i[i.length-2],i[0])}),t}function fV(e,t,r){const n=[],i=[],o=[];for(n[r.id]=0,i.push(r);i.length;){const a=i.shift();o.unshift({src:r,dest:a,distance:n[a.id]}),e[a.id].edges.forEach(({distance:s,dest:l},u)=>{var f;const c=(f=t[u])==null?void 0:f.kind;if(c==="spanning"||c==="auxiliary"){const h=n[a.id]+s;n[l.id]===void 0?(i.push(l),n[l.id]=h):h<n[l.id]&&(n[l.id]=h)}}),i.sort((s,l)=>n[s.id]-n[l.id])}return o}function hV(e,t){const r=Math.abs(e-t);return r>Math.PI?2*Math.PI-r:r}function dV(e){const t=e.dice.weave,r=cV(e.paths),n=[],i=[];e.paths.forEach(u=>{var c,f;n[u.id]=u,(i[c=u.origin.id]||(i[c]=[]))[u.destination.id]=u.id,(i[f=u.destination.id]||(i[f]=[]))[u.origin.id]=u.id});function o(u,c){const f=c.edges[u.id].theta;return c.edges.reduce((h,{theta:d},y)=>{var $;const _=($=n[y])==null?void 0:$.kind;return _==="spanning"||_==="auxiliary"?Math.min(hV(f,d),h):h},1/0)}function a(){let u=!1;return n.filter(c=>c.kind==="ambiguous").forEach(c=>{Math.min(o(c,r[c.origin.id]),o(c,r[c.destination.id]))<e.context.auxiliaryPathMinAngle?delete n[c.id]:u=!0}),u}function s(){const u=r.map(({src:c})=>fV(r,n,c));for(;;){const{src:c,dest:f}=u.reduce((d,y)=>d[0].distance>y[0].distance?d:y).shift(),h=n[i[c.id][f.id]];if((h==null?void 0:h.kind)==="ambiguous"){n[h.id]=new Zi(h.id,"auxiliary",h.baseplates);break}}}function l(){const u=t.betaChoice(n.filter(c=>c.kind==="ambiguous").map(c=>({path:c,oa:o(c,r[c.origin.id]),da:o(c,r[c.destination.id])})).sort((c,f)=>c.oa+c.da-f.oa-f.da),{a:1,b:5}).path;n[u.id]=new Zi(u.id,"auxiliary",u.baseplates)}for(let u=0;u<e.context.optimalAuxiliaryPathCount;u++)a()&&s();for(let u=0;u<e.context.randomAuxiliaryPathCount;u++)a()&&l();return{...e,paths:n.filter(u=>u)}}const pV=vo(iV,"Partitioning target space").then(oV,"Discriminating baseplates").then(aV,"Triangulating paths").then(sV,"Spanning path graph").then(lV,"Clipping boring paths").then(uV,"Boring interesting paths").then(dV,"Weaving best paths");function o0(e,t){for(const[r,n,i,o,a,s]of[[e.right,t.left,e.top,e.bottom,t.top,t.bottom],[e.bottom,t.top,e.left,e.right,t.left,t.right]])if(r===n&&Math.min(o,s)-Math.max(i,a)>Math.max(o-i,s-a)/2)return!0;return!1}function mV(e){const t=[],r=[[],[],[]];[...e.paths.filter(o=>o.kind==="spanning"),...e.paths.filter(o=>o.kind==="auxiliary")].forEach(o=>{if(o.baseplates.length===2){const[a,s]=o.baseplates;if(!t[a.id]&&!t[s.id]&&(o0(a,s)||o0(s,a))){t[a.id]=!0,t[s.id]=!0,r[2].push({path:o,kind:"cave"});return}}r[0].push({path:o,kind:"hall"})}),r[1]=e.baseplates.filter(o=>o.kind==="cave"&&!t[o.id]).map(o=>({path:new Zi(-1,"single",[o]),kind:"cave"}));const i=r.flatMap(o=>o).map((o,a)=>({...o,id:a}));return{initialContext:e.initialContext,context:e.context,dice:e.dice,plans:i}}function vV(e){const t=[];e.plans.forEach(n=>{n.path.baseplates.forEach(i=>{var o;return(t[o=i.id]||(t[o]=[])).push(n.id)})});const r=e.plans.map(n=>{const i=[];n.path.baseplates.flatMap(s=>t[s.id]).filter(s=>s!==n.id).forEach(s=>i[s]=!0);const o=(n.kind==="cave"?Math.max:Math.min)(...n.path.baseplates.map(s=>s.pearlRadius)),a=Math.round(n.kind==="cave"?Math.PI*(Math.min(o,n.path.origin.pearlRadius)+Math.min(o,n.path.destination.pearlRadius))+n.path.snakeDistance*2:2*n.path.exclusiveSnakeDistance);return{...n,intersects:i,pearlRadius:o,perimeter:a}});return{...e,plans:r}}function gV(e,t){const r=t.shuffle(e.plans.filter(i=>i.kind==="cave")),n=(i,o,a,s)=>{if(o<1)return[];const l=t.shuffle(Array.from({length:o-1},(u,c)=>c+1)).filter((u,c)=>c<a-1).sort();return Nd([0,...l,o],(u,c)=>({fluid:i,remaining:c-u,skipChance:s,stack:[r.pop()]}))};return[...n(S.WATER,e.context.waterPlans,e.context.waterLakes,.2),...n(S.LAVA,e.context.lavaPlans,e.context.lavaLakes,.2)]}function yV(e,t){const r=[];for(let n=0;n<e.plans.length;n++){if(r[n])continue;const i=[n],o=[];for(;i.length;){const a=i.shift();r[a]||(r[a]=1/0,o.push(a),i.push(...e.plans[a].intersects.map((s,l)=>l).filter(s=>t[s]===t[n])))}o.forEach(a=>r[a]=o.length)}return r}function wV(e){const t=e.dice.flood,r=gV(e,t),n=[],i=[];for(const c of r)i[c.stack[0].id]=c;let o=!0;for(;o;){o=!1;for(const c of r){if(c.remaining<=0||c.stack.length===0)continue;const f=c.stack.pop();if(i[f.id]===c){if(o=!0,c.stack.length>0&&t.chance(c.skipChance)){c.stack.unshift(f);continue}c.remaining--,n[f.id]=c.fluid,f.intersects.map((h,d)=>e.plans[d]).filter(h=>h.kind!==f.kind).forEach(h=>{i[h.id]?i[h.id]!==c&&(i[h.id]="none"):(i[h.id]=c,c.stack.push(h))})}}}const a=[],s=[...r.flatMap(c=>c.fluid===S.LAVA?c.stack:[]),...n.flatMap((c,f)=>c===S.LAVA?[e.plans[f]]:[])];for(let c=e.context.erosionPlans;c>=0&&s.length>0;c--){const[f]=s.splice(t.uniformInt({min:0,max:s.length}),1);a[f.id]=!0,f.intersects.map((h,d)=>e.plans[d]).filter(h=>h.kind!==f.kind).forEach(h=>{i[h.id]||(i[h.id]="erosion",s.push(h))})}const l=yV(e,n),u=e.plans.map(c=>({...c,fluid:n[c.id]??null,lakeSize:l[c.id],hasErosion:!!a[c.id]}));return{...e,plans:u}}function $V(e){const t=q$(Gd,e),r=e.dice.pickSpawn.weightedChoice(t.flatMap(i=>i.anchorBid?e.plans.filter(o=>o.kind==="cave").map(o=>({item:{...o,architect:i,hops:[]},bid:i.anchorBid({cavern:e,plan:o})||0})):[])),n=[...e.plans];return n[r.id]=r,{...e,anchor:r.id,plans:n}}function _V(e){const t=Rn(e).architect;return t.mod?t.mod(e):e}class SV extends oe{atLayer(t){const r=[];return this.forEach((n,i,o)=>{n===t&&r.push([i,o])}),r}set(t,r,n){const i=this.get(t,r);(i===void 0||n<i)&&super.set(t,r,n)}}function EV(e,t){uu(t.path.baseplates,(r,n)=>{for(const[i,o]of fo(r.center,n.center))e.set(i,o,0)})}function AV(e,t){t.path.baseplates.forEach(r=>{const n=t.pearlRadius-r.pearlRadius,i=Math.min(r.pearlRadius,r.width-1>>1),o=Math.min(r.pearlRadius,r.height-1>>1);for(let a=r.left+i;a<r.right-i;a++)for(let s=r.top+o;s<r.bottom-o;s++)e.set(a,s,n)}),uu(t.path.baseplates,(r,n)=>{const i=t.pearlRadius-Math.min(r.pearlRadius,n.pearlRadius);for(const[o,a]of fo(r.center,n.center))e.set(o,a,i)})}function OV(e,t,r,n,i){const o=[];for(;i;){const{x:a,y:s,vx:l,vy:u}=i;e.set(a,s,n),o.push([a,s]);const c=[{ox:0,oy:0,vx:-u,vy:l},{ox:-u,oy:l,vx:l,vy:u},{ox:0,oy:0,vx:l,vy:u},{ox:u,oy:-l,vx:l,vy:u},{ox:0,oy:0,vx:u,vy:-l}].map(h=>({...h,x:a+h.ox+h.vx,y:s+h.oy+h.vy}));if(c.some(({x:h,y:d})=>{if((e.get(h,d)??-1)<n)return!1;for(let y=o.length-2;y>Math.max(o.length-4,0);y--){const[_,$]=o[y];if(_===h&&$===d)return!1}return!0}))break;i=c.find(({x:h,y:d})=>!((e.get(h,d)??-1)>=0||r>0&&t.chance(r)))}return o}function RV(e,t,r,n){return e.atLayer(n-1).flatMap(([i,o])=>Ke.flatMap(([a,s])=>(e.get(i+a,o+s)??-1)>=0?[]:OV(e,t,r,n,{x:i+a,y:o+s,vx:-s,vy:a})))}function bV(e){const t=e.plans.map(r=>{const n=e.dice.pearl(r.id),i=new SV;(r.kind==="cave"?AV:EV)(i,r);const o=[i.map((l,u,c)=>[u,c])],a=[],s=r.architect.roughExtent(r);for(let l=1;l<s+4;l++)(l<=s?o:a).push(RV(i,n,l<s?r.baroqueness:0,l));return{...r,innerPearl:o,outerPearl:a}});return{...e,plans:t}}const xV=vo(mV,"Negotiating plans").then(vV,"Measuring plans").then(wV,"Flooding cavern").then($V,"Choosing anchor").then(_V,"Applying mods").then(t7,"Establishing plans").then(bV,"Drawing pearls");function CV(e){const t=new oe,r=new oe;return e.plans.forEach(n=>{n.innerPearl.forEach((i,o)=>i.forEach(([a,s])=>{const l=t.get(a,s)||[];l[n.id]=o,t.set(a,s,l)})),n.outerPearl.forEach((i,o)=>i.forEach(([a,s])=>{const l=r.get(a,s)||[];l[n.id]=o,r.set(a,s,l)}))}),{...e,pearlInnerDex:t,pearlOuterDex:r}}function TV(e){const t=new oe;return e.plans.forEach(r=>{r.architect.rough({cavern:e,plan:r,tiles:t})}),{...e,tiles:t}}function t_(e){var i;const t=new oe,r=e.map((o,a,s)=>({x:a,y:s,zone:null}));let n=0;for(;r.length>0;){let{x:o,y:a,zone:s}=r.shift();if(t.get(o,a)===void 0&&((i=e.get(o,a))==null?void 0:i.isWall)===!1){s||(s={id:n++,openOnSpawn:!1,triggerPoint:[o,a]}),t.set(o,a,s);const l=$$.map(([u,c])=>({x:o+u,y:a+c,zone:s}));r.unshift(...l)}}return t}function LV(e){const t=e.dice.brace,r=e.tiles.copy(),n=t_(r),i=new oe;function o(s){var u;if(i.get(...s)||!((u=r.get(...s))!=null&&u.isWall))return;const l=t.shuffle(Ke).map(([c,f])=>{const h=tr(s,[c,f]),d=tr(s,[f,-c]),y=tr(s,[-c,-f]),_=tr(s,[-f,c]),$=tr(s,[c-f,f+c]),v=tr(s,[-c+f,-f-c]),m=[h,$,_].reduce((g,E)=>{var O;return((O=r.get(...E))==null?void 0:O.isWall)===!1?g+1:g},0);return{pw:h,pa:d,ps:y,pd:_,pe:$,pz:v,floors:m}});l.sort((c,f)=>c.floors-f.floors);for(const{pw:c,pa:f,ps:h,pd:d,pe:y,pz:_,floors:$}of l){if($===0){[s,c,y,d].forEach(m=>i.set(...m,!0));return}const v=[];if([c,y,d,h,_,f].forEach(m=>{var g;if(((g=r.get(...m))==null?void 0:g.isWall)===!1){const E=n.get(...m);v[E.id]=E}}),v.reduce(m=>m+1,0)>1){const[m,g]=v.filter(()=>!0);if(!m.openOnSpawn||!g.openOnSpawn){i.set(...s,!0);return}}[c,y,d].forEach(m=>{var g;((g=r.get(...m))==null?void 0:g.isWall)===!1&&r.set(...m,S.DIRT),i.set(...m,!0)}),i.set(...s,!0);return}}return t.shuffle(r.flatMap((s,l,u)=>[[0,0],...Ke].map(([c,f])=>[l+c,u+f]))).forEach(o),{...e,tiles:r}}const a0=[[...oi,2],[...g$,1],[...au,2],[...y$,1],[...su,2],[...w$,1],[...lu,2],[...Md,1]];function IV(e,t,r){var i;let n=0;for(let o=0;o<a0.length;o++){const[a,s,l]=a0[o];if(((i=e.get(t+a,r+s))==null?void 0:i.isWall)===!1&&(n+=l),n>=2)return!1}return!0}function kV(e){const t=e.tiles.copy();return e.tiles.forEach((r,n,i)=>{r.hardness<Re.SOLID&&!Ke.some(([o,a])=>{const s=t.get(n+o,i+a);return s&&s.hardness<Re.HARD})?t.set(n,i,S.HARD_ROCK):!r.isWall&&IV(t,n,i)?t.set(n,i,S.DIRT):r.isFluid&&!Ke.some(([o,a])=>{var s;return(s=t.get(n+o,i+a))==null?void 0:s.isFluid})&&t.set(n,i,S.FLOOR)}),{...e,tiles:t}}function MV(e){const t=e.tiles.copy();return e.tiles.forEach((r,n,i)=>{r===S.HARD_ROCK&&!Ke.some(([o,a])=>{const s=t.get(n+o,i+a);return!s||s.hardness>=Re.HARD})&&t.set(n,i,S.LOOSE_ROCK)}),{...e,tiles:t}}function NV(e){let t;const r={cavern:e,tiles:e.tiles.copy(),crystals:new oe,ore:new oe,openCaveFlags:new oe},n=[],i=[...e.plans];return e.plans.forEach(o=>{const a=o.architect;a.placeRechargeSeam({...r,plan:o});const s=a.placeBuildings({...r,plan:o});if(s.buildings&&n.push(...s.buildings),s.cameraPosition){if(t)throw new Error("Attempted to set a camera position twice.");t=s.cameraPosition}s.metadata&&(o={...o,metadata:s.metadata},i[o.id]=o),a.placeCrystals({...r,plan:o}),a.placeOre({...r,plan:o}),a.placeSlugHoles({...r,plan:o})}),{...e,...r,plans:i,buildings:n,cameraPosition:t}}function PV(e){if(e.length===2){const[t,r]=e;return t[0]===r[0]||t[1]===r[1]}return e.length<2}function FV(e){const t=e.tiles.copy(),r=e.tiles.flatMap((n,i,o)=>Ke.map(([a,s])=>[i+a,o+s]));for(;r.length;){const[n,i]=r.shift();if(t.get(n,i))continue;const o=Ke.map(([a,s])=>[n+a,i+s]).filter(a=>!t.get(...a));PV(o)&&(t.set(n,i,S.SOLID_ROCK),r.push(...o))}return{...e,tiles:t}}function jV(e){var r,n;const t=Rn(e);if(t.architect.closer){const i=e.tiles.copy();return(n=(r=t.architect).closer)==null||n.call(r,{cavern:e,plan:t,tiles:i}),{...e,tiles:i}}return e}const BV=vo(CV,"Computing foundations").then(TV,"Rough pass over tiles").then(LV,"Bracing walls").then(kV,"Grouting voids").then(MV,"Sanding hard edges").then(NV,"Fine pass over tiles").then(FV,"Annexing playable area").then(jV,"Closing touches on tiles");function DV(e){const t=t_(e.tiles);return e.openCaveFlags.forEach((r,n,i)=>t.get(n,i).openOnSpawn=!0),{...e,discoveryZones:t}}class HV{constructor(){this.id=0}create(t){return{essential:!1,level:1,loadout:["Drill"],unique:null,...t,id:this.id++}}}const WV={z:52.15};function UV(e,t,r){return[`ID=${e.id.toFixed()}${e.unique?`/${e.unique}`:""}`,La({position:e,tileOffset:t,heightMap:r,entityOffset:WV}),[...e.loadout,...Array.from({length:e.level-1},()=>"Level")].map(n=>`${n}/`).join(""),e.essential&&"Essential=true"].filter(n=>n).join(",")}function zV(e){let t=e.cameraPosition;const r={cavern:e,landslides:new oe,erosion:new oe,creatureFactory:new HU,minerFactory:new HV,vehicleFactory:new G9},n=[],i=[],o=[],a=[...e.plans];if(e.plans.forEach(s=>{const l=s.architect,u=l.placeEntities({...r,plan:s});if(n.push(...u.creatures??[]),i.push(...u.miners??[]),o.push(...u.vehicles??[]),u.cameraPosition){if(t)throw new Error("Attempted to set a camera position twice.");t=u.cameraPosition}u.metadata&&(s={...s,metadata:u.metadata},a[s.id]=s),l.placeLandslides({...r,plan:s}),l.placeErosion({...r,plan:s})}),!t)throw new Error("No architect set a camera position! The anchor cave was expected to do this during either the populate or fine step.");return{...e,...r,creatures:n,miners:i,vehicles:o,cameraPosition:t}}function GV(e){let{left:t,top:r,right:n,bottom:i}=e.tiles.bounds;const o=n-t,a=i-r,s=Math.max(o,a);return t=t-Math.floor((s-o)/2)-1,r=r-Math.floor((s-a)/2)-1,n=t+s+2,i=r+s+2,{...e,left:t,top:r,right:n,bottom:i}}const VV=[[-1,-1],[-1,0],[0,-1],[0,0]];function KV(e){const t={min:-e.context.heightTargetRange,max:e.context.heightTargetRange},r=[],n=[],i=e.dice.height,o=e.plans.filter(a=>!a.hops.length);for(o.forEach(a=>r[a.id]=!0);o.length;){const a=o.shift(),s=n[a.id]??(a.kind==="cave"?i.uniformInt(t):null);n[a.id]=s,a.intersects.forEach((l,u)=>{const c=e.plans[u];r[u]||c.kind===a.kind||((a.fluid||c.fluid)&&(n[u]=s),r[u]=!0,o.push(c))})}return n}function YV(e){var i,o;const t=KV(e),r=e.context.heightTargetRange/-5,n=new oe;for(let a=e.left;a<e.right;a++)for(let s=e.top;s<e.bottom;s++){let l=0,u=0;const c=!!((i=e.tiles.get(a,s))!=null&&i.isFluid||e.erosion.get(a,s));(o=e.pearlInnerDex.get(a,s))==null||o.forEach((f,h)=>{const d=t[h];d!=null&&(l+=d,u++)}),u&&n.set(a,s,Math.round(l/u)+(c?r:0))}return n}function qV(e,t){const r=new oe;for(let n=e.left;n<=e.right;n++)for(let i=e.top;i<=e.bottom;i++){let o=0,a=0;VV.forEach(([s,l])=>{const u=t.get(n+s,i+l);u!==void 0&&(o+=u,a++)}),a&&r.set(n,i,o/a)}return r}function XV(e,t){const r=new oe;for(let n=e.left+1;n<e.right;n++)for(let i=e.top+1;i<e.bottom;i++){const o=t.get(n,i);if(o)r.set(n,i,o);else{let a=0,s=0;Ke.forEach(([l,u])=>{const c=t.get(n+l,i+u);c!==void 0&&(a+=c,s++)}),s&&r.set(n,i,a/s)}}return r}function QV(e){if(e.context.heightTargetRange<=0)return{...e,height:new oe};let t=YV(e);t=qV(e,t);for(let r=0;r<e.context.stratascosity;r++)t=XV(e,t);return{...e,height:t}}const mi=(e,t,r,n)=>BigInt(Qo(r,n))<<32n|BigInt(Qo(e,t));class ZV{constructor(){this.data=new Map}get(t,r,n,i){if(t<n||t===n&&r<=i){const a=this.data.get(mi(t,r,n,i));return a&&{ascent:a.forward,descent:a.backward}}const o=this.data.get(mi(n,i,t,r));return o&&{ascent:o.backward,descent:o.forward}}set(t,r,n,i,o,a){if(!(t===n&&r===i))if(t<n||t===n&&r<i){const s=this.data.get(mi(t,r,n,i));s?(s.forward=Math.min(s.forward,o),s.backward=Math.min(s.backward,a)):this.data.set(mi(t,r,n,i),{x1:t,y1:r,x2:n,y2:i,forward:o,backward:a})}else{const s=this.data.get(mi(n,i,t,r));s?(s.forward=Math.min(s.forward,a),s.backward=Math.min(s.backward,o)):this.data.set(mi(n,i,t,r),{x1:n,y1:i,x2:t,y2:r,forward:a,backward:o})}}edges(){const t=new oe;function r(n,i){let o=t.get(n,i);return o||(o=[],t.set(n,i,o)),o}return this.data.forEach(({x1:n,y1:i,x2:o,y2:a,forward:s,backward:l})=>{r(n,i).push({to:[o,a],ascent:s,descent:l}),r(o,a).push({to:[n,i],ascent:l,descent:s})}),t}}function JV(e){var i;const t=new oe,r=Math.max(e.context.caveMaxSlope,e.context.hallMaxSlope),n=e.plans.map(o=>Math.min(o.architect.maxSlope??1/0,o.kind==="cave"?e.context.caveMaxSlope:e.context.hallMaxSlope));for(let o=e.left;o<e.right;o++)for(let a=e.top;a<e.bottom;a++){let s=1/0;const l=e.tiles.get(o,a);l?s=Math.min(s,l.maxSlope??1/0):o<e.left||o>=e.right||a<e.top||a>=e.bottom?s=Math.min(s,e.context.borderMaxSlope):s=Math.min(s,e.context.voidMaxSlope),s=Math.min(s,((i=e.pearlInnerDex.get(o,a))==null?void 0:i.reduce((u,c,f)=>Math.min(u??1/0,n[f]),void 0))??r),t.set(o,a,s)}return t}function eK(e){const t=new ZV;return JV(e).forEach((r,n,i)=>{const o=n+1,a=i+1;t.set(n,i,o,i,r,r),t.set(n,i,n,a,r,r),t.set(o,i,o,a,r,r),t.set(n,a,o,a,r,r)}),t}function tK(e){const t=new oe;return e.tiles.forEach((r,n,i)=>{let o;if(r===S.WATER||r===S.LAVA)o=2;else if(e.erosion.get(n,i))o=0;else return;yG.forEach(([a,s])=>{t.set(n+a,i+s,Math.max(o,t.get(n+a,i+s)??0))})}),t}function r_(e,t,r){const n=e.height.get(t,r),i=t===e.left||t===e.right||r===e.top||r===e.bottom;return{target:n,neighbors:[],corners:[[t,r]],collapseQueued:i,min:i?0:_l,max:i?0:eh,range:i?0:eh-_l}}function rK(e,t){const r=new oe,n=t.map((i,o,a)=>({x:o,y:a,node:null}));for(;n.length>0;){let{x:i,y:o,node:a}=n.shift();if(!r.get(i,o)){a||(a=r_(e,i,o)),r.set(i,o,a);const s=Ke.map(([l,u])=>({x:i+l,y:o+u,node:a})).filter(({x:l,y:u})=>t.get(l,u));n.unshift(...s)}}return r}function nK(e){const t=tK(e),r=rK(e,t);for(let i=e.left;i<=e.right;i++)for(let o=e.top;o<=e.bottom;o++){const a=r.get(i,o);a?a.corners.push([i,o]):r.set(i,o,r_(e,i,o))}const n=eK(e);return t.forEach((i,o,a)=>{const s=i+1;for(let l=-s;l<=s;l++)for(let u=-s;u<=s;u++)n.set(o,a,o+l,a+u,1/0,0)}),n.edges().forEach((i,o,a)=>{const s=r.get(o,a);if(s){const l=i.map(({to:u,ascent:c,descent:f})=>({node:r.get(...u),ascent:c,descent:f})).filter(({node:u})=>u&&u!==s);s.neighbors.push(...l)}}),r}var ee=function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(a){a(o)})}return new(r||(r=Promise))(function(o,a){function s(c){try{u(n.next(c))}catch(f){a(f)}}function l(c){try{u(n.throw(c))}catch(f){a(f)}}function u(c){c.done?o(c.value):i(c.value).then(s,l)}u((n=n.apply(e,t||[])).next())})},J=function(e,t){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=s(0),a.throw=s(1),a.return=s(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(u){return function(c){return l([u,c])}}function l(u){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,u[0]&&(r=0)),r;)try{if(n=1,i&&(o=u[0]&2?i.return:u[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,u[1])).done)return o;switch(i=0,o&&(u=[u[0]&2,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,i=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!o||u[1]>o[0]&&u[1]<o[3])){r.label=u[1];break}if(u[0]===6&&r.label<o[1]){r.label=o[1],o=u;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(u);break}o[2]&&r.ops.pop(),r.trys.pop();continue}u=t.call(e,r)}catch(c){u=[6,c],i=0}finally{n=o=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},ct=function(e,t){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var n=r.call(e),i,o=[],a;try{for(;(t===void 0||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o},Mt=function(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,o;n<i;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))},s0=function(e){var t=typeof Symbol=="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};(function(){function e(t){t===void 0&&(t=e.minComparator);var r=this;this.compare=t,this.heapArray=[],this._limit=0,this.offer=this.add,this.element=this.peek,this.poll=this.pop,this._invertedCompare=function(n,i){return r.compare(n,i).then(function(o){return-1*o})}}return e.getChildrenIndexOf=function(t){return[t*2+1,t*2+2]},e.getParentIndexOf=function(t){if(t<=0)return-1;var r=t%2?1:2;return Math.floor((t-r)/2)},e.getSiblingIndexOf=function(t){if(t<=0)return-1;var r=t%2?1:-1;return t+r},e.minComparator=function(t,r){return ee(this,void 0,void 0,function(){return J(this,function(n){return t>r?[2,1]:t<r?[2,-1]:[2,0]})})},e.maxComparator=function(t,r){return ee(this,void 0,void 0,function(){return J(this,function(n){return r>t?[2,1]:r<t?[2,-1]:[2,0]})})},e.minComparatorNumber=function(t,r){return ee(this,void 0,void 0,function(){return J(this,function(n){return[2,t-r]})})},e.maxComparatorNumber=function(t,r){return ee(this,void 0,void 0,function(){return J(this,function(n){return[2,r-t]})})},e.defaultIsEqual=function(t,r){return ee(this,void 0,void 0,function(){return J(this,function(n){return[2,t===r]})})},e.print=function(t){function r(c){var f=e.getParentIndexOf(c);return Math.floor(Math.log2(f+1))}function n(c,f){for(var h="";f>0;--f)h+=c;return h}for(var i=0,o=[],a=r(t.length-1)+2,s=0;i<t.length;){var l=r(i)+1;i===0&&(l=0);var u=String(t.get(i));u.length>s&&(s=u.length),o[l]=o[l]||[],o[l].push(u),i+=1}return o.map(function(c,f){var h=Math.pow(2,a-f)-1;return n(" ",Math.floor(h/2)*s)+c.map(function(d){var y=(s-d.length)/2;return n(" ",Math.ceil(y))+d+n(" ",Math.floor(y))}).join(n(" ",h*s))}).join(`
`)},e.heapify=function(t,r){return ee(this,void 0,void 0,function(){var n;return J(this,function(i){switch(i.label){case 0:return n=new e(r),n.heapArray=t,[4,n.init()];case 1:return i.sent(),[2,n]}})})},e.heappop=function(t,r){var n=new e(r);return n.heapArray=t,n.pop()},e.heappush=function(t,r,n){return ee(this,void 0,void 0,function(){var i;return J(this,function(o){switch(o.label){case 0:return i=new e(n),i.heapArray=t,[4,i.push(r)];case 1:return o.sent(),[2]}})})},e.heappushpop=function(t,r,n){var i=new e(n);return i.heapArray=t,i.pushpop(r)},e.heapreplace=function(t,r,n){var i=new e(n);return i.heapArray=t,i.replace(r)},e.heaptop=function(t,r,n){r===void 0&&(r=1);var i=new e(n);return i.heapArray=t,i.top(r)},e.heapbottom=function(t,r,n){r===void 0&&(r=1);var i=new e(n);return i.heapArray=t,i.bottom(r)},e.nlargest=function(t,r,n){return ee(this,void 0,void 0,function(){var i;return J(this,function(o){switch(o.label){case 0:return i=new e(n),i.heapArray=Mt([],ct(r),!1),[4,i.init()];case 1:return o.sent(),[2,i.top(t)]}})})},e.nsmallest=function(t,r,n){return ee(this,void 0,void 0,function(){var i;return J(this,function(o){switch(o.label){case 0:return i=new e(n),i.heapArray=Mt([],ct(r),!1),[4,i.init()];case 1:return o.sent(),[2,i.bottom(t)]}})})},e.prototype.add=function(t){return ee(this,void 0,void 0,function(){return J(this,function(r){switch(r.label){case 0:return[4,this._sortNodeUp(this.heapArray.push(t)-1)];case 1:return r.sent(),this._applyLimit(),[2,!0]}})})},e.prototype.addAll=function(t){return ee(this,void 0,void 0,function(){var r,n,i;return J(this,function(o){switch(o.label){case 0:r=this.length,(i=this.heapArray).push.apply(i,Mt([],ct(t),!1)),n=this.length,o.label=1;case 1:return r<n?[4,this._sortNodeUp(r)]:[3,4];case 2:o.sent(),o.label=3;case 3:return++r,[3,1];case 4:return this._applyLimit(),[2,!0]}})})},e.prototype.bottom=function(){return ee(this,arguments,void 0,function(t){return t===void 0&&(t=1),J(this,function(r){return this.heapArray.length===0||t<=0?[2,[]]:this.heapArray.length===1?[2,[this.heapArray[0]]]:t>=this.heapArray.length?[2,Mt([],ct(this.heapArray),!1)]:[2,this._bottomN_push(~~t)]})})},e.prototype.check=function(){return ee(this,void 0,void 0,function(){var t,r,n,i,o,a,s,l,u;return J(this,function(c){switch(c.label){case 0:t=0,c.label=1;case 1:if(!(t<this.heapArray.length))return[3,10];r=this.heapArray[t],n=this.getChildrenOf(t),c.label=2;case 2:c.trys.push([2,7,8,9]),i=(l=void 0,s0(n)),o=i.next(),c.label=3;case 3:return o.done?[3,6]:(a=o.value,[4,this.compare(r,a)]);case 4:if(c.sent()>0)return[2,r];c.label=5;case 5:return o=i.next(),[3,3];case 6:return[3,9];case 7:return s=c.sent(),l={error:s},[3,9];case 8:try{o&&!o.done&&(u=i.return)&&u.call(i)}finally{if(l)throw l.error}return[7];case 9:return++t,[3,1];case 10:return[2]}})})},e.prototype.clear=function(){this.heapArray=[]},e.prototype.clone=function(){var t=new e(this.comparator());return t.heapArray=this.toArray(),t._limit=this._limit,t},e.prototype.comparator=function(){return this.compare},e.prototype.contains=function(t){return ee(this,arguments,void 0,function(r,n){var i,o,a,s,l,u;return n===void 0&&(n=e.defaultIsEqual),J(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,7]),i=s0(this.heapArray),o=i.next(),c.label=1;case 1:return o.done?[3,4]:(a=o.value,[4,n(a,r)]);case 2:if(c.sent())return[2,!0];c.label=3;case 3:return o=i.next(),[3,1];case 4:return[3,7];case 5:return s=c.sent(),l={error:s},[3,7];case 6:try{o&&!o.done&&(u=i.return)&&u.call(i)}finally{if(l)throw l.error}return[7];case 7:return[2,!1]}})})},e.prototype.init=function(t){return ee(this,void 0,void 0,function(){var r;return J(this,function(n){switch(n.label){case 0:t&&(this.heapArray=Mt([],ct(t),!1)),r=Math.floor(this.heapArray.length),n.label=1;case 1:return r>=0?[4,this._sortNodeDown(r)]:[3,4];case 2:n.sent(),n.label=3;case 3:return--r,[3,1];case 4:return this._applyLimit(),[2]}})})},e.prototype.isEmpty=function(){return this.length===0},e.prototype.leafs=function(){if(this.heapArray.length===0)return[];var t=e.getParentIndexOf(this.heapArray.length-1);return this.heapArray.slice(t+1)},Object.defineProperty(e.prototype,"length",{get:function(){return this.heapArray.length},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"limit",{get:function(){return this._limit},set:function(t){this._limit=~~t,this._applyLimit()},enumerable:!1,configurable:!0}),e.prototype.peek=function(){return this.heapArray[0]},e.prototype.pop=function(){return ee(this,void 0,void 0,function(){var t;return J(this,function(r){return t=this.heapArray.pop(),this.length>0&&t!==void 0?[2,this.replace(t)]:[2,t]})})},e.prototype.push=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return ee(this,void 0,void 0,function(){return J(this,function(n){return t.length<1?[2,!1]:t.length===1?[2,this.add(t[0])]:[2,this.addAll(t)]})})},e.prototype.pushpop=function(t){return ee(this,void 0,void 0,function(){var r;return J(this,function(n){switch(n.label){case 0:return[4,this.compare(this.heapArray[0],t)];case 1:return n.sent()<0?(r=ct([this.heapArray[0],t],2),t=r[0],this.heapArray[0]=r[1],[4,this._sortNodeDown(0)]):[3,3];case 2:n.sent(),n.label=3;case 3:return[2,t]}})})},e.prototype.remove=function(t){return ee(this,arguments,void 0,function(r,n){var i,o,a,s=this;return n===void 0&&(n=e.defaultIsEqual),J(this,function(l){switch(l.label){case 0:return this.heapArray.length?r!==void 0?[3,2]:[4,this.pop()]:[2,!1];case 1:return l.sent(),[2,!0];case 2:i=[0],l.label=3;case 3:return i.length?(o=i.shift(),[4,n(this.heapArray[o],r)]):[3,13];case 4:return l.sent()?o!==0?[3,6]:[4,this.pop()]:[3,11];case 5:return l.sent(),[3,10];case 6:return o!==this.heapArray.length-1?[3,7]:(this.heapArray.pop(),[3,10]);case 7:return this.heapArray.splice(o,1,this.heapArray.pop()),[4,this._sortNodeUp(o)];case 8:return l.sent(),[4,this._sortNodeDown(o)];case 9:l.sent(),l.label=10;case 10:return[2,!0];case 11:a=e.getChildrenIndexOf(o).filter(function(u){return u<s.heapArray.length}),i.push.apply(i,Mt([],ct(a),!1)),l.label=12;case 12:return[3,3];case 13:return[2,!1]}})})},e.prototype.replace=function(t){return ee(this,void 0,void 0,function(){var r;return J(this,function(n){switch(n.label){case 0:return r=this.heapArray[0],this.heapArray[0]=t,[4,this._sortNodeDown(0)];case 1:return n.sent(),[2,r]}})})},e.prototype.size=function(){return this.length},e.prototype.top=function(){return ee(this,arguments,void 0,function(t){return t===void 0&&(t=1),J(this,function(r){return this.heapArray.length===0||t<=0?[2,[]]:this.heapArray.length===1||t===1?[2,[this.heapArray[0]]]:t>=this.heapArray.length?[2,Mt([],ct(this.heapArray),!1)]:[2,this._topN_push(~~t)]})})},e.prototype.toArray=function(){return Mt([],ct(this.heapArray),!1)},e.prototype.toString=function(){return this.heapArray.toString()},e.prototype.get=function(t){return this.heapArray[t]},e.prototype.getChildrenOf=function(t){var r=this;return e.getChildrenIndexOf(t).map(function(n){return r.heapArray[n]}).filter(function(n){return n!==void 0})},e.prototype.getParentOf=function(t){var r=e.getParentIndexOf(t);return this.heapArray[r]},e.prototype[Symbol.iterator]=function(){return J(this,function(t){switch(t.label){case 0:return this.length?[4,this.pop()]:[3,2];case 1:return t.sent(),[3,0];case 2:return[2]}})},e.prototype.iterator=function(){return this},e.prototype._applyLimit=function(){if(this._limit&&this._limit<this.heapArray.length)for(var t=this.heapArray.length-this._limit;t;)this.heapArray.pop(),--t},e.prototype._bottomN_push=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o,s,a,s;return J(this,function(l){switch(l.label){case 0:return r=new e(this.compare),r.limit=t,r.heapArray=this.heapArray.slice(-t),[4,r.init()];case 1:for(l.sent(),n=this.heapArray.length-1-t,i=e.getParentIndexOf(n),o=[],s=n;s>i;--s)o.push(s);a=this.heapArray,l.label=2;case 2:return o.length?(s=o.shift(),[4,this.compare(a[s],r.peek())]):[3,6];case 3:return l.sent()>0?[4,r.replace(a[s])]:[3,5];case 4:l.sent(),s%2&&o.push(e.getParentIndexOf(s)),l.label=5;case 5:return[3,2];case 6:return[2,r.toArray()]}})})},e.prototype._moveNode=function(t,r){var n;n=ct([this.heapArray[r],this.heapArray[t]],2),this.heapArray[t]=n[0],this.heapArray[r]=n[1]},e.prototype._sortNodeDown=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o,a,s;return J(this,function(l){switch(l.label){case 0:r=this.heapArray.length,l.label=1;case 1:return n=2*t+1,i=n+1,o=t,a=n<r,a?[4,this.compare(this.heapArray[n],this.heapArray[o])]:[3,3];case 2:a=l.sent()<0,l.label=3;case 3:return a&&(o=n),s=i<r,s?[4,this.compare(this.heapArray[i],this.heapArray[o])]:[3,5];case 4:s=l.sent()<0,l.label=5;case 5:if(s&&(o=i),o===t)return[3,7];this._moveNode(t,o),t=o,l.label=6;case 6:return[3,1];case 7:return[2]}})})},e.prototype._sortNodeUp=function(t){return ee(this,void 0,void 0,function(){var r;return J(this,function(n){switch(n.label){case 0:return t>0?(r=e.getParentIndexOf(t),[4,this.compare(this.heapArray[t],this.heapArray[r])]):[3,2];case 1:if(n.sent()<0)this._moveNode(t,r),t=r;else return[3,2];return[3,0];case 2:return[2]}})})},e.prototype._topN_push=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o;return J(this,function(a){switch(a.label){case 0:r=new e(this._invertedCompare),r.limit=t,n=[0],i=this.heapArray,a.label=1;case 1:return n.length?(o=n.shift(),o<i.length?r.length<t?[4,r.push(i[o])]:[3,3]:[3,6]):[3,7];case 2:return a.sent(),n.push.apply(n,Mt([],ct(e.getChildrenIndexOf(o)),!1)),[3,6];case 3:return[4,this.compare(i[o],r.peek())];case 4:return a.sent()<0?[4,r.replace(i[o])]:[3,6];case 5:a.sent(),n.push.apply(n,Mt([],ct(e.getChildrenIndexOf(o)),!1)),a.label=6;case 6:return[3,1];case 7:return[2,r.toArray()]}})})},e.prototype._topN_fill=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o,a,a;return J(this,function(s){switch(s.label){case 0:return r=this.heapArray,n=new e(this._invertedCompare),n.limit=t,n.heapArray=r.slice(0,t),[4,n.init()];case 1:for(s.sent(),i=e.getParentIndexOf(t-1)+1,o=[],a=i;a<t;++a)o.push.apply(o,Mt([],ct(e.getChildrenIndexOf(a).filter(function(l){return l<r.length})),!1));(t-1)%2&&o.push(t),s.label=2;case 2:return o.length?(a=o.shift(),a<r.length?[4,this.compare(r[a],n.peek())]:[3,5]):[3,6];case 3:return s.sent()<0?[4,n.replace(r[a])]:[3,5];case 4:s.sent(),o.push.apply(o,Mt([],ct(e.getChildrenIndexOf(a)),!1)),s.label=5;case 5:return[3,2];case 6:return[2,n.toArray()]}})})},e.prototype._topN_heap=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o,a;return J(this,function(s){switch(s.label){case 0:r=this.clone(),n=[],i=0,s.label=1;case 1:return i<t?(a=(o=n).push,[4,r.pop()]):[3,4];case 2:a.apply(o,[s.sent()]),s.label=3;case 3:return++i,[3,1];case 4:return[2,n]}})})},e.prototype._topIdxOf=function(t){return ee(this,void 0,void 0,function(){var r,n,i,o;return J(this,function(a){switch(a.label){case 0:if(!t.length)return[2,-1];r=0,n=t[r],i=1,a.label=1;case 1:return i<t.length?[4,this.compare(t[i],n)]:[3,4];case 2:o=a.sent(),o<0&&(r=i,n=t[i]),a.label=3;case 3:return++i,[3,1];case 4:return[2,r]}})})},e.prototype._topOf=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return ee(this,void 0,void 0,function(){var n;return J(this,function(i){switch(i.label){case 0:return n=new e(this.compare),[4,n.init(t)];case 1:return i.sent(),[2,n.peek()]}})})},e})();var iK=function(e,t){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return a.next=s(0),a.throw=s(1),a.return=s(2),typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(u){return function(c){return l([u,c])}}function l(u){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,u[0]&&(r=0)),r;)try{if(n=1,i&&(o=u[0]&2?i.return:u[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,u[1])).done)return o;switch(i=0,o&&(u=[u[0]&2,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return r.label++,{value:u[1],done:!1};case 5:r.label++,i=u[1],u=[0];continue;case 7:u=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(u[0]===6||u[0]===2)){r=0;continue}if(u[0]===3&&(!o||u[1]>o[0]&&u[1]<o[3])){r.label=u[1];break}if(u[0]===6&&r.label<o[1]){r.label=o[1],o=u;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(u);break}o[2]&&r.ops.pop(),r.trys.pop();continue}u=t.call(e,r)}catch(c){u=[6,c],i=0}finally{n=o=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}},Be=function(e,t){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var n=r.call(e),i,o=[],a;try{for(;(t===void 0||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o},rt=function(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,o;n<i;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))},oK=function(){function e(t){t===void 0&&(t=e.minComparator);var r=this;this.compare=t,this.heapArray=[],this._limit=0,this.offer=this.add,this.element=this.peek,this.poll=this.pop,this.removeAll=this.clear,this._invertedCompare=function(n,i){return-1*r.compare(n,i)}}return e.getChildrenIndexOf=function(t){return[t*2+1,t*2+2]},e.getParentIndexOf=function(t){if(t<=0)return-1;var r=t%2?1:2;return Math.floor((t-r)/2)},e.getSiblingIndexOf=function(t){if(t<=0)return-1;var r=t%2?1:-1;return t+r},e.minComparator=function(t,r){return t>r?1:t<r?-1:0},e.maxComparator=function(t,r){return r>t?1:r<t?-1:0},e.minComparatorNumber=function(t,r){return t-r},e.maxComparatorNumber=function(t,r){return r-t},e.defaultIsEqual=function(t,r){return t===r},e.print=function(t){function r(c){var f=e.getParentIndexOf(c);return Math.floor(Math.log2(f+1))}function n(c,f){for(var h="";f>0;--f)h+=c;return h}for(var i=0,o=[],a=r(t.length-1)+2,s=0;i<t.length;){var l=r(i)+1;i===0&&(l=0);var u=String(t.get(i));u.length>s&&(s=u.length),o[l]=o[l]||[],o[l].push(u),i+=1}return o.map(function(c,f){var h=Math.pow(2,a-f)-1;return n(" ",Math.floor(h/2)*s)+c.map(function(d){var y=(s-d.length)/2;return n(" ",Math.ceil(y))+d+n(" ",Math.floor(y))}).join(n(" ",h*s))}).join(`
`)},e.heapify=function(t,r){var n=new e(r);return n.heapArray=t,n.init(),n},e.heappop=function(t,r){var n=new e(r);return n.heapArray=t,n.pop()},e.heappush=function(t,r,n){var i=new e(n);i.heapArray=t,i.push(r)},e.heappushpop=function(t,r,n){var i=new e(n);return i.heapArray=t,i.pushpop(r)},e.heapreplace=function(t,r,n){var i=new e(n);return i.heapArray=t,i.replace(r)},e.heaptop=function(t,r,n){r===void 0&&(r=1);var i=new e(n);return i.heapArray=t,i.top(r)},e.heapbottom=function(t,r,n){r===void 0&&(r=1);var i=new e(n);return i.heapArray=t,i.bottom(r)},e.nlargest=function(t,r,n){var i=new e(n);return i.heapArray=rt([],Be(r),!1),i.init(),i.top(t)},e.nsmallest=function(t,r,n){var i=new e(n);return i.heapArray=rt([],Be(r),!1),i.init(),i.bottom(t)},e.prototype.add=function(t){return this._sortNodeUp(this.heapArray.push(t)-1),this._applyLimit(),!0},e.prototype.addAll=function(t){var r,n=this.length;(r=this.heapArray).push.apply(r,rt([],Be(t),!1));for(var i=this.length;n<i;++n)this._sortNodeUp(n);return this._applyLimit(),!0},e.prototype.bottom=function(t){return t===void 0&&(t=1),this.heapArray.length===0||t<=0?[]:this.heapArray.length===1?[this.heapArray[0]]:t>=this.heapArray.length?rt([],Be(this.heapArray),!1):this._bottomN_push(~~t)},e.prototype.check=function(){var t=this;return this.heapArray.find(function(r,n){return!!t.getChildrenOf(n).find(function(i){return t.compare(r,i)>0})})},e.prototype.clear=function(){this.heapArray=[]},e.prototype.clone=function(){var t=new e(this.comparator());return t.heapArray=this.toArray(),t._limit=this._limit,t},e.prototype.comparator=function(){return this.compare},e.prototype.contains=function(t,r){return r===void 0&&(r=e.defaultIsEqual),this.indexOf(t,r)!==-1},e.prototype.init=function(t){t&&(this.heapArray=rt([],Be(t),!1));for(var r=Math.floor(this.heapArray.length);r>=0;--r)this._sortNodeDown(r);this._applyLimit()},e.prototype.isEmpty=function(){return this.length===0},e.prototype.indexOf=function(t,r){if(r===void 0&&(r=e.defaultIsEqual),this.heapArray.length===0)return-1;for(var n=[],i=0;i<this.heapArray.length;){var o=this.heapArray[i];if(r(o,t))return i;this.compare(o,t)<=0&&n.push.apply(n,rt([],Be(e.getChildrenIndexOf(i)),!1)),i=n.shift()||this.heapArray.length}return-1},e.prototype.indexOfEvery=function(t,r){if(r===void 0&&(r=e.defaultIsEqual),this.heapArray.length===0)return[];for(var n=[],i=[],o=0;o<this.heapArray.length;){var a=this.heapArray[o];r(a,t)?(i.push(o),n.push.apply(n,rt([],Be(e.getChildrenIndexOf(o)),!1))):this.compare(a,t)<=0&&n.push.apply(n,rt([],Be(e.getChildrenIndexOf(o)),!1)),o=n.shift()||this.heapArray.length}return i},e.prototype.leafs=function(){if(this.heapArray.length===0)return[];var t=e.getParentIndexOf(this.heapArray.length-1);return this.heapArray.slice(t+1)},Object.defineProperty(e.prototype,"length",{get:function(){return this.heapArray.length},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"limit",{get:function(){return this._limit},set:function(t){t<0||isNaN(t)?this._limit=0:this._limit=~~t,this._applyLimit()},enumerable:!1,configurable:!0}),e.prototype.setLimit=function(t){return this.limit=t,t<0||isNaN(t)?NaN:this._limit},e.prototype.peek=function(){return this.heapArray[0]},e.prototype.pop=function(){var t=this.heapArray.pop();return this.length>0&&t!==void 0?this.replace(t):t},e.prototype.push=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return t.length<1?!1:t.length===1?this.add(t[0]):this.addAll(t)},e.prototype.pushpop=function(t){var r;return this.compare(this.heapArray[0],t)<0&&(r=Be([this.heapArray[0],t],2),t=r[0],this.heapArray[0]=r[1],this._sortNodeDown(0)),t},e.prototype.remove=function(t,r){var n=this;if(r===void 0&&(r=e.defaultIsEqual),!this.heapArray.length)return!1;if(t===void 0)return this.pop(),!0;for(var i=[0];i.length;){var o=i.shift();if(r(this.heapArray[o],t))return o===0?this.pop():o===this.heapArray.length-1?this.heapArray.pop():(this.heapArray.splice(o,1,this.heapArray.pop()),this._sortNodeUp(o),this._sortNodeDown(o)),!0;if(this.compare(this.heapArray[o],t)<=0){var a=e.getChildrenIndexOf(o).filter(function(s){return s<n.heapArray.length});i.push.apply(i,rt([],Be(a),!1))}}return!1},e.prototype.replace=function(t){var r=this.heapArray[0];return this.heapArray[0]=t,this._sortNodeDown(0),r},e.prototype.size=function(){return this.length},e.prototype.top=function(t){return t===void 0&&(t=1),this.heapArray.length===0||t<=0?[]:this.heapArray.length===1||t===1?[this.heapArray[0]]:t>=this.heapArray.length?rt([],Be(this.heapArray),!1):this._topN_push(~~t)},e.prototype.toArray=function(){return rt([],Be(this.heapArray),!1)},e.prototype.toString=function(){return this.heapArray.toString()},e.prototype.get=function(t){return this.heapArray[t]},e.prototype.getChildrenOf=function(t){var r=this;return e.getChildrenIndexOf(t).map(function(n){return r.heapArray[n]}).filter(function(n){return n!==void 0})},e.prototype.getParentOf=function(t){var r=e.getParentIndexOf(t);return this.heapArray[r]},e.prototype[Symbol.iterator]=function(){return iK(this,function(t){switch(t.label){case 0:return this.length?[4,this.pop()]:[3,2];case 1:return t.sent(),[3,0];case 2:return[2]}})},e.prototype.iterator=function(){return this.toArray()},e.prototype._applyLimit=function(){if(this._limit>0&&this._limit<this.heapArray.length)for(var t=this.heapArray.length-this._limit;t;)this.heapArray.pop(),--t},e.prototype._bottomN_push=function(t){var r=new e(this.compare);r.limit=t,r.heapArray=this.heapArray.slice(-t),r.init();for(var n=this.heapArray.length-1-t,i=e.getParentIndexOf(n),o=[],a=n;a>i;--a)o.push(a);for(var s=this.heapArray;o.length;){var a=o.shift();this.compare(s[a],r.peek())>0&&(r.replace(s[a]),a%2&&o.push(e.getParentIndexOf(a)))}return r.toArray()},e.prototype._moveNode=function(t,r){var n;n=Be([this.heapArray[r],this.heapArray[t]],2),this.heapArray[t]=n[0],this.heapArray[r]=n[1]},e.prototype._sortNodeDown=function(t){for(var r=this.heapArray.length;;){var n=2*t+1,i=n+1,o=t;if(n<r&&this.compare(this.heapArray[n],this.heapArray[o])<0&&(o=n),i<r&&this.compare(this.heapArray[i],this.heapArray[o])<0&&(o=i),o===t)break;this._moveNode(t,o),t=o}},e.prototype._sortNodeUp=function(t){for(;t>0;){var r=e.getParentIndexOf(t);if(this.compare(this.heapArray[t],this.heapArray[r])<0)this._moveNode(t,r),t=r;else break}},e.prototype._topN_push=function(t){var r=new e(this._invertedCompare);r.limit=t;for(var n=[0],i=this.heapArray;n.length;){var o=n.shift();o<i.length&&(r.length<t?(r.push(i[o]),n.push.apply(n,rt([],Be(e.getChildrenIndexOf(o)),!1))):this.compare(i[o],r.peek())<0&&(r.replace(i[o]),n.push.apply(n,rt([],Be(e.getChildrenIndexOf(o)),!1))))}return r.toArray()},e.prototype._topN_fill=function(t){var r=this.heapArray,n=new e(this._invertedCompare);n.limit=t,n.heapArray=r.slice(0,t),n.init();for(var i=e.getParentIndexOf(t-1)+1,o=[],a=i;a<t;++a)o.push.apply(o,rt([],Be(e.getChildrenIndexOf(a).filter(function(s){return s<r.length})),!1));for((t-1)%2&&o.push(t);o.length;){var a=o.shift();a<r.length&&this.compare(r[a],n.peek())<0&&(n.replace(r[a]),o.push.apply(o,rt([],Be(e.getChildrenIndexOf(a)),!1)))}return n.toArray()},e.prototype._topN_heap=function(t){for(var r=this.clone(),n=[],i=0;i<t;++i)n.push(r.pop());return n},e.prototype._topIdxOf=function(t){if(!t.length)return-1;for(var r=0,n=t[r],i=1;i<t.length;++i){var o=this.compare(t[i],n);o<0&&(r=i,n=t[i])}return r},e.prototype._topOf=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=new e(this.compare);return n.init(t),n.peek()},e}();function aK(e){const t=new oe;for(let r=e.left;r<=e.right;r++)for(let n=e.top;n<=e.bottom;n++)t.set(r,n,0);return t}function sK(e,t,r){if(e.min===e.max)return e.min;const n=e.target===void 0?.5:e.target<=e.min?0:e.target>=e.max?1:(e.target-e.min)/(e.max-e.min);return t.betaInt({a:1+r*n,b:1+r*(1-n),min:e.min,max:e.max+1})}function lK(e){if(e.context.heightTargetRange<=0)return{...e,height:aK(e)};const t=nK(e),r=new oe,n=e.dice.height,i=new oK((s,l)=>s.range-l.range);t.forEach(s=>{s.collapseQueued&&i.push(s)});const o=e.context.strataplanity;function a(s){const l=sK(s,n,o);for(let u=0;u<s.corners.length;u++)r.set(...s.corners[u],l);s.min=l,s.max=l,s.range=0}for(;;){const s=i.pop();if(!s)break;a(s);const l=[s];for(let u=0;u<l.length;u++){const c=l[u];for(let f=0;f<c.neighbors.length;f++){const h=c.neighbors[f];if(!h.node.range)continue;h.node.min=Math.max(h.node.min,c.min-h.descent),h.node.max=Math.min(h.node.max,c.max+h.ascent);const d=h.node.max-h.node.min;d<h.node.range&&(h.node.range=d,l.push(h.node),h.node.collapseQueued||(h.node.collapseQueued=!0,i.push(h.node)))}delete l[u]}}return{...e,height:r}}function uK(e){const t=new oe;return e.plans.forEach(r=>{if(r.hasErosion)return r.architect.preErode({cavern:e,plan:r,erosion:t})}),{...e,erosion:t}}const cK=vo(GV,"Fencing final level bounds").then(DV,"Discovering caverns").then(uK,"Spreading magma").then(QV,"Rough pass over heightmap").then(lK,"Final pass over heightmap").then(zV,"Populating cavern with entities");function fK(e){const t=e.plans.reduce((r,n)=>{const i=n.architect.objectives;return i&&!r.some(o=>Object.is(i,o))&&r.push(i),r},[]).map(r=>r({cavern:e})).reduce((r,n)=>{const i={...r.tags,...n==null?void 0:n.tags};return n!=null&&n.tag&&(i[n.tag]=!0),{crystals:Math.max(r.crystals,(n==null?void 0:n.crystals)??0),ore:Math.max(r.ore,(n==null?void 0:n.ore)??0),studs:Math.max(r.studs,(n==null?void 0:n.studs)??0),tags:i,variables:[...r.variables,...(n==null?void 0:n.variables)??[]],sufficient:r.sufficient||!!(n!=null&&n.sufficient)}},{crystals:0,ore:0,studs:0,tags:{},variables:[],sufficient:!1});return t.sufficient||(t.crystals=Math.max(t.crystals,Math.floor(Dd(e)*e.context.crystalGoalRatio/5)*5)),{...e,objectives:t}}const hK=1e3,dK=3e3,l0=8e3,As=250,Qe={WALK:1,WALK_ENCUMBERED:1.6,DRILL_DIRT:4,DRILL_LOOSE_ROCK:8,DRILL_SEAM:25,CLEAR_RUBBLE:10,DYNAMITE:6,KILL_MONSTER:20,BUILD_POWER_PATH:15,BUILD_TELEPORT_PAD:125,BUILD_POWER_STATION:210,BUILD_SUPPORT_STATION:215};function pK(e){var r;const t=[...e.buildings.filter(n=>n.template===de),...e.buildings,...e.miners,...e.vehicles];for(const n of t){const i=[Math.floor(n.x),Math.floor(n.y)];if((r=e.discoveryZones.get(...i))!=null&&r.openOnSpawn)return i}throw new Error("No discovered entities. Is this level even playable?")}function mK(e){if(e.oxygen!==void 0)return{...e,oxygen:e.oxygen,aerationLog:null};if(!e.context.hasAirLimit)return{...e,oxygen:null,aerationLog:null};const t=_=>{var $;return($=e.discoveryZones.get(Math.floor(_.x),Math.floor(_.y)))==null?void 0:$.openOnSpawn},r=e.buildings.filter(t),n=e.vehicles.filter(t);let i=!1,o=!1,a=!1,s=0,l=0,u=0;const c=new oe;r.forEach(_=>{i||(i=_.template===_t),o||(o=_.template===_e),a||(a=_.template===Ce),u+=_.template.crystals}),n.forEach(_=>{u+=_.template.crystals}),s+=2*Qe.BUILD_POWER_PATH,l-=4,u-=_e.crystals+Ce.crystals+1,i||(s+=Qe.BUILD_TELEPORT_PAD,l-=5+_t.ore),o||(s+=Qe.BUILD_POWER_STATION,l-=5+_e.ore),a||(s+=Qe.BUILD_SUPPORT_STATION,l-=5+Ce.ore),u=Math.min(u,-1);const f=pK(e);function h(_){switch(_.hardness){case Re.DIRT:return Qe.DRILL_DIRT;case Re.LOOSE:return Qe.DRILL_LOOSE_ROCK;case Re.SEAM:return Qe.DRILL_SEAM;default:return}}{let _=function(E,O,R){if($.get(E,O)===void 0){$.set(E,O,R);const b=e.tiles.get(E,O);b&&!b.isFluid&&(b.isWall?h(b)?m.push([E,O]):b.hardness===Re.HARD&&g.push([E,O]):v.push([E,O]))}};const $=new oe;$.set(...f,0);const v=[f],m=[],g=[];for(;l<0||u<0;)if(v.length){const[E,O]=v.shift();c.set(E,O,!0);const R=$.get(E,O);Ke.forEach(([b,A])=>_(E+b,O+A,R+1))}else if(m.length||g.length){const E=!m.length,[O,R]=(E?g:m).shift();c.set(O,R,!0);const b=$.get(O,R),A=e.tiles.get(O,R);if(E?s+=b*(Qe.WALK+Qe.WALK_ENCUMBERED)+Qe.DYNAMITE:s+=h(A),l<0){const x=A.oreYield+(e.ore.get(O,R)??0);l+=x,s+=x*b*(Qe.WALK+Qe.WALK_ENCUMBERED)+Qe.CLEAR_RUBBLE}if(u<0){const x=A.crystalYield+(e.crystals.get(O,R)??0);u+=x,s+=x*b*(Qe.WALK+Qe.WALK_ENCUMBERED)}v.push([O,R])}else return console.warn("Unable to playtest this level for air consumption."),{...e,oxygen:[l0,l0],aerationLog:c}}const d=e.plans.find(_=>!_.hops.length);e.context.hasMonsters&&(s+=Qe.KILL_MONSTER*d.monsterSpawnRate/60*(s/5)),s*=e.context.airSafetyFactor,s=Math.max(hK,Math.ceil(s/As)*As);const y=Math.max(s,dK,Math.ceil(e.context.targetSize*80/As)*As);return{...e,oxygen:[s,y],aerationLog:c}}function vK(e){const t={...e};delete t.seed;const r=Object.keys(t).sort().map(o=>`${o}:${JSON.stringify(t[o])}`).join(",");let n=0;for(let o=0;o<r.length;o++)n=(n<<5)-n+r.charCodeAt(o),n|=0;return new p$((n&8589934591)>>>1).uniformChoice(OG)}function gK(e){const t=new CG(e),{name:r,premise:n,orders:i,success:o,failure:a}=t.briefings(e.dice),s=Object.keys(e.initialContext).length>1,l=s?vK(e.initialContext):null,u=(()=>{const h=e.context.seed.toString(16).padStart(8,"0");return Fe(["gh",h.substring(0,3),h.substring(3,6),[h.substring(6),{rock:"k",ice:"e",lava:"a"}[e.context.biome],s?"x":""].join(""),r.replace(/[^A-Z0-9]+/g,"").toLowerCase(),l==null?void 0:l.replace(/[^A-Z0-9]+/g,"").toLowerCase()]).join("-")})(),c=s?`${r} (${l})`:r,f={intro:`${n}

${i}`,success:o,failure:a};return{...e,fileName:u,lore:t,levelName:c,briefing:f}}const yK={flood:(e,t,r)=>`place:${z(e,[t,r])},${S.WATER.id};`,waste:(e,t,r)=>`place:${z(e,[t,r])},${S.WASTE_RUBBLE_2.id};`};function wK({cavern:e,sb:t}){e.tiles.forEach((r,n,i)=>{r.trigger&&t.if(`drill:${z(e,[n,i])}`,yK[r.trigger](e,n,i))})}function $K(e){const t=Array.from(e.plans.reduce((i,o)=>{const a=o.architect.scriptGlobals;return a&&!i.some(s=>Object.is(a,s))&&i.push(a),i},[])),r=QU(e);ZU({cavern:e,sb:r}),v9({cavern:e,sb:r}),wK({cavern:e,sb:r}),t.forEach(i=>i({cavern:e,sb:r})),e.plans.forEach(i=>{var o,a;return(a=(o=i.architect).script)==null?void 0:a.call(o,{cavern:e,plan:i,sb:r})}),e.plans.forEach(i=>{var o,a;return(a=(o=i.architect).monsterSpawnScript)==null?void 0:a.call(o,{cavern:e,plan:i,sb:r})}),e.plans.forEach(i=>{var o,a;return(a=(o=i.architect).slugSpawnScript)==null?void 0:a.call(o,{cavern:e,plan:i,sb:r})});const n=r.build();return{...e,script:n}}/*!
 * word-wrap <https://github.com/jonschlinkert/word-wrap>
 *
 * Copyright (c) 2014-2023, Jon Schlinkert.
 * Released under the MIT License.
 */function _K(e){let t=e.length-1,r=e[t];for(;r===" "||r==="	";)r=e[--t];return e.substring(0,t+1)}function SK(e){return e.split(`
`).map(n=>_K(n)).join(`
`)}var EK=function(e,t){if(t=t||{},e==null)return e;var r=t.width||50,n=typeof t.indent=="string"?t.indent:"  ",i=t.newline||`
`+n,o=typeof t.escape=="function"?t.escape:AK,a=".{1,"+r+"}";t.cut!==!0&&(a+="([\\s​]+|$)|[^\\s​]+?([\\s​]+|$)");var s=new RegExp(a,"g"),l=e.match(s)||[],u=n+l.map(function(c){return c.slice(-1)===`
`&&(c=c.slice(0,c.length-1)),o(c)}).join(i);return t.trim===!0&&(u=SK(u)),u};function AK(e){return e}const OK=Al(EK);function RK({crystals:e,ore:t,studs:r,variables:n}){const i=n.map(({condition:o,description:a})=>`variable:${o}/${a}`);return(e||t||r)&&i.push(`resources: ${e.toFixed()},${t.toFixed()},${r.toFixed()}`),i.join(`
`)}const bK="0.10.14",El=(()=>{var e,t;return((t=(e=import.meta)==null?void 0:e.env)==null?void 0:t.VITE_APP_VERSION)??`${bK}-unknown`})();function xK(e,t){return e.split(/\r?\n/).map(r=>`${t}${r}`).join(`
`)}function CK(e){const t=El,r={groundhogVersion:t,initialContext:e.initialContext},n=OK(`Provenance: ${btoa(JSON.stringify(r))}`,{width:116,indent:"",cut:!0});return`Made with groundHog v${t}
https://github.com/charredUtensil/groundhog

${n}`}function n_(e,[t,r],n){return e.map(([i,o])=>{const a=(i+t).toFixed(),s=(o+r).toFixed();return n==="xy"?`${a},${s}/`:`${s},${a}/`}).join("")}function Os(e,t,r){const n=[];for(let i=e.top;i<e.bottom+t;i++){const o=[];for(let a=e.left;a<e.right+t;a++)o.push(`${r(a,i)},`);n.push(o.join(""))}return n.join(`
`)}function u0(e,t){const r=new Map;return e.forEach((n,i,o)=>{const a=n.key;r.has(a)?r.get(a).push([i,o]):r.set(a,[[i,o]])}),Array.from(r.entries()).sort(([n],[i])=>parseInt(i)-parseInt(n)).map(([n,i])=>`${n}:${n_(i,t,"xy")}`).join(`
`)}class bc extends Error{}const TK=["[object Object]","undefined","NaN","FAIL!!"];function LK(e){e.split(`
`).forEach((t,r)=>{if(TK.forEach(n=>{if(t.includes(n))throw new bc(`Unexpected ${JSON.stringify(n)} on line ${r}:
${t}`)}),t.includes("{")&&!/^\w+\{$/.test(t))throw new bc(`Unexpected '{' on line ${r}:
${t}`);if(t.includes("}")&&t!=="}")throw new bc(`Unexpected '}' on line ${r}:
${t}`)})}function IK(e){const t=[-e.left,-e.top],r=`comments{
${xK(CK(e),"  ")}
}
info{
rowcount:${(e.right-e.left).toFixed()}
colcount:${(e.bottom-e.top).toFixed()}
camerapos:${La({position:e.cameraPosition,tileOffset:t,heightMap:e.height})}
biome:${e.context.biome}
creator:groundHog
levelname:${e.levelName}
opencaves:${n_(e.openCaveFlags.map((n,i,o)=>[i,o]),t,"yx")}
${e.oxygen?`oxygen:${e.oxygen.join("/")}`:""}
spiderrate:10
spidermin:2
spidermax:4
${"version:2023-08-14-1"}
}
tiles{
${Os(e,0,(n,i)=>{var s;const o=e.tiles.get(n,i)??S.SOLID_ROCK,a=!o.isWall&&!((s=e.discoveryZones.get(n,i))!=null&&s.openOnSpawn)?100:0;return(o.id+a).toFixed()})}
}
height{
${Os(e,1,(n,i)=>e.height.get(n,i).toFixed())}
}
resources{
crystals:
${Os(e,0,(n,i)=>(e.crystals.get(n,i)??0).toFixed())}
ore:
${Os(e,0,(n,i)=>(e.ore.get(n,i)??0).toFixed())}
}
objectives{
${RK(e.objectives)}
}
buildings{
${e.buildings.map(n=>PU(n,t,e.height)).join(`
`)}
}
landslidefrequency{
${u0(e.landslides,t)}
}
lavaspread{
${u0(e.erosion,t)}
}
creatures{
${e.creatures.map(n=>WU(n,t,e.height)).join(`
`)}
}
miners{
${e.miners.map(n=>UV(n,t,e.height)).join(`
`)}
}
vehicles{
${e.vehicles.map(n=>V9(n,t,e.height)).join(`
`)}
}
briefing{
${e.briefing.intro}
}
briefingsuccess{
${e.briefing.success}
}
briefingfailure{
${e.briefing.failure}
}
blocks{
}
script{
${e.script}

}`;return LK(r),{...e,serialized:r}}function kK(e){var o,a;const t=[];e.plans.forEach(s=>{s.architect.claimEventOnDiscover({cavern:e,plan:s}).forEach(({pos:l,dz:u,priority:c})=>{var f;u=u??(l&&e.discoveryZones.get(...l)),u&&!u.openOnSpawn&&c<(((f=t[u.id])==null?void 0:f.priority)??1/0)&&(t[u.id]={priority:c,planId:s.id})})});const r=[];t.forEach(({planId:s},l)=>r[l]=s);const n=Rn(e),i=!!((a=(o=n.architect).holdCreatures)!=null&&a.call(o,{cavern:e,plan:n}));return{...e,ownsScriptOnDiscover:r,anchorHoldCreatures:i}}const MK=vo(mK,"Aerating cavern").then(fK,"Adjuring objectives").then(gK,"Enscribing briefing").then(kK,"Preparing to write scripts").then($K,"Writing scripts").then(IK,"Writing file contents");function NK(e){const t=ii(e.initialContext),r=new v$(t.seed);return{...e,context:t,dice:r}}const PK=vo(NK).chain(pV).chain(xV).chain(BV).chain(cK).chain(MK),FK="_popoverWrapper_1i461_1",jK="_about_1i461_54",BK="_lore_1i461_58",DK="_error_1i461_61",HK="_message_1i461_65",WK="_stack_1i461_68",UK="_context_1i461_72",fr={popoverWrapper:FK,about:jK,lore:BK,error:DK,message:HK,stack:WK,context:UK};function zK({levelName:e,briefing:t,script:r}){const n=r==null?void 0:r.split(`
`).map(i=>i.match(/^string\s+(?<name>[a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*"(?<value>.*)"$/));return t||r?p.jsx("div",{className:fr.popoverWrapper,children:p.jsxs("div",{className:fr.lore,children:[p.jsx("h1",{children:e}),p.jsx("h2",{children:"Briefing"}),p.jsx("h3",{children:"Introduction"}),p.jsx("p",{children:t==null?void 0:t.intro}),p.jsx("h3",{children:"Success"}),p.jsx("p",{children:t==null?void 0:t.success}),p.jsx("h3",{children:"Failure"}),p.jsx("p",{children:t==null?void 0:t.failure}),n&&p.jsx("h2",{children:"Scripted Events"}),n==null?void 0:n.map(i=>{if(!i)return null;const{name:o,value:a}=i.groups;return p.jsxs(q.Fragment,{children:[p.jsx("h3",{children:o}),p.jsx("p",{children:a})]},o)})]})}):null}const GK=()=>p.jsx("div",{className:fr.popoverWrapper,children:p.jsxs("div",{className:fr.about,children:[p.jsxs("h2",{children:["groundHog v",El]}),p.jsx("p",{children:"By Christopher Dollard (aka charredUtensil)"}),p.jsxs("p",{children:["See"," ",p.jsx("a",{href:"https://github.com/charredUtensil/groundhog",target:"_blank",rel:"noreferrer",children:"documentation"})," ","and"," ",p.jsx("a",{href:"https://github.com/charredUtensil/groundhog/issues",target:"_blank",rel:"noreferrer",children:"report issues"})," ","on GitHub."]}),p.jsx("p",{children:"LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this site."}),p.jsx("h2",{children:"Special Thanks"}),p.jsxs("ul",{children:[p.jsxs("li",{children:[p.jsx("em",{children:"AAdonaac"})," for writing up their"," ",p.jsx("a",{href:"https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm",children:"dungeon generation algorithm"})]}),p.jsxs("li",{children:[p.jsx("em",{children:p.jsx("a",{href:"https://baraklava.itch.io",children:"Klavvy (Baraklava)"})})," ","for making Manic Miners"]}),p.jsxs("li",{children:[p.jsx("em",{children:"ICsleep (Script Maniac)"}),", ",p.jsx("em",{children:"Ruinae Retroque Rursus"}),", and"," ",p.jsx("em",{children:p.jsx("a",{href:"https://github.com/tyabnet",children:"Tyab"})})," ","for help with scripting and level design"]}),p.jsxs("li",{children:[p.jsx("em",{children:p.jsx("a",{href:"https://github.com/vyldr",children:"Vyldr"})})," ","for making the original"," ",p.jsx("a",{href:"https://vyldr.github.io/",children:"Manic Miners Random Map Generator"})]}),p.jsx("li",{children:"Everyone else on the Manic Miners Discord server"})]})]})}),VK="_App_22rm9_24",KK="_rockBiome_22rm9_43",YK="_iceBiome_22rm9_46",qK="_lavaBiome_22rm9_51",XK="_settingsPanel_22rm9_56",QK="_mainPanel_22rm9_62",ZK="_grid_22rm9_67",JK="_loading_22rm9_88",eY="_hasError_22rm9_104",tY="_stepName_22rm9_112",Mn={App:VK,rockBiome:KK,iceBiome:YK,lavaBiome:qK,settingsPanel:XK,mainPanel:QK,grid:ZK,"scan-scrim":"_scan-scrim_22rm9_1",loading:JK,hasError:eY,stepName:tY},rY="https://github.com/charredUtensil/groundhog/issues/new";function nY({error:e,initialContext:t,context:r}){const[n,i]=q.useState(!0),[o,a]=q.useState("no");if(!n)return null;const s=[`error: ${e.message}`,`groundHog version: ${El}}`,`initial context: ${JSON.stringify(t)}`,`context: ${JSON.stringify(r)}`,`stack: ${e.stack}`].join(`
`);function l(){navigator.clipboard.writeText(s).then(()=>a("copied")).catch(()=>a("fail"))}const u=`${rY}?body=${encodeURIComponent(`Add any relevant info here:


${s}`)}`;return p.jsx("div",{className:fr.popoverWrapper,children:p.jsxs("div",{className:fr.error,children:[p.jsx("h2",{children:"Cavern generation failed"}),p.jsx("p",{className:fr.message,children:e.message}),p.jsxs("p",{children:["This isn't supposed to happen. Please consider"," ",p.jsx("a",{href:u,target:"_blank",rel:"noreferrer",children:"filing a bug"}),"."]}),p.jsxs("ul",{children:[p.jsxs("li",{children:["groundHog version: ",El]}),p.jsxs("li",{children:["seed: ",r==null?void 0:r.seed.toString(16).padStart(8,"0").toUpperCase()]}),p.jsx("li",{children:p.jsx("a",{href:u,target:"_blank",rel:"noreferrer",children:"Report issue on GitHub (Requires GitHub account)"})}),p.jsx("li",{children:p.jsxs("button",{onClick:l,children:["Copy Bug Report",o==="copied"&&" [ Copied! ]",o==="fail"&&" [ Failed :( ]"]})}),p.jsx("li",{children:p.jsx("button",{onClick:()=>i(!1),children:"Hide this window"})})]}),e.stack&&p.jsxs(p.Fragment,{children:[p.jsx("h3",{children:"Stack"}),p.jsx("p",{className:fr.stack,children:e.stack})]}),p.jsx("h3",{children:"Initial Context"}),p.jsx("p",{className:fr.context,children:JSON.stringify(t)}),r&&p.jsxs(p.Fragment,{children:[p.jsx("h3",{children:"Context"}),p.jsx("p",{className:fr.context,children:JSON.stringify(r)})]})]})})}const iY="_progressBar_1c8ei_6",oY="_completed_1c8ei_17",aY="_initial_1c8ei_21",sY="_filled_1c8ei_33",lY="_empty_1c8ei_39",Io={progressBar:iY,completed:oY,initial:aY,filled:sY,empty:lY};function uY({autoGenerate:e,completedSteps:t,totalSteps:r,lastStepName:n,nextStepName:i}){const o=`${(t/r*100).toFixed()}%`,a=t>=r,s=a?"100% • Done!":e?`${o.padStart(4)} • ${i}...`:`Finished ${n} • Next: ${i}`,l=Fe([Io.progressBar,t==0&&Io.initial,a&&Io.completed]).join(" ");return p.jsxs("div",{className:l,style:{"--progress":o},children:[p.jsx("div",{className:Io.empty,children:s}),p.jsx("div",{className:Io.filled,children:s})]})}const cY="_controls_p15xo_1",fY="_button_p15xo_10",hY="_disabled_p15xo_27",zs={controls:cY,button:fY,disabled:hY};function dY(e){return`data:text/plain;charset=utf-8,${encodeURIComponent(e)}`}function pY({cavern:e}){return e.serialized?p.jsx("a",{className:zs.button,href:dY(e.serialized),download:`${e.fileName}.dat`,title:"Download Cavern",children:"download"}):p.jsx("div",{className:`${zs.button} ${zs.disabled}`,title:"Download will be available when generation is complete",children:"download"})}function mY({cavern:e,autoGenerate:t,setAutoGenerate:r,step:n,reset:i}){return p.jsxs("div",{className:zs.controls,children:[n?t?p.jsx("button",{onClick:()=>r(!1),title:"Pause generation",children:"pause"}):p.jsxs(p.Fragment,{children:[p.jsx("button",{onClick:n,title:"Generate one step",children:"step"}),p.jsx("button",{onClick:()=>r(!0),title:"Resume generation",children:"play_arrow"})]}):p.jsx("button",{onClick:i,title:"Regenerate Cavern",children:"restart_alt"}),p.jsx(pY,{cavern:e})]})}const vY="_vizOptsPanel_pzay9_1",gY="_active_pzay9_34",yY="_disabled_pzay9_39",qr={vizOptsPanel:vY,active:gY,disabled:yY},wY=[{of:"overview",label:"Overview",enabled:()=>!0},{of:"tiles",label:"Tiles",enabled:e=>!!(e!=null&&e.tiles)},{of:"crystals",label:"Crystals",enabled:e=>!!(e!=null&&e.crystals)},{of:"ore",label:"Ore",enabled:e=>!!(e!=null&&e.ore)},{of:"entities",label:"Entities",enabled:e=>!!(e!=null&&e.buildings)},{of:"discovery",label:"Discovery",enabled:e=>!!(e!=null&&e.discoveryZones)},{of:"erosion",label:"Erosion",enabled:e=>!!(e!=null&&e.erosion)},{of:"height",label:"Height",enabled:e=>!!(e!=null&&e.height)},{of:"landslides",label:"Landslides",enabled:e=>!!(e!=null&&e.landslides)},{of:"oxygen",label:"Oxygen",enabled:e=>(e==null?void 0:e.oxygen)!==void 0},{of:"objectives",label:"Objectives",enabled:e=>!!(e!=null&&e.objectives)},{of:"lore",label:"Lore",enabled:e=>!!(e!=null&&e.lore)},{of:"script",label:"Script",enabled:e=>!!(e!=null&&e.script)},{of:"about",label:"About",enabled:()=>!0}];function $Y({cavern:e,mapOverlay:t,setMapOverlay:r,showOutlines:n,setShowOutlines:i,showPearls:o,setShowPearls:a}){return p.jsxs("div",{className:qr.vizOptsPanel,children:[p.jsx("h1",{children:"Show"}),p.jsx("button",{className:n?qr.active:qr.inactive,onClick:()=>i(s=>!s),children:"Outlines"}),p.jsx("button",{className:o?qr.active:qr.inactive,onClick:()=>a(s=>!s),children:"Pearls"}),wY.map(({of:s,label:l,enabled:u})=>p.jsx("button",{className:t===s?qr.active:u(e)?qr.inactive:qr.disabled,onClick:()=>r(c=>c===s?"overview":s),children:l},s))]})}function xc(e){return PK.start({initialContext:e})}function _Y(){var _,$;const[e,t]=q.useState(()=>xc({seed:c7()})),r=q.useCallback(v=>{t(m=>xc(typeof v=="function"?v(m.result.initialContext):v))},[]),[n,i]=q.useState(!0),[o,a]=q.useState("overview"),[s,l]=q.useState(!1),[u,c]=q.useState(!1),f=(_=e.result.context)==null?void 0:_.biome,h=q.useMemo(()=>{const v=e.next;return v?()=>{try{t(v())}catch(m){console.error(m);const g=m instanceof Error?m:new Error("unknown error");t(E=>({...E,next:null,error:g}))}}:null},[e.next]),d=q.useCallback(()=>{i(!1),t(v=>xc(v.result.initialContext))},[]);q.useEffect(()=>{h&&n&&h()},[n,h]),q.useEffect(()=>{window.cavern=e.result},[e]);const y=n&&!e.result.serialized||o==="about";return p.jsxs("div",{className:`${Mn.App} ${Mn[`${f}Biome`]}`,children:[p.jsx("div",{className:Mn.settingsPanel,children:p.jsx(f7,{initialContext:e.result.initialContext,cavern:e.result,setInitialContext:r})}),p.jsxs("div",{className:Mn.mainPanel,children:[p.jsx("div",{className:Fe([Mn.grid,y&&Mn.loading,e.error&&Mn.hasError]).join(" ")}),e.result&&p.jsx(rV,{cavern:e.result,mapOverlay:o,showOutlines:s,showPearls:u}),o==="about"&&p.jsx(GK,{}),o==="lore"&&p.jsx(zK,{...e.result}),e.error&&p.jsx(nY,{error:e.error,initialContext:e.result.initialContext,context:($=e.result)==null?void 0:$.context}),p.jsx(uY,{autoGenerate:n,...e}),p.jsx(mY,{cavern:e.result,autoGenerate:n,setAutoGenerate:i,step:h,reset:d})]}),p.jsx($Y,{cavern:e.result,mapOverlay:o,setMapOverlay:a,showOutlines:s,setShowOutlines:l,showPearls:u,setShowPearls:c})]})}const SY=Cc.createRoot(document.getElementById("root"));SY.render(p.jsx($0.StrictMode,{children:p.jsx(_Y,{})}));
//# sourceMappingURL=index-d6nAz6xv.js.map
