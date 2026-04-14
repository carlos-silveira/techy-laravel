import{r as s,j as h,X as D,R as j}from"./app-zmBjDdxN.js";import{M as T,d as z,P as $,k as _,u as A,L as G,c as y}from"./createLucideIcon-B3IXewLt.js";class X extends s.Component{getSnapshotBeforeUpdate(o){const e=this.props.childRef.current;if(e&&o.isPresent&&!this.props.isPresent){const t=this.props.sizeRef.current;t.height=e.offsetHeight||0,t.width=e.offsetWidth||0,t.top=e.offsetTop,t.left=e.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function q({children:n,isPresent:o}){const e=s.useId(),t=s.useRef(null),g=s.useRef({width:0,height:0,top:0,left:0}),{nonce:f}=s.useContext(T);return s.useInsertionEffect(()=>{const{width:d,height:i,top:p,left:r}=g.current;if(o||!t.current||!d||!i)return;t.current.dataset.motionPopId=e;const a=document.createElement("style");return f&&(a.nonce=f),document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${e}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${i}px !important;
            top: ${p}px !important;
            left: ${r}px !important;
          }
        `),()=>{document.head.removeChild(a)}},[o]),h.jsx(X,{isPresent:o,childRef:t,sizeRef:g,children:s.cloneElement(n,{ref:t})})}const N=({children:n,initial:o,isPresent:e,onExitComplete:t,custom:g,presenceAffectsLayout:f,mode:d})=>{const i=z(K),p=s.useId(),r=s.useCallback(u=>{i.set(u,!0);for(const x of i.values())if(!x)return;t&&t()},[i,t]),a=s.useMemo(()=>({id:p,initial:o,isPresent:e,custom:g,onExitComplete:r,register:u=>(i.set(u,!1),()=>i.delete(u))}),f?[Math.random(),r]:[e,r]);return s.useMemo(()=>{i.forEach((u,x)=>i.set(x,!1))},[e]),s.useEffect(()=>{!e&&!i.size&&t&&t()},[e]),d==="popLayout"&&(n=h.jsx(q,{isPresent:e,children:n})),h.jsx($.Provider,{value:a,children:n})};function K(){return new Map}const M=n=>n.key||"";function L(n){const o=[];return s.Children.forEach(n,e=>{s.isValidElement(e)&&o.push(e)}),o}const O=({children:n,custom:o,initial:e=!0,onExitComplete:t,presenceAffectsLayout:g=!0,mode:f="sync",propagate:d=!1})=>{const[i,p]=_(d),r=s.useMemo(()=>L(n),[n]),a=d&&!i?[]:r.map(M),u=s.useRef(!0),x=s.useRef(r),C=z(()=>new Map),[P,S]=s.useState(r),[m,b]=s.useState(r);A(()=>{u.current=!1,x.current=r;for(let l=0;l<m.length;l++){const c=M(m[l]);a.includes(c)?C.delete(c):C.get(c)!==!0&&C.set(c,!1)}},[m,a.length,a.join("-")]);const v=[];if(r!==P){let l=[...r];for(let c=0;c<m.length;c++){const k=m[c],R=M(k);a.includes(R)||(l.splice(c,0,k),v.push(k))}f==="wait"&&v.length&&(l=v),b(L(l)),S(r);return}const{forceRender:w}=s.useContext(G);return h.jsx(h.Fragment,{children:m.map(l=>{const c=M(l),k=d&&!i?!1:r===m||a.includes(c),R=()=>{if(C.has(c))C.set(c,!0);else return;let E=!0;C.forEach(I=>{I||(E=!1)}),E&&(w==null||w(),b(x.current),d&&(p==null||p()),t&&t())};return h.jsx(N,{isPresent:k,initial:!u.current||e?void 0:!1,custom:k?void 0:o,presenceAffectsLayout:g,mode:f,onExitComplete:k?void 0:R,children:l},c)})})};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=y("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=y("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=y("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=y("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=y("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=y("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=y("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Y(){const{translations:n,locale:o}=D().props;return{__:t=>(n==null?void 0:n[t])||t,locale:o}}const ee=()=>{const[n,o]=j.useState(!1);j.useEffect(()=>{o(document.documentElement.classList.contains("dark"))},[]);const e=()=>{const t=n?"light":"dark";o(!n),t==="dark"?(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"))};return h.jsx("button",{onClick:e,className:"p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",title:n?"Switch to Light Mode":"Switch to Dark Mode",children:n?h.jsx(B,{className:"w-5 h-5"}):h.jsx(U,{className:"w-5 h-5"})})};export{O as A,Z as C,J as G,ee as T,Q as X,V as a,W as b,Y as u};
