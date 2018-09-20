import React,{Component,Fragment} from 'react';
import './Audio.css';
import {connect}from 'react-redux';



class AudioUI extends Component{
	render(){
		return(
            <Fragment>
	            <div id="musicAudio">
					<div className="audioPlay" ref="audioPlay" onClick={()=>{this.props.handleIsPlay(this.props.isPlay)}}></div>
						<div className="audioProgress" ref="audioProgress1">
							<div className="audioBar" ref="audioBar1" id="ball"></div>
							<div className="audioNow" ref="audioNow1"></div>
					    </div>
					    <audio src="" ref="audio1" id="audio1" loop="loop"></audio>
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
		}else{
			this.handlePause();
		}
	}
	 handlePause(){
	this.refs.audio1.pause();
	this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPlay.png)';
	clearInterval(this.timer)
}
    handlePlaying(){
    	this.refs.audio1.play();
    	this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPause.png)';
    	this.playingStatus();
    	this.timer=setInterval(()=>{this.playingStatus()},200);
        
    }

    playingStatus(){
    	var audioProgress1 = this.refs.audioProgress1;
    	var audioBar1 = this.refs.audioBar1;
    	var audioNow1 = this.refs.audioNow1;
    	var audio1 = this.refs.audio1 ;
    	var scale=audio1.currentTime/audio1.duration ;
      
         audioBar1.style.left=scale*audioProgress1.offsetWidth + 'px';
         audioNow1.style.width = scale*100+'%';
    }
    handleMoveBar(){
    	var audioProgress1 = this.refs.audioProgress1;
    	var audioBar1 = this.refs.audioBar1;
    	var audioNow1 = this.refs.audioNow1;
    	var audio1 = this.refs.audio1 ;
    	var disX=0 ;
        audioBar1.addEventListener('touchstart',(ev)=>{
            
                var touch = ev.changedTouches[0];
         disX = touch.pageX-audioBar1.offsetLeft;
         // console.log(disX)
         document.addEventListener('touchmove',(ev)=>{
            
            var touch = ev.changedTouches[0];
             var L = touch.pageX-disX;
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
               });
          //      document.addEventListener('touchend',(ev)=>{
          //     document.ontouchmove=document.ontouchend=null;
          // });
                document.ontouchend=function(){
                    document.addEventListener=null ;
                }
               return false ;
        })

       }
    }



function mapStateToProps(state){
	return {
		isPlay:state.isPlay
	}
}
function mapDispatchToProps(dispatch){
	return {
		handleIsPlay(isPlaying){
			dispatch({type:'CHANGE_MUSIC',payload:!isPlaying})
		}
	}
}

var Audio = connect(mapStateToProps,mapDispatchToProps)(AudioUI) ;
export default Audio ;