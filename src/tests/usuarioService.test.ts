import usuarioService from '../service/usuarioService';
import usuarioSchema from '../schema/usuario.schema';
import { usuarioType } from '../types/usuarioType';

jest.mock('../schema/usuario.schema');

describe('usuarioService', () => {
  const mockUsuario: usuarioType = {
    id: 1,
    nome: 'Usuário Teste',
    peso: '70',
    senha: 'senha123',
    email: 'teste@email.com',
  };

//

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um usuário', async () => {
    (usuarioSchema.create as jest.Mock).mockResolvedValue(mockUsuario);
    const result = await usuarioService.create(mockUsuario);
    expect(result).toEqual(mockUsuario);
    expect(usuarioSchema.create).toHaveBeenCalledWith(mockUsuario);
  });

  it('deve listar todos os usuários', async () => {
    (usuarioSchema.find as jest.Mock).mockResolvedValue([mockUsuario]);
    const result = await usuarioService.findAll();
    expect(result).toEqual([mockUsuario]);
    expect(usuarioSchema.find).toHaveBeenCalled();
  });
}); 