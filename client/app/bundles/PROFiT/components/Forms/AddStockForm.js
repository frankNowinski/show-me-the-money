import React from 'react';
import AlertMessage from './AlertMessage';
import StockInput from '../Inputs/StockInput';
import SharesInput from '../Inputs/SharesInput';
import PurchasedDateCalendar from '../Inputs/PurchasedDateCalendar';
import futureDate from '../../utils/validations/datePurchasedValidator';
import moment from 'moment';

export default class AddStockForm extends React.Component {
  state = {
      ticker: '',
      shares: '',
      purchasedDate: moment(),
      invalid: false,
      submitted: false,
      message: ''
  }

  setInvalidState = (invalid) => {
    this.setState({ invalid });
  }

  setSubmittedState = () => {
    this.setState({ ticker: '', submitted: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCalendarChange = (date) => {
    this.setState({ purchasedDate: date });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { ticker, shares, purchasedDate } = this.state;

    if (ticker != '' && shares != '' && !futureDate(purchasedDate)) {
      this.props.addStock(this.state)
        .then(response => {
          if (response.base !== undefined) {
            this.setState({
              invalid: true,
              submitted: true,
              message: 'Unable to add stock to your portfolio.'
            });
          } else {
            let message = `Added ${response.ticker.toUpperCase()} to your portfolio.`;
            this.setState({
              shares: '',
              purchasedDate: moment(),
              invalid: false,
              submitted: true,
              message: message
            });
          }
        })
        .catch(error => {
          console.log(`Error adding stock: ${error}`);
        });

    } else {
      this.setState({ invalid: true, submitted: true });
    }

    $('#add-stock-modal').modal('hide');
  }

  render() {
    return (
      <div className="text-center">
        { this.state.submitted ?
          <AlertMessage invalid={this.state.invalid} message={this.state.message}/>
          : null
        }

        <button className="btn btn-lg btn-outline-primary" type="button" data-toggle="modal" data-target="#add-stock-modal" onClick={this.setSubmittedState}>Add Stock</button>

        <div className="modal fade" id="add-stock-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLongTitle">Add Stock</h4>

                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body text-center">
                <form onSubmit={this.handleSubmit}>
                  <StockInput
                    ticker={this.state.ticker}
                    alreadyOwned={this.props.alreadyOwned}
                    handleChange={this.handleChange}
                    setInvalidState={this.setInvalidState} />

                  <SharesInput
                    shares={this.state.shares}
                    handleChange={this.handleChange}
                    setInvalidState={this.setInvalidState} />

                  <PurchasedDateCalendar
                    purchasedDate={this.state.purchasedDate}
                    handleCalendarChange={this.handleCalendarChange}
                    setInvalidState={this.setInvalidState} />

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-outline-primary" disabled={this.state.invalid} onClick={this.handleSubmit}>Add Stock</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddStockForm.propTypes = {
  stocks: React.PropTypes.object.isRequired,
  addStock: React.PropTypes.func.isRequired,
  alreadyOwned: React.PropTypes.func.isRequired
}
