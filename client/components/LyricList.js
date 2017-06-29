import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends React.Component {
  onLike = (id, likes) => {
    this.props.likeLyric(id, likes);
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className='collection-item' key={id}>
          { content }
          <div className='vote-box'>
            {likes}
            <i
              className='material-icons blue-text'
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className='collection'>
        { this.renderLyrics() }
      </ul>
    );
  }
}

const mutation = gql`
  mutation likeLyric($id: ID!) {
    likeLyric(id: $id) {
      id,
      likes,
      content,
      song {
        id,
        title
      }
    }
  }
`;

const mapActionsToProps = ({ mutate }) => ({
  likeLyric: (id, likes) => mutate ({
    variables: { id },
    optimisticResponse: {
      __typename: 'Mutation',
      likeLyric: {
        id,
        __typename: 'LyricType',
        likes: likes + 1
      }
    }
  })
});

const withActions = graphql(mutation, {
  props: mapActionsToProps
})

export default withActions(LyricList);
