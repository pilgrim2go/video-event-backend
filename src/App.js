import React, {useState, useEffect} from 'react';

import Amplify, {Auth} from 'aws-amplify'
import API, {graphqlOperation} from '@aws-amplify/api'
import aws_exports from './aws-exports'

import {withAuthenticator} from 'aws-amplify-react'
import {Grid, Header, Input, List, Segment} from 'semantic-ui-react'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'react-external-link';

import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'
import * as subscriptions from './graphql/subscriptions'

Amplify.configure(aws_exports);

function makeComparator(key, order = 'asc') {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) 
      return 0;
    
    const aVal = (typeof a[key] === 'string')
      ? a[key].toUpperCase()
      : a[key];
    const bVal = (typeof b[key] === 'string')
      ? b[key].toUpperCase()
      : b[key];

    let comparison = 0;
    if (aVal > bVal) 
      comparison = 1;
    if (aVal < bVal) 
      comparison = -1;
    
    return order === 'desc'
      ? (comparison * -1)
      : comparison
  };
}

const NewEvent = () => {
  const [name,
    setName] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();
    await API.graphql(graphqlOperation(mutations.createEvent, {input: {
        name
      }}))
    setName('')
  }

  return (
    <Segment>
      <Header as='h3'>Add a new event</Header>
      <Input
        type='text'
        placeholder='New Event Name'
        icon='plus'
        iconPosition='left'
        action={{
        content: 'Create',
        onClick: handleSubmit
      }}
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}/>
    </Segment>
  )
}

const EventsList = () => {
  const [events,
    setEvents] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await API.graphql(graphqlOperation(queries.listEvents, {limit: 999}))
      setEvents(result.data.listEvents.items)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let subscription
    async function setupSubscription() {
      const user = await Auth.currentAuthenticatedUser()
      subscription = API.graphql(graphqlOperation(subscriptions.onCreateEvent, {owner: user.username})).subscribe({
        next: (data) => {
          const event = data.value.data.onCreateEvent
          setEvents(a => a.concat([event].sort(makeComparator('name'))))
        }
      })
    }
    setupSubscription()

    return () => subscription.unsubscribe();
  }, [])

  const eventItems = () => {
    return events
      .sort(makeComparator('name'))
      .map(event => <List.Item key={event.id}>
        <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
      </List.Item>);
  }

  return (
    <Segment>
      <Header as='h3'>My Events</Header>
      <List divided relaxed>
        {eventItems()}
      </List>
    </Segment>
  );
}

const EventDetails = (props) => {
  const [event,
    setEvent] = useState({name: 'Loading...', photos: []})

  useEffect(() => {
    const loadEventInfo = async() => {
      const results = await API.graphql(graphqlOperation(queries.getEvent, {id: props.id}))
      setEvent(results.data.getEvent)
    }

    loadEventInfo()
  }, [props.id])
  const event_link = "https://master.d3ihdzm7bwsyvw.amplifyapp.com?room=" + event.id + "&subject="+ event.subject + "&name="+ event.name + "&password=secret"
  return (
    <Segment>
      <Header as='h3'>{event.name}</Header>
      <ExternalLink href={event_link}> Event Link </ExternalLink>
    </Segment>
  )
}

function App() {
  return (
    <Router>
      <Grid padded>
        <Grid.Column>
          <Route path="/" exact component={NewEvent}/>
          <Route path="/" exact component={EventsList}/>

          <Route
            path="/events/:eventId"
            render={() => <div>
            <NavLink to='/'>Back to Events list</NavLink>
          </div>}/>
          <Route
            path="/events/:eventId"
            render={props => <EventDetails id={props.match.params.eventId}/>}/>
        </Grid.Column>
      </Grid>
    </Router>
  )
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
})

