import React from 'react';
import PropTypes from 'prop-types';

class ReadonlyMeasureLine extends React.Component {
    render() {
        const classOuter = this.props.isSpace ? 'note-space' : 'note-line';
        const classInner = classOuter + '-internal';
        return (<div className={classOuter}>
            <div className={classInner}>

            </div>
        </div>);
    }
}

ReadonlyMeasureLine.propTypes = {
    isSpace: PropTypes.bool.isRequired
};

export default ReadonlyMeasureLine;