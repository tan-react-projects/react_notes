import React from 'react';
import styles from './bodyarea.css'

const BodyArea = (props) => {
	// console.log(props.height);
	return(
		<div className="container-fluid">
			<div className="row">
				<textarea 
				 name="bodyarea"
				 rows='1'
				 id={styles._newNoteArea}
				 style={{height: props.height + "em"}} 
				 placeholder="Take a note"
				 onChange={props.onchange}  
				 value = {props.value}
				 ></textarea>
			</div>
		</div>
	)
}

export default BodyArea;