import React,{Component,Fragment} from 'react';
import './List.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';



class ListUI extends Component{
	constructor(){
		super();
		this.state={
			musicList:[]
		};
		move:false;
		this.handleMove = this.handleMove.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
	}
	render(){
		return(
            <Fragment>
            	<div id="musicList" ref="musicList">
					<ul>
					{
						this.state.musicList.map((item,index)=>{
                           return(
                                <li key={item.id} onTouchMove={this.handleMove} onTouchEnd={()=>{this.handleEnd(item.id,item.title,item.pic)}}>
									<div className="listOrder">{index+1}</div>
									<div className="listName">
									<h3>{item.title}</h3>
									<p>{item.author}</p>
									</div>
								</li>
                           	);
						})
					}
						
					</ul>
				</div>
            </Fragment>
			);
	}
	componentDidMount(){
		axios.post('/api/index/index',{
			"TransCode":"020111",
			"OpenId":"Test",
			"Body":{
				   "SongListId":"141998290"
			       }
		}).then((res)=>{
            var ErrCode = res.data.ErrCode ;
            if(ErrCode==='OK'){
              this.setState({
              	musicList:res.data.Body.songs 
              });
              // console.log(res)

            }
		})
	}
	handleMove(){
      this.move=false ;  
	}
	handleEnd(mid,name,pic){
      if(this.move){
        this.move=false 
      }else{
         this.props.history.push('/detail/'+mid);
         // this.refs.musicList.getElementById('musicList').style.backgroundImage=url(
         // "https://api.hibai.cn/music/Music/Music?id="+mid+"&type=pic")
            // console.log(pic)
            this.props.changeBackground(pic) 
           this.props.changeMusicName(name)
      }
	}
 
 }
function mapStateToProps(state){
	return{
		musicName:state.musicName,
		backgroundPic:state.backgroundPic
	}
}
function mapDispatchToProps(dispatch){
	return{

		changeMusicName(name){
			
		dispatch({type:'CHANGE_MUSICNAME',payload:name})
	},
	changeBackground(pic){
		dispatch({type:'CHANGE_BACKGROUND',payload:pic})
		// console.log('oooooooo'+pic)
	}
	}
	
}

var List = connect(mapStateToProps,mapDispatchToProps)(ListUI)
export default withRouter(List) ;