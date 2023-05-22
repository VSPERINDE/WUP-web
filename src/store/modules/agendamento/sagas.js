import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";
import { updateAgendamento } from "./actions";
//import _const from "../../../data/const";
import types from "./types";

export function* filterAgendamento({ start, end }) {
  try {
    const { workplaceId } = yield select((state) => state.agendamento);
    const { data: res } = yield call(api.post, "/agendamento/filter", {
      workplaceId,
      range: {
        inicio: start,
        final: end,
      },
    });

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateAgendamento(res.agendamentos));
  } catch (err) {
    alert(err.message);
  }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)]);
