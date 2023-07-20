import React, { useContext, useState, useEffect } from "react";
import { Form, Select, Input, Checkbox, DatePicker, Button, Table } from 'antd';

import { MyContext } from "../contexts/MyContext";

const { Option } = Select;

const Vendas = (props) => {
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser } = rootState;
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioChecked, setFuncionarioChecked] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("");

  const handleFormaPagamento = value => {
    setFormaPagamento(value);
  };


  useEffect(() => {
    async function getFuncionarios() {
      try {
        const data = await fetchFuncionarios(); // Substitua isso pelo seu serviço que busca os funcionários
        setFuncionarios(data);
      } catch (err) {
        console.error("Erro ao buscar funcionários", err);
      }
    }

    if (funcionarioChecked) {
      getFuncionarios();
    }
  }, [funcionarioChecked]);

  const handleFuncionarioCheck = e => {
    setFuncionarioChecked(e.target.checked);
  };

  return (
    <Form id="form_venda" method="POST" layout="vertical" style={{ width: '50%', minWidth: '330px' }}>

      <h1>Controle de Vendas</h1>
      <div style={{ width: '50%' }}>
        <Form.Item label="Forma de Pagamento" name="forma_pagamento_sel" rules={[{ required: true }]}>
          <Select placeholder="Forma de Pagamento" onChange={handleFormaPagamento}>
            <Option value="Credito">Crédito</Option>
            <Option value="Debito">Débito</Option>
            <Option value="Desconto em Folha">Desconto em Folha</Option>
            <Option value="Dinheiro">Dinheiro</Option>
            <Option value="Pix">PIX</Option>
            <Option value="Acolhido">Acolhido</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nome do Acolhido" name="nome_acolhido">
          <Input placeholder="Nome do Acolhido" />
        </Form.Item>
        <Form.Item label="Funcionário" name="check_func">
          <Checkbox onChange={handleFuncionarioCheck}>Funcionário</Checkbox>
        </Form.Item>

        {funcionarioChecked && (
          <Form.Item label="Nome do Funcionário" name="nome_funcionario_pgto">
            <Select placeholder="Funcionário">
              {funcionarios.map(func => <Option key={func} value={func}>{func}</Option>)}
            </Select>
          </Form.Item>
        )}
        {formaPagamento === "Desconto em Folha" && (
          <div className="venda_func">
            <Form.Item label="Nome do Funcionário" name="nome_funcionario">
              <Select placeholder="Funcionário">
                {funcionarios.map(func => <Option key={func} value={func}>{func}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item label="Limite Disponível" name="limite_disponivel">
              <Input placeholder="Limite Disponível" disabled />
            </Form.Item>

            <Form.Item label="Limite Total" name="limite_total">
              <Input placeholder="Limite Total" disabled />
            </Form.Item>

            <Form.Item label="Valor com desconto (10%)" name="valor_compra_desc">
              <Input placeholder="Valor com desconto" disabled />
            </Form.Item>
          </div>
        )}



        <Form.Item label="Data da Compra" name="data_compra" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Valor da compra" name="valor_compra">
          <Input placeholder="Valor da compra" disabled />
        </Form.Item>

        <Form.Item label="Quant. parcelas" name="quantidade_parcelas" rules={[{ required: true }]}>
          <Select placeholder="Quantidade de parcelas">
            {/* Adicione as opções aqui, se necessário */}
          </Select>
        </Form.Item>

        {/* ... Restante do formulário, por exemplo a tabela de peças ... */}
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Finalizar compra
        </Button>
      </Form.Item>

    </Form>
  );
}

export default Vendas;






{/* <Button
            style={{backgroundColor: props.theme.token.colorError,}}
             onClick={logoutUser}>
                Logout
            </Button> */}