import * as h from "cesium";
var l = ((e) => (e[e.TOP = 0] = "TOP", e[e.CENTER = 1] = "CENTER", e[e.BOTTOM = 2] = "BOTTOM", e))(l || {}), c = ((e) => (e[e.LEFT = 0] = "LEFT", e[e.CENTER = 1] = "CENTER", e[e.RIGHT = 2] = "RIGHT", e))(c || {});
const a = class a {
  constructor(i) {
    this.defaultOptions = { isAdaptive: !1, offsetLeft: 0, offsetTop: 0, verticalOrigin: 0, horizontalOrigin: 0 };
    const { dom: t, viewer: s, isAdaptive: n, offsetLeft: o, offsetTop: r, verticalOrigin: f, horizontalOrigin: p } = { ...this.defaultOptions, ...i };
    if (!t || !s) throw new Error("dom and viewer are required configuration options.");
    this.dom = t, this.viewer = s, this.isAdaptive = n, this.offsetLeft = o, this.offsetTop = r, this.verticalOrigin = f, this.horizontalOrigin = p, this.setVisible(!0);
  }
  getCesiumContainerRect() {
    const i = this.viewer.container.getBoundingClientRect();
    return { width: i.width, height: i.height };
  }
  getWidth() {
    return this.dom.clientWidth;
  }
  getHeight() {
    return this.dom.clientHeight;
  }
  setPosition(i) {
    const t = this.dom.style;
    t.left = `${i.left + this.offsetLeft}px`, t.top = `${i.top + this.offsetTop}px`;
  }
  setVisible(i) {
    this.dom.style.display = i ? "block" : "none";
  }
  isVisible() {
    return this.dom.style.display === "block";
  }
  updatePosition(i) {
    const t = this.getWidth(), s = this.getHeight(), n = this.getCesiumContainerRect();
    let o = i.left, r = i.top;
    switch (this.horizontalOrigin) {
      case 2:
        o -= t;
        break;
      case 1:
        o -= t / 2;
    }
    switch (this.verticalOrigin) {
      case 2:
        r -= s;
        break;
      case 1:
        r -= s / 2;
    }
    this.isAdaptive && this.horizontalOrigin != 1 && (o < 0 ? o = i.left : o + t > n.width && (o = i.left - t)), this.verticalOrigin != 1 && (r < 0 ? r = i.top : r + s > n.height && (r = i.top - s)), this.setPosition({ left: o, top: r });
  }
  bindTo(i) {
    const t = () => {
      let s = typeof i == "function" ? i() : i;
      if (!s) return;
      if (this.viewer.scene.mode === h.SceneMode.SCENE3D && !new h.EllipsoidalOccluder(h.Ellipsoid.WGS84, this.viewer.camera.position).isPointVisible(s))
        return void this.setVisible(!1);
      this.setVisible(!0);
      const n = h.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, s);
      this.updatePosition({ left: n.x, top: n.y });
    };
    return this.removePostRenderListener = () => {
      this.viewer.scene.postRender.removeEventListener(t);
    }, t(), this.removePostRenderListener(), this.viewer.scene.postRender.addEventListener(t), this.removePostRenderListener;
  }
  removePostRenderListener() {
  }
  destroy() {
    this.removePostRenderListener();
  }
};
a.VerticalOrigin = l, a.HorizontalOrigin = c;
let d = a;
export {
  d as default
};
