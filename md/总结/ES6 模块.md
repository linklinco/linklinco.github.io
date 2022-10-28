ES6 模块

导出模块使用export

```
class A {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.he = this.sum();
    }
    sum() {
        console.log(1);
        return this.x + this.y;
    }
};
class B extends A {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
}

export { A, B };
```

导入模块 使用import 

```
import { B, A } from './daochu.js';

var c = new A(5, 6, 7);
console.log(c.he);
```

 ### node全局对象 `global`

类似浏览器中的全局对象`window` ，node中唯一全局对象是`global`

process对象 代表当前nodejs进行

```
process.version //获取当前node版本
process.platform //获取当前平台
process.arch //获取当前架构信息
process.cwd() //返回当前工作目录
process.chdir() //切换当前工作目录
```

判断代码是在浏览器环境还是在node环境

```
if(typeof(window) === 'undefined'){
console.log('node.js');
}else{
console.log('browser');
}
```

`fs`模块

异步读取

```
var fs = require('fs');
//异步读取文件，成功err参数为null，data参数为读取到的String。失败err参数则为一个错误对象，data为undefined 
fs.readFile('1.txt','utf-8',(err,data)=>{
if(err){
console.log(err);
}else{
console.log(data);
}
})
//如果读取的是二进制数据，data返回的是这个`Buffer`对象，Buffer对象可以转为String对象，string对象也可以转为Buffer对象
Buffer.from(text,'utf-8')
```

同步读取

```
var data = fs.readFileSync('1.txt','utf-8');
console.log(data);
```

异步写文件

```
fs.writeFile('2.txt',data,(err)=>{//处理错误})
//String对象utf8编码写入，Buffer对象按二进制写入
```

同步写文件

```
fs.writeFileSync('2.txt',data)
```

`stat`获取文件信息

```
fs.stat('1.txt',(err,stat)=>{
if(err){
//处理错误
}else{
stat.isFile() //判断是否是文件
stat.isDirectory() //判断是否是文件夹
if(stat.isFile()){
stat.size //返回文件大小
stat.birthtime //返回创建时间
stat.mtime //返回修改时间
}
}
})
```

stat()也有一个对应的同步函数statSync()

```
var stat = fs.statSync('1.txt')
```











