# vuecalc
> 基于Vue3和element-plus的纯前端程序员计算器。因为Linux系统/手机端的计算器APP不支持程序员功能（二进制转换和按位取反），所以参照Windows 10自带计算器应用的程序员功能，做了自用版

## 本地运行
### Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```
### Compiles and minifies for production
```
yarn build
```
## 说明
### 特性
1. 支持PWA，yarn build输出的生产静态资源文件，在经服务器托管后可由chrome安装离线使用。
2. 支持字节、双字节和四字节三种数据长度切换
> 受限于JavaScript Number类型遵循IEEE754 64位浮点数表示法，暂不支持64位数据计算
3. 支持有符号和无符号数的转换
> 受限于JavaScript >> <<等运算符会自动将64位浮点数转为32位整数，目前的二进制转换方法在更改bit32状态时会带来一些问题。
4. 正负数二进制表示均采用数的源码进行表示