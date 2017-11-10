# manage-system
Blog of Weijindan

## 说明
* 1.基于Vue.js 2.x系列 + element-ui内容管理系统解决方案
* 2.借助Webpack打包部署

## 目录结构

* build: webpack配置文件
* config: 项目打包文件
* screenshots: 皮肤风格
* src: 源码文件目录
  * assets: 一些公共图片资源
  * commons: 全局常亮
  * components: 组件
    * common: 公共组件
    * page: 页面组件
  * i18n: 国际化相关
  * router: 路由
  * main.js: 入口文件
* static: 静态资源

## 执行脚本

``` bash
#安装依赖
npm install 或者 cnpm install(前提是安装有淘宝镜像:[安装说明])

#启动服务
npm run dev

#生成环境编译(代码打包)
npm run build
```
## 接口说明

