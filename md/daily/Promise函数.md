# 1.Promise函数

## 1.1出现需求

为了解决`回调地狱`而产生的一种构造函数

回调地狱，在回调函数中嵌套回调函数，反复嵌套很多层

## 2.1使用

```js
new Promise((resolve,reject)=>{
    //promise函数主体部分
})
//定义后会产生一个promise函数
//他接受一个函数作为参数，这个函数又接收2个函数作为参数
```

## 2.2promise对象的状态（state）和数值（resulte)

定义后，promise 的默认状态是`pending`

在主体部分中

调用`resolve()`函数会将promise对象的状态改为`fulfilled`成功

调用`reject()`函数会将promise对象的状态改为`rejected`失败

**只有promise调用这两个函数才会改变状态**

函数结果通过 `resolve(value)`或者`reject(reason)`来传递

## 2.3promise对象的then方法

```
new Promise((resolve,reject)=>{
    //promise函数主体部分
}).then((value)=>{
//这里的函数都是异步执行的
},(reason)=>{
//
})
```

`then`方法接受两个参数，当promise主体调用`resolve(value)`时，调用`then`里的第一个，否则调用第二个

`.then()`会返回一个`promise`对象可以继续调用`.then()`方法，实现promise链式调用

当未传入参数时，then方法会返回一个新的，状态和原promise相同的promise

## 2.4catch方法

```js
new Promise((resolve,reject)=>{
    //构造体
}).then(()=>{
    
}).catch((reason)=>{
    //处理错误
})
```

当`promise`函数构造体出现错误或者调用`reject()`时会调用`catch`内的函数

```js
throw new Error(reason)
```

手动抛出的错误也会被捕获