<template>
  <div class="dynamic">
    <div id="dynamic"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let data = (function () {
        var res = [];
        var len = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })()
      var option = {
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })(),
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "预购量",
            max: 1200,
            min: 0,
            splitLine: {
            lineStyle: {
                type: "dashed",
                color: "#fff",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            nameTextStyle: {
              color: "#ff0000",
            },
          },
        ],
        series: [
          {
            name: "预购队列",
            type: "bar",
            data: data
          },
          {
            name: "最新成交价",
            type: "line",
            data: data
          },
        ],
      };
      console.log(option)
      var myChart = echarts.init(document.getElementById("dynamic"));
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.dynamic {
  width: 300px;
  height: 300px;
  #dynamic {
    width: 300px;
    height: 200px;
  }
}
</style>