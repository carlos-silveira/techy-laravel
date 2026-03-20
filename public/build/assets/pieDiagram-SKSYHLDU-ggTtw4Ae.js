import{a0 as S,a3 as z,aJ as j,g as q,s as J,a as Z,b as H,q as K,p as Q,_ as u,l as F,c as X,E as Y,I as tt,N as et,e as at,z as rt,F as nt}from"./ArticleShow-1oaOpyvJ.js";import{p as it}from"./chunk-4BX2VUAB-DWrqBwn3.js";import{p as st}from"./treemap-KZPCXAKY-BD942Gm-.js";import{d as R}from"./arc-c_O7ayAI.js";import{o as ot}from"./ordinal-Cboi1Yqb.js";import"./app-CftFpuZG.js";import"./CommandPalette-kX-KuFiS.js";import"./ThemeToggle-E13whucS.js";import"./createLucideIcon-DlSM4TGb.js";import"./search-BkQYBEtH.js";import"./Navbar-CAj1tEnG.js";import"./zap-8VyNfFNL.js";import"./linkedin-NlnxXNWC.js";import"./_baseUniq-BlK_9tcM.js";import"./_basePickBy-DFZbECQq.js";import"./clone-ByEI5y99.js";import"./init-Gi6I4Gst.js";function lt(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ct(t){return t}function pt(){var t=ct,a=lt,f=null,x=S(0),s=S(z),l=S(0);function o(e){var n,c=(e=j(e)).length,d,y,h=0,p=new Array(c),i=new Array(c),v=+x.apply(this,arguments),w=Math.min(z,Math.max(-z,s.apply(this,arguments)-v)),m,C=Math.min(Math.abs(w)/c,l.apply(this,arguments)),$=C*(w<0?-1:1),g;for(n=0;n<c;++n)(g=i[p[n]=n]=+t(e[n],n,e))>0&&(h+=g);for(a!=null?p.sort(function(A,D){return a(i[A],i[D])}):f!=null&&p.sort(function(A,D){return f(e[A],e[D])}),n=0,y=h?(w-c*$)/h:0;n<c;++n,v=m)d=p[n],g=i[d],m=v+(g>0?g*y:0)+$,i[d]={data:e[d],index:n,value:g,startAngle:v,endAngle:m,padAngle:C};return i}return o.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),o):t},o.sortValues=function(e){return arguments.length?(a=e,f=null,o):a},o.sort=function(e){return arguments.length?(f=e,a=null,o):f},o.startAngle=function(e){return arguments.length?(x=typeof e=="function"?e:S(+e),o):x},o.endAngle=function(e){return arguments.length?(s=typeof e=="function"?e:S(+e),o):s},o.padAngle=function(e){return arguments.length?(l=typeof e=="function"?e:S(+e),o):l},o}var ut=nt.pie,N={sections:new Map,showData:!1},T=N.sections,G=N.showData,dt=structuredClone(ut),gt=u(()=>structuredClone(dt),"getConfig"),ft=u(()=>{T=new Map,G=N.showData,rt()},"clear"),mt=u(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ht=u(()=>T,"getSections"),vt=u(t=>{G=t},"setShowData"),St=u(()=>G,"getShowData"),L={getConfig:gt,clear:ft,setDiagramTitle:Q,getDiagramTitle:K,setAccTitle:H,getAccTitle:Z,setAccDescription:J,getAccDescription:q,addSection:mt,getSections:ht,setShowData:vt,getShowData:St},xt=u((t,a)=>{it(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:u(async t=>{const a=await st("pie",t);F.debug(a),xt(a,L)},"parse")},wt=u(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),At=wt,Dt=u(t=>{const a=[...t.values()].reduce((s,l)=>s+l,0),f=[...t.entries()].map(([s,l])=>({label:s,value:l})).filter(s=>s.value/a*100>=1).sort((s,l)=>l.value-s.value);return pt().value(s=>s.value)(f)},"createPieArcs"),Ct=u((t,a,f,x)=>{F.debug(`rendering pie chart
`+t);const s=x.db,l=X(),o=Y(s.getConfig(),l.pie),e=40,n=18,c=4,d=450,y=d,h=tt(a),p=h.append("g");p.attr("transform","translate("+y/2+","+d/2+")");const{themeVariables:i}=l;let[v]=et(i.pieOuterStrokeWidth);v??=2;const w=o.textPosition,m=Math.min(y,d)/2-e,C=R().innerRadius(0).outerRadius(m),$=R().innerRadius(m*w).outerRadius(m*w);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const g=s.getSections(),A=Dt(g),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let E=0;g.forEach(r=>{E+=r});const W=A.filter(r=>(r.data.value/E*100).toFixed(0)!=="0"),b=ot(D);p.selectAll("mySlices").data(W).enter().append("path").attr("d",C).attr("fill",r=>b(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(W).enter().append("text").text(r=>(r.data.value/E*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const I=[...g.entries()].map(([r,M])=>({label:r,value:M})),k=p.selectAll(".legend").data(I).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const P=n+c,B=P*I.length/2,V=12*n,U=M*P-B;return"translate("+V+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>b(r.label)).style("stroke",r=>b(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const _=Math.max(...k.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),O=y+e+n+c+_;h.attr("viewBox",`0 0 ${O} ${d}`),at(h,d,O,o.useMaxWidth)},"draw"),$t={draw:Ct},Vt={parser:yt,db:L,renderer:$t,styles:At};export{Vt as diagram};
