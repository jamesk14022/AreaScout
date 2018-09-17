import { compose, withPropsOnChange } from 'recompose';
import { withRouter } from 'react-router';
import queryString from 'qs';

const propsWithQuery = withPropsOnChange(
  ['location', 'match'],
  ({ location, match }) => {
    return {
      location: {
        ...location,
          query: queryString.parse(location.search.substring(1))
        },
        match
      };
  }
);

export default compose(withRouter, propsWithQuery)