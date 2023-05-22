import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";
import {
  updateServico,
  allServicos as allServicosAction,
  resetServico,
} from "./actions";
import types from "./types";

export function* allServicos() {
  const { form, workplaceId } = yield select((state) => state.servico);
  try {
    yield put(updateServico({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(
      api.get,
      `/servico/workplace/${workplaceId}`
    );

    yield put(updateServico({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateServico({ servicos: res.servicos }));
  } catch (err) {
    yield put(updateServico({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* filterServico() {
  const { form, colaborador } = yield select((state) => state.colaborador);
  try {
    yield put(updateServico({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, "/colaborador/filter", {
      filters: {
        email: colaborador.email,
        status: "A",
      },
    });

    yield put(updateServico({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateServico({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(updateServico({ form: { ...form, disabled: false } }));
    }
  } catch (err) {
    yield put(updateServico({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* addServico() {
  const { form, servico, components, behavior, workplaceId } = yield select(
    (state) => state.servico
  );
  try {
    yield put(updateServico({ form: { ...form, saving: true } }));

    const formData = new FormData();

    formData.append(
      "servico",
      JSON.stringify({
        ...servico,
        workplaceId,
      })
    );
    formData.append("workplaceId", workplaceId);
    servico.arquivos.map((a, i) => {
      formData.append(`arquivo_${i}`, a);
    });

    const { data: res } = yield call(
      api[behavior === "create" ? "post" : "put"],
      behavior === "create" ? "/servico" : `/servico/${servico._id}`,
      formData
    );

    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allServicosAction());
    yield put(updateServico({ components: { ...components, drawer: false } }));
    yield put(resetServico());
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* removeServico() {
  const { form, servico, components } = yield select((state) => state.servico);
  try {
    yield put(updateServico({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.delete, `/servico/${servico._id}`);

    yield put(
      updateServico({
        form: { ...form, saving: false },
      })
    );

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allServicosAction());
    yield put(
      updateServico({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
    yield put(resetServico());
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* removeArquivo({ key }) {
  const { form } = yield select((state) => state.servico);
  try {
    yield put(updateServico({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, `/servico/delete-arquivo/`, key);

    yield put(
      updateServico({
        form: { ...form, saving: false },
      })
    );

    if (res.error) {
      alert(res.message);
      return false;
    }
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export default all([
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.FILTER_SERVICO, filterServico),
  takeLatest(types.ADD_SERVICO, addServico),
  takeLatest(types.REMOVE_SERVICO, removeServico),
  takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
]);
