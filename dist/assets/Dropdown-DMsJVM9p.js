import{g as l,w as t,j as c,A as p,D as u,E as n}from"./index-C_lxnCea.js";/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=l("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=l("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=l("EllipsisVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]),b=({trigger:i,items:a,align:o="right",className:d})=>{const[x,s]=t.useState(!1),r=t.useRef(null);return t.useEffect(()=>{const e=y=>{r.current&&!r.current.contains(y.target)&&s(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),c.jsxs("div",{className:"relative inline-block text-left",ref:r,children:[c.jsx("div",{onClick:()=>s(e=>!e),children:i}),c.jsx(p,{children:x&&c.jsx(u.div,{initial:{opacity:0,scale:.95,y:-5},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:-5},transition:{duration:.15},className:n("absolute z-50 mt-2 w-56 rounded-xl border border-zinc-800 bg-[#18181B] p-1.5 shadow-2xl backdrop-blur-xl",o==="right"?"right-0":"left-0",d),children:c.jsx("div",{className:"py-1",children:a.map(e=>c.jsxs("button",{disabled:e.disabled,onClick:()=>{e.onClick&&e.onClick(),s(!1)},className:n("group flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors",e.danger?"text-red-400 hover:bg-red-500/10":"text-zinc-300 hover:bg-zinc-800 hover:text-white",e.disabled&&"opacity-50 cursor-not-allowed"),children:[e.icon&&c.jsx("span",{className:"mr-2.5 h-4 w-4 text-zinc-400 group-hover:text-current",children:e.icon}),e.label]},e.id))})})})]})};export{m as C,b as D,k as E,f as a};
