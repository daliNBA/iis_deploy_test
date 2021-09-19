import React from 'react'
import { List, Segment, Container, Image } from 'semantic-ui-react'

const Footer = () => {
    return (
        <div>
            <Segment  style={{ margin: '25em 0em 0em', padding: '0em 0em', backgroundColor: "white" }} vertical>
                <Container textAlign='center' >
                    <Image src='../assets/EtikeoLogo.png' centered height='60px' width='60' />
                    <div >
                        <List horizontal inverted divided link  >
                            <List.Item style={{ color: 'black' }} >Contact Us</List.Item>
                            <List.Item style={{ color: 'black' }} >Terms and Conditions</List.Item>
                            <List.Item style={{ color: 'black' }} >Privacy Policy</List.Item>
                        </List>
                    </div>
                </Container>
            </Segment>
        </div>
    )
}
export default Footer;