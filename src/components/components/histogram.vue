<template>
  <div class="histogram">
    <div id="histogram"></div>
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
      var option = {
        xAxis: {
          type: "category",
          data: ["北京", "天津", "成都"].map((item) => ({
            value: item,
            textStyle: { color: "#fff" },
          })),
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
        yAxis: {
          type: "value",
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
        series: [
          {
            data: [120, 200, 150].map((item) => ({
              value: item,
              borderWidth: 15,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.4, color: "#2378f7" },
                  { offset: 1, color: "#83bff600" },
                ]),
                borderRadius: [10, 10, 0, 0],
                borderWidth: "100%",
              },
            })),
            barCategoryGap: "70%",
            type: "bar",
          },
        ],
      };
      var myChart = echarts.init(document.getElementById("histogram"));
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.histogram {
  width: 300px;
  height: 200px;
  #histogram {
    width: 300px;
    height: 200px;
  }
}
</style>