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
  colaboradores: [],
  servicos: [],
  colaborador: {
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    sexo: "",
    vinculo: "A",
    especialidades: [],
  },
};

function colaborador(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_COLABORADOR: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_COLABORADOR: {
      return produce(state, (draft) => {
        draft.colaborador = INITIAL_STATE.colaborador;
        draft.form.disabled = true;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default colaborador;
