import React, { Component } from 'react';

import HomeNav from './../Nav/Nav';
import Welcome from './../Section/Welcome';
import UserDropdown from '../../User/UserDropdown';

import styled from 'styled-components';
import Auth from '../../../Auth/Auth';

const HomeContainer = styled.header`
background: 
linear-gradient(225deg, #7ae0bb, #00a79d);
background-size: 400% 400%;

-webkit-animation: AnimationName 30s ease infinite;
-moz-animation: AnimationName 30s ease infinite;
-o-animation: AnimationName 30s ease infinite;
animation: AnimationName 30s ease infinite;

@-webkit-keyframes AnimationName {
   0%{background-position:0% 50%}
   50%{background-position:100% 50%}
   100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
   0%{background-position:0% 50%}
   50%{background-position:100% 50%}
   100%{background-position:0% 50%}
}
@-o-keyframes AnimationName {
   0%{background-position:0% 50%}
   50%{background-position:100% 50%}
   100%{background-position:0% 50%}
}
@keyframes AnimationName { 
   0%{background-position:0% 50%}
   50%{background-position:100% 50%}
   100%{background-position:0% 50%}
}
           height: 90vh;
`;

class Header extends Component {
    
    render() {
      
        return (
            <HomeContainer>
                <UserDropdown />
                <HomeNav {...this.props}/>
                <Welcome {...this.props}/>
            </HomeContainer>
        )
    }
}

export default Header;