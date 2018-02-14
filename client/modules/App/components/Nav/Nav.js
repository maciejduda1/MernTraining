import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './Nav.css';

const Nav = (props) => {
    return (
        <div className={styles['nav-part']}>
            <ul>
                <li><a href="/home"><FormattedMessage id="Home" /></a></li>
                <li><a href="/"><FormattedMessage id="Posts" /></a></li>
                <li><a href="/about"> <FormattedMessage id="About" /></a></li>
            </ul>
        </div>
    );
};

export default Nav;
