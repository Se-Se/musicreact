import React ,{Component} from 'react';
import './Lyric.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class LyricUI extends Component{
	constructor(){
		super();
		this.state={
			lyric:[]
		}
	}
	render(){
		return (
           <div id="musicLyric" ref="musicLyric">
			    <ul ref="ulList">
			    {
			    	this.state.lyric.map((item,index)=>{
                     return (
                        <li key={index}>{item.lyr}</li>
                     	);
			    	})
			    }
				
                
               
			    </ul>
		  </div>
			);
	}
	componentDidMount(){
	 var mid = this.props.mid ;
	 axios.get('/music/Music/Music?id='+mid+'&type=lrc').then((res)=>{
         var statusText = res.statusText ;
         if(statusText==="OK"){
         	this.setState({
         		lyric:this.formateLrc(res.data)

         	});
              // console.log(this.state.lyric)
         	// console.log(this.props.backgroundPic)
         // this.refs.musicLyric.style.backgroundImage : url({this.props.background});
          
         }
          
           
	  });
	  document.getElementById('audio1').src='https://api.hibai.cn/music/Music/Music?id='+mid+'&type=url';
           // document.getElementById('audio1').play();
       document.getElementById('musicLyric').style.backgroundImage = "url(https://api.hibai.cn/music/Music/Music?id="+mid+"&type=pic)"||"/images/detailsBg.jpg";
	}

	componentDidUpdate(){
		if(this.props.isPlay){
		// var audio1 = document.getElementById('audio1'); 
		//  setInterval(()=>{var aaa=this.formateTime(audio1.currentTime);
                             // console.log(aaa+'歌词')  
		//  },1000);
		this.playLyric();
		}else{
			this.stopLyric();
		}
      
	}
	formateLrc(data){
    var re = /\[([^\]]+)\]([^[]+)/g ;
    var result=[]
    data.replace(re,($0,$1,$2)=>{
        result.push({ time : this.timeToNumber($1) , lyr : $2 });
       // console.log($2)
    }) 
    return result ;
	}
     timeToNumber(time){
		var arr = time.split('.');
		return arr[0]+'';
	}
formateTime(time){
		 var result;
		// var audio1 = document.getElementById('audio1');
		if(time%60>10){
          result= '0'+Math.floor(time/60)+':'+Math.floor(time%60)
		}else{
			result= '00:0'+Math.floor(time%60)
		}
		return result ;
	}
playLyric(){
	var lyricList = this.state.lyric ;
	var ulList = this.refs.ulList;
	var lis = ulList.getElementsByTagName('li');
	var audio1 = document.getElementById('audio1');
     var audiobar = document.getElementById('ball');
	this.timer=setInterval(()=>{
		for(var i=0;i<lyricList.length;i++){
		if(lyricList[i].time===this.formateTime(audio1.currentTime+.5)){
			// console.log(this.formateTime(audio1.currentTime))
			 // ulList[i].className='active';
			 for(var j=0;j<lis.length;j++){
			 	lis[j].className = 'active';
			 }
			lis[i].className = 'normal';
			if(i>8){
				ulList.style.top = -(i-6)*lis[0].offsetHeight+'px';
                 //  console.log(parseInt(audio1.currentTime))
                 // console.log(parseInt(audio1.duration))
                    // console.log(ulList.style.top)
			}else if(parseInt(audio1.currentTime)===0){
				ulList.style.top = 0 + 'px';
			}
		}
	}
	},200)
}	
stopLyric(){
	clearInterval(this.timer);
	// clearInterval(this.rollLyricTimer)
}
// setplayLyric(){
// 	var audio1 = document.getElementById('audio1');
// 	this.rollLyricTimer=setInterval(()=>{
// 		this.playLyric()
// 	},audio1.duration)
// }
  
}

function mapStateToProps(state){
       return {
       	backgroundPic:state.backgroundPic,
       	isPlay:state.isPlay
       }
	}
	function mapDispatchToProps(dispatch){
        // changeMusicName(name){
        // 	 dispatch({type:'CHANGE_MUSICNAME',payload:name})
        // }
        return {}
	}
var Lyric = connect(mapStateToProps,mapDispatchToProps)(LyricUI)
export default withRouter(Lyric) ;