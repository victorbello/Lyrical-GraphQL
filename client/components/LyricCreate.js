import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import fetchSong from '../queries/fetchSong';

class LyricCreate extends React.Component {
  state = {
    content: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addLyricToSong(this.state.content, this.props.songId)
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation addLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id,
      title,
      lyrics {
        id,
        content,
        likes
      }
    }
  }
`;

const mapActionsToProps = ({ mutate }) => ({
  addLyricToSong: (content, songId) => mutate ({
    variables: { content, songId }
  })
});

const withActions = graphql(mutation, {
  props: mapActionsToProps
});

export default withActions(LyricCreate);
