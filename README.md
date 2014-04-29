go-Mnemosyne
============
http://community.topcoder.com/tc?module=ProjectDetail&pj=30042111

使用 angularjs, jQuery ,bootsrap 做iphone web app

1、切图字体： 1:1 ，也就是说 psd里面写多大，样式里面就是多大，比如 psd里面是24px ，样式里面就是24px

2、view port: 写死了640大小
<meta name="viewport" content="width=640,user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1"/>
参考 http://www.quirksmode.org/blog/archives/2013/10/initialscale1_m.html 这篇文章

3、因为不需要兼容 320*480了，320*640的也会缩放1/2，不用担心。
4、图片background-size 不需要写；图片切成1:1大小的就行。






