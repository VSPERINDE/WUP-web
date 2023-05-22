import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";
import {
  updateColaborador,
  allColaboradores as allColaboradoresAction,
  resetColaborador,
} from "./actions";
import types from "./types";

export function* allColaboradores() {
  const { form, workplaceId } = yield select((state) => state.colaborador);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(
      api.get,
      `/colaborador/workplace/${workplaceId}`
    );

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateColaborador({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* filterColaboradores() {
  const { form, colaborador } = yield select((state) => state.colaborador);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, "/colaborador/filter", {
      filters: {
        email: colaborador.email,
        status: "A",
      },
    });

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateColaborador({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(updateColaborador({ form: { ...form, disabled: false } }));
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* addColaborador() {
  const { form, colaborador, components, behavior, workplaceId } = yield select(
    (state) => state.colaborador
  );
  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));

    let res = {};

    if (behavior === "create") {
      const response = yield call(api.post, "/colaborador", {
        workplaceId,
        colaborador,
      });
      res = response.data;
    } else {
      const response = yield call(api.put, `/colaborador/${colaborador._id}`, {
        vinculo: colaborador.vinculo,
        vinculoId: colaborador.vinculoId,
        especialidades: colaborador.especialidades,
      });
      res = response.data;
    }

    yield put(updateColaborador({ form: { ...form, saving: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({ components: { ...components, drawer: false } })
    );
    yield put(resetColaborador());
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* unlinkColaborador() {
  const { form, colaborador, components } = yield select(
    (state) => state.colaborador
  );
  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(
      api.delete,
      `/colaborador/vinculo/${colaborador.vinculoId}`
    );

    yield put(
      updateColaborador({
        form: { ...form, saving: false },
      })
    );

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
    yield put(resetColaborador());
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, saving: false } }));
    alert(err.message);
  }
}

export function* allServicos() {
  const { form, workplaceId } = yield select((state) => state.colaborador);
  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(
      api.get,
      `/workplace/servicos/${workplaceId}`
    );

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateColaborador({ servicos: res.servicos }));
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export default all([
  takeLatest(types.ALL_COLABORADORES, allColaboradores),
  takeLatest(types.FILTER_COLABORADOR, filterColaboradores),
  takeLatest(types.ADD_COLABORADOR, addColaborador),
  takeLatest(types.UNLINK_COLABORADOR, unlinkColaborador),
  takeLatest(types.ALL_SERVICOS, allServicos),
]);
