import types from "./types";

export function allSalas() {
  return {
    type: types.ALL_SALAS,
  };
}

export function updateSala(payload) {
  return {
    type: types.UPDATE_SALA,
    payload,
  };
}

export function filterSala() {
  return {
    type: types.FILTER_SALA,
  };
}

export function addSala() {
  return {
    type: types.ADD_SALA,
  };
}

export function resetSala() {
  return {
    type: types.RESET_SALA,
  };
}

export function removeSala() {
  return {
    type: types.REMOVE_SALA,
  };
}

export function removeArquivo(key) {
  return {
    type: types.REMOVE_ARQUIVO,
    key,
  };
}

export function allServicos() {
  return {
    type: types.ALL_SERVICOS,
  };
}
