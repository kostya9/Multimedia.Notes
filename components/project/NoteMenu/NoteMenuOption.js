import React from 'react';
import './NoteMenuOption.scss';
import SVG from 'react-inlinesvg';
import Card from 'grommet/components/Card';
import ListItem from 'grommet/components/ListItem';
import { mapNoteLengthToSrc } from '../../resources/noteLengthResourceMap';

export default class NoteMenuOption extends React.Component {
    render() {
        const path = mapNoteLengthToSrc(this.props.length);
        return (<Card
            textAlign='center'
            textSize='small'
            thumbnail={<SVG src={path} className='note-tool-img'/>}
            label={this.props.description} >
        </Card>);
    }
}