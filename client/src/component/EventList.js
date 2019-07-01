import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getEvents, deleteEvent } from '../actions/eventActions';
import PropTypes from 'prop-types';

class EventList extends Component {
    static propTypes = {
        getEvents: PropTypes.func.isRequired,
        deleteEvent: PropTypes.func.isRequired,
        event: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getEvents();
    }

    onDeleteClick = id => {
        this.props.deleteEvent(id)
    }

    render() {
        const { events } = this.props.event;
        return (
            <Container>
                <h2>Events</h2>
                <ListGroup>
                    <TransitionGroup className="event-list">
                        {events.map(({ _id, title, startTime, endTime }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        style={{ marginRight: "1rem" }}
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                </Button>
                                    {title}: {startTime} ~ {endTime}</ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.event
});

export default connect(mapStateToProps, { getEvents, deleteEvent })(EventList);