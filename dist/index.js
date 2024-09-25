import * as l from "cesium";
var f = /* @__PURE__ */ ((i) => (i[i.TOP = 0] = "TOP", i[i.CENTER = 1] = "CENTER", i[i.BOTTOM = 2] = "BOTTOM", i))(f || {}), a = /* @__PURE__ */ ((i) => (i[i.LEFT = 0] = "LEFT", i[i.CENTER = 1] = "CENTER", i[i.RIGHT = 2] = "RIGHT", i))(a || {});
const h = class h {
  /**
   * 创建一个 CesiumPopup 实例
   */
  constructor(e) {
    this.defaultOptions = {
      isAdaptive: !1,
      offsetLeft: 0,
      offsetTop: 0,
      verticalOrigin: 0,
      horizontalOrigin: 0
      /* LEFT */
    };
    const {
      dom: t,
      viewer: r,
      isAdaptive: n,
      offsetLeft: s,
      offsetTop: o,
      verticalOrigin: c,
      horizontalOrigin: v
    } = { ...this.defaultOptions, ...e };
    if (!t || !r)
      throw new Error("dom and viewer are required configuration options.");
    this.dom = t, this.viewer = r, this.isAdaptive = n, this.offsetLeft = s, this.offsetTop = o, this.verticalOrigin = c, this.horizontalOrigin = v, this.setVisible(!0);
  }
  // 使用 getBoundingClientRect 获取元素尺寸
  getCesiumContainerRect() {
    const e = this.viewer.container.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height
    };
  }
  /**
   * 获取弹窗的宽度
   * @returns {number} 弹窗的宽度
   */
  getWidth() {
    return this.dom.clientWidth;
  }
  /**
   * 获取弹窗的高度
   * @returns {number} 弹窗的高度
   */
  getHeight() {
    return this.dom.clientHeight;
  }
  /**
   * 设置弹窗位置
   * @param {Object} pos - 位置对象
   * @param {number} pos.left - 弹窗的左边距
   * @param {number} pos.top - 弹窗的上边距
   */
  setPosition(e) {
    const t = this.dom.style;
    t.left = `${e.left + this.offsetLeft}px`, t.top = `${e.top + this.offsetTop}px`;
  }
  /**
   * 设置弹窗的可见性
   * @param {boolean} visible - 是否可见
   */
  setVisible(e) {
    const t = this.dom.style;
    t.display = e ? "block" : "none";
  }
  /**
   * 检查弹窗是否显示
   * @returns {boolean} 是否显示
   */
  isVisible() {
    return this.dom.style.display === "block";
  }
  /**
   * 更新弹窗位置
   * @param {Object} position - 实体的屏幕位置
   * @param {number} position.left - 屏幕位置的左边距
   * @param {number} position.top - 屏幕位置的上边距
   */
  updatePosition(e) {
    const t = this.getWidth(), r = this.getHeight(), n = this.getCesiumContainerRect();
    let s = e.left, o = e.top;
    switch (this.horizontalOrigin) {
      case 2:
        s -= t;
        break;
      case 1:
        s -= t / 2;
        break;
    }
    switch (this.verticalOrigin) {
      case 2:
        o -= r;
        break;
      case 1:
        o -= r / 2;
        break;
    }
    this.isAdaptive && this.horizontalOrigin != 1 && (s < 0 ? s = e.left : s + t > n.width && (s = e.left - t)), this.verticalOrigin != 1 && (o < 0 ? o = e.top : o + r > n.height && (o = e.top - r)), this.setPosition({ left: s, top: o });
  }
  /**
   * 弹窗跟随实体移动
   * @returns {Function} 返回移除监听的方法
   */
  bindTo(e) {
    const t = () => {
      let r = typeof e == "function" ? e() : e;
      if (!r) return;
      if (!new l.EllipsoidalOccluder(
        l.Ellipsoid.WGS84,
        this.viewer.camera.position
      ).isPointVisible(r)) {
        this.setVisible(!1);
        return;
      }
      this.setVisible(!0);
      const s = l.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        r
      );
      this.updatePosition({
        left: s.x,
        top: s.y
      });
    };
    return this.removePostRenderListener = () => {
      this.viewer.scene.postRender.removeEventListener(t);
    }, t(), this.removePostRenderListener(), this.viewer.scene.postRender.addEventListener(t), this.removePostRenderListener;
  }
  /**
   * 移除监听 
   */
  removePostRenderListener() {
  }
  destroy() {
    this.removePostRenderListener();
  }
};
h.VerticalOrigin = f, h.HorizontalOrigin = a;
let d = h;
export {
  d as default
};
