import { Buffer } from 'buffer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';
import { UnauthorizedException } from '@nestjs/common';

dotenvConfig({ path: '.env' });

export class SwaggerHelper {
  private basePath = process.env.SWAGGER_PATH || 'api-docs';
  private username = process.env.SWAGGER_USERNAME || 'admin';
  private password = process.env.SWAGGER_PASSWORD || 'admin';
  private title = process.env.SWAGGER_TITLE || 'API Documentation';
  private description = process.env.SWAGGER_DESCRIPTION || 'API description';

  setup(app: any) {
    if (!this.basePath || !this.username || !this.password) {
      console.error('Swagger Disabled : configuration missing ...');
      return;
    }

    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion('1.0.0')
      .addBearerAuth()
      .addGlobalParameters({
        name: 'Accept-Language',
        in: 'header',
        schema: {
          enum: ['en', 'fa'],
        },
      })
      .build();

    app.use(this.basicAuthInterceptor.bind(this));

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.basePath, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  getBasePath() {
    return this.basePath.startsWith('/') ? this.basePath : `/${this.basePath}`;
  }

  setError(res: any, next: any) {
    console.log('Authorization Failed. Check username and password.');
    res.setHeader('WWW-Authenticate', 'Basic realm="Paraf" charset="UTF-8"');
    next(new UnauthorizedException());
  }

  basicAuthInterceptor(req: any, res: any, next: any) {
    const url = req.url.split('?').shift().replace(/\/+$/, '');
    if (url !== this.getBasePath() && url !== `${this.getBasePath()}-json`) {
      return next();
    }

    let credentials = req.headers['authorization'];
    if (typeof credentials !== 'string') {
      return this.setError(res, next);
    }

    credentials = credentials.replace('Basic ', '');
    const credentialsDecoded = Buffer.from(credentials, 'base64').toString(
      'utf-8',
    );
    const userPassRE = /^([^:]*):(.*)$/;
    const userPass = userPassRE.exec(credentialsDecoded);

    if (
      userPass &&
      userPass[1] === this.username &&
      userPass[2] === this.password
    ) {
      console.log('Authorization Successful.');
      return next();
    }

    this.setError(res, next);
  }
}
