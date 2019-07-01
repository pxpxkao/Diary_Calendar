import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import {
    Container,
    Label,
    Input
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    TimePicker
} from '@material-ui/pickers';
import 'date-fns';
import moment from 'moment';

let temp = ''
class CustomModal extends Component {
    state = {
        value: this.props.value,
        color: this.props.color,
        allEvent: false,
        start: this.props.start.valueOf(),
        end: this.props.end.valueOf()
    }

    static propTypes = {
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired,
        value: PropTypes.string,
        onRemove: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        actionType: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }

    static defaultProps = {
        value: '',
        color: '#f44336',
        allEvent: false
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeCheck = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }

    onChangeStartTime = (time) => {
        const startTime = moment(time).valueOf();
        this.setState({ start: startTime });
    }

    onChangeEndTime = (time) => {
        const endTime = moment(time).add(15,'m').valueOf();
        temp = endTime
        this.setState({ end: endTime });
    }

    handleRemove = () => {
        const {allEvent} = this.state
        this.props.onRemove({allEvent});
    }

    handleSave = () => {
        const { value, color, start, end, allEvent } = this.state;
        // console.log(this.props.start.isSame(this.props.end, 'date'))
        this.props.onSave({
            value,
            color,
            start,
            end,
            allEvent
        });
        
    }

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    addzero(interger) {
        if (interger < 0)
            return "45"
        else if (interger >= 10)
            return String(interger)
        else
            return '0' + String(interger)
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

    rendertime() {
        const {
            start,
            end,
        } = this.props;

        return (this.inverttostring(start, 0) + " - " + this.inverttostring(end, 1))
    }

    renderText() {
        const {
            start,
            end,
        } = this.props;

        if (start.isSame(end, 'day')) {
            return (<span>{`${start.format('MM/DD ddd. ')}`}</span>);
            // return (<span>{`${start.format('MM/DD ddd. | HH:mm')} - ${end.format('HH:mm')}`}</span>);
        }
        // return (<span>{`${start.format('MM/DD ddd.')}~ ${end.format('MM/DD ddd.')} | ${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>);
        return (<span>{`${start.format('MM/DD ddd.')}~ ${end.format('MM/DD ddd.')}`}</span>);
    }

    render() {
        const {
            value,
        } = this.props;
        temp = moment(this.state.end).add(-15,'m')

        return (
            <Container className="customModal" style={{ padding: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>{this.renderText()}| {this.rendertime()}</h3>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.allEvent}
                                onChange={this.onChangeCheck}
                                value="allEvent"
                                name="allEvent"
                                color="primary"
                            />
                        }
                        label="Edit Same Events"
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container style={{ width: '100%' }} justify="space-around">
                            <TimePicker
                                margin="normal"
                                id="mui-pickers-time"
                                minutesStep={15}
                                label="Start Time"
                                value={this.state.start}
                                onChange={this.onChangeStartTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <TimePicker
                                margin="normal"
                                id="mui-pickers-time"
                                minutesStep={15}
                                label="End Time"
                                value={temp}
                                onChange={this.onChangeEndTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Label for="value">Event</Label>
                    <Input
                        type="text"
                        name="value"
                        id="value"
                        className='mb-2'
                        placeholder="Enter something"
                        defaultValue={value}
                        onChange={this.onChange}
                    />
                </FormGroup>

                <Button variant="contained" size="small" color="secondary" style={{ marginTop: '15px' }} onClick={this.handleRemove}>
                    <DeleteIcon style={{ marginRight: '0.5rem' }} />Delete
                </Button>
                <Button variant="contained" size="small" color="primary" style={{ marginTop: '15px', float: 'right' }} onClick={this.handleSave}>
                    Save<SaveIcon style={{ marginLeft: '0.5rem' }} />
                </Button>
                {/* <Button color="danger" style={{ marginTop: '1rem' }} onClick={this.handleRemove}>Delete</Button>
                    <Button color="info" style={{ marginTop: '1rem', float: 'right' }} onClick={this.handleSave}>Save</Button> */}
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginBottom: '10px' }}> choose color of the event </p>
                    <CirclePicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />
                </div>
            </Container>

        );
    }
}

export default CustomModal;