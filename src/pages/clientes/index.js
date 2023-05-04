import "rsuite/dist/styles/rsuite-default.min.css";
import { useEffect } from "react";
import moment from "moment";
import Table from "../../components/Table";
import { Button, Drawer, Icon, Modal } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  allClientes,
  updateCliente,
  filterClientes,
  addCliente,
  unlinkCliente,
  resetCliente,
} from "../../store/modules/cliente/actions";

const Clientes = () => {
  const dispatch = useDispatch();
  const { clientes, cliente, behavior, form, components } = useSelector(
    (state) => state.cliente
  );

  const setComponent = (component, state) => {
    dispatch(
      updateCliente({
        components: { ...components, [component]: state },
      })
    );
  };

  const setCliente = (key, value) => {
    dispatch(
      updateCliente({
        cliente: { ...cliente, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addCliente());
  };

  const remove = () => {
    dispatch(unlinkCliente());
  };

  const reset = () => {
    dispatch(resetCliente());
  };

  useEffect(() => {
    dispatch(allClientes());
  }, []);

  return (
    <div className="col p-5 overflow-auto h100">
      <Drawer
        show={components.drawer}
        size="sm"
        onHide={() => {
          setComponent("drawer", false);
          reset();
        }}
      >
        <Drawer.Body>
          <h3>{behavior === "create" ? "Criar Novo" : "Atualizar"} Cliente</h3>
          <div className="row mt-3">
            <div className="form-group col-12 mb-3">
              <b>E-mail</b>
              <div className="input-group">
                <input
                  type="email"
                  disabled={behavior === "update"}
                  className="form-control"
                  placeholder="E-mail do cliente"
                  value={cliente.email}
                  onChange={(e) => {
                    setCliente("email", e.target.value);
                  }}
                />
                {behavior === "create" && (
                  <div className="input-group-append">
                    <Button
                      appearance="primary"
                      color="yellow"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => dispatch(filterClientes())}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Cliente"
                disabled={form.disabled}
                value={cliente.nome}
                onChange={(e) => setCliente("nome", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                disabled={form.disabled}
                value={cliente.telefone}
                onChange={(e) => setCliente("telefone", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Data de Nascimento</b>
              <input
                type="date"
                className="form-control"
                placeholder="Data de Nascimento"
                disabled={form.disabled}
                value={cliente.dataNascimento}
                onChange={(e) => setCliente("dataNascimento", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Genêro</b>
              <select
                className="form-control"
                placeholder="Genêro"
                disabled={form.disabled}
                value={cliente.sexo}
                onChange={(e) => setCliente("sexo", e.target.value)}
              >
                <option value="NA">Prefiro não responder</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Tipo de documento</b>
              <select
                className="form-control"
                disabled={form.disabled}
                value={cliente.documento.tipo}
                onChange={(e) =>
                  setCliente("documento", {
                    ...cliente.documento,
                    tipo: e.target.value,
                  })
                }
              >
                <option value="">Selecione</option>
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Número do documento</b>
              <input
                type="text"
                className="form-control"
                placeholder="Documento"
                disabled={form.disabled}
                value={cliente.documento.numero}
                onChange={(e) =>
                  setCliente("documento", {
                    ...cliente.documento,
                    numero: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3 mb-3">
              <b className="">CEP</b>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o CEP"
                disabled={form.disabled}
                value={cliente.endereco.cep}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    cep: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Rua / Logradouro</b>
              <input
                type="text"
                className="form-control"
                placeholder="Rua / Logradouro"
                disabled={form.disabled}
                value={cliente.endereco.logradouro}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    logradouro: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3 mb-3">
              <b className="">Número</b>
              <input
                type="text"
                className="form-control"
                placeholder="Número"
                disabled={form.disabled}
                value={cliente.endereco.numero}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    numero: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3 mb-3">
              <b className="">UF</b>
              <input
                type="text"
                className="form-control"
                placeholder="UF"
                disabled={form.disabled}
                value={cliente.endereco.uf}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    uf: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Cidade</b>
              <input
                type="text"
                className="form-control"
                placeholder="Cidade"
                disabled={form.disabled}
                value={cliente.endereco.cidade}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    cidade: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3 mb-3">
              <b className="">País</b>
              <input
                type="text"
                className="form-control"
                placeholder="País"
                disabled={form.disabled}
                value={cliente.endereco.pais}
                onChange={(e) =>
                  setCliente("endereco", {
                    ...cliente.endereco,
                    pais: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <Button
            block
            className="mt-3"
            color={behavior === "create" ? "green" : "red"}
            size="lg"
            loading={form.saving}
            onClick={() => {
              if (behavior === "create") {
                save();
              } else {
                setComponent("confirmDelete", true);
              }
            }}
          >
            {behavior === "create" ? "Salvar" : "Remover"} Cliente
          </Button>
        </Drawer.Body>
      </Drawer>

      <Modal
        show={components.confirmDelete}
        onHide={() => setComponent("confirmDelete", false)}
        size="xs"
      >
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: "#ffb300",
              fontSize: 24,
            }}
          />
          {"  "} Tem certeza que deseja excluir? Essa ação será irreversível!
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponent("confirmDelete", false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Clientes</h2>
            <div>
              <button
                className="btn btn-warning btn-lg"
                onClick={() => {
                  dispatch(updateCliente({ behavior: "create" }));
                  setComponent("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Novo Cliente</span>
              </button>
            </div>
          </div>
          <Table
            loading={form.filtering}
            data={clientes}
            config={[
              { label: "Nome", key: "nome", width: 200, fixed: true },
              { label: "E-mail", key: "email", width: 200 },
              { label: "Telefone", key: "telefone", width: 200 },
              {
                label: "Genêro",
                content: (cliente) => {
                  if (cliente.sexo === "NA") {
                    return "Não informado";
                  } else {
                    if (cliente.sexo === "M") {
                      return "Masculino";
                    } else {
                      return "Feminino";
                    }
                  }
                },
                width: 200,
              },
              {
                label: "Data de Nascimento",
                content: (cliente) =>
                  moment(cliente.dataNascimento).format("DD/MM/YYYY"),
              },
            ]}
            actions={(cliente) => (
              <Button appearance="ghost" color="yellow" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(cliente) => {
              dispatch(updateCliente({ behavior: "update" }));
              dispatch(updateCliente({ cliente }));
              setComponent("drawer", true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clientes;
