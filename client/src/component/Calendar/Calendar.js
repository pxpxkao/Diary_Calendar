import React, { Component } from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import '../../styles.css'
import { Button } from 'reactstrap';
import CustomModal from './CustomModal';
import CustomEvent from './CustomEvent';
import CustomHeaderCell from './CustomHeaderCell';
import CustomDayCell from './CustomDayCell';

import { connect } from 'react-redux';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../actions/eventActions';

var day = moment().day()
class Calendar extends Component {

    state = {
        firstDay: moment().add(-day, 'd')
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.getEvents(this.props.user._id);
        }
    }

    handleSelect = (newIntervals) => {
        let startdat = moment(newIntervals[0].start).day()
        let enddat = moment(newIntervals[0].end).day()
        let range = enddat - startdat
        if(startdat>enddat){
            var temp = enddat
            enddat = startdat
            startdat = temp
        }
        if(range!==0){
            for (var i = range; i >= 0; i--) {
                 const newEvent = {
                    start: moment(newIntervals[i].start).add(i,'d').valueOf(),
                    end: moment(newIntervals[i].end).add(-(range-i),'d').valueOf(),
                    value: newIntervals[i].value,
                    color: newIntervals[i].color,
                    userID: this.props.user._id
                }
                console.log(newEvent)
                this.props.addEvent(newEvent);                
            }
        }
        else{
        newIntervals.map(interval => {
            const newEvent = {
                start: interval.start.valueOf(),
                end: interval.end.valueOf(),
                value: interval.value,
                color: interval.color,
                userID: this.props.user._id
            }
            this.props.addEvent(newEvent);
            return newEvent;
        })
        }
    }

    handleEventUpdate = (event) => {
        const { events } = this.props.event;
        const value = event._id;
        var colorr_from_id = '';
        var text_from_id = '';
        var endhour = 0;
        var starthour = 0;
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i]._id === value) {
                colorr_from_id = events[i].color
                text_from_id = events[i].value   
                endhour = moment(events[i].end).hour
                starthour = moment(events[i].start).hour         
            }
        }
        if(event.allEvent === true){
	        for (i = events.length - 1; i >= 0; i--) {
	            if (events[i].value === text_from_id 
	                && events[i].color === colorr_from_id 
	                && events[i].userID === event.userID
                    && moment(events[i].end).hour === endhour
                    && moment(events[i].start).hour === starthour){
	                const update = {
	                    _id: events[i]._id,
	                    color: event.color,
	                    value: event.value,
	                    start: moment(events[i].start).set({'hours': moment(event.start).get('hours'), 'minutes': moment(event.start).get('minutes')}).valueOf(),
	                    end: moment(events[i].end).set({'hours': moment(event.end).get('hours'), 'minutes': moment(event.end).get('minutes')}).valueOf(),
	                    //start: events[i].start,
	                    // end: events[i].end,	                 
	                    userID: events[i].userID
	                }
	                this.props.updateEvent(update);
	            }
	        }
      	}
      	else{
      		const update = {
              _id: event._id,
              color: event.color,
              value: event.value,
              start: event.start,
              end: event.end,
              userID: event.userID
          }
          this.props.updateEvent(update);
      	}
        
    }

    handleEventRemove = (event) => {
    	// console.log(event)
        const { events } = this.props.event;
        if(event.allEvent === true){
	        for (var i = events.length - 1; i >= 0; i--) {
	            if (events[i].value === event.value && events[i].color === event.color && events[i].userID === event.userID) {
	                this.props.deleteEvent(events[i]._id)
	            }
	        }
	      }
	      else{
        	this.props.deleteEvent(event._id);
        }
    }

    nextWeek = () => {
        const modified = moment(this.state.firstDay);
        this.setState({
            firstDay: modified.add(7, "d")
        })
    }
    lastWeek = () => {
        const modified = moment(this.state.firstDay);
        this.setState({
            firstDay: modified.add(-7, "d")
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user !== this.props.user && prevProps.event !== this.props.event){
            this.props.getEvents(this.props.user._id);
        }
        const { events } = this.props.event;
        //console.log(arr[0].style['backgroundColor'])
        for (var i = events.length - 1; i >= 0; i--) {
        	let arr = document.getElementById(events[i]._id);
        	if(arr !== null){
                arr.style['backgroundColor'] = (events[i].color + "cb")  
                arr.style['color'] = '#fff'    
            }     
        }
    }

    render() {
        const { events } = this.props.event;
        const { user } = this.props;
        const intervals = events.map(event => {
            const start = moment(event.start);
            const end = moment(event.end);
            const newInterval = {
                _id: event._id,
                value: event.value,
                start: start,
                end: end,
                color: event.color,
                userID: event.userID
            };
            return newInterval;
        });
        
        return (
            <div>
                <Button
                    size="sm"
                    className="botton"
                    onClick={this.lastWeek}
                >Last week</Button>
                <Button
                    color="info"
                    size="sm"
                    style={{ float: 'right' }}
                    className="mb-2 botton"
                    onClick={this.nextWeek}
                >Next week</Button>

                <WeekCalendar
                    firstDay={this.state.firstDay}
                    numberOfDays={7}
                    scaleHeaderTitle={"click date ->"}
                    dayFormat={"MM/DD ddd."}
                    startTime={moment({ h: 5, m: 0 })}
                    endTime={moment({ h: 23, m: 1 })}
                    selectedIntervals={intervals}
                    onIntervalSelect={this.handleSelect}
                    onIntervalUpdate={this.handleEventUpdate}
                    onIntervalRemove={this.handleEventRemove}
                    headerCellComponent={CustomHeaderCell}
                    dayCellComponent={CustomDayCell}
                    modalComponent={CustomModal}
                    eventComponent={CustomEvent}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.event,
    user: state.auth.user
});

export default connect(mapStateToProps, { getEvents, addEvent, updateEvent, deleteEvent })(Calendar);