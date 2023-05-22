import "rsuite/dist/styles/rsuite-default.min.css";
import { useEffect } from "react";
import moment from "moment";
import Table from "../../components/Table";
import { Button, Drawer, Icon, Modal, TagPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  allColaboradores,
  updateColaborador,
  filterColaboradores,
  addColaborador,
  unlinkColaborador,
  allServicos,
  resetColaborador,
} from "../../store/modules/colaborador/actions";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Colaboradores = () => {
  const dispatch = useDispatch();
  const { colaboradores, colaborador, behavior, form, components, servicos } =
    useSelector((state) => state.colaborador);

  const setComponent = (component, state) => {
    dispatch(
      updateColaborador({
        components: { ...components, [component]: state },
      })
    );
  };

  const setColaborador = (key, value) => {
    dispatch(
      updateColaborador({
        colaborador: { ...colaborador, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addColaborador());
  };

  const remove = () => {
    dispatch(unlinkColaborador());
  };

  const reset = () => {
    dispatch(resetColaborador());
  };

  useEffect(() => {
    dispatch(allColaboradores());
    dispatch(allServicos());
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Sidebar />
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
                <h3>
                  {behavior === "create" ? "Criar Novo" : "Atualizar"}{" "}
                  Colaborador
                </h3>
                <div className="row mt-3">
                  <div className="form-group col-12 mb-3">
                    <b>E-mail</b>
                    <div className="input-group">
                      <input
                        type="email"
                        disabled={behavior === "update"}
                        className="form-control"
                        placeholder="E-mail do cliente"
                        value={colaborador.email}
                        onChange={(e) => {
                          setColaborador("email", e.target.value);
                        }}
                      />
                      {behavior === "create" && (
                        <div className="input-group-append">
                          <Button
                            appearance="primary"
                            color="yellow"
                            loading={form.filtering}
                            disabled={form.filtering}
                            onClick={() => dispatch(filterColaboradores())}
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
                      placeholder="Nome do Colaborador"
                      disabled={form.disabled}
                      value={colaborador.nome}
                      onChange={(e) => setColaborador("nome", e.target.value)}
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b>Status</b>
                    <select
                      className="form-control"
                      disabled={form.disabled && behavior === "create"}
                      value={colaborador.vinculo}
                      onChange={(e) =>
                        setColaborador("vinculo", e.target.value)
                      }
                    >
                      <option value="A">Ativo</option>
                      <option value="I">Inativo</option>
                    </select>
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">Telefone / Whatsapp</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Telefone"
                      disabled={form.disabled}
                      value={colaborador.telefone}
                      onChange={(e) =>
                        setColaborador("telefone", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">Data de Nascimento</b>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Data de Nascimento"
                      disabled={form.disabled}
                      value={colaborador.dataNascimento}
                      onChange={(e) =>
                        setColaborador("dataNascimento", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">Genêro</b>
                    <select
                      className="form-control"
                      placeholder="Genêro"
                      disabled={form.disabled}
                      value={colaborador.sexo}
                      onChange={(e) => setColaborador("sexo", e.target.value)}
                    >
                      <option value="NA">Prefiro não responder</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <TagPicker
                      size="lg"
                      block
                      data={servicos}
                      disabled={form.disabled && behavior === "create"}
                      value={colaborador.especialidades}
                      onChange={(e) => setColaborador("especialidades", e)}
                    />
                  </div>
                </div>
                <Button
                  block
                  className="mt-3"
                  color={behavior === "create" ? "green" : "yellow"}
                  size="lg"
                  loading={form.saving}
                  onClick={() => save()}
                >
                  {behavior === "create" ? "Salvar" : "Atualizar"} Colaborador
                </Button>
                {behavior === "update" && (
                  <Button
                    block
                    className="mt-3"
                    color="red"
                    size="lg"
                    loading={form.saving}
                    onClick={() => setComponent("confirmDelete", true)}
                  >
                    Remover Colaborador
                  </Button>
                )}
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
                {"  "} Tem certeza que deseja excluir? Essa ação será
                irreversível!
              </Modal.Body>
              <Modal.Footer>
                <Button
                  loading={form.saving}
                  onClick={() => remove()}
                  color="red"
                >
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
                  <h2 className="mb-4 mt-0">Colaboradores</h2>
                  <div>
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={() => {
                        dispatch(updateColaborador({ behavior: "create" }));
                        setComponent("drawer", true);
                      }}
                    >
                      <span className="mdi mdi-plus">Novo Colaborador</span>
                    </button>
                  </div>
                </div>
                <Table
                  loading={form.filtering}
                  data={colaboradores}
                  config={[
                    { label: "Nome", key: "nome", width: 200, fixed: true },
                    { label: "E-mail", key: "email", width: 200 },
                    { label: "Telefone", key: "telefone", width: 200 },
                    {
                      label: "Genêro",
                      content: (colaborador) => {
                        if (colaborador.sexo === "NA") {
                          return "Não informado";
                        } else {
                          if (colaborador.sexo === "M") {
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
                      content: (colaborador) =>
                        moment(colaborador.dataNascimento).format("DD/MM/YYYY"),
                    },
                  ]}
                  actions={(colaborador) => (
                    <Button appearance="ghost" color="yellow" size="xs">
                      Ver informações
                    </Button>
                  )}
                  onRowClick={(colaborador) => {
                    dispatch(updateColaborador({ behavior: "update" }));
                    dispatch(updateColaborador({ colaborador }));
                    setComponent("drawer", true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Colaboradores;
