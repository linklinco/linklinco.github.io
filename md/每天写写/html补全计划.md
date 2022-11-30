<a>标签

锚点，可以通过在a标签中设置href=“#id”的方式来给自动跳转，跳转到目标的margin的位置等于顶端的位置。

CSS属性

```
  scroll-behavior: smooth; 
```

可以设置滚动条平滑滚动

链接目标

| target        | 效果                       |
| ------------- | -------------------------- |
| _self         | 当前页面打开               |
| _blank        | 新页面打开                 |
| abc某个指定值 | 在同一个名为abc的tag里打开 |

表格

caption 表头 必须是table的第一个子元素

colgroup 列分组 和每一列一一对应

```
<colgroup>
<col class="col1">
<col class="row2" span="2">
</colgroup>
```

文件表单提交需要在form中添加`enctype="multipart/form-data"`

emmet

$@-10表示从10开始降序

$@+10表示从10开始升序

p>lorem10 表示随机生成10个字符

^表示父元素

