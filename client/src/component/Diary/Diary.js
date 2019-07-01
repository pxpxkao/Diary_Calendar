import React, { Component, Fragment } from 'react';
import Gallery from './gallery';
import { CardFooter } from 'reactstrap';


class Diary extends Component {
    render() {
        const { item } = this.props;
        
        return (
            <Fragment>
                <Gallery item={item}></Gallery>
                <CardFooter className="text-right">ID: {item.uniqueID}</CardFooter>
            </Fragment>
        );
    }
}

export default Diary;