SCSS语法

定义变量

```
$color:blue
```

导入别的类中的内容

```
.error{
color:red;
}
.bigerror{
@extend .error;
font-size:20px;
}
```

3、条件表达式

```
@if
p{
@if 1 + 1 == 2 {border:1px solid black;}
@else if 1>2{border:2px dotted blue;}
@else {color:red;}
}
```

当表达式返回值不是false或者null时，输出{}中的内容

for循环

```
@for $i from 0 to 3{
.item-#{$i}{
width:2em*$i;
}
}
```

4、混合指定

定义混合样式@mixin

```
@minxin 样式名{
font: {
family:Arial;
}
}
```

使用混合样式@include

```
.important{
@include 样式名；
}
```

设置混合样式参数

```
@mixin sexy-border($color: blue, $width: 10px) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
```

