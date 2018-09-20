
import {createStore,combineReducers}from 'redux';


function musicNameReducer(state='',action){
	if(action.type==='CHANGE_MUSICNAME'){
		return action.payload ;
	}else{
		return state ;
	}
};
function backgroundPicReducer(state,action){
	if(action.type==='CHANGE_BACKGROUND'){
		// console.log(action.payload+'2222222222222')
		return action.payload||'/images/bg.jpg' ;
	}else{
		return '/images/bg.jpg'
	}
}
function playingReducer(state=false,action){
	if(action.type==='CHANGE_MUSIC'){
		return action.payload
	}else{
		return false ;
	}
}
var reducers=combineReducers({
	musicName:musicNameReducer , 
	backgroundPic:backgroundPicReducer,
	isPlay:playingReducer
})
var store= createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 
 export default store ;

