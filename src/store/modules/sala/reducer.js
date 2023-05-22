import { produce } from "immer";
import types from "./types";

const INITIAL_STATE = {
  behavior: "create", //update
  components: {
    drawer: false,
    confirmDelete: false,
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  workplaceId: localStorage.getItem("token"),
  salas: [],
  servicos: [],
  sala: {
    tipo: "",
    mesas: "",
    lotacao_max: "",
    descricao: "",
    status: "A",
    arquivos: [],
    especialidades: [],
  },
};

function sala(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_SALA: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_SALA: {
      return produce(state, (draft) => {
        draft.sala = INITIAL_STATE.sala;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default sala;
