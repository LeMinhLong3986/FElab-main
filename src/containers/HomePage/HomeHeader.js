import React, { Component } from 'react';
import { connect } from 'react-redux';


import AppsIcon from '@mui/icons-material/Apps'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import IntroHeader from './Menus/IntroHeader'
import MemberHeader from './Menus/MemberHeader'
import ProjectsHeader from './Menus/ProjectsHeader'
import CourseHeader from './Menus/CourseHeader'
import Profiles from './Menus/Profiles'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import './HomeHeader.scss'
import Language from './Menus/Language';
import { FormattedMessage } from 'react-intl';
import imageHeader from '../../assets/header-background.jpg'
import { withRouter } from 'react-router';
class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
        }
    }
    handleOnChangeSearch = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }
    handleResult = () => {
        this.setState({
            searchValue: ''
        });
    }
    returnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    render() {
        return (

            <React.Fragment>
                <Box
                    px={2}
                    sx={{
                        // position: 'fixed',
                        // zIndex: 1500,
                        width: '100%',
                        height: '60px',
                        display: 'plex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        overflowX: 'auto',
                        bgcolor: '#1565c0',
                        '&::-webkit-scrollbar': {
                            width: '10px',
                            height: '10px'
                        },

                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#fafafa'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ced0da',
                            borderRadius: '8px'
                        },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' },
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AppsIcon onClick={() => this.returnHome()} sx={{ color: 'white', cursor: 'pointer' }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

                            <Typography variant='span' sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                                CLQA Lab
                            </Typography>

                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            <IntroHeader />
                            <MemberHeader />
                            <ProjectsHeader />
                            <CourseHeader />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            id="outlined-search"
                            label="Search..."
                            type="text"
                            size='small'
                            value={this.state.searchValue}
                            onChange={(event) => this.handleOnChangeSearch(event)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon sx={{ color: 'white' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <ClearIcon
                                        fontSize='small'
                                        sx={{ color: this.state.searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                                        onClick={() => this.handleResult()}
                                    />
                                )
                            }}
                            sx={{
                                minWidth: '120px',
                                maxWidth: '170px',
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                }
                            }} />
                        <Language />
                        <Tooltip title="Notifications">
                            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                                <NotificationsNoneIcon sx={{ color: 'white' }} />
                            </Badge>
                        </Tooltip>

                        <Tooltip title="Help">
                            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
                        </Tooltip>

                        <Profiles />
                    </Box>

                </Box >{
                    this.props.isShowBanner === true &&
                    <Box sx={{
                        marginTop: '5px',
                        backgroundImage: `url(${imageHeader})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '600px',
                        boxShadow: '0 10px 10px rgba(0,0,0,0.5)',
                    }}>

                    </Box>}

            </React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
