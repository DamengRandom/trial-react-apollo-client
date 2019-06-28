import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_type
        rocket_name
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <div>
        <h1>Launch</h1>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading ..</p>;
            if (error) console.log("Fetch launch detail error: ", error);
            const {
              mission_name,
              launch_year,
              launch_date_local,
              launch_success,
              rocket: { rocket_id, rocket_type, rocket_name }
            } = data.launch;
            return (
              <div>
                <h3 className="display-5 my-4">
                  <span className="text-dark">Mission: </span>
                  {mission_name}
                </h3>
                <h4 className="mb-3">Launch Details:</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Launch Year: {launch_year}
                  </li>
                  <li className="list-group-item">
                    Launch Date:{" "}
                    <Moment format="YYYY-MM-DD HH:mm:ss">
                      {launch_date_local}
                    </Moment>
                  </li>
                  <li className="list-group-item">
                    Launch Status:{" "}
                    <span
                      className={classNames({
                        "text-success": launch_success,
                        "text-danger": !launch_success
                      })}
                    >
                      {launch_success ? "Success" : "Fail"}
                    </span>
                  </li>
                </ul>
                <h4 className="mb-3">Rocket Details:</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                  <li className="list-group-item">
                    Rocket Name: {rocket_name}
                  </li>
                </ul>

                <br />
                <Link to="/launch" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Launch;
