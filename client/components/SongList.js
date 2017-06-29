import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

type Props = {
  songs: Array<Object>,
  isFetching: boolean
}

class SongList extends Component {
  props: Props;

  onSongDelete = (id) => {
    this.props.deleteSong(id)
      .then(() => alert('Song Deleted!'));
  }

  renderSongs() {
    return this.props.songs.map(({ title, id }) => {
      return (
        <li key={id} className='collection-item'>
          <Link
            to={`/songs/${id}`}
          >
            {title}
          </Link>
          <i
            className='material-icons red-text'
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.isFetching) return <span>Loading...</span>;
    return (
      <div>
        <h2>Song Writer!</h2>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mapDataToProps = result => ({
  songs: result.data.songs,
  isFetching: result.data.loading
});

const withData = graphql(query, {
  props: mapDataToProps
});

const deleteSong = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const mapActionsToProps = ({ mutate }) => ({
  deleteSong: (id) => mutate ({
    variables: { id },
    refetchQueries: [{ query }]
  })
});

const withActions = graphql(deleteSong, {
  props: mapActionsToProps
});

export default compose(
  withData,
  withActions
)(SongList);
