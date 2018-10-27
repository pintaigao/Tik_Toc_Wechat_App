const app = getApp()

Page({
  data: {
    // 用于分页的属性
    total:1,
    page:1,
    videoList:[],
    screenWidth: 350,
    serverUrl:"",
    searchContent:"",
  },

  onLoad: function (params) {
    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });

    let searchContent = params.search;
    let isSaveRecord = params.isSaveRecord;

    if(isSaveRecord == null || isSaveRecord == "" || isSaveRecord == undefined) {
      isSaveRecord = 0;
    }

    me.setData({
      searchContent:searchContent
    })

    // 获取当前的分页数
    let page = me.data.page;
    me.getAllVideoList(page,isSaveRecord);
   
  },

  // 上拉刷新
  onReachBottom:function(){
    let me = this;
    let currentPage = me.data.page;
    let totaPage = me.data.totalPage;
    // 判断当前页数和总页数是否相等，如果相等则无需查询
    if(currentPage === totaPage){
      wx.showToast({
        title: '已经没有视频了',
        icon:"none"
      })
      return;
    }

    let page = currentPage + 1;

    me.getAllVideoList(page,0);
  },

  // 下拉刷新
  onPullDownRefresh: function(){
    wx.showNavigationBarLoading();
    this.getAllVideoList(1,0);
  },


  getAllVideoList: function (page, isSaveRecord){
    let me = this;
    let serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待，加载中',
    });

    let searchContent = me.data.searchContent;
    wx.request({
      url: serverUrl + '/video/showAll?page=' + page + "&isSaveRecord="+ isSaveRecord,
      data:{
        videoDesc:searchContent
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        // 判断当前页page是否是第一页，如果是第一页，那么设置videoList为空
        if (page === 1) {
          me.setData({
            videoList: []
          });
        }

        let videoList = res.data.data.rows;

        let newVideoList = me.data.videoList;

        me.setData({
          videoList: newVideoList.concat(videoList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        })
      }
    })
  },

  showVideoInfo:function(e){
    let me = this;
    let videoList = me.data.videoList;
    let arrindex = e.target.dataset.arrindex; 
    let videoInfo = JSON.stringify(videoList[arrindex]);

    wx.redirectTo({
      url:"../videoinfo/videoinfo?videoInfo="+videoInfo
    })
  }

})
