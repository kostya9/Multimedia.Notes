import React from 'react';

import './GrandStaff.scss';

const Line = () => <div className="note-line"></div>
const Space = () => <div className="note-space"></div>
const Bar = () => <div className="note-bar"></div>

const Measure = () => (<span className="note-measure">
    <div className="note-measure-inner">
        <Line />
        <Space />
        <Line />
        <Space />
        <Line />
        <Space />
        <Line />
        <Space />
        <Line />
    </div>
    <Bar />
</span>);

export class GrandStaff extends React.Component {
    render() {
        return <div>
                <Measure />
                <Measure />
                <Measure />
                <Measure />
                <Measure />
                <Measure />
            </div>
    }
}