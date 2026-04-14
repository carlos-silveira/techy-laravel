import{g as We,s as Ne,q as ze,p as Pe,a as Ve,b as Re,_ as c,c as dt,d as Tt,e as He,l as ot,k as Be,j as je,z as Ge,u as Xe}from"./ArticleShow-sbn9e_mn.js";import{d as X}from"./CommandPalette-D5UYZDVE.js";import{c as Et,g as It}from"./app-B4hlEcT8.js";import{t as qe,m as Ue,a as Ze,b as ie,c as ne,d as Qe,e as Ke,f as Je,g as ti,h as ei,i as ii,j as ni,k as re,l as se,n as ae,s as oe,o as ce}from"./time-CiuhjohS.js";import{l as ri}from"./linear-BVgzNO2f.js";import{R as he,r as si,o as me,q as ke,C as ye,u as $t,v as ai}from"./step-D4rzWiu0.js";import"./PublicFooter-Br4v1E4c.js";import"./ThemeToggle-Db19VZFU.js";import"./createLucideIcon-DRnwSVQ4.js";import"./AdSlot-BMiN9cyF.js";import"./RagCopilot-DKszovEJ.js";import"./use-motion-value-Bc0KHH7T.js";import"./linkedin-BwT7e2E-.js";import"./search-Q442ESzy.js";import"./zap-B9ngZkRJ.js";import"./init-Dmth1JHB.js";import"./defaultLocale-DX6XiGOO.js";function oi(t){return t}var wt=1,Yt=2,zt=3,bt=4,le=1e-6;function ci(t){return"translate("+t+",0)"}function li(t){return"translate(0,"+t+")"}function ui(t){return i=>+t(i)}function di(t,i){return i=Math.max(0,t.bandwidth()-i*2)/2,t.round()&&(i=Math.round(i)),n=>+t(n)+i}function fi(){return!this.__axis}function ge(t,i){var n=[],r=null,a=null,f=6,d=6,T=3,E=typeof window<"u"&&window.devicePixelRatio>1?0:.5,$=t===wt||t===bt?-1:1,b=t===bt||t===Yt?"x":"y",F=t===wt||t===zt?ci:li;function C(D){var V=r??(i.ticks?i.ticks.apply(i,n):i.domain()),I=a??(i.tickFormat?i.tickFormat.apply(i,n):oi),S=Math.max(f,0)+T,M=i.range(),W=+M[0]+E,L=+M[M.length-1]+E,R=(i.bandwidth?di:ui)(i.copy(),E),H=D.selection?D.selection():D,A=H.selectAll(".domain").data([null]),p=H.selectAll(".tick").data(V,i).order(),h=p.exit(),u=p.enter().append("g").attr("class","tick"),x=p.select("line"),v=p.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),p=p.merge(u),x=x.merge(u.append("line").attr("stroke","currentColor").attr(b+"2",$*f)),v=v.merge(u.append("text").attr("fill","currentColor").attr(b,$*S).attr("dy",t===wt?"0em":t===zt?"0.71em":"0.32em")),D!==H&&(A=A.transition(D),p=p.transition(D),x=x.transition(D),v=v.transition(D),h=h.transition(D).attr("opacity",le).attr("transform",function(k){return isFinite(k=R(k))?F(k+E):this.getAttribute("transform")}),u.attr("opacity",le).attr("transform",function(k){var m=this.parentNode.__axis;return F((m&&isFinite(m=m(k))?m:R(k))+E)})),h.remove(),A.attr("d",t===bt||t===Yt?d?"M"+$*d+","+W+"H"+E+"V"+L+"H"+$*d:"M"+E+","+W+"V"+L:d?"M"+W+","+$*d+"V"+E+"H"+L+"V"+$*d:"M"+W+","+E+"H"+L),p.attr("opacity",1).attr("transform",function(k){return F(R(k)+E)}),x.attr(b+"2",$*f),v.attr(b,$*S).text(I),H.filter(fi).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===Yt?"start":t===bt?"end":"middle"),H.each(function(){this.__axis=R})}return C.scale=function(D){return arguments.length?(i=D,C):i},C.ticks=function(){return n=Array.from(arguments),C},C.tickArguments=function(D){return arguments.length?(n=D==null?[]:Array.from(D),C):n.slice()},C.tickValues=function(D){return arguments.length?(r=D==null?null:Array.from(D),C):r&&r.slice()},C.tickFormat=function(D){return arguments.length?(a=D,C):a},C.tickSize=function(D){return arguments.length?(f=d=+D,C):f},C.tickSizeInner=function(D){return arguments.length?(f=+D,C):f},C.tickSizeOuter=function(D){return arguments.length?(d=+D,C):d},C.tickPadding=function(D){return arguments.length?(T=+D,C):T},C.offset=function(D){return arguments.length?(E=+D,C):E},C}function hi(t){return ge(wt,t)}function mi(t){return ge(zt,t)}const ki=Math.PI/180,yi=180/Math.PI,St=18,pe=.96422,ve=1,xe=.82521,Te=4/29,ft=6/29,be=3*ft*ft,gi=ft*ft*ft;function we(t){if(t instanceof et)return new et(t.l,t.a,t.b,t.opacity);if(t instanceof nt)return _e(t);t instanceof he||(t=si(t));var i=Wt(t.r),n=Wt(t.g),r=Wt(t.b),a=Lt((.2225045*i+.7168786*n+.0606169*r)/ve),f,d;return i===n&&n===r?f=d=a:(f=Lt((.4360747*i+.3850649*n+.1430804*r)/pe),d=Lt((.0139322*i+.0971045*n+.7141733*r)/xe)),new et(116*a-16,500*(f-a),200*(a-d),t.opacity)}function pi(t,i,n,r){return arguments.length===1?we(t):new et(t,i,n,r??1)}function et(t,i,n,r){this.l=+t,this.a=+i,this.b=+n,this.opacity=+r}me(et,pi,ke(ye,{brighter(t){return new et(this.l+St*(t??1),this.a,this.b,this.opacity)},darker(t){return new et(this.l-St*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,i=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return i=pe*Ft(i),t=ve*Ft(t),n=xe*Ft(n),new he(Ot(3.1338561*i-1.6168667*t-.4906146*n),Ot(-.9787684*i+1.9161415*t+.033454*n),Ot(.0719453*i-.2289914*t+1.4052427*n),this.opacity)}}));function Lt(t){return t>gi?Math.pow(t,1/3):t/be+Te}function Ft(t){return t>ft?t*t*t:be*(t-Te)}function Ot(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Wt(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function vi(t){if(t instanceof nt)return new nt(t.h,t.c,t.l,t.opacity);if(t instanceof et||(t=we(t)),t.a===0&&t.b===0)return new nt(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var i=Math.atan2(t.b,t.a)*yi;return new nt(i<0?i+360:i,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Pt(t,i,n,r){return arguments.length===1?vi(t):new nt(t,i,n,r??1)}function nt(t,i,n,r){this.h=+t,this.c=+i,this.l=+n,this.opacity=+r}function _e(t){if(isNaN(t.h))return new et(t.l,0,0,t.opacity);var i=t.h*ki;return new et(t.l,Math.cos(i)*t.c,Math.sin(i)*t.c,t.opacity)}me(nt,Pt,ke(ye,{brighter(t){return new nt(this.h,this.c,this.l+St*(t??1),this.opacity)},darker(t){return new nt(this.h,this.c,this.l-St*(t??1),this.opacity)},rgb(){return _e(this).rgb()}}));function xi(t){return function(i,n){var r=t((i=Pt(i)).h,(n=Pt(n)).h),a=$t(i.c,n.c),f=$t(i.l,n.l),d=$t(i.opacity,n.opacity);return function(T){return i.h=r(T),i.c=a(T),i.l=f(T),i.opacity=d(T),i+""}}}const Ti=xi(ai);var De={exports:{}};(function(t,i){(function(n,r){t.exports=r()})(Et,function(){var n="day";return function(r,a,f){var d=function($){return $.add(4-$.isoWeekday(),n)},T=a.prototype;T.isoWeekYear=function(){return d(this).year()},T.isoWeek=function($){if(!this.$utils().u($))return this.add(7*($-this.isoWeek()),n);var b,F,C,D,V=d(this),I=(b=this.isoWeekYear(),F=this.$u,C=(F?f.utc:f)().year(b).startOf("year"),D=4-C.isoWeekday(),C.isoWeekday()>4&&(D+=7),C.add(D,n));return V.diff(I,"week")+1},T.isoWeekday=function($){return this.$utils().u($)?this.day()||7:this.day(this.day()%7?$:$-7)};var E=T.startOf;T.startOf=function($,b){var F=this.$utils(),C=!!F.u(b)||b;return F.p($)==="isoweek"?C?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):E.bind(this)($,b)}}})})(De);var bi=De.exports;const wi=It(bi);var Se={exports:{}};(function(t,i){(function(n,r){t.exports=r()})(Et,function(){var n={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},r=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d/,f=/\d\d/,d=/\d\d?/,T=/\d*[^-_:/,()\s\d]+/,E={},$=function(S){return(S=+S)+(S>68?1900:2e3)},b=function(S){return function(M){this[S]=+M}},F=[/[+-]\d\d:?(\d\d)?|Z/,function(S){(this.zone||(this.zone={})).offset=function(M){if(!M||M==="Z")return 0;var W=M.match(/([+-]|\d\d)/g),L=60*W[1]+(+W[2]||0);return L===0?0:W[0]==="+"?-L:L}(S)}],C=function(S){var M=E[S];return M&&(M.indexOf?M:M.s.concat(M.f))},D=function(S,M){var W,L=E.meridiem;if(L){for(var R=1;R<=24;R+=1)if(S.indexOf(L(R,0,M))>-1){W=R>12;break}}else W=S===(M?"pm":"PM");return W},V={A:[T,function(S){this.afternoon=D(S,!1)}],a:[T,function(S){this.afternoon=D(S,!0)}],Q:[a,function(S){this.month=3*(S-1)+1}],S:[a,function(S){this.milliseconds=100*+S}],SS:[f,function(S){this.milliseconds=10*+S}],SSS:[/\d{3}/,function(S){this.milliseconds=+S}],s:[d,b("seconds")],ss:[d,b("seconds")],m:[d,b("minutes")],mm:[d,b("minutes")],H:[d,b("hours")],h:[d,b("hours")],HH:[d,b("hours")],hh:[d,b("hours")],D:[d,b("day")],DD:[f,b("day")],Do:[T,function(S){var M=E.ordinal,W=S.match(/\d+/);if(this.day=W[0],M)for(var L=1;L<=31;L+=1)M(L).replace(/\[|\]/g,"")===S&&(this.day=L)}],w:[d,b("week")],ww:[f,b("week")],M:[d,b("month")],MM:[f,b("month")],MMM:[T,function(S){var M=C("months"),W=(C("monthsShort")||M.map(function(L){return L.slice(0,3)})).indexOf(S)+1;if(W<1)throw new Error;this.month=W%12||W}],MMMM:[T,function(S){var M=C("months").indexOf(S)+1;if(M<1)throw new Error;this.month=M%12||M}],Y:[/[+-]?\d+/,b("year")],YY:[f,function(S){this.year=$(S)}],YYYY:[/\d{4}/,b("year")],Z:F,ZZ:F};function I(S){var M,W;M=S,W=E&&E.formats;for(var L=(S=M.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(x,v,k){var m=k&&k.toUpperCase();return v||W[k]||n[k]||W[m].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(o,l,y){return l||y.slice(1)})})).match(r),R=L.length,H=0;H<R;H+=1){var A=L[H],p=V[A],h=p&&p[0],u=p&&p[1];L[H]=u?{regex:h,parser:u}:A.replace(/^\[|\]$/g,"")}return function(x){for(var v={},k=0,m=0;k<R;k+=1){var o=L[k];if(typeof o=="string")m+=o.length;else{var l=o.regex,y=o.parser,g=x.slice(m),w=l.exec(g)[0];y.call(v,w),x=x.replace(w,"")}}return function(s){var P=s.afternoon;if(P!==void 0){var e=s.hours;P?e<12&&(s.hours+=12):e===12&&(s.hours=0),delete s.afternoon}}(v),v}}return function(S,M,W){W.p.customParseFormat=!0,S&&S.parseTwoDigitYear&&($=S.parseTwoDigitYear);var L=M.prototype,R=L.parse;L.parse=function(H){var A=H.date,p=H.utc,h=H.args;this.$u=p;var u=h[1];if(typeof u=="string"){var x=h[2]===!0,v=h[3]===!0,k=x||v,m=h[2];v&&(m=h[2]),E=this.$locale(),!x&&m&&(E=W.Ls[m]),this.$d=function(g,w,s,P){try{if(["x","X"].indexOf(w)>-1)return new Date((w==="X"?1e3:1)*g);var e=I(w)(g),_=e.year,z=e.month,N=e.day,O=e.hours,G=e.minutes,Y=e.seconds,Q=e.milliseconds,rt=e.zone,lt=e.week,kt=new Date,yt=N||(_||z?1:kt.getDate()),ut=_||kt.getFullYear(),B=0;_&&!z||(B=z>0?z-1:kt.getMonth());var Z,q=O||0,at=G||0,K=Y||0,st=Q||0;return rt?new Date(Date.UTC(ut,B,yt,q,at,K,st+60*rt.offset*1e3)):s?new Date(Date.UTC(ut,B,yt,q,at,K,st)):(Z=new Date(ut,B,yt,q,at,K,st),lt&&(Z=P(Z).week(lt).toDate()),Z)}catch{return new Date("")}}(A,u,p,W),this.init(),m&&m!==!0&&(this.$L=this.locale(m).$L),k&&A!=this.format(u)&&(this.$d=new Date("")),E={}}else if(u instanceof Array)for(var o=u.length,l=1;l<=o;l+=1){h[1]=u[l-1];var y=W.apply(this,h);if(y.isValid()){this.$d=y.$d,this.$L=y.$L,this.init();break}l===o&&(this.$d=new Date(""))}else R.call(this,H)}}})})(Se);var _i=Se.exports;const Di=It(_i);var Ce={exports:{}};(function(t,i){(function(n,r){t.exports=r()})(Et,function(){return function(n,r){var a=r.prototype,f=a.format;a.format=function(d){var T=this,E=this.$locale();if(!this.isValid())return f.bind(this)(d);var $=this.$utils(),b=(d||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(F){switch(F){case"Q":return Math.ceil((T.$M+1)/3);case"Do":return E.ordinal(T.$D);case"gggg":return T.weekYear();case"GGGG":return T.isoWeekYear();case"wo":return E.ordinal(T.week(),"W");case"w":case"ww":return $.s(T.week(),F==="w"?1:2,"0");case"W":case"WW":return $.s(T.isoWeek(),F==="W"?1:2,"0");case"k":case"kk":return $.s(String(T.$H===0?24:T.$H),F==="k"?1:2,"0");case"X":return Math.floor(T.$d.getTime()/1e3);case"x":return T.$d.getTime();case"z":return"["+T.offsetName()+"]";case"zzz":return"["+T.offsetName("long")+"]";default:return F}});return f.bind(this)(b)}}})})(Ce);var Si=Ce.exports;const Ci=It(Si);var Me={exports:{}};(function(t,i){(function(n,r){t.exports=r()})(Et,function(){var n,r,a=1e3,f=6e4,d=36e5,T=864e5,E=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$=31536e6,b=2628e6,F=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,C={years:$,months:b,days:T,hours:d,minutes:f,seconds:a,milliseconds:1,weeks:6048e5},D=function(A){return A instanceof R},V=function(A,p,h){return new R(A,h,p.$l)},I=function(A){return r.p(A)+"s"},S=function(A){return A<0},M=function(A){return S(A)?Math.ceil(A):Math.floor(A)},W=function(A){return Math.abs(A)},L=function(A,p){return A?S(A)?{negative:!0,format:""+W(A)+p}:{negative:!1,format:""+A+p}:{negative:!1,format:""}},R=function(){function A(h,u,x){var v=this;if(this.$d={},this.$l=x,h===void 0&&(this.$ms=0,this.parseFromMilliseconds()),u)return V(h*C[I(u)],this);if(typeof h=="number")return this.$ms=h,this.parseFromMilliseconds(),this;if(typeof h=="object")return Object.keys(h).forEach(function(o){v.$d[I(o)]=h[o]}),this.calMilliseconds(),this;if(typeof h=="string"){var k=h.match(F);if(k){var m=k.slice(2).map(function(o){return o!=null?Number(o):0});return this.$d.years=m[0],this.$d.months=m[1],this.$d.weeks=m[2],this.$d.days=m[3],this.$d.hours=m[4],this.$d.minutes=m[5],this.$d.seconds=m[6],this.calMilliseconds(),this}}return this}var p=A.prototype;return p.calMilliseconds=function(){var h=this;this.$ms=Object.keys(this.$d).reduce(function(u,x){return u+(h.$d[x]||0)*C[x]},0)},p.parseFromMilliseconds=function(){var h=this.$ms;this.$d.years=M(h/$),h%=$,this.$d.months=M(h/b),h%=b,this.$d.days=M(h/T),h%=T,this.$d.hours=M(h/d),h%=d,this.$d.minutes=M(h/f),h%=f,this.$d.seconds=M(h/a),h%=a,this.$d.milliseconds=h},p.toISOString=function(){var h=L(this.$d.years,"Y"),u=L(this.$d.months,"M"),x=+this.$d.days||0;this.$d.weeks&&(x+=7*this.$d.weeks);var v=L(x,"D"),k=L(this.$d.hours,"H"),m=L(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3,o=Math.round(1e3*o)/1e3);var l=L(o,"S"),y=h.negative||u.negative||v.negative||k.negative||m.negative||l.negative,g=k.format||m.format||l.format?"T":"",w=(y?"-":"")+"P"+h.format+u.format+v.format+g+k.format+m.format+l.format;return w==="P"||w==="-P"?"P0D":w},p.toJSON=function(){return this.toISOString()},p.format=function(h){var u=h||"YYYY-MM-DDTHH:mm:ss",x={Y:this.$d.years,YY:r.s(this.$d.years,2,"0"),YYYY:r.s(this.$d.years,4,"0"),M:this.$d.months,MM:r.s(this.$d.months,2,"0"),D:this.$d.days,DD:r.s(this.$d.days,2,"0"),H:this.$d.hours,HH:r.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:r.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:r.s(this.$d.seconds,2,"0"),SSS:r.s(this.$d.milliseconds,3,"0")};return u.replace(E,function(v,k){return k||String(x[v])})},p.as=function(h){return this.$ms/C[I(h)]},p.get=function(h){var u=this.$ms,x=I(h);return x==="milliseconds"?u%=1e3:u=x==="weeks"?M(u/C[x]):this.$d[x],u||0},p.add=function(h,u,x){var v;return v=u?h*C[I(u)]:D(h)?h.$ms:V(h,this).$ms,V(this.$ms+v*(x?-1:1),this)},p.subtract=function(h,u){return this.add(h,u,!0)},p.locale=function(h){var u=this.clone();return u.$l=h,u},p.clone=function(){return V(this.$ms,this)},p.humanize=function(h){return n().add(this.$ms,"ms").locale(this.$l).fromNow(!h)},p.valueOf=function(){return this.asMilliseconds()},p.milliseconds=function(){return this.get("milliseconds")},p.asMilliseconds=function(){return this.as("milliseconds")},p.seconds=function(){return this.get("seconds")},p.asSeconds=function(){return this.as("seconds")},p.minutes=function(){return this.get("minutes")},p.asMinutes=function(){return this.as("minutes")},p.hours=function(){return this.get("hours")},p.asHours=function(){return this.as("hours")},p.days=function(){return this.get("days")},p.asDays=function(){return this.as("days")},p.weeks=function(){return this.get("weeks")},p.asWeeks=function(){return this.as("weeks")},p.months=function(){return this.get("months")},p.asMonths=function(){return this.as("months")},p.years=function(){return this.get("years")},p.asYears=function(){return this.as("years")},A}(),H=function(A,p,h){return A.add(p.years()*h,"y").add(p.months()*h,"M").add(p.days()*h,"d").add(p.hours()*h,"h").add(p.minutes()*h,"m").add(p.seconds()*h,"s").add(p.milliseconds()*h,"ms")};return function(A,p,h){n=h,r=h().$utils(),h.duration=function(v,k){var m=h.locale();return V(v,{$l:m},k)},h.isDuration=D;var u=p.prototype.add,x=p.prototype.subtract;p.prototype.add=function(v,k){return D(v)?H(this,v,1):u.bind(this)(v,k)},p.prototype.subtract=function(v,k){return D(v)?H(this,v,-1):x.bind(this)(v,k)}}})})(Me);var Mi=Me.exports;const Ei=It(Mi);var Vt=function(){var t=c(function(m,o,l,y){for(l=l||{},y=m.length;y--;l[m[y]]=o);return l},"o"),i=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],n=[1,26],r=[1,27],a=[1,28],f=[1,29],d=[1,30],T=[1,31],E=[1,32],$=[1,33],b=[1,34],F=[1,9],C=[1,10],D=[1,11],V=[1,12],I=[1,13],S=[1,14],M=[1,15],W=[1,16],L=[1,19],R=[1,20],H=[1,21],A=[1,22],p=[1,23],h=[1,25],u=[1,35],x={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(o,l,y,g,w,s,P){var e=s.length-1;switch(w){case 1:return s[e-1];case 2:this.$=[];break;case 3:s[e-1].push(s[e]),this.$=s[e-1];break;case 4:case 5:this.$=s[e];break;case 6:case 7:this.$=[];break;case 8:g.setWeekday("monday");break;case 9:g.setWeekday("tuesday");break;case 10:g.setWeekday("wednesday");break;case 11:g.setWeekday("thursday");break;case 12:g.setWeekday("friday");break;case 13:g.setWeekday("saturday");break;case 14:g.setWeekday("sunday");break;case 15:g.setWeekend("friday");break;case 16:g.setWeekend("saturday");break;case 17:g.setDateFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 18:g.enableInclusiveEndDates(),this.$=s[e].substr(18);break;case 19:g.TopAxis(),this.$=s[e].substr(8);break;case 20:g.setAxisFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 21:g.setTickInterval(s[e].substr(13)),this.$=s[e].substr(13);break;case 22:g.setExcludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 23:g.setIncludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 24:g.setTodayMarker(s[e].substr(12)),this.$=s[e].substr(12);break;case 27:g.setDiagramTitle(s[e].substr(6)),this.$=s[e].substr(6);break;case 28:this.$=s[e].trim(),g.setAccTitle(this.$);break;case 29:case 30:this.$=s[e].trim(),g.setAccDescription(this.$);break;case 31:g.addSection(s[e].substr(8)),this.$=s[e].substr(8);break;case 33:g.addTask(s[e-1],s[e]),this.$="task";break;case 34:this.$=s[e-1],g.setClickEvent(s[e-1],s[e],null);break;case 35:this.$=s[e-2],g.setClickEvent(s[e-2],s[e-1],s[e]);break;case 36:this.$=s[e-2],g.setClickEvent(s[e-2],s[e-1],null),g.setLink(s[e-2],s[e]);break;case 37:this.$=s[e-3],g.setClickEvent(s[e-3],s[e-2],s[e-1]),g.setLink(s[e-3],s[e]);break;case 38:this.$=s[e-2],g.setClickEvent(s[e-2],s[e],null),g.setLink(s[e-2],s[e-1]);break;case 39:this.$=s[e-3],g.setClickEvent(s[e-3],s[e-1],s[e]),g.setLink(s[e-3],s[e-2]);break;case 40:this.$=s[e-1],g.setLink(s[e-1],s[e]);break;case 41:case 47:this.$=s[e-1]+" "+s[e];break;case 42:case 43:case 45:this.$=s[e-2]+" "+s[e-1]+" "+s[e];break;case 44:case 46:this.$=s[e-3]+" "+s[e-2]+" "+s[e-1]+" "+s[e];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(i,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:r,14:a,15:f,16:d,17:T,18:E,19:18,20:$,21:b,22:F,23:C,24:D,25:V,26:I,27:S,28:M,29:W,30:L,31:R,33:H,35:A,36:p,37:24,38:h,40:u},t(i,[2,7],{1:[2,1]}),t(i,[2,3]),{9:36,11:17,12:n,13:r,14:a,15:f,16:d,17:T,18:E,19:18,20:$,21:b,22:F,23:C,24:D,25:V,26:I,27:S,28:M,29:W,30:L,31:R,33:H,35:A,36:p,37:24,38:h,40:u},t(i,[2,5]),t(i,[2,6]),t(i,[2,17]),t(i,[2,18]),t(i,[2,19]),t(i,[2,20]),t(i,[2,21]),t(i,[2,22]),t(i,[2,23]),t(i,[2,24]),t(i,[2,25]),t(i,[2,26]),t(i,[2,27]),{32:[1,37]},{34:[1,38]},t(i,[2,30]),t(i,[2,31]),t(i,[2,32]),{39:[1,39]},t(i,[2,8]),t(i,[2,9]),t(i,[2,10]),t(i,[2,11]),t(i,[2,12]),t(i,[2,13]),t(i,[2,14]),t(i,[2,15]),t(i,[2,16]),{41:[1,40],43:[1,41]},t(i,[2,4]),t(i,[2,28]),t(i,[2,29]),t(i,[2,33]),t(i,[2,34],{42:[1,42],43:[1,43]}),t(i,[2,40],{41:[1,44]}),t(i,[2,35],{43:[1,45]}),t(i,[2,36]),t(i,[2,38],{42:[1,46]}),t(i,[2,37]),t(i,[2,39])],defaultActions:{},parseError:c(function(o,l){if(l.recoverable)this.trace(o);else{var y=new Error(o);throw y.hash=l,y}},"parseError"),parse:c(function(o){var l=this,y=[0],g=[],w=[null],s=[],P=this.table,e="",_=0,z=0,N=2,O=1,G=s.slice.call(arguments,1),Y=Object.create(this.lexer),Q={yy:{}};for(var rt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,rt)&&(Q.yy[rt]=this.yy[rt]);Y.setInput(o,Q.yy),Q.yy.lexer=Y,Q.yy.parser=this,typeof Y.yylloc>"u"&&(Y.yylloc={});var lt=Y.yylloc;s.push(lt);var kt=Y.options&&Y.options.ranges;typeof Q.yy.parseError=="function"?this.parseError=Q.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function yt(U){y.length=y.length-2*U,w.length=w.length-U,s.length=s.length-U}c(yt,"popStack");function ut(){var U;return U=g.pop()||Y.lex()||O,typeof U!="number"&&(U instanceof Array&&(g=U,U=g.pop()),U=l.symbols_[U]||U),U}c(ut,"lex");for(var B,Z,q,at,K={},st,J,ee,xt;;){if(Z=y[y.length-1],this.defaultActions[Z]?q=this.defaultActions[Z]:((B===null||typeof B>"u")&&(B=ut()),q=P[Z]&&P[Z][B]),typeof q>"u"||!q.length||!q[0]){var At="";xt=[];for(st in P[Z])this.terminals_[st]&&st>N&&xt.push("'"+this.terminals_[st]+"'");Y.showPosition?At="Parse error on line "+(_+1)+`:
`+Y.showPosition()+`
Expecting `+xt.join(", ")+", got '"+(this.terminals_[B]||B)+"'":At="Parse error on line "+(_+1)+": Unexpected "+(B==O?"end of input":"'"+(this.terminals_[B]||B)+"'"),this.parseError(At,{text:Y.match,token:this.terminals_[B]||B,line:Y.yylineno,loc:lt,expected:xt})}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Z+", token: "+B);switch(q[0]){case 1:y.push(B),w.push(Y.yytext),s.push(Y.yylloc),y.push(q[1]),B=null,z=Y.yyleng,e=Y.yytext,_=Y.yylineno,lt=Y.yylloc;break;case 2:if(J=this.productions_[q[1]][1],K.$=w[w.length-J],K._$={first_line:s[s.length-(J||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(J||1)].first_column,last_column:s[s.length-1].last_column},kt&&(K._$.range=[s[s.length-(J||1)].range[0],s[s.length-1].range[1]]),at=this.performAction.apply(K,[e,z,_,Q.yy,q[1],w,s].concat(G)),typeof at<"u")return at;J&&(y=y.slice(0,-1*J*2),w=w.slice(0,-1*J),s=s.slice(0,-1*J)),y.push(this.productions_[q[1]][0]),w.push(K.$),s.push(K._$),ee=P[y[y.length-2]][y[y.length-1]],y.push(ee);break;case 3:return!0}}return!0},"parse")},v=function(){var m={EOF:1,parseError:c(function(l,y){if(this.yy.parser)this.yy.parser.parseError(l,y);else throw new Error(l)},"parseError"),setInput:c(function(o,l){return this.yy=l||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var l=o.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:c(function(o){var l=o.length,y=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var w=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===g.length?this.yylloc.first_column:0)+g[g.length-y.length].length-y[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[w[0],w[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(o){this.unput(this.match.slice(o))},"less"),pastInput:c(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var o=this.pastInput(),l=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:c(function(o,l){var y,g,w;if(this.options.backtrack_lexer&&(w={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(w.yylloc.range=this.yylloc.range.slice(0))),g=o[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],y=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var s in w)this[s]=w[s];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,l,y,g;this._more||(this.yytext="",this.match="");for(var w=this._currentRules(),s=0;s<w.length;s++)if(y=this._input.match(this.rules[w[s]]),y&&(!l||y[0].length>l[0].length)){if(l=y,g=s,this.options.backtrack_lexer){if(o=this.test_match(y,w[s]),o!==!1)return o;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(o=this.test_match(l,w[g]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var l=this.next();return l||this.lex()},"lex"),begin:c(function(l){this.conditionStack.push(l)},"begin"),popState:c(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:c(function(l){this.begin(l)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(l,y,g,w){switch(g){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return m}();x.lexer=v;function k(){this.yy={}}return c(k,"Parser"),k.prototype=x,x.Parser=k,new k}();Vt.parser=Vt;var Ii=Vt;X.extend(wi);X.extend(Di);X.extend(Ci);var ue={friday:5,saturday:6},tt="",jt="",Gt=void 0,Xt="",gt=[],pt=[],qt=new Map,Ut=[],Ct=[],mt="",Zt="",Ee=["active","done","crit","milestone","vert"],Qt=[],vt=!1,Kt=!1,Jt="sunday",Mt="saturday",Rt=0,Ai=c(function(){Ut=[],Ct=[],mt="",Qt=[],_t=0,Bt=void 0,Dt=void 0,j=[],tt="",jt="",Zt="",Gt=void 0,Xt="",gt=[],pt=[],vt=!1,Kt=!1,Rt=0,qt=new Map,Ge(),Jt="sunday",Mt="saturday"},"clear"),$i=c(function(t){jt=t},"setAxisFormat"),Yi=c(function(){return jt},"getAxisFormat"),Li=c(function(t){Gt=t},"setTickInterval"),Fi=c(function(){return Gt},"getTickInterval"),Oi=c(function(t){Xt=t},"setTodayMarker"),Wi=c(function(){return Xt},"getTodayMarker"),Ni=c(function(t){tt=t},"setDateFormat"),zi=c(function(){vt=!0},"enableInclusiveEndDates"),Pi=c(function(){return vt},"endDatesAreInclusive"),Vi=c(function(){Kt=!0},"enableTopAxis"),Ri=c(function(){return Kt},"topAxisEnabled"),Hi=c(function(t){Zt=t},"setDisplayMode"),Bi=c(function(){return Zt},"getDisplayMode"),ji=c(function(){return tt},"getDateFormat"),Gi=c(function(t){gt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Xi=c(function(){return gt},"getIncludes"),qi=c(function(t){pt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),Ui=c(function(){return pt},"getExcludes"),Zi=c(function(){return qt},"getLinks"),Qi=c(function(t){mt=t,Ut.push(t)},"addSection"),Ki=c(function(){return Ut},"getSections"),Ji=c(function(){let t=de();const i=10;let n=0;for(;!t&&n<i;)t=de(),n++;return Ct=j,Ct},"getTasks"),Ie=c(function(t,i,n,r){const a=t.format(i.trim()),f=t.format("YYYY-MM-DD");return r.includes(a)||r.includes(f)?!1:n.includes("weekends")&&(t.isoWeekday()===ue[Mt]||t.isoWeekday()===ue[Mt]+1)||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(a)||n.includes(f)},"isInvalidDate"),tn=c(function(t){Jt=t},"setWeekday"),en=c(function(){return Jt},"getWeekday"),nn=c(function(t){Mt=t},"setWeekend"),Ae=c(function(t,i,n,r){if(!n.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=X(t.startTime):a=X(t.startTime,i,!0),a=a.add(1,"d");let f;t.endTime instanceof Date?f=X(t.endTime):f=X(t.endTime,i,!0);const[d,T]=rn(a,f,i,n,r);t.endTime=d.toDate(),t.renderEndTime=T},"checkTaskDates"),rn=c(function(t,i,n,r,a){let f=!1,d=null;for(;t<=i;)f||(d=i.toDate()),f=Ie(t,n,r,a),f&&(i=i.add(1,"d")),t=t.add(1,"d");return[i,d]},"fixTaskDates"),Ht=c(function(t,i,n){if(n=n.trim(),c(T=>{const E=T.trim();return E==="x"||E==="X"},"isTimestampFormat")(i)&&/^\d+$/.test(n))return new Date(Number(n));const f=/^after\s+(?<ids>[\d\w- ]+)/.exec(n);if(f!==null){let T=null;for(const $ of f.groups.ids.split(" ")){let b=ct($);b!==void 0&&(!T||b.endTime>T.endTime)&&(T=b)}if(T)return T.endTime;const E=new Date;return E.setHours(0,0,0,0),E}let d=X(n,i.trim(),!0);if(d.isValid())return d.toDate();{ot.debug("Invalid date:"+n),ot.debug("With date format:"+i.trim());const T=new Date(n);if(T===void 0||isNaN(T.getTime())||T.getFullYear()<-1e4||T.getFullYear()>1e4)throw new Error("Invalid date:"+n);return T}},"getStartDate"),$e=c(function(t){const i=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return i!==null?[Number.parseFloat(i[1]),i[2]]:[NaN,"ms"]},"parseDuration"),Ye=c(function(t,i,n,r=!1){n=n.trim();const f=/^until\s+(?<ids>[\d\w- ]+)/.exec(n);if(f!==null){let b=null;for(const C of f.groups.ids.split(" ")){let D=ct(C);D!==void 0&&(!b||D.startTime<b.startTime)&&(b=D)}if(b)return b.startTime;const F=new Date;return F.setHours(0,0,0,0),F}let d=X(n,i.trim(),!0);if(d.isValid())return r&&(d=d.add(1,"d")),d.toDate();let T=X(t);const[E,$]=$e(n);if(!Number.isNaN(E)){const b=T.add(E,$);b.isValid()&&(T=b)}return T.toDate()},"getEndDate"),_t=0,ht=c(function(t){return t===void 0?(_t=_t+1,"task"+_t):t},"parseId"),sn=c(function(t,i){let n;i.substr(0,1)===":"?n=i.substr(1,i.length):n=i;const r=n.split(","),a={};te(r,a,Ee);for(let d=0;d<r.length;d++)r[d]=r[d].trim();let f="";switch(r.length){case 1:a.id=ht(),a.startTime=t.endTime,f=r[0];break;case 2:a.id=ht(),a.startTime=Ht(void 0,tt,r[0]),f=r[1];break;case 3:a.id=ht(r[0]),a.startTime=Ht(void 0,tt,r[1]),f=r[2];break}return f&&(a.endTime=Ye(a.startTime,tt,f,vt),a.manualEndTime=X(f,"YYYY-MM-DD",!0).isValid(),Ae(a,tt,pt,gt)),a},"compileData"),an=c(function(t,i){let n;i.substr(0,1)===":"?n=i.substr(1,i.length):n=i;const r=n.split(","),a={};te(r,a,Ee);for(let f=0;f<r.length;f++)r[f]=r[f].trim();switch(r.length){case 1:a.id=ht(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:r[0]};break;case 2:a.id=ht(),a.startTime={type:"getStartDate",startData:r[0]},a.endTime={data:r[1]};break;case 3:a.id=ht(r[0]),a.startTime={type:"getStartDate",startData:r[1]},a.endTime={data:r[2]};break}return a},"parseData"),Bt,Dt,j=[],Le={},on=c(function(t,i){const n={section:mt,type:mt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:i},task:t,classes:[]},r=an(Dt,i);n.raw.startTime=r.startTime,n.raw.endTime=r.endTime,n.id=r.id,n.prevTaskId=Dt,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.vert=r.vert,n.order=Rt,Rt++;const a=j.push(n);Dt=n.id,Le[n.id]=a-1},"addTask"),ct=c(function(t){const i=Le[t];return j[i]},"findTaskById"),cn=c(function(t,i){const n={section:mt,type:mt,description:t,task:t,classes:[]},r=sn(Bt,i);n.startTime=r.startTime,n.endTime=r.endTime,n.id=r.id,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.vert=r.vert,Bt=n,Ct.push(n)},"addTaskOrg"),de=c(function(){const t=c(function(n){const r=j[n];let a="";switch(j[n].raw.startTime.type){case"prevTaskEnd":{const f=ct(r.prevTaskId);r.startTime=f.endTime;break}case"getStartDate":a=Ht(void 0,tt,j[n].raw.startTime.startData),a&&(j[n].startTime=a);break}return j[n].startTime&&(j[n].endTime=Ye(j[n].startTime,tt,j[n].raw.endTime.data,vt),j[n].endTime&&(j[n].processed=!0,j[n].manualEndTime=X(j[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Ae(j[n],tt,pt,gt))),j[n].processed},"compileTask");let i=!0;for(const[n,r]of j.entries())t(n),i=i&&r.processed;return i},"compileTasks"),ln=c(function(t,i){let n=i;dt().securityLevel!=="loose"&&(n=je(i)),t.split(",").forEach(function(r){ct(r)!==void 0&&(Oe(r,()=>{window.open(n,"_self")}),qt.set(r,n))}),Fe(t,"clickable")},"setLink"),Fe=c(function(t,i){t.split(",").forEach(function(n){let r=ct(n);r!==void 0&&r.classes.push(i)})},"setClass"),un=c(function(t,i,n){if(dt().securityLevel!=="loose"||i===void 0)return;let r=[];if(typeof n=="string"){r=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let f=0;f<r.length;f++){let d=r[f].trim();d.startsWith('"')&&d.endsWith('"')&&(d=d.substr(1,d.length-2)),r[f]=d}}r.length===0&&r.push(t),ct(t)!==void 0&&Oe(t,()=>{Xe.runFunc(i,...r)})},"setClickFun"),Oe=c(function(t,i){Qt.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){i()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){i()})})},"pushFun"),dn=c(function(t,i,n){t.split(",").forEach(function(r){un(r,i,n)}),Fe(t,"clickable")},"setClickEvent"),fn=c(function(t){Qt.forEach(function(i){i(t)})},"bindFunctions"),hn={getConfig:c(()=>dt().gantt,"getConfig"),clear:Ai,setDateFormat:Ni,getDateFormat:ji,enableInclusiveEndDates:zi,endDatesAreInclusive:Pi,enableTopAxis:Vi,topAxisEnabled:Ri,setAxisFormat:$i,getAxisFormat:Yi,setTickInterval:Li,getTickInterval:Fi,setTodayMarker:Oi,getTodayMarker:Wi,setAccTitle:Re,getAccTitle:Ve,setDiagramTitle:Pe,getDiagramTitle:ze,setDisplayMode:Hi,getDisplayMode:Bi,setAccDescription:Ne,getAccDescription:We,addSection:Qi,getSections:Ki,getTasks:Ji,addTask:on,findTaskById:ct,addTaskOrg:cn,setIncludes:Gi,getIncludes:Xi,setExcludes:qi,getExcludes:Ui,setClickEvent:dn,setLink:ln,getLinks:Zi,bindFunctions:fn,parseDuration:$e,isInvalidDate:Ie,setWeekday:tn,getWeekday:en,setWeekend:nn};function te(t,i,n){let r=!0;for(;r;)r=!1,n.forEach(function(a){const f="^\\s*"+a+"\\s*$",d=new RegExp(f);t[0].match(d)&&(i[a]=!0,t.shift(1),r=!0)})}c(te,"getTaskTags");X.extend(Ei);var mn=c(function(){ot.debug("Something is calling, setConf, remove the call")},"setConf"),fe={monday:ni,tuesday:ii,wednesday:ei,thursday:ti,friday:Je,saturday:Ke,sunday:Qe},kn=c((t,i)=>{let n=[...t].map(()=>-1/0),r=[...t].sort((f,d)=>f.startTime-d.startTime||f.order-d.order),a=0;for(const f of r)for(let d=0;d<n.length;d++)if(f.startTime>=n[d]){n[d]=f.endTime,f.order=d+i,d>a&&(a=d);break}return a},"getMaxIntersections"),it,Nt=1e4,yn=c(function(t,i,n,r){const a=dt().gantt,f=dt().securityLevel;let d;f==="sandbox"&&(d=Tt("#i"+i));const T=f==="sandbox"?Tt(d.nodes()[0].contentDocument.body):Tt("body"),E=f==="sandbox"?d.nodes()[0].contentDocument:document,$=E.getElementById(i);it=$.parentElement.offsetWidth,it===void 0&&(it=1200),a.useWidth!==void 0&&(it=a.useWidth);const b=r.db.getTasks();let F=[];for(const u of b)F.push(u.type);F=h(F);const C={};let D=2*a.topPadding;if(r.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const u={};for(const v of b)u[v.section]===void 0?u[v.section]=[v]:u[v.section].push(v);let x=0;for(const v of Object.keys(u)){const k=kn(u[v],x)+1;x+=k,D+=k*(a.barHeight+a.barGap),C[v]=k}}else{D+=b.length*(a.barHeight+a.barGap);for(const u of F)C[u]=b.filter(x=>x.type===u).length}$.setAttribute("viewBox","0 0 "+it+" "+D);const V=T.select(`[id="${i}"]`),I=qe().domain([Ue(b,function(u){return u.startTime}),Ze(b,function(u){return u.endTime})]).rangeRound([0,it-a.leftPadding-a.rightPadding]);function S(u,x){const v=u.startTime,k=x.startTime;let m=0;return v>k?m=1:v<k&&(m=-1),m}c(S,"taskCompare"),b.sort(S),M(b,it,D),He(V,D,it,a.useMaxWidth),V.append("text").text(r.db.getDiagramTitle()).attr("x",it/2).attr("y",a.titleTopMargin).attr("class","titleText");function M(u,x,v){const k=a.barHeight,m=k+a.barGap,o=a.topPadding,l=a.leftPadding,y=ri().domain([0,F.length]).range(["#00B9FA","#F95002"]).interpolate(Ti);L(m,o,l,x,v,u,r.db.getExcludes(),r.db.getIncludes()),H(l,o,x,v),W(u,m,o,l,k,y,x),A(m,o),p(l,o,x,v)}c(M,"makeGantt");function W(u,x,v,k,m,o,l){u.sort((e,_)=>e.vert===_.vert?0:e.vert?1:-1);const g=[...new Set(u.map(e=>e.order))].map(e=>u.find(_=>_.order===e));V.append("g").selectAll("rect").data(g).enter().append("rect").attr("x",0).attr("y",function(e,_){return _=e.order,_*x+v-2}).attr("width",function(){return l-a.rightPadding/2}).attr("height",x).attr("class",function(e){for(const[_,z]of F.entries())if(e.type===z)return"section section"+_%a.numberSectionStyles;return"section section0"}).enter();const w=V.append("g").selectAll("rect").data(u).enter(),s=r.db.getLinks();if(w.append("rect").attr("id",function(e){return e.id}).attr("rx",3).attr("ry",3).attr("x",function(e){return e.milestone?I(e.startTime)+k+.5*(I(e.endTime)-I(e.startTime))-.5*m:I(e.startTime)+k}).attr("y",function(e,_){return _=e.order,e.vert?a.gridLineStartPadding:_*x+v}).attr("width",function(e){return e.milestone?m:e.vert?.08*m:I(e.renderEndTime||e.endTime)-I(e.startTime)}).attr("height",function(e){return e.vert?b.length*(a.barHeight+a.barGap)+a.barHeight*2:m}).attr("transform-origin",function(e,_){return _=e.order,(I(e.startTime)+k+.5*(I(e.endTime)-I(e.startTime))).toString()+"px "+(_*x+v+.5*m).toString()+"px"}).attr("class",function(e){const _="task";let z="";e.classes.length>0&&(z=e.classes.join(" "));let N=0;for(const[G,Y]of F.entries())e.type===Y&&(N=G%a.numberSectionStyles);let O="";return e.active?e.crit?O+=" activeCrit":O=" active":e.done?e.crit?O=" doneCrit":O=" done":e.crit&&(O+=" crit"),O.length===0&&(O=" task"),e.milestone&&(O=" milestone "+O),e.vert&&(O=" vert "+O),O+=N,O+=" "+z,_+O}),w.append("text").attr("id",function(e){return e.id+"-text"}).text(function(e){return e.task}).attr("font-size",a.fontSize).attr("x",function(e){let _=I(e.startTime),z=I(e.renderEndTime||e.endTime);if(e.milestone&&(_+=.5*(I(e.endTime)-I(e.startTime))-.5*m,z=_+m),e.vert)return I(e.startTime)+k;const N=this.getBBox().width;return N>z-_?z+N+1.5*a.leftPadding>l?_+k-5:z+k+5:(z-_)/2+_+k}).attr("y",function(e,_){return e.vert?a.gridLineStartPadding+b.length*(a.barHeight+a.barGap)+60:(_=e.order,_*x+a.barHeight/2+(a.fontSize/2-2)+v)}).attr("text-height",m).attr("class",function(e){const _=I(e.startTime);let z=I(e.endTime);e.milestone&&(z=_+m);const N=this.getBBox().width;let O="";e.classes.length>0&&(O=e.classes.join(" "));let G=0;for(const[Q,rt]of F.entries())e.type===rt&&(G=Q%a.numberSectionStyles);let Y="";return e.active&&(e.crit?Y="activeCritText"+G:Y="activeText"+G),e.done?e.crit?Y=Y+" doneCritText"+G:Y=Y+" doneText"+G:e.crit&&(Y=Y+" critText"+G),e.milestone&&(Y+=" milestoneText"),e.vert&&(Y+=" vertText"),N>z-_?z+N+1.5*a.leftPadding>l?O+" taskTextOutsideLeft taskTextOutside"+G+" "+Y:O+" taskTextOutsideRight taskTextOutside"+G+" "+Y+" width-"+N:O+" taskText taskText"+G+" "+Y+" width-"+N}),dt().securityLevel==="sandbox"){let e;e=Tt("#i"+i);const _=e.nodes()[0].contentDocument;w.filter(function(z){return s.has(z.id)}).each(function(z){var N=_.querySelector("#"+z.id),O=_.querySelector("#"+z.id+"-text");const G=N.parentNode;var Y=_.createElement("a");Y.setAttribute("xlink:href",s.get(z.id)),Y.setAttribute("target","_top"),G.appendChild(Y),Y.appendChild(N),Y.appendChild(O)})}}c(W,"drawRects");function L(u,x,v,k,m,o,l,y){if(l.length===0&&y.length===0)return;let g,w;for(const{startTime:N,endTime:O}of o)(g===void 0||N<g)&&(g=N),(w===void 0||O>w)&&(w=O);if(!g||!w)return;if(X(w).diff(X(g),"year")>5){ot.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const s=r.db.getDateFormat(),P=[];let e=null,_=X(g);for(;_.valueOf()<=w;)r.db.isInvalidDate(_,s,l,y)?e?e.end=_:e={start:_,end:_}:e&&(P.push(e),e=null),_=_.add(1,"d");V.append("g").selectAll("rect").data(P).enter().append("rect").attr("id",N=>"exclude-"+N.start.format("YYYY-MM-DD")).attr("x",N=>I(N.start.startOf("day"))+v).attr("y",a.gridLineStartPadding).attr("width",N=>I(N.end.endOf("day"))-I(N.start.startOf("day"))).attr("height",m-x-a.gridLineStartPadding).attr("transform-origin",function(N,O){return(I(N.start)+v+.5*(I(N.end)-I(N.start))).toString()+"px "+(O*u+.5*m).toString()+"px"}).attr("class","exclude-range")}c(L,"drawExcludeDays");function R(u,x,v,k){if(v<=0||u>x)return 1/0;const m=x-u,o=X.duration({[k??"day"]:v}).asMilliseconds();return o<=0?1/0:Math.ceil(m/o)}c(R,"getEstimatedTickCount");function H(u,x,v,k){const m=r.db.getDateFormat(),o=r.db.getAxisFormat();let l;o?l=o:m==="D"?l="%d":l=a.axisFormat??"%Y-%m-%d";let y=mi(I).tickSize(-k+x+a.gridLineStartPadding).tickFormat(ie(l));const w=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||a.tickInterval);if(w!==null){const s=parseInt(w[1],10);if(isNaN(s)||s<=0)ot.warn(`Invalid tick interval value: "${w[1]}". Skipping custom tick interval.`);else{const P=w[2],e=r.db.getWeekday()||a.weekday,_=I.domain(),z=_[0],N=_[1],O=R(z,N,s,P);if(O>Nt)ot.warn(`The tick interval "${s}${P}" would generate ${O} ticks, which exceeds the maximum allowed (${Nt}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(P){case"millisecond":y.ticks(ce.every(s));break;case"second":y.ticks(oe.every(s));break;case"minute":y.ticks(ae.every(s));break;case"hour":y.ticks(se.every(s));break;case"day":y.ticks(re.every(s));break;case"week":y.ticks(fe[e].every(s));break;case"month":y.ticks(ne.every(s));break}}}if(V.append("g").attr("class","grid").attr("transform","translate("+u+", "+(k-50)+")").call(y).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),r.db.topAxisEnabled()||a.topAxis){let s=hi(I).tickSize(-k+x+a.gridLineStartPadding).tickFormat(ie(l));if(w!==null){const P=parseInt(w[1],10);if(isNaN(P)||P<=0)ot.warn(`Invalid tick interval value: "${w[1]}". Skipping custom tick interval.`);else{const e=w[2],_=r.db.getWeekday()||a.weekday,z=I.domain(),N=z[0],O=z[1];if(R(N,O,P,e)<=Nt)switch(e){case"millisecond":s.ticks(ce.every(P));break;case"second":s.ticks(oe.every(P));break;case"minute":s.ticks(ae.every(P));break;case"hour":s.ticks(se.every(P));break;case"day":s.ticks(re.every(P));break;case"week":s.ticks(fe[_].every(P));break;case"month":s.ticks(ne.every(P));break}}}V.append("g").attr("class","grid").attr("transform","translate("+u+", "+x+")").call(s).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(H,"makeGrid");function A(u,x){let v=0;const k=Object.keys(C).map(m=>[m,C[m]]);V.append("g").selectAll("text").data(k).enter().append(function(m){const o=m[0].split(Be.lineBreakRegex),l=-(o.length-1)/2,y=E.createElementNS("http://www.w3.org/2000/svg","text");y.setAttribute("dy",l+"em");for(const[g,w]of o.entries()){const s=E.createElementNS("http://www.w3.org/2000/svg","tspan");s.setAttribute("alignment-baseline","central"),s.setAttribute("x","10"),g>0&&s.setAttribute("dy","1em"),s.textContent=w,y.appendChild(s)}return y}).attr("x",10).attr("y",function(m,o){if(o>0)for(let l=0;l<o;l++)return v+=k[o-1][1],m[1]*u/2+v*u+x;else return m[1]*u/2+x}).attr("font-size",a.sectionFontSize).attr("class",function(m){for(const[o,l]of F.entries())if(m[0]===l)return"sectionTitle sectionTitle"+o%a.numberSectionStyles;return"sectionTitle"})}c(A,"vertLabels");function p(u,x,v,k){const m=r.db.getTodayMarker();if(m==="off")return;const o=V.append("g").attr("class","today"),l=new Date,y=o.append("line");y.attr("x1",I(l)+u).attr("x2",I(l)+u).attr("y1",a.titleTopMargin).attr("y2",k-a.titleTopMargin).attr("class","today"),m!==""&&y.attr("style",m.replace(/,/g,";"))}c(p,"drawToday");function h(u){const x={},v=[];for(let k=0,m=u.length;k<m;++k)Object.prototype.hasOwnProperty.call(x,u[k])||(x[u[k]]=!0,v.push(u[k]));return v}c(h,"checkUnique")},"draw"),gn={setConf:mn,draw:yn},pn=c(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar — same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),vn=pn,Wn={parser:Ii,db:hn,renderer:gn,styles:vn};export{Wn as diagram};
