import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component {
  
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <Panel id="profile" header={profile.nickname}>
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon className="icons marginRight10" glyph="user" />{profile.nickname}</ControlLabel>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
