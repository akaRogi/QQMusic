<template>
  <div class="songlist">
    <div class="BtnTitle">
      <h2>歌手: {{data.singer_name}}</h2>
      <div class="TopBtn" @click="replaceList(data.list)">
        <div class="btn">
          播放全部
        </div>
      </div>
    </div>
    <div class="main">
      <div class="count">{{leng(data.list)}}</div>
      <div class="UlBox wrapper">
        <div>
          <ul class="ul_box content">
            <li
              v-for="(item, index) in data.list"
              :key="index"
            >
              <div class="SongShowBox">
                <div class="li_list">
                  <div>
                    <h3>{{item.musicData.songname}}</h3>
                    <span v-for="SongName in item.musicData.singer" :key="SongName.name">{{SongName.name}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songlist',
  inject: ['PushSong', 'replace'],
  props: ['data'],
  methods: {
    leng (data) {
      return '共' + data.length + '首歌'
    },
    replaceList (list) {
      console.log(list)
      // this.replace()
    }
  }
}
</script>

<style scoped>
  .BtnTitle{
    background: rgba(0,0,0,.5);
  }
  .BtnTitle h2{
    color: #fff;
    padding: 0 10px;
  }
  .TopBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
  }
  .btn{
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    min-width: 260px;
    padding: 0 40px;
    height: 90px;
    overflow: hidden;
    text-align: center;
    font-size: 32px;
    color: #fff;
    border-radius: 40px;
    background: #31c27c;
  }
  .main{
    width: 100%;
    overflow: hidden;
    will-change: transform;
    -webkit-transform: translateZ(0);
  }
  .UlBox{
    height: 790px;
    padding-bottom: 20px;
    overflow: hidden;
  }
  @media (max-width: 321px) and (min-height:319px) {
    .bf {
      height: auto;
      margin-top: 20px;
    }
    .UlBox {
      height: 752px;
    }
  }
  .count{
    height: 108px;
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 20px;
    font-size: 28px;
    color: #000;
  }
  .ul_box{
    margin: 0 20px 50px 20px;
  }
  .SongShowBox{
    display: flex;
  }
  .Num{
    display: flex;
    width: 90px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
  .li_list{
    font-size: 30px;
    width: 700px;
    padding: 20px 30px 20px 0;
    overflow: hidden;
  }
  .li_list h3{
    font-size: 28px;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .li_list span{
    font-size: 20px;
    color: #777;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
