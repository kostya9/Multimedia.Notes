import PropTypes from 'prop-types';

export const NotePropType = PropTypes.shape({
    value: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
});

export const MeasurePropType = PropTypes.shape({
    number: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(NotePropType).isRequired
});