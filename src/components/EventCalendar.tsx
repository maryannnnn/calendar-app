import React, {FC} from 'react';
import {BadgeProps, Badge, Calendar} from "antd";
import {IEvent} from "../models/Event";
import moment, {Moment} from "moment";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender() {
        //const formatDate = moment().format("YYYY-MM-DD");
        //const currentDayEvents = props.events.filter(ev => ev.date === formatDate);
        return (
            <div>
                {props.events.map((ev, index) =>
                    <li key={index}>
                        {ev.description}
                    </li>
                )}
            </div>
        );
    }

    return (

        <div>
            <Calendar dateCellRender={dateCellRender}/>
        </div>
    );
};

export default EventCalendar;