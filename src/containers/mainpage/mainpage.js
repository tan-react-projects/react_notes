import React, { Component } from 'react';
import BodyArea from '../../components/bodyarea/bodyarea'
import TitleArea from '../../components/titlearea/titlearea'
import Tags from '../../components/tags/tags'
import Lists from '../listings/listing'
import styles from './mainpage.css'
import firebase from '../../firebase'

class MainPage extends Component{
	state = {
		// default values
		title: "",
		body: "",
		tags: "",

		// sample values
		posts: [],

		// UI control
		body_area_height: 3,
		title_area_height:3,
		flyout_display:'hidden',
	}

	componentDidMount(){
		const postsRef = firebase.database().ref('posts');
		postsRef.on('value', (snapshot) => {
			let items = snapshot.val()
			// console.log("componentDidMount: ", items);
			let posts = [];
			for (let item in items) {
	      		posts.push({
	      			title: items[item].title,
	      			body: items[item].body,
	      			date: items[item].date,
	      			tags: items[item].tags,
	      			id: item,
	      			pinned: items[item].pinned
	      		})
	    	}
	    	this.setState({posts:posts})
		})
	}



	changeHandler = (e) => {
		let oldbodyheight = this.state.body_area_height;
		let oldtitleheight = this.state.title_area_height;
		// console.log('changed value',e.target.value)
		
		if(e.target.name === 'bodyarea'){
			// console.log("changed the value of: ",e.target)
			this.setState({body:e.target.value})
			if (e.target.scrollHeight > e.target.clientHeight){
				this.setState({body_area_height:oldbodyheight + 1});
			}
		} 
		else if(e.target.name === 'titlearea'){
			this.setState({title:e.target.value})
			if (e.target.scrollHeight > e.target.clientHeight){
				// console.log("a wild scrollbar appeared on title")
				this.setState({title_area_height:oldtitleheight+ 1})
			} 
		}
		else if(e.target.type === 'text'){
			this.setState({tags:e.target.value})
			// console.log("changed the value of: ",e.target.type)
		}

		// to do
		// figure out how to make the text area shrink as text is deleted
	}


	clickHandler = (type = null, e) => {
		// console.log("button: ",type)
		if (type === 'title' && e.target.scrollHeight > e.target.clientHeight) {
			this.setState({title_area_height:5})
		} 
		else if(type === 'button'){
			// console.log('Done');

			let newPost = {
				title: "",
				body: "",
				date: null,
				tags:[],
				pinned: false
			}

			// configure the key value pairs
			newPost.title = this.state.title;
			newPost.body = this.state.body;
			if (this.state.tags !== "") {newPost.tags = [...this.state.tags.split(",")];};
			newPost.date = new Date().toDateString();
			console.log(newPost)

			// save to post array
			// let arr = [...this.state.posts];
			// arr.push(newPost);
			// this.setState({posts:arr})

			// save to firebase
			const postsRef = firebase.database().ref('posts');
			postsRef.push(newPost);

			//after save clear the input field
			this.setState({
				title:"",
				body:"",
				tags:"",
				body_area_height:3,
				title_area_height:3,
				flyout_display:'hidden'
			});
		}
	}


	focusGainHandler = (e) => {
		if (this.state.body_area_height < 5 ){	
			this.setState({body_area_height:5});
		};
		this.setState({flyout_display:'visible'});
	}


	focusLostHandler = (e) => {
		// console.log('lost focus');
		this.setState({
			body_area_height:3,
			title_area_height:3
		});

		if (!e.currentTarget.contains(e.relatedTarget)) {
			this.setState({flyout_display:'hidden'});
    	}
  		// console.log("relatedTarget:", e.relatedTarget)
	}

	cardClickHandler = (type = null, data, e) => {
		const itemRef = firebase.database().ref(`/posts/${data.id}`);
		console.log(data);

		// delete posts
		if (type === 'delete') {
			itemRef.remove()
		}

		// edit post

		if (type === 'edit') {
			// console.log(data.tags);
			let unpackTags = "";
			if (typeof data.tags !== 'undefined') {	
				data.tags.map((x)=>{
					unpackTags = unpackTags + x + ',';
				})
				unpackTags = unpackTags.replace(/(^,)|(,$)/g, "");
			}

			this.setState({
				title:data.title,
				body:data.body,
				body_area_height:5,
				tags: unpackTags,
				flyout_display:'visible'
			});
			itemRef.remove()
		}

		// pin post
		if (type === 'pin') {
			itemRef.update({ pinned: true })
		}
	}


	render(){
		// todo: change [] to 0 later for loading screen
		if(this.state.posts.length !== [] ){
		return(
			<div className={styles._mainPage} id="fly">
				<div 
				className={styles._flyout} 
				onClick={this.flyoutClickHandler} 
				onFocus={this.focusGainHandler}
				onBlur={this.focusLostHandler}
				>
					<TitleArea 
					 display = {this.state.flyout_display}
					 height={this.state.title_area_height}
					 onchange = {this.changeHandler}
					 click = {(e) => this.clickHandler("title",e)}
					 value = {this.state.title}
					></TitleArea>

					<BodyArea 
					 something = {this.state.posts}
					 onchange = {this.changeHandler}
					 height={this.state.body_area_height}
					 value = {this.state.body}
					 ></BodyArea>

					 
			 		<Tags
					 data = {this.state.posts}
					 onchange = {this.changeHandler}
					 display = {this.state.flyout_display}
					 value = {this.state.tags}
					></Tags>

						
					<button
					style={{'visibility': this.state.flyout_display}}
					className={styles._saveBtn}
					onClick={(e) => this.clickHandler("button",e)}
					>Done</button>
						 
				</div>

					<Lists 
					click = {this.cardClickHandler}
					data = {this.state.posts}
					></Lists>
			</div>
		)
	} else {
		return(
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}}
}


export default MainPage;