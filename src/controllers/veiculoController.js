const db = require('../database/db');

const TIPOS_PROPULSAO_VALIDOS = ['eletrico', 'hibrido'];
const STATUS_PRODUCAO_VALIDOS = ['em_producao', 'descontinuado'];

const veiculoController = {
  // GET /veiculos - Lista todos os veículos
  async listar(req, res) {
    try {
      const veiculos = await db('veiculos').select('*').orderBy('id', 'asc');
      return res.status(200).json(veiculos);
    } catch (error) {
      console.error('Erro ao listar veículos:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao consultar veículos.' });
    }
  },

  // GET /veiculos/:id - Retorna um veículo pelo id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await db('veiculos').where({ id }).first();

      if (!veiculo) {
        return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
      }

      return res.status(200).json(veiculo);
    } catch (error) {
      console.error('Erro ao buscar veículo por id:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao buscar veículo.' });
    }
  },

  // POST /veiculos - Cadastra um novo veículo
  async criar(req, res) {
    try {
      const {
        modelo,
        tipo_propulsao,
        ano_modelo,
        autonomia_km,
        capacidade_bateria_kwh,
        preco_base,
        status_producao
      } = req.body;

      // Validação de campos obrigatórios
      if (!modelo || !tipo_propulsao || !ano_modelo || preco_base === undefined || preco_base === null) {
        return res.status(400).json({
          mensagem: 'Os campos modelo, tipo_propulsao, ano_modelo e preco_base são obrigatórios.'
        });
      }

      // Validação do enum tipo_propulsao
      if (!TIPOS_PROPULSAO_VALIDOS.includes(tipo_propulsao)) {
        return res.status(400).json({
          mensagem: `tipo_propulsao inválido. Valores aceitos: ${TIPOS_PROPULSAO_VALIDOS.join(', ')}`
        });
      }

      // Validação do enum status_producao (se fornecido)
      const statusFinal = status_producao || 'em_producao';
      if (!STATUS_PRODUCAO_VALIDOS.includes(statusFinal)) {
        return res.status(400).json({
          mensagem: `status_producao inválido. Valores aceitos: ${STATUS_PRODUCAO_VALIDOS.join(', ')}`
        });
      }

      // Inserção com Knex
      const [novoVeiculo] = await db('veiculos')
        .insert({
          modelo: String(modelo).trim(),
          tipo_propulsao,
          ano_modelo: Number(ano_modelo),
          autonomia_km: autonomia_km !== undefined && autonomia_km !== null ? Number(autonomia_km) : null,
          capacidade_bateria_kwh: capacidade_bateria_kwh !== undefined && capacidade_bateria_kwh !== null ? Number(capacidade_bateria_kwh) : null,
          preco_base: Number(preco_base),
          status_producao: statusFinal
        })
        .returning('*');

      return res.status(201).json(novoVeiculo);
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar veículo.' });
    }
  },

  // PUT /veiculos/:id - Atualiza um veículo existente
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        modelo,
        tipo_propulsao,
        ano_modelo,
        autonomia_km,
        capacidade_bateria_kwh,
        preco_base,
        status_producao
      } = req.body;

      // Verifica se o veículo existe
      const veiculoExistente = await db('veiculos').where({ id }).first();
      if (!veiculoExistente) {
        return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
      }

      // Valida enums se forem informados
      if (tipo_propulsao && !TIPOS_PROPULSAO_VALIDOS.includes(tipo_propulsao)) {
        return res.status(400).json({
          mensagem: `tipo_propulsao inválido. Valores aceitos: ${TIPOS_PROPULSAO_VALIDOS.join(', ')}`
        });
      }

      if (status_producao && !STATUS_PRODUCAO_VALIDOS.includes(status_producao)) {
        return res.status(400).json({
          mensagem: `status_producao inválido. Valores aceitos: ${STATUS_PRODUCAO_VALIDOS.join(', ')}`
        });
      }

      // Monta dados a atualizar
      const dadosAtualizacao = {};
      if (modelo !== undefined) dadosAtualizacao.modelo = String(modelo).trim();
      if (tipo_propulsao !== undefined) dadosAtualizacao.tipo_propulsao = tipo_propulsao;
      if (ano_modelo !== undefined) dadosAtualizacao.ano_modelo = Number(ano_modelo);
      if (autonomia_km !== undefined) dadosAtualizacao.autonomia_km = autonomia_km !== null ? Number(autonomia_km) : null;
      if (capacidade_bateria_kwh !== undefined) dadosAtualizacao.capacidade_bateria_kwh = capacidade_bateria_kwh !== null ? Number(capacidade_bateria_kwh) : null;
      if (preco_base !== undefined) dadosAtualizacao.preco_base = Number(preco_base);
      if (status_producao !== undefined) dadosAtualizacao.status_producao = status_producao;

      const [veiculoAtualizado] = await db('veiculos')
        .where({ id })
        .update(dadosAtualizacao)
        .returning('*');

      return res.status(200).json(veiculoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar veículo.' });
    }
  },

  // DELETE /veiculos/:id - Remove um veículo pelo id
  async remover(req, res) {
    try {
      const { id } = req.params;

      const veiculoExistente = await db('veiculos').where({ id }).first();
      if (!veiculoExistente) {
        return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
      }

      await db('veiculos').where({ id }).del();

      return res.status(200).json({ mensagem: 'Veículo removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover veículo:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao remover veículo.' });
    }
  }
};

module.exports = veiculoController;
