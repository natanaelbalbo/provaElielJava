import categoriaService from '../service/categoriaService';
import categoriaSchema from '../schema/categoria.schema';
import { CategoriaType } from '../types/categoriaType';

jest.mock('../schema/categoria.schema');

describe('categoriaService', () => {
  const mockCategoria: CategoriaType = {
    id: 1,
    nome: 'Categoria Teste',
    cor: 'azul',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma categoria', async () => {
    (categoriaSchema.create as jest.Mock).mockResolvedValue(mockCategoria);
    const result = await categoriaService.create(mockCategoria);
    expect(result).toEqual(mockCategoria);
    expect(categoriaSchema.create).toHaveBeenCalledWith(mockCategoria);
  });

  it('deve listar todas as categorias', async () => {
    (categoriaSchema.find as jest.Mock).mockResolvedValue([mockCategoria]);
    const result = await categoriaService.findAll();
    expect(result).toEqual([mockCategoria]);
    expect(categoriaSchema.find).toHaveBeenCalled();
  });
}); 