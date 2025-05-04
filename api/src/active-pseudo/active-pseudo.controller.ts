import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { ActivePseudoService } from './active-pseudo.service';
import { CreateActivePseudoDto } from './dto/create-active-pseudo.dto';
import { UpdateActivePseudoDto } from './dto/update-active-pseudo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivePseudo } from './entities/active-pseudo.entity';

@ApiTags('active-pseudo')
@Controller('active-pseudo')
export class ActivePseudoController {
  constructor(private readonly activePseudoService: ActivePseudoService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ActivePseudo,
  })
  async create(@Body() createActivePseudoDto: CreateActivePseudoDto) {
    // check if the pseudo already exists
    const existingPseudo = await this.activePseudoService.findOne(
      createActivePseudoDto.pseudo,
    );
    if (existingPseudo) {
      throw new ConflictException('Pseudo already exists');
    }
    return this.activePseudoService.create(createActivePseudoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
    type: [ActivePseudo],
  })
  findAll() {
    return this.activePseudoService.findAll();
  }

  @Get(':pseudo')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: ActivePseudo,
  })
  findOne(@Param('pseudo') pseudo: string) {
    return this.activePseudoService.findOne(pseudo);
  }

  @Patch(':pseudo')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ActivePseudo,
  })
  update(
    @Param('pseudo') pseudo: string,
    @Body() updateActivePseudoDto: UpdateActivePseudoDto,
  ) {
    return this.activePseudoService.update(pseudo, updateActivePseudoDto);
  }

  @Delete(':pseudo')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: ActivePseudo,
  })
  remove(@Param('pseudo') pseudo: string) {
    return this.activePseudoService.remove(pseudo);
  }
}
