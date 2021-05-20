import axios from "axios";

class Athentication {

    successfulLogin(user, authHead) {
        this.setupAxiosInterceptors(authHead)
        sessionStorage.setItem('authenticatedUserPhone', user.phone);
        sessionStorage.setItem('authenticatedUserName', user.name);
        sessionStorage.setItem('authenticatedUserRole', user.role);
        var products = [];
        localStorage.setItem("cart", JSON.stringify(products));
    }

    logout() {
        this.ejectAxiosInterceptor()
        sessionStorage.removeItem('authenticatedUserPhone');
        sessionStorage.removeItem('authenticatedUserName');
        sessionStorage.removeItem('authenticatedUserRole');
        localStorage.removeItem('cart')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUserPhone');
        if (user === null) return false;
        return true;
    }

    loggedUserId() {
        let id = sessionStorage.getItem('authenticatedUserPhone');
        if (id === null) return '';
        return id;
    }

    loggedUserName() {
        let name = sessionStorage.getItem('authenticatedUserName');
        if (name === null) return '';
        return name;
    }

    loggedUserRole() {
        let role = sessionStorage.getItem('authenticatedUserRole');
        if (role != null) return role;
        return null;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        this.id = axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = basicAuthHeader;
                return config;
            }
        )
    }

    ejectAxiosInterceptor() {
        console.log(this.id)
        axios.interceptors.request.eject(this.id)
        console.log(this.id)
    }

}

export default new Athentication();