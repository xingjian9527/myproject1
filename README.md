# 王书琪 · 个人网站

> 循此苦旅，终抵群星。

一个简洁现代的个人展示网站，包含个人名片、关于我、技能专长、经历时间线与联系方式等板块。

## 技术栈

- 纯静态站点：HTML + CSS + JavaScript（无框架、无构建依赖）
- 响应式布局：桌面端与移动端自适应
- 樱花花瓣飘落动效（Canvas 实现，尊重系统"减少动态效果"偏好）

## 目录结构

```
.
├── index.html          # 页面结构
├── css/
│   └── style.css       # 视觉样式（天青色 + 樱花粉主题）
├── js/
│   ├── main.js         # 导航折叠、滚动高亮、年份
│   └── petals.js       # 樱花花瓣飘落动效
└── assets/
    └── images/
        ├── avatar.jpg  # 头像
        └── bg.jpg      # 背景图
```

## 本地预览

```bash
cd 个人网站
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 在线访问

GitHub Pages：https://xingjian9527.github.io/myproject1/
