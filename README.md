# 贪吃蛇练习

## 启动项目

```
npm run start
```

## 访问链接

```
localhost:8080
```

## 打包项目

```
npm run build
```

## 使用electron创建exe程序

使用前需要配置electron环境

1. 在src同目录下引入ele_main.js和preload.js文件

2. 在package.json中引入electron和electron-packager

3. 在package.json中添加

   "packager": "electron-packager ./ App --platform=win32 --arch=x64 --electron-version=18.0.4 --asar --ignore=node_modules --overwrite"

4. package.json中的main替换成ele_main.js

5. 执行以下命令

```
npm run packager
```

## electron相关问题

如果electron下载或打包慢，可以配置electron镜像地址

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

