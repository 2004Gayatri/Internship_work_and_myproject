import { Injectable } from '@angular/core';
import { AuthenticationResult, PublicClientApplication, LogLevel } from '@azure/msal-browser';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpSentEvent } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { Config } from 'src/app/app-constant';
import { Router } from '@angular/router';
import { EncyptDecryptDataService } from '../encryptDecrypt/encypt-decrypt-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pca: PublicClientApplication;
  private accessToken: any;
  constructor(private http: HttpClient,private httpService:HttpService,private config: Config,private router: Router,
    private encyptDecryptData: EncyptDecryptDataService,) {
    const msalConfig = {
      auth: {
        clientId: '02c0ee2d-6715-4a86-a257-c2ec69001589', // Replace with your app's client ID
        authority: 'https://login.microsoftonline.com/bb8d33bf-ecdf-48fe-8df0-80ad41a1cb8c',
        // redirectUri: 'https://thzretail.com/thyssenkrupp/dashboard', // Replace with your app's redirect URI
        redirectUri: 'http://localhost:8100/dashboard',
      },
      system: {
        loggerOptions: {
          loggerCallback: (level: any, message: any, containsPii: any) => {
            if (containsPii) {
              return;
            }
            console.log(`${level}: ${message}`);
          },
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false,
        },
      },
    };
    this.pca = new PublicClientApplication(msalConfig);
  }
  async acquireTokenSilent() {
    const request = {
      scopes: ['https://outlook.office365.com/.default'], // Replace with the desired scope
    };

    return this.pca.acquireTokenSilent(request);
  }
  async initializeMsal() {
    await this.pca.initialize();
  }

  // Function to perform login
  async performLogin() {
    try {
      // Initialize MSAL before using any other methods
      await this.initializeMsal();
      // Use other MSAL methods here
      if (!this.pca.getActiveAccount()) {
        const loginResponse = await this.pca.loginPopup();
        this.pca.setActiveAccount(loginResponse?.account);
      }
      const accessTokenRequest = {
        scopes: ['user.read'], // Replace with the required scopes
      };
      try {
        const response = await this.pca.acquireTokenSilent(accessTokenRequest);
        this.accessToken = response.accessToken;
        this.getUserInfo()
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
      // console.log('Login successful:', loginResponse);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  // Function to initiate logout
  async performLogout() {
    try {
      // Initialize MSAL before using any other methods
      await this.initializeMsal();
      // Initiate logout using popup (recommended)
      await this.pca.logoutRedirect();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  async getUserInfo(): Promise<any> {
    decodeURI
    if (!this.accessToken) {
      throw new Error('Access token not available.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    try {
      const userInfo = await this.http
        .get('https://graph.microsoft.com/v1.0/me', { headers })
        .toPromise();
        if(userInfo){
          this.onClickLogin(userInfo)
        }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
  onClickLogin(userInfo:any){
    this.router.navigate(['/home/dashboard']);
  }
  isAuthenticated: boolean = false;
  userRole: any; // Add a property to store the user's role

  // Add any other logic to check user permissions

  canActivate(): boolean {
    // Check if the user has either "super admin" or "admin" role
    var loggedInUserRole = sessionStorage.getItem('loggedInUserRole');
    this.userRole = this.encyptDecryptData.decryptData(loggedInUserRole);
    if (this.userRole === 'EHS Admin' || this.userRole === 'IT Admin') {
      return true;
    } else {
      // Redirect to the login page or show an error message
      // Navigate to the desired page after authentication
      if(this.router.url == '/login'){
        setTimeout(() =>{
          window.location.reload();
        },
        50);
      }else{
        this.router.navigate(['/login/page-not-found']);
      }
      return false;
    }
  }
}
