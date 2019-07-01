import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.css'

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};


class CustomEvent extends React.PureComponent {
    
  addzero = (interger) =>{
    if(interger<0)
      return "45"
    else if (interger>=10)
      return String(interger)
    else
      return '0'+String(interger)
  } 
  inverttostring = (m, index) => {
      if (index === 0) {
          return this.addzero(m.hour()) + ":" + this.addzero(m.minute())
      }
      else {
          if (m.minute() === 0)
              return this.addzero(m.hour() - 1) + ":" + this.addzero(m.minute() - 15)
          else
              return this.addzero(m.hour()) + ":" + this.addzero(m.minute() - 15)
      }

  };


  render() {
    const {
      start,
      end,
      value,
      _id
    } = this.props;
    return (
      <div className="event" id={_id}>
        <span>{ this.inverttostring(start,0) +" - "+ this.inverttostring(end,1)}</span>
        <br /><br />
        <span>{value}</span>
      </div>
    );
  }
}

CustomEvent.propTypes = propTypes;
export default CustomEvent;