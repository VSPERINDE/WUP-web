import { produce } from "immer";
import types from "./types";

const INITIAL_STATE = {
  behavior: "create", //update
  components: {
    drawer: false,
    confirmDelete: false,
    view: "week",
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  workplaceId: localStorage.getItem("token"),
  colaboradores: [],
  servicos: [],
  horarios: [],
  horario: {
    dias: [],
    inicio: "",
    fim: "",
    especialidades: [],
    colaboradores: [],
  },
};

function horario(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_HORARIO: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_HORARIO: {
      return produce(state, (draft) => {
        draft.horario = INITIAL_STATE.horario;
        draft.form.disabled = true;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default horario;
