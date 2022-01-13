import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationSerice: AuthenticationService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string) {
    return this.authenticationSerice.getAuthenticatedUser(username, password);
  }
}
