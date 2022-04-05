import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrgents } from "../../actions/journal";
import { Link } from "react-router-dom";
import moment from 'moment';

// HOME APP
export const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUrgents())
    }, [dispatch]);

    const journal = useSelector(state => state.journal)

    return (
        <div>
            <h3>Welcome Home</h3>

            <h4>Late Projects</h4>
            {journal?.project?.map(project => <p><Link to={`projects/details/${project.id}`} key={project.id}>{project.title}</Link></p>)}
            
            <h4>Upcoming Meetings</h4>
            {journal?.meeting?.map(meeting => <p> Meet with: <Link to={`meetings/details/${meeting.id}`} key={meeting.id}>{meeting.title}</Link> {moment(meeting.date).fromNow()}</p>)}

            <h4>Upcoming Events</h4>
            {journal?.event?.length < 1? 'No Upcoming Scheduled Events': journal?.event?.map(event => <p><Link to={`events/details/${event.id}`} key={event.id}>{event.title}</Link></p>)}
        </div>
    )
};
