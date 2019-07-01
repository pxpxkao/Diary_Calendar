import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ImgCard from './components/ImgCard';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDiary, deleteDiary } from '../../actions/diaryActions';

class DiaryGallery extends Component {
    static propTypes = {
        addDiary: PropTypes.func.isRequired,
        deleteDiary: PropTypes.func.isRequired,
    }

    imgcard = (diary) => {
        if (diary.images.length !== 0) {
            return (
                <Grid key={diary._id} item>
                    <ImgCard item={diary} src={diary.images[0].url} history={this.props.history} />
                </Grid>
            );
        }
        else {
            return (
                <Grid key={diary._id} item>
                    <ImgCard item={diary} src="https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png" history={this.props.history} />
                </Grid>
            );
        }
    }

    render() {
        const { diarys } = this.props.diary;

        const existDiarys = diarys.filter(diary => !(diary.images.length === 0 && diary.comments.length === 0));
        
        return (
            <div style={{ flexGrow: '1' }}>
                <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {existDiarys.map(diary => (this.imgcard(diary)))}

                            {/* <Grid key={1} item>
                                <ImgCard src="https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png" />
                            </Grid>
                            <Grid key={2} item>
                                <ImgCard src="https://a.ksd-i.com/a/2017-07-06/96093-523420.jpg" />
                            </Grid>
                            <Grid key={3} item>
                                <ImgCard src="https://cdn2.ettoday.net/images/3769/d3769906.jpg" />
                            </Grid>
                            <Grid key={4} item>
                                <ImgCard src="https://i.ytimg.com/vi/6CmY-LTd_qs/maxresdefault.jpg" />
                            </Grid>
                            <Grid key={5} item>
                                <ImgCard src="https://a.ksd-i.com/a/2019-03-15/114846-715304.png" />
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    diary: state.diary
})

export default connect(mapStateToProps, { addDiary, deleteDiary })(DiaryGallery);