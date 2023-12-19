import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LabMembers.scss'
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router';
class LabMembers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrMembers: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.membersRedux !== this.props.membersRedux) {
            this.setState({
                arrMembers: this.props.membersRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadUsers()
    }
    handleViewDetailMember = (member) => {
        // console.log('view infor: ', member)
        if (this.props.history) {
            this.props.history.push(`/detail-member/${member.id}`)
        }

    }
    render() {
        // console.log('check lab member: ', this.props.membersRedux)
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        let allMembers = this.state.arrMembers

        return (

            <div className='section-lab-members'>
                <div className='lab-members-container'>
                    <div className='lab-members-header'>
                        <span className='title-section'>Lab Members</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='lab-members-body'>
                        <Slider {...settings} >
                            {allMembers && allMembers.length > 0
                                && allMembers.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.firstName} ${item.lastName}`
                                    let phoneMembers = `${item.phone}`
                                    let emailMembers = `${item.email}`
                                    return (
                                        <div className='lab-members-cusomize' key={index} onClick={() => this.handleViewDetailMember(item)}>
                                            <div className='bg-image' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <Box sx={{ fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>{nameVi}</Box>
                                            <Divider variant="middle" flexItem sx={{ fontFamily: '', fontWeight: '900', color: '#435278', marginY: '10px' }}>
                                            </Divider>

                                            <div>Tel: {phoneMembers}</div>
                                            <div>Email: {emailMembers}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div >
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        membersRedux: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabMembers));
