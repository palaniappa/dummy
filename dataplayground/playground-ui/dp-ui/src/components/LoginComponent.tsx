import React from 'react';
import Container from 'react-bootstrap/Container';
import { GoogleLogin, GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AuthResponse from 'react-google-login';
import Jumboron  from 'react-bootstrap/Jumbotron';

export interface ILoginComponentProps {
    userName?: string;
    onLoginError: (error: string) => void;
    onLoginSuccess: (userName: string, userEmail: string) => void;
    onLogout: () => void;
}

export interface ILoginComponentState {

}

export class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {

    private CLIENT_ID = "422746712712-v1s1j6b3s66gda1np0a2179vn0fu5fjf.apps.googleusercontent.com";

    constructor(props: ILoginComponentProps) {
        super(props);
    }
    render() {

        let logout = (<GoogleLogout
            clientId={this.CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.onLogoutSuccess.bind(this)}
            style={{ marginTop: '100px'}}
            />);
        
            let login = (<GoogleLogin
                clientId={this.CLIENT_ID}
                buttonText="Login"
                onSuccess={this.onLoginSucess.bind(this)}
                onFailure={this.onLoginFailure.bind(this)}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                />);

        let userName = this.props.userName ? this.props.userName : "Guest";

        let loginOrLogout = this.props.userName ? logout : login;

        let welcomeComponent = 
        (<Jumboron>
            <Container className="text-center">
                
                    <h1>Welcome <b>{userName}</b> to the <b>Data Panda!</b></h1>
                    
                    <br></br>

                    <p>Bigdata analytics for everyone. Happy exploring.</p>

                    <br></br>
                    {loginOrLogout}
                
            </Container>
           
        </Jumboron>);

        return (

            <Container fluid={true}>
                {welcomeComponent}
            </Container>
        );
    }

    public onLoginSucess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        
        console.log("hoo hoo login success");
        let detailedResponse = response as GoogleLoginResponse;
        if(detailedResponse){
            let userName = detailedResponse.getBasicProfile().getName();
            let userEmail = detailedResponse.getBasicProfile().getEmail();
            this.props.onLoginSuccess(userName, userEmail);
            this.refreshTokenSetup(detailedResponse);
            this.saveAccessTokenInLocalStore(detailedResponse.getAuthResponse());
        }
        else {
            this.onLoginFailure("The response was not detailed one");
        }
        
    }

    public onLoginFailure(error: any) {
        this.props.onLoginError(error);
    }

    public onLogoutSuccess() {
        this.props.onLogout();
    }

    private refreshTokenSetup(response: GoogleLoginResponse) {
        
        let refreshTiming = (response.getAuthResponse().expires_in || 3600 - 5 * 60) * 1000;
        const refreshToken = async () => {
            const newAuthRes = await response.reloadAuthResponse();
            this.saveAccessTokenInLocalStore(newAuthRes);
            console.log("token refreshed");
            let refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            setTimeout(refreshToken, refreshTiming);
        }
        setTimeout(refreshToken, refreshTiming);
    }

    private saveAccessTokenInLocalStore(authResponse: any) {
        let id_token = authResponse.id_token;
        localStorage.setItem('data_panda_id_token', id_token);
    }

}   