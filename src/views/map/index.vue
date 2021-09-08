<template>
  <div class="map">
    <div
      id="mapDiv"
      style="position: absolute; width: 100%; height: 100%"
    ></div>
    <button
      style="
        position: absolute;
        z-index: 500;
        border: 1px solid;
        right: 7%;
        bottom: 10%;
        color: red;
        background: green;
        padding: 10px;
      "
      @click="positionBtn"
    >
      定位坐标
    </button>
  </div>
</template>

<script>
export default {
  data() {
    //这里存放数据
    return {
      cityName: "", //暂存城市名称
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let that = this; //将方法放在mounted，会有指向问题，定义this使用就会正常
      let zoom = 12; //地图的初始化级别，及放大比例
      that.map = new T.Map("mapDiv");
      that.map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom); //地图的初始化中心点，此为北京的经纬度
      var ctrl = new T.Control.MapType([
        {
          title: "地图", //地图控件上所要显示的图层名称
          icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png", //地图控件上所要显示的图层图标（默认图标大小80x80）
          layer: TMAP_NORMAL_MAP, //地图类型对象，即MapType。
        },
        {
          title: "卫星混合",
          icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png",
          layer: TMAP_HYBRID_MAP,
        },
      ]);
      that.map.addControl(ctrl);
    },
    positionBtn() {
      let that = this;
      // this.map.clearOverLays();   //清理地图上的覆盖物
      let lc = new T.LocalCity(); //创建一个获取本地城市位置的实例
      // lc.location(function (e) {
        let e = {"country":"中华人民共和国","countryShort":"中国","countryEngFull":"People’s Republic of China","countryEngShort":"China","province":"浙江省","provinceShort":"浙江","provinceEngFull":"Zhejiang Province","provinceEngShort":"ZHEJIANG","city":"杭州市","cityShort":"杭州","cityEngFull":"Hangzhou Shi","cityEngShort":"Hangzhou","network":"电信","gb":"330100","lat":"30.24775550791","lng":"120.20421808660","level":11,"continent":"亚洲"}
        //利用ip进行定位
        that.cityName ="余杭区"
        var lnglat = new T.LngLat(e.lat, e.lng)
        let marker = new T.Marker(lnglat); //e.lnglat，标注点的地理坐标
        that.map.addOverLay(marker); //addOverLay方法，将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次。
        that.getMap(); //创建地图对象

        marker.addEventListener("dragend", overlay_style); //添加事件监听函数。
        marker.enableDragging(); //开启标注拖拽功能
  
        function overlay_style(e) {
          let p = e.target;
          alert(
            "该地区经纬度是：" + p.getLngLat().lng + "," + p.getLngLat().lat
          );
        }
      // });
    },

    getMap() {
      let that = this;
      //创建对象
      let administrative = new T.AdministrativeDivision(); //创建一个获取行政区划的实例
      let config = {
        needSubInfo: true, //是否需要下一级信息
        needAll: false, //是否需要所有子节点。
        needPolygon: true, //是否需要行政区划范围。
        needPre: true, //是否需要上一级所有信息。
        searchType: 1, //查询类型。0表示根据code查询，1表示根据名称查询。
        searchWord: this.cityName, //查询行政区划的名称。
      };

      administrative.search(config, searchResult); //方法：根据检索词发起检索，searchResult：回调参数
      function searchResult(result) {
        console.log(result)
        if (result.getStatus() == 100) {
          let data = result.getData();
          console.log(data, 'data')
          that.showMsg(data);
        } else {
          // result.getMsg();
        }
      }
      //具体内容详见AdministrativeDivisionResult类。
    },
    showMsg(data) {
      for (let i = 0; i < data.length; i++) {
        //解释上级行政区划
        if (data[i].parents) {
          let upLevel = "";
          if (data[i].parents.country) {
            upLevel += data[i].parents.country.name;
          }
          if (data[i].parents.province) {
            upLevel += data[i].parents.province.name;
          }
        }

        if (data[i].points) {
          //绘制行政区划
          this.polygon(data[i].points);
        }

        //解释下级行政区划
        if (data[i].child) {
          this.showMsg(data[i].child);
          console.log(data[i].child.points);
          if (data[i].child.points) {
            //绘制行政区划
            this.polygon(data[i].child.points);
          }
        }
      }
    },

    polygon(points) {
      console.log(points)
      let that = this;
      let pointsArr = [];
      for (let i = 0; i < points.length; i++) {
        let regionLngLats = [];
        let regionArr = points[i].region.split(",");
        for (let m = 0; m < regionArr.length; m++) {
          let lnglatArr = regionArr[m].split(" ");
          let lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
          regionLngLats.push(lnglat);
          pointsArr.push(lnglat);
        }
        //创建面对象,样式
        let polygon = new T.Polygon(regionLngLats, {
          color: "#fd737a",
          weight: 3,
          opacity: 1,
          fillColor: "#FFFFFF", //填充颜色。
          fillOpacity: 0.3, //填充透明度
        });
        //向地图上添加行政区划面
        that.map.addOverLay(polygon);
      }
      //显示最佳比例尺
      that.map.setViewport(pointsArr);
      that.map.getCenter().getLng()
      // alert(
      //   "当前地图中心点：" +
      //     that.map.getCenter().getLng() +
      //     "," +
      //     that.map.getCenter().getLat()
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 300px;
  height: 300px;
}
</style>