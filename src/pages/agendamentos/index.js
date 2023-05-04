import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamento } from "../../store/modules/agendamento/actions";
import util from "../../util";

const localizer = momentLocalizer(moment);

const Agendamentos = () => {
  const dispatch = useDispatch();
  const { agendamentos } = useSelector((state) => state.agendamento);

  const formatEventos = agendamentos.map((agendamento) => ({
    title: `${agendamento.servicoId.nome} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
    start: moment(agendamento.data).toDate(),
    end: moment(agendamento.data)
      .add(
        util.hourToMinutes(
          moment(agendamento.servicoId.duracao).format("HH:mm")
        ),
        "minutes"
      )
      .toDate(),
  }));

  const formatRange = (range) => {
    let finalRange = {};
    if (Array.isArray(range)) {
      finalRange = {
        start: moment(range[0]).format("YYYY-MM-DD"),
        end: moment(range[range.length - 1]).format("YYYY-MM-DD"),
      };
    } else {
      finalRange = {
        start: moment(range.start).format("YYYY-MM-DD"),
        end: moment(range.end).format("YYYY-MM-DD"),
      };
    }
    return finalRange;
  };

  useEffect(() => {
    dispatch(
      filterAgendamento(
        moment().weekday(0).format("YYYY-MM-DD"),
        moment().weekday(6).format("YYYY-MM-DD")
      )
    );
  }, []);

  return (
    <div className="bg- col p-5 overflow-auto h100">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 mt-0">Agendamentos</h2>
          <Calendar
            localizer={localizer}
            onRangeChange={(range) => {
              const { start, end } = formatRange(range);
              dispatch(filterAgendamento(start, end));
            }}
            events={formatEventos}
            selectable
            popup
            defaultView="week"
            style={{ height: 600 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
