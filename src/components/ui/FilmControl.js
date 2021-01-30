import React from 'react';
import classes from './Film.css';

const FilmControl = (props) => (
    <div className={classes.BuildControl} key={props.key}>      
        <tr>
            <td>{props.filmTitle}</td>
            <td>{props.filmDesc}</td>
            <td>{props.releaseYear}</td>
            <td>{props.rentalRate}</td>
            <td>{props.rating}</td>
            <td> <input type="button" value="Add" onClick={props.add} /></td>
            <td><input type="button" value="Remove" onClick={props.remove} /></td>
        </tr>
    </div>
);

export default FilmControl;