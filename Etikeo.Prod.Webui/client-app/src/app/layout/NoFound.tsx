import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon >
                <Icon name="search" />
                Oops, resources not found
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/" primary>
                    Return to Home Page...
                </Button>
            </Segment.Inline>
        </Segment>
    );
}

export default NotFound;