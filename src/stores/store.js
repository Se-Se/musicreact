
import {createStore,combineReducers}from 'redux';


function musicNameReducer(state='',action){
	if(action.type==='CHANGE_MUSICNAME'){
		return action.payload ;
	}else{
		return state ;
	}
}
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
		return state ;//此处不可以用false或true代替；会出错
	}
}
function voiceShowReducer(state,action){
	if(action.type==="CHANGE_VOICE"){
		return action.payload ;
	}else{
		return false ;
	}
}
function loopShowReducer(state=false,action){
	if(action.type==="CHANGE_LOOP"){
		return action.payload
	}else{
		return state ;
	}
}
var reducers=combineReducers({
	musicName:musicNameReducer , 
	backgroundPic:backgroundPicReducer,
	isPlay:playingReducer,
	voiceShow:voiceShowReducer,
	loopShow:loopShowReducer
})
var store= createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 
 export default store ;

