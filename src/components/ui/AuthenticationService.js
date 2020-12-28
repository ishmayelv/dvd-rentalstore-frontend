import axios from 'axios'

class AuthenticationService {
 

    executeJwtAuthenticationService(username, password) {
        console.log("AuthenticationService.js : executeJwtAuthenticationService --->");
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        let userToken = 'Bearer ' + token
        sessionStorage.setItem("USER_TOKEN", userToken)
        return userToken
    }
       
    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }
    isUserLoggedIn() {       
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                  //  config.headers.authorization = token
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()