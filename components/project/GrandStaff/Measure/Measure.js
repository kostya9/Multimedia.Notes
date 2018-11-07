import React from 'react';
import MeasureLine from './MeasureLine';

import './Measure.scss';



const Bar = () => <div className="note-bar"></div>

export default class Measure extends React.Component {
    render() {
        const {number} = this.props; 
        const lines = ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4']
        return (
        <span className="note-measure">
            <div className="note-measure-inner">
                {lines.map((l, i) => 
                    <MeasureLine key={l} 
                                 measureNumber={number}
                                 value={l} 
                                 isSpace={i % 2 === 1}/>)}
            </div>
            <Bar />
        </span>)
    }
}