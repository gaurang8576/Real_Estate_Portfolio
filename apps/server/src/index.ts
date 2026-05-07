import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { auth } from "@test_1/auth";
import { env } from "@test_1/env/server";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.all("/api/auth/*path", async (req: any, _res: any) => {
    return auth.handler(req);
  });

  await app.listen(3000);
  console.log("Server is running on http://localhost:3000");
}

bootstrap();
