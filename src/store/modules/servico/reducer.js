import { produce } from "immer";
import types from "./types";
import moment from "moment";

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
  servicos: [],
  servico: {
    nome: "",
    preco: "",
    comissao: "",
    duracao: moment("00:30", "HH:mm").format(),
    recorrencia: "",
    status: "A",
    descricao: "",
    arquivos: [],
  },
};

function servico(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_SERVICO: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_SERVICO: {
      return produce(state, (draft) => {
        draft.servico = INITIAL_STATE.servico;
        draft.form.disabled = true;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default servico;
