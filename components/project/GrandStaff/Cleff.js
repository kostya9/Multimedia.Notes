import React from 'react';
import { range } from '../../../utils/range';
import ReadonlyMeasureLine from './Measure/ReadonlyMeasureLine';
import SVG from 'react-inlinesvg';

export class Cleff extends React.Component {
    render() {
        var measureLines = range(0, 9);

        var between = range(0, 3);
        return (
            <span className="note-measure cleff-measure">
                <div className="note-measure-inner">
                    <span className="note-staff">
                        <SVG src={'img/treble.svg'} className="treble cleff"/>
                        {measureLines.map((i) => <ReadonlyMeasureLine key={i} isSpace={i % 2 === 1}/>)}
                    </span>
                    {between.map((i) => <ReadonlyMeasureLine key={i} isSpace={true}/>)}
                    <span className="note-staff">
                        <SVG src={'img/bass.svg'} className="bass cleff"/>
                        {measureLines.map((i) => <ReadonlyMeasureLine key={i} isSpace={i % 2 === 1}/>)}
                    </span>
                </div>
            </span>)
    }
}