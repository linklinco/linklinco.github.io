### JS性能优化之--节流`throttle`和防抖`debounce`

1、先学两个单词

* 第一个单词   节流`throttle`

> `throttle` 英[ˈθrɒtl]  美[ˈθrɑːtl] 
>  vt.   掐死; 使窒息; 勒死; 
>  n.    节流阀; 节流杆; 风门; 风门杆; 
> [例句]I like her, although I could cheerfully *throttle* her at *times.*
> 我喜欢她，虽然有时烦得真想把她**掐死\*。*

* 第二个单词 防抖`debounce`

>  debounce 
> 网络  去抖动; 防反跳; 防抖动; 弹跳; 抖动消除; 
> [例句]On a cable disconnect-to-connect a *debounce* delay is *incorporated.*
> 在一个电缆断开到连接去抖延时*注册。*

弹起、跳起`bounce`前面加`de`

这两个单词就是我们这次要学习的重点知识，节流和防抖，这是前端性能优化里比较重要的部分。

2、节流`throttle`

顾名思义，节流，节省流量，指在单位时间`wait`内，函数`fn` 只执行一次；

先上我们这次的html结构，一个小小btn,点击它之后触发b事件；

```html
<button id="btn">点我</button>
```

```js
function b(){
  console.log("点击了按键");
}
document.getElementById('btn').onclick = b;
```

这个时候如果你跟我一样，拥有单身20年的手速，那你点击多少次button，就会输出多少次结果。

假设，这个button是个弱小的萌妹子，经不起你这么高速的摧残，无论你点击多少次button，只允许你1秒内只给你一次输出时，我们应该怎么做呢？

酱酱，这里就用到我们这次要研究的节流函数了，节省流量，1s内只允许button妹子给你一次输出。那这个函数我们怎么实现。

```js
function throttle(fn,wait){
  //首先定义一个time，这个time是我们绑定事件时确认的时间
var time = Date.now();

return function(){
  //当执行事件的时候，先获取被执行时间
  var now = Date.now();
  //比较两个时间有没有差距wait时间
  if(now-time>=wait){
    //过时就执行fn，并且更新时间
    fn.call(this);
    time = Date.now()
  }
  
}
}
document.getElementById('btn').onclick = throttle(b,1000);
```

这样判断时间间隔，再考虑要不要执行函数，这样无论你的手速多快，我们可爱的button妹子1S内就只会给你一次反应了。

3、防抖

防抖就是无论你点击多少次，如果你每次点击之间的时间间隔小于wait，就不会执行，知道时间间隔大于wait，然后会执行最后一次；

继续玩弄我们的button妹子

```js
function debounce(fn,delay){
    
  //定义一个计时器
  var timer;
    //定义之后要执行的事件
  var run = function(that){
    fn.call(that);
  }
  return function(){
      //点击之后，先判断timer是是不是有没有执行的事件
    if(timer){
       //如果timer里有事件，说明两次点击是在delay时间内触发的，需要清除掉上次未执行的触发器
      clearTimeout(timer);
    }
     //定义新的触发器
    timer = setTimeout(run,delay,this)
  }
}
document.getElementById('btn').onclick = debounce(b,1000);
```

施工完毕，这次无论你的手速多么快，只有在最后一次点击之后等待1s，button妹子才会给你反应，并且只给一次。

大概防抖和节流就是这个样子，自行研究玩弄button的方法~