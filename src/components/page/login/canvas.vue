<template>
    <div>
      <canvas @click="change" id="mycanvas" width="105" height="35">
          您的浏览器不支持canvas，请换个浏览器试试~
      </canvas>
    </div>
</template>
<script type="text/javascript">
  export default {
    data: function () {
      return {}
    },
    methods: {
      rand () {
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // 定义源字符串
        let arr = str.split('') // 字符串分割为数组
        let validate = '' // 定义验证码
        let ranNum = '' // 定义数组随机下标

        // 循环遍历出所需的4位验证码字符串
        for (var i = 0; i < 4; i++) {
          ranNum = Math.floor(Math.random() * 62) // 随机产生0-35之间的数字
          validate += arr[ranNum] // 所需验证码
        }
        return validate
      },
      lineX () {
        let ranLineX = Math.floor(Math.random() * 90) // x坐标值由规定的canvas宽度而定
        return ranLineX
      },
      lineY () {
        let ranLineY = Math.floor(Math.random() * 35) // y坐标值由规定的canvas高度而定
        return ranLineY
      },
      clickChange () {
        let mycanvas = document.getElementById('mycanvas') // 获取canvas的DOM节点元素
        let cxt = mycanvas.getContext('2d') // 创建canvas的2d context对象
        cxt.fillStyle = '#a7ebe9' // fillStyle为canvas填充背景颜色
        cxt.fillRect(0, 0, 110, 41) // fillRect()方法为canvas定义已填充的矩形：fillRect(x,y,width,height);x,y表示与canvas边框左上角那个点的位置惯性系
        for (var j = 0; j < 4; j++) {
          cxt.strokeStyle = 'red' // 定义线条颜色为红色
          cxt.beginPath() // beginPath()方法开始一条路径，或重置当前的路径;若省略beginPath()，则每点击一次验证码会基类干扰线的条数
          cxt.moveTo(this.lineX(), this.lineY()) // 定义线条的起始点
          cxt.lineTo(this.lineX(), this.lineY()) // 定义线条的终点
          cxt.lindWidth = 0.5 // 定义线条的宽度
          cxt.closePath() // closePath()方法创建从当前点到开始点的路径
          cxt.stroke() // stroke()方法会实际地绘制出通过moveTo()和lineTo()方法定义的路径。默认颜色是黑色
        }
        let str = this.rand().split('') // Array["8", "4", "j", "s"]
        // console.log(str)
        let val = ''
        for (var z = 0; z < str.length; z++) {
          str[z] = str[z] + ' ' // 每个数组元素之间加空格，使验证码更好的在前台显示
          val += str[z]
        }
        // console.log(val)
        localStorage.setItem('yzm', val.replace(/\s/g, '')) // 去除所有的空格，写入浏览器缓存中，并命名为yzm
        // console.log(localStorage.getItem('yzm')) // 获取yzm的值
        cxt.font = 'bold 25px Arial' // 定义文本的字体为：加粗、20px大小、Arial字体。
        cxt.strokeText(val, 20, 25) // strokeText('要实现的文字',x,y)，注意这里面的x,y代表的是哪个点的坐标，strokeText()实现的是镂空的字体
      },
      change (e) {
        e.preventDefault() // 防止未知的意外发生
        this.clickChange()
      }
    }
  }
</script>
<style type="text/css">
  #mycanvas{
    border: 1px solid green;
    border-radius: 5%;
    cursor: pointer;
    float: right;
  }
</style>