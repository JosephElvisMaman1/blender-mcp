import { Module, Controller, Get, Post, Body, Param, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { SupabaseService } from '../common/supabase.module';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { UseGuards } from '@nestjs/common';

// ── DTOs ──────────────────────────────────────────────────────
const CreateUserSchema = z.object({
  email: z.string().email(),
});
class CreateUserDto extends createZodDto(CreateUserSchema) {}

// ── Service ───────────────────────────────────────────────────
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async findByEmail(email: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('id, email, created_at')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      this.logger.error(`Error fetching user ${email}`, error);
      throw error;
    }
    if (!data) throw new NotFoundException('Usuario no encontrado.');
    return data;
  }

  async findOrCreate(email: string) {
    const { data: existing } = await this.supabase.client
      .from('users')
      .select('id, email, created_at')
      .eq('email', email)
      .maybeSingle();

    if (existing) return { user: existing, created: false };

    const { data: created, error } = await this.supabase.client
      .from('users')
      .insert({ email })
      .select('id, email, created_at')
      .single();

    if (error) {
      this.logger.error(`Error creating user ${email}`, error);
      throw error;
    }

    this.logger.log(`User created: ${email}`);
    return { user: created, created: true };
  }

  async getLicenses(email: string) {
    const { data, error } = await this.supabase.client
      .from('licenses')
      .select('id, plan, status, expires_at, activated_at, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }
}

// ── Controller ────────────────────────────────────────────────
@ApiTags('Users')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '[INTERNO] Crear o recuperar usuario por email' })
  findOrCreate(@Body() dto: CreateUserDto) {
    return this.usersService.findOrCreate(dto.email);
  }

  @Get(':email/licenses')
  @ApiOperation({ summary: '[INTERNO] Listar licencias de un usuario' })
  getLicenses(@Param('email') email: string) {
    return this.usersService.getLicenses(email);
  }
}

// ── Module ────────────────────────────────────────────────────
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
