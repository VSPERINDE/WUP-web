import "rsuite/dist/styles/rsuite-default.min.css";
import { useEffect } from "react";
import moment from "moment";
import Table from "../../components/Table";
import { Button, Drawer, Icon, Modal, Tag, DatePicker, Uploader } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  allServicos,
  updateServico,
  filterServico,
  addServico,
  removeServico,
  removeArquivo,
  resetServico,
} from "../../store/modules/servico/actions";
import _const from "../../data/const";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Servicos = () => {
  const dispatch = useDispatch();
  const { servicos, servico, behavior, form, components } = useSelector(
    (state) => state.servico
  );

  const setComponent = (component, state) => {
    dispatch(
      updateServico({
        components: { ...components, [component]: state },
      })
    );
  };

  const setServico = (key, value) => {
    dispatch(
      updateServico({
        servico: { ...servico, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addServico());
  };

  const remove = () => {
    dispatch(removeServico());
  };

  const reset = () => {
    dispatch(resetServico());
  };

  useEffect(() => {
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
                  {behavior === "create" ? "Criar Novo" : "Atualizar"} Servico
                </h3>
                <div className="row mt-3">
                  <div className="form-group col-12 mb-3">
                    <b>Nome</b>
                    <div className="input-group">
                      <input
                        type="text"
                        disabled={behavior === "update"}
                        className="form-control"
                        placeholder="Nome do Serviço"
                        value={servico.nome}
                        onChange={(e) => {
                          setServico("nome", e.target.value);
                        }}
                      />
                      {/*behavior === "create" && (
                  <div className="input-group-append">
                    <Button
                      appearance="primary"
                      color="yellow"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => dispatch(filterServico())}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )*/}
                    </div>
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">R$ Preço</b>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Preço do serviço"
                      value={servico.preco}
                      onChange={(e) => setServico("preco", e.target.value)}
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b>Status</b>
                    <select
                      className="form-control"
                      value={servico.status}
                      onChange={(e) => setServico("status", e.target.value)}
                    >
                      <option value="A">Ativo</option>
                      <option value="I">Inativo</option>
                    </select>
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">Recorrência(dias)</b>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Recorrência"
                      value={servico.recorrencia}
                      onChange={(e) =>
                        setServico("recorrencia", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-3 mb-3">
                    <b className="">Duração</b>
                    <DatePicker
                      format="HH:mm"
                      value={servico.duracao}
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      onChange={(e) => setServico("duracao", e)}
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <b className="">Descrição</b>
                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder="Descrição do serviço"
                      value={servico.descricao}
                      onChange={(e) => setServico("descricao", e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <b className="d-block">Imagens do Serviço</b>
                    <Uploader
                      multiple
                      autoUpload={false}
                      listType="picture"
                      defaultFileList={servico.arquivos.map(
                        (servico, index) => ({
                          name: servico?.caminho,
                          fileKey: index,
                          url: `${_const.bucketUrl}/${servico?.caminho}`,
                        })
                      )}
                      onChange={(files) => {
                        const arquivos = files
                          .filter((f) => f.blobFile)
                          .map((f) => f.blobFile);
                        setServico("arquivos", arquivos);
                      }}
                      onRemove={(file) => {
                        if (behavior === "update" && file.url) {
                          dispatch(removeArquivo(file.name));
                        }
                      }}
                    >
                      <button>
                        <Icon icon="camera-retro" size="lg" />
                      </button>
                    </Uploader>
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
                  {behavior === "create" ? "Salvar" : "Atualizar"} Servico
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
                    Remover Serviço
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
                  <h2 className="mb-4 mt-0">Serviços</h2>
                  <div>
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={() => {
                        dispatch(updateServico({ behavior: "create" }));
                        setComponent("drawer", true);
                      }}
                    >
                      <span className="mdi mdi-plus">Novo Serviço</span>
                    </button>
                  </div>
                </div>
                <Table
                  loading={form.filtering}
                  data={servicos}
                  config={[
                    {
                      label: "Nome",
                      key: "nome",
                      width: 200,
                      fixed: true,
                      sortable: true,
                    },
                    {
                      label: "R$ Preço",
                      key: "preco",
                      content: (servico) => `R$ ${servico.preco.toFixed(2)}`,
                      sortable: true,
                    },
                    {
                      label: "Recorrência (dias)",
                      content: (servico) => `${servico.recorrencia} dias`,
                      sortable: true,
                    },
                    {
                      label: "Duração",
                      key: "duracao",
                      content: (servico) =>
                        moment(servico.duracao).format("HH:mm"),
                      sortable: true,
                    },
                    {
                      label: "Status",
                      key: "status",
                      content: (servico) => (
                        <Tag color={servico.status === "A" ? "green" : "red"}>
                          {servico.status === "A" ? "Ativo" : "Inativo"}
                        </Tag>
                      ),
                    },
                  ]}
                  actions={(servico) => (
                    <Button appearance="ghost" color="yellow" size="xs">
                      Ver informações
                    </Button>
                  )}
                  onRowClick={(servico) => {
                    dispatch(updateServico({ behavior: "update" }));
                    dispatch(updateServico({ servico }));
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

export default Servicos;
