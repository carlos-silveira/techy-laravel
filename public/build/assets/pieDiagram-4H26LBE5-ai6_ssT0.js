import{N as e,P as t,y as n}from"./step-C3Xppo8A.js";import{t as r}from"./mermaid-parser.core-C70Iqae9.js";import{i,r as a}from"./src-Bm9ytCDs.js";import{H as o,K as s,U as c,a as l,c as u,f as d,v as f,w as p,x as m,y as h}from"./chunk-CSCIHK7Q-BbIW3zMi.js";import{n as g}from"./ordinal-BeZAVUpG.js";import{t as _}from"./arc-Bk6Mkj0W.js";import{i as v,p as y}from"./chunk-5ZQYHXKU-DwcCg50z.js";import{t as b}from"./chunk-WU5MYG2G-C7QjetGW.js";import{t as x}from"./chunk-4BX2VUAB-CLJsdDT_.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var r=C,i=S,a=null,o=t(0),s=t(e),c=t(0);function l(t){var l,u=(t=n(t)).length,d,f,p=0,m=Array(u),h=Array(u),g=+o.apply(this,arguments),_=Math.min(e,Math.max(-e,s.apply(this,arguments)-g)),v,y=Math.min(Math.abs(_)/u,c.apply(this,arguments)),b=y*(_<0?-1:1),x;for(l=0;l<u;++l)(x=h[m[l]=l]=+r(t[l],l,t))>0&&(p+=x);for(i==null?a!=null&&m.sort(function(e,n){return a(t[e],t[n])}):m.sort(function(e,t){return i(h[e],h[t])}),l=0,f=p?(_-u*b)/p:0;l<u;++l,g=v)d=m[l],x=h[d],v=g+(x>0?x*f:0)+b,h[d]={data:t[d],index:l,value:x,startAngle:g,endAngle:v,padAngle:y};return h}return l.value=function(e){return arguments.length?(r=typeof e==`function`?e:t(+e),l):r},l.sortValues=function(e){return arguments.length?(i=e,a=null,l):i},l.sort=function(e){return arguments.length?(a=e,i=null,l):a},l.startAngle=function(e){return arguments.length?(o=typeof e==`function`?e:t(+e),l):o},l.endAngle=function(e){return arguments.length?(s=typeof e==`function`?e:t(+e),l):s},l.padAngle=function(e){return arguments.length?(c=typeof e==`function`?e:t(+e),l):c},l}var T=d.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:a(()=>structuredClone(k),`getConfig`),clear:a(()=>{D=new Map,O=E.showData,l()},`clear`),setDiagramTitle:s,getDiagramTitle:p,setAccTitle:c,getAccTitle:h,setAccDescription:o,getAccDescription:f,addSection:a(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),i.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:a(()=>D,`getSections`),setShowData:a(e=>{O=e},`setShowData`),getShowData:a(()=>O,`getShowData`)},j=a((e,t)=>{x(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:a(async e=>{let t=await r(`pie`,e);i.debug(t),j(t,A)},`parse`)},N=a(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=a(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return w().value(e=>e.value).sort(null)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:a((e,t,n,r)=>{i.debug(`rendering pie chart
`+e);let a=r.db,o=m(),s=v(a.getConfig(),o.pie),c=b(t),l=c.append(`g`);l.attr(`transform`,`translate(225,225)`);let{themeVariables:d}=o,[f]=y(d.pieOuterStrokeWidth);f??=2;let p=s.textPosition,h=_().innerRadius(0).outerRadius(185),x=_().innerRadius(185*p).outerRadius(185*p);l.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+f/2).attr(`class`,`pieOuterCircle`);let S=a.getSections(),C=P(S),w=[d.pie1,d.pie2,d.pie3,d.pie4,d.pie5,d.pie6,d.pie7,d.pie8,d.pie9,d.pie10,d.pie11,d.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=g(w).domain([...S.keys()]);l.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,h).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),l.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=l.append(`text`).text(a.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),k=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=l.selectAll(`.legend`).data(k).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*k.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>a.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),M=O.node()?.getBoundingClientRect().width??0,N=450/2-M/2,F=450/2+M/2,I=Math.min(0,N),L=Math.max(j,F)-I;c.attr(`viewBox`,`${I} 0 ${L} 450`),u(c,450,L,s.useMaxWidth)},`draw`)},styles:N};export{F as diagram};