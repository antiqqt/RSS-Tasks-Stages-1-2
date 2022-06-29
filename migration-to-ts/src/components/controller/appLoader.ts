import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '48310286a8194e7e8c9cafd19c8d81b7',
        });
    }
}

export default AppLoader;
