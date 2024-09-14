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
declare enum VerticalOrigin {
    TOP = 0,
    CENTER = 1,
    BOTTOM = 2
}
declare enum HorizontalOrigin {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2
}
declare class CesiumPopup {
    static VerticalOrigin: typeof VerticalOrigin;
    static HorizontalOrigin: typeof HorizontalOrigin;
    private dom;
    private viewer;
    private position;
    private isAdaptive;
    private offsetLeft;
    private offsetTop;
    private verticalOrigin;
    private horizontalOrigin;
    private defaultOptions;
    /**
     * 创建一个 CesiumPopup 实例
     */
    constructor(options: PopupOptions);
    getCesiumContainerRect(): {
        width: number;
        height: number;
    };
    /**
     * 获取弹窗的宽度
     * @returns {number} 弹窗的宽度
     */
    getWidth(): number;
    /**
     * 获取弹窗的高度
     * @returns {number} 弹窗的高度
     */
    getHeight(): number;
    /**
     * 设置弹窗位置
     * @param {Object} pos - 位置对象
     * @param {number} pos.left - 弹窗的左边距
     * @param {number} pos.top - 弹窗的上边距
     */
    setPosition(pos: {
        left: number;
        top: number;
    }): void;
    /**
     * 设置弹窗的可见性
     * @param {boolean} visible - 是否可见
     */
    setVisible(visible: boolean): void;
    /**
     * 检查弹窗是否显示
     * @returns {boolean} 是否显示
     */
    isVisible(): boolean;
    /**
     * 更新弹窗位置
     * @param {Object} position - 实体的屏幕位置
     * @param {number} position.left - 屏幕位置的左边距
     * @param {number} position.top - 屏幕位置的上边距
     */
    updatePosition(position: {
        left: number;
        top: number;
    }): void;
    /**
     * 弹窗跟随实体移动
     * @returns {Function} 返回移除监听的方法
     */
    listenPostRender(): () => void;
    /**
     * 移除监听
     */
    removePostRenderListener(): void;
}
export default CesiumPopup;
