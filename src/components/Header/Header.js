import React,{Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';



class HeaderUI extends Component{
	render(){
		return (
              
              	<div id="musicHeader" >
			    {this.props.children}
		       </div>
             
			);
	}
}
function mapStateToProps(state){
	return{
		musicName:state.musicName,
	}
}
function mapDispatchToProps(dispatch){
	return{
		// dispatch({type:'CHANGE_MUSICNAME',payload:''})
	}
}
var Header = connect(mapStateToProps,mapDispatchToProps)(HeaderUI)
export default Header ;