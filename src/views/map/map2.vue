<template>
  <div class="map">
    <div
      id="mapDiv"
      style=" width: 300px; height:300px"
    ></div>
    <button @click="handleJobBasicChange">kais</button>
  </div>
</template>

<script>
import { TMap } from "@/utils/TMap.js";
import {mapDate} from "@/utils/mapData.js"
export default {
  data() {
    return {
      jobBasicList: [],
      jobBasicOptionMap: {
        '1': {
          zoom: 8,
          lng: 114.754940,
          lat: 24.038940,
          options: {
            color: "blue",
            fillColor: "#FFFFFF",
            fillOpacity: 0.5
          }
        },
        '2': {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10
          }
        },
        '3': {
          zoom: 14,
          lng: 114.378230,
          lat: 23.082810,
          options: {
            color: "#FFFF00",
            fillColor: '#0000FF',
            fillOpacity: 0.5
          }
        },
        '4': {
          zoom: 15,
          lng: 115.371687,
          lat: 32.053385,
          options: {
            color: "#FF0000",
            opacity: 1,
            lineStyle: 'dashed'
          }
        },
        '5': {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10
          }
        }
      },
    }
  },
  mounted() {
    // var a = 'http://t0.tianditu.com/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk='
    this.initMap();
  },
  methods: {
     initMap() {
      this.tMap = new TMap("mapDiv", T);
      this.tMap.vm = this;
      this.tMap.addMapControl(["mapType", "zoom", "scale"]);
    },
    // 水利基础选项改变事件
    handleJobBasicChange (val) {
      // let checkedCount = val.length;
      // this.jobBasicAllSelected = checkedCount === this.jobBasicOptions.length;
      // this.jobBasicIsIndeterminate = checkedCount > 0 && checkedCount < this.jobBasicOptions.length;
      // this.jobBasicParam.types = val
      this.getBasicList()
    },
    // 获取水利基础数据
    getBasicList () {
      var that = this
      
      // 1.先清除现有的水利基础的覆盖物
      if (that.tMap.jobBasicOverLays && that.tMap.jobBasicOverLays.length) {
        var overLays = that.tMap.jobBasicOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobBasicOverLays
      }
      let data = [{
        id: "6",
        lnglatList: mapDate,
        mark: "测试数据",
        moduleType: "basic",
        name: "测试数据",
        shoreType: "测试",
        type: "4",
      }]
      // 2.再重新添加水利基础的覆盖物
      // job['getBasicList'](that.jobBasicParam).then(response => {
        console.log(data)
        that.jobBasicList =data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'basic'

        for (var i = 0; i < that.jobBasicList.length; i++) {
          var item = that.jobBasicList[i]
          var type = item.type
          var lnglatList = item.lnglatList

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'basic'

          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList)

          // 添加覆盖物并返回覆盖物
          var option = this.getOptionBytype(type)
          var method = this.getOverlayMethodBytype(type)
          var zoom = option && option.zoom ? option.zoom : that.tMap.zoom
          var lng = option && option.lng ? option.lng : that.tMap.lng
          var lat = option && option.lat ? option.lat : that.tMap.lat
          var options = option && option.options ? option.options : {}

          var overlay = that.tMap[method](points, item, options)

          that.tMap.centerAndZoom(lng, lat, zoom)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobBasicOverLays) {
            that.tMap.jobBasicOverLays = []
          }

          that.tMap.jobBasicOverLays.push(overlay)

          // 将水利河流覆盖物保存起来
          if (type === '2') {
            if (!that.tMap.jobBasicTopRiverOverLays) {
              that.tMap.jobBasicTopRiverOverLays = []
            }
            that.tMap.jobBasicTopRiverOverLays.push(overlay)
          }
        }
      // })
    },
    // 根据水利基础类别获取覆盖物样式
    getOptionBytype (type) {
      return this.jobBasicOptionMap[type]
    },
    // 根据水利基础类别获取覆盖物类型
    getOverlayMethodBytype (type) {
      if (type === '1' || type === '3') {
        return 'addPolygon'
      } else if (type === '2' || type === '4') {
        return 'addPolyline'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>