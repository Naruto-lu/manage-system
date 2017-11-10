<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <!--<transition name="move" mode="out-in"><router-view></router-view></transition>-->
            <div class="content-main">
              <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        }
    }
</script>

<style lang="less">
  .content{
    left: 200px;
    top: 60px;
    padding: 10px;
    background-color: #dedede;
    overflow-y: auto;
    .content-main{
      border: 1px solid #dedede;
      padding: 10px;
      background-color: #fff;
    }
  }
</style>

