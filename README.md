# cesium-popup-ts

#### 介绍
基于cesium开发的一个自定义弹窗类。传入HTML元素和坐标点position即可使用。弹窗位置跟随坐标点实时更新。可以自定义弹窗相对坐标点的位置、偏移量等，可以配置弹窗自适应，尽量让弹窗显示在cesium容器内。


#### 安装教程

1. `npm i cesium-popup-ts`


#### 使用说明



## 配置项options说明

| **选项**          | **类型**                                       | **默认值**           | **描述**                                                                 | **备注**                                                           |
|-------------------|----------------------------------------------|----------------------|------------------------------------------------------------------------|--------------------------------------------------------------------|
| `dom`             | `HTMLElement`                                | 无                   | 弹窗的 DOM 元素，必须提供此元素来作为弹窗的内容。                                 | 必选项                                                             |
| `viewer`          | `Cesium.Viewer`                              | 无                   | Cesium 的 `Viewer` 实例，用于关联 Cesium 场景。                                | 必选项                                                             |
置。                                     | 必选项                                                             |
| `isAdaptive`      | `boolean`                                    | `false`              | 是否自适应弹窗大小。                                                     | 可选项，设置为 `true` 时，弹窗自动调整大小以适应内容。                            |
| `offsetLeft`      | `number`                                     | `0`                  | 弹窗相对于指定位置的水平偏移量，单位为像素。                                        | 可选项                                                             |
| `offsetTop`       | `number`                                     | `0`                  | 弹窗相对于指定位置的垂直偏移量，单位为像素。                                        | 可选项                                                             |
| `verticalOrigin`  | `VerticalOrigin` (`TOP`, `CENTER`, `BOTTOM`)  | `VerticalOrigin.TOP` | 弹窗相对于位置的垂直对齐方式。                                              | 可选项，可选值包括 `VerticalOrigin.TOP`, `CENTER`, `BOTTOM`。        |
| `horizontalOrigin`| `HorizontalOrigin` (`LEFT`, `CENTER`, `RIGHT`)| `HorizontalOrigin.LEFT`| 弹窗相对于位置的水平对齐方式。                                              | 可选项，可选值包括 `HorizontalOrigin.LEFT`, `CENTER`, `RIGHT`。      |

## 使用示例

```ts
const popup = new CesiumPopup({
  dom: document.getElementById('popup'),
  viewer: cesiumViewer,
  isAdaptive: true,
  offsetLeft: 10,
  offsetTop: 20,
  verticalOrigin: CesiumPopup.VerticalOrigin.BOTTOM,
  horizontalOrigin: CesiumPopup.HorizontalOrigin.RIGHT
});
popup.bindTo(new Cesium.Cartesian3(12, 34, 56789));
```



#### 完整示例代码
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <!-- Include the CesiumJS JavaScript and CSS files -->
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Cesium.js"></script>
    <link href="https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Widgets/widgets.css" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        #cesiumContainer {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }

        #myPopup {
            width: 200px;
            height: auto;
            background: #78728483;
            position: absolute;
            padding: 10px;
            border: 1px solid #000;
            border-radius: 3px;
            color: whitesmoke;
            top: 0;
            left: 0;
            z-index: 1;

            img {
                margin-top: 10px;
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <div id="cesiumContainer">
        <div id="myPopup">
            <h2>cesium-popup</h2>
            <p>基于cesium开发的一个自定义弹窗类。</p>
            <img src="./assets/lyy.jpg" alt="">
        </div>
    </div>
    <script type="module">
        // import  CesiumPopup  from "../dist/index.js";
        // 导入cesium-popup-ts依赖
        import CesiumPopup from "./node_modules/cesium-popup-ts/dist/index.js"
        
        Cesium.Ion.defaultAccessToken = 'your-token';

        const viewer = new Cesium.Viewer('cesiumContainer', {
        });
        

        const cartesian3 = Cesium.Cartesian3.fromDegrees(12, 20, 10);
        
        let entity = viewer.entities.add({
            position: cartesian3,
            point: {
                pixelSize: 14,
                color: Cesium.Color.RED,
            },
        })

        const popupDom = document.getElementById("myPopup");
        
        // 创建一个popup实例
        const cesiumPopup = new CesiumPopup({
            viewer: viewer,
            dom: popupDom,
            verticalOrigin: CesiumPopup.VerticalOrigin.TOP,
            horizontalOrigin: CesiumPopup.HorizontalOrigin.LEFT,
            isAdaptive: true,
        });

        // 监听cesium的postRender事件
        cesiumPopup.bindTo(cartesian3);


        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(12, 20, 3456789),
            orientation: {
                heading: Cesium.Math.toRadians(360), //方向
                pitch: Cesium.Math.toRadians(-90), //俯仰角
                roll: Cesium.Math.toRadians(0),
            },
        });

    </script>
    </div>
</body>

</html>

```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


