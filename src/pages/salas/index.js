import "rsuite/dist/styles/rsuite-default.min.css";
import { useEffect } from "react";
import Table from "../../components/Table";
import { Button, Drawer, Icon, Modal, Tag, Uploader } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import {
  allSalas,
  updateSala,
  addSala,
  removeSala,
  removeArquivo,
  resetSala,
} from "../../store/modules/sala/actions";
import _const from "../../data/const";

const Salas = () => {
  const dispatch = useDispatch();
  const { salas, sala, behavior, form, components } = useSelector(
    (state) => state.sala
  );

  const setComponent = (component, state) => {
    dispatch(
      updateSala({
        components: { ...components, [component]: state },
      })
    );
  };

  const setSala = (key, value) => {
    dispatch(
      updateSala({
        sala: { ...sala, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addSala());
  };

  const remove = () => {
    dispatch(removeSala());
  };

  const reset = () => {
    dispatch(resetSala());
  };

  useEffect(() => {
    dispatch(allSalas());
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
          <h3>{behavior === "create" ? "Criar Novo" : "Atualizar"} Sala</h3>
          <div className="row mt-3">
            <div className="form-group col-12 mb-3">
              <b>Tipo</b>
              <div className="input-group">
                <input
                  type="text"
                  disabled={behavior === "update"}
                  className="form-control"
                  placeholder="Tipo da Sala"
                  value={sala.sala.tipo}
                  onChange={(e) => {
                    setSala("tipo", e.target.value);
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
              <b className="">Mesas</b>
              <input
                type="number"
                className="form-control"
                placeholder="Mesas da sala"
                value={sala.sala.mesas}
                onChange={(e) => setSala("mesas", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b>Status</b>
              <select
                className="form-control"
                value={sala.sala.status}
                onChange={(e) => setSala("status", e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Lotação Máxima</b>
              <input
                type="number"
                className="form-control"
                placeholder="Lotação Máxima"
                value={sala.sala.lotacao_max}
                onChange={(e) => setSala("lotacao_max", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Descrição</b>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Descrição da Sala"
                value={sala.sala.descricao}
                onChange={(e) => setSala("descricao", e.target.value)}
              ></textarea>
            </div>
            <div className="col-12">
              <b className="d-block">Imagens da Sala</b>
              <Uploader
                multiple
                autoUpload={false}
                listType="picture"
                defaultFileList={sala.arquivos.map((sala, index) => ({
                  name: sala?.caminho,
                  fileKey: index,
                  url: `${_const.bucketUrl}/${sala?.caminho}`,
                }))}
                onChange={(files) => {
                  const arquivos = files
                    .filter((f) => f.blobFile)
                    .map((f) => f.blobFile);
                  setSala("arquivos", arquivos);
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
            {behavior === "create" ? "Salvar" : "Atualizar"} Sala
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
              Remover Sala
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
            <h2 className="mb-4 mt-0">Salas</h2>
            <div>
              <button
                className="btn btn-warning btn-lg"
                onClick={() => {
                  dispatch(updateSala({ behavior: "create" }));
                  setComponent("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Nova Sala</span>
              </button>
            </div>
          </div>
          <Table
            loading={form.filtering}
            data={salas}
            config={[
              {
                label: "Tipo da Sala",
                key: "tipo",
                content: (sala) => sala.sala.tipo,
                width: 200,
                fixed: true,
                sortable: true,
              },
              {
                label: "Mesas da Sala",
                key: "mesas",
                content: (sala) => sala.sala.mesas,
                sortable: true,
              },
              {
                label: "Lotação Máxima da Sala",
                key: "lotacao_max",
                content: (sala) => sala.sala.lotacao_max,
                sortable: true,
              },
              {
                label: "Status",
                key: "status",
                content: (sala) => (
                  <Tag color={sala.status === "A" ? "green" : "red"}>
                    {sala.status === "A" ? "Ativo" : "Inativo"}
                  </Tag>
                ),
              },
            ]}
            actions={(sala) => (
              <Button appearance="ghost" color="yellow" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(sala) => {
              dispatch(updateSala({ behavior: "update" }));
              dispatch(updateSala({ sala }));
              setComponent("drawer", true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Salas;
