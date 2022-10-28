### svg属性

* 矩形 <rect>

```
<rect width="100" height="100" x="20" y="20" rx="20" ry="20">


width定义矩形宽度
height定义矩形高度
x定义矩形的左侧位置
y定义矩形的顶端位置
rx,ry可以产生圆角

style 设置矩形的样式
style内属性
fill:颜色值  定义填充颜色
stroke:颜色值  定义边框颜色
stroke-width:5  定义边框宽度
opacity:0.9 定义整体透明度
fill-opacity 定义填充颜色
stroke-opacity 定义笔触颜色的透明度
```

* <circle>圆形

```
<circle cx="100" cy="100" r="40">

cx，cy定义原点的x，y坐标  省略会被设置为0 0
r表示圆的半径
```

* 椭圆形<ellipse>

```
cx,cy 定义椭圆的x,y坐标
rx,ry 定义椭圆的水平和垂直半径
```

* 线条<line>

```
<line x1="0" y1="0" x2="100" y2="100"
(x1,y1)到(x2,y2)画一条线  如果想增加线的宽度，可以用stroke-width
```

* 多边形<polygon>

```
<polygon points="220,100 300,400 140,170 250,10" />

points属性定义多边形每个角的x和y坐标
然后把这些角连接成为多边形
```

* 折线<polyline>

```
 <polyline points="0,0 0,20 20,20 20,40 40,40 40,60" style="fill:white;stroke:red;stroke-width:2" />
和polygon相比封闭不封闭
```

* 路径<path>

```
path
```



