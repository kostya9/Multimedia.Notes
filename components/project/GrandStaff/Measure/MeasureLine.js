import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import { NotePropType } from '../../../propTypes/grandStaff';
import { mapNoteLengthToSvg } from '../../../resources/noteLengthResourceMap';

import {connect} from 'react-redux';
import { previewChange, addNote, removeNote } from '../../../../actions/project';

const MeasureLineState = (initialState, ownProps) => state => ({
    notes: state.measures[ownProps.measureNumber].notes,
    previewNote: state.previewNote && state.previewNote.measureNumber === ownProps.measureNumber && state.previewNote.value === ownProps.value && state.previewNote,
    mode: state.mode
})

const MeasureLineActions = (dispatch, ownProps) => ({
    addNote: () => dispatch(addNote()),
    removeNote: (position) => dispatch(removeNote(ownProps.measureNumber, ownProps.value, position)),
    previewChange: (position) => dispatch(previewChange(ownProps.measureNumber, ownProps.value, position)),
})

class MeasureLine extends React.Component {
    refCallback(element) {
        if (element) {
            const {width, left} = element.getBoundingClientRect();
            if(!this.state || width != this.state.width || left != this.state.left) {
                this.setState({width: width, left: left});
            }
        }
      };

    renderNote(n, i, isPreview = false) {
        const left = n.position * 100 + '%';
        const svg = mapNoteLengthToSvg(n.length);
        const width = svg.size + 'px';
        return <SVG src={svg.src} className='note-staff-img' style={{left: left, opacity: isPreview ? 0.5 : 1, width: width}} key={i}/>
    }

    onNoteClick(e) {
        if(this.props.mode !== 'edit')
            return;

        const {addNote, removeNote} = this.props;

        if (e.type === 'click') {
            addNote();
        } else if (e.type === 'contextmenu') {
            const {width, left} = this.state;
            const mouseAdjustment = -10; /* Some mouse adjustment for visual accuracy */
            const offset = (e.nativeEvent.clientX - left) + mouseAdjustment;
            const position = offset / width;
            removeNote(position);
        }
    }

    onMove(e) {
        if(this.props.mode !== 'edit')
            return;

        const {previewChange} = this.props;
        const {width, left} = this.state;
        const mouseAdjustment = -10; /* Some mouse adjustment for visual accuracy */
        const offset = (e.nativeEvent.clientX - left) + mouseAdjustment;
        const position = offset / width;
        previewChange(position);
    }

    render() {
        const classOuter = this.props.isSpace ? 'note-space' : 'note-line';
        const classInner = classOuter + '-internal';
        return (<div 
                    ref={this.refCallback.bind(this)} 
                    className={classOuter} 
                    onClick={this.onNoteClick.bind(this)} 
                    onContextMenu={this.onNoteClick.bind(this)}
                    onMouseMove={this.onMove.bind(this)}>
            <div className={classInner}>
            {this.props.notes.filter(n => n.value === this.props.value).map((n, i) => this.renderNote(n, i, false))}
            {this.props.previewNote && this.renderNote(this.props.previewNote, -1, true)}
            </div>
        </div>);
    }
}

MeasureLine.propTypes = {
    notes: PropTypes.arrayOf(NotePropType).isRequired,
    value: PropTypes.string.isRequired,
    isSpace: PropTypes.bool.isRequired,
    addNote: PropTypes.func.isRequired
};

export default MeasureLine = connect(MeasureLineState, MeasureLineActions)(MeasureLine);