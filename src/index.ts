/**
 * @Descripttion: 封装了Cesium跟随移动的弹窗
 * @version: 1.0.0
 * @Author: 李中华
 * @Date: 2024-05-28 23:14:36
 * @LastEditTime: 2024-06-05 16:50:55
 */


interface PopupOptions {
  dom: HTMLElement;
  viewer: Cesium.Viewer;
  position: Cesium.Cartesian3 | (() => Cesium.Cartesian3);
  verticalOrigin: VerticalOrigin;
  horizontalOrigin: HorizontalOrigin;
  isAdaptive: boolean;
  offsetLeft: number;
  offsetTop: number;

}
enum VerticalOrigin {
  TOP,
  CENTER,
  BOTTOM,
}

enum HorizontalOrigin {
  LEFT,
  CENTER,
  RIGHT,
}


class CesiumPopup {
  static VerticalOrigin = VerticalOrigin;
  static HorizontalOrigin = HorizontalOrigin;

  private dom: HTMLElement;
  private viewer: Cesium.Viewer;
  private position: Cesium.Cartesian3 | (() => Cesium.Cartesian3);
  private isAdaptive: boolean;
  private offsetLeft: number;
  private offsetTop: number;
  private verticalOrigin: VerticalOrigin;
  private horizontalOrigin: HorizontalOrigin;

  private defaultOptions = {
    isAdaptive: false,
    offsetLeft: 0,
    offsetTop: 0,
    verticalOrigin: VerticalOrigin.TOP,
    horizontalOrigin: HorizontalOrigin.LEFT,
  };
  /**
   * 创建一个 CesiumPopup 实例
   */
  constructor(options: PopupOptions) {
    const {
      dom,
      viewer,
      position,
      isAdaptive,
      offsetLeft,
      offsetTop,
      verticalOrigin,
      horizontalOrigin,
    } = { ...this.defaultOptions, ...options };

    if (!dom || !viewer || !position) {
      throw new Error("dom, viewer, and position are required configuration options.");
    }

    this.dom = dom;
    this.viewer = viewer;
    this.position = position;
    this.isAdaptive = isAdaptive;
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.verticalOrigin = verticalOrigin;
    this.horizontalOrigin = horizontalOrigin;

    this.setVisible(true)
  }

  // 使用 getBoundingClientRect 获取元素尺寸
  getCesiumContainerRect(): { width: number; height: number } {
    const rect = this.viewer.container.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  }


  /**
   * 获取弹窗的宽度
   * @returns {number} 弹窗的宽度
   */
  getWidth(): number {
    return this.dom.clientWidth;
  }

  /**
   * 获取弹窗的高度
   * @returns {number} 弹窗的高度
   */
  getHeight(): number {
    return this.dom.clientHeight;
  }

  /**
   * 设置弹窗位置
   * @param {Object} pos - 位置对象
   * @param {number} pos.left - 弹窗的左边距
   * @param {number} pos.top - 弹窗的上边距
   */
  setPosition(pos: { left: number; top: number }) {
    const elStyle = this.dom.style;
    elStyle.left = `${pos.left + this.offsetLeft}px`;
    elStyle.top = `${pos.top + this.offsetTop}px`;
  }

  /**
   * 设置弹窗的可见性
   * @param {boolean} visible - 是否可见
   */
  setVisible(visible: boolean) {
    const elStyle = this.dom.style;
    elStyle.display = visible ? 'block' : 'none';
  }

  /**
   * 检查弹窗是否显示
   * @returns {boolean} 是否显示
   */
  isVisible(): boolean {
    return this.dom.style.display === 'block';
  }

  /**
   * 更新弹窗位置
   * @param {Object} position - 实体的屏幕位置
   * @param {number} position.left - 屏幕位置的左边距
   * @param {number} position.top - 屏幕位置的上边距
   */
  updatePosition(position: { left: number; top: number }) {
    const elWidth = this.getWidth();
    const elHeight = this.getHeight();
    const containerRect = this.getCesiumContainerRect();
    let left = position.left;
    let top = position.top;


    // 根据垂直和水平 Origin 来调整弹窗的位置
    switch (this.horizontalOrigin) {
      case HorizontalOrigin.RIGHT:
        left -= elWidth;
        break;
      case HorizontalOrigin.CENTER:
        left -= elWidth / 2;
        break;
      case HorizontalOrigin.LEFT:
      default:
        break;
    }

    switch (this.verticalOrigin) {
      case VerticalOrigin.BOTTOM:
        top -= elHeight;
        break;
      case VerticalOrigin.CENTER:
        top -= elHeight / 2;
        break;
      case VerticalOrigin.TOP:
      default:
        break;
    }

    // 弹窗位置自适应，超出cesium容器时翻转，居中情况下不翻转
    if (this.isAdaptive)

      if (this.horizontalOrigin != HorizontalOrigin.CENTER) {
        // 翻转水平位置
        if (left < 0) {
          left = position.left; // 翻转到右侧
        } else if (left + elWidth > containerRect.width) {
          left = position.left - elWidth; // 翻转到左侧
        }
      }

    if (this.verticalOrigin != VerticalOrigin.CENTER) {
      // 翻转垂直位置
      if (top < 0) {
        top = position.top; // 翻转到下方
      } else if (top + elHeight > containerRect.height) {
        top = position.top - elHeight; // 翻转到上方
      }
    }
    
    // 设置弹窗位置
    this.setPosition({ left, top });
  }

  /**
   * 弹窗跟随实体移动
   * @returns {Function} 返回移除监听的方法
   */
  listenPostRender(): () => void {
    // 在外部定义 handlePostRender 函数以便能够移除监听
    const handlePostRender = () => {
      console.log("handlePostRender")
      // 通过函数获取cartesian3
      let position = typeof this.position === 'function' ? this.position() : this.position;
      // 如果位置未定义，则不往下执行
      if (!position) return;

      // 判断实体是否在地球背面
      const isVisible: Boolean = new Cesium.EllipsoidalOccluder(
        Cesium.Ellipsoid.WGS84,
        this.viewer.camera.position,
      ).isPointVisible(position);

      // 如果实体在地球背面，则隐藏弹窗，不往下执行
      if (!isVisible) {
        this.setVisible(false);
        return;
      }

      this.setVisible(true);

      // 将位置转换为屏幕坐标
      const windowPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        position,
      );
      // 更新弹窗位置
      this.updatePosition({
        left: windowPos.x,
        top: windowPos.y,
      });

    };

    // 移除监听的方法
    this.removePostRenderListener = () => {
      this.viewer.scene.postRender.removeEventListener(handlePostRender);
    };

    // 先更新位置
    handlePostRender();
    // 移除之前的监听
    this.removePostRenderListener();
    // 添加事件监听
    this.viewer.scene.postRender.addEventListener(handlePostRender);
    // 返回移除监听的方法
    return this.removePostRenderListener;
  }

  /**
   * 移除监听 
   */
  removePostRenderListener() { }

}

export default CesiumPopup;
