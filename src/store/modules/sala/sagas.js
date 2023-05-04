import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";
import { updateSala, allSalas as allSalasAction, resetSala } from "./actions";
import _const from "../../../data/const";
import types from "./types";

export function* allSalas() {
  const { form } = yield select((state) => state.sala);
  try {
    yield put(updateSala({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(
      api.get,
      `/sala/workplace/${_const.workplaceId}`
    );

    yield put(updateSala({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateSala({ salas: res.salas }));
  } catch (err) {
    yield put(updateSala({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

//função filter ainda não ta funcionando
export function* filterSala() {
  const { form } = yield select((state) => state.sala);
  try {
    yield put(updateSala({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/sala/filter/`);

    yield put(updateSala({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateSala({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(updateSala({ form: { ...form, disabled: false } }));
    }
  } catch (err) {
    yield put(updateSala({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* addSala() {
  const { form, sala, components, behavior } = yield select(
    (state) => state.sala
  );
  try {
    yield put(updateSala({ form: { ...form, saving: true } }));

    const formData = new FormData();

    formData.append(
      "sala",
      JSON.stringify({
        ...sala,
        workplaceId: _const.workplaceId,
        especialidades: [sala.especialidades],
      })
    );
    formData.append("workplaceId", _const.workplaceId);
    sala.arquivos.map((a, i) => {
      formData.append(`arquivo_${i}`, a);
    });

    const { data: res } = yield call(
      api[behavior === "create" ? "post" : "put"],
      behavior === "create" ? "/sala" : `/sala/${sala._id}`,
      formData
    );

    yield put(updateSala({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allSalasAction());
    yield put(updateSala({ components: { ...components, drawer: false } }));
    yield put(resetSala());
  } catch (err) {
    yield put(updateSala({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* removeSala() {
  const { form, sala, components } = yield select((state) => state.sala);
  try {
    yield put(updateSala({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/sala/${sala._id}`);

    yield put(
      updateSala({
        form: { ...form, saving: false },
      })
    );

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allSalasAction());
    yield put(
      updateSala({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
    yield put(resetSala());
  } catch (err) {
    yield put(updateSala({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* removeArquivo({ key }) {
  const { form } = yield select((state) => state.sala);
  try {
    yield put(updateSala({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, `/sala/delete-arquivo/`, key);

    yield put(
      updateSala({
        form: { ...form, saving: false },
      })
    );

    if (res.error) {
      alert(res.message);
      return false;
    }
  } catch (err) {
    yield put(updateSala({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export default all([
  takeLatest(types.ALL_SALAS, allSalas),
  takeLatest(types.FILTER_SALA, filterSala),
  takeLatest(types.ADD_SALA, addSala),
  takeLatest(types.REMOVE_SALA, removeSala),
  takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
]);
