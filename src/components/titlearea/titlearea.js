import React from 'react';
import styles from './titlearea.css'

const TitleArea = (props) => {
	// console.log(props.value);
	const updatedStyles = {
		'visibility': props.display,
		'height': props.height + "em"
	}
	return(
		<div className="container-fluid">
			<div className="row">
				<textarea 
				id={styles._newtitleArea}  
				placeholder="Enter a title"
				name="titlearea"
				style = {updatedStyles}
				onChange={props.onchange} 
				onClick = {props.click}
				value = {props.value}
				></textarea>
			</div>
		</div>
	)
}

export default TitleArea;