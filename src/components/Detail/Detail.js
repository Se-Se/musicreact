import React,{Component,Fragment} from 'react';
import './Detail.css';
import Header from '../Header/Header.js';
import Lyric from '../Lyric/Lyric.js';
import{NavLink} from 'react-router-dom';
import {connect} from 'react-redux';





class DetailUI extends Component{
	render(){
		
		return(
             <Fragment>

                <Header><NavLink to="/home">&lt;</NavLink>{this.props.musicName}</Header>
             	<Lyric mid={this.props.match.params.mid}/>
             </Fragment>

			)
	}
	
}
function mapStateToProps(state){
	return {
		musicName:state.musicName,
		backgroundPic:state.backgroundPic
	}
}
function mapDispatchToProps(dispatch){
	return {

	}
}
var Detail = connect(mapStateToProps,mapDispatchToProps)(DetailUI) 
export default Detail ;