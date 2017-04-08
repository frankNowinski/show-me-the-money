import React from 'react';
import classnames from 'classnames';
import validateEmail from '../../utils/validations/validateEmail';

export default function EmailInput(props) {
  const { notifyEmail, notifyTrendChange, handleChange, errors } = props;
  const checked = notifyTrendChange === true ? true : false;

  return (
    <div className={classnames("form-group", "row", { 'has-danger': errors.notifyEmail })}>
      <label className="col-4 col-form-label">Email address:</label>

      <div className="col-7">
        <input
          name="notifyEmail"
          type="email"
          className="form-control"
          id="user-email"
          value={notifyEmail}
          onChange={handleChange} />

        {errors.notifyEmail && <div className="form-control-feedback">{errors.notifyEmail}</div>}
      </div>
    </div>
  )
}

EmailInput.propTypes = {
  errors: React.PropTypes.object.isRequired,
  notifyEmail: React.PropTypes.string.isRequired,
  notifyTrendChange: React.PropTypes.bool.isRequired,
  handleChange: React.PropTypes.func.isRequired
}


