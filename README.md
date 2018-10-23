#   webpack+vue学习记录

##  Day1: 一个最简单的webpack项目

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

##  Day2: 常用的loader配置

webpack可以加载前端所能用到的所有静态资源，配置loader,具体有很多

    {
        test: /\.css$/,
        use:['vue-style-loader','css-loader']
    }
    
这是昨天为了解决报错加的配置，这里为什么使用use,而不是loader.

因为对于样式有不同的处理方式，因此使用use,采用数组的格式加载不同的laoder,此处style-loader用来处理html中的style样式，而css-loader主要用来处理css样式文件。
    
    
     {
         test:/\.(gif|jpg|jpeg|png|svg)$/,
         use:[
             {
                 loader:'url-loader',
                 options:{
                     limit: 1024,
                     name: '[name]-thm.[ext]'
                 }
             }
         ]
     }
loader是可以配置一些选项的，使用options来配置
图片文件的处理，url-loader将图片转换为base64代码，写在js内容里面，而不用生成一个文件，这对于小一点的图片文件是很友好的，这里限制了图片的大小，url-loader依赖于file-loadaer,它判断文件大小如果小于1024，就执行转译。可通过name自行配置图片编译后的名称后缀。

配置后我们需要安装一下用到的依赖
    
    npm i url-loader file-loader
    
在配置好了处理样式和图片的loader之后，我们创建assets文件夹，放入一些图片和一个样式文件，在index.js中导入

    import './assets/style/base.css'
    import './assets/img/hh.jpg'
    
然后打包，我们可以看一下打包后生成的文件，哈哈

生成的图片果然带上了'-thm'后缀，样式也在bundle.js中。


css预处理器——模块化写css,为了实现css预处理，我们配置styl(就是一种写法很随便的,和less,sass差不多的css预处理器)

    {
        test: /\.styl/,
        use:[
            'style-loader',
            'css-loader',
            'stylus-loader'
        ]
    }

然后我们可以添加一个styl文件，并且将它导入在index.js中

不要忘了安装loader,stylus-loader依赖于stylus，都要装，不然会报错

    npm i sytle-loader stylus-loader stylus
    
再次打包，我们写的styl样式就被写好放进bundle.js中啦。

未来还有很多loader等着我们去发现。多积累。

