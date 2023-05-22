import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Drawer, Icon, Modal, TagPicker } from "rsuite";
import {
  allHorarios,
  updateHorario,
  filterColaboradores,
  addHorario,
  removeHorario,
  allServicos,
  resetHorario,
} from "../../store/modules/horario/actions";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const Horarios = () => {
  const diasSemanaData = [
    new Date(2023, 3, 30, 0, 0, 0, 0),
    new Date(2023, 4, 1, 0, 0, 0, 0),
    new Date(2023, 4, 2, 0, 0, 0, 0),
    new Date(2023, 4, 3, 0, 0, 0, 0),
    new Date(2023, 4, 4, 0, 0, 0, 0),
    new Date(2023, 4, 5, 0, 0, 0, 0),
    new Date(2023, 4, 6, 0, 0, 0, 0),
  ];

  const diasDaSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const dispatch = useDispatch();
  const {
    horario,
    horarios,
    components,
    form,
    behavior,
    servicos,
    colaboradores,
  } = useSelector((state) => state.horario);

  const setComponent = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const setHorario = (key, value) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const formatEvents = horarios
    .map((horario, index) =>
      horario.dias.map((dia) => ({
        resource: horario,
        title: `${horario.especialidades.length} espec. e ${horario.colaboradores.length} colab.`,
        start: new Date(
          diasSemanaData[dia].setHours(
            parseInt(moment(horario.inicio).format("HH")),
            parseInt(moment(horario.inicio).format("mm"))
          )
        ),
        end: new Date(
          diasSemanaData[dia].setHours(
            parseInt(moment(horario.fim).format("HH")),
            parseInt(moment(horario.fim).format("mm"))
          )
        ),
      }))
    )
    .flat();

  const save = () => {
    dispatch(addHorario());
  };

  const remove = () => {
    dispatch(removeHorario());
  };

  const reset = () => {
    dispatch(resetHorario());
  };

  useEffect(() => {
    dispatch(allHorarios());
    dispatch(allServicos());
  }, []);

  useEffect(() => {
    dispatch(filterColaboradores());
  }, [horario.especialidades]);

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
                  {behavior === "create" ? "Criar novo" : "Atualizar"} horário
                  de atendimento
                </h3>
                <div className="row mt-3">
                  <div className="col-12">
                    <b>Dias da Semana</b>
                    <TagPicker
                      size="lg"
                      block
                      value={horario.dias}
                      data={diasDaSemana.map((label, value) => ({
                        label,
                        value,
                      }))}
                      onChange={(value) => {
                        setHorario("dias", value);
                      }}
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <b className="d-block">Horário Inicial</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={horario.inicio}
                      onChange={(e) => {
                        setHorario("inicio", e);
                      }}
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <b className="d-block">Horário Final</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={horario.fim}
                      onChange={(e) => {
                        setHorario("fim", e);
                      }}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <b>Especialidades disponíveis</b>
                    <TagPicker
                      block
                      size="lg"
                      value={horario.especialidades}
                      data={servicos}
                      onChange={(e) => {
                        setHorario("especialidades", e);
                      }}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <b>Colaboradores disponíveis</b>
                    <TagPicker
                      block
                      size="lg"
                      value={horario.colaboradores}
                      data={colaboradores}
                      onChange={(e) => {
                        setHorario("colaboradores", e);
                      }}
                    />
                  </div>
                  <Button
                    loading={form.saving}
                    color={behavior === "create" ? "green" : "yellow"}
                    size="lg"
                    block
                    onClick={() => save()}
                    className="mt-3"
                  >
                    Salvar Horário de Atendimento
                  </Button>
                  {behavior === "update" && (
                    <Button
                      loading={form.saving}
                      color="red"
                      size="lg"
                      block
                      onClick={() => setComponent("confirmDelete", true)}
                      className="mt-1"
                    >
                      Remover Horário de Atendimento
                    </Button>
                  )}
                </div>
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
                  <h2 className="mb-4 mt-0">Horários de Atendimento</h2>
                  <div>
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={() => {
                        dispatch(
                          updateHorario({
                            behavior: "create",
                          })
                        );
                        setComponent("drawer", true);
                      }}
                    >
                      <span className="mdi mdi-plus">Novo Horário</span>
                    </button>
                  </div>
                </div>
                <Calendar
                  onSelectEvent={(e) => {
                    dispatch(updateHorario({ behavior: "update" }));
                    dispatch(updateHorario({ horario: e.resource }));
                    setComponent("drawer", true);
                  }}
                  localizer={localizer}
                  toolbar={false}
                  view="week"
                  date={diasSemanaData[moment().day()]}
                  events={formatEvents}
                  selectable
                  popup
                  onSelectSlot={(slotInfo) => {
                    const { start, end } = slotInfo;
                    dispatch(
                      updateHorario({
                        behavior: "create",
                        horario: {
                          ...horario,
                          dias: [moment(start).day()],
                          inicio: start,
                          fim: end,
                        },
                      })
                    );
                    setComponent("drawer", true);
                  }}
                  formats={{
                    dateFormat: "dd",
                    dayFormat: (date, culture, localizer) =>
                      localizer.format(date, "dddd", culture),
                  }}
                  style={{ height: 600 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Horarios;
