import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';

@Injectable()
export class UsersService {
  /**Injetando meu model aqui */
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    /**Aqui ele insere o user no modelo e salva */
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        /**primeiro parametro abaixo é a verificação do id do banco com id passado */
        _id: id,
      },
      {
        /**Segundo parametro é o que eu quero alterar */
        $set: updateUserDto,
      },
      {
        /**Esse parametro faz rodar o resto acima, sem ele não vai salvar as alterações */
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
