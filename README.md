============
http://community.topcoder.com/tc?module=ProjectDetail&pj=30042111

使用 angularjs, jQuery ,bootsrap（后面2个都没用到） 做 iphone web app

1、切图字体： 1:1 ，也就是说 psd里面写多大，样式里面就是多大，比如 psd里面是24px ，样式里面就是24px

2、view port: 写死了640大小

```ruby
<meta name="viewport" content="width=device-width, initial-scale=.5, maximum-scale=.5" />
```

参考 http://www.quirksmode.org/blog/archives/2013/10/initialscale1_m.html 这篇文章

update: 后来又参考了 https://developer.apple.com/library/iOs/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html
            这篇文章 。

viewport 写成 640，禁止缩放，这样的话，横竖屏效果强制做成一样的。

```ruby
<meta name="viewport" content="width=640, user-scalable=no">
```

3、图片background-size 不需要写；图片切成1:1大小的就行。

============
scss的配置在 confg.rb里
css 压缩用的是 Gruntfile.js

============

程序入口 : index.html


