import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}

  async sendEmail({ email, body }) {
    const user = this.configService.get<string>('EMAIL');
    const pass = this.configService.get<string>('PASSWORD');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
    await transporter
      .sendMail({
        from: 'My-Monitor <meumonitormym@gmail.com>',
        to: email,
        subject: 'Seja bem vindo ao My-Monitor :)',
        html: body,
        text: 'bem vindo ao app',
      })
      .then(() => console.log('Email enviado com sucesso'))
      .catch((error) => console.log('Algo deu errado:', error));
  }
}
