import React, {FC, useState} from 'react';
import {Button, DatePicker, DatePickerProps, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/Event";
import {useTypedSelector} from "../hooks/useTypedSelector";

export interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void,
}

const EventForm: FC<EventFormProps> = (props) => {
    const {user} = useTypedSelector(state => state.authReducer)

    const [event, setEvent] = useState<IEvent>({
        author: user.username,
        guest: '',
        date: '',
        description: ''
    } as IEvent)

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setEvent({...event, date: dateString})
    };

    const onChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
        setEvent({...event, guest: value})
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const submitForm = () => {
        props.submit({...event})
        console.log('event:', event);
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description of event"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Date of event"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker onChange={onChangeDate}/>
            </Form.Item>
            <Form.Item
                label="Select guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={props.guests.map(guest =>
                        ({
                            value: guest.username,
                            label: guest.username
                        })
                    )}
                />
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>

    );
};

export default EventForm;