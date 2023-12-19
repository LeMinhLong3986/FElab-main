import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailMember.scss'
import { Divider } from '@mui/material';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailInforMember } from '../../../services/userService'
class DetailMember extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            detailMember: {}
        })
    }
    async componentDidMount() {
        if (this.props.match
            && this.props.match.params
            && this.props.match.params.id) {

            let id = this.props.match.params.id
            let res = await getDetailInforMember(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailMember: res.data
                })

            }

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        console.log(this.props.match.params.id)
        let { detailMember } = this.state
        let nameVi = `${detailMember.firstName} ${detailMember.lastName}`
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='member-detail-container'>
                    <div className='member-detail-header'>
                        {nameVi}
                    </div>
                    <Divider sx={{ fontFamily: '', fontSize: '1.5rem', fontWeight: '700', color: '#7f8c8d', marginY: '30px', paddingX: '60px' }}>
                        Thông tin chi tiết
                    </Divider>
                    <div className='member-detail-page'>
                        <div className='member-image'
                            style={{ backgroundImage: `url(${detailMember && detailMember.image ? detailMember.image : ''})` }}
                        ></div>
                        <div className='member-infor'>

                            {detailMember && detailMember.Markdown && detailMember.Markdown.description
                                && <span>
                                    {detailMember.Markdown.description}
                                </span>}

                            {detailMember && detailMember.Markdown && detailMember.Markdown.contentHTML
                                && <div dangerouslySetInnerHTML={{ __html: detailMember.Markdown.contentHTML }}>
                                </div>}
                        </div>
                    </div>
                    <HomeFooter />
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMember);
