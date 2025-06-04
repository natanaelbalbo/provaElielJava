import tarefaService from '../service/tarefaService';
import tarefaSchema from '../schema/tarefa.schema';
import { tarefaType } from '../types/tarefaType';

jest.mock('../schema/tarefa.schema');

describe('tarefaService', () => {
  const mockTarefa: tarefaType = {
    id: 1,
    titulo: 'Teste',
    descrição: 'Descrição de teste',
    dataConclusao: new Date(),
    tipo: 'pessoal',
    status: 'pendente',
    usuarioAssociado: 'user1',
    categoria: 'geral',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma tarefa', async () => {
    (tarefaSchema.create as jest.Mock).mockResolvedValue(mockTarefa);
    const result = await tarefaService.create(mockTarefa);
    expect(result).toEqual(mockTarefa);
    expect(tarefaSchema.create).toHaveBeenCalledWith(mockTarefa);
  });

  it('deve listar todas as tarefas', async () => {
    (tarefaSchema.find as jest.Mock).mockResolvedValue([mockTarefa]);
    const result = await tarefaService.findAll();
    expect(result).toEqual([mockTarefa]);
    expect(tarefaSchema.find).toHaveBeenCalled();
  });

  it('deve buscar tarefa por id', async () => {
    (tarefaSchema.findById as jest.Mock).mockResolvedValue(mockTarefa);
    const result = await tarefaService.findById('1');
    expect(result).toEqual(mockTarefa);
    expect(tarefaSchema.findById).toHaveBeenCalledWith('1');
  });

  it('deve atualizar uma tarefa', async () => {
    const updatedTarefa = { ...mockTarefa, status: 'concluida' };
    (tarefaSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTarefa);
    const result = await tarefaService.update('1', updatedTarefa);
    expect(result).toEqual(updatedTarefa);
    expect(tarefaSchema.findByIdAndUpdate).toHaveBeenCalledWith('1', expect.any(Object), { new: true });
  });

  it('deve remover uma tarefa', async () => {
    (tarefaSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    const result = await tarefaService.delete('1');
    expect(result).toBe('tarefa removida');
    expect(tarefaSchema.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
}); 