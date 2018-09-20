import React ,{Component,Fragment} from 'react';
import Header from '../Header/Header.js';
import List from'../List/List.js';
import './Home.css';
import {connect} from 'react-redux';


class HomeUI extends Component{
	render(){
		return(
           <Fragment>
           	<Header>{this.props.musicName}</Header>
           	<List></List>
           </Fragment>
			);
	}
}
function mapStateToProps(state){
	return {
		musicName:state.musicName
	}
}
function mapDispatchToProps(dispatch){
	return {

	}
}
var Home = connect(mapStateToProps,mapDispatchToProps)(HomeUI)
export default Home;