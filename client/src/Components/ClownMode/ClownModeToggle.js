import React from 'react';
import styled from 'styled-components';
import ClownToggle from './ClownToggle';
import pennywiseface from './img/pwbloodred.png';
import useDarkMode from 'use-dark-mode';

const Button = styled.button`
    img {
        height: 30px;
        width: 30px;
        vertical-align: middle;
        margin-bottom: 5px;
    }
    .pwmode {
        height: 30px;
        width: 30px;
        vertical-align: middle;
        margin-bottom: 5px;
    }`;

const ClownModeToggle = () => {
    const clownMode = useDarkMode(false);

    return (
        <div className="dark-mode-toggle">
            <button type="button" onClick={clownMode.disable}>
                ☀
      </button>
            <ClownToggle checked={clownMode.value} onChange={clownMode.toggle} />
            <Button type="button" onClick={clownMode.enable}>
                <span role="img"></span>&#127880;<img className='pwmode' src={pennywiseface} alt="PennyWise Logo" />
            </Button>
        </div>
    );
};

export default ClownModeToggle;