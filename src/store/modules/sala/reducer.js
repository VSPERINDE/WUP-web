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
  salas: [],
  sala: {
    sala: {
      tipo: "",
      mesas: [""],
      lotacao_max: "",
      descricao: "",
    },
    status: "A",
    arquivos: [],
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
    case types.RESET_SERVICO: {
      return produce(state, (draft) => {
        draft.sala = INITIAL_STATE.sala;
        draft.form.disabled = true;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default sala;
