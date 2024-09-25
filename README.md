<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 李中华
 * @Date: 2024-09-14 16:03:11
 * @LastEditTime: 2024-09-25 16:48:23
-->
# cesium-popup-ts

#### 介绍

基于 cesium 开发的一个自定义弹窗类。传入 HTML 元素和坐标点 position 即可使用。弹窗位置跟随坐标点实时更新。可以自定义弹窗相对坐标点的位置、偏移量等，可以配置弹窗自适应，尽量让弹窗显示在 cesium 容器内。

#### 安装教程

1. `npm i cesium-popup-ts`

#### 使用说明

## 配置项 options 说明

| **选项**           | **类型**                                       | **默认值**              | **描述**                                          | **备注**                                                        |
| ------------------ | ---------------------------------------------- | ----------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| `dom`              | `HTMLElement`                                  | 无                      | 弹窗的 DOM 元素，必须提供此元素来作为弹窗的内容。 | 必选项                                                          |
| `viewer`           | `Cesium.Viewer`                                | 无                      | Cesium 的 `Viewer` 实例，用于关联 Cesium 场景。   | 必选项                                                          |
| 置。               | 必选项                                         |
| `isAdaptive`       | `boolean`                                      | `false`                 | 是否自适应弹窗大小。                              | 可选项，设置为 `true` 时，弹窗自动调整大小以适应内容。          |
| `offsetLeft`       | `number`                                       | `0`                     | 弹窗相对于指定位置的水平偏移量，单位为像素。      | 可选项                                                          |
| `offsetTop`        | `number`                                       | `0`                     | 弹窗相对于指定位置的垂直偏移量，单位为像素。      | 可选项                                                          |
| `verticalOrigin`   | `VerticalOrigin` (`TOP`, `CENTER`, `BOTTOM`)   | `VerticalOrigin.TOP`    | 弹窗相对于位置的垂直对齐方式。                    | 可选项，可选值包括 `VerticalOrigin.TOP`, `CENTER`, `BOTTOM`。   |
| `horizontalOrigin` | `HorizontalOrigin` (`LEFT`, `CENTER`, `RIGHT`) | `HorizontalOrigin.LEFT` | 弹窗相对于位置的水平对齐方式。                    | 可选项，可选值包括 `HorizontalOrigin.LEFT`, `CENTER`, `RIGHT`。 |

## 使用示例

- ES 模块

```ts
import { CesiumPopup } from "cesium-popup-ts";
const popup = new CesiumPopup({
  dom: document.getElementById("popup"),
  viewer: cesiumViewer,
  isAdaptive: true,
  offsetLeft: 10,
  offsetTop: 20,
  verticalOrigin: CesiumPopup.VerticalOrigin.BOTTOM,
  horizontalOrigin: CesiumPopup.HorizontalOrigin.RIGHT,
});
popup.bindTo(new Cesium.Cartesian3(12, 34, 56789));
```

- UMD 模块

```html
<script src="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Cesium.js"></script>
<link
  href="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Widgets/widgets.css"
  rel="stylesheet"
/>
<script src="../dist/index.umd.cjs"></script>
<script type="module">
  const popup = new CesiumPopup({
    dom: document.getElementById("popup"),
    viewer: cesiumViewer,
    isAdaptive: true,
    offsetLeft: 10,
    offsetTop: 20,
    verticalOrigin: CesiumPopup.VerticalOrigin.BOTTOM,
    horizontalOrigin: CesiumPopup.HorizontalOrigin.RIGHT,
  });
  popup.bindTo(new Cesium.Cartesian3(12, 34, 56789));
</script>
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
