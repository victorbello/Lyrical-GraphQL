import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

type Props = {
  addSong: (title: string) => Promise<*>
}

class SongCreate extends React.Component {
  props: Props;
  state = {
    title: ''
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.addSong(this.state.title)
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to='/'>
          <i className='material-icons'>arrow_back</i> Back
        </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            type='text'
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title:String!) {
    addSong(title: $title) {
      id,
      title
    }
  }
`;

const mapActionsToProps = ({ mutate }) => ({
  addSong: (title) => mutate ({
    variables: { title },
    refetchQueries: [{ query }]
  })
});

const withActions = graphql(mutation, {
  props: mapActionsToProps
});

export default withActions(SongCreate);
