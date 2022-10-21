# jquery笔记

### 1、DOM对象与jQuery包装对象

##### 1.1区别

1、dom对象是使用`document.getElementById`等js DOM模型获取到的对象

2、jQuery对象是通过jQuery获取的对象`$('#idname')` 返回的是一个JS包装集

```js
        var adom = document.getElementById('idname');
        console.log(adom);
        var jq = $('#idname');
        console.log(jq);
```



dom获取不存在对象返回null

##### 1.2DOM对象与jquery对象转换

`var jqobject =$(domobject) `

jQuery对象转dom，直接取下标

`var domobject=jqobject[0]`

##### 1.3jQuery选择器

基本选择器

1. id选择器 `$("#id属性值")`
2. 类选择器`$(".class属性值")`
3. 元素选择器`$("元素名")`
4. 通用选择器`$('*')`
5. 组合选择器 `$("选择器1，选择器2...")` 重复不会重复算

层次选择器

1. 后代选择器`$('fuyuans ziyuans')`包含第一代第二代等等的全部子元素
2. 子代选择器`$(fuyuans>ziyuans)` 父元素的所有第一代元素
3. 相邻选择器`$(gegeyuans+ziyuans)` 选择同辈后一个元素
4. 同辈选择器`$(gegeyuans~didiyuans)`选择之后所有的弟弟元素

表单选择器

1. `$(':input')`获取表单元素 获取不仅包含input元素，还包含按键
2. `$(':text')`
3. `$(':password')`
4. `$(':radio')` 单选框选择器
5. `$(':checkbox')` 多选框选择器

### 2、jQuery dom操作

##### 2.1 操作元素的属性

1. 获取属性 attr(属性名称) 、prop(属性名称)  如果没有返回空

    属性分类：

    **固有属性** 元素本身就有的（id、name、class）

    attr和prop都可以获取

    返回值的布尔值的属性（checked、selected 、disabled）等

    **布尔属性** attr（属性名称）获取的是设置的属性，没有设置获取的是undefine

    prop获取的是布尔值 设置获取true 未设置获取的是false

    **自定义属性**

    自定义属性 attr（属性名称）可以获取、prop（属性名称）获取不到

2. 设置属性

    和获取属性类似 attr(属性名称，属性值)；prop(属性名称，属性值)

    也分固有属性和Boolean属性，prop设置的是true和false

    prop操作不了自定义属性

3. 移除属性

    removeAttr(属性名称)

总结如果属性的类型是Boolean类型，使用prop方法，否则使用attr方法

##### 2.2操作元素的样式

| 方法                                                         | 说明                                          |
| ------------------------------------------------------------ | --------------------------------------------- |
| attr('class')                                                | 获取class属性的值                             |
| attr('class','样式名')                                       | 修改class属性的值，修改样式，原本样式会被覆盖 |
| addClass('样式名')                                           | 添加样式名称                                  |
| removeClass(样式名)                                          | 移除样式名称                                  |
| css('属性名'，属性值)或者css({"属性名"：属性值，"属性名"：属性值}) | 添加具体的样式（添加行内样式）                |

##### 2.3操作元素的内容

| 方法                       | 说明               |
| -------------------------- | ------------------ |
| html()                     | 获取元素的html内容 |
| html("html内容")           | 设定元素的html内容 |
| text ()                    | 获取元素的文本内容 |
| text('text内容')           | 获取元素的文本内容 |
| val() 只适用于表单元素内容 | 获取元素的value值  |
| val('值')                  | 设置元素的value值  |

##### 2.4、创建元素

直接使用核心函数

`$('元素内容')`或者`$('<p>this is a paragraph</p>')`

添加元素

| 方法                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| prepend(content)               | 在被选**元素内部***的开头插入元素或内容，被追加的content参数可以是字符、HTML元素标记 |
| $(content).prependTo(selector) | 把content加入到selector元素开头                              |
| append(content)                | 在被选元素内部的结尾插入元素或者内                           |
| $(content).appendTo(selector)  | 把content元素或内容插入selector元素内                        |
| $(selector).before(content)    | 在元素之前插入内容（同级追加）                               |
| $(selector).after(content)     | 在元素之后插入内容（同级追加）                               |

如果元素不存在，会把元素追加到指定位置，否则将已经存在的元素插入，相当于剪切

##### 删除元素

remove（） 删除元素及其子元素

empty（）清空内容，保留标签

##### 遍历元素 each()方法

使用

```
$(selector).each(function(index,element))  这里可以用this，代表这个element对象
```

index是遍历元素的序号，从0开始

element是DOM元素

### 3、jQuery事件

##### 3.1 ready加载事件

ready加载事件，当dom加载完毕后执行，类似js中的load事件

语法

```js
$(document).ready(function(){

})
简写：
$(function(){

})
```

可以写多个

##### 3.2 jQuery绑定事件

bind绑定事件 

语法

```
绑定单个事件
$(selector).bind(eventType,eventData,()=>{})
绑定事件类型，传递参数{名：值，名1：值1}，处理函数
直接绑定
$(selector).事件名(function(){

})
绑定多个函数
绑定同一个函数
$(selector).bind("事件1 事件2 事件3...",function(){

})
绑定多个函数
$(selector).bind("事件1",function(){

}).bind("事件2",function(){

})
或者传入一个对象
$(selector).bind({
'事件1':()=>{

},
'事件2':()=>{

}
})
```

### jquery ajax 异步无刷新技术

jquery调用ajax方法

```
$.ajax({
type:'',
url:'',
data:{[1,2,3,4]},//如果没有参数，不用写
dataType:'json',//预期返回值会返回json对象
success:(data)=>{这里的data是返回的数据},
error:()=>{}
})
```

参数

```
type:请求方式GET/POST
url: 请求地址url
async:是否异步，默认true表示异步
data：发送到服务器的数据
dataType:预期服务器返回的数据类型
contentType:设置请求   
```

$.get()请求

```
$.get('/api/1.json',{name:1},(data)=>{
console.log(data);
})
```

$.post请求

```
$.post('/upload',{data},(data)=>{

})
```

$.getJSON()请求

```
$.getJSON('/api/1.json',{name:1},(data)=>{
console.log(data);
})
```

要求返回数据格式必须是json格式，如果返回数据不是json格式则不显示