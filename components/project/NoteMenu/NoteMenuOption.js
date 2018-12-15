import React from 'react';
import './NoteMenuOption.scss';
import SVG from 'react-inlinesvg';
import Card from 'grommet/components/Card';
import ListItem from 'grommet/components/ListItem';
import { mapNoteToSvg } from '../../resources/noteLengthResourceMap';

export default class NoteMenuOption extends React.Component {
    render() {
        const svg = mapNoteToSvg(this.props.length);
        const width = 1.5 * svg.size + 'px';
        return (<Card
            textAlign='center'
            textSize='small'
            justify='center'
            thumbnail={<SVG src={svg.src} className='note-tool-img' style={{width: width}}/>}
            label={this.props.description} >
        </Card>);
    }
}