import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import '../../styles.css'

class CustomHeaderCell extends React.PureComponent {
    static propTypes = {
        date: PropTypes.object.isRequired,
        dayFormat: PropTypes.string.isRequired,
    }

    render() {
        const {
            date,
            dayFormat,
        } = this.props;
        return (
            <NavLink
                className='headercell'
                to={"/diary/" + date.format("YYYY-MM-DD")}
                
            >{date.format(dayFormat)}</NavLink>
        );
    }
}

export default CustomHeaderCell;