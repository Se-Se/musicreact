import React,{Component,Fragment} from 'react';
import './Audio.css';
import {connect}from 'react-redux';



class AudioUI extends Component{
       constructor(){
        super();
        this.state={
         voiceShow:false
        };
     
        
       }
	render(){
		return(
            <Fragment>
	            <div id="musicAudio">
					<div className="audioPlay" ref="audioPlay" onClick={()=>{this.props.handleIsPlay(this.props.isPlay)}}></div>
						<div className="audioProgress" ref="audioProgress1">
							<div className="audioBar" ref="audioBar1" id="ball"></div>
							<div className="audioNow" ref="audioNow1"></div>
                            <div className="nextSong">
                            <div className="iconfont icon-bofangqixiashou"></div>
                            <div className="iconfont icon-pre"></div>  
                            
                            </div>
                             <div className="iconfont icon-bofangqi_suijibofang_"></div>  
                            <div id="loop" className="iconfont icon-xunhuanbofang" onClick={()=>{this.handleLoop(this.props.loopShow)}}></div>  
                            <div className="iconfont icon-bofangqi-yinliang"onClick={()=>{this.handleVoiceShow(this.props.voiceShow)}}></div> 
                            <div className="iconfont icon-bofangqi-suoping_"></div> 
                            <div className="ballBar" ref="ballBar">
                            <div className="ball" ref="ball"></div>
                            </div>

					    </div>
					    <audio src="" ref="audio1" id="audio1" loop="loop" ></audio>
				</div>
            </Fragment>
			);
	}
	componentDidMount(){
		this.handleMoveBar();
	}
	componentDidUpdate(){
		if(this.props.isPlay){
			this.handlePlaying();
            this.handleMoveBar();
            this.handleVoice();
           

		}else{
      
      console.log(this.props.isPlay+'播放');
			this.handlePause();
		}
	}

//播放暂停

	 handlePause(){
	this.refs.audio1.pause();
	this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPlay.png)';
	clearInterval(this.timer)
}

//开始播放
   handlePlaying(){
    	this.refs.audio1.play();
    	this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPause.png)';
    	this.playingStatus();
    	this.timer=setInterval(()=>{this.playingStatus()},200);
     }

//音量控件显示/隐藏

    handleVoiceShow(isVoiceShow){
        // console.log(this.props.voiceShow+'音量')
        if(this.props.voiceShow){
        
        this.refs.ballBar.style.display = "none";
         
        }else{
            this.refs.ballBar.style.display= "block";
           
        }
        this.props.changeVoiceShow(isVoiceShow);
        
    }
   
//循环控件

    handleLoop(isLoop){

        if(this.props.loopShow){
            this.refs.audio1.loop="loop";
            document.getElementById('loop').style.color="green"
            // console.log( this.refs.audio1.loop+'loop')
        }else{
            this.refs.audio1.loop="";
            document.getElementById('loop').style.color="white"
        }
        this.props.changeLoop(isLoop)      
        
      
     }

//播放状态

    playingStatus(){
    	var audioProgress1 = this.refs.audioProgress1;
    	var audioBar1 = this.refs.audioBar1;
    	var audioNow1 = this.refs.audioNow1;
    	var audio1 = this.refs.audio1 ;
    	var scale=audio1.currentTime/audio1.duration ;
      
         audioBar1.style.left=scale*audioProgress1.offsetWidth - 12+ 'px';
         audioNow1.style.width = scale*100+'%';
    }

//音量控件

    handleVoice(){
        var audio1 = this.refs.audio1;
        var ballBar = this.refs.ballBar ;
        var voiceBall = this.refs.ball ;
        var disY = 0;
    
        function moveFn(ev){
           
            var touch = ev.changedTouches[0];
            var H = touch.pageY-disY ;
            if(H<0){
                H=0
            }else if(H>ballBar.offsetHeight-11){
                H = ballBar.offsetHeight ;
            }
            voiceBall.style.top = H + 'px';
            var scale = H/ballBar.offsetHeight ;
            // console.log((scale).toFixed(1))
              audio1.volume=1-parseFloat(scale).toFixed(1) ;
          }

             function endFn(){
                    document.removeEventListener('touchmove',moveFn);
                    document.removeEventListener('touchend',endFn);
               }
          voiceBall.addEventListener('touchstart',(ev)=>{
            // console.log(111)
          var touch = ev.changedTouches[0];
          disY = touch.pageY-voiceBall.offsetTop;
          document.addEventListener('touchmove',moveFn);
             document.addEventListener('touchend',endFn);  
      
          },false)
          window.event.stopPropagation();
    }

//播放进度条

    handleMoveBar(){
    	var audioProgress1 = this.refs.audioProgress1;
    	var audioBar1 = this.refs.audioBar1;
    	var audioNow1 = this.refs.audioNow1;
    	var audio1 = this.refs.audio1 ;
    	var disX1=0 ;

        function moveFn(ev){
           
            var touch1 = ev.changedTouches[0];
             var L = touch1.pageX-disX1;
             if(L<-7){
                 L=-7
                  }else if(L>audioProgress1.offsetWidth-7){
                 L = audioProgress1.offsetWidth-7 
             }
             // console.log(L)
                 audioBar1.style.left= L +'px';
              var scale=L/(audioProgress1.offsetWidth-7) ;
                audio1.currentTime=audio1.duration * scale ;
                audioNow1.style.width=scale*100+'%';
               }
               function endFn(){

                    document.removeEventListener('touchmove',moveFn,false);
                    document.removeEventListener('touchend',endFn,false);
               }

        audioBar1.addEventListener('touchstart',(ev)=>{
            
                var touch1 = ev.changedTouches[0];
         disX1 = touch1.pageX-audioBar1.offsetLeft;
         // console.log(disX)
            document.addEventListener('touchmove',moveFn);
          //      document.addEventListener('touchend',(ev)=>{
          //     document.ontouchmove=document.ontouchend=null;
          // });
            document.addEventListener('touchend',endFn);  
                
               // window.event.stopPropagation()
        },false)


       }

    }



function mapStateToProps(state){
	return {
		isPlay:state.isPlay,
        voiceShow:state.voiceShow,
        loopShow:state.loopShow
	}
}
function mapDispatchToProps(dispatch){
	return {
		handleIsPlay(isPlaying){
			dispatch({type:'CHANGE_MUSIC',payload:!isPlaying})
		},
        changeVoiceShow(isVoiceShow){
            dispatch({ type:'CHANGE_VOICE',payload:!isVoiceShow})
        },
        changeLoop(isLoop){
            dispatch({type:'CHANGE_LOOP',payload:!isLoop})
        }
	}
}

var Audio = connect(mapStateToProps,mapDispatchToProps)(AudioUI) ;
export default Audio ;