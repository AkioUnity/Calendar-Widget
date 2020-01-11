import Config from "../global/config";

export const REPORT = 'REPORT';
export const USER_REPORT = 'USER_REPORT';
export const FETCH_ATTEMPT= 'FETCH_ATTEMPT';

export const SET_USER = 'SET_USER';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function fetchIsLoading(bool: boolean) {
  return {
    type: FETCH_ATTEMPT,
    isLoading: bool,
    // lastError: null
  };
}

export function reportSuccess(response: Object) {
  return {
    type: REPORT,
    response
  };
}

export function reportUserSuccess(response: Object) {
  return {
    type: USER_REPORT,
    response
  };
}

export function cockpit_request(report: Object) {
  return dispatch => {
    let formdata = new FormData();
    formdata.append('action', 'cockpit_request');
    fetch(Config.AJAX_URL, {
      method: "post",
      headers: {
        Authorization: Config.Authorization,
      },
      body: formdata
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        dispatch(reportSuccess(data));
        dispatch(fetchIsLoading(false));
      });
    })
      .catch(error => {
        dispatch(fetchIsLoading(false));
      });
  };
}

export function reportUser(user: Object) {
  console.log(user);
  return dispatch => {
    fetch(Config.BASE_URL+'/users/report_user', {
      method: "post",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        phone1: user.phone,
        report_id: user.report_id,
      })
    }).then(response => {
      response.json().then(data => {
        dispatch(reportUserSuccess(data));
        dispatch(fetchIsLoading(false));
      });
    })
      .catch(error => {
        dispatch(fetchIsLoading(false));
      });
  };
}
