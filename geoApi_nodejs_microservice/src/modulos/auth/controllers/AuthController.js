const { ObjectId } = require('mongodb');
const JwtTokenService=require('./services/JwtTokenService.js');
const ResponseApi=require('../../_shared_/models/ResponseAPI.js');
 

class AuthController {
    constructor( dbService,{ jwtSecret, jwtExpiresIn, clientId, clientSecret } ) {
        this.dbService = dbService;
        this.jwtTokenService = new JwtTokenService({ jwtSecret, jwtExpiresIn });
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    getAccessToken() {
        return (req, res) => {
            try {    
                console.log('cabecera Authorization...', req.headers['authorization']);
                if(! req.headers['authorization'] ) throw new Error('error en cabecera Authorization, debes incluir CLIENT_ID y CLIENT_SECRET para obtener accessToken...');
                if(! req.headers['authorization'].startsWith('Basic ')) throw new Error('error en cabecera Authorization, debe ser tipo Basic para obtener accessToken...');

                const [ _clientId, _clientSecret ]=[ ... Buffer.from(req.headers['authorization'].split(' ')[1], 'base64').toString().split(':') ];
                if( _clientId !== this.clientId || _clientSecret !== this.clientSecret) throw new Error('CLIENT_ID o CLIENT_SECRET incorrectos....');

                //en req.body debe ir variable: solicitud=accessToken
                console.log('valor en req.body...', req.body); 
                if(! req.body.solicitud || req.body.solicitud !== 'accessToken' ) throw new Error('error en body-request, debes incluier variable: solicitud=accessToken');
                
                //===== >generamos accesstoken para los endpoints de la api...<============
                const _payload={
                    ip: req.ip,
                    idjwt: new ObjectId(),
                    fechaAccess:new Date(Date.now()).getTime()
                };
                console.log('datos acceso...', _payload);

                const _jwt=this.jwtTokenService.generateToken(_payload);
                console.log('accessToken generado...', _jwt);
                
                // let _resInsertJWT=await this.dbService.insertOne('accessTokens', _payload);
                // if( ! _resInsertJWT.insertedId ) throw new Error('error al conectarse a mongodb para almacenar jwt del cliente conectado...');
                const response=new ResponseApi(0,'creds de acceso ok, accesstoken generado en datos...',{ accessToken: _jwt });
                res.status(200).json(response.toPrimitives());

            } catch (error) {
                console.log('error al verificar creds: ', error.message);
                const response=new ResponseApi(1,error.message,null);
                res.status(200).json(response.toPrimitives());
            }
        }
    }

    verifyAccessToken() {
        return (req, res, next) => {
            try {
                if(! req.headers['authorization'] ) throw new Error('error en cabecera Authorization, debes incluir accessToken para acceder a los endpoints de la api...');
                if(! req.headers['authorization'].startsWith('Bearer ')) throw new Error('error en cabecera Authorization, debe ser tipo Bearer para acceder a los endpoints de la api...');
                
                let _jwt=req.headers['authorization'].split(' ')[1];
                let _payload=this.jwtTokenService.verifyToken(_jwt);
                
                if (!_payload) throw new Error('error al verificar accessToken, o ha expirado o firma invalida PROHIBIDO EL ACCESO a los endpoints de la api...');
                
                console.log('payload accessToken pasado...', _payload);
                //req.user = _payload;
                next();

            } catch (error) {
                console.log('error al verficar ACCESSTOKEN: ', error.message);
                const response=new ResponseApi(2,error.message,null);
                res.status(200).json(response.toPrimitives());
            }
        }
    }

}   

module.exports = AuthController ;