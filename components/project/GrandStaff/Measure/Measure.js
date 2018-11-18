import React from 'react';
import MeasureLine from './MeasureLine';

import './Measure.scss';



const Bar = () => <div className="note-bar"></div>

export default class Measure extends React.Component {
    render() {
        const {number} = this.props; 
        const treble =  ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4'];

        const between = ['D4', 'C4', 'B3'];

        const base =    ['A3', 'G3', 'F3', 'E3', 'D3', 'C3', 'B2', 'A2', 'G2'];
        
        return (
        <span className="note-measure">
            <div className="note-measure-inner">
                <span className="note-staff">
                    {treble.map((l, i) => 
                        <MeasureLine key={l} 
                                    measureNumber={number}
                                    value={l} 
                                    isSpace={i % 2 === 1}/>)}
                </span>
                <Bar />
                {between.map((l, i) => 
                        <MeasureLine key={l} 
                                    measureNumber={number}
                                    value={l} 
                                    isSpace={true}/>)}
                <span className="note-staff">
                    {base.map((l, i) => 
                        <MeasureLine key={l} 
                                    measureNumber={number}
                                    value={l} 
                                    isSpace={i % 2 === 1}/>)}
                </span>
                <Bar />
            </div>
        </span>)
    }
}