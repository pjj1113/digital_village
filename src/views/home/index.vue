<template>
  <div class="home">
    <p></p>
    <div class="tabbar">
      <div class="box" v-for="(item, index) in labelList" :key="index">
        <ul>
          <li v-for="(list, index) in item.list" :key="index">{{ list.name }}</li>
        </ul>
        <div class="content">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelList: [
        {  title:'测试1', icon: '', show: false, list:[
          { name: '一张图', route: '/map' }
        ] },
        {  title:'测试1', icon: '', show: false, list:[
          { name: '一张图', route: '/map' }
        ] },
        {  title:'测试1', icon: '', show: false, list:[
          { name: '一张图', route: '/map' }
        ] }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #051425;
  .tabbar {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 30;
    // background: rgba(104,218,208,.5);
    .box {
      position: relative;
      width: 20%;
      height: 300px;
      
      margin-right: 20px;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(104,218,208,.5);
      }
      ul {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba($color: #fff, $alpha: .5);
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

        }
      }
    }
  }
}
</style>