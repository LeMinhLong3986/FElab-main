
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box'
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant'
//dong mo ngoac la import bien

import { changeLanguageApp } from '../../../store/actions'
class Language extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)

        //khai bao event actions
    }

    render() {
        let language = this.props.language
        return (
            <Box sx={{
                display: 'flex',
                gap: 1.5,
                color: 'white',
                pl: 2,
                pr: 2,
            }} >
                <GTranslateIcon />
                <Box sx={{ cursor: 'pointer', color: language === LANGUAGES.VI ? '#fbc531' : 'white', ":hover": { color: '#fbc531', opacity: '0.8' } }} >
                    <Tooltip title='Translate to Vietnamese'>
                        <Typography onClick={() => this.changeLanguage(LANGUAGES.VI)} >
                            VN
                        </Typography>
                    </Tooltip>
                </Box>
                <Box sx={{ cursor: 'pointer', color: language === LANGUAGES.EN ? '#e84118' : 'white', ":hover": { color: '#c23616', opacity: '0.8' } }}>
                    <Tooltip title='Translate to English'>
                        <Typography onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                            EN
                        </Typography>
                    </Tooltip>
                </Box>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
