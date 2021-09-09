<template>
  <div class="map">
    <div
      id="mapDiv"
      style="width: 300px; height: 300px"
    ></div>
    <el-collapse v-model="jobActiveNames">
      <el-collapse-item title="河长制专题" name="1">
        <el-checkbox
          :indeterminate="jobBasicIsIndeterminate"
          v-model="jobBasicAllSelected"
          @change="handleJobBasicAllChange"
          size="small"
          border
          >全选</el-checkbox
        >
        <el-checkbox-group
          v-model="jobBasicSelected"
          @change="handleJobBasicChange"
          size="small"
        >
          <el-checkbox
            v-for="(item, index) in jobBasicOptions"
            :label="item.value"
            :key="index"
            border
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="水务监测站" name="3">
      <el-checkbox
        :indeterminate="jobMonitorIsIndeterminate"
        v-model="jobMonitorAllSelected"
        @change="handleJobMonitorAllChange"
        size="small"
        border
        >全选</el-checkbox
      >
      <el-checkbox-group
        v-model="jobMonitorSelected"
        @change="handleJobMonitorChange"
        size="small"
      >
        <el-checkbox
          v-for="(item, index) in jobMonitorOptions"
          :label="item.value"
          :key="index"
          border
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </el-collapse-item>
    </el-collapse>
    
  </div>
</template>

<script>
import { TMap } from "@/utils/TMap.js";
import job from "@/api/job.js";
export default {
  data() {
    //这里存放数据
    return {
      cityName: "", //暂存城市名称
      jobActiveNames: ["1", "2", "3", "4", "5"],
      jobBasicIsIndeterminate: false,
      jobMonitorIsIndeterminate: false,
      // 全选按钮状态
      jobBasicAllSelected: false,
      jobMonitorAllSelected: false,
      // 左侧选择项
      jobBasicSelected: [],
      jobMonitorSelected: [],
      // 水利基础备选项
      jobBasicOptions: [
        {
          value: "1",
          label: "流域",
        },
        {
          value: "2",
          label: "河流",
        },
        {
          value: "3",
          label: "湖泊",
        },
        {
          value: "4",
          label: "红线",
        },
      ],
       // 水务监测站
      jobMonitorOptions: [
        {
          value: '1',
          label: '水库站'
        }, {
          value: '2',
          label: '雨量站'
        }, {
          value: '3',
          label: '水质站'
        }, {
          value: '4',
          label: '河道断面站'
        }, {
          value: '5',
          label: '梯级电站'
        }
      ],
      // 接口参数
      jobBasicParam: {
        types: [],
      },
      jobMonitorParam: {
        types: [],
      },
      // 接口返回列表数据
      jobBasicList: [],
      // 水利基础配置项映射
      jobBasicOptionMap: {
        1: {
          zoom: 8,
          lng: 114.75494,
          lat: 24.03894,
          options: {
            color: "blue",
            fillColor: "#FFFFFF",
            fillOpacity: 0.5,
          },
        },
        2: {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10,
          },
        },
        3: {
          zoom: 14,
          lng: 114.37823,
          lat: 23.08281,
          options: {
            color: "#FFFF00",
            fillColor: "#0000FF",
            fillOpacity: 0.5,
          },
        },
        4: {
          zoom: 15,
          lng: 114.37789,
          lat: 23.13582,
          options: {
            color: "#FF0000",
            opacity: 1,
            lineStyle: "dashed",
          },
        },
        5: {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10,
          },
        },
      },
      // 水利工程图标映射
      jobIconMap: {
        project: {
          '1': 'reservoir',
          '2': 'dam',
          '3': 'sluice',
          '4': 'pump'
        },
        monitor: {
          '1': 'reservoir',
          '2': 'rain',
          '3': 'quality',
          '4': 'section',
          '5': 'power'
        },
        video: {
          '1': 'hydrology',
          '2': 'protection',
          '3': 'djbasin'
        },
        public: {
          '1': 'public',
          '2': 'public2'
        }
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.tMap = new TMap("mapDiv", T);
      this.tMap.vm = this;
      this.tMap.addMapControl(["mapType", "zoom", "scale"]);
    },

    // 水务监测站全选按钮事件
    handleJobMonitorAllChange (val) {
      this.jobMonitorSelected = [].concat()
      if (val) {
        for (var i in this.jobMonitorOptions) {
          var item = this.jobMonitorOptions[i]
          this.jobMonitorSelected.push(item.value)
        }
      }
      this.jobMonitorIsIndeterminate = false
      this.jobMonitorParam.types = this.jobMonitorSelected
      this.getMonitorList()
    },
    handleJobMonitorChange (val) {
      let checkedCount = val.length;
      this.jobMonitorAllSelected = checkedCount === this.jobMonitorOptions.length;
      this.jobMonitorIsIndeterminate = checkedCount > 0 && checkedCount < this.jobMonitorOptions.length;
      this.jobMonitorParam.types = val
      this.getMonitorList()
    },
    // 获取水务监测站数据
    getMonitorList () {
      var that = this

      // 1.先清除现有的水务监测站的覆盖物
      if (that.tMap.jobMonitorOverLays && that.tMap.jobMonitorOverLays.length) {
        var overLays = that.tMap.jobMonitorOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobMonitorOverLays
      }
      job['getMonitorList'](that.jobMonitorParam).then(response => {
        that.jobMonitorList = response.data;
        console.log(response.data, 'data')
        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置

        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'monitor'
        for (var i = 0; i < that.jobMonitorList.length; i++) {
          var item = that.jobMonitorList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'monitor'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobMonitorOverLays) {
            that.tMap.jobMonitorOverLays = []
          }
          that.tMap.jobMonitorOverLays.push(overlay)
        }
        // console.log(response.data);
      })
    },
    // 根据类别获取图标
    getIconBytype (moduleType, type) {
      return this.jobIconMap[moduleType][type]
    },



    // 水利基础全选按钮事件
    handleJobBasicAllChange(val) {
      this.jobBasicSelected = [].concat();
      if (val) {
        for (var i in this.jobBasicOptions) {
          var item = this.jobBasicOptions[i];
          this.jobBasicSelected.push(item.value);
        }
      }
      this.jobBasicIsIndeterminate = false;
      this.jobBasicParam.types = this.jobBasicSelected;
      this.getBasicList();
    },
    // 水利基础选项改变事件
    handleJobBasicChange(val) {
      console.log(val);
      let checkedCount = val.length;
      this.jobBasicAllSelected = checkedCount === this.jobBasicOptions.length;
      this.jobBasicIsIndeterminate =
        checkedCount > 0 && checkedCount < this.jobBasicOptions.length;
      this.jobBasicParam.types = val;
      this.getBasicList();
    },
    // 获取水利基础数据
    getBasicList() {
      var that = this;

      // 1.先清除现有的水利基础的覆盖物
      if (that.tMap.jobBasicOverLays && that.tMap.jobBasicOverLays.length) {
        var overLays = that.tMap.jobBasicOverLays;
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i];
          that.tMap.removeOverLay(overlay);
        }
        delete that.tMap.jobBasicOverLays;
      }

      // 2.再重新添加水利基础的覆盖物
      job["getBasicList"](that.jobBasicParam).then((response) => {
        console.log(response);
        that.jobBasicList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = "job";
        that.tMap.moduleType = "basic";

        for (var i = 0; i < that.jobBasicList.length; i++) {
          var item = that.jobBasicList[i];
          var type = item.type;
          var lnglatList = item.lnglatList;

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = "basic";

          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList);

          // 添加覆盖物并返回覆盖物
          var option = this.getOptionBytype(type);
          var method = this.getOverlayMethodBytype(type);
          var zoom = option && option.zoom ? option.zoom : that.tMap.zoom;
          var lng = option && option.lng ? option.lng : that.tMap.lng;
          var lat = option && option.lat ? option.lat : that.tMap.lat;
          var options = option && option.options ? option.options : {};

          var overlay = that.tMap[method](points, item, options);

          that.tMap.centerAndZoom(lng, lat, zoom);

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobBasicOverLays) {
            that.tMap.jobBasicOverLays = [];
          }

          that.tMap.jobBasicOverLays.push(overlay);

          // 将水利河流覆盖物保存起来
          if (type === "2") {
            if (!that.tMap.jobBasicTopRiverOverLays) {
              that.tMap.jobBasicTopRiverOverLays = [];
            }
            that.tMap.jobBasicTopRiverOverLays.push(overlay);
          }
        }
      });
    },
    // 根据水利基础类别获取覆盖物样式
    getOptionBytype(type) {
      return this.jobBasicOptionMap[type];
    },
    // 根据水利基础类别获取覆盖物类型
    getOverlayMethodBytype(type) {
      if (type === "1" || type === "3") {
        return "addPolygon";
      } else if (type === "2" || type === "4") {
        return "addPolyline";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>