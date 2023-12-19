import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'


import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Check from '@mui/icons-material/Check'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

class CourseHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            open: false,
        }

    }


    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true,
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false,
        })
    }
    render() {
        return (
            <Box>
                <Button
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}
                    id="basic-button-templates"
                    aria-controls={this.state.open ? 'basic-menu-templates' : undefined}
                    aria-haspopup="true"
                    aria-expanded={this.state.open ? 'true' : undefined}
                    onClick={(event) => this.handleClick(event)}
                >
                    Course
                </Button>
            </Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseHeader);



