import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        LoginDto:LoginDto
    ){
        return this.authService.login(LoginDto);
    }

    @ApiBearerAuth()
    @Get('profile')
    @Auth(Role.USER)
    profile(
        @ActiveUser() user:UserActiveInterface
    ){
        return this.authService.profile(user)
    }

}
