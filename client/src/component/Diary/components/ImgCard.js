import React, { Component } from 'react';

import './ImgCard.css';

class ImgCard extends Component {
    handleOnClick = () => {
        const { item } = this.props;
        // Redirect to Diary
        this.props.history.push(`/diary/${item.date}`);
    }

    render() {
        const { src, item } = this.props;
        return (
            <figure className="imgcard-figure" id={item._id} onClick={this.handleOnClick}>
                <div className="imgcard-front">
                    <img style={{ maxHeight:"240px",maxWidth: '240px' }} src={src} alt={item.date} />
                    <h3 className="imgcard-title">{item.date}</h3>
                </div>
            </figure>
        );
    }
}

export default ImgCard;