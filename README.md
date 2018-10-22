#   webpack+vue学习记录

##  Day one: 一个最简单的webpack项目

我们新建一个TODO项目，初始化命令：

    npm init;

安装npm，然后会有一些warn指示，我们根据指示安装项目所需要的依赖，请根据提示安装

    npm i css-loader
    
然后创建src，新建一个app.vue，这是一个vue文件，内容很简单

    <template>
    <div id="text">
        {{text}}
    </div>
    </template>
    <script>
    export default {
        data(){
            return {
                text:'hello world'
            }
        }
    }
    </script>
    <style>
        #test{
            color:black;
        }
    </style>
    

新建webpack.config.js

    const path = require('path')
    module.exports = {
        entry: path.join(__dirname,'src/index.js'),
        output:{
            filename: 'bundle.js',
            path: path.join(__dirname,'dist')
        }
    }
    
包含入口文件main.js，和出口文件bundle.js；

此时定义入口文件index.js,配置一个vue对象，将内容挂载上去

    import Vue from 'vue'
    import App from './app.vue'
    
    const root = document.createElement('div')
    document.body.appendChild(root)
    
    new Vue({
        render:(h) => h(App)
    }).$mount(root)   
    
入口文件定义好后，我们可以在package.json中加一行脚本，指定在该项目中webpack打包，而不是全局打包

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --config webpack.config.js"  //这里
      }
     
此时我们可以打包试试  ==npm run build==

哈哈，报错，大家看看报错

    ERROR in ./src/app.vue 1:0
    Module parse failed: Unexpected token (1:0)
    You may need an appropriate loader to handle this file type.

我们需要安装一个loader区处理vue类型的文件，然后配合我学习的视屏里是这样配置的

    const path = require('path')
    module.exports = {
        entry: path.join(__dirname,'src/index.js'),
        output:{
            filename: 'bundle.js',
            path: path.join(__dirname,'dist')
        },
        module:{
            rules:[
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        }
    }

我试了之后还是不行，很鸡肋，不知道视频中的webpack是哪个版本，然后百度了一个，现在的版本是要加一个插件VueLoaderPlugin的，在查找问题的过程中自作主张加了一个严格模式的规定，然后，看
    
    'use strict'
    const path = require('path')
    const VueLoaderPlugin = require('vue-loader/lib/plugin')  //这里
    module.exports = {
        entry: path.join(__dirname,'src/index.js'),
        output:{
            filename: 'bundle.js',
            path: path.join(__dirname,'dist')
        },
        plugins:[   //这里
            new VueLoaderPlugin()
        ],
        module:{
            rules:[
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        }
    }
    
我本以为这样好了，但是，继续报错

    [vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
    
很生气，在一开始的warn中，视频中是有这个依赖提示的，但是我没有就没安装，现在来了，总归是要装的

    npm i vue-template-compiler
    
继续，烧香祈祷，呵呵

    ERROR in ./src/app.vue?vue&type=style&index=0&lang=css& 18:0
    Module parse failed: Unexpected token (18:0)
    You may need an appropriate loader to handle this file type.
    |
    |
    > .test{
    |     color:black;
    | }

继续报错，保持微笑，这里提示的意思应该是样式需要loader来处理它，矫情！于是百度了一下，加了这个
    
    'use strict'
    const path = require('path')
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    module.exports = {
        entry: path.join(__dirname,'src/index.js'),
        output:{
            filename: 'bundle.js',
            path: path.join(__dirname,'dist')
        },
        plugins:[
            new VueLoaderPlugin()
        ],
        module:{
            rules:[
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.css$/,             //这里
                    use:['vue-style-loader','css-loader']
                }
            ]
        }
    }


最后我终于成功了，看到一片绿的时候，简直想哭啊！！！
呼呼

最终就生成了一个dist/bundle.js文件啊，感觉自己好棒棒！！

好，第一个课程完美，希望大家跟着视频学习的时候有耐心一点，因为老师和你的环境和用的版本毕竟不一样，仔细研究一下报错，耐心解决，感觉在这个过程里收获比较大。哈哈！

    