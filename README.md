### TECNOLOGIAS

  #NESTJS
  #TYPEORM
  #DOCKER
  #MYSQL
  #TABLEPLUS

### RECURSOS
  https://bluuweb.dev/nestjs/crud-mysql.html
  https://bluuweb.dev/nestjs/auth-jwt.html

### BORRAR ARCHIVOS
  En la carpeta SRC, dejar solo
    app.module.ts
    main.ts
  Luego limpiar app.module.ts

### CONFIGURAR ARCHIVOS
  .eslintrc.js
    aqui comentamos "// 'plugin:prettier/recommended'," para que no nos marque errores

  src/nameEntity/nameEntity.controller.ts
    aquí se pone a number los string q representan el ID
  
  main.ts
    Configuramos el prefijo de las APIS

    Configuramos el useGlobalPipe
      Validamos los datos de entrada
      whitelist : q esten en la lista blanca
      forbidNonWhitelisted: q no envie mas información de la solicitada, dando error en ese caso
      transform: convierte automaticamente de string a number si en el controlador está definido

  app.module.ts
    TypeOrmModule : Configuramos la conexion a la BD


  ### CONFIGURANDO API por ENTIDAD

  En los files de entidades, definir los campos por entidad (campos que generarán la tabla correspondiente)
    cat.entity.ts
  Importar el módulo por TYPEORM en el cast.module.ts correspondiente a la entidad (con esto crea la tabla)
    imports:[TypeOrmModule.forFeature([Cat])],

  Inyectar patron repositorio en el service de la entidad
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>  
  ){}

  Volver async los métodos en el SERVICIO

  Configurar el DTO de la entidad para validaciones de información

  Se debe configurar en los modulos para indicar que un modulo puede acceder a otro
  por el tema de OneToOne, OneToMany, etc...
  Se va al modulo en cuestion y se exporta el TYPEORM
  Desde el modulo q va ser usado:
      exports:[TypeOrmModule]
  Desde el modulo q va usar a otro modulo: 
      
  
### COMANDOS USADOS

  #iniciar proyecto NEST
  nest new nameProyect / trabajar con YARN para evitar problemas en el BUILD

  #ejecutar archivo docker
  docker compose up -d

  #requisito para el resource entity
  yarn add @nestjs/schematics --save-dev

  #crear archivos para api por entidad / escoger opción API / --no-spec es para que no genere el archivo de testing
  nest g resource nameEntity --no-spec
  nest g resource cats --no-spec
  nest g resource breeds --no-spec
  
  #agregar el validador
  yarn add class-validator class-transformer -SE

  #instalar TYPEORM
  yarn add @nestjs/typeorm typeorm mysql2 -SE
    #NOTA: Si vas usar otra BD tienes que instalarla en ves de MYSQL2

  #correr en desarrollo
    yarn run start:dev


### AUTENTICACI+ON
  Crear entidad usuarios:
    nest g res users --no-spec

  Crear files auth que manejaran el tema de login y register
  nest g module auth
  nest g controller auth
  nest g service auth

  Para hashear las contraseñas
    yarn add bcryptjs -SE

  Instalar JWT
    yarn add @nestjs/jwt -SE

### AUTORIZACIÓN

  Crear el GUARD
  nest g guard auth --no-spec
