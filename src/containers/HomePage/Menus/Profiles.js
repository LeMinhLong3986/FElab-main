
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'

import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'


import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'



class Profiles extends Component {
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
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={(event) => this.handleClick(event)}
                        size="small"
                        sx={{ padding: 0 }}
                        aria-controls={this.state.open ? 'basic-menu-profiles' : undefined}
                        aria-haspopup="true"
                        aria-expanded={this.state.open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            alt='Jisoo'
                            src='https://avatars.githubusercontent.com/u/121484216?v=4'
                        />
                    </IconButton>
                </Tooltip>


                <Menu
                    id="basic-menu-profiles"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button-profiles'
                    }}
                >
                    <MenuItem >
                        <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
                    </MenuItem>
                    <MenuItem >
                        <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
                    </MenuItem>
                    <Divider />

                    <MenuItem >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);



