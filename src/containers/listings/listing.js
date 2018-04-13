// this container will get data from the local/cloud database and pass it on as lists to its children who will then take it and sort it(this can be done here or in the children) and display it

import React, { Component } from 'react';
import Cards from '../../components/cards/cards';
import styles from './listing.css'

class Listing extends Component {
	state = {}

	render(){
		if (this.props.data.length !== 0) {

			let recent_cards = (
				<div className = {styles._fcontainer} >
					{this.props.data.map((post)=>{
						if (!post.pinned){	
							return <Cards
							title={post.title}
							body={post.body}
							id={post.id}
							tags={post.tags}
							click={this.props.click}
							pin = {post.pinned}
							key={post.id}></Cards>
						}
					})}
				</div>
			)

			//pinned cards
			let pinned_cards = (
				<div className = {styles._fcontainer} >
					{this.props.data.map((post)=>{
						if (post.pinned){	
							return <Cards
							title={post.title}
							click={this.props.click}
							body={post.body}
							id={post.id}
							tags={post.tags}
							pin = {post.pinned}
							key={post.id}></Cards>
						}
					})}
				</div>
			)

			//final output
			return(
				<div className={styles._fcontainer}>
					<div className = {styles._underline} >Pinned</div>
						{pinned_cards}
					<br/>
					<div className = {styles._underline} >Recent</div>
						{recent_cards}
				</div>
			);
		} else {
			return(
				<div>Loading...</div>
			)
		}
	};
};

// Listing.greet = "bello"

export default Listing;