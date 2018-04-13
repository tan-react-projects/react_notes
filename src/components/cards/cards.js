import React from 'react';
import styles from './cards.css'

const Cards = (props) => {
	// console.log(props)
	return(
		<div className = {styles._fchildren}>
			<span className={styles._title}> {props.title}</span><br/>
			<span className={styles._body}> {props.body}</span><br/>
			<div className={styles._button}>
					<span onClick = {(e)=>props.click('delete',props,e)}
				>delete</span>
				<span onClick = {(e)=>props.click('edit',props,e)}
				>edit</span>
				<span onClick = {(e)=>props.click('pin',props,e)}
				style={ props.pin ? {display: 'none'} : {display: 'inline-block'}}
				>pin</span>
			</div>
			
		</div>
	)
}

export default Cards;