import React, { Component } from 'react';
import axios from 'axios'
import ReportList from './report.list';
import ReportForm from './report.form';

const URL = 'http://localhost:3003/'
export default class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = { list: [], key: '', number: '', type: '', aircraft: '', engine: '' };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        axios.get(`${URL}reports`)
            .then((resp) => {
                this.setState({ list: resp.data });
            });
    }

    componentWillUnmount() {
        this.setState({
            key: ''
        })
    }

    handleOnChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        const report = {
            number: this.state.number,
            type: this.state.type,
            aircraft: this.state.aircraft,
            engine: this.state.engine
        }
        axios.post(`${URL}report`, report)
            .then(() => {
                console.log('Emitir alerta...')
            }).catch((err) => {
                console.log(err)
            })

    }

    handleEdit(form) {
        const report = {
            number: form.number,
            type: form.type,
            aircraft: form.aircraft,
            engine: form.engine
        }
        this.setState({
            key: form._id,
            number: report.number,
            type: report.type,
            aircraft: report.aircraft,
            engine: report.engine
        })
    }

    handleUpdate(form) {
        const id = this.state.key
        axios.put(`${URL}report/${id}`, form)
            .then(() => {
                this.componentDidMount()
                console.log('Emitir alerta...')
            }).catch((err) => {
                console.log(err)
            })
    }

    handleRemove(key) {
        axios.delete(`${URL}report/${key}`)
            .then(() => {
                this.componentDidMount()
                console.log('Emitir alerta...')
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (

            <div>
                <div className="container">
                    <h5>Inspection Reports</h5><small>Monitoring of Reports</small>
                    <div className="row">
                        <div className="col-lg">
                            <ReportList handleEdit={this.handleEdit} handleRemove={this.handleRemove} list={this.state.list}></ReportList>
                        </div>
                        <div className="col-lg">
                            <h6>Inspection Registration</h6>
                            <ReportForm
                                number={this.state.number}
                                type={this.state.type}
                                aircraft={this.state.aircraft}
                                engine={this.state.engine}
                                input={this.input}
                                handleOnChange={this.handleOnChange}
                                handleSubmit={this.handleSubmit}
                                handleUpdate={this.handleUpdate}>
                            </ReportForm>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}