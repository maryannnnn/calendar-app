import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/Event";

const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {fetchGuests, createEvent, fetchEvents } = useActions();
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer)

    useEffect(() => {
        fetchGuests()
    })

    useEffect(() => {
        fetchEvents(user.username)
    }, [user.username])

    const addNewEvent =(event: IEvent) => {
        setIsModalOpen(false);
        createEvent(event)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout>
            {/*{JSON.stringify(events)}*/}
            <EventCalendar events={events} />
            <Row justify="center">
                <Button onClick={showModal}>Add event</Button>
            </Row>
            <Modal
                title="Add event"
                open={isModalOpen}
                onOk={onOk}
                onCancel={handleCancel}
            >
                <EventForm guests={guests} submit={addNewEvent}  />
            </Modal>
        </Layout>
    );
};

export default Event;