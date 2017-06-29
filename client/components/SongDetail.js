import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

type Props = {
  song: Object,
  isFetching: boolean,
  params: {
    id: string
  }
}

class SongDetail extends React.Component {
  props: Props;
  render() {
    const { song, isFetching } = this.props;
    if (isFetching) return <span>Loading...</span>;
    return (
      <div>
        <Link to='/'>
          <i className='material-icons'>arrow_back</i> Back
        </Link>
        <h3>{ song.title }</h3>
        <LyricList lyrics={ song.lyrics } />
        <LyricCreate songId={ song.id }/>
      </div>
    );
  }
}

const mapDataToProps = result => ({
  song: result.data.song,
  isFetching: result.data.loading
});
const withData = graphql(fetchSong, {
  options: ({ params }) => ({ variables: { id: params.id }}),
  props: mapDataToProps
});

export default withData(SongDetail);
