import React from 'react';
import {Link} from 'react-router-dom';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import App from 'grommet/components/App';
import List from 'grommet/components/List';

import GrandStaff from './GrandStaff/GrandStaff';
import NoteMenu from './NoteMenu/NoteMenu';

// NOTES FROM https://www.freepik.com/free-vector/musical-notes_795161.htm

export default class Project extends React.Component {
    render() {
        return (
            <App>
                <Split separator={true} flex='right' priority={'right'}>
                    <Sidebar size='small'>
                        <Link to="/">Home</Link>
                        <NoteMenu />
                    </Sidebar>
                    <Box>
                        <GrandStaff />
                    </Box>
                </Split>
            </App>
        );
    }
}