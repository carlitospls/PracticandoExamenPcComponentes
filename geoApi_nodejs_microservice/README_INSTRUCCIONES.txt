USO DEL SERVICIO REST PARA RECUPERAR PROVINCIAS Y poblaciones DE ESPAÑA
======================================================================
Crear una BD en MongoDB llamada "GeoApi" y dentro de ella dos colecciones: "Provincias" y "Poblaciones" e importar los ficheros GeoApi.Provincias.json 
y GeoApi.Poblaciones.json, sino el microservicio no se ejecutara.

Instrucciones de uso del servicio:
----------------------------------
1º PASO) deberas primero obtener un accessToken a la api, para lo cual debes pasar en cabecera Authorization, la combinacion en base64 de este CLIENT_ID='AnonymousGeoApi' y
este CLIENT_SECRET='tryHarder' separados por el caracter ':' asi:   Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)

    Ademas en el body de la pet. debes pasarle un json con este valor:  "solicitud":"accessToken"

el endpoint es:  http://localhost:3003/api/GeoApi/GetAccessToken   por POST

la respuesta si todo va bien: { codigo:0, mensaje: 'creds de acceso ok, accesstoken generado en datos...', datos:{ accessToken: .... }} <---esta el token de acceso en prop.datos
si va mal: { codigo: 1, mensaje: error.message }



2º PASO) para poder recuperar la lista de provincias o las de poblaciones de una provincia dada debes pasar ese accessToken en cabecera Authorization: Bearer ...token...
tienen una caducidad de 15 minutos, despues caducaran y tendras q volver a solicitarlo para poder acceder a los endpoints del servicio REST

    - para recuperar provincias, el endpoint es: http://localhost:3003/api/GeoApi/Provincias   por GET (recuerda mandar accessToken, sino no te dejara)
        la respuesta si todo va bien: { codigo:0, mensaje:'PROVINCIAS recuperadas OK!!!', datos:{ provincias: [ ...array de provincias...]]}} 
        si va mal: { codigo: 3, mensaje: error.message }


    - para recuprerar poblaciones, el endpoint es: http://localhost:3003/api/GeoApi/Poblaciones?codProv=28  por GET( se pasa en parametro codProv el codigo provincia a recuperar)
      en el ejemplo '28' es el de Madrid, recuerda mandar accessToken, sino no te dejara)
        la respuesta si todo va bien: { codigo:0, mensaje:'poblaciones recuperados OK!!!', datos:{ poblaciones: [...array de poblaciones de esa provincia ...] } }
        si va mal: { codigo: 4, mensaje: error.message }