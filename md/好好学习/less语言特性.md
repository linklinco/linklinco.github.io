### less语言特性

1、嵌套

```less
.myclass{
p{
width:100px;
height:200px;
}
}
```

2、运算

可以直接在代码中进行`+-*/`运算

```less
@fontSize: 10px;
.myclass {
 font-size: @fontSize * 2;
 color:green;
}
```

3、父选择器 &

 ```
.select{
&-first{

}
&-second{

}
&-third{

}
}
 ```

