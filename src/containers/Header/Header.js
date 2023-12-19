import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import Language from '../HomePage/Menus/Language';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { USER_ROLE } from '../../utils';
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            menuApp: []
        })
    }
    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.role
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.USER) {
                menu = []
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">

                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ paddingTop: '10px', display: 'flex' }}>
                        <Typography sx={{ mr: '10px' }}>
                            <FormattedMessage id="homeheader.welcome" />, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                        </Typography>
                        <Language />
                    </Box>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </Box>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
