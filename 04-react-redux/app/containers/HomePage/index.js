/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Creators } from './actions';

const Typeahead = require('react-typeahead').Typeahead;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.props.init();
  }

  render() {
    const { constructors, drivers, onOptionSelected, displayOption } = this.props;

    let driversList = '';
    let driversHeading = '';

    if (drivers.length > 0) {
      driversHeading = <h2>Drivers</h2>;
      driversList = drivers.map((driver) =>
        <li key={driver.driverId}>
          <a href={driver.url}>{driver.givenName} {driver.familyName}</a>
        </li>
      );
    }

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Typeahead
          options={constructors}
          onOptionSelected={onOptionSelected}
          displayOption={displayOption}
          filterOption="constructorId"
          placeholder="Search Constructors..."
        />
        {driversHeading}
        <ul>{driversList}</ul>
      </div>
    );
  }
}

HomePage.propTypes = {
  init: PropTypes.func.isRequired,
  onOptionSelected: PropTypes.func.isRequired,
  displayOption: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  constructors: ((state) =>
    state.getIn(['home', 'constructors'])
  ),
  drivers: ((state) =>
    state.getIn(['home', 'drivers'])
  ),
});

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(Creators.fetchConstructors());
    },
    onOptionSelected: ((selection) =>
      dispatch(Creators.fetchDrivers(selection.constructorId))
    ),
    displayOption: ((option) =>
      option.name
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
