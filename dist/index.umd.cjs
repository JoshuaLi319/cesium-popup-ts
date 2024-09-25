(function(h,l){typeof exports=="object"&&typeof module<"u"?module.exports=l(require("cesium")):typeof define=="function"&&define.amd?define(["cesium"],l):(h=typeof globalThis<"u"?globalThis:h||self).CesiumPopup=l(h.Cesium)})(this,function(h){"use strict";function l(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const i in e)if(i!=="default"){const s=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>e[i]})}}return t.default=e,Object.freeze(t)}const c=l(h);var a=(e=>(e[e.TOP=0]="TOP",e[e.CENTER=1]="CENTER",e[e.BOTTOM=2]="BOTTOM",e))(a||{}),u=(e=>(e[e.LEFT=0]="LEFT",e[e.CENTER=1]="CENTER",e[e.RIGHT=2]="RIGHT",e))(u||{});const d=class d{constructor(t){this.defaultOptions={isAdaptive:!1,offsetLeft:0,offsetTop:0,verticalOrigin:0,horizontalOrigin:0};const{dom:i,viewer:s,isAdaptive:r,offsetLeft:o,offsetTop:n,verticalOrigin:p,horizontalOrigin:g}={...this.defaultOptions,...t};if(!i||!s)throw new Error("dom and viewer are required configuration options.");this.dom=i,this.viewer=s,this.isAdaptive=r,this.offsetLeft=o,this.offsetTop=n,this.verticalOrigin=p,this.horizontalOrigin=g,this.setVisible(!0)}getCesiumContainerRect(){const t=this.viewer.container.getBoundingClientRect();return{width:t.width,height:t.height}}getWidth(){return this.dom.clientWidth}getHeight(){return this.dom.clientHeight}setPosition(t){const i=this.dom.style;i.left=`${t.left+this.offsetLeft}px`,i.top=`${t.top+this.offsetTop}px`}setVisible(t){this.dom.style.display=t?"block":"none"}isVisible(){return this.dom.style.display==="block"}updatePosition(t){const i=this.getWidth(),s=this.getHeight(),r=this.getCesiumContainerRect();let o=t.left,n=t.top;switch(this.horizontalOrigin){case 2:o-=i;break;case 1:o-=i/2}switch(this.verticalOrigin){case 2:n-=s;break;case 1:n-=s/2}this.isAdaptive&&this.horizontalOrigin!=1&&(o<0?o=t.left:o+i>r.width&&(o=t.left-i)),this.verticalOrigin!=1&&(n<0?n=t.top:n+s>r.height&&(n=t.top-s)),this.setPosition({left:o,top:n})}bindTo(t){const i=()=>{let s=typeof t=="function"?t():t;if(!s)return;if(this.viewer.scene.mode===c.SceneMode.SCENE3D&&!new c.EllipsoidalOccluder(c.Ellipsoid.WGS84,this.viewer.camera.position).isPointVisible(s))return void this.setVisible(!1);this.setVisible(!0);const r=c.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene,s);this.updatePosition({left:r.x,top:r.y})};return this.removePostRenderListener=()=>{this.viewer.scene.postRender.removeEventListener(i)},i(),this.removePostRenderListener(),this.viewer.scene.postRender.addEventListener(i),this.removePostRenderListener}removePostRenderListener(){}destroy(){this.removePostRenderListener()}};d.VerticalOrigin=a,d.HorizontalOrigin=u;let f=d;return f});
