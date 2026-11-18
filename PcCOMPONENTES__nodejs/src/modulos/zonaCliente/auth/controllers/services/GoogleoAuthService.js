const {google} = require('googleapis');


class GoogleoAuthService {
    constructor({clientId, clientSecret, redirectUri}) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.oauth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            this.redirectUri
        );
        this.googlePeopleApi = google.people({version: 'v1', auth: this.oauth2Client});
    }

    async getAuthUrl() {
        try{

            const url = this.oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: [
                    'https://www.googleapis.com/auth/userinfo.email',
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/user.phonenumbers.read',
                    'https://www.googleapis.com/auth/user.addresses.read',
                    'https://www.googleapis.com/auth/user.gender.read'                    
                ]
            });
            return url;

        } catch (error) {
            console.error('Error al generar la URL de autenticación de Google:', error);
            throw new Error('Error al generar la URL de autenticación de Google');
        }
    }

    async getUserInfo(code) {
        try {
            console.log('Obteniendo tokens de Google con el código de autorización...', code);
            
            const { tokens } = await this.oauth2Client.getToken(code);
            console.log('Tokens obtenidos de Google:', tokens);
            
            this.oauth2Client.setCredentials(tokens);
            console.log('Credenciales establecidas en el cliente OAuth2 de Google, haciendo la solicitud a la API de Google People para obtener información del usuario...');
            
            const reqProfile = await this.googlePeopleApi.people.get({
                resourceName: 'people/me',
                personFields: 'names,emailAddresses,phoneNumbers,addresses,genders',
            });
            const userInfo=reqProfile.data
            console.log('User info from Google:', userInfo);

            const email = userInfo.emailAddresses ? userInfo.emailAddresses[0].value : 'No disponible';
            const telefonoContacto = userInfo.phoneNumbers ? userInfo.phoneNumbers[0].value : 'No disponible';
            const apellidos = userInfo.names ? userInfo.names[0].familyName : 'No disponible';
            const nombre = userInfo.names ? userInfo.names[0].givenName : 'No disponible';
            const direccion = userInfo.addresses ? userInfo.addresses[0].value : 'No disponible';
            const genero = userInfo.genders ? userInfo.genders[0].value : 'No disponible';

            return {
                email,
                telefonoContacto,
                apellidos,
                nombre,
                direccion,
                genero
            };

        } catch (error) {
            console.error('Error al obtener la información del usuario de Google:', error);
            throw new Error('Error al obtener la información del usuario de Google');
        }
    }
}
module.exports = GoogleoAuthService;