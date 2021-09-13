<template>
  <div class="annular">
    <div id="annular"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var option = {
        series: [
          {
            name: "搜索引擎",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "搜索引擎"},
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
            ],
          },
        ],
      };
      var myChart = echarts.init(document.getElementById("annular"));
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.annular {
  width: 200px;
  height: 200px;
  #annular {
    width: 200px;
    height: 200px;
  }
}
</style>