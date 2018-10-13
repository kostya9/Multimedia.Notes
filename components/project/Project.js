import React from 'react';
import {Link} from 'react-router-dom';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';

import './Project.scss';
import SVG from 'react-inlinesvg';
import { GrandStaff } from './GrandStaff/GrandStaff';

// NOTES FROM https://www.freepik.com/free-vector/musical-notes_795161.htm

export default class Project extends React.Component {
    render() {
        return (
            <Split separator={true} flex='right' priority={'right'}>
                <Sidebar size='small'>
                    <Link to="/">Home</Link>
                    <SVG src='img/note.svg' className='note-tool-img'/>
                </Sidebar>
                <Box>
                    <GrandStaff />
                </Box>
            </Split>
        );
    }
}