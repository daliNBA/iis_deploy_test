import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Header, Segment, Icon, Container } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import agent from '../../app/agent/agent';
import LoginForm from './LoginForm';
import { BaseStoreContext } from '../../app/store/baseStore';

const VerifyEmail: React.FC<RouteComponentProps> = ({ location }) => {

    const Status = {
        Verifying: "Verifying",
        Success: "Success",
        Failed: "Failed"
    }
    const baseStore = useContext(BaseStoreContext);
    const { openModal } = baseStore.modalStore;
    const { token, email } = queryString.parse(location.search);
    const [status, setStatus] = useState(Status.Verifying);

    const resensendEmailHandler = () => {
        agent.userAgent.resendEmailConfirm(email as string).then(() => {
            toast.success('please check you email');
        }).catch((e) => console.log(e));
    }
    useEffect(() => {
        agent.userAgent.verifyEmail(token as string, email as string).then(() => setStatus(Status.Success)).catch(() => setStatus(Status.Failed));
    }, [Status.Failed, Status.Success, token, email]);

    const getBody = () => {
        switch (status) {
            case (Status.Verifying):
                return (
                    <p>
                        Verifying ...
                    </p>);
            case (Status.Failed):
                return (
                    <div className="center">Verifying ...
                        <p>Verifying failed you can try resending email</p>
                        <Button
                            onClick={resensendEmailHandler}
                            primary
                            content="Resend email"
                            size="huge"
                        />
                    </div>
                );
            case (Status.Success):
                return (
                    <div className="center">Success ...
                        <p>Verifying success you can loggged in</p>
                        <Button onClick={() => openModal(<LoginForm />)}
                            primary
                            content="Login"
                            size="large"
                        />
                    </div>
                );
        }
    };
    return (
        <Container>
            <Segment placeholder>
                <Header icon>
                    <Icon name="envelope" />
               Email verification
            </Header>
                <Segment.Inline>
                    {getBody()}
                </Segment.Inline>
            </Segment>
        </Container>

    );
}
export default VerifyEmail;