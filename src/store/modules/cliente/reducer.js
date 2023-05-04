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
  clientes: [],
  cliente: {
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    sexo: "",
    endereco: {
      logradouro: "",
      cidade: "",
      uf: "",
      cep: "",
      numero: "",
      pais: "",
    },
    documento: {
      tipo: "",
      numero: "",
    },
  },
};

function cliente(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_CLIENTE: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_CLIENTE: {
      return produce(state, (draft) => {
        draft.cliente = INITIAL_STATE.cliente;
        draft.form.disabled = true;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default cliente;
