import React from 'react';

import ClownToggle from './ClownToggle';
import useDarkMode from 'use-dark-mode';

const ClownModeCommands = () => {
    const clownMode = useDarkMode(false);

    return (
        <span>
            Clown Mode is <code>{clownMode.value ? 'enabled' : 'disabled'}</code>. Turn
      it{' '}
            <button onClick={clownMode.toggle}>{clownMode.value ? 'off' : 'on'}</button>
            .
    </span>
    );
};

export default ClownModeCommands;
