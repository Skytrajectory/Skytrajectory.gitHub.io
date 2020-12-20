const app = new Vue({
	el:"#playbox",
		data:{
			query: '',
			musicList: [],
			musicUrl: '',
			hotComments: [],
			coverUrl: '',
			isPlay: false,
			showVideo: false,
			mvUrl: '',
			musicCover: './images/cover.png',
			searchState:false,
			isShow:false,
		},
		methods:{
			searchMusic: function() {
			  var that = this;
			  that.searchState = true;
			  axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(response => {			  
				  that.musicList = response.data.result.songs;
				  console.log(that.musicList);
				  
			  })	
			that.query = ''			
			},
			playMusic: function(musicId) {
				//   console.log(musicId);
				var that = this;
				
				// 获取歌曲地址
				axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
				  function(response) {
					// console.log(response);
					// console.log(response.data.data[0].url);
					that.musicUrl = response.data.data[0].url;
				  },
				  function(err) {}
				);
		  
				// 歌曲详情获取
				axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
				  function(response) {
					// console.log(response);
					// console.log(response.data.songs[0].al.picUrl);
					that.musicCover = response.data.songs[0].al.picUrl;
				  },
				  function(err) {}
				);
		  
				// 歌曲评论获取
				axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
				  function(response) {
					console.log(response);
					// console.log(response.data.hotComments);
					that.hotComments = response.data.hotComments;
				  },
				  function(err) {}
				);
			  },
			play() {
				this.isPlay = true
				// 清空mv的信息
				this.mvUrl = ''
			  },
			  // audio的pause事件
			pause() {
				this.isPlay = false
			  },
			  // 播放mv
			playMV: function(mvid) {
				var that = this;
				axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
				  function(response) {
					// console.log(response);
					console.log(response.data.data.url);
					that.isShow = true;
					that.mvUrl = response.data.data.url;
				  },
				  function(err) {}
				);
			  },
			  // 隐藏
			hide: function() {
				var mv = document.getElementById('mv');
				mv.pause();
				this.isShow = false;
			  }	
		}//方法的结尾
		})//vue挂载的结尾

