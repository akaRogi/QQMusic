<template>
  <div class="SortLeng">
    <div class="LeftBox">
      {{data.categoryGroupName}}
    </div>
    <div class="rightBox">
      <ul>
        <li
          v-for="(item, index) in data.items"
          :key="index"
          @click="UpdateId(item)"
        >{{item.categoryName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortLeng',
  props: ['data'],
  methods: {
    UpdateId (data) {
      let id = data.categoryId
      this.$router.push('/sortList/' + id)
      // alert(id)
    }
  }
}
</script>

<style scoped>
.SortLeng{
  display: flex;
  margin-bottom: 10px;
  background: #fff;
}
.LeftBox{
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #f3f3f3;
}
.rightBox{
  width: 70%;
}
.rightBox ul{
  overflow: hidden;
  /*border-bottom: 1px solid;*/
}
.rightBox li{
  width: calc(33% + 1px);
  float: left;
  line-height: 4;
  /*margin-right: calc(2% - 3px);*/
  border: 1px solid #f3f3f3;
  border-left: 0;
  text-align: center;
  /*border-bottom: 0;*/
  border-top: 0;
}
.rightBox li:nth-child(3n){
  border-right: 0;
  margin-right: 0;
}
.rightBox li:nth-child(-n + 3){
  border-top: 0;
}
.SortLeng:nth-child(1) li:nth-child(-n + 3){
  border-top: 0;
  border-bottom: 0;
}
.SortLeng:last-child{
  margin-bottom: 0;
}
</style>
