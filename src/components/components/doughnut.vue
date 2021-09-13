<template>
  <div class="doughnut">
    <div id="doughnut"></div>
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
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#ffffff00",
              borderWidth: 4,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
            ],
          },
        ],
      };
      var myChart = echarts.init(document.getElementById("doughnut"));
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.doughnut {
  width: 200px;
  height: 200px;
  #doughnut {
    width: 200px;
    height: 200px;
  }
}
</style>